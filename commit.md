# Rencana Commit — Website Mitigasi Banjir Provinsi Lampung

Setiap commit dikerjakan secara berurutan. Frontend (React) dan Backend (Laravel) berjalan sejajar per fitur.

---

## 🚀 TAHAP 1 — Setup Proyek

### Commit 1 — `init: setup proyek React dengan Vite`
**Dikerjakan:** Inisialisasi proyek React menggunakan Vite sebagai build tool
**Menggunakan:** Node.js, npm, Vite, React
**Detail:**
- Jalankan `npm create vite@latest` pilih template React
- Hapus file bawaan yang tidak diperlukan (App.css, logo, dll)
- Pastikan `npm run dev` berjalan di `localhost:5173`

---

### Commit 2 — `init: setup Tailwind CSS`
**Dikerjakan:** Integrasi Tailwind CSS ke proyek React
**Menggunakan:** Tailwind CSS, PostCSS, npm
**Detail:**
- Install Tailwind: `npm install -D tailwindcss postcss autoprefixer`
- Jalankan `npx tailwindcss init -p`
- Konfigurasi `tailwind.config.js` dan `index.css`
- Uji coba class Tailwind di `App.jsx`

---

### Commit 3 — `init: setup dark mode Tailwind`
**Dikerjakan:** Aktifkan dark mode berbasis class di Tailwind dan buat logika toggle
**Menggunakan:** Tailwind CSS (`darkMode: 'class'`), React useState, localStorage
**Detail:**
- Set `darkMode: 'class'` di `tailwind.config.js`
- Buat hook `useDarkMode.js` yang membaca dan menyimpan preferensi ke `localStorage`
- Tambahkan/hapus class `dark` di elemen `<html>` berdasarkan state

---

### Commit 4 — `init: setup proyek Laravel`
**Dikerjakan:** Inisialisasi proyek Laravel sebagai backend API
**Menggunakan:** PHP, Composer, Laravel
**Detail:**
- Jalankan `composer create-project laravel/laravel backend`
- Konfigurasi `.env` Laravel (koneksi MySQL, nama database)
- Pastikan `php artisan serve` berjalan di `localhost:8000`

---

### Commit 5 — `init: setup database MySQL dan koneksi Laravel`
**Dikerjakan:** Buat database dan konfigurasi koneksi Laravel ke MySQL
**Menggunakan:** MySQL, Laravel `.env`
**Detail:**
- Buat database baru di MySQL: `mitigasi_banjir`
- Isi konfigurasi `DB_*` di file `.env` Laravel
- Uji koneksi dengan `php artisan migrate`

---

## 🏗️ TAHAP 2 — Layout Dasar

### Commit 6 — `feat: buat komponen TopBar`
**Dikerjakan:** Komponen navigasi atas website
**Menggunakan:** React, Tailwind CSS
**Detail:**
- Buat file `src/components/TopBar.jsx`
- Isi: logo/nama website di kiri, tombol toggle dark mode di kanan
- Responsif untuk desktop dan mobile
- Support dark mode (bg berubah saat mode gelap)

---

### Commit 7 — `feat: buat tombol toggle dark/light mode`
**Dikerjakan:** Tombol di TopBar untuk beralih mode terang dan gelap
**Menggunakan:** React, Tailwind CSS, hook `useDarkMode`
**Detail:**
- Buat file `src/components/DarkModeToggle.jsx`
- Tampilkan ikon matahari (mode terang) atau bulan (mode gelap)
- Klik tombol memanggil fungsi dari hook `useDarkMode`
- Animasi transisi warna saat berganti mode

---

### Commit 8 — `feat: buat komponen Sidebar`
**Dikerjakan:** Panel samping kiri untuk navigasi dan daftar fitur
**Menggunakan:** React, Tailwind CSS
**Detail:**
- Buat file `src/components/Sidebar.jsx`
- Isi: menu navigasi (Peta, Evakuasi, Legenda)
- Bisa dibuka/tutup (collapsed) di layar kecil
- Support dark mode

---

### Commit 9 — `feat: buat layout utama (TopBar + Sidebar + area konten)`
**Dikerjakan:** Susun layout keseluruhan halaman dengan TopBar di atas, Sidebar di kiri, dan area utama di kanan
**Menggunakan:** React, Tailwind CSS (flexbox/grid)
**Detail:**
- Buat file `src/layouts/MainLayout.jsx`
- Gabungkan `TopBar`, `Sidebar`, dan slot konten utama
- Pastikan layout tidak overflow dan responsif

---

## 🗺️ TAHAP 3 — Peta Interaktif

### Commit 10 — `feat: install dan setup Leaflet.js`
**Dikerjakan:** Integrasi library peta Leaflet ke React
**Menggunakan:** npm, Leaflet, React-Leaflet
**Detail:**
- Install: `npm install leaflet react-leaflet`
- Import CSS Leaflet di `main.jsx`
- Buat komponen `src/components/Map.jsx` dengan peta dasar
- Peta terpusat di koordinat Provinsi Lampung (lat: -4.5, lon: 105.4)

---

