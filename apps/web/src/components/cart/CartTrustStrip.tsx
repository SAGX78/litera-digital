import React from 'react';

export const CartTrustStrip: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
      <div className="p-4 rounded-xl bg-surface-container-low flex items-start gap-3 shadow-sm">
        <div className="w-9 h-9 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[20px]">bolt</span>
        </div>
        <div>
          <h4 className="font-label-md text-label-md text-on-surface font-semibold">Pengiriman Instan</h4>
          <p className="font-body-sm text-caption text-on-surface-variant mt-0.5">Langsung tersinkronisasi di rak buku setelah verifikasi.</p>
        </div>
      </div>
      <div className="p-4 rounded-xl bg-surface-container-low flex items-start gap-3 shadow-sm">
        <div className="w-9 h-9 rounded-lg bg-secondary-container/20 text-secondary flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[20px]">devices</span>
        </div>
        <div>
          <h4 className="font-label-md text-label-md text-on-surface font-semibold">Multi-Device Ready</h4>
          <p className="font-body-sm text-caption text-on-surface-variant mt-0.5">Buka di e-Reader, tablet, ponsel pintar, maupun peramban.</p>
        </div>
      </div>
      <div className="p-4 rounded-xl bg-surface-container-low flex items-start gap-3 shadow-sm">
        <div className="w-9 h-9 rounded-lg bg-tertiary-container/20 text-tertiary flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[20px]">support_agent</span>
        </div>
        <div>
          <h4 className="font-label-md text-label-md text-on-surface font-semibold">Bantuan Litera 24/7</h4>
          <p className="font-body-sm text-caption text-on-surface-variant mt-0.5">Dukungan kendala format dan pembacaan kapan pun.</p>
        </div>
      </div>
    </div>
  );
};
