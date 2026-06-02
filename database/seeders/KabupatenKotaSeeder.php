<?php

namespace Database\Seeders;

use App\Models\KabupatenKota;
use Illuminate\Database\Seeder;

class KabupatenKotaSeeder extends Seeder
{
    public function run(): void
    {
        // 13 kabupaten + 2 kota di Provinsi Lampung
        $data = [
            'Kabupaten Lampung Barat',
            'Kabupaten Lampung Selatan',
            'Kabupaten Lampung Tengah',
            'Kabupaten Lampung Timur',
            'Kabupaten Lampung Utara',
            'Kabupaten Mesuji',
            'Kabupaten Pesawaran',
            'Kabupaten Pesisir Barat',
            'Kabupaten Pringsewu',
            'Kabupaten Tanggamus',
            'Kabupaten Tulang Bawang',
            'Kabupaten Tulang Bawang Barat',
            'Kabupaten Way Kanan',
            'Kota Bandar Lampung',
            'Kota Metro',
        ];

        foreach ($data as $nama) {
            KabupatenKota::firstOrCreate(['nama' => $nama]);
        }
    }
}
