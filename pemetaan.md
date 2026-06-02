# Pemetaan Kecamatan — Provinsi Lampung

Dokumen ini memetakan 229 kecamatan di 15 kabupaten/kota di Provinsi Lampung ke struktur database aplikasi Banyu.

## Struktur Target

```
kabupaten_kota (15)
└── kecamatan (229)
    └── curah_hujan (time-series, dihitung status on-the-fly)
```

## Kabupaten/Kota (15)

Total: **13 kabupaten + 2 kota**

| No | Kabupaten/Kota | Jumlah Kecamatan |
|---|---|---|
| 1  | Kabupaten Lampung Barat         | 15 |
| 2  | Kabupaten Lampung Selatan       | 17 |
| 3  | Kabupaten Lampung Tengah        | 26 (lihat catatan 1) |
| 4  | Kabupaten Lampung Timur         | 23 (lihat catatan 2) |
| 5  | Kabupaten Lampung Utara         | 23 |
| 6  | Kabupaten Mesuji                | 7  |
| 7  | Kabupaten Pesawaran             | 11 |
| 8  | Kabupaten Pesisir Barat         | 11 (lihat catatan 3) |
| 9  | Kabupaten Pringsewu             | 9  |
| 10 | Kabupaten Tanggamus             | 20 |
| 11 | Kabupaten Tulang Bawang         | 14 (lihat catatan 4) |
| 12 | Kabupaten Tulang Bawang Barat   | 8  (lihat catatan 5) |
| 13 | Kabupaten Way Kanan             | 15 |
| 14 | Kota Bandar Lampung             | 20 |
| 15 | Kota Metro                      | 5  |
| **Total** | | **224** |

**Selisih dari 229: 5** — lihat catatan 6.

## Catatan Pembersihan Data

Data input mengandung duplikat dan inkonsistensi. Berikut keputusan yang diambil saat membuat seeder:

### Catatan 1 — Lampung Tengah
- Input menyebut 28 nama, tetapi "Bandar Surabaya" dan "Kota Gajah" muncul 2×.
- **Dihapus 2 duplikat** → 26 kecamatan unik.

### Catatan 2 — Lampung Timur
- Input menyebut 24 nama, tetapi "Bandar Sribhawono" muncul 2×.
- **Dihapus 1 duplikat** → 23 kecamatan unik.

### Catatan 3 — Pesisir Barat
- Input memiliki list utama (11) + "tambahan pemekaran terbaru" (11) yang isinya **persis identik**.
- **Diambil list utama saja** → 11 kecamatan. Bukan 22.

### Catatan 4 — Tulang Bawang
- Input menyebut 15 nama, tetapi "Rawa Jitu Timur" / "Rawajitu Timur" muncul 2× (kapitalisasi beda).
- **Diambil sekali** dengan ejaan "Rawa Jitu Timur" (mengikuti penulisan BPS) → 14 kecamatan unik.

### Catatan 5 — Tulang Bawang Barat
- Input menyebut 9 nama, tetapi "Gunung Terang" muncul 2×.
- **Dihapus 1 duplikat** → 8 kecamatan unik.

### Catatan 6 — Selisih 5 dari total 229
Total setelah deduplikasi: **224**, bukan 229.

Kemungkinan penyebab:
1. **5 kecamatan di Way Kanan hilang dari input.** Input Way Kanan hanya menyebut 14 nama + "Umpu Semenguk" = 15, padahal kabupaten ini seharusnya punya **20 kecamatan** sesuai data BPS. Daftar resmi yang hilang: **Bahuga, Bumi Agung, Negara Batin, Pakuan Ratu, Rebang Tangkas** (atau subset lain — perlu verifikasi dari sumber resmi).
2. Atau **ada kecamatan baru hasil pemekaran** yang belum tercatat.

**Tindak lanjut:** Verifikasi ulang dengan sumber resmi (Permendagri atau BPS Lampung) sebelum deploy.

