import React, { useState } from 'react';

interface SampleReaderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (e: React.MouseEvent) => void;
}

export const SampleReaderDrawer: React.FC<SampleReaderDrawerProps> = ({ isOpen, onClose, onAddToCart }) => {
  const [fontSize, setFontSize] = useState(18);

  const handleAdjustFontSize = (delta: number) => {
    setFontSize((prev) => Math.min(Math.max(prev + delta * 2, 14), 26));
  };

  return (
    <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      {/* Backdrop Blur */}
      <div 
        className="absolute inset-0 bg-surface-container-lowest/80 backdrop-blur-md cursor-pointer" 
        onClick={onClose}
      ></div>
      
      {/* Right Drawer Sheet */}
      <div className={`absolute top-0 right-0 h-full w-full max-w-2xl bg-surface-container-lowest shadow-2xl flex flex-col justify-between transform transition-transform duration-300 pointer-events-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header Reader */}
        <div className="h-16 px-space-md bg-surface-container flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">chrome_reader_mode</span>
            <div>
              <span className="font-label-md text-label-md text-on-surface block font-semibold">Pratinjau Sampel Gratis</span>
              <span className="text-caption font-caption text-outline block">Bab 1 • Halaman 1 dari 15</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface flex items-center justify-center font-bold text-label-sm" onClick={() => handleAdjustFontSize(-1)} title="Kecilkan Font" type="button">
              A-
            </button>
            <button className="w-8 h-8 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface flex items-center justify-center font-bold text-label-sm" onClick={() => handleAdjustFontSize(1)} title="Besarkan Font" type="button">
              A+
            </button>
            <button className="w-8 h-8 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface flex items-center justify-center" onClick={onClose} title="Tutup Pratinjau" type="button">
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Reader Scrollable Body Content */}
        <div 
          className="flex-1 overflow-y-auto px-margin py-space-xl space-y-6 text-on-surface select-text" 
          style={{ fontSize: `${fontSize}px`, lineHeight: `${fontSize * 1.6}px` }}
        >
          <div className="max-w-xl mx-auto space-y-6">
            <div className="text-center pb-space-lg space-y-2">
              <span className="text-caption font-caption uppercase tracking-widest text-primary font-bold">Cuplikan Resmi Terproteksi</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">Bab 1: Menembus Batas Tradisional Frontend</h2>
              <p className="font-body-sm text-body-sm text-outline">Oleh Budi Santoso, M.Kom</p>
            </div>
            
            <p>
              Dalam lanskap rekayasa perangkat lunak modern, kita sering mendengar pernyataan bahwa arsitektur adalah seni menunda keputusan. Namun dalam ekosistem frontend yang berputar cepat, arsitektur sesungguhnya adalah seni meminimalkan friksi: friksi bagi pengembang yang menulis kode, dan lebih krusial lagi, friksi bagi pengguna akhir yang mengakses aplikasi.
            </p>
            
            <div className="p-space-md bg-surface-container rounded-lg italic text-secondary text-body-md font-body-md">
              "Ketika latensi halaman bertambah 100 milidetik, konversi transaksi dapat anjlok hingga 7%. Optimasi frontend bukan sekadar estetika kode, melainkan pilar finansial produk digital."
            </div>
            
            <h3 className="font-headline-sm text-headline-sm text-on-surface pt-space-md">1.1 Pergeseran Komputasi Klien ke Server</h3>
            
            <p>
              Selama hampir satu dekade, komunitas JavaScript terbiasa memperlakukan peramban pengguna sebagai satu-satunya mesin pengolah antarmuka. Model SPA (Single Page Application) murni mengirim berkas kosong dengan tag <code>&lt;div id="root"&gt;&lt;/div&gt;</code> bersama bundel JavaScript sebesar 5 hingga 10 Megabyte.
            </p>
            <p>
              Pendekatan ini bekerja mulus di perangkat workstation pengembang dengan jaringan fiber-optic. Namun realitas di lapangan membuktikan sebaliknya: perangkat pembaca di daerah berkembang dengan memori terbatas seringkali mengalami browser freezing selama beberapa detik hanya untuk mem-parsing AST skrip.
            </p>
            
            <div className="p-space-md bg-surface-container-low rounded-lg space-y-2">
              <span className="font-label-md text-label-md text-tertiary font-semibold block">Prinsip Emas React 19:</span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Server Components mengeksekusi kode langsung di lingkungan server tanpa menyertakan dependensi paketnya ke bundle klien. Hasilnya adalah HTML streaming instan dengan hidrasi selektif yang ringan.
              </p>
            </div>
            
            <p>
              Dalam bab-bab selanjutnya, kita akan membangun arsitektur perenderan hybrid yang mengombinasikan keunggulan static generation, dynamic streaming, dan fine-grained client interactivity.
            </p>

            {/* Upsell Paywall Teaser at end of free pages */}
            <div className="mt-space-xl p-space-lg rounded-xl bg-gradient-to-br from-surface-container to-surface-container-high text-center flex flex-col items-center gap-space-sm shadow-xl">
              <span className="material-symbols-outlined text-[36px] text-primary">lock</span>
              <h4 className="font-headline-sm text-headline-sm text-on-surface">Anda Telah Menyelesaikan Sampel Bab 1</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
                Buka 11 bab lanjutan, 4 proyek studi kasus praktis, dan akses berkas EPUB/PDF dengan membeli versi lengkap sekarang.
              </p>
              <button 
                className="mt-2 py-space-sm px-space-lg rounded-lg bg-primary-container hover:shadow-[0_0_24px_rgba(124,58,237,0.5)] text-on-primary-container font-label-md text-label-md font-semibold transition-all" 
                onClick={(e) => {
                  onClose();
                  onAddToCart(e);
                }} 
                type="button"
              >
                Beli Buku Sekarang (Rp 48.000)
              </button>
            </div>
          </div>
        </div>

        {/* Footer Drawer Reader Actions */}
        <div className="h-16 px-space-md bg-surface-container flex items-center justify-between shrink-0">
          <span className="text-caption font-caption text-outline">Format: Tampilan Bacaan Web Dinamis</span>
          <div className="flex items-center gap-space-sm">
            <button className="px-space-md py-1.5 rounded-lg bg-surface-container-high text-on-surface font-label-sm text-label-sm hover:bg-surface-variant transition-colors" onClick={onClose} type="button">
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
