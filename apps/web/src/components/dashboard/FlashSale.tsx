import React, { useState, useEffect } from 'react';

export const FlashSale: React.FC = () => {
  const [totalSeconds, setTotalSeconds] = useState(8 * 3600 + 42 * 60 + 15);

  useEffect(() => {
    const timer = setInterval(() => {
      setTotalSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  const hoursStr = String(h).padStart(2, '0');
  const minutesStr = String(m).padStart(2, '0');
  const secondsStr = String(s).padStart(2, '0');

  return (
    <section className="w-full px-margin-mobile md:px-margin mb-space-xl">
      <div className="relative w-full rounded-2xl bg-gradient-to-r from-tertiary-container/80 via-surface-container-high to-surface-container-lowest p-space-lg md:p-space-xl overflow-hidden shadow-[0_10px_35px_rgba(161,81,0,0.25)]">
        {/* Glow effect */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-tertiary/20 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-space-lg">
          <div className="flex flex-col items-start gap-space-xs text-center md:text-left">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-tertiary text-[24px]">local_fire_department</span>
              <span className="font-headline-sm text-headline-sm text-tertiary font-bold tracking-tight">Flash Sale Akhir Pekan</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-lg">
              Gunakan voucher khusus sebelum waktu habis dan nikmati potongan instan Rp 25.000 untuk minimal transaksi Rp 100.000.
            </p>
            <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 mt-space-xs rounded-full bg-surface-container-lowest/80 border border-outline-variant/30 backdrop-blur-md">
              <span className="material-symbols-outlined text-tertiary text-[18px]">confirmation_number</span>
              <span className="font-label-md text-label-md text-on-surface tracking-wider font-bold">KODE: LITERAHEMAT2026</span>
            </div>
          </div>
          {/* Countdown Timer */}
          <div className="flex flex-col sm:flex-row items-center gap-space-md">
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-center justify-center w-16 h-16 rounded-xl bg-surface-container-lowest/90 backdrop-blur-md shadow-lg">
                <span className="font-display-hero text-headline-md font-extrabold text-on-surface">{hoursStr}</span>
                <span className="text-[10px] text-outline font-semibold uppercase">Jam</span>
              </div>
              <span className="font-display-hero text-headline-md text-tertiary font-bold">:</span>
              <div className="flex flex-col items-center justify-center w-16 h-16 rounded-xl bg-surface-container-lowest/90 backdrop-blur-md shadow-lg">
                <span className="font-display-hero text-headline-md font-extrabold text-on-surface">{minutesStr}</span>
                <span className="text-[10px] text-outline font-semibold uppercase">Menit</span>
              </div>
              <span className="font-display-hero text-headline-md text-tertiary font-bold">:</span>
              <div className="flex flex-col items-center justify-center w-16 h-16 rounded-xl bg-surface-container-lowest/90 backdrop-blur-md shadow-lg">
                <span className="font-display-hero text-headline-md font-extrabold text-tertiary font-bold">{secondsStr}</span>
                <span className="text-[10px] text-outline font-semibold uppercase">Detik</span>
              </div>
            </div>
            <button className="w-full sm:w-auto px-space-lg py-3 rounded-lg bg-tertiary text-on-tertiary font-label-md text-label-md font-bold hover:brightness-110 shadow-[0_0_20px_rgba(255,183,132,0.4)] transition-all" type="button">
              Klaim Voucher
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
