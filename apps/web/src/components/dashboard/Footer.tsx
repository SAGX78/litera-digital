import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-surface-container-lowest shadow-[0_-1px_12px_rgba(0,0,0,0.5)] pt-space-xl pb-space-lg">
      <div className="w-full px-margin">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-gutter mb-space-xl">
          <div className="lg:col-span-2 flex flex-col gap-space-md">
            <div className="flex items-center gap-space-sm">
              <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold">Litera<span className="text-primary">Digital</span></span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">Kurasi buku digital premium, teknis, dan literatur pilihan untuk pengalaman membaca modern tanpa distraksi.</p>
            <div className="flex items-center gap-space-sm pt-space-xs">
              <span className="px-space-sm py-space-xs rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">EPUB & PDF Reader</span>
              <span className="px-space-sm py-space-xs rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">Akses Selamanya</span>
            </div>
          </div>
          <div className="flex flex-col gap-space-sm">
            <span className="font-label-md text-label-md text-on-surface font-semibold tracking-wide">Katalog Ebook</span>
            <nav className="flex flex-col gap-space-xs">
              <Link className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" to="/katalog?kategori=Fiksi+%26+Sastra">Fiksi</Link>
              <Link className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" to="/katalog?kategori=Teknologi+%26+Coding">Teknologi</Link>
              <Link className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" to="/katalog?kategori=Bisnis+%26+Keuangan">Bisnis</Link>
              <Link className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" to="/katalog?kategori=Self-Improvement">Pengembangan Diri</Link>
            </nav>
          </div>
          <div className="flex flex-col gap-space-sm">
            <span className="font-label-md text-label-md text-on-surface font-semibold tracking-wide">Dukungan & Legal</span>
            <nav className="flex flex-col gap-space-xs">
              <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">Bantuan & FAQ</a>
              <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">Syarat & Ketentuan</a>
              <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">Kebijakan Privasi</a>
            </nav>
          </div>
          <div className="flex flex-col gap-space-md">
            <span className="font-label-md text-label-md text-on-surface font-semibold tracking-wide">Buletin Literasi</span>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Dapatkan rekomendasi kurasi dan diskon eksklusif mingguan langsung di surel Anda.</p>
            <div className="flex flex-col gap-space-sm">
              <input className="w-full bg-surface-container-low px-space-md py-space-sm rounded-lg text-on-surface font-body-sm text-body-sm placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Alamat surel Anda..." type="email" />
              <button className="w-full bg-primary-container text-on-primary-container font-label-md text-label-md py-space-sm rounded-lg hover:shadow-[0_0_24px_rgba(124,58,237,0.4)] transition-all font-semibold" type="button">Berlangganan</button>
            </div>
          </div>
        </div>
        <div className="pt-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-md">
          <p className="font-body-sm text-body-sm text-outline">© 2026 LiteraDigital. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-space-md text-outline font-body-sm text-body-sm">
            <span>Platform Ebook Indonesia</span>
            <span>•</span>
            <span>Format Terbuka & Terproteksi</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
