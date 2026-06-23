# TokoRupa

MVP SaaS toko online siap pakai berdasarkan jenis usaha. Seller memilih coffee shop, fashion, atau produk digital; sistem menyiapkan struktur toko dan alur penjualan yang sesuai.

## Stack

- React 18 + Vite
- Supabase Auth, PostgreSQL, Storage, dan RLS
- React Router
- Lucide Icons
- Vercel

React dipilih karena dashboard dan storefront memiliki state serta komponen yang terus berkembang. Vite tetap ringan untuk Termux/Acode dan deployment Vercel.

## Halaman

- `/` - landing page
- `/login` - login dan daftar
- `/mulai` - onboarding seller
- `/dashboard` - dashboard seller
- `/toko/kopi-ruang` - contoh storefront publik

Tanpa konfigurasi Supabase, aplikasi otomatis berjalan sebagai demo visual. Data asli digunakan setelah environment variable dipasang dan pemanggilan database disambungkan ke halaman.

## Menjalankan di Acode atau Termux

Pastikan Node.js versi 18 atau lebih baru tersedia.

Jika project berada di penyimpanan internal Termux (`$HOME`):

```bash
cd ~/tokorupa
npm install
cp .env.example .env
npm run dev
```

Jangan menjalankan npm langsung dari shared storage Android seperti
`/storage/emulated/0/Download`. Android melarang symbolic link dan eksekusi
binary package seperti esbuild. Simpan source yang diedit Acode di Download,
lalu sinkronkan salinannya ke penyimpanan internal Termux:

```bash
mkdir -p ~/tokorupa
rsync -a --exclude node_modules --exclude .env \
  ~/storage/downloads/tokorupa/ ~/tokorupa/
cd ~/tokorupa
npm install
npm run dev
```

Setelah mengubah source melalui Acode, jalankan kembali perintah `rsync` lalu
`npm run dev`. File `.env` di Termux tidak tertimpa karena dikecualikan.

Buka alamat yang muncul di terminal, biasanya `http://localhost:5173`. Di Acode, gunakan terminal bawaan dengan perintah yang sama. SPCK dapat mengedit project, tetapi proses Vite tetap memerlukan terminal atau fitur npm project.

## Menyiapkan Supabase

1. Buat project baru di Supabase.
2. Buka SQL Editor dan jalankan `supabase/schema.sql`.
3. Buka Project Settings > API.
4. Salin Project URL dan anon public key ke `.env`:

```env
VITE_SUPABASE_URL=https://PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=ANON_PUBLIC_KEY
```

5. Jangan pernah memasukkan `service_role` key ke frontend atau GitHub.
6. Atur bucket `store-assets` agar hanya menerima JPEG, PNG, WEBP maksimal 5 MB.

## Deploy ke Vercel

```bash
git init
git add .
git commit -m "feat: initial TokoRupa MVP"
git branch -M main
git remote add origin https://github.com/USERNAME/tokorupa.git
git push -u origin main
```

Di Vercel, impor repository tersebut. Framework Preset akan terdeteksi sebagai Vite. Tambahkan `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` pada Environment Variables, lalu deploy ulang.

## Payment Gateway

UI checkout sudah tersedia, tetapi payment gateway sengaja belum berpura-pura aktif. Integrasi nyata harus memakai Vercel Function untuk membuat transaksi dan memverifikasi webhook di server. Secret key tidak boleh masuk ke kode React. QRIS manual dapat dibuat lebih dahulu setelah field QRIS dan bukti pembayaran disambungkan ke Supabase Storage.

## Identitas Merek

Nama kerja: **TokoRupa**. Makna: satu platform dengan banyak rupa usaha. Identitas menggunakan logo burung geometris milik pemilik project, teal sebagai warna aksi, biru-abu untuk fondasi, coral untuk penanda, dan krem sebagai latar hangat.

Sebelum peluncuran komersial, periksa ketersediaan merek, akun sosial, dan domain. Nama ini belum diklaim aman secara hukum.

Lihat `ROADMAP.md` untuk urutan pengembangan setelah MVP.
