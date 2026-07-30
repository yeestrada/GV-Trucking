<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class GoogleAuthController extends Controller
{
    protected function getAuthorizeUrl(): string
    {
        return 'https://accounts.google.com/o/oauth2/v2/auth';
    }

    protected function getTokenUrl(): string
    {
        return 'https://oauth2.googleapis.com/token';
    }

    /**
     * Redirect to Google authorization (Authorization Code flow).
     */
    public function redirect(Request $request): RedirectResponse
    {
        $clientId = config('services.google.client_id');
        $redirectUri = config('services.google.redirect');

        if (empty($clientId) || empty($redirectUri)) {
            return redirect()->back()->with('error', __('Google sign-in is not configured. Set GOOGLE_CLIENT_ID and GOOGLE_REDIRECT_URI in .env.'));
        }

        // Signed state: no session/cookie needed when returning from Google (avoids state mismatch)
        $state = $this->createSignedState();

        $params = [
            'client_id' => $clientId,
            'response_type' => 'code',
            'redirect_uri' => $redirectUri,
            'scope' => implode(' ', config('services.google.scopes', ['openid', 'email', 'profile'])),
            'state' => $state,
            'access_type' => 'online',
            'prompt' => 'select_account',
        ];

        return redirect()->away($this->getAuthorizeUrl() . '?' . http_build_query($params));
    }

    /**
     * Handle callback from Google: validate state, exchange code for tokens, find or create user, log in.
     */
    public function callback(Request $request): RedirectResponse
    {
        $request->validate([
            'state' => 'required|string',
            'code' => 'required|string',
        ]);

        $receivedState = $request->input('state');
        if (!$this->verifySignedState($receivedState)) {
            logger()->warning('Google OAuth state invalid or expired', [
                'received_length' => strlen($receivedState),
            ]);
            $msg = __('auth.google_failed');
            if (config('app.debug')) {
                $msg .= ' ' . __('auth.google_error_state');
            }
            return redirect('/')->with('error', $msg);
        }

        $tokenResponse = Http::asForm()->post($this->getTokenUrl(), [
            'client_id' => config('services.google.client_id'),
            'client_secret' => config('services.google.client_secret'),
            'code' => $request->input('code'),
            'redirect_uri' => config('services.google.redirect'),
            'grant_type' => 'authorization_code',
        ]);

        if (!$tokenResponse->successful()) {
            $body = $tokenResponse->json();
            logger()->error('Google OAuth token request failed', [
                'status' => $tokenResponse->status(),
                'body' => $body,
            ]);
            $msg = __('auth.google_failed');
            if (config('app.debug') && is_array($body)) {
                $detail = $body['error_description'] ?? $body['error'] ?? json_encode($body);
                $request->session()->flash('login_error_detail', $detail);
            }
            return redirect('/')->with('error', $msg);
        }

        $tokenData = $tokenResponse->json();
        $idToken = $tokenData['id_token'] ?? null;
        if (!$idToken) {
            logger()->error('Google OAuth: id_token missing from token response', [
                'tokenData' => $tokenData,
            ]);
            $msg = __('auth.google_failed');
            if (config('app.debug') && is_array($tokenData)) {
                $request->session()->flash('login_error_detail', 'id_token missing. Response: ' . json_encode($tokenData));
            }
            return redirect('/')->with('error', $msg);
        }

        $payload = $this->decodeJwtPayload($idToken);
        if (!$payload) {
            logger()->error('Google OAuth: failed to decode id_token payload', [
                'id_token' => $idToken,
            ]);
            return redirect('/')->with('error', __('auth.google_failed'));
        }

        $googleId = $payload['sub'] ?? null;
        $email = $payload['email'] ?? null;
        $name = $payload['name'] ?? trim(($payload['given_name'] ?? '') . ' ' . ($payload['family_name'] ?? '')) ?: $email;

        if (!$googleId || !$email) {
            logger()->error('Google OAuth: missing googleId or email in id_token payload', [
                'payload' => $payload,
                'googleId' => $googleId,
                'email' => $email,
            ]);
            return redirect('/')->with('error', __('auth.google_failed'));
        }

        $user = User::where('google_id', $googleId)->first()
            ?? User::where('email', $email)->first();

        $userRole = Role::where('slug', 'user')->first();

        if (!$user) {
            $user = User::create([
                'name' => $name,
                'email' => $email,
                'google_id' => $googleId,
                'password' => null,
                'email_verified_at' => now(),
                'role_id' => $userRole?->id,
            ]);
        } else {
            $updates = [];

            if (empty($user->google_id)) {
                $updates['google_id'] = $googleId;
            }

            if (empty($user->email_verified_at)) {
                $updates['email_verified_at'] = now();
            }

            if (empty($user->role_id) && $userRole) {
                $updates['role_id'] = $userRole->id;
            }

            if (!empty($updates)) {
                $user->update($updates);
            }
        }

        Auth::login($user, true);
        return redirect()->intended(route('dashboard', absolute: false));
    }

    protected function decodeJwtPayload(string $jwt): ?array
    {
        $parts = explode('.', $jwt);
        if (count($parts) !== 3) {
            return null;
        }
        $payload = base64_decode(strtr($parts[1], '-_', '+/'), true);
        return $payload !== false ? json_decode($payload, true) : null;
    }

    /**
     * Create a signed state that can be verified without session/cookie (survives cross-site redirect).
     */
    protected function createSignedState(): string
    {
        $payload = [
            'v' => Str::random(40),
            'e' => time() + 600, // valid 10 minutes
        ];
        return Crypt::encryptString(json_encode($payload));
    }

    /**
     * Verify the signed state returned by Google.
     */
    protected function verifySignedState(string $state): bool
    {
        try {
            $json = Crypt::decryptString($state);
            $payload = json_decode($json, true);
            if (!is_array($payload) || empty($payload['e'])) {
                return false;
            }
            return (int) $payload['e'] >= time();
        } catch (\Throwable) {
            return false;
        }
    }
}
