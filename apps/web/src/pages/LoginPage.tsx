import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { AuthForm } from '../components/AuthForm';

export const LoginPage: React.FC = () => {
  return (
    <div className="w-full flex justify-center min-h-screen items-center p-4 sm:p-6 lg:p-10">
      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden border border-slate-800/80 bg-[#111827]/80 backdrop-blur-xl shadow-2xl min-h-[720px]">
        <HeroSection />
        <AuthForm />
      </main>
    </div>
  );
};
