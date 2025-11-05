<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin akun
        User::create([
            'name' => 'Admin Desa',
            'email' => 'admin@desa.com',
            'password' => Hash::make('12345'),
            'role' => 'admin',
        ]);

        // User Krama biasa
        User::create([
            'name' => 'I Wayan Dharma',
            'email' => 'user@desa.com',
            'password' => Hash::make('12345'),
            'role' => 'user',
        ]);
    }
}
