import { useEffect, useState } from 'react'
import { Link, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowRight, BadgeCheck, BarChart3, Check, ChevronRight, Coffee, CreditCard,
  Download, ExternalLink, FileText, LayoutDashboard, Mail, Menu, MessageCircle,
  MousePointer2, Package, Palette, Plus, QrCode, Search, Settings, ShoppingBag, Store,
  Upload, Wallet, X,
} from 'lucide-react'
import Brand from './components/Brand'
import { businessTypes, demoOrders, demoProducts, rupiah } from './lib/demoData'
import { isSupabaseReady, supabase } from './lib/supabase'

const features = [
  ['Coffee & makanan', 'Menu, topping, pickup, QR meja', Coffee],
  ['Fashion', 'Varian ukuran, warna, stok, pre-order', ShoppingBag],
  ['Produk digital', 'Checkout dan kirim file otomatis', Download],
]

function Landing() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeBusiness, setActiveBusiness] = useState(0)
  const liveTypes = [
    { name: 'Kopi Ruang', type: 'Coffee shop', accent: '#087f79', items: ['Es Kopi Aren', 'Flat White', 'Cold Black'] },
    { name: 'Rona Studio', type: 'Fashion', accent: '#274755', items: ['Olive Overshirt', 'Daily Tee', 'Canvas Tote'] },
    { name: 'Kelas Karya', type: 'Produk digital', accent: '#e4515b', items: ['Workbook Brand', 'Template Konten', 'Kelas Rekaman'] },
  ]
  const activeStore = liveTypes[activeBusiness]
  return (
    <main className="landing">
      <section className="hero">
        <nav className="nav shell">
          <Brand />
          <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Buka menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a href="#cara-kerja">Cara kerja</a>
            <a href="#jenis-usaha">Jenis usaha</a>
            <a href="#harga">Harga</a>
            <Link to="/login">Masuk</Link>
            <Link className="button button-cream" to="/mulai">Buat toko</Link>
          </div>
        </nav>

        <div className="hero-v2 shell">
          <div className="hero-copy">
            <p className="hero-badge"><span /> Toko online yang mengikuti usahamu</p>
            <h1>Buka toko online.<br /><mark>Tanpa mulai dari nol.</mark></h1>
            <p className="hero-lead">Pilih bidang usaha, masukkan produk, lalu bagikan. Tampilan, checkout, dan alur pesanan sudah kami siapkan sesuai cara usahamu berjualan.</p>
            <div className="hero-actions">
              <Link className="button button-green" to="/mulai">Buat toko gratis <ArrowRight size={18} /></Link>
              <Link className="play-link" to="/toko/kopi-ruang"><span><MousePointer2 /></span> Coba toko demo</Link>
            </div>
            <div className="hero-proof">
              <span><Check /> Gratis untuk mulai</span>
              <span><Check /> Kelola dari HP</span>
              <span><Check /> Pembeli tanpa login</span>
            </div>
          </div>
          <div className="hero-art" aria-label="Ilustrasi toko online TokoRupa">
            <div className="art-backdrop" />
            <img src="/assets/hero-commerce.webp" alt="Ilustrasi laptop, tablet, dan HP menampilkan toko online" width="1600" height="800" fetchPriority="high" />
            <div className="float-note note-order"><BadgeCheck /><span><b>Pesanan masuk</b><small>Baru saja dibayar</small></span></div>
            <div className="float-note note-theme"><Palette /><span><b>3 jenis usaha</b><small>Fitur berbeda</small></span></div>
            <div className="float-dot dot-blue" /><div className="float-dot dot-yellow" />
          </div>
        </div>
      </section>

      <section className="ticker" aria-label="Fitur utama">
        <div><span>COFFEE SHOP</span><i /> <span>FASHION</span><i /> <span>PRODUK DIGITAL</span><i /> <span>QRIS</span><i /> <span>CHECKOUT TANPA AKUN</span><i /> <span>KELOLA DARI HP</span></div>
      </section>

      <section className="steps shell" id="cara-kerja">
        <header className="section-heading"><span>Mulai tanpa tutorial panjang</span><h2>Tiga langkah, lalu bagikan.</h2></header>
        <div className="step-grid">
          <article><b>01</b><Store /><h3>Pilih jenis usaha</h3><p>Kami langsung menyiapkan struktur toko dan fitur yang relevan.</p></article>
          <article><b>02</b><Package /><h3>Masukkan produk</h3><p>Tambahkan foto, harga, varian, stok, atau file yang dijual.</p></article>
          <article><b>03</b><QrCode /><h3>Mulai menerima pesanan</h3><p>Bagikan tautan atau QR. Pembeli tidak perlu membuat akun.</p></article>
        </div>
      </section>

      <section className="business-band" id="jenis-usaha">
        <div className="shell business-intro">
          <p className="eyebrow dark">Bukan satu template untuk semua</p>
          <h2>Setiap usaha punya<br />cara jualan sendiri.</h2>
          <p>Coffee shop perlu topping dan pickup. Fashion perlu varian. Produk digital perlu pengiriman file. TokoRupa memahami perbedaannya.</p>
        </div>
        <div className="shell business-list">
          {features.map(([title, copy, Icon], index) => (
            <article key={title} className={index === 0 ? 'selected' : ''}>
              <span>0{index + 1}</span><Icon /><div><h3>{title}</h3><p>{copy}</p></div><ChevronRight />
            </article>
          ))}
        </div>
      </section>

      <section className="live-showcase shell">
        <div className="showcase-copy">
          <span className="eyebrow dark">Coba ganti jenis usaha</span>
          <h2>Bukan cuma ganti warna. Isi tokonya ikut berubah.</h2>
          <p>Setiap bidang mendapat susunan katalog dan fitur yang memang dipakai untuk berjualan.</p>
          <div className="showcase-tabs">
            {liveTypes.map((store, index) => <button key={store.type} className={activeBusiness === index ? 'active' : ''} onClick={() => setActiveBusiness(index)}><span>0{index + 1}</span>{store.type}</button>)}
          </div>
        </div>
        <div className="showcase-stage" style={{ '--active-accent': activeStore.accent }}>
          <div className="stage-window">
            <header><i /><i /><i /><span>tokorupa.id/{activeStore.name.toLowerCase().replace(' ', '-')}</span></header>
            <div className="stage-store-head"><div className="stage-logo">{activeStore.name.split(' ').map((word) => word[0]).join('')}</div><div><b>{activeStore.name}</b><small>{activeStore.type} siap menerima pesanan</small></div><button><ShoppingBag /> 0</button></div>
            <div className="stage-banner"><span>{activeStore.type}</span><strong>{activeBusiness === 0 ? 'Menu untuk jeda yang enak.' : activeBusiness === 1 ? 'Koleksi harian, dibuat terbatas.' : 'Belajar praktis, unduh selamanya.'}</strong></div>
            <div className="stage-products">{activeStore.items.map((item, index) => <article key={item}><div className={`stage-product-image tone-${index + 1}`}><span>{activeBusiness === 0 ? ['KOPI','LATTE','COLD'][index] : activeBusiness === 1 ? ['01','02','03'][index] : ['PDF','ZIP','VIDEO'][index]}</span></div><b>{item}</b><small>{rupiah([22000, 89000, 149000][index])}</small></article>)}</div>
          </div>
          <div className="stage-caption"><span className="status-dot" /> Preview berubah langsung</div>
        </div>
      </section>

      <section className="mobile-ops">
        <div className="shell mobile-ops-inner">
          <div className="mobile-ops-art">
            <img src="/assets/seller-mobile.webp" alt="Ilustrasi seller mengelola coffee shop, fashion, dan produk digital dari HP" width="1200" height="900" loading="lazy" />
            <div className="ops-badge"><span>42</span><div><b>Pesanan hari ini</b><small>Semua dari satu dashboard</small></div></div>
          </div>
          <div className="mobile-ops-copy">
            <span className="eyebrow dark">Bekerja dari mana saja</span>
            <h2>Tokomu tetap jalan, cukup dari HP.</h2>
            <p>Tambah produk, cek pembayaran, dan proses pesanan tanpa harus membuka laptop atau belajar dashboard yang rumit.</p>
            <div className="ops-points">
              <article><b>01</b><div><strong>Pesanan langsung rapi</strong><span>Tidak perlu mencari chat pelanggan satu per satu.</span></div></article>
              <article><b>02</b><div><strong>QRIS dan pembayaran</strong><span>Mulai manual, lalu aktifkan gateway ketika siap.</span></div></article>
              <article><b>03</b><div><strong>Satu akun, banyak rupa</strong><span>Coffee, fashion, dan digital punya alur masing-masing.</span></div></article>
            </div>
          </div>
        </div>
      </section>

      <section className="proof shell">
        <div className="proof-photo"><img src="/assets/fashion-collection.webp" alt="Koleksi produk fashion independen" width="1400" height="933" loading="lazy" /></div>
        <div className="proof-copy">
          <span className="eyebrow dark">Dibuat untuk dikelola dari HP</span>
          <h2>Tetap sederhana di belakang, tetap meyakinkan di depan.</h2>
          <ul>
            <li><Check /> Checkout tanpa akun pembeli</li>
            <li><Check /> QRIS manual dan payment gateway</li>
            <li><Check /> Pesanan rapi, notifikasi ke WhatsApp</li>
            <li><Check /> Domain sendiri untuk paket premium</li>
          </ul>
          <Link className="button button-green" to="/mulai">Coba dari HP <ArrowRight size={18} /></Link>
        </div>
      </section>

      <section className="pricing" id="harga">
        <div className="shell pricing-inner">
          <div><span className="eyebrow">Harga yang masuk akal</span><h2>Mulai gratis.<br />Naik saat usahamu tumbuh.</h2></div>
          <article className="price-card"><span>Gratis</span><strong>Rp0</strong><small>selamanya</small><p>10 produk, QRIS manual, tautan TokoRupa, pesanan WhatsApp.</p><Link to="/mulai">Mulai gratis <ArrowRight /></Link></article>
          <article className="price-card featured"><span>Tumbuh</span><strong>Rp39.000</strong><small>per bulan</small><p>Produk tak terbatas, payment gateway, domain sendiri, analitik.</p><Link to="/mulai">Coba 14 hari <ArrowRight /></Link></article>
        </div>
      </section>

      <section className="footer-cta">
        <div className="shell"><div><span>Tidak perlu menunggu semuanya sempurna.</span><h2>Buka tokomu hari ini.</h2></div><Link className="button button-cream" to="/mulai">Mulai gratis <ArrowRight /></Link></div>
      </section>

      <footer className="site-footer">
        <div className="shell footer-main">
          <div className="footer-brand"><Brand light /><p>Toko siap pakai yang mengikuti cara setiap usaha berjualan.</p><div className="footer-social"><a href="mailto:halo@tokorupa.id" aria-label="Email TokoRupa"><Mail /></a><Link to="/info/bantuan" aria-label="Bantuan TokoRupa"><MessageCircle /></Link><Link to="/info/panduan" aria-label="Panduan TokoRupa"><FileText /></Link></div></div>
          <div className="footer-column"><b>Produk</b><a href="#jenis-usaha">Coffee shop</a><a href="#jenis-usaha">Fashion</a><a href="#jenis-usaha">Produk digital</a><a href="#harga">Harga</a></div>
          <div className="footer-column"><b>Perusahaan</b><a href="#cara-kerja">Cara kerja</a><Link to="/toko/kopi-ruang">Contoh toko</Link><a href="mailto:halo@tokorupa.id">Hubungi kami</a><Link to="/info/tentang">Tentang TokoRupa</Link></div>
          <div className="footer-column"><b>Bantuan</b><Link to="/info/bantuan">Pusat bantuan</Link><Link to="/info/panduan">Panduan seller</Link><Link to="/info/status">Status layanan</Link><Link to="/info/keamanan">Keamanan</Link></div>
        </div>
        <div className="shell footer-bottom"><span>(c) 2026 TokoRupa</span><div><Link to="/info/ketentuan">Ketentuan</Link><Link to="/info/privasi">Privasi</Link><Link to="/info/cookie">Cookie</Link></div><small>Dibuat untuk usaha yang ingin mulai tanpa ribet.</small></div>
      </footer>
    </main>
  )
}

