import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLibrary } from '../context/LibraryContext';
import { useCart } from '../context/CartContext';

export const LibraryPage: React.FC = () => {
  const { ownedBooks, togglePin } = useLibrary();
  const { cartItems } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState<'Semua' | 'Sedang Dibaca' | 'Belum Mulai' | 'Selesai' | 'Disematkan'>('Semua');
  const [sortBy, setSortBy] = useState('recent');

  // Stats
  const totalOwned = ownedBooks.length;
  const currentlyReading = ownedBooks.filter(ob => ob.status === 'Sedang Dibaca').length;
  const finishedReading = ownedBooks.filter(ob => ob.status === 'Selesai Dibaca').length;
  const notStarted = ownedBooks.filter(ob => ob.status === 'Belum Mulai').length;
  const pinned = ownedBooks.filter(ob => ob.isPinned).length;

  // Most recent book for Hero section
  const mostRecentBook = useMemo(() => {
    return [...ownedBooks].sort((a, b) => {
      if (!a.lastReadAt && !b.lastReadAt) return 0;
      if (!a.lastReadAt) return 1;
      if (!b.lastReadAt) return -1;
      return b.lastReadAt.getTime() - a.lastReadAt.getTime();
    })[0];
  }, [ownedBooks]);

  const formatTimeAgo = (date: Date | null) => {
    if (!date) return 'Belum dibaca';
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " tahun lalu";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " bulan lalu";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " hari lalu";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " jam lalu";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " menit lalu";
    return Math.floor(seconds) + " detik lalu";
  };

  const handleOpenPdf = (pdfUrl?: string) => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleDownloadPdf = (pdfUrl?: string, title?: string) => {
    if (!pdfUrl) return;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${title?.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_') || 'ebook'}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
  };

  // Filter and Sort Books
  const displayedBooks = useMemo(() => {
    let filtered = ownedBooks;

    if (searchQuery) {
      filtered = filtered.filter(ob =>
        ob.book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ob.book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (activeTab === 'Sedang Dibaca') filtered = filtered.filter(ob => ob.status === 'Sedang Dibaca');
    if (activeTab === 'Belum Mulai') filtered = filtered.filter(ob => ob.status === 'Belum Mulai');
    if (activeTab === 'Selesai') filtered = filtered.filter(ob => ob.status === 'Selesai Dibaca');
    if (activeTab === 'Disematkan') filtered = filtered.filter(ob => ob.isPinned);

    return filtered.sort((a, b) => {
      if (sortBy === 'recent') {
        const timeA = a.lastReadAt ? a.lastReadAt.getTime() : 0;
        const timeB = b.lastReadAt ? b.lastReadAt.getTime() : 0;
        return timeB - timeA;
      }
      if (sortBy === 'title') {
        return a.book.title.localeCompare(b.book.title);
      }
      if (sortBy === 'date') {
        return b.purchaseDate.getTime() - a.purchaseDate.getTime();
      }
      if (sortBy === 'progress') {
        return b.progress - a.progress;
      }
      return 0;
    });
  }, [ownedBooks, searchQuery, activeTab, sortBy]);


  return (
    <div className="bg-surface-container-lowest text-on-surface font-body-md text-body-md antialiased min-h-screen selection:bg-primary-container selection:text-on-primary-container">

      {/* We will use the shared Header if it matches or a custom one. The shared Header component is probably suitable, but we pass activePath. */}
      {/* Wait, the HTML has a specific header for Perpustakaan Saya. Let's use the provided HTML header or the shared one. */}
      <header className="sticky top-0 z-50 w-full bg-surface-container-lowest/80 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
        <div className="h-20 w-full px-margin flex items-center justify-between gap-gutter">
          <div className="flex items-center gap-gutter shrink-0">
            <Link to="/dashboard" className="flex items-center gap-space-sm">
              <img alt="LiteraDigital Logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1XnWVGviR6AVjrRVsi3PYYsusQ_T793BnXmqdS-sZP2YLsW-Yh-F7-9uJBcCX-E0m4rww6r0wisAnuwAqtj8TbaHbS2oKUcnKlwiVZRLrNJjW6t2luZWuCVSUaSxNzzhPu95rEzlXb_pMc5BZyhncCEhvDbEPGHh_kFuWJtGmUjTzZqegKwRWx6mH4pT9c4dSLFROD0XiVV1E6Nm4ltyhwh44mBxn4GMcz-ZgbCp-rxT026J1hHFuwnPt1M" />
              <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold">Litera<span className="text-primary">Digital</span></span>
            </Link>
            <nav className="hidden lg:flex items-center gap-space-xs">
              <Link to="/dashboard" className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-md text-label-md hover:text-on-surface transition-colors">Beranda</Link>
              <Link to="/dashboard" className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-md text-label-md hover:text-on-surface transition-colors">Katalog</Link>
              <Link to="/perpustakaan-saya" className="px-space-md py-space-sm rounded-lg transition-colors text-on-surface font-bold bg-surface-container-high/60">Perpustakaan Saya</Link>
              <Link to="/dashboard" className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-md text-label-md hover:text-on-surface transition-colors">Promo</Link>
            </nav>
          </div>
          <div className="flex-1 max-w-lg mx-space-md hidden md:block">
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-space-md text-outline pointer-events-none text-[20px]">search</span>
              <input className="w-full bg-surface-container-low pl-10 pr-space-md py-space-sm rounded-lg text-on-surface font-body-sm text-body-sm placeholder:text-outline focus:outline-none focus:bg-surface-container focus:ring-1 focus:ring-primary transition-all" placeholder="Cari buku, penulis, topik, atau ISBN..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-space-md shrink-0">
            <Link to="/keranjang" className="relative p-space-sm rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
              {cartItems.length > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-primary-container text-on-primary-container font-label-sm text-caption shadow-[0_0_12px_rgba(124,58,237,0.5)]">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <div className="relative group flex items-center">
              <div className="flex items-center gap-space-sm pl-space-sm py-space-xs rounded-lg hover:bg-surface-container-high/50 transition-colors cursor-pointer">
                <img alt="User Avatar" className="w-8 h-8 rounded-full object-cover ring-1 ring-primary/40" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3coyPznlPdOjrxGmTVDH4P1y59poKhZyT8ytjsgEmz31CxaOXQL2kAdxa5tE9FWZQ69EYM2pT0b2Bv0lLJ4IY7WVh6kwdewK3QqbRE1B4rOLMO-HjcVwWQVBunUO9vQjqKHLbdOFQXhBBu0NEsvl9g41EBVcBpzATPzTS_uYp_PgQpBexKsTgiTj0Gnl2SwH55y0jKGLEj9GPOiiZqNwjCo6sgGRFV4MIKpru0n8mmijp-6YZdGXW9Q" />
                <div className="hidden sm:flex items-center gap-space-xs">
                  <span className="font-label-md text-label-md text-on-surface font-medium">Rian Pratama</span>
                  <span className="material-symbols-outlined text-outline text-[18px]">keyboard_arrow_down</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full bg-surface-container-lowest min-h-screen pt-20">
        <div className="flex flex-col w-full">
          <div className="w-full px-margin py-space-lg flex flex-col gap-space-xl max-w-[1360px] mx-auto">

            {/* Top Section: Header & Quick Stats */}
            <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
              <div className="flex flex-col gap-space-xs max-w-2xl">
                <div className="flex items-center gap-space-xs text-primary font-label-sm text-label-sm uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  Koleksi Pribadi • Akun Terverifikasi
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight">Perpustakaan Saya</h1>
                <p className="font-body-md text-body-md text-on-surface-variant">Kelola buku digital yang telah Anda miliki, lanjutkan membaca dengan sinkronisasi awan, atau unduh berkas secara luring.</p>
              </div>

              {/* User Stats Cards */}
              <div className="grid grid-cols-3 gap-space-sm sm:gap-space-md shrink-0">
                <div className="bg-surface-container p-space-md rounded-xl shadow-md flex flex-col justify-between min-w-[110px] sm:min-w-[140px]">
                  <div className="flex items-center justify-between text-outline">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Total Dimiliki</span>
                    <span className="material-symbols-outlined text-[18px]">library_books</span>
                  </div>
                  <div className="mt-space-xs">
                    <span className="font-headline-md text-headline-md text-on-surface font-bold">{totalOwned}</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant ml-1">Ebook</span>
                  </div>
                </div>
                <div className="bg-surface-container p-space-md rounded-xl shadow-md flex flex-col justify-between min-w-[110px] sm:min-w-[140px]">
                  <div className="flex items-center justify-between text-secondary">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Sedang Dibaca</span>
                    <span className="material-symbols-outlined text-[18px]">menu_book</span>
                  </div>
                  <div className="mt-space-xs">
                    <span className="font-headline-md text-headline-md text-secondary font-bold">{currentlyReading}</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant ml-1">Buku</span>
                  </div>
                </div>
                <div className="bg-surface-container p-space-md rounded-xl shadow-md flex flex-col justify-between min-w-[110px] sm:min-w-[140px]">
                  <div className="flex items-center justify-between text-tertiary">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Tamat Dibaca</span>
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                  </div>
                  <div className="mt-space-xs">
                    <span className="font-headline-md text-headline-md text-tertiary font-bold">{finishedReading}</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant ml-1">Buku</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Hero Continue Reading Feature */}
            {mostRecentBook && (
              <section className="relative rounded-2xl bg-surface-container overflow-hidden shadow-xl p-space-md sm:p-space-lg lg:p-space-xl">
                <div className="absolute -right-24 -top-24 w-96 h-96 bg-primary-container/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-secondary-container/15 rounded-full blur-3xl pointer-events-none"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-space-lg lg:gap-space-xl">
                  {/* Ebook Cover with Spine Glow */}
                  <div className="shrink-0 relative group">
                    <div className="w-44 sm:w-52 aspect-[3/4] rounded-lg overflow-hidden shadow-2xl relative bg-surface-container-high">
                      <img className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" alt={mostRecentBook.book.title} src={mostRecentBook.book.coverImage} />
                      <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/60 via-black/20 to-transparent shadow-inner"></div>
                      <div className="absolute top-3 left-3 bg-surface-container-lowest/80 backdrop-blur-md px-2.5 py-1 rounded-full text-on-surface font-label-sm text-label-sm flex items-center gap-1 shadow-sm">
                        <span className="material-symbols-outlined text-[14px] text-primary">bolt</span>
                        Terakhir Aktif
                      </div>
                    </div>
                  </div>

                  {/* Info & Progress Details */}
                  <div className="flex-1 flex flex-col justify-between w-full">
                    <div>
                      <div className="flex flex-wrap items-center gap-space-sm mb-space-xs">
                        <span className="bg-primary-container/25 text-primary px-space-sm py-0.5 rounded-full font-label-sm text-label-sm font-semibold">{mostRecentBook.book.category}</span>
                        <span className="bg-surface-container-high text-on-surface-variant px-space-sm py-0.5 rounded-full font-label-sm text-label-sm">{mostRecentBook.book.format}</span>
                        <span className="text-outline font-caption text-caption flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">schedule</span> Terakhir dibaca {formatTimeAgo(mostRecentBook.lastReadAt)}
                        </span>
                      </div>
                      <h2 className="font-headline-md text-headline-md text-on-surface font-bold leading-tight">
                        {mostRecentBook.book.title}
                      </h2>
                      <p className="font-body-md text-body-md text-on-surface-variant mt-1">{mostRecentBook.book.author}</p>
                    </div>

                    {/* Progress Block */}
                    <div className="my-space-md bg-surface-container-low/70 p-space-md rounded-xl shadow-sm">
                      <div className="flex items-center justify-between mb-space-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-label-md text-label-md text-on-surface font-semibold">Sesi Terakhir Terbuka</span>
                        </div>
                        <span className="font-label-md text-label-md text-primary font-bold">{mostRecentBook.progress}%</span>
                      </div>
                      {/* Progress Bar */}
                      <div className="w-full bg-surface-container-highest h-2.5 rounded-full overflow-hidden shadow-inner">
                        <div className="h-full bg-gradient-to-r from-primary-container via-primary to-secondary rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(124,58,237,0.6)]" style={{ width: `${mostRecentBook.progress}%` }}></div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-space-sm sm:gap-space-md">
                      <button onClick={() => handleOpenPdf(mostRecentBook.book.pdfUrl)} className="bg-gradient-to-r from-primary-container to-secondary-container text-on-primary font-label-md text-label-md px-space-lg py-space-sm rounded-lg flex items-center gap-2 shadow-lg hover:shadow-[0_0_24px_rgba(124,58,237,0.45)] transition-all font-semibold active:scale-95" type="button">
                        <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                        Lanjutkan Membaca
                      </button>
                      <div className="relative group/dl">
                        <button className="bg-surface-container-high hover:bg-surface-bright text-on-surface-variant hover:text-on-surface font-label-md text-label-md px-space-md py-space-sm rounded-lg flex items-center gap-2 shadow-sm transition-colors" type="button">
                          <span className="material-symbols-outlined text-[18px]">cloud_download</span>
                          <span>Unduh Berkas</span>
                          <span className="material-symbols-outlined text-[16px]">expand_more</span>
                        </button>
                        <div className="hidden group-hover/dl:flex flex-col absolute left-0 sm:right-0 sm:left-auto bottom-full mb-2 w-48 bg-surface-container-highest shadow-xl rounded-xl p-1 z-20">
                          <a className="px-3 py-2 text-on-surface font-label-sm text-label-sm rounded-lg hover:bg-surface-container-high flex items-center justify-between transition-colors cursor-pointer" onClick={() => handleDownloadPdf(mostRecentBook.book.pdfUrl, mostRecentBook.book.title)}>
                            <span>Format EPUB</span>
                          </a>
                          <a className="px-3 py-2 text-on-surface font-label-sm text-label-sm rounded-lg hover:bg-surface-container-high flex items-center justify-between transition-colors cursor-pointer" onClick={() => handleDownloadPdf(mostRecentBook.book.pdfUrl, mostRecentBook.book.title)}>
                            <span>Format PDF</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Filters, Search & View Controls */}
            <section className="flex flex-col gap-space-md">
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-md">
                {/* Search bar inside library */}
                <div className="relative flex-1 max-w-md">
                  <span className="material-symbols-outlined absolute left-space-md top-1/2 -translate-y-1/2 text-outline text-[20px] pointer-events-none">search</span>
                  <input
                    className="w-full bg-surface-container pl-11 pr-space-md py-2.5 rounded-xl text-on-surface font-body-sm text-body-sm placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary shadow-sm transition-all"
                    placeholder="Cari di perpustakaan saya..."
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap items-center gap-space-sm justify-between lg:justify-end">
                  {/* Sort Dropdown */}
                  <div className="flex items-center gap-2 bg-surface-container px-space-md py-2 rounded-xl shadow-sm">
                    <span className="material-symbols-outlined text-outline text-[18px]">sort</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Urutkan:</span>
                    <select
                      className="bg-transparent text-on-surface font-label-sm text-label-sm focus:outline-none cursor-pointer"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option className="bg-surface-container text-on-surface" value="recent">Terakhir Dibaca</option>
                      <option className="bg-surface-container text-on-surface" value="title">Judul A - Z</option>
                      <option className="bg-surface-container text-on-surface" value="date">Tanggal Pembelian</option>
                      <option className="bg-surface-container text-on-surface" value="progress">Kemajuan Tertinggi</option>
                    </select>
                  </div>
                  {/* View Mode Toggle */}
                  <div className="flex items-center bg-surface-container p-1 rounded-xl shadow-sm">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 rounded-lg flex items-center justify-center transition-colors ${viewMode === 'grid' ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                      title="Tampilan Grid"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">grid_view</span>
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-1.5 rounded-lg flex items-center justify-center transition-colors ${viewMode === 'list' ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                      title="Tampilan List"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">view_list</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Categories & Reading Status Tabs */}
              <div className="flex items-center gap-space-xs overflow-x-auto pb-1 scrollbar-none">
                <button
                  onClick={() => setActiveTab('Semua')}
                  className={`px-space-md py-2 rounded-full font-label-md text-label-md shrink-0 transition-all ${activeTab === 'Semua' ? 'bg-primary-container/20 text-primary shadow-[0_0_12px_rgba(124,58,237,0.3)] font-semibold' : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'}`} type="button">
                  Semua Buku ({totalOwned})
                </button>
                <button
                  onClick={() => setActiveTab('Sedang Dibaca')}
                  className={`px-space-md py-2 rounded-full font-label-md text-label-md shrink-0 transition-all ${activeTab === 'Sedang Dibaca' ? 'bg-primary-container/20 text-primary shadow-[0_0_12px_rgba(124,58,237,0.3)] font-semibold' : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'}`} type="button">
                  Sedang Dibaca ({currentlyReading})
                </button>
                <button
                  onClick={() => setActiveTab('Belum Mulai')}
                  className={`px-space-md py-2 rounded-full font-label-md text-label-md shrink-0 transition-all ${activeTab === 'Belum Mulai' ? 'bg-primary-container/20 text-primary shadow-[0_0_12px_rgba(124,58,237,0.3)] font-semibold' : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'}`} type="button">
                  Belum Mulai ({notStarted})
                </button>
                <button
                  onClick={() => setActiveTab('Selesai')}
                  className={`px-space-md py-2 rounded-full font-label-md text-label-md shrink-0 transition-all ${activeTab === 'Selesai' ? 'bg-primary-container/20 text-primary shadow-[0_0_12px_rgba(124,58,237,0.3)] font-semibold' : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'}`} type="button">
                  Selesai Dibaca ({finishedReading})
                </button>
                <button
                  onClick={() => setActiveTab('Disematkan')}
                  className={`px-space-md py-2 rounded-full font-label-md text-label-md shrink-0 transition-all flex items-center gap-1.5 ${activeTab === 'Disematkan' ? 'bg-primary-container/20 text-primary shadow-[0_0_12px_rgba(124,58,237,0.3)] font-semibold' : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'}`} type="button">
                  <span className={`material-symbols-outlined text-[16px] ${activeTab === 'Disematkan' ? 'text-primary' : 'text-tertiary'}`}>star</span>
                  Disematkan ({pinned})
                </button>
              </div>
            </section>

            {/* Bookshelf Catalog Section */}
            <section>
              <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-space-lg" : "grid grid-cols-1 gap-space-md"}>
                {displayedBooks.map((ob) => (
                  <div key={ob.id} className={`bg-surface-container rounded-xl overflow-hidden shadow-md hover:shadow-[0_0_24px_rgba(124,58,237,0.2)] transition-all duration-300 flex ${viewMode === 'grid' ? 'flex-col group hover:-translate-y-1' : 'flex-row items-stretch'}`}>
                    <div className={`p-space-md flex ${viewMode === 'grid' ? 'gap-space-md' : 'gap-space-lg w-full'}`}>
                      <div className={`aspect-[3/4] shrink-0 rounded-lg overflow-hidden bg-surface-container-high relative shadow-md ${viewMode === 'grid' ? 'w-28' : 'w-24 sm:w-32'}`}>
                        <img className={`w-full h-full object-cover transition-transform duration-300 ${viewMode === 'grid' ? 'group-hover:scale-105' : 'hover:scale-105'}`} alt={ob.book.title} src={ob.book.coverImage} />
                        <div className="absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/50 to-transparent"></div>
                        <span className="absolute top-1.5 left-1.5 bg-surface-container-lowest/80 backdrop-blur-sm text-secondary font-label-sm text-caption px-1.5 py-0.5 rounded">{ob.book.format.split(' ')[0]}</span>
                      </div>
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex items-center justify-between gap-1">
                            {ob.status === 'Sedang Dibaca' && <span className="text-secondary bg-secondary-container/20 font-label-sm text-caption px-2 py-0.5 rounded-full font-semibold">Sedang Dibaca</span>}
                            {ob.status === 'Belum Mulai' && <span className="text-on-surface-variant bg-surface-container-highest font-label-sm text-caption px-2 py-0.5 rounded-full font-semibold">Belum Mulai</span>}
                            {ob.status === 'Selesai Dibaca' && <span className="text-tertiary bg-tertiary-container/30 font-label-sm text-caption px-2 py-0.5 rounded-full font-semibold flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">check</span> Selesai</span>}

                            <div className="flex gap-1">
                              <button onClick={() => togglePin(ob.id)} aria-label="Pin Buku" className={`p-1 rounded-md transition-colors ${ob.isPinned ? 'text-tertiary' : 'text-outline hover:text-on-surface'}`} type="button">
                                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: ob.isPinned ? "'FILL' 1" : "'FILL' 0" }}>star</span>
                              </button>
                            </div>
                          </div>
                          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-1 leading-snug line-clamp-2">{ob.book.title}</h3>
                          <p className="font-body-sm text-body-sm text-on-surface-variant truncate mt-0.5">{ob.book.author.split('•')[0].trim()}</p>
                        </div>

                        {viewMode === 'list' && (
                          <div className="hidden sm:flex flex-col gap-2 w-full mt-4 max-w-sm">
                            <div className="flex items-center justify-between text-caption font-caption">
                              <span className="text-on-surface-variant">Kemajuan</span>
                              <span className={ob.status === 'Selesai Dibaca' ? 'text-tertiary font-semibold' : ob.status === 'Belum Mulai' ? 'text-outline font-semibold' : 'text-primary font-semibold'}>{ob.progress}%</span>
                            </div>
                            <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${ob.status === 'Selesai Dibaca' ? 'bg-tertiary' : ob.status === 'Belum Mulai' ? 'bg-primary/20' : 'bg-gradient-to-r from-primary to-secondary'}`} style={{ width: `${ob.progress}%` }}></div>
                            </div>
                          </div>
                        )}
                      </div>

                      {viewMode === 'list' && (
                        <div className="hidden sm:flex flex-col justify-end gap-2 shrink-0 border-l border-surface-container-highest pl-space-md ml-space-md">
                          <button onClick={() => handleOpenPdf(ob.book.pdfUrl)} className={`px-space-lg py-2 rounded-lg font-label-sm text-label-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${ob.status === 'Belum Mulai' ? 'bg-surface-container-high hover:bg-surface-bright text-on-surface' : ob.status === 'Selesai Dibaca' ? 'bg-surface-container-high hover:bg-surface-bright text-on-surface' : 'bg-primary text-on-primary hover:shadow-[0_0_16px_rgba(124,58,237,0.3)]'}`} type="button">
                            {ob.status === 'Belum Mulai' && <><span className="material-symbols-outlined text-[16px]">menu_book</span> Mulai Membaca</>}
                            {ob.status === 'Sedang Dibaca' && <><span className="material-symbols-outlined text-[16px]">menu_book</span> Buka Buku</>}
                            {ob.status === 'Selesai Dibaca' && <><span className="material-symbols-outlined text-[16px]">replay</span> Baca Ulang</>}
                          </button>
                          <button onClick={() => handleDownloadPdf(ob.book.pdfUrl, ob.book.title)} className="px-space-lg py-2 rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1.5" type="button">
                            <span className="material-symbols-outlined text-[18px]">download</span> Unduh
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Progress & Action Footer (Grid View OR Mobile List View) */}
                    <div className={`bg-surface-container-low px-space-md py-space-sm flex flex-col gap-2 ${viewMode === 'grid' ? 'mt-auto' : 'sm:hidden w-full border-t border-surface-container-highest'}`}>
                      <div className="flex items-center justify-between text-caption font-caption">
                        <span className="text-on-surface-variant">
                          {ob.status === 'Selesai Dibaca' ? `Tamat dibaca ${formatDate(ob.lastReadAt || new Date())}` :
                            ob.status === 'Belum Mulai' ? 'Belum dibuka' : 'Kemajuan'}
                        </span>
                        <span className={ob.status === 'Selesai Dibaca' ? 'text-tertiary font-semibold' : ob.status === 'Belum Mulai' ? 'text-outline font-semibold' : 'text-primary font-semibold'}>{ob.progress}%</span>
                      </div>
                      <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${ob.status === 'Selesai Dibaca' ? 'bg-tertiary' : ob.status === 'Belum Mulai' ? 'bg-primary/20' : 'bg-gradient-to-r from-primary to-secondary'}`} style={{ width: `${ob.progress}%` }}></div>
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <button onClick={() => handleOpenPdf(ob.book.pdfUrl)} className={`flex-1 font-label-sm text-label-sm py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 ${ob.status === 'Belum Mulai' ? 'bg-surface-container-high hover:bg-surface-bright text-on-surface' : ob.status === 'Selesai Dibaca' ? 'bg-surface-container-high hover:bg-surface-bright text-on-surface' : 'bg-primary text-on-primary hover:shadow-[0_0_16px_rgba(124,58,237,0.3)]'}`} type="button">
                          {ob.status === 'Belum Mulai' && <><span className="material-symbols-outlined text-[16px]">menu_book</span> Mulai Membaca</>}
                          {ob.status === 'Sedang Dibaca' && <><span className="material-symbols-outlined text-[16px]">menu_book</span> Buka Buku</>}
                          {ob.status === 'Selesai Dibaca' && <><span className="material-symbols-outlined text-[16px]">replay</span> Baca Ulang</>}
                        </button>
                        <button onClick={() => ob.status === 'Selesai Dibaca' ? undefined : handleDownloadPdf(ob.book.pdfUrl, ob.book.title)} className={`p-2 rounded-lg bg-surface-container transition-colors ${ob.status === 'Selesai Dibaca' ? 'text-tertiary hover:bg-surface-container-high' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'}`} title={ob.status === 'Selesai Dibaca' ? "Beri Ulasan" : "Unduh Berkas"} type="button">
                          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: ob.status === 'Selesai Dibaca' ? "'FILL' 1" : "'FILL' 0" }}>{ob.status === 'Selesai Dibaca' ? 'rate_review' : 'download'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {displayedBooks.length === 0 && (
                  <div className="col-span-full py-space-xl flex flex-col items-center text-center gap-space-sm opacity-70">
                    <span className="material-symbols-outlined text-[48px] text-outline">search_off</span>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Tidak Ada Buku Ditemukan</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">Coba ubah kata kunci pencarian atau filter tab.</p>
                  </div>
                )}
              </div>
            </section>

            {/* Reading Habit Insight Banner */}
            <section className="bg-surface-container-low p-space-lg rounded-2xl flex flex-col md:flex-row items-center justify-between gap-space-md shadow-md mt-space-lg">
              <div className="flex items-center gap-space-md">
                <div className="w-12 h-12 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[28px]">insights</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Rutinitas Membaca Minggu Ini</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Anda telah menyelesaikan <span className="text-primary font-semibold">4 jam 20 menit</span> sesi membaca aktif dalam 7 hari terakhir.</p>
                </div>
              </div>
              <div className="flex items-center gap-space-sm shrink-0">
                {/* Mini Streak Visualizer */}
                <div className="flex items-center gap-1.5 bg-surface-container px-space-md py-2 rounded-xl">
                  <span className="w-2.5 h-6 rounded-full bg-primary" title="Sen"></span>
                  <span className="w-2.5 h-8 rounded-full bg-primary" title="Sel"></span>
                  <span className="w-2.5 h-10 rounded-full bg-primary" title="Rab"></span>
                  <span className="w-2.5 h-5 rounded-full bg-primary" title="Kam"></span>
                  <span className="w-2.5 h-9 rounded-full bg-primary" title="Jum"></span>
                  <span className="w-2.5 h-7 rounded-full bg-primary/40" title="Sab"></span>
                  <span className="w-2.5 h-4 rounded-full bg-surface-container-highest" title="Min"></span>
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold ml-2">5 Hari Streak!</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface-container-lowest shadow-[0_-1px_12px_rgba(0,0,0,0.5)] pt-space-xl pb-space-lg mt-space-xl">
        <div className="w-full px-margin">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-gutter mb-space-xl">
            <div className="lg:col-span-2 flex flex-col gap-space-md">
              <div className="flex items-center gap-space-sm">
                <img alt="LiteraDigital Logo" className="h-7 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1XnWVGviR6AVjrRVsi3PYYsusQ_T793BnXmqdS-sZP2YLsW-Yh-F7-9uJBcCX-E0m4rww6r0wisAnuwAqtj8TbaHbS2oKUcnKlwiVZRLrNJjW6t2luZWuCVSUaSxNzzhPu95rEzlXb_pMc5BZyhncCEhvDbEPGHh_kFuWJtGmUjTzZqegKwRWx6mH4pT9c4dSLFROD0XiVV1E6Nm4ltyhwh44mBxn4GMcz-ZgbCp-rxT026J1hHFuwnPt1M" />
                <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold">Litera<span className="text-primary">Digital</span></span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">Kurasi buku digital premium, teknis, dan literatur pilihan untuk pengalaman membaca modern tanpa distraksi.</p>
            </div>
            <div className="flex flex-col gap-space-sm">
              <span className="font-label-md text-label-md text-on-surface font-semibold tracking-wide">Katalog Ebook</span>
            </div>
            <div className="flex flex-col gap-space-sm">
              <span className="font-label-md text-label-md text-on-surface font-semibold tracking-wide">Dukungan &amp; Legal</span>
            </div>
          </div>
          <div className="pt-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-md border-t border-surface-container-high">
            <p className="font-body-sm text-body-sm text-outline">© 2026 LiteraDigital. Hak Cipta Dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
