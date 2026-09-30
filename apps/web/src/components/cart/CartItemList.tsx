import React from 'react';
import { useCart } from '../../context/CartContext';

export const CartItemList: React.FC = () => {
  const { cartItems, removeFromCart, selectedItemIds, setSelectedItemIds } = useCart();

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItemIds(cartItems.map(item => item.id));
    } else {
      setSelectedItemIds([]);
    }
  };

  const toggleItem = (id: string) => {
    setSelectedItemIds(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    selectedItemIds.forEach(id => removeFromCart(id));
    setSelectedItemIds([]);
  };

  const isAllSelected = cartItems.length > 0 && selectedItemIds.length === cartItems.length;

  if (cartItems.length === 0) {
    return (
      <div className="p-10 rounded-xl bg-surface-container flex flex-col items-center justify-center gap-4 shadow-sm text-center">
        <span className="material-symbols-outlined text-[48px] text-outline">production_quantity_limits</span>
        <h3 className="font-headline-sm text-headline-sm text-on-surface">Keranjang Anda kosong</h3>
        <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">Temukan buku-buku menarik di katalog kami dan tambahkan ke keranjang untuk mulai belajar.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Cart Controls Bar */}
      <div className="p-4 rounded-xl bg-surface-container flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <label className="relative flex items-center gap-3 cursor-pointer select-none">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={isAllSelected}
              onChange={(e) => handleSelectAll(e.target.checked)}
            />
            <div className="w-5 h-5 rounded bg-surface-container-high peer-checked:bg-primary-container peer-checked:text-on-primary-container flex items-center justify-center transition-all shadow-sm">
              <span className="material-symbols-outlined text-[16px] text-white font-bold opacity-0 peer-checked:opacity-100">check</span>
            </div>
            <span className="font-label-md text-label-md text-on-surface font-medium">Pilih Semua ({cartItems.length} Item)</span>
          </label>
          <span className="text-outline/30">•</span>
          <button 
            className="font-label-sm text-label-sm text-on-surface-variant hover:text-error flex items-center gap-1.5 transition-colors group" 
            type="button"
            onClick={handleDeleteSelected}
            disabled={selectedItemIds.length === 0}
          >
            <span className="material-symbols-outlined text-[18px] group-hover:text-error">delete_outline</span>
            <span>Hapus Pilihan</span>
          </button>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high/60 text-secondary font-label-sm text-caption">
          <span className="material-symbols-outlined text-[16px]">verified_user</span>
          <span>Bebas DRM & Akses Unduhan Selamanya</span>
        </div>
      </div>

      {/* Cart Items Cards */}
      <div className="flex flex-col gap-4">
        {cartItems.map((item) => (
          <article key={item.id} className="p-5 md:p-6 rounded-xl bg-surface-container flex flex-col sm:flex-row gap-5 transition-all hover:bg-surface-container-high/70 shadow-sm relative group">
            <div className="flex items-start gap-4">
              <label className="relative flex items-center cursor-pointer select-none pt-1">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={selectedItemIds.includes(item.id)}
                  onChange={() => toggleItem(item.id)}
                />
                <div className="w-5 h-5 rounded bg-surface-container-high peer-checked:bg-primary-container peer-checked:text-on-primary-container flex items-center justify-center transition-all shadow-sm">
                  <span className="material-symbols-outlined text-[16px] text-white font-bold opacity-0 peer-checked:opacity-100">check</span>
                </div>
              </label>
              <div className="relative w-24 h-32 md:w-28 md:h-36 shrink-0 rounded-lg overflow-hidden shadow-md bg-surface-container-highest">
                <img className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" src={item.coverImage} alt={item.title} />
                <div className="absolute inset-y-0 left-0 w-1.5 bg-black/40"></div>
                {item.edition && (
                  <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-surface-container-lowest/80 backdrop-blur-sm text-on-surface font-caption text-[9px] uppercase tracking-wider font-semibold">
                    {item.edition.split(' ')[0]}
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-primary-container/20 text-primary font-caption text-caption font-semibold">{item.format}</span>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-caption text-caption">{item.edition}</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight hover:text-primary transition-colors cursor-pointer">
                  {item.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{item.author}</p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-outline font-caption text-caption mt-1">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">hard_drive</span> {item.fileSize}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">language</span> {item.language}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">verified</span> {item.license}</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 bg-surface-container-low/50 -mx-5 -mb-5 p-4 rounded-b-xl md:bg-transparent md:mx-0 md:mb-0 md:p-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-price-lg text-price-lg text-on-surface font-bold">Rp {item.price.toLocaleString('id-ID')}</span>
                  {item.originalPrice > item.price && (
                    <span className="font-body-sm text-body-sm text-outline line-through">Rp {item.originalPrice.toLocaleString('id-ID')}</span>
                  )}
                  {item.discountLabel && (
                    <span className="px-1.5 py-0.5 rounded bg-tertiary-container/30 text-tertiary font-label-sm text-caption font-bold">{item.discountLabel}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5 font-label-sm text-caption font-medium" title="Pindahkan ke Wishlist" type="button">
                    <span className="material-symbols-outlined text-[16px]">bookmark_add</span>
                    <span className="hidden sm:inline">Pindahkan ke Wishlist</span>
                  </button>
                  <button 
                    className="p-1.5 rounded-lg bg-surface-container-high hover:bg-error-container text-on-surface-variant hover:text-error transition-colors flex items-center justify-center" 
                    title="Hapus dari Keranjang" 
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