function AuthPage() {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ email: '', password: '' })
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  async function submit(event) {
    event.preventDefault()
    if (!isSupabaseReady) {
      setMessage('Mode demo aktif. Membuka dashboard contoh.')
      setTimeout(() => navigate('/dashboard'), 450)
      return
    }
    const result = mode === 'login'
      ? await supabase.auth.signInWithPassword(form)
      : await supabase.auth.signUp(form)
    const { error } = result
    if (error) return setMessage(error.message)
    navigate(mode === 'login' ? '/dashboard' : '/mulai')
  }

  return (
    <main className="auth-page">
      <section className="auth-aside"><Brand light /><div><span className="eyebrow">Mulai dari bentuk usahamu</span><h1>Toko yang tidak terasa seperti template.</h1><p>Tampilan, produk, pembayaran, dan pesanan dalam satu tempat yang tetap mudah dipakai dari HP.</p></div><small>TokoRupa / versi MVP 0.1</small></section>
      <section className="auth-form-wrap">
        <Link className="back-link" to="/">&lt;- Kembali</Link>
        <form className="auth-form" onSubmit={submit}>
          <span className="form-kicker">{mode === 'login' ? 'Selamat datang kembali' : 'Buat akun seller'}</span>
          <h2>{mode === 'login' ? 'Masuk ke tokomu' : 'Mulai membangun toko'}</h2>
          <label>Email<input required type="email" placeholder="nama@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
          <label>Password<input required minLength="6" type="password" placeholder="Minimal 6 karakter" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
          {message && <p className="form-message">{message}</p>}
          <button className="button button-green" type="submit">{mode === 'login' ? 'Masuk' : 'Daftar gratis'} <ArrowRight size={18} /></button>
          <p>{mode === 'login' ? 'Belum punya akun?' : 'Sudah punya akun?'} <button type="button" className="inline-button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>{mode === 'login' ? 'Daftar' : 'Masuk'}</button></p>
        </form>
      </section>
    </main>
  )
}

