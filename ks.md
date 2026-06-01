# Kebutuhan Sistem — Website Mitigasi Banjir Provinsi Lampung

## Palet Warna

Warna identitas website Banyu. Digunakan di seluruh UI (TopBar, tombol, status, dsb).

| Peran | Hex | Penggunaan |
|---|---|---|
| Latar utama | `#F3F4F6` | Background halaman dan area konten (mode terang) |
| Aksen / Brand | `#dc143c` | Warna merah utama — tombol primer, status siaga, judul aksen, link aktif |

Catatan:
- Mode gelap (dark mode) tetap memakai palet netral Tailwind untuk body (abu-abu), tetapi elemen interaktif/brand seperti tombol primer tetap menggunakan `#dc143c`.
- Semua komponen baru **wajib** menggunakan dua warna di atas sebagai acuan visual utama; warna lain dari Tailwind hanya untuk abu-abu, border, dan teks.

---

## 1. Latar Belakang

Website ini merupakan sistem pemantauan bencana banjir berbasis web yang menampilkan peta interaktif disertai informasi curah hujan secara real-time per kecamatan di seluruh Provinsi Lampung. Data curah hujan diperoleh dari dua sumber API yaitu BMKG dan Open-Meteo, yang digabungkan untuk menghasilkan nilai representatif yang akurat.

Tujuan utama sistem adalah memberikan peringatan dini kepada masyarakat dan pemangku kepentingan terkait potensi banjir berdasarkan intensitas curah hujan yang terpantau, serta menyediakan informasi daftar lokasi evakuasi terdekat.

---

## 2. Cakupan Wilayah

- **Provinsi:** Lampung
- **Jumlah Kabupaten/Kota:** 15
- **Jumlah Kecamatan:** 229

---

## 3. Fitur Utama Sistem

### 3.1 Peta Interaktif
- Peta berbasis web menggunakan Leaflet.js menampilkan seluruh wilayah Provinsi Lampung
- Setiap kecamatan ditampilkan sebagai poligon berwarna sesuai tingkat intensitas curah hujan
- Warna peta diperbarui secara otomatis mengikuti siklus pengambilan data real-time
- Pengguna dapat mengklik kecamatan untuk melihat popup informasi detail

### 3.2 Popup Informasi Curah Hujan per Kecamatan
Setiap kecamatan memiliki popup yang menampilkan:
- Nama kecamatan dan kabupaten/kota
- Nilai curah hujan dalam satuan mm/jam
- Indikator warna dan status kondisi curah hujan
- Waktu pembaruan data terakhir

### 3.3 Klasifikasi Intensitas Curah Hujan

| Intensitas (mm/jam) | Warna | Status |
|---|---|---|
| < 10 mm/jam | Hijau | Tidak hujan / gerimis, aman |
| 10 – 20 mm/jam | Kuning | Hujan sedang, pantau kondisi |
| 20 – 50 mm/jam | Oranye | Hujan deras, waspada |
| 50 – 100 mm/jam | Merah Muda | Hujan sangat lebat, siaga |
| > 100 mm/jam | Merah Tua | Ekstrem, potensi banjir tinggi |

### 3.4 Data Curah Hujan Real-Time dari 2 Sumber
- **BMKG** — menyediakan data curah hujan tingkat kabupaten/kota (15 wilayah)
- **Open-Meteo** — menyediakan data curah hujan tingkat kecamatan (229 kecamatan) berdasarkan koordinat pusat tiap kecamatan
- Data diambil secara bergantian (alternating polling) untuk menghindari rate limit
- Nilai yang ditampilkan adalah **nilai tertinggi** antara data BMKG dan Open-Meteo per kecamatan

### 3.5 Bahasa Antarmuka
- Seluruh antarmuka website menggunakan **Bahasa Indonesia**
- Semua label, teks tombol, popup, status, pesan kesalahan, dan keterangan peta ditulis dalam Bahasa Indonesia

### 3.6 Mode Tampilan Terang / Gelap
- Pengguna dapat beralih antara mode **terang (light)** dan **gelap (dark)** melalui tombol toggle di antarmuka
- Preferensi mode tampilan disimpan di `localStorage` sehingga pengaturan tetap tersimpan saat pengguna membuka kembali website
- Implementasi menggunakan fitur `dark mode` bawaan Tailwind CSS

### 3.7 Peta Banjir & Daftar Lokasi Evakuasi
- Pengguna dapat melihat titik-titik lokasi evakuasi yang ditampilkan di atas peta
- Tersedia daftar lokasi evakuasi yang dapat ditelusuri (nama lokasi, alamat, kapasitas jika tersedia)
- Data lokasi evakuasi dikelola melalui database dan dapat diperbarui oleh admin

---

## 4. Sumber Data API

| Sumber | Cakupan | Interval Polling |
|---|---|---|
| BMKG | 15 Kabupaten/Kota di Lampung | Setiap siklus bergantian |
| Open-Meteo | 229 Kecamatan (koordinat lat/lon) | Setiap siklus bergantian |

**Pola siklus pengambilan data:**

BMKG → Open-Meteo (Bandar Lampung) → BMKG → Open-Meteo (Metro) → BMKG → Open-Meteo (Lampung Selatan) → ... dst.

---

## 5. Stack Teknologi

| Komponen | Teknologi |
|---|---|
| Frontend UI | React |
| Styling | Tailwind CSS |
| Peta Interaktif | Leaflet.js |
| Data Geospasial | GeoJSON per kecamatan (229 fitur) |
| Backend API | Laravel (PHP) |
| Database | MySQL |
| Package Manager (Frontend) | npm |
| Runtime (Frontend) | Node.js |
| Package Manager (Backend) | Composer |

---

## 6. Arsitektur Sistem

```
[Browser Pengguna]
       |
       ├── React + Leaflet.js (Peta + UI)
       |         |
       |         ├── Polling BMKG API (langsung dari frontend)
       |         └── Polling Open-Meteo API (langsung dari frontend)
       |
       └── Laravel API (Backend)
                 |
                 └── MySQL Database
                           |
                           └── Tabel: lokasi_evakuasi
```

---

## 7. Struktur Database

### Tabel: `lokasi_evakuasi`

| Kolom | Tipe Data | Keterangan |
|---|---|---|
| id | INT (PK) | Primary key |
| nama | VARCHAR | Nama lokasi evakuasi |
| alamat | TEXT | Alamat lengkap |
| kecamatan | VARCHAR | Nama kecamatan |
| kabupaten | VARCHAR | Nama kabupaten/kota |
| latitude | DECIMAL | Koordinat latitude |
| longitude | DECIMAL | Koordinat longitude |
| kapasitas | INT | Kapasitas tampung (opsional) |
| created_at | TIMESTAMP | Waktu dibuat |
| updated_at | TIMESTAMP | Waktu diperbarui |

---

## 8. API Endpoint Laravel

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/api/evakuasi` | Ambil semua data lokasi evakuasi |
| GET | `/api/evakuasi?kecamatan={nama}` | Filter lokasi evakuasi per kecamatan |
| GET | `/api/evakuasi?kabupaten={nama}` | Filter lokasi evakuasi per kabupaten |

---

## 9. Catatan Pengembangan

- GeoJSON batas kecamatan perlu disiapkan terpisah (sumber: BIG / OpenStreetMap)
- Akurasi data bergantung pada ketersediaan dan kecepatan respons API BMKG dan Open-Meteo
- Sistem dapat diperluas di masa mendatang dengan notifikasi push atau SMS untuk level ekstrem