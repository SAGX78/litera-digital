import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Book } from '../data/mockCatalog';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

interface CartAnimation {
  id: string;
  book: Book;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

interface CartContextType {
  cartItems: Book[];
  selectedItemIds: string[];
  setSelectedItemIds: React.Dispatch<React.SetStateAction<string[]>>;
  addToCart: (book: Book, e?: React.MouseEvent) => void;
  buyNow: (book: Book) => void;
  removeFromCart: (bookId: string) => void;
  clearCart: () => void;
  clearPurchasedItems: () => void;
  getCartTotal: () => number;
  isCartBouncing: boolean;
  promoCode: string;
  setPromoCode: React.Dispatch<React.SetStateAction<string>>;
  discount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Book[]>([]);
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  const [promoCode, setPromoCode] = useState<string>('');
  const [animations, setAnimations] = useState<CartAnimation[]>([]);
  const [isCartBouncing, setIsCartBouncing] = useState(false);

  const discount = promoCode.toUpperCase() === 'LITERAHEXA2026' && selectedItemIds.length > 0 ? 15000 : 0;

  const triggerBounce = () => {
    setIsCartBouncing(true);
    setTimeout(() => setIsCartBouncing(false), 300);
  };

  const addToCart = (book: Book, e?: React.MouseEvent) => {
    // If event is provided, we trigger animation
    if (e) {
      const cartIcon = document.getElementById('header-cart-icon');
      if (cartIcon) {
        const rect = cartIcon.getBoundingClientRect();
        const endX = rect.left + rect.width / 2;
        const endY = rect.top + rect.height / 2;
        
        const newAnimation: CartAnimation = {
          id: Date.now().toString() + Math.random().toString(),
          book,
          startX: e.clientX,
          startY: e.clientY,
          endX,
          endY
        };
        
        setAnimations(prev => [...prev, newAnimation]);
        return; // Item will be added to cart after animation completes
      }
    }
    
    // Fallback if no event or no animation
    performAddToCart(book);
  };

  const performAddToCart = (book: Book) => {
    setCartItems(prev => {
      if (prev.some(item => item.id === book.id)) {
        triggerBounce(); // Bounce even if duplicate (user feedback)
        return prev;
      }
      triggerBounce();
      return [...prev, book];
    });
    setSelectedItemIds(prev => {
      if (!prev.includes(book.id)) {
        return [...prev, book.id];
      }
      return prev;
    });
  };

  const buyNow = (book: Book) => {
    setCartItems(prev => {
      if (prev.some(item => item.id === book.id)) {
        return prev;
      }
      return [...prev, book];
    });
    setSelectedItemIds([book.id]);
  };

  const removeFromCart = (bookId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== bookId));
    setSelectedItemIds(prev => prev.filter(id => id !== bookId));
  };

  const clearCart = () => {
    setCartItems([]);
    setSelectedItemIds([]);
  };

  const clearPurchasedItems = () => {
    setCartItems(prev => prev.filter(item => !selectedItemIds.includes(item.id)));
    setSelectedItemIds([]);
  };

  const getCartTotal = () => {
    return cartItems
      .filter(item => selectedItemIds.includes(item.id))
      .reduce((total, item) => total + item.price, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, selectedItemIds, setSelectedItemIds, addToCart, buyNow, removeFromCart, clearCart, clearPurchasedItems, getCartTotal, isCartBouncing, promoCode, setPromoCode, discount }}>
      {children}
      
      {/* Animation Portal */}
      {typeof document !== 'undefined' && createPortal(
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 9999 }}>
          <AnimatePresence>
            {animations.map(anim => (
              <motion.img
                key={anim.id}
                src={anim.book.coverImage}
                alt=""
                initial={{ 
                  x: anim.startX - 40, // center offset (assume ~80px width)
                  y: anim.startY - 60, 
                  scale: 0.5, 
                  opacity: 1,
                  rotate: -10 
                }}
                animate={{ 
                  x: anim.endX - 20, 
                  y: anim.endY - 20, 
                  scale: 0.1, 
                  opacity: 0.3,
                  rotate: 10 
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 0.8, 
                  ease: "easeInOut" 
                }}
                onAnimationComplete={() => {
                  setAnimations(prev => prev.filter(a => a.id !== anim.id));
                  performAddToCart(anim.book);
                }}
                style={{
                  position: 'absolute',
                  width: '80px',
                  height: '120px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                  zIndex: 9999
                }}
              />
            ))}
          </AnimatePresence>
        </div>,
        document.body
      )}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
