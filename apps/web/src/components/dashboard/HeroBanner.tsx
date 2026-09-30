import React from 'react';

export const HeroBanner: React.FC = () => {
  return (
    <section className="w-full px-margin-mobile md:px-margin pt-space-md mb-space-xl">
      <div className="relative w-full rounded-2xl bg-gradient-to-r from-surface-container-high via-surface-container to-surface-container-lowest p-space-lg md:p-space-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        {/* Ambient Lighting Blobs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-container/25 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary-container/20 rounded-full blur-[90px] pointer-events-none"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start gap-space-md">
            <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-highest/80 backdrop-blur-md shadow-sm">
              <span className="text-tertiary text-caption font-bold tracking-wider">✨ BUKU TERBAIK PILIHAN EDITORIAL BULAN INI</span>
            </div>
            <h1 className="font-display-hero text-headline-lg-mobile md:text-display-hero text-on-surface font-extrabold tracking-tight">
              Melampaui Jarak dan Waktu, Bebaskan Jalanmu Meraih Pengetahuan <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Buku Digital</span> Pilihan
            </h1>
            <p className="font-body-lg text-body-md md:text-body-lg text-on-surface-variant max-w-xl">
              Runtuhkan setiap batasan dalam menuntut ilmu. Dapatkan akses instan ke karya-karya terbaik yang siap menemani langkah bertumbuhmu.
            </p>
            <div className="flex flex-wrap items-center gap-space-md pt-space-xs w-full sm:w-auto">
              <button className="flex items-center justify-center gap-space-xs px-space-lg py-3 rounded-lg bg-gradient-to-r from-primary-container to-secondary-container text-on-primary-container font-label-md text-label-md font-semibold shadow-[0_0_24px_rgba(124,58,237,0.45)] hover:shadow-[0_0_36px_rgba(124,58,237,0.7)] hover:scale-[1.02] active:scale-[0.99] transition-all" type="button">
                <span className="material-symbols-outlined text-[20px]">search</span>
                <span>Mulai Jelajahi</span>
              </button>
              <button className="flex items-center justify-center gap-space-xs px-space-lg py-3 rounded-lg bg-surface-container-highest/60 hover:bg-surface-container-highest text-on-surface font-label-md text-label-md font-semibold backdrop-blur-md transition-all hover:text-primary" type="button">
                <span className="material-symbols-outlined text-[20px]">auto_stories</span>
                <span>Lihat Koleksi Terbaru</span>
              </button>
            </div>
            {/* Carousel Indicators */}
            <div className="flex items-center gap-space-xs pt-space-sm">
              <span className="w-8 h-2 rounded-full bg-primary shadow-[0_0_12px_rgba(210,187,255,0.8)] transition-all"></span>
              <span className="w-2 h-2 rounded-full bg-surface-container-highest hover:bg-outline transition-all cursor-pointer"></span>
              <span className="w-2 h-2 rounded-full bg-surface-container-highest hover:bg-outline transition-all cursor-pointer"></span>
            </div>
          </div>
          {/* 3D Overlapping Book Covers */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[340px] md:min-h-[400px]">
            {/* Glow Behind Covers */}
            <div className="absolute w-56 h-56 bg-primary-container/30 rounded-full blur-[70px]"></div>
            {/* Book 1 (Left Back) */}
            <div className="absolute left-4 md:left-8 transform -rotate-12 -translate-y-4 hover:translate-y-[-24px] hover:rotate-[-8deg] transition-all duration-300 z-10 w-40 md:w-48 aspect-[3/4] rounded-lg shadow-2xl overflow-hidden bg-surface-container-low group cursor-pointer">
              <img className="w-full h-full object-cover" src="https://mabhak.sch.id/wp-content/uploads/2026/06/BU-ANDESNIA.jpg" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-white/30 to-black/30 pointer-events-none"></div>
            </div>
            {/* Book 2 (Right Back) */}
            <div className="absolute right-4 md:right-8 transform rotate-12 translate-y-4 hover:translate-y-0 hover:rotate-[8deg] transition-all duration-300 z-20 w-40 md:w-48 aspect-[3/4] rounded-lg shadow-2xl overflow-hidden bg-surface-container-low group cursor-pointer">
              <img className="w-full h-full object-cover" src="https://down-id.img.susercontent.com/file/id-11134207-7rbk6-m88y9wkylukrec" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-white/30 to-black/30 pointer-events-none"></div>
            </div>
            {/* Book 3 (Center Front) */}
            <div className="relative transform hover:scale-105 transition-all duration-300 z-30 w-48 md:w-56 aspect-[3/4] rounded-lg shadow-[0_20px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(124,58,237,0.3)] overflow-hidden bg-surface-container cursor-pointer">
              <img className="w-full h-full object-cover" src="https://cdn.gramedia.com/uploads/items/9786024553920.png" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-white/40 to-black/30 pointer-events-none"></div>
              <div className="absolute top-2 right-2 bg-primary-container/90 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-semibold text-on-primary-container tracking-wider uppercase">
                Pilihan Editor
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
