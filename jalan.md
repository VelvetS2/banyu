# Cara Menjalankan Website Banyu

Panduan ini untuk developer yang baru clone repo dan ingin menjalankan **Website Mitigasi Banjir Provinsi Lampung** di mesin lokal.

---

## 1. Prasyarat

Pastikan tools berikut sudah terpasang:

| Tool | Versi Minimum | Cek dengan |
|---|---|---|
| PHP | 8.3+ | `php -v` |
| Composer | 2.x | `composer --version` |
| Node.js | 22+ | `node -v` |
| npm | 10+ | `npm -v` |
| PostgreSQL | 14+ | `psql --version` |
| Git | terbaru | `git --version` |

### Ekstensi PHP yang wajib aktif

- `pdo_pgsql` (koneksi PostgreSQL)
- `mbstring`, `openssl`, `tokenizer`, `xml`, `ctype`, `fileinfo`, `bcmath`, `curl`

Cek ekstensi aktif:

```bash
php -m
```

Pastikan ada `pdo_pgsql` di daftar. Jika belum, install:

- **Ubuntu/Debian:** `sudo apt install php8.3-pgsql` (sesuaikan versi PHP)
- **Windows (Laragon/XAMPP):** buka `php.ini`, hapus komentar `;extension=pdo_pgsql`, restart web server
- **macOS (Homebrew):** `brew install php@8.3` biasanya sudah termasuk

---

## 2. Clone & Masuk ke Folder Proyek

```bash
git clone <url-repo-banyu>
cd banyu
```

Repo ini berisi Laravel + React (Inertia) dalam satu proyek. Tidak perlu setup dua folder.

---

## 3. Siapkan File `.env`

File `.env` **tidak** ikut ke-commit (masuk `.gitignore`). Salin dari template:

```bash
cp .env.example .env
```

Lalu edit `.env` dan isi bagian database sesuai setup lokal:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=nama db mu
DB_USERNAME=username mu
DB_PASSWORD=password mu

APP_NAME=Banyu
APP_URL=http://localhost:8000
```

---

## 4. Buat Database `banyu` di PostgreSQL

Masuk ke PostgreSQL sebagai user `postgres` (atau user setara superuser):

```bash
psql -U postgres
```

Lalu buat database dan user sesuai `.env`:

```sql
CREATE USER "USER" WITH PASSWORD 'PASSWORD';
CREATE DATABASE DB_DATABASE OWNER USER;
GRANT ALL PRIVILEGES ON DATABASE DB_DATABASE TO USER;
\q
```

Kalau user `xxx` sudah ada, lewati baris `CREATE USER`.

---

## 5. Install Dependency Backend (Composer)

```bash
composer install
```

Tunggu sampai `vendor/` terisi.

---

## 6. Generate App Key

```bash
php artisan key:generate
```

Perintah ini mengisi `APP_KEY` di `.env` dengan kunci acak.

---

## 7. Jalankan Migration

```bash
php artisan migrate
```

Output yang diharapkan: tabel-tabel Laravel bawaan (`users`, `cache`, `jobs`, `sessions`, dll) berhasil dibuat di database `banyu`. Kalau ada error "could not find driver", ekstensi `pdo_pgsql` belum aktif — lihat langkah 1.

Untuk mengisi data contoh (opsional):

```bash
php artisan db:seed
```

---

## 8. Install Dependency Frontend (npm)

```bash
npm install
```

Tunggu sampai `node_modules/` terisi.

---

## 9. Build Asset Frontend (sekali saja)

```bash
npm run build
```

Ini menghasilkan file statis di `public/build/`. Untuk development, langkah 10 sudah cukup dan tidak perlu build manual.

---

## 10. Jalankan Server Development

Ada **dua pilihan**:

### Opsi A — Pisahkan terminal (disarankan saat debugging)

**Terminal 1 — Laravel:**

```bash
php artisan serve
```

Berjalan di `http://localhost:8000`.

**Terminal 2 — Vite (hot reload):**

```bash
npm run dev
```

Berjalan di `http://localhost:5173` (proxy ke Laravel via Vite).

### Opsi B — Sekaligus (satu terminal)

```bash
composer run dev
```

Skrip ini menjalankan Laravel server, queue worker, dan Vite bersamaan. Output warnanya dibedakan (server/queue/vite).

---

## 11. Buka di Browser

Kunjungi:

```
http://localhost:8000
```

Halaman welcome Laravel/Inertia akan tampil. Kalau muncul error, cek terminal untuk detail.

---

## 12. Login (jika halaman auth sudah dibuat)

Starter ini sudah menyertakan `laravel/fortify`. Akun default tidak dibuat otomatis. Buat user pertama:

```bash
php artisan tinker
```

Lalu di dalam tinker:

```php
\App\Models\User::create([
    'name' => 'Admin',
    'email' => 'admin@banyu.test',
    'password' => bcrypt('password'),
]);
exit
```

Login di `http://localhost:8000/login` dengan email & password di atas.

---

## Troubleshooting

| Masalah | Solusi |
|---|---|
| `SQLSTATE[08006] could not translate host name` | PostgreSQL belum jalan. Start: `sudo service postgresql start` (Linux) atau via pgAdmin. |
| `could not find driver` | Ekstensi `pdo_pgsql` belum aktif. Lihat langkah 1. |
| `permission denied for schema public` | Grant: `GRANT ALL ON SCHEMA public TO DB_USERNAME;` di psql. |
| `Vite manifest not found` | Jalankan `npm run build` sekali, atau pastikan `npm run dev` masih hidup. |
| `No application encryption key` | Jalankan `php artisan key:generate`. |
| Port 8000/5173 sudah dipakai | Ganti: `php artisan serve --port=8001`. Untuk Vite, set di `vite.config.ts` atau pakai `npm run dev -- --port 5174`. |
| Cache konfigurasi nyangkut | `php artisan config:clear && php artisan cache:clear`. |

---

## Perintah Ringkas (Cheat Sheet)

```bash
# Setup awal (sekali)
cp .env.example .env
composer install
npm install
php artisan key:generate
php artisan migrate

# Jalankan dev (setiap hari)
composer run dev

# Atau terpisah
php artisan serve        # terminal 1
npm run dev              # terminal 2

# Reset database (hapus semua data, migrate ulang)
php artisan migrate:fresh

# Format & lint kode
npm run format
npm run lint
composer lint

# Test
php artisan test
```

---

## Alur Singkat

```
clone repo
  → cp .env.example .env & edit DB
  → buat database banyu di PostgreSQL
  → composer install
  → php artisan key:generate
  → php artisan migrate
  → npm install
  → npm run build (opsional, sekali)
  → composer run dev   ← buka http://localhost:8000
```
