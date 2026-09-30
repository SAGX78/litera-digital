import React from 'react';

import { type Book } from '../../data/mockCatalog';
import { Link } from 'react-router-dom';

interface BreadcrumbsProps {
  book: Book;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ book }) => {
  return (
    <nav aria-label="Jalur Navigasi" className="flex items-center flex-wrap gap-space-xs text-body-sm font-body-sm text-outline">
      <Link className="hover:text-primary transition-colors flex items-center gap-1" to="/">
        <span className="material-symbols-outlined text-[16px]">home</span>
        <span>Beranda</span>
      </Link>
      <span className="material-symbols-outlined text-[14px] text-outline-variant">chevron_right</span>
      <Link className="hover:text-primary transition-colors" to={`/katalog?kategori=${encodeURIComponent(book.category)}`}>{book.category}</Link>
      <span className="material-symbols-outlined text-[14px] text-outline-variant">chevron_right</span>
      <span className="text-on-surface truncate max-w-xs md:max-w-md font-medium">{book.title}</span>
    </nav>
  );
};