## Kecamatan dengan Nama Sama Lintas Kabupaten

Ini **bukan duplikat** — mereka adalah kecamatan berbeda di kabupaten berbeda. Foreign key eksplisit memastikan tidak ada salah assign:

| Nama Kecamatan | Muncul di |
|---|---|
| Rajabasa    | Lampung Selatan, Bandar Lampung |
| Pagar Dewa  | Tulang Bawang Barat, Lampung Barat |

## Cara Pakai

```bash
php artisan migrate
php artisan db:seed --class=KabupatenKotaSeeder
php artisan db:seed --class=KecamatanSeeder
```

Untuk verifikasi cepat:

```bash
php artisan tinker
>>> \App\Models\KabupatenKota::withCount('kecamatan')->get('nama', 'kecamatan_count')
```

Nama Kecamatan, Kabupaten/Kota

Kota Metro (5)
Metro Barat, Kota Metro
Metro Pusat, Kota Metro
Metro Selatan, Kota Metro
Metro Timur, Kota Metro
Metro Utara, Kota Metro

Kota Bandar Lampung (20)
Bumi Waras, Kota Bandar Lampung
Enggal, Kota Bandar Lampung
Kedamaian, Kota Bandar Lampung
Kedaton, Kota Bandar Lampung
Kemiling, Kota Bandar Lampung
Labuhan Ratu, Kota Bandar Lampung
Langkapura, Kota Bandar Lampung
Panjang, Kota Bandar Lampung
Rajabasa, Kota Bandar Lampung
Sukabumi, Kota Bandar Lampung
Sukarame, Kota Bandar Lampung
Tanjung Karang Barat, Kota Bandar Lampung
Tanjung Karang Pusat, Kota Bandar Lampung
Tanjung Karang Timur, Kota Bandar Lampung
Tanjung Senang, Kota Bandar Lampung
Teluk Betung Barat, Kota Bandar Lampung
Teluk Betung Selatan, Kota Bandar Lampung
Teluk Betung Timur, Kota Bandar Lampung
Teluk Betung Utara, Kota Bandar Lampung
Way Halim, Kota Bandar Lampung

Kabupaten Lampung Selatan (17)
Bakauheni, Lampung Selatan
Candipuro, Lampung Selatan
Jati Agung, Lampung Selatan
Kalianda, Lampung Selatan
Katibung, Lampung Selatan
Ketapang, Lampung Selatan
Merbau Mataram, Lampung Selatan
Natar, Lampung Selatan
Palas, Lampung Selatan
Penengahan, Lampung Selatan
Rajabasa, Lampung Selatan
Sidomulyo, Lampung Selatan
Sragi, Lampung Selatan
Tanjung Bintang, Lampung Selatan
Tanjung Sari, Lampung Selatan
Way Panji, Lampung Selatan
Way Sulan, Lampung Selatan

Kabupaten Lampung Tengah (28)
Anak Ratu Aji
Anak Tuha
Bandar Mataram
Bandar Surabaya
Bangun Rejo
Bekri
Bumi Nabung
Bumi Ratu Nuban
Gunung Sugih
Kalirejo
Kota Gajah
Padang Ratu
Pubian
Putra Rumbia
Rumbia
Selagai Lingga
Sendang Agung
Seputih Agung
Seputih Banyak
Seputih Mataram
Seputih Raman
Terbanggi Besar
Terusan Nunyai
Trimurjo
Way Pengubuan
Way Seputih
Bandar Surabaya
Kota Gajah

Kabupaten Lampung Timur (24)
Bandar Sribhawono
Batanghari
Batanghari Nuban
Braja Selebah
Bumi Agung
Gunung Pelindung
Jabung
Labuhan Maringgai
Labuhan Ratu
Marga Sekampung
Mataram Baru
Melinting
Metro Kibang
Pasir Sakti
Pekalongan
Purbolinggo
Raman Utara
Sekampung
Sekampung Udik
Sukadana
Waway Karya
Way Bungur
Way Jepara
Bandar Sribhawono