### Commit 11 — `feat: tampilkan peta dasar Provinsi Lampung`
**Dikerjakan:** Peta muncul di area konten utama dengan tile OpenStreetMap
**Menggunakan:** React-Leaflet, TileLayer OpenStreetMap
**Detail:**
- Set zoom level awal agar seluruh Lampung terlihat
- Tambahkan tile layer: `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`
- Peta mengisi penuh area konten (tinggi 100%)

---

### Commit 12 — `feat: load data GeoJSON batas kecamatan`
**Dikerjakan:** Tampilkan batas wilayah 229 kecamatan di atas peta
**Menggunakan:** React-Leaflet GeoJSON layer, file GeoJSON Lampung
**Detail:**
- Simpan file GeoJSON di `src/data/lampung_kecamatan.geojson`
- Buat layer GeoJSON di `Map.jsx` yang menggambar poligon tiap kecamatan
- Garis batas berwarna abu-abu tipis, fill transparan sebagai default

---

### Commit 13 — `feat: buat fungsi klasifikasi warna curah hujan`
**Dikerjakan:** Fungsi yang menerima nilai curah hujan (mm/jam) dan mengembalikan warna sesuai klasifikasi
**Menggunakan:** JavaScript (utility function)
**Detail:**
- Buat file `src/utils/classifyRainfall.js`
- 5 level: Hijau / Kuning / Oranye / Merah Muda / Merah Tua
- Fungsi: `classifyRainfall(mmPerJam)` → return `{ warna, status, level }`

---

### Commit 14 — `feat: warnai poligon kecamatan berdasarkan curah hujan`
**Dikerjakan:** Setiap poligon kecamatan diwarnai sesuai nilai curah hujan menggunakan fungsi klasifikasi
**Menggunakan:** React-Leaflet, `classifyRainfall.js`
**Detail:**
- Integrasikan fungsi klasifikasi ke style GeoJSON layer
- Warna fill poligon berubah sesuai data curah hujan per kecamatan
- Gunakan data dummy sementara untuk uji tampilan warna

---

### Commit 15 — `feat: buat popup informasi per kecamatan`
**Dikerjakan:** Saat kecamatan diklik, muncul popup berisi detail curah hujan
**Menggunakan:** React-Leaflet Popup, Tailwind CSS
**Detail:**
- Tambahkan event `onClick` di tiap poligon GeoJSON
- Popup menampilkan: nama kecamatan, kabupaten, nilai mm/jam, status, warna indikator, waktu update
- Styling popup dalam Bahasa Indonesia

---

## 🌧️ TAHAP 4 — Integrasi Data Curah Hujan

### Commit 16 — `feat: integrasi API Open-Meteo untuk data curah hujan`
**Dikerjakan:** Ambil data curah hujan dari Open-Meteo berdasarkan koordinat tiap kecamatan
**Menggunakan:** React, fetch API, Open-Meteo API
**Detail:**
- Buat file `src/services/openMeteo.js`
- Fungsi: `fetchRainfallOpenMeteo(lat, lon)` → return nilai mm/jam
- Gunakan endpoint: `https://api.open-meteo.com/v1/forecast`
- Parameter: `hourly=precipitation`, ambil nilai jam terakhir

---

### Commit 17 — `feat: integrasi API BMKG untuk data curah hujan`
**Dikerjakan:** Ambil data curah hujan dari BMKG per kabupaten/kota
**Menggunakan:** React, fetch API, BMKG API
**Detail:**
- Buat file `src/services/bmkg.js`
- Fungsi: `fetchRainfallBMKG(kodaWilayah)` → return nilai mm/jam
- Mapping kode wilayah 15 kabupaten/kota Lampung

---

### Commit 18 — `feat: buat mekanisme polling bergantian BMKG dan Open-Meteo`
**Dikerjakan:** Logika pengambilan data secara bergantian antara BMKG dan Open-Meteo untuk menghindari rate limit
**Menggunakan:** React useEffect, setInterval, useState
**Detail:**
- Buat file `src/hooks/useRainfallPolling.js`
- Siklus: BMKG → Open-Meteo kecamatan 1 → BMKG → Open-Meteo kecamatan 2 → dst
- Simpan hasil di state `rainfallData` berupa objek `{ kecamatanId: mmPerJam }`

---

### Commit 19 — `feat: tampilkan nilai tertinggi antara BMKG dan Open-Meteo`
**Dikerjakan:** Bandingkan nilai BMKG dan Open-Meteo per kecamatan, tampilkan yang tertinggi
**Menggunakan:** JavaScript, hook `useRainfallPolling`
**Detail:**
- Tambahkan logika `Math.max(nilaiBMKG, nilaiOpenMeteo)` per kecamatan
- Nilai tertinggi yang digunakan untuk pewarnaan peta dan popup
- Catat sumber data mana yang menghasilkan nilai tertinggi

---

### Commit 20 — `feat: tampilkan waktu pembaruan data terakhir di popup`
**Dikerjakan:** Setiap popup kecamatan menampilkan kapan data terakhir diperbarui
**Menggunakan:** JavaScript Date, React state
**Detail:**
- Simpan timestamp setiap kali data diperbarui
- Format tampilan: `Diperbarui: 01 Jun 2026, 14:32 WIB`
- Tampilkan di baris terakhir popup