function Onboarding() {
  const [selected, setSelected] = useState('coffee')
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const navigate = useNavigate()
  return (
    <main className="onboarding">
      <header><Brand /><span>Langkah {step} dari 2</span></header>
      {step === 1 ? <section>
        <span className="form-kicker">Mari mulai dari yang paling penting</span><h1>Usahamu bergerak di bidang apa?</h1><p>Kami akan menyiapkan fitur dan susunan toko yang sesuai. Semuanya bisa diubah nanti.</p>
        <div className="type-options">{businessTypes.map((type) => <button key={type.id} className={selected === type.id ? 'active' : ''} onClick={() => setSelected(type.id)}><span>{type.label}</span><small>{type.caption}</small>{selected === type.id && <Check />}</button>)}</div>
        <button className="button button-green" onClick={() => setStep(2)}>Lanjutkan <ArrowRight size={18} /></button>
      </section> : <section>
        <span className="form-kicker">Identitas toko</span><h1>Nama apa yang akan dilihat pelanggan?</h1><p>Gunakan nama usaha yang sudah dikenal pelanggan.</p>
        <label className="large-field">Nama usaha<input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="Contoh: Kopi Ruang" /></label>
        <label className="large-field">Alamat toko<span><b>tokorupa.id/</b><input value={name.toLowerCase().replace(/[^a-z0-9]+/g, '-')} readOnly /></span></label>
        <button className="button button-green" disabled={!name.trim()} onClick={() => navigate('/dashboard')}>Buat toko <ArrowRight size={18} /></button>
      </section>}
    </main>
  )
}

