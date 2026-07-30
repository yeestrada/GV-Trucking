<?php

namespace App\Services;

use App\Models\FrontpageSection;
use App\Support\FrontpageDefaults;
use Illuminate\Support\Facades\Cache;

class FrontpageService
{
    public const CACHE_KEY = 'frontpage.content';

    public function all(): array
    {
        return Cache::rememberForever(self::CACHE_KEY, function () {
            $defaults = FrontpageDefaults::sections();
            $stored = FrontpageSection::query()->get()->keyBy('key');

            $merged = [];
            foreach ($defaults as $key => $defaultContent) {
                $content = $stored->has($key)
                    ? $stored[$key]->content
                    : $defaultContent;

                if (is_array($content) && is_array($defaultContent)) {
                    $content = array_replace_recursive($defaultContent, $content);
                }

                if ($key === 'nav') {
                    $content = $this->normalizeNav($content, $defaultContent);
                }

                $merged[$key] = $content;
            }

            return $merged;
        });
    }

    /**
     * Migrate legacy flat nav labels into items[] when needed.
     */
    private function normalizeNav(array $content, array $defaults): array
    {
        foreach (['en', 'es'] as $locale) {
            $localeData = $content[$locale] ?? [];
            if (isset($localeData['items']) && is_array($localeData['items'])) {
                continue;
            }

            $legacyKeys = ['home', 'services', 'about', 'why', 'faq', 'contact'];
            $hrefMap = [
                'home' => '#home',
                'services' => '#services',
                'about' => '#about',
                'why' => '#why',
                'faq' => '#faq',
                'contact' => '#contact',
            ];

            $items = [];
            foreach ($legacyKeys as $key) {
                if (! empty($localeData[$key])) {
                    $items[] = [
                        'href' => $hrefMap[$key],
                        'label' => $localeData[$key],
                    ];
                }
            }

            if ($items === []) {
                $items = $defaults[$locale]['items'] ?? [];
            }

            $content[$locale] = [
                'items' => $items,
                'signIn' => $localeData['signIn'] ?? $defaults[$locale]['signIn'] ?? 'Sign in',
                'dashboard' => $localeData['dashboard'] ?? $defaults[$locale]['dashboard'] ?? 'Dashboard',
                'openMenu' => $localeData['openMenu'] ?? $defaults[$locale]['openMenu'] ?? 'Open menu',
                'closeMenu' => $localeData['closeMenu'] ?? $defaults[$locale]['closeMenu'] ?? 'Close menu',
            ];
        }

        return $content;
    }

    public function section(string $key): array
    {
        $all = $this->all();

        return $all[$key] ?? FrontpageDefaults::sections()[$key] ?? [];
    }

    public function updateSection(string $key, array $content): FrontpageSection
    {
        if (! array_key_exists($key, FrontpageDefaults::sections())) {
            abort(404, 'Unknown frontpage section.');
        }

        $section = FrontpageSection::query()->updateOrCreate(
            ['key' => $key],
            ['content' => $content],
        );

        $this->forgetCache();

        return $section;
    }

    public function forgetCache(): void
    {
        Cache::forget(self::CACHE_KEY);
    }

    public function seedDefaults(): void
    {
        foreach (FrontpageDefaults::sections() as $key => $content) {
            FrontpageSection::query()->firstOrCreate(
                ['key' => $key],
                ['content' => $content],
            );
        }

        $this->forgetCache();
    }
}
