import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/dashboard/Header';
import { useUser } from '../context/UserContext';
import { useLibrary } from '../context/LibraryContext';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile, updateAvatar, logout } = useUser();
  const { ownedBooks } = useLibrary();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  // Form State
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [defaultFormat, setDefaultFormat] = useState(user.defaultFormat);
  const [dailyReminder, setDailyReminder] = useState(user.dailyReminder);
  const [cloudSync, setCloudSync] = useState(user.cloudSync);

  // Keep state in sync if context changes globally (unlikely but good practice)
  useEffect(() => {
    setName(user.name);
    setUsername(user.username);
    setEmail(user.email);
    setPhone(user.phone);
    setDefaultFormat(user.defaultFormat);
    setDailyReminder(user.dailyReminder);
    setCloudSync(user.cloudSync);
  }, [user]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3500);
  };

  const handleSave = () => {
    updateProfile({
      name,
      username,
      email,
      phone,
      defaultFormat,
      dailyReminder,
      cloudSync
    });
    showToast('Profil berhasil diperbarui!');
  };

  const handleCancel = () => {
    setName(user.name);
    setUsername(user.username);
    setEmail(user.email);
    setPhone(user.phone);
    setDefaultFormat(user.defaultFormat);
    setDailyReminder(user.dailyReminder);
    setCloudSync(user.cloudSync);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateAvatar(e.target.files[0]);
      showToast('Foto profil berhasil diperbarui!');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to login/home
  };

  const completedBooksCount = ownedBooks.filter(b => b.status === 'Selesai Dibaca').length;

  return (
    <div className="bg-surface-container-lowest text-on-surface font-body-md text-body-md antialiased min-h-screen selection:bg-primary-container selection:text-on-primary-container">
      <Header />
      
      {/* Toast Notification */}
      <div className={`fixed bottom-8 right-8 z-50 flex items-center gap-space-sm px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface shadow-2xl transition-all duration-300 ${toastVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <span className="material-symbols-outlined text-[22px] text-primary">check_circle</span>
        <span className="font-label-md text-label-md">{toastMsg}</span>
      </div>

      <main className="w-full bg-surface-container-lowest min-h-screen pt-4">
        <div className="flex flex-col w-full">
          <div className="w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin py-space-xl flex flex-col gap-space-xl">
            
            {/* Profil Header Card Glassmorphism */}
            <section className="relative overflow-hidden rounded-xl bg-surface-container-low p-space-lg md:p-space-xl shadow-xl">
              <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary-container/20 blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-24 -left-20 w-80 h-80 rounded-full bg-secondary-container/15 blur-3xl pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-space-lg">
                  {/* Avatar User with Pro Badge */}
                  <div className="relative shrink-0 group cursor-pointer" onClick={handleAvatarClick} title="Ubah Foto Profil">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shadow-md bg-surface-container-high relative">
                      <img alt={`Foto Profil ${user.name}`} className="w-full h-full object-cover transition-opacity group-hover:opacity-60" src={user.avatar} />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="material-symbols-outlined text-[32px] text-white">photo_camera</span>
                      </div>
                    </div>
                    <span className="absolute -bottom-2 -right-2 flex items-center gap-space-xs px-2.5 py-1 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm shadow-[0_0_14px_rgba(124,58,237,0.6)]">
                      <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                      VIP Pro
                    </span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                    />
                  </div>
                  
                  {/* User Details */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex flex-wrap items-center gap-space-sm">
                      <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight">{user.name}</h1>
                      <span className="px-2.5 py-0.5 rounded-full bg-secondary-container/30 text-secondary font-label-sm text-label-sm">
                        ID: #LIT-PRO-984
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-x-space-md gap-y-1 font-body-sm text-body-sm text-on-surface-variant">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-outline text-[16px]">mail</span>
                        {user.email}
                      </span>
                      <span className="text-outline hidden sm:inline">•</span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-outline text-[16px]">calendar_today</span>
                        Bergabung sejak Januari 2024
                      </span>
                    </div>
                    
                    {/* Sync Indicator */}
                    <div className="mt-1 flex items-center gap-space-xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <p className="font-label-sm text-label-sm text-secondary">
                        Sinkronisasi Cloud Aktif <span className="text-on-surface-variant font-normal">(3 perangkat terhubung)</span>
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Action CTAs */}
                <div className="flex items-center gap-space-sm shrink-0 self-start lg:self-center">
                  <button className="flex items-center gap-space-xs px-space-md py-2.5 rounded-lg bg-surface-container-high text-on-surface hover:bg-surface-bright font-label-md text-label-md transition-colors shadow-sm" type="button" onClick={() => document.getElementById('edit-profile-section')?.scrollIntoView({ behavior: 'smooth' })}>
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                    Edit Profil
                  </button>
                  <button className="flex items-center gap-space-xs px-space-md py-2.5 rounded-lg bg-error-container/30 text-error hover:bg-error-container/50 font-label-md text-label-md transition-colors" type="button" onClick={handleLogout}>
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                    Keluar Akun
                  </button>
                </div>
              </div>
              
              {/* Quick Metrics Strip */}
              <div className="relative z-10 mt-space-lg pt-space-md grid grid-cols-2 sm:grid-cols-4 gap-space-md bg-surface-container-lowest/60 rounded-lg p-space-md backdrop-blur-sm">
                <div className="flex flex-col">
                  <span className="font-caption text-caption text-outline uppercase tracking-wider">Koleksi Buku</span>
                  <span className="font-price-lg text-price-lg text-on-surface mt-0.5">{ownedBooks.length} Ebook</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-caption text-caption text-outline uppercase tracking-wider">Waktu Membaca</span>
                  <span className="font-price-lg text-price-lg text-primary mt-0.5">142 Jam</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-caption text-caption text-outline uppercase tracking-wider">Buku Selesai</span>
                  <span className="font-price-lg text-price-lg text-on-surface mt-0.5">{completedBooksCount} Judul</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-caption text-caption text-outline uppercase tracking-wider">Litera Poin</span>
                  <span className="font-price-lg text-price-lg text-tertiary mt-0.5">1.450 LP</span>
                </div>
              </div>
            </section>
            
            {/* Content Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
              
              {/* Sidebar */}
              <aside className="lg:col-span-4 flex flex-col gap-space-md">
                <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-1.5 shadow-md">
                  <div className="px-space-sm py-2">
                    <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Menu Navigasi Akun</span>
                  </div>
                  <Link className="flex items-center justify-between px-space-md py-3 rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md transition-all shadow-sm" to="/profil">
                    <div className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                      <span>Profil & Biodata</span>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                  </Link>
                  <a className="flex items-center justify-between px-space-md py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high/60 hover:text-on-surface font-label-md text-label-md transition-colors" href="#">
                    <div className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-outline text-[20px]">receipt_long</span>
                      <span>Riwayat Transaksi</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-caption">2 Baru</span>
                  </a>
                  <a className="flex items-center justify-between px-space-md py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high/60 hover:text-on-surface font-label-md text-label-md transition-colors" href="#">
                    <div className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-outline text-[20px]">devices</span>
                      <span>Pengaturan & E-Reader Sync</span>
                    </div>
                    <span className="material-symbols-outlined text-outline text-[18px]">chevron_right</span>
                  </a>
                  <a className="flex items-center justify-between px-space-md py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high/60 hover:text-on-surface font-label-md text-label-md transition-colors" href="#">
                    <div className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-outline text-[20px]">shield</span>
                      <span>Keamanan & Kata Sandi</span>
                    </div>
                    <span className="material-symbols-outlined text-outline text-[18px]">chevron_right</span>
                  </a>
                  <a className="flex items-center justify-between px-space-md py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high/60 hover:text-on-surface font-label-md text-label-md transition-colors" href="#">
                    <div className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-outline text-[20px]">credit_card</span>
                      <span>Metode Pembayaran</span>
                    </div>
                    <span className="material-symbols-outlined text-outline text-[18px]">chevron_right</span>
                  </a>
                  <a className="flex items-center justify-between px-space-md py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high/60 hover:text-on-surface font-label-md text-label-md transition-colors" href="#">
                    <div className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-outline text-[20px]">local_activity</span>
                      <span>Voucher & Kupon Saya</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-primary-container/40 text-primary font-label-sm text-caption">3 Kupon</span>
                  </a>
                </div>
                
                {/* Sync Health Card Mini */}
                <div className="bg-surface-container-low rounded-xl p-space-md shadow-md flex flex-col gap-space-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md text-on-surface font-semibold">Status Cloud Library</span>
                    <span className="material-symbols-outlined text-primary text-[20px]">cloud_sync</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Penyimpanan anotasi, bookmark, dan posisi baca terakhir otomatis dienkripsi 256-bit.</p>
                  <div className="w-full bg-surface-container-highest rounded-full h-2 mt-1 overflow-hidden">
                    <div className="bg-primary-container h-full rounded-full w-2/5"></div>
                  </div>
                  <div className="flex justify-between items-center font-caption text-caption text-outline">
                    <span>Terpakai: 242 MB</span>
                    <span>Kapasitas: 5.0 GB</span>
                  </div>
                </div>
              </aside>
              
              {/* Main Content Panels */}
              <div className="lg:col-span-8 flex flex-col gap-space-xl">
                
                {/* Informasi Personal Form */}
                <section id="edit-profile-section" className="bg-surface-container-low rounded-xl p-space-lg md:p-space-xl shadow-md flex flex-col gap-space-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs pb-space-sm">
                    <div>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface">Informasi Personal & Preferensi</h2>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Atur identitas akun pembaca dan sesuaikan kenyamanan membaca Anda.</p>
                    </div>
                    <span className="px-3 py-1 self-start sm:self-auto rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">Tervalidasi OTP</span>
                  </div>
                  
                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-md text-label-md text-on-surface">Nama Lengkap</label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-space-md text-outline text-[18px]">badge</span>
                        <input className="w-full bg-surface-container pl-10 pr-space-md py-2.5 rounded-lg text-on-surface font-body-sm text-body-sm placeholder:text-outline focus:outline-none focus:bg-surface-container-high focus:ring-1 focus:ring-primary transition-all" type="text" value={name} onChange={e => setName(e.target.value)} />
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-md text-label-md text-on-surface">Username</label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-space-md text-outline text-[18px]">alternate_email</span>
                        <input className="w-full bg-surface-container pl-10 pr-space-md py-2.5 rounded-lg text-on-surface font-body-sm text-body-sm placeholder:text-outline focus:outline-none focus:bg-surface-container-high focus:ring-1 focus:ring-primary transition-all" type="text" value={username} onChange={e => setUsername(e.target.value)} />
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-md text-label-md text-on-surface flex items-center justify-between">
                        <span>Alamat Surel</span>
                        <span className="text-emerald-400 font-label-sm text-caption flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[14px]">check_circle</span> Terverifikasi
                        </span>
                      </label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-space-md text-outline text-[18px]">mail</span>
                        <input className="w-full bg-surface-container pl-10 pr-space-md py-2.5 rounded-lg text-on-surface font-body-sm text-body-sm placeholder:text-outline focus:outline-none focus:bg-surface-container-high focus:ring-1 focus:ring-primary transition-all" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-md text-label-md text-on-surface">Nomor WhatsApp (Notifikasi Pembelian)</label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-space-md text-outline text-[18px]">phone_iphone</span>
                        <input className="w-full bg-surface-container pl-10 pr-space-md py-2.5 rounded-lg text-on-surface font-body-sm text-body-sm placeholder:text-outline focus:outline-none focus:bg-surface-container-high focus:ring-1 focus:ring-primary transition-all" type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
                      </div>
                    </div>
                  </div>
                  
                  {/* Preferences */}
                  <div className="pt-space-sm flex flex-col gap-space-md">
                    <span className="font-label-md text-label-md text-on-surface font-semibold">Preferensi Unduhan & Format Utama</span>
                    <div className="flex flex-wrap items-center gap-space-sm">
                      <label className="cursor-pointer flex items-center gap-space-sm px-space-md py-2 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors">
                        <input className="accent-primary w-4 h-4 cursor-pointer" name="default_format" type="radio" checked={defaultFormat === 'epub'} onChange={() => setDefaultFormat('epub')} />
                        <span className="font-body-sm text-body-sm text-on-surface">EPUB Terfluidisasi (Rekomendasi Layar & Mobile)</span>
                      </label>
                      <label className="cursor-pointer flex items-center gap-space-sm px-space-md py-2 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors">
                        <input className="accent-primary w-4 h-4 cursor-pointer" name="default_format" type="radio" checked={defaultFormat === 'pdf'} onChange={() => setDefaultFormat('pdf')} />
                        <span className="font-body-sm text-body-sm text-on-surface">PDF High-Res (Cocok untuk Tablet & Cetak)</span>
                      </label>
                    </div>
                    
                    <div className="flex flex-col gap-space-xs">
                      <span className="font-label-md text-label-md text-on-surface">Kategori Minat Membaca Anda</span>
                      <div className="flex flex-wrap items-center gap-space-xs pt-1">
                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-container/20 text-primary font-label-sm text-label-sm shadow-[0_0_12px_rgba(124,58,237,0.2)]">
                          <span className="material-symbols-outlined text-[15px]">code</span> Teknologi & Coding
                          <button className="material-symbols-outlined text-[14px] hover:text-white ml-0.5" type="button">close</button>
                        </span>
                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-container/20 text-primary font-label-sm text-label-sm shadow-[0_0_12px_rgba(124,58,237,0.2)]">
                          <span className="material-symbols-outlined text-[15px]">trending_up</span> Bisnis & Investasi
                          <button className="material-symbols-outlined text-[14px] hover:text-white ml-0.5" type="button">close</button>
                        </span>
                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-container/20 text-primary font-label-sm text-label-sm shadow-[0_0_12px_rgba(124,58,237,0.2)]">
                          <span className="material-symbols-outlined text-[15px]">psychology</span> Filosofi & Mindset
                          <button className="material-symbols-outlined text-[14px] hover:text-white ml-0.5" type="button">close</button>
                        </span>
                        <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-colors" type="button">
                          <span className="material-symbols-outlined text-[16px]">add</span> Tambah Kategori
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Toggles */}
                  <div className="pt-space-sm flex flex-col gap-space-md bg-surface-container/60 rounded-xl p-space-md">
                    <label className="flex items-center justify-between gap-space-md cursor-pointer select-none">
                      <div className="flex items-start gap-space-sm">
                        <span className="material-symbols-outlined text-primary text-[22px] mt-0.5">alarm</span>
                        <div className="flex flex-col">
                          <span className="font-label-md text-label-md text-on-surface">Aktifkan Pengingat Membaca Harian</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">Notifikasi browser dan aplikasi setiap pukul 20:00 WIB agar konsisten mencapai target baca.</span>
                        </div>
                      </div>
                      <div className="relative inline-flex items-center cursor-pointer shrink-0">
                        <input className="sr-only peer" type="checkbox" checked={dailyReminder} onChange={e => setDailyReminder(e.target.checked)} />
                        <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
                      </div>
                    </label>
                    <label className="flex items-center justify-between gap-space-md cursor-pointer select-none">
                      <div className="flex items-start gap-space-sm">
                        <span className="material-symbols-outlined text-secondary text-[22px] mt-0.5">sync_saved_locally</span>
                        <div className="flex flex-col">
                          <span className="font-label-md text-label-md text-on-surface">Sinkronisasi Catatan Lintas Perangkat Otomatis</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">Sorotan teks (*highlights*) dan catatan pinggir buku langsung tersambung ke web dan e-reader.</span>
                        </div>
                      </div>
                      <div className="relative inline-flex items-center cursor-pointer shrink-0">
                        <input className="sr-only peer" type="checkbox" checked={cloudSync} onChange={e => setCloudSync(e.target.checked)} />
                        <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
                      </div>
                    </label>
                  </div>
                  
                  {/* Save Buttons */}
                  <div className="flex justify-end gap-space-sm pt-space-xs">
                    <button className="px-space-md py-2.5 rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md hover:bg-surface-bright transition-colors" type="button" onClick={handleCancel}>Batalkan</button>
                    <button className="px-space-lg py-2.5 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md hover:shadow-[0_0_24px_rgba(124,58,237,0.45)] transition-all font-semibold" type="button" onClick={handleSave}>Simpan Perubahan</button>
                  </div>
                </section>
                
                {/* Transaksi Mock */}
                <section className="bg-surface-container-low rounded-xl p-space-lg md:p-space-xl shadow-md flex flex-col gap-space-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
                    <div>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface">Riwayat Transaksi & Pembelian</h2>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Seluruh pembelian ebook resmi tersimpan dengan lisensi kepemilikan permanen.</p>
                    </div>
                    <a className="font-label-md text-label-md text-primary hover:underline flex items-center gap-1 self-start sm:self-auto" href="#">
                      Lihat Semua Transaksi
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </a>
                  </div>
                  <div className="overflow-x-auto rounded-lg bg-surface-container-lowest/80">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-surface-container-high/60 text-outline font-caption text-caption uppercase tracking-wider">
                          <th className="px-space-md py-3 font-semibold">No. Pesanan</th>
                          <th className="px-space-md py-3 font-semibold">Tanggal</th>
                          <th className="px-space-md py-3 font-semibold">Judul Buku Digital</th>
                          <th className="px-space-md py-3 font-semibold">Total Tagihan</th>
                          <th className="px-space-md py-3 font-semibold">Status</th>
                          <th className="px-space-md py-3 font-semibold text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-surface-container-high/20 font-body-sm text-body-sm">
                        {/* Row 1 */}
                        <tr className="hover:bg-surface-container/50 transition-colors">
                          <td className="px-space-md py-4 font-mono text-on-surface font-semibold">#LIT-89210</td>
                          <td className="px-space-md py-4 text-on-surface-variant whitespace-nowrap">24 Sep 2026</td>
                          <td className="px-space-md py-4">
                            <div className="flex flex-col">
                              <span className="text-on-surface font-medium">Arsitektur Frontend Modern, Docker & K8s</span>
                              <span className="font-caption text-caption text-outline">2 File EPUB + PDF Interaktif</span>
                            </div>
                          </td>
                          <td className="px-space-md py-4 font-price-md text-price-md text-on-surface whitespace-nowrap">Rp 97.000</td>
                          <td className="px-space-md py-4 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-label-sm text-label-sm">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>Lunas / Berhasil
                            </span>
                          </td>
                          <td className="px-space-md py-4 text-right whitespace-nowrap">
                            <div className="inline-flex items-center gap-space-xs justify-end">
                              <button className="p-1.5 rounded bg-surface-container-high text-on-surface hover:text-primary transition-colors" title="Lihat Invoice" type="button">
                                <span className="material-symbols-outlined text-[18px]">receipt</span>
                              </button>
                              <button className="p-1.5 rounded bg-surface-container-high text-on-surface hover:text-primary transition-colors" title="Unduh Bukti Transaksi" type="button">
                                <span className="material-symbols-outlined text-[18px]">download</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                        {/* Row 2 */}
                        <tr className="hover:bg-surface-container/50 transition-colors">
                          <td className="px-space-md py-4 font-mono text-on-surface font-semibold">#LIT-88451</td>
                          <td className="px-space-md py-4 text-on-surface-variant whitespace-nowrap">12 Agu 2026</td>
                          <td className="px-space-md py-4">
                            <div className="flex flex-col">
                              <span className="text-on-surface font-medium">Filosofi Teras</span>
                              <span className="font-caption text-caption text-outline">1 File EPUB Reflowable</span>
                            </div>
                          </td>
                          <td className="px-space-md py-4 font-price-md text-price-md text-on-surface whitespace-nowrap">Rp 38.000</td>
                          <td className="px-space-md py-4 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-label-sm text-label-sm">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>Lunas / Berhasil
                            </span>
                          </td>
                          <td className="px-space-md py-4 text-right whitespace-nowrap">
                            <div className="inline-flex items-center gap-space-xs justify-end">
                              <button className="p-1.5 rounded bg-surface-container-high text-on-surface hover:text-primary transition-colors" title="Lihat Invoice" type="button">
                                <span className="material-symbols-outlined text-[18px]">receipt</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
                
                {/* Manajemen Perangkat */}
                <section className="bg-surface-container-low rounded-xl p-space-lg md:p-space-xl shadow-md flex flex-col gap-space-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
                    <div>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface">Manajemen Perangkat E-Reader & Aplikasi</h2>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Kelola daftar gawai resmi yang dapat membuka dan mengunduh lisensi buku digital Anda.</p>
                    </div>
                    <button className="flex items-center gap-space-xs px-3 py-1.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm transition-colors self-start sm:self-auto" type="button">
                      <span className="material-symbols-outlined text-[16px]">add_to_queue</span>
                      Tautkan Perangkat Baru
                    </button>
                  </div>
                  
                  <div className="flex flex-col gap-space-sm pt-space-xs">
                    {/* Perangkat 1: MacBook Pro (Aktif sekarang) */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-space-md rounded-xl bg-surface-container gap-space-md">
                      <div className="flex items-start gap-space-md">
                        <div className="p-3 rounded-lg bg-primary-container/20 text-primary shrink-0"><span className="material-symbols-outlined text-[24px]">laptop_mac</span></div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-space-sm">
                            <span className="font-label-md text-label-md text-on-surface font-semibold">MacBook Pro 14"</span>
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-label-sm text-caption">Perangkat Ini</span>
                          </div>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">Litera Web Reader • Jakarta, Indonesia</p>
                          <span className="font-caption text-caption text-outline mt-0.5">Sesi aktif saat ini</span>
                        </div>
                      </div>
                      <button className="self-start sm:self-center px-space-md py-1.5 rounded-lg bg-surface-container-high/60 text-outline cursor-not-allowed font-label-sm text-label-sm" disabled type="button">Sedang Digunakan</button>
                    </div>
                    {/* Perangkat 2: iPad Air M2 */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-space-md rounded-xl bg-surface-container gap-space-md">
                      <div className="flex items-start gap-space-md">
                        <div className="p-3 rounded-lg bg-secondary-container/20 text-secondary shrink-0"><span className="material-symbols-outlined text-[24px]">tablet_mac</span></div>
                        <div className="flex flex-col">
                          <span className="font-label-md text-label-md text-on-surface font-semibold">iPad Air M2</span>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">Litera Reader App iOS v2.4.1</p>
                          <span className="font-caption text-caption text-outline mt-0.5">Terakhir sinkron: Kemarin, 21:14 WIB</span>
                        </div>
                      </div>
                      <button className="self-start sm:self-center px-space-md py-1.5 rounded-lg bg-surface-container-high text-error hover:bg-error-container/30 font-label-sm text-label-sm transition-colors flex items-center gap-1" type="button">
                        <span className="material-symbols-outlined text-[16px]">link_off</span>
                        Putuskan Akses
                      </button>
                    </div>
                    {/* Perangkat 3: Kindle Paperwhite */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-space-md rounded-xl bg-surface-container gap-space-md">
                      <div className="flex items-start gap-space-md">
                        <div className="p-3 rounded-lg bg-tertiary-container/30 text-tertiary shrink-0"><span className="material-symbols-outlined text-[24px]">menu_book</span></div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-space-sm">
                            <span className="font-label-md text-label-md text-on-surface font-semibold">Kindle Paperwhite 11th Gen</span>
                            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-caption">Cloud Send</span>
                          </div>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">rian.kindle_89@kindle.com</p>
                          <span className="font-caption text-caption text-outline mt-0.5">Pengiriman format EPUB/MOBI instan aktif</span>
                        </div>
                      </div>
                      <button className="self-start sm:self-center px-space-md py-1.5 rounded-lg bg-surface-container-high text-error hover:bg-error-container/30 font-label-sm text-label-sm transition-colors flex items-center gap-1" type="button">
                        <span className="material-symbols-outlined text-[16px]">link_off</span>
                        Putuskan Akses
                      </button>
                    </div>
                  </div>
                </section>
                
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface-container-lowest shadow-[0_-1px_12px_rgba(0,0,0,0.5)] pt-space-xl pb-space-lg">
        <div className="w-full px-margin">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-gutter mb-space-xl">
            <div className="lg:col-span-2 flex flex-col gap-space-md">
              <div className="flex items-center gap-space-sm">
                <img alt="LiteraDigital Logo" className="h-7 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1XnWVGviR6AVjrRVsi3PYYsusQ_T793BnXmqdS-sZP2YLsW-Yh-F7-9uJBcCX-E0m4rww6r0wisAnuwAqtj8TbaHbS2oKUcnKlwiVZRLrNJjW6t2luZWuCVSUaSxNzzhPu95rEzlXb_pMc5BZyhncCEhvDbEPGHh_kFuWJtGmUjTzZqegKwRWx6mH4pT9c4dSLFROD0XiVV1E6Nm4ltyhwh44mBxn4GMcz-ZgbCp-rxT026J1hHFuwnPt1M" />
                <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold">Litera<span className="text-primary">Digital</span></span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">Kurasi buku digital premium, teknis, dan literatur pilihan untuk pengalaman membaca modern tanpa distraksi.</p>
              <div className="flex items-center gap-space-sm pt-space-xs">
                <span className="px-space-sm py-space-xs rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">EPUB & PDF Reader</span>
                <span className="px-space-sm py-space-xs rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">Akses Selamanya</span>
              </div>
            </div>
            <div className="flex flex-col gap-space-sm">
              <span className="font-label-md text-label-md text-on-surface font-semibold tracking-wide">Katalog Ebook</span>
              <nav className="flex flex-col gap-space-xs">
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">Fiksi</a>
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">Teknologi</a>
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">Bisnis</a>
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">Pengembangan Diri</a>
              </nav>
            </div>
            <div className="flex flex-col gap-space-sm">
              <span className="font-label-md text-label-md text-on-surface font-semibold tracking-wide">Dukungan & Legal</span>
              <nav className="flex flex-col gap-space-xs">
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">Bantuan & FAQ</a>
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">Syarat & Ketentuan</a>
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">Kebijakan Privasi</a>
              </nav>
            </div>
            <div className="flex flex-col gap-space-md">
              <span className="font-label-md text-label-md text-on-surface font-semibold tracking-wide">Buletin Literasi</span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Dapatkan rekomendasi kurasi dan diskon eksklusif mingguan langsung di surel Anda.</p>
              <div className="flex flex-col gap-space-sm">
                <input className="w-full bg-surface-container-low px-space-md py-space-sm rounded-lg text-on-surface font-body-sm text-body-sm placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Alamat surel Anda..." type="email" />
                <button className="w-full bg-primary-container text-on-primary-container font-label-md text-label-md py-space-sm rounded-lg hover:shadow-[0_0_24px_rgba(124,58,237,0.4)] transition-all font-semibold" type="button">Berlangganan</button>
              </div>
            </div>
          </div>
          <div className="pt-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-md border-t border-surface-container-high/30">
            <p className="font-body-sm text-body-sm text-outline">© 2026 LiteraDigital. Hak Cipta Dilindungi.</p>
            <div className="flex items-center gap-space-md text-outline font-body-sm text-body-sm">
              <span>Platform Ebook Indonesia</span>
              <span>•</span>
              <span>Format Terbuka & Terproteksi</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
