import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Book } from '../data/mockCatalog';
import { mockCatalog } from '../data/mockCatalog';

export interface OwnedBook {
  id: string; // unique library item id
  book: Book;
  progress: number;
  status: 'Sedang Dibaca' | 'Belum Mulai' | 'Selesai Dibaca';
  lastReadAt: Date | null;
  purchaseDate: Date;
  isPinned: boolean;
}

interface LibraryContextType {
  ownedBooks: OwnedBook[];
  addPurchasedBooks: (books: Book[]) => void;
  updateProgress: (ownedBookId: string, progress: number) => void;
  togglePin: (ownedBookId: string) => void;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

// Initial mock data based on the UI design
const getInitialMockData = (): OwnedBook[] => {
  const getBook = (slug: string) => mockCatalog.find(b => b.slug === slug);
  const now = new Date();
  
  const books: OwnedBook[] = [];
  
  const arsitektur = getBook('arsitektur-frontend');
  if (arsitektur) {
    books.push({
      id: 'lib_1',
      book: arsitektur,
      progress: 48,
      status: 'Sedang Dibaca',
      lastReadAt: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
      purchaseDate: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
      isPinned: true
    });
  }
  // Let's just create a modified mock catalog book for these if they don't exactly exist,
  // or use existing mock books. The user's HTML template has specific books.
  // Actually, I can use the existing mockCatalog books where possible.
  
  const filosofi = getBook('filosofi-teras');
  if (filosofi) {
    books.push({
      id: 'lib_2',
      book: filosofi,
      progress: 100,
      status: 'Selesai Dibaca',
      lastReadAt: new Date(2026, 0, 12), // 12 Jan 2026
      purchaseDate: new Date(2025, 11, 20),
      isPinned: true
    });
  }

  const docker = getBook('docker-k8s-devops');
  if (docker) {
    books.push({
      id: 'lib_3',
      book: docker,
      progress: 12,
      status: 'Sedang Dibaca',
      lastReadAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
      purchaseDate: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000),
      isPinned: false
    });
  }

  const ai = getBook('machine-learning');
  if (ai) {
    books.push({
      id: 'lib_4',
      book: ai,
      progress: 0,
      status: 'Belum Mulai',
      lastReadAt: null,
      purchaseDate: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
      isPinned: false
    });
  }

  const cleanArch = getBook('clean-architecture');
  if (cleanArch) {
    books.push({
      id: 'lib_5',
      book: cleanArch,
      progress: 64,
      status: 'Sedang Dibaca',
      lastReadAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
      purchaseDate: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
      isPinned: true
    });
  }
  
  const sophie = getBook('dunia-sophie');
  if (sophie) {
    books.push({
      id: 'lib_6',
      book: sophie,
      progress: 100,
      status: 'Selesai Dibaca',
      lastReadAt: new Date(2025, 11, 28), // 28 Des 2025
      purchaseDate: new Date(2025, 10, 15),
      isPinned: false
    });
  }

  return books;
};

export const LibraryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ownedBooks, setOwnedBooks] = useState<OwnedBook[]>(getInitialMockData());

  const addPurchasedBooks = (books: Book[]) => {
    const now = new Date();
    const newOwnedBooks: OwnedBook[] = books.map(book => ({
      id: `lib_${Date.now()}_${book.id}`,
      book,
      progress: 0,
      status: 'Belum Mulai',
      lastReadAt: null,
      purchaseDate: now,
      isPinned: false
    }));

    setOwnedBooks(prev => [...newOwnedBooks, ...prev]);
  };

  const updateProgress = (ownedBookId: string, progress: number) => {
    setOwnedBooks(prev => prev.map(ob => {
      if (ob.id === ownedBookId) {
        let status: OwnedBook['status'] = 'Sedang Dibaca';
        if (progress === 0) status = 'Belum Mulai';
        if (progress === 100) status = 'Selesai Dibaca';
        
        return {
          ...ob,
          progress,
          status,
          lastReadAt: new Date()
        };
      }
      return ob;
    }));
  };

  const togglePin = (ownedBookId: string) => {
    setOwnedBooks(prev => prev.map(ob => 
      ob.id === ownedBookId ? { ...ob, isPinned: !ob.isPinned } : ob
    ));
  };

  return (
    <LibraryContext.Provider value={{ ownedBooks, addPurchasedBooks, updateProgress, togglePin }}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (context === undefined) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};