function Dashboard() {
  const [sidebar, setSidebar] = useState(false)
  const [active, setActive] = useState('Ringkasan')
  const [showAdd, setShowAdd] = useState(false)
  const nav = [['Ringkasan', LayoutDashboard], ['Pesanan', FileText], ['Produk', Package], ['Tampilan toko', Store], ['Pembayaran', Wallet], ['Analitik', BarChart3], ['Pengaturan', Settings]]
  return (
    <main className="dashboard-page">
      <aside className={`dashboard-sidebar ${sidebar ? 'open' : ''}`}>
        <div><Brand /><button className="sidebar-close" onClick={() => setSidebar(false)}><X /></button></div>
        <nav>{nav.map(([label, Icon]) => <button key={label} className={active === label ? 'active' : ''} onClick={() => { setActive(label); setSidebar(false) }}><Icon />{label}</button>)}</nav>
        <div className="store-switch"><span>KR</span><div><b>Kopi Ruang</b><small>tokorupa.id/kopi-ruang</small></div></div>
      </aside>
      <div className="dashboard-main">
        <header className="dashboard-top"><button className="dash-menu" onClick={() => setSidebar(true)}><Menu /></button><div><span className="status-dot" /> Toko aktif</div><Link to="/toko/kopi-ruang">Lihat toko <ExternalLink /></Link></header>
        <section className="dashboard-content">
          <div className="dashboard-title"><div><span>Senin, 22 Juni</span><h1>{active}</h1></div><button className="button button-green" onClick={() => setShowAdd(true)}><Plus /> Tambah produk</button></div>
          {active === 'Ringkasan' ? <Overview setActive={setActive} /> : <PlaceholderPage active={active} />}
        </section>
      </div>
      {showAdd && <ProductModal close={() => setShowAdd(false)} />}
    </main>
  )
}

