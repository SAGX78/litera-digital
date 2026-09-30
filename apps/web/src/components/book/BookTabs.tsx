import React, { useState } from 'react';
import { type Book } from '../../data/mockCatalog';

type Tab = 'sinopsis' | 'daftar-isi' | 'penulis' | 'ulasan';

interface BookTabsProps {
  book: Book;
}

export const BookTabs: React.FC<BookTabsProps> = ({ book }) => {
  const [activeTab, setActiveTab] = useState<Tab>('sinopsis');

  return (
    <section className="w-full flex flex-col gap-space-md mt-space-lg">
      {/* Tab Controls Header */}
      <div className="flex items-center gap-space-xs overflow-x-auto pb-2 scrollbar-none bg-surface-container-low p-1.5 rounded-xl">
        <button
          className={`px-space-md py-2.5 rounded-lg font-label-md text-label-md transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'sinopsis' ? 'bg-surface-container-high text-on-surface shadow-sm font-semibold' : 'text-on-surface-variant hover:text-on-surface'
          }`}
          onClick={() => setActiveTab('sinopsis')}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">subject</span>
          <span>Sinopsis &amp; Ringkasan</span>
        </button>
        <button
          className={`px-space-md py-2.5 rounded-lg font-label-md text-label-md transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'daftar-isi' ? 'bg-surface-container-high text-on-surface shadow-sm font-semibold' : 'text-on-surface-variant hover:text-on-surface'
          }`}
          onClick={() => setActiveTab('daftar-isi')}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">list_alt</span>
          <span>Daftar Isi (12 Bab)</span>
        </button>
        <button
          className={`px-space-md py-2.5 rounded-lg font-label-md text-label-md transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'penulis' ? 'bg-surface-container-high text-on-surface shadow-sm font-semibold' : 'text-on-surface-variant hover:text-on-surface'
          }`}
          onClick={() => setActiveTab('penulis')}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">account_circle</span>
          <span>Tentang Penulis</span>
        </button>
        <button
          className={`px-space-md py-2.5 rounded-lg font-label-md text-label-md transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'ulasan' ? 'bg-surface-container-high text-on-surface shadow-sm font-semibold' : 'text-on-surface-variant hover:text-on-surface'
          }`}
          onClick={() => setActiveTab('ulasan')}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">reviews</span>
          <span>Ulasan Pembaca (142)</span>
        </button>
      </div>

      {/* TAB CONTENT: SINOPSIS */}
      {activeTab === 'sinopsis' && (
        <div className="flex flex-col gap-space-lg bg-surface-container-low p-space-lg rounded-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
            <div className="lg:col-span-8 flex flex-col gap-space-md">
              <h2 className="font-headline-md text-headline-md text-on-surface">Menguasai Topik {book.title}</h2>
              <div className="prose max-w-none text-on-surface-variant font-body-md text-body-md space-y-4">
                {book.synopsis && book.synopsis.length > 0 ? (
                  book.synopsis.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))
                ) : (
                  <p>Sinopsis untuk buku ini belum tersedia. Silakan lengkapi data synopsis di katalog.</p>
                )}
              </div>
              {/* Learning Outcomes */}
              <div className="mt-space-md p-space-md bg-surface-container rounded-lg flex flex-col gap-space-sm">
                <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">lightbulb</span>
                  Apa Saja yang Akan Anda Kuasai?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm pt-space-xs">
                  <div className="flex items-start gap-2.5 text-body-sm font-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px] text-secondary shrink-0 mt-0.5">check</span>
                    <span>Fondasi mendalam React 19: useActionState, useOptimistic, dan Server Functions.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-body-sm font-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px] text-secondary shrink-0 mt-0.5">check</span>
                    <span>Strategi caching multi-layer pada Next.js App Router (Data Cache, Full Route).</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-body-sm font-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px] text-secondary shrink-0 mt-0.5">check</span>
                    <span>Transisi arsitektur monolit ke Micro-Frontend berbasis domain bisnis terpadu.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-body-sm font-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px] text-secondary shrink-0 mt-0.5">check</span>
                    <span>Automasi CI/CD, Visual Regression Testing dengan Playwright &amp; Storybook.</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Specifications Table Aside */}
            <div className="lg:col-span-4 bg-surface-container p-space-md rounded-xl flex flex-col gap-space-sm shadow-md">
              <h3 className="font-label-md text-label-md text-on-surface font-semibold uppercase tracking-wider pb-space-xs">Spesifikasi Dokumen Digital</h3>
              <div className="divide-y divide-outline-variant/20 flex flex-col text-body-sm font-body-sm">
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-outline">Bahasa</span>
                  <span className="text-on-surface font-medium">Bahasa Indonesia</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-outline">Jumlah Halaman</span>
                  <span className="text-on-surface font-medium">{book.pages || 300} Halaman</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-outline">ISBN Digital</span>
                  <span className="text-on-surface font-medium font-mono text-caption">978-602-05-2026-1</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-outline">Penerbit</span>
                  <span className="text-on-surface font-medium">Pustaka Digital Lumina</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-outline">Tanggal Rilis</span>
                  <span className="text-on-surface font-medium">Januari 2026</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-outline">Hak Akses</span>
                  <span className="text-primary font-medium">Digital Rights Terbuka (DRM-Free)</span>
                </div>
              </div>
              <div className="mt-space-sm p-space-sm bg-surface-container-high rounded-lg flex items-center gap-space-sm text-caption font-caption text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px] text-tertiary">lock_open</span>
                <span>Berkas bebas DRM pribadi, di-watermark nama pembeli saat unduh.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: DAFTAR ISI */}
      {activeTab === 'daftar-isi' && (
        <div className="flex flex-col gap-space-md bg-surface-container-low p-space-lg rounded-xl">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-md text-headline-md text-on-surface">Struktur Kurikulum &amp; Silabus Buku</h2>
            <span className="font-label-sm text-caption text-outline">{book.tableOfContents ? book.tableOfContents.length : 0} Bab • {book.pages || 300} Halaman</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md mt-space-xs">
            <div className="flex flex-col gap-space-sm bg-surface-container p-space-md rounded-lg">
              <span className="font-label-sm text-caption uppercase tracking-wider text-primary font-semibold">Daftar Bab Tersedia</span>
              <div className="flex flex-col gap-2 font-body-sm text-body-sm">
                {book.tableOfContents && book.tableOfContents.length > 0 ? (
                  book.tableOfContents.map((item, index) => (
                    <div key={index} className="p-2 rounded bg-surface-container-low flex items-center justify-between text-on-surface">
                      <span>{item.title}</span>
                      <span className="text-outline font-mono text-caption">{item.pages}</span>
                    </div>
                  ))
                ) : (
                  <div className="p-2 rounded bg-surface-container-low text-on-surface-variant">Daftar isi belum tersedia. Silakan lengkapi di katalog.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: PENULIS */}
      {activeTab === 'penulis' && (
        <div className="flex flex-col gap-space-md bg-surface-container-low p-space-lg rounded-xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-space-lg">
            <div className="w-32 h-32 rounded-2xl bg-surface-container flex items-center justify-center shrink-0 text-primary">
              <span className="material-symbols-outlined text-[64px]">person</span>
            </div>
            <div className="flex flex-col gap-space-xs text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-space-sm">
                <h2 className="font-headline-md text-headline-md text-on-surface">{book.author}</h2>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-1">
                {book.authorBio || "Deskripsi tentang penulis belum tersedia. Silakan lengkapi authorBio di katalog."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: ULASAN PEMBACA */}
      {activeTab === 'ulasan' && (
        <div className="flex flex-col gap-space-lg bg-surface-container-low p-space-lg rounded-xl">
          {/* Rating Overview Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-space-lg items-center bg-surface-container p-space-lg rounded-xl">
            <div className="md:col-span-4 flex flex-col items-center justify-center text-center">
              <span className="font-display-hero text-display-hero text-on-surface font-extrabold leading-none">4.9</span>
              <div className="flex items-center gap-1 text-tertiary mt-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[22px] fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <span className="text-caption font-caption text-outline mt-1">Berdasarkan 142 verifikasi pembaca</span>
            </div>
            {/* Distribution Progress Bar List */}
            <div className="md:col-span-8 flex flex-col gap-2 w-full">
              {[
                { stars: 5, percent: 92, color: 'bg-primary' },
                { stars: 4, percent: 6, color: 'bg-secondary' },
                { stars: 3, percent: 2, color: 'bg-outline' },
                { stars: 2, percent: 0, color: 'bg-outline' },
                { stars: 1, percent: 0, color: 'bg-outline' },
              ].map((row) => (
                <div key={row.stars} className="flex items-center gap-3 text-body-sm font-body-sm">
                  <span className="w-12 text-outline text-right">{row.stars} Bintang</span>
                  <div className="flex-1 h-2 bg-surface-container-lowest rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${row.color}`} style={{ width: `${row.percent}%` }}></div>
                  </div>
                  <span className="w-8 text-on-surface font-mono text-caption">{row.percent}%</span>
                </div>
              ))}
            </div>
          </div>
          {/* Reader Reviews Stream */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            {/* Review 1 */}
            <div className="p-space-md bg-surface-container rounded-lg flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img className="w-9 h-9 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzkJ7v1d53VklfFFI8aeqBWRmIHUSOCFK1TQjkePI9ZDeM6o2VPT0DTU7ezcychYOmwv8ECTsa4z6PquOHpfsQCRQoJkzkvt8K7Zqa4fiuuATrlAIyT2Bi7snBDVsAWSSLgiy3j5YAUVyQhOVYil0ZJ5xRsNLIJPVdKzGNdK1glUFlYoCBMF-3L6xDQK8PZvx3HVu2DF255mb-d9nhinIx_Pe1tUhJxI80ekNBf5pJQf6rYjF1cx_-GA" alt="Reza" />
                  <div>
                    <h4 className="font-label-md text-label-md text-on-surface">Reza Firmansyah</h4>
                    <span className="text-caption font-caption text-primary">Lead Frontend Engineer</span>
                  </div>
                </div>
                <div className="flex text-tertiary">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[16px] fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                "Penjelasan Bab 5 tentang pembagian Server State dan Caching di Next.js adalah yang paling jernih yang pernah saya baca. Sangat membantu refactoring tim kami saat migrasi ke Next 15 &amp; React 19."
              </p>
              <span className="text-caption font-caption text-outline mt-1">Diverifikasi beli • 3 hari lalu</span>
            </div>
            {/* Review 2 */}
            <div className="p-space-md bg-surface-container rounded-lg flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img className="w-9 h-9 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2mfSw031c4k3HDmhOLFnxU4hrk1mUkiX3Xtk8ktZGups2M4xeKJJD6U20Lc94L22GwDi2mE10nIKgNFQbKiztbcFSK2leq18XIvRCUwATvpC8YSj6QShbkP_3DtA4esJRuWLteP-b3A531JVoygAZWFe5R51sVJ00vWobAMdn41Lp5S9kG5sroRnHizvZiuXY4CGlN07Zo_F7LL0sYvtuAWkxox2lTUDJc5jc7-HBBeGbXSTBMdDxnw" alt="Anisa" />
                  <div>
                    <h4 className="font-label-md text-label-md text-on-surface">Anisa Wulandari</h4>
                    <span className="text-caption font-caption text-primary">Fullstack Developer</span>
                  </div>
                </div>
                <div className="flex text-tertiary">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[16px] fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                "Sangat jarang ada buku teknis berbahasa Indonesia dengan kedalaman materi setara buku O'Reilly. Format EPUB-nya sangat nyaman dibaca di tablet saat perjalanan kerja."
              </p>
              <span className="text-caption font-caption text-outline mt-1">Diverifikasi beli • 1 minggu lalu</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