---

## 🏃 TAHAP 5 — Fitur Evakuasi (Backend + Frontend)

### Commit 21 — `feat: buat migration tabel lokasi_evakuasi di Laravel`
**Dikerjakan:** Skema database untuk menyimpan data lokasi evakuasi
**Menggunakan:** Laravel Migration, MySQL
**Detail:**
- Jalankan `php artisan make:migration create_lokasi_evakuasi_table`
- Kolom: id, nama, alamat, kecamatan, kabupaten, latitude, longitude, kapasitas, timestamps
- Jalankan `php artisan migrate`

---

### Commit 22 — `feat: buat model dan seeder data lokasi evakuasi`
**Dikerjakan:** Model Eloquent dan data awal lokasi evakuasi Lampung
**Menggunakan:** Laravel Model, Laravel Seeder
**Detail:**
- Jalankan `php artisan make:model LokasiEvakuasi`
- Buat seeder dengan beberapa data contoh per kabupaten
- Jalankan `php artisan db:seed`

---

### Commit 23 — `feat: buat API endpoint GET /api/evakuasi di Laravel`
**Dikerjakan:** Endpoint untuk mengambil semua data lokasi evakuasi
**Menggunakan:** Laravel Controller, Laravel Route API
**Detail:**
- Jalankan `php artisan make:controller EvakuasiController`
- Method `index()` return semua data sebagai JSON
- Daftarkan route di `routes/api.php`
- Aktifkan CORS agar bisa diakses dari React

---

### Commit 24 — `feat: buat API endpoint filter evakuasi per kecamatan dan kabupaten`
**Dikerjakan:** Endpoint dengan query parameter untuk filter data evakuasi
**Menggunakan:** Laravel Controller, Query Builder
**Detail:**
- Tambahkan filter `?kecamatan=` dan `?kabupaten=` di method `index()`
- Return data yang sudah difilter sebagai JSON

---

### Commit 25 — `feat: ambil data evakuasi dari API Laravel di React`
**Dikerjakan:** Service function di React untuk fetch data lokasi evakuasi dari backend
**Menggunakan:** React, fetch API
**Detail:**
- Buat file `src/services/evakuasi.js`
- Fungsi: `fetchEvakuasi()` dan `fetchEvakuasiByKecamatan(kecamatan)`
- Base URL menggunakan environment variable `VITE_API_URL`

---

### Commit 26 — `feat: tampilkan marker lokasi evakuasi di peta`
**Dikerjakan:** Titik-titik lokasi evakuasi muncul di atas peta sebagai marker
**Menggunakan:** React-Leaflet Marker, custom icon
**Detail:**
- Buat ikon marker khusus evakuasi (warna hijau / ikon tenda)
- Setiap marker punya popup: nama lokasi, alamat, kapasitas
- Data marker diambil dari API Laravel

---

### Commit 27 — `feat: buat komponen daftar lokasi evakuasi di Sidebar`
**Dikerjakan:** Daftar lokasi evakuasi yang bisa ditelusuri di panel Sidebar
**Menggunakan:** React, Tailwind CSS
**Detail:**
- Buat file `src/components/EvakuasiList.jsx`
- Tampilkan nama, kecamatan, kabupaten tiap lokasi
- Klik item → peta otomatis fly ke marker tersebut
- Support dark mode

---

## 🎨 TAHAP 6 — Legenda & Finishing

### Commit 28 — `feat: buat komponen Legenda peta`
**Dikerjakan:** Keterangan warna klasifikasi curah hujan yang tampil di pojok peta
**Menggunakan:** React-Leaflet Control, Tailwind CSS
**Detail:**
- Buat file `src/components/MapLegend.jsx`
- Tampilkan 5 baris warna beserta keterangan status dalam Bahasa Indonesia
- Posisi: pojok kanan bawah peta
- Support dark mode

---

### Commit 29 — `feat: pastikan seluruh teks antarmuka dalam Bahasa Indonesia`
**Dikerjakan:** Review dan perbaiki semua teks di seluruh komponen agar menggunakan Bahasa Indonesia
**Menggunakan:** React (semua komponen)
**Detail:**
- Cek semua label, placeholder, status, pesan error, keterangan
- Pastikan tidak ada teks dalam Bahasa Inggris yang terlihat oleh pengguna
- Format tanggal/waktu menggunakan format Indonesia

---

### Commit 30 — `feat: uji coba integrasi penuh frontend dan backend`
**Dikerjakan:** Pengujian menyeluruh semua fitur secara terintegrasi
**Menggunakan:** Browser, React dev server, Laravel server
**Detail:**
- Pastikan peta tampil dan berwarna sesuai data
- Popup muncul dengan data yang benar
- Marker evakuasi tampil dan daftar evakuasi berfungsi
- Toggle dark/light mode berfungsi dan tersimpan
- Semua teks dalam Bahasa Indonesia