function Overview({ setActive }) {
  return <>
    {!isSupabaseReady && <div className="demo-note"><span>Mode demo</span> Hubungkan Supabase melalui file <code>.env</code> untuk memakai data asli.</div>}
    <div className="stats-grid"><article><span>Penjualan hari ini</span><strong>Rp1.840.000</strong><small>+18% dari Senin lalu</small></article><article><span>Pesanan</span><strong>42</strong><small>7 perlu diproses</small></article><article><span>Rata-rata transaksi</span><strong>Rp43.800</strong><small>+Rp2.400 minggu ini</small></article></div>
    <div className="dashboard-grid">
      <article className="chart-panel"><div><h3>Penjualan 7 hari</h3><button>7 hari</button></div><div className="chart-bars">{[42, 65, 49, 78, 58, 91, 72].map((h, i) => <span key={i}><i style={{ height: `${h}%` }} /><small>{['S','S','R','K','J','S','M'][i]}</small></span>)}</div></article>
      <article className="todo-panel"><h3>Perlu perhatian</h3><button onClick={() => setActive('Pesanan')}><span>7</span><div><b>Pesanan baru</b><small>Belum diproses</small></div><ChevronRight /></button><button onClick={() => setActive('Produk')}><span>2</span><div><b>Stok menipis</b><small>Kurang dari 5 produk</small></div><ChevronRight /></button><button><span>1</span><div><b>Bukti pembayaran</b><small>Menunggu verifikasi</small></div><ChevronRight /></button></article>
    </div>
    <article className="order-panel"><div><h3>Pesanan terbaru</h3><button onClick={() => setActive('Pesanan')}>Lihat semua</button></div><div className="order-table"><div className="table-head"><span>ID</span><span>Pelanggan</span><span>Total</span><span>Status</span><span>Waktu</span></div>{demoOrders.map((order) => <div key={order.id}><b>{order.id}</b><span>{order.customer}</span><span>{rupiah(order.total)}</span><em className={order.status.toLowerCase()}>{order.status}</em><span>{order.time}</span></div>)}</div></article>
  </>
}

