import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Mode = 'login' | 'register';

export const AuthForm: React.FC = () => {
  const [mode, setMode] = useState<Mode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-center bg-[#111827] relative">
      {/* Top Brand Logo */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-700/80 p-2 flex items-center justify-center shadow-lg shadow-black/40">
          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="#7C3AED" strokeLinecap="round" strokeWidth="2"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="#3B82F6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            <circle cx="12" cy="10" fill="#7C3AED" r="2"></circle>
          </svg>
        </div>
        <div>
          <span className="font-headline-sm text-xl font-bold tracking-tight text-white">
            Litera<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#3B82F6]">Digital</span>
          </span>
          <p className="text-xs text-slate-400">Toko Buku Digital Resmi</p>
        </div>
      </div>

      {/* Segmented Tab Switcher */}
      <div className="grid grid-cols-2 p-1 bg-[#0b0e17] rounded-xl mb-6 border border-slate-800/80">
        <button 
          type="button"
          onClick={() => setMode('login')}
          className={`py-2.5 text-center rounded-lg font-label-md text-sm transition-all duration-200 ${
            mode === 'login' 
              ? 'font-semibold bg-primary-container text-white shadow-[0_2px_12px_rgba(124,58,237,0.45)]' 
              : 'font-medium text-slate-400 hover:text-white'
          }`}
        >
          Masuk
        </button>
        <button 
          type="button"
          onClick={() => setMode('register')}
          className={`py-2.5 text-center rounded-lg font-label-md text-sm transition-all duration-200 ${
            mode === 'register' 
              ? 'font-semibold bg-primary-container text-white shadow-[0_2px_12px_rgba(124,58,237,0.45)]' 
              : 'font-medium text-slate-400 hover:text-white'
          }`}
        >
          Daftar Akun
        </button>
      </div>

      {/* Heading & Welcome Greeting */}
      <div className="mb-6">
        <h2 className="font-headline-md text-2xl font-bold text-white tracking-tight">
          {mode === 'login' ? 'Selamat Datang Kembali!' : 'Buat Akun Baru'}
        </h2>
        <p className="font-body-sm text-slate-400 text-sm mt-1">
          {mode === 'login' 
            ? 'Masukkan akun Anda untuk mengakses perpustakaan digital.' 
            : 'Mulai eksplorasi katalog literatur digital terbaik tanpa batas.'}
        </p>
      </div>

      {/* Main Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Field Nama Lengkap (Register Mode only) */}
        {mode === 'register' && (
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="input-name" className="font-label-sm text-xs font-medium text-slate-300">Nama Lengkap</label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-lg pointer-events-none">person</span>
              <input 
                id="input-name" 
                type="text" 
                placeholder="Nama lengkap Anda" 
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#0b0e17] text-white border border-slate-800 placeholder:text-slate-500 font-body-sm text-sm focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] focus:outline-none transition-colors"
              />
            </div>
          </div>
        )}

        {/* Field Email */}
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="input-email" className="font-label-sm text-xs font-medium text-slate-300">Alamat Email</label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-lg pointer-events-none">mail</span>
            <input 
              id="input-email" 
              type="email" 
              required 
              placeholder="nama@email.com" 
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#0b0e17] text-white border border-slate-800 placeholder:text-slate-500 font-body-sm text-sm focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Field Kata Sandi */}
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="input-password" className="font-label-sm text-xs font-medium text-slate-300">Kata Sandi</label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-lg pointer-events-none">lock</span>
            <input 
              id="input-password" 
              type={showPassword ? 'text' : 'password'}
              required={showPassword ? false : true} // Avoid validation warning if changing type, though simple boolean for now
              placeholder="••••••••" 
              className="w-full pl-11 pr-12 py-3 rounded-xl bg-[#0b0e17] text-white border border-slate-800 placeholder:text-slate-500 font-body-sm text-sm focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] focus:outline-none transition-colors"
            />
            <button 
              type="button"
              aria-label="Toggle password visibility" 
              className="absolute right-3.5 text-slate-400 hover:text-white transition-colors flex items-center justify-center p-1"
              onClick={() => setShowPassword(!showPassword)}
            >
              <span className="material-symbols-outlined text-lg">
                {showPassword ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          </div>
        </div>

        {/* Auxiliary Bar: Ingat Saya & Lupa Kata Sandi */}
        {mode === 'login' && (
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input 
                type="checkbox" 
                defaultChecked 
                className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-[#7C3AED] focus:ring-0 cursor-pointer accent-[#7C3AED]"
              />
              <span className="font-body-sm text-xs text-slate-400 hover:text-slate-300 transition-colors">Ingat Saya</span>
            </label>
            <a href="#" className="font-label-sm text-xs text-primary hover:text-primary-fixed transition-colors font-medium">Lupa Kata Sandi?</a>
          </div>
        )}

        {/* CTA Submit Button */}
        <button 
          type="submit" 
          className="w-full mt-2 py-3 px-6 rounded-xl font-label-md text-sm font-semibold text-white bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:opacity-95 hover:shadow-[0_0_24px_rgba(124,58,237,0.5)] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-purple-900/30"
        >
          <span>{mode === 'login' ? 'Masuk Sekarang' : 'Daftar Akun Baru'}</span>
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-6 flex items-center justify-center">
        <div className="w-full border-t border-slate-800"></div>
        <span className="absolute px-3 bg-[#111827] text-slate-400 font-caption text-xs uppercase tracking-wider">
          atau masuk dengan
        </span>
      </div>

      {/* Google Authentication Button */}
      <button 
        type="button" 
        className="w-full py-3 px-4 rounded-xl bg-[#0b0e17] hover:bg-slate-800/80 border border-slate-700/80 text-white font-label-md text-sm font-medium transition-colors flex items-center justify-center gap-3 shadow-sm"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" fill="#EA4335"></path>
          <path d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z" fill="#4285F4"></path>
          <path d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z" fill="#FBBC05"></path>
          <path d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z" fill="#34A853"></path>
        </svg>
        <span>Lanjutkan dengan Google</span>
      </button>

      {/* Bottom Switcher Text */}
      <div className="mt-6 text-center">
        <p className="font-body-sm text-xs sm:text-sm text-slate-400">
          {mode === 'login' ? (
            <>
              Belum punya akun?{' '}
              <button onClick={() => setMode('register')} type="button" className="text-primary font-semibold hover:underline ml-1">
                Daftar gratis sekarang
              </button>
            </>
          ) : (
            <>
              Sudah punya akun?{' '}
              <button onClick={() => setMode('login')} type="button" className="text-primary font-semibold hover:underline ml-1">
                Masuk di sini
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};
