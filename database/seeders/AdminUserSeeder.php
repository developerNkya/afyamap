<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@afyamap.tz'],
            [
                'name'              => 'AfyaMap Admin',
                'email'             => 'admin@afyamap.tz',
                'password'          => Hash::make('admin123'),
                'email_verified_at' => now(),
            ]
        );
    }
}
