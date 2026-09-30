import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { CartProvider } from './context/CartContext'
import { LibraryProvider } from './context/LibraryContext'
import { UserProvider } from './context/UserContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <LibraryProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </LibraryProvider>
    </UserProvider>
  </StrictMode>,
)
