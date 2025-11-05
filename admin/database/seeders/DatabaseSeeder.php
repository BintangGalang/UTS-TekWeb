<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            KramaSeeder::class,
            TagihanSeeder::class,
            PembayaranSeeder::class,
        ]);
    }
}
