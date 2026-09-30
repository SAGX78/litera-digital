import React, { useState } from 'react';
import { type Book } from '../../data/mockCatalog';

interface BookPreviewProps {
  book: Book;
  onOpenDrawer: () => void;
}

export const BookPreview: React.FC<BookPreviewProps> = ({ book, onOpenDrawer }) => {
  const [teaserExpanded, setTeaserExpanded] = useState(false);

  return (
    <section className="w-full bg-gradient-to-r from-surface-container via-surface-container-high to-surface-container p-space-lg rounded-xl relative overflow-hidden shadow-xl mt-space-md">
      <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-64 bg-primary-container/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="flex flex-col gap-space-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-primary">auto_stories</span>
            <span className="font-label-sm text-caption uppercase tracking-wider text-primary font-bold">Cuplikan Bab Pilihan</span>
          </div>
          <span className="text-caption font-caption text-outline">Estimasi membaca: 3 menit</span>
        </div>
        <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
          Bab 1: Evolusi Frontend di Era Komputasi Modern
        </h3>
        
        {/* Quoted Teaser Card */}
        <div className="p-space-md bg-surface-container-lowest/80 backdrop-blur-sm rounded-lg relative">
          <span className="material-symbols-outlined text-outline-variant/30 text-[48px] absolute top-2 right-4 pointer-events-none">format_quote</span>
          <p className="font-body-md text-body-md text-on-surface italic leading-relaxed">
            "Arsitektur frontend yang hebat tidak diukur dari seberapa banyak pustaka yang Anda pasang, melainkan dari seberapa sedikit JavaScript yang terpaksa dikirimkan ke perangkat pengguna untuk mencapai nilai bisnis optimal."
          </p>
        </div>

        {/* Expandable Reading Sample Teaser */}
        <div className={`transition-all duration-300 overflow-hidden ${teaserExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="p-space-md bg-surface-container-low rounded-lg text-body-md font-body-md text-on-surface-variant space-y-3 mt-2">
            <p>
              {book.sampleChapter || "Cuplikan bab belum tersedia untuk buku ini. Silakan tambahkan 'sampleChapter' pada data katalog."}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-space-xs flex-wrap gap-space-sm mt-2">
          <button 
            className="text-primary hover:text-on-primary-container font-label-md text-label-md flex items-center gap-1.5 transition-colors" 
            onClick={() => setTeaserExpanded(!teaserExpanded)} 
            type="button"
          >
            <span>{teaserExpanded ? 'Sembunyikan Cuplikan' : 'Tampilkan Lanjutan Cuplikan'}</span>
            <span className="material-symbols-outlined text-[18px]">
              {teaserExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
            </span>
          </button>
          <button 
            className="px-space-md py-1.5 rounded-lg bg-surface-container-highest hover:bg-surface-variant text-on-surface font-label-sm text-label-sm font-medium flex items-center gap-1.5 transition-colors" 
            onClick={onOpenDrawer} 
            type="button"
          >
            <span>Buka Sampel Penuh di Reader</span>
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
          </button>
        </div>
      </div>
    </section>
  );
};
