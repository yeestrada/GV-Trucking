<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\FrontpageService;
use App\Support\FrontpageDefaults;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class FrontpageController extends Controller
{
    public function __construct(private FrontpageService $frontpage)
    {
    }

    public function index(): Response
    {
        $content = $this->frontpage->all();
        $meta = FrontpageDefaults::meta();

        $sections = collect($meta)->map(function (array $info, string $key) use ($content) {
            return [
                'key' => $key,
                'label' => $info['label'],
                'description' => $info['description'],
                'content' => $content[$key] ?? [],
            ];
        })->values();

        return Inertia::render('Admin/Config/Frontpage', [
            'sections' => $sections,
            'mediaSlots' => $this->mediaSlots($content['media'] ?? FrontpageDefaults::media()),
            'business' => $content['business'] ?? FrontpageDefaults::business(),
            'nav' => $content['nav'] ?? FrontpageDefaults::nav(),
        ]);
    }

    public function update(Request $request, string $section): RedirectResponse
    {
        $defaults = FrontpageDefaults::sections();

        if (! array_key_exists($section, $defaults)) {
            abort(404);
        }

        if ($section === 'media') {
            return back()->with('error', __('Use the upload controls to replace images.'));
        }

        $validated = $request->validate([
            'content' => ['required', 'array'],
            'business' => ['nullable', 'array'],
            'nav' => ['nullable', 'array'],
        ]);

        $this->frontpage->updateSection($section, $validated['content']);

        if (! empty($validated['business'])) {
            $business = array_merge(
                $this->frontpage->section('business'),
                $validated['business'],
            );
            $this->frontpage->updateSection('business', $business);
        }

        if (! empty($validated['nav'])) {
            $this->frontpage->updateSection('nav', $validated['nav']);
        }

        return back()->with('success', __('Frontpage section updated.'));
    }

    public function uploadMedia(Request $request): RedirectResponse
    {
        $filenames = FrontpageDefaults::mediaFilenames();

        $validated = $request->validate([
            'slot' => ['required', 'string', Rule::in(array_keys($filenames))],
            'image' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
        ]);

        $slot = $validated['slot'];
        $filename = $filenames[$slot];
        $directory = public_path('images');

        if (! is_dir($directory)) {
            mkdir($directory, 0755, true);
        }

        $absolutePath = $directory . DIRECTORY_SEPARATOR . $filename;
        $this->storeAsPng($validated['image'], $absolutePath);

        $publicPath = '/images/' . $filename . '?v=' . time();
        $media = $this->frontpage->section('media');
        $defaults = FrontpageDefaults::media();

        $media['heroImage'] = $media['heroImage'] ?? $defaults['heroImage'];
        $media['aboutImage'] = $media['aboutImage'] ?? $defaults['aboutImage'];
        $media['serviceImages'] = array_values($media['serviceImages'] ?? $defaults['serviceImages']);

        while (count($media['serviceImages']) < 3) {
            $media['serviceImages'][] = $defaults['serviceImages'][count($media['serviceImages'])] ?? $defaults['serviceImages'][0];
        }

        match ($slot) {
            'hero' => $media['heroImage'] = $publicPath,
            'about' => $media['aboutImage'] = $publicPath,
            'service_1' => $media['serviceImages'][0] = $publicPath,
            'service_2' => $media['serviceImages'][1] = $publicPath,
            'service_3' => $media['serviceImages'][2] = $publicPath,
        };

        $media['serviceImages'] = array_slice(array_values($media['serviceImages']), 0, 3);

        $this->frontpage->updateSection('media', $media);

        return back()->with('success', __('Image replaced successfully.'));
    }

    /**
     * @return list<array{slot: string, label: string, filename: string, url: string}>
     */
    private function mediaSlots(array $media): array
    {
        $filenames = FrontpageDefaults::mediaFilenames();

        return [
            [
                'slot' => 'hero',
                'label' => 'Hero image',
                'filename' => $filenames['hero'],
                'url' => $media['heroImage'] ?? '/images/' . $filenames['hero'],
            ],
            [
                'slot' => 'about',
                'label' => 'About image',
                'filename' => $filenames['about'],
                'url' => $media['aboutImage'] ?? '/images/' . $filenames['about'],
            ],
            [
                'slot' => 'service_1',
                'label' => 'Service card 1',
                'filename' => $filenames['service_1'],
                'url' => $media['serviceImages'][0] ?? '/images/' . $filenames['service_1'],
            ],
            [
                'slot' => 'service_2',
                'label' => 'Service card 2',
                'filename' => $filenames['service_2'],
                'url' => $media['serviceImages'][1] ?? '/images/' . $filenames['service_2'],
            ],
            [
                'slot' => 'service_3',
                'label' => 'Service card 3',
                'filename' => $filenames['service_3'],
                'url' => $media['serviceImages'][2] ?? '/images/' . $filenames['service_3'],
            ],
        ];
    }

    private function storeAsPng(UploadedFile $file, string $absolutePath): void
    {
        $binary = file_get_contents($file->getRealPath());
        $image = @imagecreatefromstring($binary);

        if ($image === false) {
            $file->move(dirname($absolutePath), basename($absolutePath));

            return;
        }

        if (function_exists('imagepalettetotruecolor')) {
            @imagepalettetotruecolor($image);
        }
        imagealphablending($image, true);
        imagesavealpha($image, true);
        imagepng($image, $absolutePath, 6);
        imagedestroy($image);
    }
}
