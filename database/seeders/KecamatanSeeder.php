<?php

namespace Database\Seeders;

use App\Models\KabupatenKota;
use App\Models\Kecamatan;
use Illuminate\Database\Seeder;

class KecamatanSeeder extends Seeder
{
    public function run(): void
    {
        $data = $this->data();

        $count = 0;
        foreach ($data as $kabupatenKotaNama => $kecamatanList) {
            $kab = KabupatenKota::where('nama', $kabupatenKotaNama)->first();

            if (!$kab) {
                $this->command->warn("Kabupaten/Kota tidak ditemukan: {$kabupatenKotaNama}");
                continue;
            }

            foreach ($kecamatanList as $namaKecamatan) {
                Kecamatan::firstOrCreate(
                    [
                        'kabupaten_kota_id' => $kab->id,
                        'nama_kecamatan' => $namaKecamatan,
                    ]
                );
                $count++;
            }
        }

        $this->command->info("Seeder kecamatan selesai: {$count} baris diproses.");
    }

    /**
     * Pemetaan kecamatan per kabupaten/kota.
     * Total: 224 (setelah deduplikasi dari input user).
     * Lihat pemetaan.md untuk catatan pembersihan data.
     */
    private function data(): array
    {
        return [
            'Kota Metro' => [
                'Metro Barat',
                'Metro Pusat',
                'Metro Selatan',
                'Metro Timur',
                'Metro Utara',
            ],

            'Kota Bandar Lampung' => [
                'Bumi Waras',
                'Enggal',
                'Kedamaian',
                'Kedaton',
                'Kemiling',
                'Labuhan Ratu',
                'Langkapura',
                'Panjang',
                'Rajabasa',
                'Sukabumi',
                'Sukarame',
                'Tanjung Karang Barat',
                'Tanjung Karang Pusat',
                'Tanjung Karang Timur',
                'Tanjung Senang',
                'Teluk Betung Barat',
                'Teluk Betung Selatan',
                'Teluk Betung Timur',
                'Teluk Betung Utara',
                'Way Halim',
            ],

            'Kabupaten Lampung Selatan' => [
                'Bakauheni',
                'Candipuro',
                'Jati Agung',
                'Kalianda',
                'Katibung',
                'Ketapang',
                'Merbau Mataram',
                'Natar',
                'Palas',
                'Penengahan',
                'Rajabasa',
                'Sidomulyo',
                'Sragi',
                'Tanjung Bintang',
                'Tanjung Sari',
                'Way Panji',
                'Way Sulan',
            ],

            'Kabupaten Lampung Tengah' => [
                'Anak Ratu Aji',
                'Anak Tuha',
                'Bandar Mataram',
                'Bandar Surabaya',
                'Bangun Rejo',
                'Bekri',
                'Bumi Nabung',
                'Bumi Ratu Nuban',
                'Gunung Sugih',
                'Kalirejo',
                'Kota Gajah',
                'Padang Ratu',
                'Pubian',
                'Putra Rumbia',
                'Rumbia',
                'Selagai Lingga',
                'Sendang Agung',
                'Seputih Agung',
                'Seputih Banyak',
                'Seputih Mataram',
                'Seputih Raman',
                'Terbanggi Besar',
                'Terusan Nunyai',
                'Trimurjo',
                'Way Pengubuan',
                'Way Seputih',
            ],

            'Kabupaten Lampung Timur' => [
                'Bandar Sribhawono',
                'Batanghari',
                'Batanghari Nuban',
                'Braja Selebah',
                'Bumi Agung',
                'Gunung Pelindung',
                'Jabung',
                'Labuhan Maringgai',
                'Labuhan Ratu',
                'Marga Sekampung',
                'Mataram Baru',
                'Melinting',
                'Metro Kibang',
                'Pasir Sakti',
                'Pekalongan',
                'Purbolinggo',
                'Raman Utara',
                'Sekampung',
                'Sekampung Udik',
                'Sukadana',
                'Waway Karya',
                'Way Bungur',
                'Way Jepara',
            ],

            'Kabupaten Lampung Utara' => [
                'Abung Barat',
                'Abung Kunang',
                'Abung Pekurun',
                'Abung Selatan',
                'Abung Semuli',
                'Abung Surakarta',
                'Abung Tengah',
                'Abung Timur',
                'Abung Tinggi',
                'Blambangan Pagar',
                'Bukit Kemuning',
                'Bunga Mayang',
                'Hulu Sungkai',
                'Kotabumi',
                'Kotabumi Selatan',
                'Kotabumi Utara',
                'Muara Sungkai',
                'Sungkai Barat',
                'Sungkai Jaya',
                'Sungkai Selatan',
                'Sungkai Tengah',
                'Sungkai Utara',
                'Tanjung Raja',
            ],

            'Kabupaten Pesawaran' => [
                'Gedong Tataan',
                'Kedondong',
                'Marga Punduh',
                'Negeri Katon',
                'Padang Cermin',
                'Punduh Pidada',
                'Tegineneng',
                'Teluk Pandan',
                'Way Khilau',
                'Way Lima',
                'Way Ratai',
            ],

            'Kabupaten Pringsewu' => [
                'Adiluwih',
                'Ambarawa',
                'Banyumas',
                'Gading Rejo',
                'Pagelaran',
                'Pagelaran Utara',
                'Pardasuka',
                'Pringsewu',
                'Sukoharjo',
            ],

            'Kabupaten Tanggamus' => [
                'Air Naningan',
                'Bandar Negeri Semuong',
                'Bulok',
                'Cukuh Balak',
                'Gisting',
                'Gunung Alip',
                'Kelumbayan',
                'Kelumbayan Barat',
                'Kota Agung',
                'Kota Agung Barat',
                'Kota Agung Timur',
                'Limau',
                'Pematang Sawa',
                'Pugung',
                'Pulau Panggung',
                'Semaka',
                'Sumberejo',
                'Talang Padang',
                'Ulubelu',
                'Wonosobo',
            ],

            'Kabupaten Tulang Bawang' => [
                'Banjar Agung',
                'Banjar Baru',
                'Banjar Margo',
                'Dente Teladas',
                'Gedung Aji',
                'Gedung Aji Baru',
                'Meraksa Aji',
                'Menggala',
                'Penawar Aji',
                'Penawar Tama',
                'Rawa Jitu Selatan',
                'Rawa Jitu Timur',
                'Rawa Pitu',
                'Tulang Bawang Udik',
            ],

            'Kabupaten Tulang Bawang Barat' => [
                'Batu Putih',
                'Gunung Agung',
                'Gunung Terang',
                'Lambu Kibang',
                'Pagar Dewa',
                'Tulang Bawang Tengah',
                'Tumijajar',
                'Way Kenanga',
            ],

            'Kabupaten Way Kanan' => [
                'Banjit',
                'Baradatu',
                'Bumi Agung',
                'Buay Bahuga',
                'Buay Pemuka Peliung',
                'Gunung Labuhan',
                'Kasui',
                'Negeri Agung',
                'Negeri Besar',
                'Pakuan Ratu',
                'Rebang Tangkas',
                'Blambangan Umpu',
                'Way Tuba',
                'Umpu Semenguk',
                // Catatan: input user hanya menyebut 15 nama untuk Way Kanan,
                // padahal BPS mencatat 20 kecamatan. Lihat pemetaan.md.
            ],

            'Kabupaten Mesuji' => [
                'Mesuji',
                'Mesuji Timur',
                'Panca Jaya',
                'Rawa Jitu Utara',
                'Simpang Pematang',
                'Tanjung Raya',
                'Way Serdang',
            ],

            'Kabupaten Pesisir Barat' => [
                'Bangkunat',
                'Bengkunat Belimbing',
                'Karya Penggawa',
                'Krui Selatan',
                'Krui Utara',
                'Lemong',
                'Ngambur',
                'Ngaras',
                'Pesisir Selatan',
                'Pesisir Tengah',
                'Pulau Pisang',
            ],

            'Kabupaten Lampung Barat' => [
                'Air Hitam',
                'Balik Bukit',
                'Batu Brak',
                'Batu Ketulis',
                'Belalau',
                'Gedung Surian',
                'Kebun Tebu',
                'Lumbok Seminung',
                'Pagar Dewa',
                'Sekincau',
                'Sukau',
                'Suoh',
                'Bandar Negeri Suoh',
                'Sumber Jaya',
                'Way Tenong',
            ],
        ];
    }
}
