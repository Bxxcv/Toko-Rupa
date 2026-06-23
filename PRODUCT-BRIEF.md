# Product Brief TokoRupa

## Produk

TokoRupa adalah SaaS pembuat toko siap pakai berdasarkan jenis usaha. Pengguna tidak menghadapi kanvas kosong atau page builder. Mereka memilih bidang usaha, mengisi produk, memasang pembayaran, lalu membagikan toko.

Janji utama: **Pilih jenis usaha. Toko langsung siap jualan.**

## Pengguna Awal

- Coffee shop dan penjual makanan dengan pickup.
- Brand fashion kecil dengan ukuran, warna, stok, dan pre-order.
- Kreator produk digital yang membutuhkan checkout dan pengiriman file.

## Identitas Visual

- Nama: TokoRupa.
- Logo: burung geometris milik pemilik project, dipakai bersama wordmark TokoRupa.
- Teal `#087F79`: aksi utama dan identitas produk.
- Biru-abu `#274755`: dashboard, footer, dan teks pendukung.
- Coral `#E4515B`: CTA sekunder serta penanda penting.
- Krem `#F2EFDF`: latar hangat untuk menjaga halaman tetap ringan.
- Tipografi: system sans-serif untuk produk; Georgia hanya sebagai aksen editorial di storefront coffee.
- Radius kecil 3-5 px; kartu hanya untuk item berulang dan data dashboard.

Desain menghindari gradient hero, efek kaca, bayangan berlebihan, ikon emoji, kartu bertumpuk, dan copy abstrak yang umum pada landing hasil generator.

## Arsitektur Halaman

### Landing

Hero menunjukkan dashboard dan storefront sebagai produk nyata. Berikutnya adalah tiga langkah, perbedaan fitur tiap bidang, bukti penggunaan melalui HP, harga, dan CTA.

### Onboarding

Dua langkah: pilih bidang usaha lalu tentukan nama serta slug. Tidak ada pengaturan tema sebelum toko pertama dibuat.

### Dashboard Seller

Sidebar desktop dan drawer mobile. Ringkasan memprioritaskan penjualan, pesanan yang harus diproses, stok menipis, serta bukti pembayaran.

### Storefront Coffee

Foto produk nyata, status buka, kategori, produk, cart tetap di bawah pada mobile, dan checkout tanpa akun.

### Storefront Fashion

Fase berikutnya: fokus koleksi, ukuran, warna, stok per varian, size guide, dan pre-order.

### Storefront Digital

Fase berikutnya: preview produk, lisensi, payment gateway, signed download, batas unduhan, dan email pengiriman.

## Model Bisnis Awal

- Gratis: 10 produk, QRIS manual, domain TokoRupa, pesanan WhatsApp.
- Tumbuh Rp39.000/bulan: produk tak terbatas, payment gateway, analitik, domain sendiri.
- Biaya payment gateway mengikuti provider dan tidak disembunyikan dalam harga paket.

Harga harus divalidasi melalui wawancara dan pre-order; belum dianggap final.

## Batas MVP

Payment gateway tidak boleh dibuat langsung dari browser. Vercel Function membuat transaksi memakai secret key, sedangkan webhook memverifikasi status pembayaran. QRIS manual dapat dirilis lebih dahulu dengan bukti pembayaran dan verifikasi seller.

Nama TokoRupa, domain, akun sosial, dan merek dagang harus diperiksa sebelum peluncuran komersial.