function PlaceholderPage({ active }) {
  const descriptions = {
    Pesanan: 'Semua pesanan pelanggan akan tampil dan dapat diperbarui dari halaman ini.', Produk: 'Atur produk, stok, varian, kategori, dan status penjualan.',
    'Tampilan toko': 'Pilih tema serta atur warna, tipografi, banner, dan susunan toko.', Pembayaran: 'Hubungkan QRIS manual atau payment gateway.', Analitik: 'Pelajari penjualan, produk terlaris, dan sumber kunjungan.', Pengaturan: 'Atur profil usaha, pengiriman, notifikasi, dan domain.',
  }
  return <div className="placeholder-page"><div><Settings /></div><h2>{active}</h2><p>{descriptions[active]}</p><button className="button button-green">Siapkan {active.toLowerCase()}</button></div>
}

function ProductModal({ close }) {
  return <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && close()}><form className="modal" onSubmit={(e) => { e.preventDefault(); close() }}><header><div><span className="form-kicker">Produk baru</span><h2>Tambahkan ke etalase</h2></div><button type="button" onClick={close}><X /></button></header><label>Nama produk<input required placeholder="Contoh: Es Kopi Aren" /></label><div className="field-row"><label>Harga<input required type="number" placeholder="22000" /></label><label>Stok<input type="number" placeholder="20" /></label></div><label>Foto produk<button className="upload-box" type="button"><Upload /> Pilih gambar dari HP</button></label><button className="button button-green" type="submit">Simpan produk</button></form></div>
}

function Storefront() {
  const { slug } = useParams()
  const [cart, setCart] = useState([])
  const [checkout, setCheckout] = useState(false)
  const total = cart.reduce((sum, product) => sum + product.price, 0)
  return <main className="storefront">
    <header className="store-head"><div><span className="store-logo">KR</span><div><h1>Kopi Ruang</h1><p>Diracik pelan, diminum tenang.</p></div></div><button onClick={() => setCheckout(true)}><ShoppingBag /> <span>{cart.length}</span></button></header>
    <section className="store-hero"><img src="/assets/coffee-menu.webp" alt="Pilihan minuman Kopi Ruang" width="1400" height="933" /><div><span>Buka hari ini - 08.00-22.00</span><h2>Teman untuk jeda yang tidak terburu-buru.</h2><p>Pesan untuk pickup di kedai. Kami mulai meracik setelah pembayaran dikonfirmasi.</p></div></section>
    <nav className="category-nav"><button className="active">Semua</button><button>Kopi</button><button>Non-kopi</button><button>Makanan</button></nav>
    <section className="product-section"><div className="product-heading"><div><span>Menu pilihan</span><h2>Paling sering dipesan</h2></div><button><Search /> Cari menu</button></div><div className="product-grid">{demoProducts.map((product, index) => <article key={product.id}><div className="product-image"><img src={product.image} alt={product.name} style={{ objectPosition: `${[20,50,80][index]}% center` }} /><span>{index === 0 ? 'Favorit' : product.category}</span></div><div><h3>{product.name}</h3><p>{index === 0 ? 'Espresso, susu segar, dan gula aren.' : index === 1 ? 'Espresso dengan susu bertekstur lembut.' : 'Kopi hitam dingin, bersih dan ringan.'}</p><footer><b>{rupiah(product.price)}</b><button onClick={() => setCart([...cart, product])}><Plus /> Tambah</button></footer></div></article>)}</div></section>
    <footer className="store-footer"><Brand /><span>Contoh toko: {slug}</span></footer>
    {cart.length > 0 && <button className="floating-cart" onClick={() => setCheckout(true)}><span><ShoppingBag /> {cart.length} item</span><b>{rupiah(total)}</b></button>}
    {checkout && <div className="modal-backdrop"><div className="checkout-sheet"><header><div><span className="form-kicker">Ringkasan pesanan</span><h2>Pesanan Anda</h2></div><button onClick={() => setCheckout(false)}><X /></button></header>{cart.length ? cart.map((item, index) => <p key={`${item.id}-${index}`}><span>{item.name}</span><b>{rupiah(item.price)}</b></p>) : <div className="empty-cart"><ShoppingBag /><span>Belum ada menu dipilih.</span></div>}<div className="checkout-total"><span>Total</span><strong>{rupiah(total)}</strong></div><button className="button button-green" disabled={!cart.length}><CreditCard /> Lanjut pembayaran</button><small>Demo checkout. Payment gateway diaktifkan setelah konfigurasi server.</small></div></div>}
  </main>
}

