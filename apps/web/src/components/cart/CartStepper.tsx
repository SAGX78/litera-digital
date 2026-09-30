import React from 'react';
import { Link } from 'react-router-dom';

export const CartStepper: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-on-surface-variant font-caption text-caption uppercase tracking-wider">
        <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px]">home</span>
          Beranda
        </Link>
        <span className="text-outline/40">/</span>
        <span className="text-on-surface font-label-sm text-label-sm font-semibold text-primary">Keranjang Belanja</span>
      </nav>
      {/* Stepper Flow */}
      <div className="inline-flex items-center p-1.5 rounded-full bg-surface-container-low shadow-sm">
        {/* Step 1 (Active) */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-container text-on-primary-container shadow-md">
          <span className="w-5 h-5 rounded-full bg-on-primary-container/20 flex items-center justify-center font-label-sm text-caption font-bold">1</span>
          <span className="font-label-sm text-label-sm font-semibold tracking-tight">Keranjang</span>
        </div>
        <div className="w-4 h-0.5 bg-surface-container-highest mx-1"></div>
        {/* Step 2 */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-on-surface-variant/70">
          <span className="w-5 h-5 rounded-full bg-surface-container-high flex items-center justify-center font-label-sm text-caption font-medium">2</span>
          <span className="font-label-sm text-label-sm hidden sm:inline">Pembayaran</span>
        </div>
        <div className="w-4 h-0.5 bg-surface-container-highest mx-1"></div>
        {/* Step 3 */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-on-surface-variant/70">
          <span className="w-5 h-5 rounded-full bg-surface-container-high flex items-center justify-center font-label-sm text-caption font-medium">3</span>
          <span className="font-label-sm text-label-sm hidden sm:inline">Akses Buku</span>
        </div>
      </div>
    </div>
  );
};
