import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Header } from '../components/dashboard/Header';
import { Footer } from '../components/dashboard/Footer';
import { useCart } from '../context/CartContext';
import { mockCatalog, type Book } from '../data/mockCatalog';
import { ToastNotification, type ToastState } from '../components/book/ToastNotification';

export const CatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { buyNow } = useCart();
  const [toast, setToast] = useState<ToastState>({ isVisible: false, message: '', icon: '' });
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  
  const activeCategory = searchParams.get('kategori') || 'Semua Kategori';

  const showToast = (message: string, icon: string) => {
    setToast({ isVisible: true, message, icon });
  };
  const hideToast = () => setToast((prev) => ({ ...prev, isVisible: false }));

  const handleBuyNow = (e: React.MouseEvent, book: Book) => {
    e.preventDefault();
    buyNow(book);
    // navigation to /keranjang handled by BuyNow if needed, but normally useCart should handle or we navigate here.
    // We can't navigate here without useNavigate, let's just add it to cart and let user click header cart.
    // Wait, buyNow typically expects the app to navigate to /keranjang.
  };

  const handleToggleWishlist = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setWishlist(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast('Dihapus dari Daftar Keinginan', 'heart_broken');
      } else {
        next.add(id);
        showToast('Disimpan ke Daftar Keinginan', 'favorite');
      }
      return next;
    });
  };

  const categories = [
    { name: 'Semua Kategori', icon: 'grid_view' },
    { name: 'Teknologi & Coding', icon: 'code' },
    { name: 'Bisnis & Keuangan', icon: 'trending_up' },
    { name: 'Self-Improvement', icon: 'psychology' },
    { name: 'Sains & AI', icon: 'smart_toy' },
    { name: 'Fiksi & Sastra', icon: 'menu_book' },
    { name: 'Desain & UI/UX', icon: 'palette' }
  ];

  const handleCategoryClick = (cat: string) => {
    if (cat === 'Semua Kategori') {
      searchParams.delete('kategori');
    } else {
      searchParams.set('kategori', cat);
    }
    setSearchParams(searchParams);
  };

  // Filter books
  const filteredBooks = useMemo(() => {
    return mockCatalog.filter(book => {
      if (activeCategory !== 'Semua Kategori' && book.category !== activeCategory) {
        return false;
      }
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!book.title.toLowerCase().includes(query) && 
            !book.author.toLowerCase().includes(query) && 
            !(book.subCategory?.toLowerCase() || '').includes(query)) {
          return false;
        }
      }
      return true;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="bg-surface-container-lowest text-on-surface font-body-md text-body-md antialiased min-h-screen selection:bg-primary-container selection:text-on-primary-container">
      <Header />
      
      <main className="w-full bg-surface-container-lowest min-h-screen">
        <div className="flex flex-col w-full">
          {/* Top Ambient Glow Field */}
          <div className="w-full relative px-margin py-space-xl overflow-hidden bg-gradient-to-b from-surface-container/60 via-surface-container-low/40 to-transparent">
            <div className="absolute -top-24 -left-20 w-96 h-96 rounded-full bg-primary-container/15 blur-3xl pointer-events-none"></div>
            <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-secondary-container/15 blur-3xl pointer-events-none"></div>
            <div className="max-w-7xl mx-auto flex flex-col gap-space-lg relative z-10">
              {/* Breadcrumbs */}
              <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
                <Link className="hover:text-primary transition-colors flex items-center gap-1" to="/dashboard">
                  <span className="material-symbols-outlined text-[16px]">home</span> Beranda
                </Link>
                <span className="text-outline">/</span>
                <span className="hover:text-primary transition-colors cursor-pointer" onClick={() => handleCategoryClick('Semua Kategori')}>Katalog Ebook</span>
                {activeCategory !== 'Semua Kategori' && (
                  <>
                    <span className="text-outline">/</span>
                    <span className="text-primary font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">terminal</span> {activeCategory}
                    </span>
                  </>
                )}
              </nav>

              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container-high text-secondary font-label-sm text-label-sm mb-space-sm">
                    <span className="material-symbols-outlined text-[14px]">auto_stories</span>
                    <span>Kurasi Buku DRM-Free & Bebas Distraksi</span>
                  </div>
                  <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
                    Katalog & Eksplorasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-fixed-dim to-secondary">Buku Digital</span>
                  </h1>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
                    Temukan ribuan ebook pilihan dari pemrograman, arsitektur cloud, sains data, hingga rekayasa produk digital dengan dukungan format EPUB reflowable dan PDF high-resolution.
                  </p>
                </div>
                {/* Metrics */}
                <div className="flex items-center gap-space-md p-space-md rounded-xl bg-surface-container-high/60 backdrop-blur-sm self-start lg:self-auto">
                  <div className="flex flex-col">
                    <span className="font-caption text-caption text-outline uppercase tracking-wider">Total Koleksi</span>
                    <span className="font-headline-sm text-headline-sm font-bold text-on-surface">1.420+</span>
                  </div>
                  <div className="w-px h-8 bg-surface-variant"></div>
                  <div className="flex flex-col">
                    <span className="font-caption text-caption text-outline uppercase tracking-wider">Rilisan Baru</span>
                    <span className="font-headline-sm text-headline-sm font-bold text-primary">24 Judul</span>
                  </div>
                  <div className="w-px h-8 bg-surface-variant"></div>
                  <div className="flex items-center text-secondary gap-1">
                    <span className="material-symbols-outlined text-[20px]">verified</span>
                    <span className="font-label-sm text-label-sm font-semibold">100% Original</span>
                  </div>
                </div>
              </div>

              {/* Quick Category Carousel */}
              <div className="w-full pt-space-xs">
                <div className="flex items-center gap-space-sm overflow-x-auto no-scrollbar pb-2 pt-1">
                  {categories.map(cat => {
                    const isActive = activeCategory === cat.name;
                    return (
                      <button 
                        key={cat.name}
                        onClick={() => handleCategoryClick(cat.name)}
                        className={`group flex items-center gap-space-xs px-space-md py-2 rounded-full font-label-md text-label-md transition-all shrink-0 ${
                          isActive 
                            ? 'bg-primary-container text-on-primary shadow-[0_0_20px_rgba(124,58,237,0.4)]'
                            : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                        }`}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">{cat.icon}</span>
                        <span>{cat.name}</span>
                        {isActive && cat.name === 'Teknologi & Coding' && (
                          <span className="px-2 py-0.5 rounded-full text-caption bg-surface-container-lowest/30 text-on-primary font-bold">342</span>
                        )}
                        {!isActive && cat.name === 'Semua Kategori' && (
                          <span className="px-2 py-0.5 rounded-full text-caption bg-surface-container-highest text-outline font-normal group-hover:text-on-surface">1.420</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full px-margin pb-space-xl max-w-7xl mx-auto flex flex-col gap-space-lg">
            {/* Filter Bar */}
            <div className="w-full p-space-md rounded-xl bg-surface-container-low shadow-md flex flex-col gap-space-md">
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-space-md">
                <div className="relative flex-1">
                  <span className="material-symbols-outlined absolute left-space-md top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
                  <input 
                    className="w-full bg-surface-container pl-10 pr-10 py-2.5 rounded-lg text-on-surface font-body-sm text-body-sm placeholder:text-outline focus:outline-none focus:bg-surface-container-high transition-colors" 
                    placeholder="Cari judul, nama penulis, topik (misal: React, Cloud, Postgres)..." 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-space-sm top-1/2 -translate-y-1/2 p-1 text-outline hover:text-on-surface" 
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  )}
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-space-md shrink-0">
                  <span className="font-body-sm text-body-sm text-on-surface-variant hidden sm:inline-block">
                    Menampilkan <strong className="text-on-surface font-semibold">{filteredBooks.length}</strong> dari {activeCategory === 'Semua Kategori' ? mockCatalog.length : filteredBooks.length} Ebook
                  </span>
                  <div className="relative flex items-center">
                    <select className="appearance-none bg-surface-container pl-space-md pr-9 py-2.5 rounded-lg text-on-surface font-label-md text-label-md cursor-pointer focus:outline-none hover:bg-surface-container-high transition-colors">
                      <option defaultValue="Terpopuler">Urutkan: Terpopuler & Terlaris</option>
                      <option>Rilisan Terbaru</option>
                      <option>Rating Tertinggi (4.8+)</option>
                      <option>Harga: Terendah ke Tertinggi</option>
                      <option>Harga: Tertinggi ke Terendah</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-space-sm text-outline pointer-events-none text-[18px]">expand_more</span>
                  </div>
                  <div className="flex items-center p-1 bg-surface-container rounded-lg">
                    <button aria-label="Tampilan Grid" className="p-1.5 rounded bg-surface-container-high text-primary shadow-sm" type="button">
                      <span className="material-symbols-outlined text-[18px]">grid_view</span>
                    </button>
                    <button aria-label="Tampilan List" className="p-1.5 rounded text-outline hover:text-on-surface transition-colors" type="button">
                      <span className="material-symbols-outlined text-[18px]">view_list</span>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Applied Filter Chips */}
              <div className="flex flex-wrap items-center gap-space-xs pt-space-xs">
                <span className="font-caption text-caption text-outline uppercase tracking-wider mr-1">Filter Aktif:</span>
                {activeCategory !== 'Semua Kategori' && (
                  <span className="inline-flex items-center gap-1.5 pl-space-sm pr-1 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm">
                    <span>Kategori: {activeCategory}</span>
                    <button onClick={() => handleCategoryClick('Semua Kategori')} className="hover:bg-surface-container-highest rounded-full p-0.5 text-outline hover:text-on-surface flex items-center" type="button">
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </span>
                )}
                {activeCategory === 'Semua Kategori' && (
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Belum ada filter khusus yang diterapkan.</span>
                )}
                {activeCategory !== 'Semua Kategori' && (
                  <button onClick={() => handleCategoryClick('Semua Kategori')} className="ml-2 text-primary hover:text-primary-fixed-dim font-label-sm text-label-sm underline transition-colors" type="button">
                    Reset Semua Filter
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
              {/* Left Sidebar Filter */}
              <aside className="lg:col-span-3 flex flex-col gap-space-md lg:sticky lg:top-24">
                <div className="w-full bg-surface-container-low rounded-xl p-space-md shadow-md flex flex-col gap-space-lg">
                  <div className="flex items-center justify-between pb-space-sm bg-surface-container/30 -mx-space-md -mt-space-md p-space-md rounded-t-xl">
                    <div className="flex items-center gap-space-xs text-on-surface">
                      <span className="material-symbols-outlined text-primary text-[20px]">tune</span>
                      <span className="font-headline-sm text-headline-sm font-bold">Filter Katalog</span>
                    </div>
                    <button className="font-label-sm text-label-sm text-outline hover:text-primary transition-colors" type="button">
                      Reset
                    </button>
                  </div>

                  <div className="flex flex-col gap-space-sm">
                    <div className="flex items-center justify-between text-on-surface">
                      <span className="font-label-md text-label-md font-bold tracking-wide">Topik / Sub-Kategori</span>
                      <span className="material-symbols-outlined text-outline text-[18px]">expand_less</span>
                    </div>
                    <div className="flex flex-col gap-space-xs mt-1">
                      {['Web & Frontend Dev', 'Backend & Cloud Arch', 'AI & Machine Learning', 'DevOps & Kubernetes', 'Kewirausahaan', 'Novel Filsafat'].map(sub => (
                        <label key={sub} className="flex items-center justify-between p-1.5 rounded-lg hover:bg-surface-container cursor-pointer transition-colors">
                          <div className="flex items-center gap-space-sm">
                            <input className="w-4 h-4 rounded bg-surface-container-high accent-primary-container cursor-pointer" type="checkbox" />
                            <span className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface">{sub}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-space-sm pt-space-xs">
                    <span className="font-label-md text-label-md font-bold text-on-surface">Format File Digital</span>
                    <div className="flex flex-col gap-space-xs">
                      <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-surface-container cursor-pointer transition-colors">
                        <div className="flex items-center gap-space-sm">
                          <input className="w-4 h-4 rounded bg-surface-container-high accent-primary-container cursor-pointer" type="checkbox" />
                          <div className="flex flex-col">
                            <span className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface font-medium">EPUB Reflowable</span>
                          </div>
                        </div>
                      </label>
                      <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-surface-container cursor-pointer transition-colors">
                        <div className="flex items-center gap-space-sm">
                          <input className="w-4 h-4 rounded bg-surface-container-high accent-primary-container cursor-pointer" type="checkbox" />
                          <div className="flex flex-col">
                            <span className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface font-medium">PDF High-Resolution</span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col gap-space-sm pt-space-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-label-md font-bold text-on-surface">Rentang Harga (IDR)</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <button className="text-caption font-caption px-2 py-1 rounded bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors" type="button">&lt; Rp 50.000</button>
                      <button className="text-caption font-caption px-2 py-1 rounded bg-surface-container-high text-primary font-semibold" type="button">Rp 50rb - 100rb</button>
                      <button className="text-caption font-caption px-2 py-1 rounded bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors" type="button">Diskon &gt; 30%</button>
                    </div>
                  </div>
                </div>
              </aside>

              {/* Grid Content */}
              <section className="lg:col-span-9 flex flex-col gap-space-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
                  {filteredBooks.map((book) => (
                    <Link key={book.id} to={`/book/${book.slug}`} className="group relative flex flex-col rounded-xl bg-surface-container-low hover:bg-surface-container transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(124,58,237,0.2)] overflow-hidden">
                      <div className="relative w-full aspect-[3/4] p-space-md flex items-center justify-center bg-gradient-to-tr from-surface-container-lowest via-surface-container-low to-surface-container-high/40 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent opacity-80 z-10"></div>
                        
                        <div className="absolute top-space-sm left-space-sm z-20 flex flex-col gap-1">
                          {book.badgeLabel && (
                            <span className="px-2 py-0.5 rounded-full font-label-sm text-caption font-bold bg-primary-container text-on-primary-container shadow-[0_0_12px_rgba(124,58,237,0.6)]">
                              {book.badgeLabel}
                            </span>
                          )}
                          {book.discountLabel && (
                            <span className="px-2 py-0.5 rounded-full font-label-sm text-caption font-semibold bg-surface-container-lowest/80 text-secondary backdrop-blur-sm">
                              {book.discountLabel} OFF
                            </span>
                          )}
                        </div>
                        <div className="absolute top-space-sm right-space-sm z-20">
                          <span className="px-2 py-0.5 rounded-full font-label-sm text-caption bg-surface-container-high/90 text-on-surface backdrop-blur-sm">
                            {book.format}
                          </span>
                        </div>

                        <div className="relative w-44 h-60 rounded-md shadow-2xl overflow-hidden group-hover:scale-105 transition-transform duration-300">
                          <img alt={book.title} className="w-full h-full object-cover" src={book.coverImage} />
                          <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/40 via-white/10 to-transparent"></div>
                        </div>

                        <div className="absolute inset-0 bg-surface-container-lowest/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30 flex items-center justify-center p-space-md">
                          <div className="flex flex-col gap-space-sm w-full max-w-[200px]">
                            <button 
                              onClick={(e) => { e.preventDefault(); handleBuyNow(e, book); window.location.href = '/keranjang'; }}
                              className="w-full py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-1 shadow-[0_0_16px_rgba(124,58,237,0.5)] hover:scale-102 transition-transform" 
                              type="button"
                            >
                              <span className="material-symbols-outlined text-[18px]">shopping_cart</span> Beli Sekarang
                            </button>
                            <button 
                              onClick={(e) => { e.preventDefault(); /* Usually opens a modal, but we link to book details */ window.location.href = `/book/${book.slug}`; }}
                              className="w-full py-2 rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center justify-center gap-1 hover:bg-surface-variant transition-colors" 
                              type="button"
                            >
                              <span className="material-symbols-outlined text-[18px]">visibility</span> Baca Sampel
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
                        <div className="flex flex-col gap-1">
                          <span className="font-caption text-caption text-secondary font-semibold uppercase tracking-wider">{book.categoryLabel || book.category}</span>
                          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold line-clamp-2 group-hover:text-primary transition-colors">
                            {book.title}
                          </h3>
                          <span className="font-body-sm text-body-sm text-outline">{book.author}</span>
                        </div>
                        <div className="flex items-center gap-space-sm mt-1">
                          <div className="flex items-center text-tertiary">
                            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            <span className="font-label-sm text-label-sm font-bold text-on-surface ml-1">{book.rating}</span>
                          </div>
                          <span className="font-caption text-caption text-outline">({book.reviewsCount} ulasan)</span>
                          <span className="text-outline">•</span>
                          <span className="font-caption text-caption text-on-surface-variant">{book.pages || 300} Halaman</span>
                        </div>
                        <div className="pt-space-xs flex items-center justify-between border-t-0">
                          <div className="flex flex-col">
                            {book.originalPrice > book.price && (
                              <span className="font-caption text-caption text-outline line-through">Rp {book.originalPrice.toLocaleString('id-ID')}</span>
                            )}
                            <span className="font-price-lg text-price-lg font-bold text-primary">Rp {book.price.toLocaleString('id-ID')}</span>
                          </div>
                          <button 
                            onClick={(e) => handleToggleWishlist(e, book.id)}
                            aria-label="Simpan ke Wishlist" 
                            className={`p-2 rounded-lg transition-colors ${wishlist.has(book.id) ? 'bg-surface-container-high text-primary' : 'bg-surface-container hover:text-primary text-outline hover:bg-surface-container-high'}`}
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: wishlist.has(book.id) ? "'FILL' 1" : "'FILL' 0" }}>bookmark_border</span>
                          </button>
                        </div>
                      </div>
                    </Link>
                  ))}
                  {filteredBooks.length === 0 && (
                    <div className="col-span-full py-16 text-center text-on-surface-variant">
                      <span className="material-symbols-outlined text-[48px] mb-4 opacity-50">search_off</span>
                      <p className="font-headline-sm">Tidak ada buku yang cocok dengan filter Anda.</p>
                      <button onClick={() => { setSearchQuery(''); handleCategoryClick('Semua Kategori'); }} className="mt-4 px-4 py-2 bg-surface-container-high rounded-lg hover:text-primary transition-colors">Reset Filter</button>
                    </div>
                  )}
                </div>

                {filteredBooks.length > 0 && (
                  <div className="w-full p-space-md rounded-xl bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-md mt-space-md shadow-sm">
                    <div className="flex items-center gap-space-sm text-outline font-body-sm text-body-sm">
                      <span>Halaman <strong className="text-on-surface">1</strong> dari 1</span>
                      <span>•</span>
                      <span>{filteredBooks.length} Total Ebook</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button aria-label="Halaman Sebelumnya" className="p-2 rounded-lg bg-surface-container text-outline opacity-40 cursor-not-allowed" disabled type="button">
                        <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                      </button>
                      <button className="w-9 h-9 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-bold shadow-[0_0_12px_rgba(124,58,237,0.4)]" type="button">1</button>
                      <button aria-label="Halaman Selanjutnya" className="p-2 rounded-lg bg-surface-container text-on-surface opacity-40 cursor-not-allowed" disabled type="button">
                        <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Banner */}
                <div className="w-full rounded-xl bg-gradient-to-r from-surface-container-high via-surface-container to-surface-container-low p-space-lg relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-space-lg shadow-md mt-4">
                  <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-primary-container/20 blur-2xl pointer-events-none"></div>
                  <div className="flex items-start gap-space-md z-10 max-w-xl">
                    <div className="p-3 rounded-xl bg-surface-container-lowest text-primary shrink-0 shadow-inner">
                      <span className="material-symbols-outlined text-[28px]">lightbulb</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                        Tidak menemukan judul atau topik yang Anda butuhkan?
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Tim kurator LiteraDigital membuka permintaan kurasi buku digital berlisensi baru setiap bulan. Ajukan kebutuhan bacaan tim teknis atau personal Anda.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-sm shrink-0 z-10 w-full md:w-auto">
                    <button className="w-full md:w-auto px-space-lg py-2.5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all" type="button">
                      Ajukan Judul Buku
                    </button>
                  </div>
                </div>

              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ToastNotification toast={toast} onHide={hideToast} />
    </div>
  );
};
