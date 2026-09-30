import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <div className="lg:col-span-7 relative flex flex-col justify-between p-8 lg:p-12 overflow-hidden bg-gradient-to-br from-[#131b2e] via-[#0f1422] to-[#120f26]">
      {/* Subtle Decorative Atmospheric Glows */}
      <div className="absolute -top-24 -left-20 w-96 h-96 bg-[#7C3AED]/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-16 w-96 h-96 bg-[#3B82F6]/20 rounded-full blur-[110px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/10 rounded-full blur-[90px] pointer-events-none"></div>
      
      {/* Top Section: Header & Value Proposition */}
      <div className="relative z-10 space-y-4 max-w-xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-primary shadow-inner">
          <span className="material-symbols-outlined text-base text-primary">auto_stories</span>
          <span className="font-label-sm text-xs font-semibold tracking-wider uppercase text-primary">Perpustakaan Digital Premium Indonesia</span>
        </div>
        <h1 className="font-headline-lg text-3xl sm:text-4xl lg:text-[40px] font-bold text-white leading-tight tracking-tight">
          Buka Gerbang <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d2bbff] via-[#adc6ff] to-[#60a5fa]">Pengetahuan Digital</span> Anda.
        </h1>
        <p className="font-body-md text-slate-300 text-sm sm:text-base leading-relaxed">
          Akses ribuan ebook berkualitas dari penulis terbaik dunia dan tanah air. Nikmati pengalaman membaca fleksibel di berbagai perangkat, daring maupun luring.
        </p>
      </div>

      {/* Middle Section: Floating Staggered 3D Book Cluster */}
      <div className="relative z-10 my-8 py-6 flex items-center justify-center">
        {/* Book 1: Stoikisme (Left card) */}
        <div className="relative w-40 sm:w-44 h-56 sm:h-60 rounded-xl p-4 bg-gradient-to-b from-[#1e2435] to-[#141824] border border-slate-700/60 shadow-xl -rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer select-none">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-lg pointer-events-none"></div>
          <div className="relative z-10 flex justify-between items-start">
            <span className="text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded bg-primary-container text-on-primary-container">FILOSOFI</span>
            <span className="material-symbols-outlined text-tertiary text-sm">bookmark</span>
          </div>
          <div className="relative z-10">
            <div className="w-7 h-7 rounded-lg bg-surface-container-high flex items-center justify-center mb-2 text-primary">
              <span className="material-symbols-outlined text-base">psychology</span>
            </div>
            <p className="text-[11px] font-medium text-slate-400">Marcus & Seneca</p>
            <h4 className="font-headline-sm text-sm sm:text-base font-bold text-white leading-snug mt-0.5">Seni Berpikir Stoik</h4>
            <p className="text-[11px] text-secondary mt-1 font-medium">EPUB + PDF</p>
          </div>
        </div>

        {/* Book 2: React & TypeScript (Center Hero Card) */}
        <div className="relative w-44 sm:w-52 h-64 sm:h-72 rounded-xl p-5 bg-gradient-to-b from-[#201d3a] to-[#16152a] border border-[#7C3AED]/40 -ml-6 -mt-6 z-20 shadow-[0_16px_36px_rgba(124,58,237,0.35)] rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer select-none">
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#7C3AED]/30 rounded-full blur-xl pointer-events-none"></div>
          <div className="relative z-10 flex justify-between items-start">
            <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded bg-gradient-to-r from-[#0566d9] to-[#3B82F6] text-white uppercase shadow-sm">BESTSELLER</span>
            <span className="material-symbols-outlined text-amber-400 text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          </div>
          <div className="relative z-10">
            <div className="w-9 h-9 rounded-lg bg-[#7C3AED]/20 border border-[#7C3AED]/30 flex items-center justify-center mb-2.5 text-primary">
              <span className="material-symbols-outlined text-lg">code</span>
            </div>
            <p className="text-xs font-medium text-slate-300">Arsitektur Web</p>
            <h3 className="font-headline-sm text-base sm:text-lg font-bold text-white leading-tight mt-0.5">Mastering React & TS</h3>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="font-price-md text-base sm:text-lg font-bold text-primary">Rp 149.000</span>
            </div>
          </div>
        </div>

        {/* Book 3: AI Modern (Right card) */}
        <div className="relative w-40 sm:w-44 h-56 sm:h-60 rounded-xl p-4 bg-gradient-to-b from-[#182338] to-[#101928] border border-slate-700/60 -ml-6 rotate-8 hover:rotate-0 hover:scale-105 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl cursor-pointer select-none">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary-container/20 to-transparent pointer-events-none"></div>
          <div className="relative z-10 flex justify-between items-start">
            <span className="text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded bg-slate-700 text-slate-200 uppercase">TEKNOLOGI</span>
            <span className="material-symbols-outlined text-secondary text-sm">smart_toy</span>
          </div>
          <div className="relative z-10">
            <div className="w-7 h-7 rounded-lg bg-surface-container-high flex items-center justify-center mb-2 text-secondary">
              <span className="material-symbols-outlined text-base">memory</span>
            </div>
            <p className="text-[11px] font-medium text-slate-400">Kecerdasan Buatan</p>
            <h4 className="font-headline-sm text-sm sm:text-base font-bold text-white leading-snug mt-0.5">Algoritma AI Modern</h4>
            <p className="text-[11px] text-tertiary mt-1 font-medium">Edisi 2025</p>
          </div>
        </div>
      </div>

      {/* Bottom Section: Trust & Feature Badges Bar */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800/80">
        <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-900/40 border border-slate-800/50">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-lg">bolt</span>
          </div>
          <span className="font-label-sm text-xs font-medium text-slate-200 leading-tight">Unduh Instan PDF/EPUB</span>
        </div>
        <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-900/40 border border-slate-800/50">
          <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
            <span className="material-symbols-outlined text-lg">verified_user</span>
          </div>
          <span className="font-label-sm text-xs font-medium text-slate-200 leading-tight">Pembayaran Aman</span>
        </div>
        <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-900/40 border border-slate-800/50">
          <div className="w-8 h-8 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary shrink-0">
            <span className="material-symbols-outlined text-lg">menu_book</span>
          </div>
          <span className="font-label-sm text-xs font-medium text-slate-200 leading-tight">5.000+ Koleksi Ebook</span>
        </div>
      </div>
    </div>
  );
};
