<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PembayaranSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('pembayarans')->insert([
            [
                'pembayaran_id' => 'PB001',
                'tagihan_id' => 'TG001',
                'tgl_bayar' => '2025-01-20',
                'jumlah' => 100000,
                'status' => 'lunas',
                'payment_by' => 'USR010',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'pembayaran_id' => 'PB002',
                'tagihan_id' => 'TG002',
                'tgl_bayar' => null,
                'jumlah' => 0,
                'status' => 'belum bayar',
                'payment_by' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'pembayaran_id' => 'PB003',
                'tagihan_id' => 'TG003',
                'tgl_bayar' => null,
                'jumlah' => 0,
                'status' => 'pending',
                'payment_by' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
