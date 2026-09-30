import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLibrary } from '../context/LibraryContext';

export const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, selectedItemIds, promoCode, setPromoCode, discount, getCartTotal, clearPurchasedItems } = useCart();
  const { addPurchasedBooks } = useLibrary();

  // Local state
  const [activeMethod, setActiveMethod] = useState<'va' | 'qris' | 'cc'>('va');
  const [selectedBank, setSelectedBank] = useState({ name: 'BCA', code: 'bca', va: '8271 0812 8920 4100' });
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [isErrorToast, setIsErrorToast] = useState(false);

  const [timeLeft, setTimeLeft] = useState(23 * 3600 + 59 * 60 + 45); // countdown
  const [localPromo, setLocalPromo] = useState(promoCode);

  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [transactionTime, setTransactionTime] = useState('');

  // Derived state for the order summary
  const selectedItems = cartItems.filter(item => selectedItemIds.includes(item.id));
  const subtotal = getCartTotal();
  const total = Math.max(0, subtotal - discount);

  // Redirect if cart is empty or no items selected
  useEffect(() => {
    if (selectedItemIds.length === 0) {
      navigate('/keranjang');
    }
  }, [selectedItemIds, navigate]);

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const showToast = (msg: string, isError = false) => {
    setToastMsg(msg);
    setIsErrorToast(isError);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3500);
  };

  const handleApplyCoupon = () => {
    setPromoCode(localPromo);
    if (localPromo.toUpperCase() === 'LITERAHEXA2026') {
      showToast(`Kupon ${localPromo.toUpperCase()} berhasil diverifikasi (-Rp 15.000)`);
    } else {
      showToast('Kupon tidak valid', true);
    }
  };

  const handleCopyVa = () => {
    const text = selectedBank.va.replace(/\s+/g, '');
    navigator.clipboard.writeText(text)
      .then(() => showToast(`Nomor VA ${text} disalin ke papan klip!`))
      .catch(() => showToast(`Nomor VA disalin: ${text}`));
  };

  const simulatePayment = (isSuccess: boolean) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (isSuccess) {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        setTransactionTime(now.toLocaleDateString('id-ID', options) + ' WIB');
        setShowSuccessModal(true);
      } else {
        setShowFailureModal(true);
      }
    }, 1500);
  };

  const closeModals = () => {
    setShowSuccessModal(false);
    setShowFailureModal(false);
  };

  const handleFinish = () => {
    addPurchasedBooks(selectedItems);
    clearPurchasedItems();
    navigate('/perpustakaan-saya');
  };

  return (
    <div className="bg-surface-container-lowest text-on-surface font-body-md text-body-md antialiased min-h-screen selection:bg-primary-container selection:text-on-primary-container">
      {/* Toast Notification */}
      <div className={`fixed bottom-8 right-8 z-50 flex items-center gap-space-sm px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface shadow-2xl transition-all duration-300 ${toastVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <span className={`material-symbols-outlined text-[22px] ${isErrorToast ? 'text-error' : 'text-primary'}`}>
          {isErrorToast ? 'warning' : 'check_circle'}
        </span>
        <span className="font-body-sm text-body-sm font-medium">{toastMsg}</span>
      </div>

      <header className="sticky top-0 z-40 w-full bg-surface-container-lowest/80 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
        <div className="h-20 w-full px-margin flex items-center justify-between gap-gutter">
          <div className="flex items-center gap-gutter shrink-0">
            <Link to="/dashboard" className="flex items-center gap-space-sm">
              <img alt="LiteraDigital Logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1XnWVGviR6AVjrRVsi3PYYsusQ_T793BnXmqdS-sZP2YLsW-Yh-F7-9uJBcCX-E0m4rww6r0wisAnuwAqtj8TbaHbS2oKUcnKlwiVZRLrNJjW6t2luZWuCVSUaSxNzzhPu95rEzlXb_pMc5BZyhncCEhvDbEPGHh_kFuWJtGmUjTzZqegKwRWx6mH4pT9c4dSLFROD0XiVV1E6Nm4ltyhwh44mBxn4GMcz-ZgbCp-rxT026J1hHFuwnPt1M" />
              <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold">Litera<span className="text-primary">Digital</span></span>
            </Link>
          </div>
          <div className="flex items-center gap-space-md shrink-0">
            <Link to="/keranjang" className="relative p-space-sm rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
              {cartItems.length > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-primary-container text-on-primary-container font-label-sm text-caption shadow-[0_0_12px_rgba(124,58,237,0.5)]">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <div className="relative group flex items-center">
              <div className="flex items-center gap-space-sm pl-space-sm py-space-xs rounded-lg hover:bg-surface-container-high/50 transition-colors cursor-pointer">
                <img alt="User Avatar" className="w-8 h-8 rounded-full object-cover ring-1 ring-primary/40" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3coyPznlPdOjrxGmTVDH4P1y59poKhZyT8ytjsgEmz31CxaOXQL2kAdxa5tE9FWZQ69EYM2pT0b2Bv0lLJ4IY7WVh6kwdewK3QqbRE1B4rOLMO-HjcVwWQVBunUO9vQjqKHLbdOFQXhBBu0NEsvl9g41EBVcBpzATPzTS_uYp_PgQpBexKsTgiTj0Gnl2SwH55y0jKGLEj9GPOiiZqNwjCo6sgGRFV4MIKpru0n8mmijp-6YZdGXW9Q" />
                <div className="hidden sm:flex items-center gap-space-xs">
                  <span className="font-label-md text-label-md text-on-surface font-medium">Rian Pratama</span>
                  <span className="material-symbols-outlined text-outline text-[18px]">keyboard_arrow_down</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full bg-surface-container-lowest min-h-screen pt-4">
        <div className="w-full px-margin-mobile md:px-margin max-w-7xl mx-auto flex flex-col gap-space-xl pb-space-xl">

          {/* Top Progress Stepper */}
          <div className="w-full pt-space-md">
            <div className="flex flex-col md:flex-row items-center justify-between gap-space-lg bg-surface-container-low p-space-md md:p-space-lg rounded-xl shadow-md">
              <div className="flex items-center gap-space-sm w-full md:w-auto opacity-70">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-container-highest text-primary font-label-md text-label-md">
                  <span className="material-symbols-outlined text-[18px]">check</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface">1. Keranjang Belanja</span>
                  <span className="font-caption text-caption text-outline">{selectedItems.length} Ebook Terpilih</span>
                </div>
              </div>
              <div className="hidden md:block flex-1 h-[2px] bg-primary-container/30 mx-space-sm"></div>
              <div className="flex items-center gap-space-sm w-full md:w-auto relative">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-container text-on-primary-container font-label-md text-label-md shadow-[0_0_16px_rgba(124,58,237,0.7)] animate-pulse">
                  2
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-primary font-bold">2. Pembayaran Simulasi</span>
                  <span className="font-caption text-caption text-secondary">LiteraPay Gateway Sandbox</span>
                </div>
              </div>
              <div className="hidden md:block flex-1 h-[2px] bg-surface-container-highest mx-space-sm"></div>
              <div className="flex items-center gap-space-sm w-full md:w-auto opacity-50">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-container-highest text-outline font-label-md text-label-md">
                  3
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface-variant">3. Akses Perpustakaan</span>
                  <span className="font-caption text-caption text-outline">Aktivasi Otomatis</span>
                </div>
              </div>
            </div>

            {/* Sandbox Notification Banner */}
            <div className="mt-space-md p-space-md rounded-xl bg-surface-container-low flex items-start sm:items-center gap-space-md shadow-sm">
              <div className="flex items-center justify-center p-space-xs rounded-lg bg-tertiary-container text-on-tertiary-container shrink-0">
                <span className="material-symbols-outlined text-[20px]">science</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-space-xs">
                  <span className="font-label-md text-label-md text-tertiary font-bold tracking-wide uppercase">Mode Sandbox Simulasi Pembayaran</span>
                  <span className="px-space-xs py-[2px] rounded text-[10px] bg-tertiary/20 text-tertiary font-medium">Bebas Resiko</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">
                  Tidak ada saldo bank riil atau kartu kredit nyata yang akan dipotong. Fitur ini dirancang khusus untuk memvalidasi alur checkout instan dan penerbitan lisensi ebook digital LiteraDigital.
                </p>
              </div>
            </div>
          </div>

          {/* Main Content Layout Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">

            {/* Left Column: Payment Methods & Sandbox Controller */}
            <div className="lg:col-span-7 flex flex-col gap-space-lg">
              {/* Payment Methods Switcher Card */}
              <div className="bg-surface-container rounded-xl p-space-md md:p-space-lg shadow-xl flex flex-col gap-space-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
                  <div>
                    <span className="font-caption text-caption uppercase tracking-wider text-outline font-semibold">Pilih Saluran Pembayaran</span>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface mt-space-xs">Metode Pembayaran Digital</h2>
                  </div>
                  <div className="flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-space-xs rounded-full self-start sm:self-auto">
                    <span className="material-symbols-outlined text-tertiary text-[18px]">timer</span>
                    <span className="font-caption text-caption text-on-surface-variant">Selesaikan dalam:</span>
                    <span className="font-label-md text-label-md text-tertiary font-mono font-bold tracking-wider">{formatTime(timeLeft)}</span>
                  </div>
                </div>

                {/* Method Tabs */}
                <div className="grid grid-cols-3 gap-space-xs bg-surface-container-lowest p-space-xs rounded-xl">
                  <button onClick={() => setActiveMethod('va')} className={`flex flex-col sm:flex-row items-center justify-center gap-space-xs py-space-sm px-space-xs rounded-lg transition-all ${activeMethod === 'va' ? 'bg-surface-container text-primary shadow-[0_0_16px_rgba(124,58,237,0.3)]' : 'text-on-surface-variant hover:text-on-surface'}`} type="button">
                    <span className="material-symbols-outlined text-[20px]">account_balance</span>
                    <span className="font-label-md text-label-md font-semibold">Virtual Account</span>
                  </button>
                  <button onClick={() => setActiveMethod('qris')} className={`flex flex-col sm:flex-row items-center justify-center gap-space-xs py-space-sm px-space-xs rounded-lg transition-all ${activeMethod === 'qris' ? 'bg-surface-container text-primary shadow-[0_0_16px_rgba(124,58,237,0.3)]' : 'text-on-surface-variant hover:text-on-surface'}`} type="button">
                    <span className="material-symbols-outlined text-[20px]">qr_code_2</span>
                    <span className="font-label-md text-label-md font-semibold">QRIS / E-Wallet</span>
                  </button>
                  <button onClick={() => setActiveMethod('cc')} className={`flex flex-col sm:flex-row items-center justify-center gap-space-xs py-space-sm px-space-xs rounded-lg transition-all ${activeMethod === 'cc' ? 'bg-surface-container text-primary shadow-[0_0_16px_rgba(124,58,237,0.3)]' : 'text-on-surface-variant hover:text-on-surface'}`} type="button">
                    <span className="material-symbols-outlined text-[20px]">credit_card</span>
                    <span className="font-label-md text-label-md font-semibold">Kartu Kredit</span>
                  </button>
                </div>

                {/* Panel 1: Virtual Account */}
                {activeMethod === 'va' && (
                  <div className="flex flex-col gap-space-md animate-in fade-in zoom-in-95 duration-200">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm">
                      {[
                        { name: 'BCA', code: 'bca', va: '8271 0812 8920 4100', color: 'text-secondary', desc: 'Verifikasi Cepat' },
                        { name: 'Mandiri', code: 'mandiri', va: '8910 4402 9912 3211', color: 'text-primary', desc: 'Otomatis 24 Jam' },
                        { name: 'BNI', code: 'bni', va: '9881 2094 1184 7729', color: 'text-tertiary', desc: 'Bebas Admin' },
                        { name: 'BRI', code: 'bri', va: '1288 0199 4402 1209', color: 'text-secondary-fixed', desc: 'BRIVA Virtual' }
                      ].map(bank => (
                        <label key={bank.code} className="cursor-pointer">
                          <input
                            type="radio"
                            name="bank_selection"
                            value={bank.code}
                            checked={selectedBank.code === bank.code}
                            onChange={() => {
                              setSelectedBank({ name: bank.name, code: bank.code, va: bank.va });
                              showToast(`Metode Bank berganti ke ${bank.name}`);
                            }}
                            className="peer sr-only"
                          />
                          <div className="p-space-sm rounded-xl bg-surface-container-low peer-checked:bg-surface-container-highest peer-checked:shadow-[0_0_12px_rgba(124,58,237,0.4)] flex flex-col items-center justify-center gap-space-xs transition-all border border-transparent peer-checked:border-primary/20">
                            <span className={`font-headline-sm text-headline-sm font-black tracking-widest uppercase ${bank.color}`}>{bank.name}</span>
                            <span className="font-caption text-caption text-outline text-center">{bank.desc}</span>
                          </div>
                        </label>
                      ))}
                    </div>

                    <div className="p-space-md rounded-xl bg-surface-container-lowest flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md shadow-inner border border-surface-container-high">
                      <div className="flex flex-col">
                        <span className="font-caption text-caption text-outline uppercase tracking-wider">Nomor Virtual Account {selectedBank.name}</span>
                        <span className="font-headline-md text-headline-md font-mono font-bold text-on-surface tracking-wider mt-1">{selectedBank.va}</span>
                        <span className="font-caption text-caption text-outline mt-1">Nama Rekening: <strong className="text-on-surface-variant font-medium">LITERADIGITAL INDONESIA</strong></span>
                      </div>
                      <button onClick={handleCopyVa} className="w-full sm:w-auto px-space-md py-space-sm rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-primary font-label-md text-label-md flex items-center justify-center gap-space-xs transition-all shadow-sm" type="button">
                        <span className="material-symbols-outlined text-[18px]">content_copy</span>
                        <span>Salin Nomor</span>
                      </button>
                    </div>

                    <div className="flex flex-col gap-space-xs pt-space-xs">
                      <span className="font-label-md text-label-md text-on-surface font-semibold mb-space-xs">Panduan Pembayaran Ringkas</span>
                      <details className="group bg-surface-container-low rounded-lg p-space-sm transition-all border border-surface-container-high" open>
                        <summary className="flex items-center justify-between cursor-pointer list-none font-label-md text-label-md text-on-surface font-medium">
                          <div className="flex items-center gap-space-xs">
                            <span className="material-symbols-outlined text-primary text-[18px]">smartphone</span>
                            <span>Transfer via Mobile Banking</span>
                          </div>
                          <span className="material-symbols-outlined text-outline group-open:rotate-180 transition-transform text-[20px]">expand_more</span>
                        </summary>
                        <div className="pt-space-sm pl-6 text-on-surface-variant font-body-sm text-body-sm flex flex-col gap-1 leading-relaxed">
                          <p>1. Buka aplikasi M-Banking Anda dan pilih menu <strong>Transfer {'>'} Virtual Account</strong>.</p>
                          <p>2. Masukkan nomor tagihan di atas dan tekan <strong>Lanjut</strong>.</p>
                          <p>3. Konfirmasi total tagihan Rp {total.toLocaleString('id-ID')}, lalu masukkan PIN transaksi Anda.</p>
                        </div>
                      </details>
                      <details className="group bg-surface-container-low rounded-lg p-space-sm transition-all border border-surface-container-high">
                        <summary className="flex items-center justify-between cursor-pointer list-none font-label-md text-label-md text-on-surface font-medium">
                          <div className="flex items-center gap-space-xs">
                            <span className="material-symbols-outlined text-primary text-[18px]">local_atm</span>
                            <span>Transfer via Mesin ATM Terdekat</span>
                          </div>
                          <span className="material-symbols-outlined text-outline group-open:rotate-180 transition-transform text-[20px]">expand_more</span>
                        </summary>
                        <div className="pt-space-sm pl-6 text-on-surface-variant font-body-sm text-body-sm flex flex-col gap-1 leading-relaxed">
                          <p>1. Masukkan kartu ATM dan PIN rahasia Anda.</p>
                          <p>2. Pilih menu <strong>Transaksi Lainnya {'>'} Pembayaran {'>'} Pembayaran Lainnya {'>'} Virtual Account</strong>.</p>
                          <p>3. Ketikkan nomor Virtual Account, lalu selesaikan pembayaran.</p>
                        </div>
                      </details>
                    </div>
                  </div>
                )}

                {/* Panel 2: QRIS */}
                {activeMethod === 'qris' && (
                  <div className="flex flex-col items-center text-center gap-space-md py-space-sm animate-in fade-in zoom-in-95 duration-200">
                    <span className="font-body-md text-body-md text-on-surface-variant max-w-md">
                      Pindai kode QRIS dengan GoPay, OVO, ShopeePay, DANA, atau aplikasi M-Banking pendukung QRIS nasional.
                    </span>
                    <div className="relative p-space-md rounded-2xl bg-surface-container-lowest shadow-[0_0_32px_rgba(124,58,237,0.35)] flex flex-col items-center">
                      <div className="relative w-48 h-48 bg-surface-container p-space-sm rounded-xl flex items-center justify-center">
                        <svg className="w-full h-full text-on-surface" fill="currentColor" viewBox="0 0 100 100">
                          <path d="M0,0 h30 v30 h-30 z M6,6 v18 h18 v-18 z M10,10 h10 v10 h-10 z" />
                          <path d="M70,0 h30 v30 h-30 z M76,6 v18 h18 v-18 z M80,10 h10 v10 h-10 z" />
                          <path d="M0,70 h30 v30 h-30 z M6,76 v18 h18 v-18 z M10,80 h10 v10 h-10 z" />
                          <circle className="text-primary-container fill-current" cx="50" cy="50" r="10" />
                          <path d="M35,10 h10 v10 h-10 z M50,15 h8 v5 h-8 z M40,25 h15 v5 h-15 z" />
                          <path d="M15,40 h15 v5 h-15 z M35,45 h10 v10 h-10 z M60,40 h12 v10 h-12 z" />
                          <path d="M40,65 h12 v8 h-12 z M65,60 h10 v15 h-10 z M80,45 h12 v8 h-12 z" />
                          <path d="M45,85 h20 v8 h-20 z M75,80 h15 v10 h-15 z" />
                        </svg>
                        <div className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-lg border border-surface-container-high">
                          <span className="material-symbols-outlined text-primary text-[20px]">auto_stories</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-space-sm mt-space-sm">
                        <span className="font-label-sm text-label-sm px-space-sm py-1 rounded bg-surface-container-high text-secondary">NMID: ID10293847291</span>
                        <span className="font-label-sm text-label-sm px-space-sm py-1 rounded bg-surface-container-high text-outline">Dicetak Otomatis</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-space-md text-outline flex-wrap">
                      <span className="font-label-md text-label-md font-semibold text-secondary">GoPay</span>
                      <span>•</span>
                      <span className="font-label-md text-label-md font-semibold text-primary">OVO</span>
                      <span>•</span>
                      <span className="font-label-md text-label-md font-semibold text-secondary-fixed">DANA</span>
                      <span>•</span>
                      <span className="font-label-md text-label-md font-semibold text-on-surface">LinkAja</span>
                    </div>
                  </div>
                )}

                {/* Panel 3: Credit Card */}
                {activeMethod === 'cc' && (
                  <div className="flex flex-col gap-space-md animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-space-md rounded-xl bg-gradient-to-tr from-surface-container-lowest via-surface-container-low to-surface-container-high relative overflow-hidden shadow-lg border border-surface-container-high">
                      <div className="flex items-center justify-between mb-space-lg">
                        <span className="material-symbols-outlined text-secondary text-[32px]">credit_card</span>
                        <span className="font-headline-sm text-headline-sm font-bold tracking-widest text-primary italic">LITERA SIMULATOR</span>
                      </div>
                      <div className="font-headline-sm text-headline-sm font-mono tracking-widest text-on-surface mb-space-md">
                        4000 1234 5678 9010
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <span className="font-caption text-caption text-outline block">PEMEGANG KARTU</span>
                          <span className="font-label-md text-label-md text-on-surface font-semibold">RIAN PRATAMA (TESTER)</span>
                        </div>
                        <div>
                          <span className="font-caption text-caption text-outline block">KEDALUWARSA</span>
                          <span className="font-label-md text-label-md text-on-surface font-mono">12/29</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                      <div className="flex flex-col gap-space-xs">
                        <label className="font-label-sm text-label-sm text-outline">Nomor Kartu Dummy</label>
                        <input className="w-full bg-surface-container-lowest px-space-md py-space-sm rounded-lg text-on-surface font-mono font-body-sm text-body-sm focus:outline-none border border-surface-container-high" readOnly type="text" value="4000 1234 5678 9010" />
                      </div>
                      <div className="grid grid-cols-2 gap-space-sm">
                        <div className="flex flex-col gap-space-xs">
                          <label className="font-label-sm text-label-sm text-outline">Bulan / Tahun</label>
                          <input className="w-full bg-surface-container-lowest px-space-md py-space-sm rounded-lg text-on-surface font-mono font-body-sm text-body-sm focus:outline-none text-center border border-surface-container-high" readOnly type="text" value="12 / 29" />
                        </div>
                        <div className="flex flex-col gap-space-xs">
                          <label className="font-label-sm text-label-sm text-outline">CVV Sim</label>
                          <input className="w-full bg-surface-container-lowest px-space-md py-space-sm rounded-lg text-on-surface font-mono font-body-sm text-body-sm focus:outline-none text-center border border-surface-container-high" readOnly type="text" value="888" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sandbox Controller Gateway Simulation Card */}
              <div className="bg-surface-container rounded-xl p-space-md md:p-space-lg shadow-xl flex flex-col gap-space-md relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-3 h-3 rounded-full bg-secondary shadow-[0_0_10px_rgba(173,198,255,0.8)] animate-ping"></div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">Simulator Gateway LiteraPay</h3>
                  </div>
                  <span className="font-label-sm text-label-sm px-space-sm py-1 rounded-full bg-surface-container-high text-secondary border border-surface-container-highest">
                    TLS 1.3 Terenkripsi
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Picu sinyal *webhook* pembayaran secara instan untuk mensimulasikan respons sistem *real-time*, baik skenario sukses pengiriman lisensi maupun skenario transaksi gagal.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md pt-space-xs">
                  <button onClick={() => simulatePayment(true)} className="group relative flex flex-col items-center justify-center p-space-md rounded-xl bg-gradient-to-r from-primary-container to-secondary-container text-on-primary-container font-label-md text-label-md font-bold shadow-[0_0_24px_rgba(124,58,237,0.45)] hover:shadow-[0_0_36px_rgba(124,58,237,0.7)] transition-all" type="button">
                    <div className="flex items-center gap-space-xs mb-1">
                      <span className="material-symbols-outlined text-[24px]">verified</span>
                      <span className="text-base tracking-wide">Simulasikan Berhasil</span>
                    </div>
                    <span className="font-caption text-caption text-on-primary-container/80 text-center font-normal">Keluarkan lisensi & redirect ke pembaca</span>
                  </button>
                  <button onClick={() => simulatePayment(false)} className="group relative flex flex-col items-center justify-center p-space-md rounded-xl bg-surface-container-high hover:bg-surface-container-highest border border-surface-container-highest text-on-surface font-label-md text-label-md transition-all" type="button">
                    <div className="flex items-center gap-space-xs mb-1 text-error">
                      <span className="material-symbols-outlined text-[24px]">cancel</span>
                      <span className="text-base tracking-wide">Simulasikan Gagal</span>
                    </div>
                    <span className="font-caption text-caption text-outline text-center font-normal">Uji skenario saldo minim atau kedaluwarsa</span>
                  </button>
                </div>

                {/* Processing Overlay */}
                {isProcessing && (
                  <div className="absolute inset-0 bg-surface-container/95 backdrop-blur-sm flex flex-col items-center justify-center gap-space-sm z-20 rounded-xl">
                    <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold">Memverifikasi Sinyal Mock...</span>
                    <span className="font-caption text-caption text-outline">Menghubungi endpoint /api/v1/webhook-simulator</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-5 flex flex-col gap-space-lg lg:sticky lg:top-24">
              <div className="bg-surface-container rounded-xl p-space-md md:p-space-lg shadow-2xl flex flex-col gap-space-md">
                <div className="flex items-center justify-between pb-space-sm border-b border-surface-container-high">
                  <div>
                    <span className="font-caption text-caption uppercase tracking-wider text-outline font-semibold">Faktur Pesanan</span>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">Ringkasan Pembayaran</h2>
                  </div>
                  <span className="font-label-sm text-label-sm font-mono px-space-sm py-1 rounded bg-surface-container-lowest border border-surface-container-high text-primary">
                    #ORD-{new Date().toISOString().slice(0, 10).replace(/-/g, '')}-{Math.floor(Math.random() * 10000)}
                  </span>
                </div>

                <div className="flex flex-col gap-space-md max-h-[40vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-surface-container-highest scrollbar-track-transparent">
                  {selectedItems.map((book) => (
                    <div key={book.id} className="flex gap-space-md bg-surface-container-low p-space-sm rounded-lg border border-surface-container-high">
                      <div className="w-16 h-22 shrink-0 rounded overflow-hidden shadow-md bg-surface-container-lowest">
                        <img className="w-full h-full object-cover" src={book.coverImage} alt={book.title} />
                      </div>
                      <div className="flex flex-col justify-between flex-1 min-w-0">
                        <div>
                          <div className="flex items-center gap-space-xs mb-1">
                            <span className="px-space-xs py-[2px] rounded text-[10px] bg-primary/10 text-primary font-bold border border-primary/20">
                              {book.format}
                            </span>
                          </div>
                          <h4 className="font-label-md text-label-md text-on-surface font-semibold truncate" title={book.title}>{book.title}</h4>
                          <p className="font-caption text-caption text-outline truncate">{book.author}</p>
                        </div>
                        <div className="flex items-center justify-between mt-space-xs">
                          <span className="font-price-md text-price-md text-on-surface">Rp {book.price.toLocaleString('id-ID')}</span>
                          <span className="font-caption text-caption text-secondary">{book.edition}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-space-xs">
                  <label className="font-caption text-caption text-outline mb-1 block">Kode Promo / Kupon Pengembang</label>
                  <div className="flex gap-space-xs">
                    <div className="relative flex-1">
                      <span className="material-symbols-outlined absolute left-3 top-2.5 text-primary text-[18px]">loyalty</span>
                      <input
                        className="w-full bg-surface-container-lowest pl-9 pr-3 py-2 rounded-lg font-mono font-label-md text-label-md text-primary tracking-wide uppercase focus:outline-none border border-surface-container-high focus:border-primary"
                        type="text"
                        value={localPromo}
                        onChange={(e) => setLocalPromo(e.target.value)}
                        placeholder="KODE KUPON"
                      />
                    </div>
                    <button onClick={handleApplyCoupon} className="px-space-md py-2 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md transition-colors" type="button">
                      Terapkan
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-space-xs pt-space-sm bg-surface-container-lowest/50 p-space-md rounded-xl border border-surface-container-high">
                  <div className="flex justify-between items-center text-on-surface-variant font-body-sm text-body-sm">
                    <span>Subtotal Produk ({selectedItems.length} Buku)</span>
                    <span className="text-on-surface font-medium">Rp {subtotal.toLocaleString('id-ID')}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between items-center text-on-surface-variant font-body-sm text-body-sm">
                      <span className="flex items-center gap-1 text-primary">
                        <span className="material-symbols-outlined text-[16px]">check_circle</span> Diskon Kupon ({promoCode.toUpperCase()})
                      </span>
                      <span className="text-primary font-medium">-Rp {discount.toLocaleString('id-ID')}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-on-surface-variant font-body-sm text-body-sm">
                    <span>Biaya Layanan Digital</span>
                    <div className="flex items-center gap-space-xs">
                      <span className="line-through text-outline text-[12px]">Rp 1.000</span>
                      <span className="text-secondary font-medium">Gratis Promo</span>
                    </div>
                  </div>
                  <div className="my-space-xs h-[1px] bg-surface-container-highest"></div>
                  <div className="flex justify-between items-baseline pt-1">
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-on-surface font-bold">Total Pembayaran</span>
                      <span className="font-caption text-caption text-outline">Termasuk Pajak Digital PPN 11%</span>
                    </div>
                    <span className="font-price-lg text-price-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-black">
                      Rp {total.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-space-xs pt-space-xs">
                  <div className="flex items-start gap-space-xs">
                    <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">verified_user</span>
                    <span className="font-caption text-caption text-on-surface-variant leading-relaxed">
                      <strong>Lisensi Legal DRM-Free:</strong> Terbit langsung atas nama akun <span className="text-on-surface font-medium">Rian Pratama</span>.
                    </span>
                  </div>
                  <div className="flex items-start gap-space-xs">
                    <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">cloud_download</span>
                    <span className="font-caption text-caption text-on-surface-variant leading-relaxed">
                      <strong>Garansi Unduhan Seumur Hidup:</strong> Unduh berkas format EPUB & PDF sewaktu-waktu tanpa batas frekuensi.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-surface-container-lowest/85 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-surface-container max-w-lg w-full p-space-xl rounded-2xl shadow-2xl flex flex-col items-center text-center gap-space-md relative overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container shadow-[0_0_36px_rgba(124,58,237,0.7)] animate-bounce">
                <span className="material-symbols-outlined text-[44px]">task_alt</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-caption text-caption uppercase tracking-widest text-primary font-bold">Simulasi Berhasil Diverifikasi</span>
                <h3 className="font-headline-lg text-headline-lg text-on-surface">Pembayaran Diterima!</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
                  Gateway Sandbox menerima konfirmasi pembayaran senilai <strong className="text-on-surface">Rp {total.toLocaleString('id-ID')}</strong>. Lisensi untuk {selectedItems.length} ebook Anda telah aktif.
                </p>
              </div>
              <div className="w-full bg-surface-container-lowest p-space-md rounded-xl flex flex-col gap-space-xs text-left border border-surface-container-high">
                <div className="flex justify-between font-body-sm text-body-sm">
                  <span className="text-outline">ID Lisensi</span>
                  <span className="text-primary font-mono font-bold">LIT-LIC-{Math.floor(Math.random() * 90000) + 10000}-OK</span>
                </div>
                <div className="flex justify-between font-body-sm text-body-sm">
                  <span className="text-outline">Waktu Transaksi</span>
                  <span className="text-on-surface">{transactionTime}</span>
                </div>
                <div className="flex justify-between font-body-sm text-body-sm">
                  <span className="text-outline">Status Sinkronisasi</span>
                  <span className="text-secondary font-medium flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span> Tersedia di Cloud Reader
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-space-sm w-full pt-space-xs">
                <button onClick={handleFinish} className="flex-1 py-space-sm px-space-md rounded-lg bg-primary-container hover:bg-primary-container/90 text-on-primary-container font-label-md text-label-md font-bold flex items-center justify-center gap-space-xs shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all">
                  <span className="material-symbols-outlined text-[20px]">local_library</span>
                  <span>Buka Perpustakaan Saya</span>
                </button>
                <button onClick={closeModals} className="py-space-sm px-space-md rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md transition-colors" type="button">
                  Tutup Dialog
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Failure Modal */}
        {showFailureModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-surface-container-lowest/85 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-surface-container max-w-lg w-full p-space-xl rounded-2xl shadow-2xl flex flex-col items-center text-center gap-space-md animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 rounded-full bg-error-container flex items-center justify-center text-on-error-container shadow-[0_0_36px_rgba(255,180,171,0.3)]">
                <span className="material-symbols-outlined text-[44px]">error_outline</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-caption text-caption uppercase tracking-widest text-error font-bold">Simulasi Gateway Error</span>
                <h3 className="font-headline-lg text-headline-lg text-on-surface">Transaksi Ditolak</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
                  Kode Simulasi: <code className="text-error bg-surface-container-lowest px-1 py-0.5 rounded font-mono border border-error/20">ERR_SIMULATED_EXPIRED_OR_DECLINED</code>. Tagihan dibatalkan sesuai skenario pengujian sandbox.
                </p>
              </div>
              <div className="w-full bg-surface-container-lowest p-space-md rounded-xl text-left text-on-surface-variant font-body-sm text-body-sm border border-surface-container-high">
                <p>Skenario ini mensimulasikan kondisi kegagalan pembayaran seperti saldo tidak mencukupi, timeout jaringan bank, atau kadaluarsa batas waktu transfer.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-space-sm w-full pt-space-xs">
                <button onClick={closeModals} className="flex-1 py-space-sm px-space-md rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md font-semibold transition-colors" type="button">
                  Ulangi Simulasi
                </button>
                <Link to="/keranjang" className="py-space-sm px-space-md rounded-lg bg-surface-container-lowest text-outline hover:text-on-surface font-label-md text-label-md flex items-center justify-center border border-surface-container-high">
                  Kembali ke Keranjang
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
