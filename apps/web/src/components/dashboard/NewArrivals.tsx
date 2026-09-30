import React from 'react';
import { Link } from 'react-router-dom';
import { mockCatalog } from '../../data/mockCatalog';
import { useCart } from '../../context/CartContext';

export const NewArrivals: React.FC = () => {
  const newArrivals = mockCatalog.filter(book => book.isNewArrival);
  const { addToCart } = useCart();

  return (
    <section className="w-full px-margin-mobile md:px-margin mb-space-xl">
      <div className="flex items-center justify-between mb-space-md">
        <div>
          <div className="flex items-center gap-space-xs mb-1">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-semibold">Koleksi Terkini</span>
          </div>
          <h2 className="font-headline-md text-headline-sm md:text-headline-md text-on-surface font-bold tracking-tight">Baru Tiba di LiteraDigital</h2>
        </div>
        <a className="group inline-flex items-center gap-1 font-label-md text-label-md text-primary hover:text-on-primary-container transition-colors" href="#">
          <span>Lihat Semua (48)</span>
          <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </a>
      </div>
      {/* 5 Book Cards Shelf */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-gutter">
        {newArrivals.map((book) => (
          <Link key={book.id} to={`/book/${book.slug}`} className="flex flex-col bg-surface-container rounded-xl overflow-hidden shadow-lg hover:shadow-[0_0_24px_rgba(124,58,237,0.25)] hover:-translate-y-1.5 transition-all duration-300 group">
            <div className="relative w-full aspect-[3/4] bg-surface-container-highest overflow-hidden">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={book.coverImage} alt={book.title} />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-surface-container-lowest/80 backdrop-blur-md text-[10px] font-semibold text-tertiary tracking-wide uppercase">Sampel Gratis</span>
              {book.discountLabel && (
                <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-error-container text-on-error-container text-[11px] font-bold">{book.discountLabel}</span>
              )}
            </div>
            <div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
              <div>
                <span className="text-caption font-label-sm text-secondary uppercase font-semibold">{book.category}</span>
                <h3 className="font-headline-sm text-body-md font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2 mt-0.5">{book.title}</h3>
                <p className="font-body-sm text-caption text-on-surface-variant mt-1">{book.author.split('•')[0].trim()}</p>
              </div>
              <div className="pt-space-xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1 text-[13px] text-tertiary">
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="font-semibold text-on-surface font-body-sm">{book.rating.toFixed(1)}</span>
                    <span className="text-outline text-caption">({book.reviewsCount})</span>
                  </div>
                  <span className="font-price-md text-price-md text-on-surface font-bold">
                    Rp {book.price.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    className="flex items-center justify-center gap-1 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-caption font-semibold transition-colors"
                    onClick={(e) => { e.preventDefault(); addToCart(book, e); }}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                    <span>Keranjang</span>
                  </button>
                  <button className="flex items-center justify-center py-1.5 rounded-lg bg-primary-container hover:bg-primary-container/80 text-on-primary-container text-caption font-bold shadow-sm transition-all" onClick={(e) => e.preventDefault()} type="button">
                    Beli Langsung
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
