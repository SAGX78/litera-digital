import React from 'react';
import { Header } from '../components/dashboard/Header';
import { Footer } from '../components/dashboard/Footer';
import { CartStepper } from '../components/cart/CartStepper';
import { CartItemList } from '../components/cart/CartItemList';
import { CartTrustStrip } from '../components/cart/CartTrustStrip';
import { CartRecommendations } from '../components/cart/CartRecommendations';
import { CartSummary } from '../components/cart/CartSummary';
import { useCart } from '../context/CartContext';

export const CartPage: React.FC = () => {
  const { selectedItemIds } = useCart();
  return (
    <div className="bg-surface-container-lowest text-on-surface font-body-md text-body-md antialiased min-h-screen selection:bg-primary-container selection:text-on-primary-container">
      <Header />
      <main className="w-full bg-surface-container-lowest min-h-screen pt-20">
        <div className="flex flex-col w-full">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <CartStepper />
            
            {/* Header Section */}
            <div className="flex flex-col gap-2 mb-10">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Keranjang Belanja Anda</h1>
                <span className="px-3 py-1 rounded-full bg-secondary-container/20 text-secondary font-label-sm text-label-sm font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                  {selectedItemIds.length} Item Terpilih
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
                Periksa kembali buku digital pilihan Anda sebelum melanjutkan ke pembayaran aman dan aktivasi lisensi seumur hidup instan.
              </p>
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 flex flex-col gap-6">
                <CartItemList />
                <CartTrustStrip />
                <CartRecommendations />
              </div>
              <div className="lg:col-span-4 sticky top-28 flex flex-col gap-5">
                <CartSummary />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