const infoPages = {
  tentang: ['Tentang TokoRupa', 'TokoRupa membantu usaha membuat toko online yang mengikuti cara mereka berjualan, tanpa harus memulai dari kanvas kosong.', ['Produk ini masih berada pada tahap MVP.', 'Fokus awalnya adalah coffee shop, fashion, dan produk digital.', 'Kami membangun alur yang tetap nyaman dikelola dari HP.']],
  bantuan: ['Pusat bantuan', 'Temukan jalur tercepat untuk menyiapkan toko dan menyelesaikan kendala penggunaan.', ['Buat akun lalu pilih jenis usaha.', 'Tambahkan produk dan metode pembayaran.', 'Hubungi halo@tokorupa.id jika mengalami kendala.']],
  panduan: ['Panduan seller', 'Mulai dari toko kecil yang lengkap, lalu tambahkan fitur saat benar-benar dibutuhkan.', ['Lengkapi nama, deskripsi, dan kontak usaha.', 'Gunakan foto produk yang terang dan jelas.', 'Lakukan satu pesanan percobaan sebelum membagikan toko.']],
  status: ['Status layanan', 'Halaman status publik TokoRupa.', ['Landing dan demo storefront: aktif.', 'Dashboard demo: aktif.', 'Payment gateway: belum diaktifkan pada MVP.']],
  keamanan: ['Keamanan', 'Data seller dirancang menggunakan Supabase Auth dan Row Level Security.', ['Jangan pernah membagikan password atau service-role key.', 'Secret payment gateway harus disimpan di server.', 'Laporkan masalah keamanan melalui halo@tokorupa.id.']],
  ketentuan: ['Ketentuan layanan', 'Ketentuan final akan diterbitkan sebelum layanan menerima transaksi komersial.', ['Pengguna bertanggung jawab atas produk yang dijual.', 'Konten ilegal dan menyesatkan dilarang.', 'Kebijakan dapat diperbarui dengan pemberitahuan.']],
  privasi: ['Kebijakan privasi', 'TokoRupa hanya akan memproses data yang diperlukan untuk menjalankan toko dan pesanan.', ['Data tidak dijual kepada pihak lain.', 'Akses data dibatasi berdasarkan pemilik toko.', 'Permintaan penghapusan dapat dikirim melalui email.']],
  cookie: ['Kebijakan cookie', 'Cookie digunakan untuk sesi login dan preferensi penting aplikasi.', ['Cookie pemasaran tidak aktif pada MVP.', 'Sesi autentikasi dikelola oleh penyedia backend.', 'Pengguna dapat menghapus cookie melalui browser.']],
}

function InfoPage() {
  const { page } = useParams()
  const content = infoPages[page] || infoPages.bantuan
  useEffect(() => { window.scrollTo(0, 0) }, [page])
  return <main className="info-page"><nav className="nav shell"><Brand /><Link to="/">Kembali ke beranda</Link></nav><section><span className="form-kicker">Informasi TokoRupa</span><h1>{content[0]}</h1><p>{content[1]}</p><div>{content[2].map((item, index) => <article key={item}><b>0{index + 1}</b><span>{item}</span></article>)}</div><a className="button button-green" href="mailto:halo@tokorupa.id">Hubungi kami <Mail /></a></section></main>
}

export default function App() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return <Routes><Route path="/" element={<Landing />} /><Route path="/login" element={<AuthPage />} /><Route path="/mulai" element={<Onboarding />} /><Route path="/dashboard" element={<Dashboard />} /><Route path="/toko/:slug" element={<Storefront />} /><Route path="/info/:page" element={<InfoPage />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes>
}
