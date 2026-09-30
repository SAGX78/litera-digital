import React from 'react';
import { Link } from 'react-router-dom';

interface RelatedBooksProps {
  onAddToCart: (e: React.MouseEvent, title: string) => void;
}

export const RelatedBooks: React.FC<RelatedBooksProps> = ({ onAddToCart }) => {
  const books = [
    {
      id: 'ts-patterns',
      title: 'TypeScript 5: Pola Desain Skala Enterprise',
      author: 'Hendro Wicaksono',
      category: 'Rekayasa Kode',
      rating: 4.8,
      reviews: 98,
      price: 'Rp 45.000',
      originalPrice: 'Rp 75.000',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZoPg4waK1bKVWZjXSbNAg4rfM9BnpDaf6QCNKhs9l1PU2zGnXFpXupDxCW3rpzN1tk8BEHzjKntzri3K-x0GnQDHJ4IPn8fOm9Mfb2Fqaf4TCeEX_u7KjawPXB4U6exx-8M2mOmlPQmtR1njstd7uNqQlwlSR52GObjEXvaZ7aqPQzyoq9Iky3O-U9IgQ2y66XDDkvs3yFBEkyqfFlLgPoAouvHfnRSoQhbPJusKqQ2PL-XpF0kIf2w',
      format: 'EPUB + PDF'
    },
    {
      id: 'node-microservices',
      title: 'Node.js Microservices & Event-Driven',
      author: 'Dimas Suryo',
      category: 'Backend & Sistem',
      rating: 4.9,
      reviews: 210,
      price: 'Rp 52.000',
      originalPrice: 'Rp 85.000',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjHrjNJz9xn-yX95uc9r3Fksmf6xmyIRNWx61PsZVhFCCM6hovODp64rnpFEylA73J6Q5TdT6qbDWXFThIJASw_rEHrcaUlbLdAudk1c_F9xGaUlfQkXJMYdosVzIorkMzX4gFRAWeN5iQAQkfJxzfS__2TRDbJ3SpjLToUwmPPpU_zlSewG0WKBM9N57LwPTjlM4WypJWAnmI3XikbZQhqOLhLLraU8nK-WdWM6_A8tcPahBl3eWzJQ',
      format: 'EPUB + PDF'
    },
    {
      id: 'design-system',
      title: 'Design System Berkelanjutan',
      author: 'Citra Kirana & Tim Lumina',
      category: 'UI/UX & Token',
      rating: 4.7,
      reviews: 64,
      price: 'Rp 39.000',
      originalPrice: 'Rp 65.000',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDK7ov9roWAbl1M4piPc3QVo7D118dokeoG4oSo-WlK1UBYpOI60P_9L53sucXsCDp4UisiGMr3clRsUXV_x7esd_0m8qjfhZLH4OEz6nFMs39AyFPKl316oeCirQK9nIa6THvYhZBBk7DAJR3kKyZHNIKcszPbMm0LWexH6_2MkQj2HKuSmw4ifnDM2g_aPsAYSRO0zUN64Fzd-IaMYrt1PRlMOANe_7_oOdX_dpC8PZJkcMnmJ0B9OQ',
      format: 'PDF Eksklusif'
    },
    {
      id: 'docker-k8s',
      title: 'Docker & K8s untuk Frontend',
      author: 'Fajar Nugraha',
      category: 'DevOps & Cloud',
      rating: 4.9,
      reviews: 115,
      price: 'Rp 49.000',
      originalPrice: 'Rp 79.000',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhnG9BsUJSbwo50rdN8o73-ZJ99Z3_kANr6ep0rx-23ArOYKURnDLT65E2PQiS8r5yE3dmqrsuWJ_6idAmcB60oiN--NjUkEfifrYj5VatC1HLqHyHyc_6LXMTMUwgitfswxRCQ91dpMH59AStHW97trH5fl3lOLWrITo2CS3njWEM1V4Nc1uWVeeRUi0ef4y1eShBGDB_yn9uVZXZaC2QfEiVm2FT3z_aMRucTclZjxWsYFgkDJC81g',
      format: 'EPUB + PDF'
    }
  ];

  return (
    <section className="w-full flex flex-col gap-space-lg mt-space-md pb-space-xl">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
            <span>📚 Sering Dibeli Bersama</span>
          </h2>
          <p className="font-body-sm text-body-sm text-outline">Rekomendasi kurasi buku pelengkap untuk memperdalam keahlian arsitektur software Anda.</p>
        </div>
        <a className="hidden sm:flex items-center gap-1 text-primary hover:text-on-primary-container font-label-md text-label-md transition-colors" href="#">
          <span>Lihat Semua Rekomendasi</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </a>
      </div>
      
      {/* 4 Book Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {books.map((book) => (
          <div key={book.id} className="group bg-surface-container rounded-xl p-space-md flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(124,58,237,0.2)] transition-all duration-300">
            <Link to={`/book/${book.id}`} className="flex flex-col gap-space-sm">
              <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-surface-container-high shadow-md">
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-surface-container-lowest/80 text-secondary font-label-sm text-caption z-10 font-semibold">{book.format}</span>
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src={book.image} alt={book.title} />
              </div>
              <div className="flex flex-col gap-1 mt-1">
                <span className="text-caption font-caption text-primary font-medium">{book.category}</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface line-clamp-1 group-hover:text-primary transition-colors">
                  {book.title}
                </h3>
                <p className="text-body-sm font-body-sm text-outline">{book.author}</p>
                <div className="flex items-center gap-1 text-tertiary mt-1 text-caption font-caption">
                  <span className="material-symbols-outlined text-[15px] fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="font-semibold text-on-surface">{book.rating}</span>
                  <span className="text-outline">({book.reviews} ulasan)</span>
                </div>
              </div>
            </Link>
            <div className="flex items-center justify-between pt-space-md mt-space-xs">
              <div className="flex flex-col">
                <span className="font-price-md text-price-md text-on-surface font-bold">{book.price}</span>
                <span className="text-caption font-caption text-outline line-through">{book.originalPrice}</span>
              </div>
              <button 
                className="p-2 rounded-lg bg-surface-container-high hover:bg-primary-container text-on-surface hover:text-on-primary-container transition-all shadow-sm" 
                onClick={(e) => {
                  e.preventDefault();
                  onAddToCart(e, book.title);
                }} 
                title="Tambah Cepat" 
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
