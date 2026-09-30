import React from 'react';
import { Link } from 'react-router-dom';

export const CategoryGrid: React.FC = () => {
  return (
    <section className="w-full px-margin-mobile md:px-margin mb-space-xl">
      <div className="flex items-center justify-between mb-space-md">
        <div className="flex items-center gap-space-sm">
          <div className="p-2 rounded-lg bg-surface-container-high text-primary">
            <span className="material-symbols-outlined text-[24px]">category</span>
          </div>
          <div>
            <h2 className="font-headline-md text-headline-sm md:text-headline-md text-on-surface font-bold tracking-tight">Jelajahi Kategori Favorit</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Pilihan tema terlengkap untuk memperkaya wawasan Anda</p>
          </div>
        </div>
        <Link className="group inline-flex items-center gap-1 font-label-md text-label-md text-primary hover:text-on-primary-container transition-colors" to="/katalog">
          <span>Semua Kategori (12)</span>
          <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </Link>
      </div>
      {/* Category Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-gutter-mobile md:gap-gutter">
        {/* Cat 1 */}
        <Link className="group relative flex flex-col p-space-md rounded-xl bg-surface-container hover:bg-surface-container-high shadow-md hover:shadow-[0_0_24px_rgba(124,58,237,0.3)] transition-all duration-300" to="/katalog?kategori=Teknologi+%26+Coding">
          <div className="w-12 h-12 mb-space-md rounded-lg bg-surface-container-highest flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[28px]">code</span>
          </div>
          <h3 className="font-headline-sm text-body-md font-semibold text-on-surface group-hover:text-primary transition-colors">Teknologi & Coding</h3>
          <span className="font-body-sm text-caption text-on-surface-variant mt-1">142 Buku</span>
        </Link>
        {/* Cat 2 */}
        <Link className="group relative flex flex-col p-space-md rounded-xl bg-surface-container hover:bg-surface-container-high shadow-md hover:shadow-[0_0_24px_rgba(5,102,217,0.3)] transition-all duration-300" to="/katalog?kategori=Bisnis+%26+Keuangan">
          <div className="w-12 h-12 mb-space-md rounded-lg bg-surface-container-highest flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[28px]">query_stats</span>
          </div>
          <h3 className="font-headline-sm text-body-md font-semibold text-on-surface group-hover:text-secondary transition-colors">Bisnis & Finansial</h3>
          <span className="font-body-sm text-caption text-on-surface-variant mt-1">98 Buku</span>
        </Link>
        {/* Cat 3 */}
        <Link className="group relative flex flex-col p-space-md rounded-xl bg-surface-container hover:bg-surface-container-high shadow-md hover:shadow-[0_0_24px_rgba(255,183,132,0.3)] transition-all duration-300" to="/katalog?kategori=Self-Improvement">
          <div className="w-12 h-12 mb-space-md rounded-lg bg-surface-container-highest flex items-center justify-center text-tertiary group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[28px]">psychology</span>
          </div>
          <h3 className="font-headline-sm text-body-md font-semibold text-on-surface group-hover:text-tertiary transition-colors">Self-Help & Psikologi</h3>
          <span className="font-body-sm text-caption text-on-surface-variant mt-1">115 Buku</span>
        </Link>
        {/* Cat 4 */}
        <Link className="group relative flex flex-col p-space-md rounded-xl bg-surface-container hover:bg-surface-container-high shadow-md hover:shadow-[0_0_24px_rgba(124,58,237,0.3)] transition-all duration-300" to="/katalog?kategori=Fiksi+%26+Sastra">
          <div className="w-12 h-12 mb-space-md rounded-lg bg-surface-container-highest flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[28px]">auto_stories</span>
          </div>
          <h3 className="font-headline-sm text-body-md font-semibold text-on-surface group-hover:text-primary transition-colors">Fiksi & Fantasi</h3>
          <span className="font-body-sm text-caption text-on-surface-variant mt-1">86 Buku</span>
        </Link>
        {/* Cat 5 */}
        <Link className="group relative flex flex-col p-space-md rounded-xl bg-surface-container hover:bg-surface-container-high shadow-md hover:shadow-[0_0_24px_rgba(173,198,255,0.3)] transition-all duration-300" to="/katalog?kategori=Sains+%26+AI">
          <div className="w-12 h-12 mb-space-md rounded-lg bg-surface-container-highest flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[28px]">rocket_launch</span>
          </div>
          <h3 className="font-headline-sm text-body-md font-semibold text-on-surface group-hover:text-secondary transition-colors">Sains & Astronomi</h3>
          <span className="font-body-sm text-caption text-on-surface-variant mt-1">54 Buku</span>
        </Link>
        {/* Cat 6 */}
        <Link className="group relative flex flex-col p-space-md rounded-xl bg-surface-container hover:bg-surface-container-high shadow-md hover:shadow-[0_0_24px_rgba(210,187,255,0.3)] transition-all duration-300" to="/katalog?kategori=Desain+%26+UI%2FUX">
          <div className="w-12 h-12 mb-space-md rounded-lg bg-surface-container-highest flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[28px]">palette</span>
          </div>
          <h3 className="font-headline-sm text-body-md font-semibold text-on-surface group-hover:text-primary transition-colors">Seni & Desain UI/UX</h3>
          <span className="font-body-sm text-caption text-on-surface-variant mt-1">67 Buku</span>
        </Link>
      </div>
    </section>
  );
};
