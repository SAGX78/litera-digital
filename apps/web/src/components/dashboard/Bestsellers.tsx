import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { mockCatalog } from '../../data/mockCatalog';

export const Bestsellers: React.FC = () => {
  const { buyNow } = useCart();
  const navigate = useNavigate();

  const handleBuyNow = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    const book = mockCatalog.find(b => b.slug === slug);
    if (book) {
      buyNow(book);
    } else {
      // Fallback for mocked static items
      buyNow({
        id: `mock-${slug}`,
        slug,
        title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        author: 'Unknown Author',
        category: 'Bestseller',
        coverImage: 'https://placehold.co/400x600/e2e8f0/64748b?text=Book',
        price: 50000,
        originalPrice: 75000,
        rating: 4.8,
        reviewsCount: 100,
        format: 'EPUB + PDF',
        edition: 'Edisi Standar',
        fileSize: '10 MB',
        language: 'Bahasa Indonesia',
        license: 'Lisensi Personal',
        discountLabel: '',
        isNewArrival: false,
        isRecommendation: true
      });
    }
    navigate('/keranjang');
  };

  return (
    <section className="w-full px-margin-mobile md:px-margin">
      <div className="flex items-center justify-between mb-space-md">
        <div className="flex items-center gap-space-sm">
          <div className="p-2 rounded-lg bg-surface-container-high text-tertiary">
            <span className="material-symbols-outlined text-[24px]">workspace_premium</span>
          </div>
          <div>
            <h2 className="font-headline-md text-headline-sm md:text-headline-md text-on-surface font-bold tracking-tight">Paling Banyak Dibeli</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Koleksi buku terfavorit yang paling diminati komunitas pembaca</p>
          </div>
        </div>
        <a className="group inline-flex items-center gap-1 font-label-md text-label-md text-primary hover:text-on-primary-container transition-colors" href="#">
          <span>Lihat Semua Top 100</span>
          <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </a>
      </div>
      {/* 4 Bestsellers Grid with Rank Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {/* Rank #1 */}
        <Link to="/book/atomic-habits" className="flex flex-col bg-surface-container rounded-xl overflow-hidden shadow-lg hover:shadow-[0_0_28px_rgba(124,58,237,0.3)] hover:-translate-y-1.5 transition-all duration-300 group">
          <div className="relative w-full aspect-[3/4] bg-surface-container-highest overflow-hidden">
            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1TeLpT33V9C9DkK7pZeG_ZV5ssJS7a7JjRQHGFigISnsLpUA5jJI4VZJ2_IV3cCC9O7AgRB0PbqbYWs1fmTm1iG6RBgCSMI_MRPhPReY02r2_XCwFOV1JGbC1CLMjBhUlqTcvh6oPWxCSfN-qIUc_X6jb48JV5ssyLmE4jFwa01PwSh9P_mTZt6_R6a7RShu5jL85JhSJx00VEpVJGIWMNsX-dvcvgEwwrP6QDVffGheCQxSd8au62g" alt="Atomic Habits" />
            {/* Rank Badge */}
            <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-gradient-to-tr from-tertiary-container to-tertiary text-on-tertiary flex items-center justify-center font-display-hero text-headline-sm font-black shadow-[0_0_15px_rgba(255,183,132,0.6)]">
              #1
            </div>
            <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-surface-container-lowest/80 backdrop-blur-md text-[10px] font-semibold text-primary uppercase">EPUB + PDF</span>
          </div>
          <div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
            <div>
              <span className="text-caption font-label-sm text-tertiary uppercase font-semibold">Pengembangan Diri</span>
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1 mt-0.5">Atomic Habits: Perubahan Kecil</h3>
              <p className="font-body-sm text-caption text-on-surface-variant mt-0.5">James Clear • Terjemahan Resmi</p>
            </div>
            <div className="pt-space-xs">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1 text-[13px] text-tertiary">
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="font-bold text-on-surface font-body-sm">4.95</span>
                  <span className="text-outline text-caption">(1.420)</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-outline line-through block">Rp 98.000</span>
                  <span className="font-price-md text-price-md text-primary font-bold">Rp 68.000</span>
                </div>
              </div>
              <button className="w-full flex items-center justify-center gap-space-xs py-2 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md font-semibold hover:shadow-[0_0_18px_rgba(124,58,237,0.5)] transition-all" onClick={(e) => handleBuyNow(e, 'atomic-habits')} type="button">
                <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                <span>Beli Sekarang</span>
              </button>
            </div>
          </div>
        </Link>
        {/* Rank #2 */}
        <Link to="/book/psychology-of-money" className="flex flex-col bg-surface-container rounded-xl overflow-hidden shadow-lg hover:shadow-[0_0_28px_rgba(5,102,217,0.3)] hover:-translate-y-1.5 transition-all duration-300 group">
          <div className="relative w-full aspect-[3/4] bg-surface-container-highest overflow-hidden">
            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYG3Nb9ZrUjZEqk_UhYzVpH9AbDUbml1oNdkZ2SCD7yzmGKJUpklclgD7qzmVgk50N-05th98dBU_aE_UzD0H-XV2TCpHubJ1tWNl7XasGZ-LyDmiL9w8gzInT7hDhBHZaFII8PS0xKgmiypviUlrs8hz6P5mnlsohVsWN8OQREApqsd6qDDUW42PcbTKSpAESydVZfS5CrSAezsJNIr8hlmx6kYQfVPQ_Z8UMbgIzd0HIGf7Gjdw0Pw" alt="The Psychology of Money" />
            {/* Rank Badge */}
            <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-gradient-to-tr from-secondary-container to-secondary text-on-secondary flex items-center justify-center font-display-hero text-headline-sm font-black shadow-[0_0_15px_rgba(173,198,255,0.6)]">
              #2
            </div>
            <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-surface-container-lowest/80 backdrop-blur-md text-[10px] font-semibold text-primary uppercase">EPUB + PDF</span>
          </div>
          <div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
            <div>
              <span className="text-caption font-label-sm text-secondary uppercase font-semibold">Keuangan & Investasi</span>
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface group-hover:text-secondary transition-colors line-clamp-1 mt-0.5">The Psychology of Money</h3>
              <p className="font-body-sm text-caption text-on-surface-variant mt-0.5">Morgan Housel</p>
            </div>
            <div className="pt-space-xs">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1 text-[13px] text-tertiary">
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="font-bold text-on-surface font-body-sm">4.91</span>
                  <span className="text-outline text-caption">(980)</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-outline line-through block">Rp 85.000</span>
                  <span className="font-price-md text-price-md text-secondary font-bold">Rp 59.000</span>
                </div>
              </div>
              <button className="w-full flex items-center justify-center gap-space-xs py-2 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md font-semibold transition-all" onClick={(e) => handleBuyNow(e, 'psychology-of-money')} type="button">
                <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                <span>Beli Sekarang</span>
              </button>
            </div>
          </div>
        </Link>
        {/* Rank #3 */}
        <Link to="/book/clean-architecture" className="flex flex-col bg-surface-container rounded-xl overflow-hidden shadow-lg hover:shadow-[0_0_28px_rgba(124,58,237,0.3)] hover:-translate-y-1.5 transition-all duration-300 group">
          <div className="relative w-full aspect-[3/4] bg-surface-container-highest overflow-hidden">
            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCwK-WS6ThW7bMJUySMJj1fGVKf2ztM2lRFUuJM_L2racXfjuKs7RSAu-EZInkVadLYnaUS43ouwNJfeLQnT30NmpRTiY3d3_q10B3tbI-b3WrAY_Qcfa95xfe3nSaK8olLjiLJuA2n8YBF5HjHTwjqFjvXuUmiD-zrQx5JCuvdJvfg9ctX1h094wmOyuRGTeQJzEd_SwGfOp6bNgklBrDbc2bWC5iA9_8TtKCcP6RI-WZMJnC8qpe9A" alt="Clean Code" />
            {/* Rank Badge */}
            <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-surface-container-highest text-on-surface flex items-center justify-center font-display-hero text-headline-sm font-black shadow-md">
              #3
            </div>
            <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-surface-container-lowest/80 backdrop-blur-md text-[10px] font-semibold text-primary uppercase">EPUB + PDF</span>
          </div>
          <div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
            <div>
              <span className="text-caption font-label-sm text-secondary uppercase font-semibold">Rekayasa Perangkat Lunak</span>
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1 mt-0.5">Clean Architecture & Code</h3>
              <p className="font-body-sm text-caption text-on-surface-variant mt-0.5">Robert C. Martin</p>
            </div>
            <div className="pt-space-xs">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1 text-[13px] text-tertiary">
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="font-bold text-on-surface font-body-sm">4.88</span>
                  <span className="text-outline text-caption">(820)</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-outline line-through block">Rp 120.000</span>
                  <span className="font-price-md text-price-md text-primary font-bold">Rp 89.000</span>
                </div>
              </div>
              <button className="w-full flex items-center justify-center gap-space-xs py-2 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md font-semibold transition-all" onClick={(e) => handleBuyNow(e, 'clean-architecture')} type="button">
                <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                <span>Beli Sekarang</span>
              </button>
            </div>
          </div>
        </Link>
        {/* Rank #4 */}
        <Link to="/book/bumi-manusia" className="flex flex-col bg-surface-container rounded-xl overflow-hidden shadow-lg hover:shadow-[0_0_28px_rgba(124,58,237,0.3)] hover:-translate-y-1.5 transition-all duration-300 group">
          <div className="relative w-full aspect-[3/4] bg-surface-container-highest overflow-hidden">
            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyEfDtgnmudfJ8UdkmXWFDyxnaRPbENVFVXs8gdNInTe1OsxMOdWGZqe2WYUaOqTghLFbRDest50CvTHRJ_AoQfci9gOmg_hAVBJ1Sciq3VyIYzIuZp2o7QfGVqOxwFnB74PcebvnU-aH2YVUb9QfNklbqh39ipHbz8nrlyqekoDwt6P6YXK6h6ilM-tm-yxNL1FhcGLKYjCKjQp4-zyHDxh_zEHylTTXnthiO0WAaBHROGCwWaqUHcw" alt="Bumi Manusia" />
            {/* Rank Badge */}
            <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-surface-container-highest text-outline flex items-center justify-center font-display-hero text-headline-sm font-black shadow-md">
              #4
            </div>
            <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-surface-container-lowest/80 backdrop-blur-md text-[10px] font-semibold text-primary uppercase">EPUB + PDF</span>
          </div>
          <div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
            <div>
              <span className="text-caption font-label-sm text-primary uppercase font-semibold">Sastra Indonesia</span>
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1 mt-0.5">Bumi Manusia (Edisi Digital)</h3>
              <p className="font-body-sm text-caption text-on-surface-variant mt-0.5">Pramoedya Ananta Toer</p>
            </div>
            <div className="pt-space-xs">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1 text-[13px] text-tertiary">
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="font-bold text-on-surface font-body-sm">4.98</span>
                  <span className="text-outline text-caption">(2.310)</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-outline line-through block">Rp 75.000</span>
                  <span className="font-price-md text-price-md text-primary font-bold">Rp 52.000</span>
                </div>
              </div>
              <button className="w-full flex items-center justify-center gap-space-xs py-2 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md font-semibold transition-all" onClick={(e) => handleBuyNow(e, 'bumi-manusia')} type="button">
                <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                <span>Beli Sekarang</span>
              </button>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};
