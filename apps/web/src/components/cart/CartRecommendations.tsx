import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { mockCatalog } from '../../data/mockCatalog';

export const CartRecommendations: React.FC = () => {
  const { addToCart } = useCart();
  const recommendations = mockCatalog.filter(book => book.isRecommendation);

  return (
    <div className="mt-8 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[22px]">auto_stories</span>
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">Sering Ditambahkan Bersama</h2>
        </div>
        <Link to="/dashboard" className="font-label-sm text-label-sm text-primary hover:underline flex items-center gap-1">
          Lihat Katalog Terkait <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map(book => (
          <div key={book.id} className="p-4 rounded-xl bg-surface-container flex items-center justify-between gap-4 transition-all hover:bg-surface-container-high shadow-sm">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-14 h-18 rounded-md overflow-hidden bg-surface-container-highest shrink-0 shadow-sm">
                <img className="w-full h-full object-cover" src={book.coverImage} alt={book.title} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-caption text-[10px] uppercase font-bold text-secondary">{book.category}</span>
                <h4 className="font-label-md text-label-md text-on-surface font-semibold truncate" title={book.title}>
                  {book.title}
                </h4>
                <p className="font-caption text-caption text-on-surface-variant truncate">{book.author.split('•')[0].trim()}</p>
                <span className="font-price-md text-price-md text-on-surface font-bold mt-1">Rp {book.price.toLocaleString('id-ID')}</span>
              </div>
            </div>
            <button 
              className="shrink-0 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-primary-container text-on-surface-variant hover:text-on-primary-container font-label-sm text-caption font-semibold transition-all flex items-center gap-1 shadow-sm" 
              type="button"
              onClick={(e) => addToCart(book, e)}
            >
              <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
              <span>Tambah</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
