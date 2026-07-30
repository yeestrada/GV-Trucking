<?php

namespace Database\Seeders;

use App\Services\FrontpageService;
use Illuminate\Database\Seeder;

class FrontpageSeeder extends Seeder
{
    public function run(): void
    {
        app(FrontpageService::class)->seedDefaults();
    }
}