Kabupaten Lampung Utara (23)
Abung Barat
Abung Kunang
Abung Pekurun
Abung Selatan
Abung Semuli
Abung Surakarta
Abung Tengah
Abung Timur
Abung Tinggi
Blambangan Pagar
Bukit Kemuning
Bunga Mayang
Hulu Sungkai
Kotabumi
Kotabumi Selatan
Kotabumi Utara
Muara Sungkai
Sungkai Barat
Sungkai Jaya
Sungkai Selatan
Sungkai Tengah
Sungkai Utara
Tanjung Raja
Kabupaten Pesawaran (11)
Gedong Tataan
Kedondong
Marga Punduh
Negeri Katon
Padang Cermin
Punduh Pidada
Tegineneng
Teluk Pandan
Way Khilau
Way Lima
Way Ratai
Kabupaten Pringsewu (9)
Adiluwih
Ambarawa
Banyumas
Gading Rejo
Pagelaran
Pagelaran Utara
Pardasuka
Pringsewu
Sukoharjo
Kabupaten Tanggamus (20)
Air Naningan
Bandar Negeri Semuong
Bulok
Cukuh Balak
Gisting
Gunung Alip
Kelumbayan
Kelumbayan Barat
Kota Agung
Kota Agung Barat
Kota Agung Timur
Limau
Pematang Sawa
Pugung
Pulau Panggung
Semaka
Sumberejo
Talang Padang
Ulubelu
Wonosobo
Kabupaten Tulang Bawang (15)
Banjar Agung
Banjar Baru
Banjar Margo
Dente Teladas
Gedung Aji
Gedung Aji Baru
Meraksa Aji
Penawar Aji
Penawar Tama
Rawa Jitu Selatan
Rawa Jitu Timur
Rawa Pitu
Rawajitu Timur
Tulang Bawang Udik
Menggala
Kabupaten Tulang Bawang Barat (9)
Batu Putih
Gunung Agung
Gunung Terang
Lambu Kibang
Pagar Dewa
Tulang Bawang Tengah
Tumijajar
Way Kenanga
Gunung Terang
Kabupaten Way Kanan (15)
Banjit
Baradatu
Bahuga
Buay Bahuga
Bumi Agung
Gunung Labuhan
Kasui
Negeri Agung
Negeri Besar
Pakuan Ratu
Rebang Tangkas
Blambangan Umpu
Way Tuba
Buay Pemuka Peliung
Umpu Semenguk
Kabupaten Mesuji (7)
Mesuji
Mesuji Timur
Panca Jaya
Rawa Jitu Utara
Simpang Pematang
Tanjung Raya
Way Serdang
Kabupaten Pesisir Barat (11)
Bangkunat
Bengkunat Belimbing
Karya Penggawa
Krui Selatan
Lemong
Ngambur
Ngaras
Pesisir Selatan
Pesisir Tengah
Pesisir Utara
Pulau Pisang
Kabupaten Lampung Barat (15)
Air Hitam
Balik Bukit
Batu Brak
Belalau
Batu Ketulis
Gedung Surian
Kebun Tebu
Lumbok Seminung
Pagar Dewa
Sekincau
Sukau
Suoh
Bandar Negeri Suoh
Sumber Jaya
Way Tenong
Kabupaten Pesisir Barat (tambahan pemekaran terbaru)
Ngaras
Bangkunat
Karya Penggawa
Krui Selatan
Krui Utara
Pesisir Tengah
Pesisir Selatan
Lemong
Pulau Pisang
Ngambur
Bengkunat Belimbing
Kabupaten Mesuji (7)
Mesuji
Mesuji Timur
Panca Jaya
Rawa Jitu Utara
Simpang Pematang
Tanjung Raya
Way Serdang