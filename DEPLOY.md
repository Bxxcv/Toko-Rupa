# Deploy GitHub dan Vercel

## Push dari Termux

Jalankan perintah dari salinan project yang berada di `$HOME` Termux, bukan
langsung dari `/storage/emulated/0`.

```bash
cd ~/tokorupa
git init
git add .
git commit -m "feat: release TokoRupa MVP"
git branch -M main
git remote add origin https://github.com/USERNAME/tokorupa.git
git push -u origin main
```

Jika repository sudah memiliki remote `origin`, jangan tambahkan ulang. Periksa
dengan `git remote -v`, lalu gunakan `git push`.

## Deploy Vercel

1. Buka Vercel dan pilih **Add New > Project**.
2. Impor repository GitHub TokoRupa.
3. Root Directory biarkan kosong karena `package.json` berada di root.
4. Framework akan terbaca sebagai Vite.
5. Build Command: `npm run build`.
6. Output Directory: `dist`.
7. Pada Settings > Build and Deployment, pilih Node.js **22.x**.
8. Deploy.

Project mengunci Node melalui `.nvmrc` dan `package.json`. Jika Vercel menampilkan
peringatan **Node.js Version Override**, samakan pengaturan project menjadi
`22.x`, lalu redeploy. Jangan pilih 24.x untuk rilis MVP ini.

Landing dan seluruh mode demo bisa dibuka tanpa environment variable. Untuk
Supabase, tambahkan variabel berikut di Vercel Project Settings > Environment
Variables, lalu redeploy:

```env
VITE_SUPABASE_URL=https://PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=ANON_PUBLIC_KEY
```

Jangan pernah memasukkan `.env`, service-role key, secret payment gateway, atau
password ke GitHub.

## Pemeriksaan Setelah Deploy

- `/` menampilkan landing dan ilustrasi.
- `/login` dapat dibuka langsung dan setelah refresh.
- `/mulai` dapat dibuka langsung dan setelah refresh.
- `/dashboard` menampilkan mode demo tanpa Supabase.
- `/toko/kopi-ruang` menampilkan storefront dan cart.
- Console browser tidak menampilkan error merah.

Payment gateway belum aktif. Secret key dan webhook nantinya harus dibuat di
Vercel Functions, bukan di React atau environment variable berawalan `VITE_`.
