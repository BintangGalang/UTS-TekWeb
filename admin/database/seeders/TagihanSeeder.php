<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TagihanSeeder extends Seeder
{
    public function run(): void
{
    // ✅ Nonaktifkan sementara foreign key check
    DB::statement('SET FOREIGN_KEY_CHECKS=0;');

    DB::table('tagihans')->truncate();

    // 🔹 Ambil data krama
    $kramas = DB::table('kramas')->get();

    $tagihans = [];
    foreach ($kramas as $krama) {
        switch (strtolower($krama->status)) {
            case 'krama desa':
                $dedosan = 50000;
                $peturunan = 50000;
                break;
            case 'krama tamiu':
            case 'tamiu':
                $dedosan = 75000;
                $peturunan = 75000;
                break;
            default:
                $dedosan = 0;
                $peturunan = 0;
        }

        $tagihans[] = [
            'tagihan_id' => (string) \Illuminate\Support\Str::uuid(),
            'iuran' => 'Iuran Desa Tahun 2025',
            'dedosan' => $dedosan,
            'peturunan' => $peturunan,
            'created_by' => 'SystemSeeder',
            'krama_id' => $krama->krama_id,
            'tgl' => now()->format('Y-m-d'),
            'status' => 'Belum Lunas',
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }

    DB::table('tagihans')->insert($tagihans);

    // ✅ Aktifkan lagi foreign key check
    DB::statement('SET FOREIGN_KEY_CHECKS=1;');
}

}
