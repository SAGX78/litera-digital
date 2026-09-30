import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { BookDetailsPage } from './pages/BookDetailsPage';
import { CartPage } from './pages/CartPage';
import { PaymentPage } from './pages/PaymentPage';
import { LibraryPage } from './pages/LibraryPage';
import { ProfilePage } from './pages/ProfilePage';
import { CatalogPage } from './pages/CatalogPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/katalog" element={<CatalogPage />} />
        <Route path="/book/:id" element={<BookDetailsPage />} />
        <Route path="/keranjang" element={<CartPage />} />
        <Route path="/pembayaran" element={<PaymentPage />} />
        <Route path="/perpustakaan-saya" element={<LibraryPage />} />
        <Route path="/profil" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
