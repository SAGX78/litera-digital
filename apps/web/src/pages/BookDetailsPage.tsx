import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../components/dashboard/Header';
import { Footer } from '../components/dashboard/Footer';
import { Breadcrumbs } from '../components/book/Breadcrumbs';
import { BookShowcase } from '../components/book/BookShowcase';
import { useCart } from '../context/CartContext';
import { mockCatalog } from '../data/mockCatalog';
import { BookTabs } from '../components/book/BookTabs';
import { BookPreview } from '../components/book/BookPreview';
import { RelatedBooks } from '../components/book/RelatedBooks';
import { SampleReaderDrawer } from '../components/book/SampleReaderDrawer';
import { ToastNotification, type ToastState } from '../components/book/ToastNotification';

export const BookDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toast, setToast] = useState<ToastState>({ isVisible: false, message: '', icon: '' });
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart, buyNow } = useCart();
  const navigate = useNavigate();

  // Find the book by slug (which is mapped to 'id' in our route /book/:id)
  const book = mockCatalog.find(b => b.slug === id) || mockCatalog[0];

  const handleBuyNow = (e?: React.MouseEvent) => {
    e?.preventDefault();
    buyNow(book);
    navigate('/keranjang');
  };

  const showToast = (message: string, icon: string) => {
    setToast({ isVisible: true, message, icon });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };

  const handleAddToCart = (e?: React.MouseEvent, title?: string) => {
    addToCart(book, e);
    if (title) {
      showToast(`"${title}" ditambahkan ke keranjang!`, 'add_shopping_cart');
    } else {
      showToast('Buku berhasil ditambahkan ke keranjang belanja!', 'shopping_bag');
    }
  };

  const handleToggleWishlist = () => {
    const nextState = !isWishlisted;
    setIsWishlisted(nextState);
    if (nextState) {
      showToast('Disimpan ke Daftar Keinginan Anda', 'favorite');
    } else {
      showToast('Dihapus dari Daftar Keinginan', 'heart_broken');
    }
  };

  return (
    <div className="bg-surface-container-lowest text-on-surface font-body-md text-body-md antialiased min-h-screen selection:bg-primary-container selection:text-on-primary-container">
      <Header />

      <main className="w-full bg-surface-container-lowest min-h-screen">
        <div className="flex flex-col w-full">
          {/* Top Ambient Glow Field */}
          <div className="relative w-full overflow-hidden">
            <div className="absolute -top-32 left-1/4 w-96 h-96 bg-primary-container/20 rounded-full blur-[128px] pointer-events-none"></div>
            <div className="absolute top-48 right-10 w-80 h-80 bg-secondary-container/15 rounded-full blur-[110px] pointer-events-none"></div>

            {/* Main Container Content */}
            <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin py-space-lg w-full flex flex-col gap-space-xl">
              <Breadcrumbs book={book} />
              <BookShowcase
                book={book}
                onOpenDrawer={() => setIsDrawerOpen(true)}
                onAddToCart={(e) => handleAddToCart(e, book.title)}
                onBuyNow={handleBuyNow}
                onToggleWishlist={handleToggleWishlist}
                isWishlisted={isWishlisted}
              />
              <BookTabs book={book} />
              <BookPreview book={book} onOpenDrawer={() => setIsDrawerOpen(true)} />
              <RelatedBooks onAddToCart={handleAddToCart} />
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Slide-over Drawer */}
      <SampleReaderDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onAddToCart={(e) => handleAddToCart(e)}
      />

      {/* Toast Notification */}
      <ToastNotification toast={toast} onHide={hideToast} />
    </div>
  );
};
