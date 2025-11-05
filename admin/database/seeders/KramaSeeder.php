<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KramaSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('kramas')->insert([
            [
                'krama_id' => 'KR004',
                'nik' => '3201123456789004',
                'nama' => 'I Wayan Duka',
                'gender' => 'L',
                'status' => 'krama desa',
                'alamat' => 'Banjar Tengah, Desa Adat Ubud',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'krama_id' => 'KR005',
                'nik' => '3201123456789008',
                'nama' => 'Ni Putu Rahma Wati',
                'gender' => 'P',
                'status' => 'krama tamiu',
                'alamat' => 'Banjar Dangin, Desa Adat Mas',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'krama_id' => 'KR006',
                'nik' => '3201123456789009',
                'nama' => 'I Ketut Dana Yasa',
                'gender' => 'L',
                'status' => 'tamiu',
                'alamat' => 'Banjar Kauh, Desa Peliatan',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
