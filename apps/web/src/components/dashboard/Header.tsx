import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useUser } from '../../context/UserContext';
import { motion } from 'framer-motion';

export const Header: React.FC = () => {
  const { cartItems, isCartBouncing } = useCart();
  const { user } = useUser();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full bg-surface-container-lowest/80 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
      <div className="h-20 w-full px-margin flex items-center justify-between gap-gutter">
        <div className="flex items-center gap-gutter shrink-0">
          <Link className="flex items-center gap-space-sm" to="/">
            <img alt="LiteraDigital Logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1XnWVGviR6AVjrRVsi3PYYsusQ_T793BnXmqdS-sZP2YLsW-Yh-F7-9uJBcCX-E0m4rww6r0wisAnuwAqtj8TbaHbS2oKUcnKlwiVZRLrNJjW6t2luZWuCVSUaSxNzzhPu95rEzlXb_pMc5BZyhncCEhvDbEPGHh_kFuWJtGmUjTzZqegKwRWx6mH4pT9c4dSLFROD0XiVV1E6Nm4ltyhwh44mBxn4GMcz-ZgbCp-rxT026J1hHFuwnPt1M" />
            <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold">Litera<span className="text-primary">Digital</span></span>
          </Link>
          <nav className="hidden lg:flex items-center gap-space-xs">
            <Link aria-current={location.pathname === '/' ? 'page' : undefined} className={`px-space-md py-space-sm rounded-lg transition-colors font-label-md text-label-md ${location.pathname === '/' ? 'text-on-surface font-bold bg-surface-container-high/60' : 'text-on-surface-variant hover:text-on-surface'}`} to="/">Beranda</Link>
            <div className="relative group">
              <Link to="/katalog" className="flex items-center gap-space-xs px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-md text-label-md hover:text-on-surface transition-colors" type="button">
                <span>Kategori</span>
                <span className="material-symbols-outlined text-[18px]">expand_more</span>
              </Link>
              <div className="absolute top-full left-0 mt-2 w-56 rounded-xl bg-surface-container-high/90 backdrop-blur-md shadow-lg border border-surface-container-highest opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-50">
                <Link to="/katalog" className="block px-4 py-2 text-sm text-on-surface hover:bg-surface-container-highest transition-colors font-semibold border-b border-surface-container/50 mb-1">Semua Kategori</Link>
                <Link to="/katalog?kategori=Teknologi+%26+Coding" className="block px-4 py-2 text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors">Teknologi & Coding</Link>
                <Link to="/katalog?kategori=Bisnis+%26+Keuangan" className="block px-4 py-2 text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors">Bisnis & Keuangan</Link>
                <Link to="/katalog?kategori=Self-Improvement" className="block px-4 py-2 text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors">Self-Improvement</Link>
                <Link to="/katalog?kategori=Sains+%26+AI" className="block px-4 py-2 text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors">Sains & AI</Link>
                <Link to="/katalog?kategori=Fiksi+%26+Sastra" className="block px-4 py-2 text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors">Fiksi & Sastra</Link>
                <Link to="/katalog?kategori=Desain+%26+UI%2FUX" className="block px-4 py-2 text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors">Desain & UI/UX</Link>
              </div>
            </div>
            <Link className={`px-space-md py-space-sm rounded-lg font-label-md text-label-md transition-colors ${location.pathname === '/perpustakaan-saya' ? 'text-on-surface font-bold bg-surface-container-high/60' : 'text-on-surface-variant hover:text-on-surface'}`} to="/perpustakaan-saya">Perpustakaan Saya</Link>
            <a className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-md text-label-md hover:text-on-surface transition-colors" href="#">Promo</a>
          </nav>
        </div>
        <div className="flex-1 max-w-lg mx-space-md hidden md:block">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-space-md text-outline pointer-events-none text-[20px]">search</span>
            <input className="w-full bg-surface-container-low pl-10 pr-space-md py-space-sm rounded-lg text-on-surface font-body-sm text-body-sm placeholder:text-outline focus:outline-none focus:bg-surface-container focus:ring-1 focus:ring-primary transition-all" placeholder="Cari buku, penulis, atau topik..." type="text" />
          </div>
        </div>
        <div className="flex items-center gap-space-md shrink-0">
          <motion.div 
            id="header-cart-icon"
            animate={isCartBouncing ? { scale: [1, 1.3, 1], rotate: [0, -10, 10, -10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            <Link to="/keranjang" aria-label="Keranjang Belanja" className="relative p-space-sm rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors block">
              <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
              {cartItems.length > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-primary-container text-on-primary-container font-label-sm text-caption shadow-[0_0_12px_rgba(124,58,237,0.5)]">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </motion.div>
          <Link to="/profil" className="flex items-center gap-space-sm pl-space-sm py-space-xs rounded-lg hover:bg-surface-container-high/50 transition-colors">
            <img alt={user.name} className="w-8 h-8 rounded-full object-cover ring-1 ring-primary/40" src={user.avatar} />
            <div className="hidden sm:flex items-center gap-space-xs">
              <span className="font-label-md text-label-md text-on-surface font-medium">{user.name.split(',')[0]}</span>
              <span className="material-symbols-outlined text-outline text-[18px]">keyboard_arrow_down</span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};
