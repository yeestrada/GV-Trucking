# GV Trucking

Laravel app with **React** (Inertia.js + Vite), **Breeze** auth, **roles & permissions**, **API REST** (Sanctum), and optional **Google sign-in**. Default database: **MySQL** (also supports PostgreSQL or SQLite).

## Requirements

- PHP 8.2+, Composer
- Node.js 18+, npm
- Database: MySQL (default), PostgreSQL, or SQLite
- (Optional) PHP `zip` extension

## Install

```bash
cp .env.example .env
php artisan key:generate
# Set DB_* in .env (MySQL by default)

composer install
php artisan migrate

npm install
npm run build
```

## Run

```bash
# Backend
php artisan serve

# Frontend (dev with hot reload) — in another terminal
npm run dev
```

- App: **http://127.0.0.1:8000**
- API: **http://127.0.0.1:8000/api**

## Config (.env)

| Key | Purpose |
|-----|---------|
| `DB_*` | MySQL connection (`DB_CONNECTION=mysql`, port `3306`) |
| `APP_URL` | Base URL (e.g. `http://localhost:8000`) |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Optional Google sign-in |
| `GOOGLE_REDIRECT_URI` | OAuth callback (default: `${APP_URL}/auth/google/callback`) |
| `MAIL_*` | Mail (e.g. password reset) |

## Google sign-in (optional)

Create OAuth credentials in Google Cloud, then put them in `.env`.

1. Open [Google Cloud Console](https://console.cloud.google.com/) and select (or create) a project.
2. Go to **APIs & Services → OAuth consent screen**.
   - User type: **External** (or Internal for Google Workspace).
   - App name, support email, and developer contact are enough for testing.
   - Add scopes: `openid`, `email`, `profile`.
   - Under **Test users**, add the Google accounts that may sign in while the app is in *Testing*.
3. Go to **APIs & Services → Credentials → Create credentials → OAuth client ID**.
   - Application type: **Web application**.
   - Name: e.g. `GV Trucking Local`.
   - **Authorized JavaScript origins**: your app URL, e.g. `http://127.0.0.1:8000`.
   - **Authorized redirect URIs**: `{APP_URL}/auth/google/callback`  
     Example local: `http://127.0.0.1:8000/auth/google/callback`
4. Copy the **Client ID** and **Client secret** into `.env`:

```env
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REDIRECT_URI="${APP_URL}/auth/google/callback"
```

5. Ensure `APP_URL` matches the origin/redirect you registered (including `http` vs `https` and port).
6. Clear config cache if needed: `php artisan config:clear`.

Routes used by the app:

- Redirect: `GET /auth/google` (`auth.google.redirect`)
- Callback: `GET /auth/google/callback` (`auth.google.callback`)

## Seed (admin users)

```bash
php artisan db:seed --class=RoleSeeder
php artisan db:seed --class=AdminUserSeeder
```

Default admin passwords: **`admin`**. Change in production.

## Testing

```bash
php artisan test
```

The project includes comprehensive tests:
- **Feature tests**: Admin controllers (Users, Roles, Permissions), API endpoints
- **Unit tests**: Models (User, Role, Permission)
- **89+ tests** covering CRUD operations, validations, authorization, and security

## Deploy

```bash
git clone <repo> . && cd .
cp .env.example .env && php artisan key:generate
# Edit .env (DB_*, APP_URL)

composer install --no-dev --optimize-autoloader
php artisan migrate --force
php artisan db:seed --class=RoleSeeder
php artisan db:seed --class=AdminUserSeeder

npm ci && npm run build
php artisan config:cache && php artisan route:cache && php artisan view:cache
```

## Stack

- Laravel 12, Inertia.js 2, React 18, Tailwind CSS
- Laravel Breeze (auth), Sanctum (API)
- Roles & permissions (custom)
