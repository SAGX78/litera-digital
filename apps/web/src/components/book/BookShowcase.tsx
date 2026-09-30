import React from 'react';

import { type Book } from '../../data/mockCatalog';

interface BookShowcaseProps {
  book: Book;
  onOpenDrawer: () => void;
  onAddToCart: (e: React.MouseEvent) => void;
  onBuyNow: (e: React.MouseEvent) => void;
  onToggleWishlist: () => void;
  isWishlisted: boolean;
}

export const BookShowcase: React.FC<BookShowcaseProps> = ({
  book,
  onOpenDrawer,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted,
}) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-space-xl items-start">
      {/* Left Column: Visual Book Canvas & Sample Drawer Trigger */}
      <div className="lg:col-span-5 flex flex-col items-center">
        <div className="relative group w-full max-w-[340px] sm:max-w-[380px]">
          {/* Radiant Aura behind Cover */}
          <div className="absolute -inset-2 bg-gradient-to-tr from-primary-container/40 via-secondary-container/20 to-primary/30 rounded-xl blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
          {/* 3D Book Presentation Envelope */}
          <div className="relative bg-surface-container-high rounded-xl overflow-hidden shadow-2xl p-space-md flex flex-col items-center">
            {/* Edition Badge Over Cover */}
            <div className="w-full flex items-center justify-between pb-space-sm">
              <span className="px-space-sm py-0.5 rounded-full bg-primary-container/60 text-on-primary-container font-label-sm text-caption tracking-wider uppercase font-semibold flex items-center gap-1 shadow-sm">
                <span className="material-symbols-outlined text-[13px]">verified</span>
                Edisi Revisi 2026
              </span>
              <span className="text-caption font-caption text-secondary flex items-center gap-1 bg-surface-container-lowest/80 px-2 py-0.5 rounded-full">
                <span className="material-symbols-outlined text-[13px]">auto_stories</span>
                Format Digital
              </span>
            </div>
            {/* Realistic Book Spine & Cover Wrapper */}
            <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden flex shadow-[0_12px_36px_rgba(0,0,0,0.7)]">
              {/* Book Spine Simulation Overlay */}
              <div className="w-4 h-full bg-gradient-to-r from-black/80 via-white/10 to-transparent z-10 shrink-0 pointer-events-none"></div>
              {/* Main Cover Image */}
              <img className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" src={book.coverImage} alt={book.title} />
            </div>
            {/* Format & Delivery Chips */}
            <div className="w-full grid grid-cols-3 gap-space-xs mt-space-md">
              <div className="flex items-center justify-center gap-1 py-1.5 px-2 bg-surface-container rounded-lg text-on-surface-variant font-label-sm text-caption">
                <span className="material-symbols-outlined text-[15px] text-primary">picture_as_pdf</span>
                <span>PDF (28 MB)</span>
              </div>
              <div className="flex items-center justify-center gap-1 py-1.5 px-2 bg-surface-container rounded-lg text-on-surface-variant font-label-sm text-caption">
                <span className="material-symbols-outlined text-[15px] text-secondary">menu_book</span>
                <span>EPUB (8 MB)</span>
              </div>
              <div className="flex items-center justify-center gap-1 py-1.5 px-2 bg-surface-container rounded-lg text-tertiary font-label-sm text-caption">
                <span className="material-symbols-outlined text-[15px]">bolt</span>
                <span>Kirim Instan</span>
              </div>
            </div>
          </div>
        </div>
        {/* Sample Reader Button */}
        <div className="w-full max-w-[340px] sm:max-w-[380px] mt-space-md">
          <button className="w-full py-space-sm px-space-md rounded-lg bg-surface-container-high/70 hover:bg-surface-variant text-on-surface font-label-md text-label-md flex items-center justify-center gap-space-sm backdrop-blur-md shadow-md transition-all group" onClick={onOpenDrawer} type="button">
            <span className="material-symbols-outlined text-[20px] text-primary group-hover:scale-110 transition-transform">visibility</span>
            <span>Baca Sampel Gratis (15 Halaman)</span>
          </button>
          <p className="text-center font-caption text-caption text-outline mt-2">Dapat dibaca langsung di browser tanpa login akun</p>
        </div>
      </div>

      {/* Right Column: Metadata, Pricing Box, Value Props & Actions */}
      <div className="lg:col-span-7 flex flex-col gap-space-md">
        {/* Category & Metadata Header */}
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center gap-space-sm">
            <span className="px-space-md py-1 rounded-full bg-primary-container/20 text-primary font-label-sm text-label-sm font-semibold tracking-wide">
              {book.category}
            </span>
            {book.badgeLabel && (
              <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-caption flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px] text-tertiary">trending_up</span>
                {book.badgeLabel}
              </span>
            )}
          </div>
          <h1 className="font-headline-lg text-headline-lg lg:text-display-hero lg:font-display-hero text-on-surface tracking-tight mt-space-xs">
            {book.title}
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            {book.subCategory ? `Buku terbaik di kategori ${book.subCategory}. ` : ''} 
            Tingkatkan pengetahuan Anda dengan panduan komprehensif dari pakar di bidangnya.
          </p>
        </div>
        {/* Author, Publisher, and Trust Indicators */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 py-space-xs text-body-sm font-body-sm text-outline">
          <div className="flex items-center gap-1.5 text-on-surface">
            <span className="material-symbols-outlined text-[18px] text-secondary">person</span>
            <span className="font-medium text-on-surface">{book.author}</span>
          </div>
          <span className="text-outline-variant">•</span>
          <div className="flex items-center gap-1.5 text-tertiary font-medium">
            <span className="material-symbols-outlined text-[18px] fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span>{book.rating}</span>
            <span className="text-outline">({book.reviewsCount} Ulasan)</span>
          </div>
        </div>
        {/* Glassmorphic Pricing Card Box */}
        <div className="relative bg-surface-container rounded-xl p-space-lg shadow-xl overflow-hidden mt-space-xs">
          <div className="absolute -top-16 -right-16 w-44 h-44 bg-primary-container/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="flex flex-col gap-space-md">
            {/* Price Display Tier */}
            <div className="flex items-baseline flex-wrap gap-x-space-md gap-y-1">
              <span className="font-headline-lg text-headline-lg md:text-display-hero md:font-display-hero text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-bold tracking-tight">
                Rp {book.price.toLocaleString('id-ID')}
              </span>
              {book.originalPrice > book.price && (
                <>
                  <span className="font-price-md text-price-md text-outline line-through">
                    Rp {book.originalPrice.toLocaleString('id-ID')}
                  </span>
                  {book.discountLabel && (
                    <span className="px-space-sm py-1 rounded-full bg-error-container/40 text-error font-label-sm text-caption font-bold tracking-wider">
                      {book.discountLabel} HEMAT
                    </span>
                  )}
                </>
              )}
            </div>
            {/* Value Prop Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-xs py-space-xs">
              <div className="flex items-center gap-2 text-body-sm font-body-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-[18px] text-secondary">check_circle</span>
                <span>Akses seumur hidup</span>
              </div>
              <div className="flex items-center gap-2 text-body-sm font-body-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-[18px] text-secondary">check_circle</span>
                <span>Update versi berkala</span>
              </div>
              <div className="flex items-center gap-2 text-body-sm font-body-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-[18px] text-secondary">check_circle</span>
                <span>Semua gawai e-reader</span>
              </div>
            </div>
            {/* Action Buttons Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-sm pt-space-xs">
              <button className="flex-1 py-space-sm px-space-md rounded-lg bg-gradient-to-r from-primary-container to-secondary-container text-on-primary-container font-label-md text-label-md font-semibold flex items-center justify-center gap-space-xs shadow-[0_0_24px_rgba(124,58,237,0.35)] hover:shadow-[0_0_32px_rgba(124,58,237,0.55)] transition-all hover:scale-[1.01] active:scale-[0.99]" onClick={onAddToCart} type="button">
                <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                <span>Tambahkan ke Keranjang</span>
              </button>
              <button className="py-space-sm px-space-lg rounded-lg bg-surface-container-high hover:bg-surface-variant text-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-space-xs shadow-md transition-all" type="button" onClick={onBuyNow}>
                <span className="material-symbols-outlined text-[20px] text-tertiary">bolt</span>
                <span>Beli Sekarang</span>
              </button>
              <button className={`p-space-sm rounded-lg bg-surface-container-high hover:bg-surface-variant transition-all flex items-center justify-center shrink-0 shadow-sm ${isWishlisted ? 'text-error' : 'text-outline hover:text-error'}`} onClick={onToggleWishlist} title="Simpan ke Daftar Keinginan" type="button">
                <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
              </button>
            </div>
            {/* Guarantee Micro-copy */}
            <div className="flex items-center gap-2 pt-space-xs text-caption font-caption text-outline">
              <span className="material-symbols-outlined text-[16px] text-secondary">verified_user</span>
              <span>Garansi uang kembali 100% jika berkas rusak atau bermasalah dalam 7 hari.</span>
            </div>
          </div>
        </div>
        {/* Reader Engagement Quick Metric Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm mt-space-xs">
          <div className="p-space-md bg-surface-container-low rounded-lg flex flex-col gap-1">
            <span className="font-caption text-caption text-outline uppercase tracking-wider">Halaman</span>
            <span className="font-headline-sm text-headline-sm text-on-surface">{book.pages || 300} Hal</span>
            <span className="text-caption font-caption text-secondary flex items-center gap-1">{book.edition || 'Edisi Standar'}</span>
          </div>
          <div className="p-space-md bg-surface-container-low rounded-lg flex flex-col gap-1">
            <span className="font-caption text-caption text-outline uppercase tracking-wider">Tingkat Materi</span>
            <span className="font-headline-sm text-headline-sm text-on-surface">Menengah+</span>
            <span className="text-caption font-caption text-primary">Senior &amp; Lead</span>
          </div>
          <div className="p-space-md bg-surface-container-low rounded-lg flex flex-col gap-1">
            <span className="font-caption text-caption text-outline uppercase tracking-wider">Proyek Latihan</span>
            <span className="font-headline-sm text-headline-sm text-on-surface">4 Studi Kasus</span>
            <span className="text-caption font-caption text-outline">Repo Kode GitHub</span>
          </div>
          <div className="p-space-md bg-surface-container-low rounded-lg flex flex-col gap-1">
            <span className="font-caption text-caption text-outline uppercase tracking-wider">Bahasa</span>
            <span className="font-headline-sm text-headline-sm text-on-surface">Indonesia</span>
            <span className="text-caption font-caption text-outline">Istilah Standar</span>
          </div>
        </div>
      </div>
    </section>
  );
};
