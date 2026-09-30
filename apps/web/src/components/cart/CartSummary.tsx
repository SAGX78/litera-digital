import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export const CartSummary: React.FC = () => {
  const { cartItems, getCartTotal, selectedItemIds, promoCode, setPromoCode, discount } = useCart();
  const navigate = useNavigate();

  const subtotal = getCartTotal();
  const total = Math.max(0, subtotal - discount);

  if (cartItems.length === 0) {
    return (
      <div className="p-6 rounded-2xl bg-surface-container shadow-xl flex flex-col gap-6 opacity-50 pointer-events-none">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Ringkasan Pesanan</h2>
          <span className="material-symbols-outlined text-outline">receipt_long</span>
        </div>
        <p className="font-body-sm text-body-sm text-center py-4">Belum ada item di keranjang.</p>
      </div>
    );
  }

  return (
    <>
      {/* Summary Card */}
      <div className="p-6 rounded-2xl bg-surface-container shadow-xl flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Ringkasan Pesanan</h2>
          <span className="material-symbols-outlined text-outline">receipt_long</span>
        </div>
        
        {/* Promo Code Form */}
        <div className="flex flex-col gap-2">
          <label className="font-label-sm text-label-sm text-on-surface font-medium flex items-center justify-between" htmlFor="promoCode">
            <span>Kode Promo / Voucher</span>
            <span className="text-secondary flex items-center gap-1 font-caption text-caption cursor-pointer hover:underline">
              <span className="material-symbols-outlined text-[14px]">sell</span> Lihat Kupon Saya
            </span>
          </label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-outline text-[18px]">confirmation_number</span>
            <input 
              id="promoCode" 
              type="text" 
              className="w-full bg-surface-container-low pl-9 pr-24 py-2.5 rounded-lg text-on-surface font-label-md text-label-md tracking-wider placeholder:text-outline uppercase focus:outline-none focus:bg-surface-container-highest transition-all" 
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button className="absolute right-1.5 px-3 py-1 rounded-md bg-surface-container-high hover:bg-surface-bright text-primary font-label-sm text-caption font-semibold transition-all" type="button">
              Terapkan
            </button>
          </div>
          {/* Applied Voucher Notification Badge */}
          {discount > 0 && (
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-primary-container/15 text-primary text-caption font-caption mt-1">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-primary">check_circle</span>
                <span>Kupon <strong>{promoCode.toUpperCase()}</strong> aktif</span>
              </div>
              <span className="font-semibold text-secondary">Hemat Rp {discount.toLocaleString('id-ID')}</span>
            </div>
          )}
        </div>
        
        {/* Price Calculation Lines */}
        <div className="flex flex-col gap-3 pt-2">
          <div className="flex justify-between items-center text-body-sm font-body-sm text-on-surface-variant">
            <span>Subtotal ({selectedItemIds.length} Ebook)</span>
            <span className="text-on-surface font-label-md text-label-md font-medium">Rp {subtotal.toLocaleString('id-ID')}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between items-center text-body-sm font-body-sm text-on-surface-variant">
              <span className="flex items-center gap-1">
                Diskon Promo Spesial
                <span className="material-symbols-outlined text-[14px] text-secondary cursor-help" title={`Potongan kupon ${promoCode.toUpperCase()}`}>info</span>
              </span>
              <span className="text-secondary font-label-md text-label-md font-semibold">-Rp {discount.toLocaleString('id-ID')}</span>
            </div>
          )}
          <div className="flex justify-between items-center text-body-sm font-body-sm text-on-surface-variant">
            <span className="flex items-center gap-1">
              Biaya Layanan Platform
              <span className="px-1.5 py-0.5 rounded bg-surface-container-high text-[10px] text-primary font-semibold uppercase leading-none">Gratis</span>
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-outline line-through font-caption text-caption">Rp 1.000</span>
              <span className="text-on-surface font-label-md text-label-md font-medium">Rp 0</span>
            </div>
          </div>
          <div className="flex justify-between items-center text-body-sm font-body-sm text-on-surface-variant">
            <span>Pajak PPN Digital (11%)</span>
            <span className="text-outline font-caption text-caption font-medium">Sudah Termasuk</span>
          </div>
          <div className="w-full h-px bg-surface-container-highest my-1"></div>
          <div className="flex justify-between items-baseline pt-1">
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold">Total Pembayaran</span>
              <span className="font-caption text-caption text-outline">Termasuk lisensi seumur hidup</span>
            </div>
            <div className="text-right">
              <span className="font-price-lg text-price-lg text-primary font-extrabold tracking-tight">Rp {total.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>
        
        {/* Checkout Primary CTA Buttons */}
        <div className="flex flex-col gap-3 pt-2">
          <button 
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-primary-container via-inverse-primary to-secondary-container text-white font-label-md text-label-md font-bold tracking-wide shadow-lg hover:shadow-primary/30 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none disabled:scale-100 transition-all flex flex-col items-center justify-center gap-0.5 group" 
            type="button"
            onClick={() => navigate('/pembayaran')}
            disabled={selectedItemIds.length === 0}
          >
            <div className="flex items-center gap-2">
              <span>Lanjut ke Pembayaran</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
            <span className="text-[11px] font-normal text-on-primary-container/80 tracking-normal">Simulasi instan via LiteraPay, QRIS, & Kartu</span>
          </button>
          <Link to="/dashboard" className="w-full py-2.5 px-4 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm font-semibold transition-colors text-center flex items-center justify-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">chevron_left</span>
            <span>Lanjut Belanja Buku Lain</span>
          </Link>
        </div>
        
        {/* User Authentication Context & Security Footer */}
        <div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col gap-2.5">
          <div className="flex items-center gap-2.5">
            <img alt="Rian Pratama" className="w-6 h-6 rounded-full object-cover shrink-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3coyPznlPdOjrxGmTVDH4P1y59poKhZyT8ytjsgEmz31CxaOXQL2kAdxa5tE9FWZQ69EYM2pT0b2Bv0lLJ4IY7WVh6kwdewK3QqbRE1B4rOLMO-HjcVwWQVBunUO9vQjqKHLbdOFQXhBBu0NEsvl9g41EBVcBpzATPzTS_uYp_PgQpBexKsTgiTj0Gnl2SwH55y0jKGLEj9GPOiiZqNwjCo6sgGRFV4MIKpru0n8mmijp-6YZdGXW9Q" />
            <div className="flex flex-col min-w-0">
              <span className="font-caption text-[11px] text-outline truncate">Akun Terhubung:</span>
              <span className="font-label-sm text-label-sm text-on-surface font-medium truncate">rian.pratama@gmail.com</span>
            </div>
          </div>
          <div className="w-full h-px bg-surface-container-highest/60"></div>
          <div className="flex items-center justify-between text-outline font-caption text-[11px] pt-0.5">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-secondary">lock</span>
              Enkripsi 256-Bit SSL
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-primary">verified</span>
              Verified Merchant
            </span>
          </div>
        </div>
      </div>
      
      {/* Safe Checkout Micro Guarantee Notice */}
      <div className="p-4 rounded-xl bg-surface-container-low/60 flex items-center gap-3 text-on-surface-variant font-caption text-caption">
        <span className="material-symbols-outlined text-primary text-[20px] shrink-0">history_edu</span>
        <p>
          Semua pembelian di LiteraDigital menyertakan riwayat faktur resmi ber-NPWP dan pembaruan berkas gratis jika terdapat revisi edisi buku.
        </p>
      </div>
    </>
  );
};
