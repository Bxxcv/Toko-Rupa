export const businessTypes = [
  { id: 'coffee', label: 'Coffee & makanan', caption: 'Menu, topping, pickup, dan QR meja.' },
  { id: 'fashion', label: 'Fashion', caption: 'Ukuran, warna, stok varian, dan pre-order.' },
  { id: 'digital', label: 'Produk digital', caption: 'Pembayaran dan pengiriman file otomatis.' },
]

export const demoProducts = [
  { id: 1, name: 'Es Kopi Aren', category: 'Kopi', price: 22000, image: '/assets/coffee-menu.webp', status: 'Aktif', stock: 36 },
  { id: 2, name: 'Flat White', category: 'Kopi', price: 26000, image: '/assets/coffee-menu.webp', status: 'Aktif', stock: 24 },
  { id: 3, name: 'Cold Black', category: 'Kopi', price: 20000, image: '/assets/coffee-menu.webp', status: 'Aktif', stock: 18 },
]

export const demoOrders = [
  { id: 'TR-1048', customer: 'Nadia Putri', total: 66000, status: 'Baru', time: '10.24' },
  { id: 'TR-1047', customer: 'Fikri Ramadhan', total: 48000, status: 'Diproses', time: '09.52' },
  { id: 'TR-1046', customer: 'Arum Sari', total: 92000, status: 'Selesai', time: 'Kemarin' },
]

export const rupiah = (value) => new Intl.NumberFormat('id-ID', {
  style: 'currency', currency: 'IDR', maximumFractionDigits: 0,
}).format(value)
