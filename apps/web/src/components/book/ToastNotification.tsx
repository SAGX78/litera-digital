import React, { useEffect } from 'react';

export interface ToastState {
  isVisible: boolean;
  message: string;
  icon: string;
}

interface ToastNotificationProps {
  toast: ToastState;
  onHide: () => void;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({ toast, onHide }) => {
  useEffect(() => {
    if (toast.isVisible) {
      const timer = setTimeout(() => {
        onHide();
      }, 3200);
      return () => clearTimeout(timer);
    }
  }, [toast.isVisible, onHide]);

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-space-sm py-space-sm px-space-md rounded-lg bg-surface-container-high text-on-surface shadow-2xl transition-all duration-300 transform ${toast.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'}`}>
      <span className="material-symbols-outlined text-secondary text-[22px]">{toast.icon}</span>
      <span className="font-label-md text-label-md">{toast.message}</span>
    </div>
  );
};
