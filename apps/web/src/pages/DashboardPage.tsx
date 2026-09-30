import React from 'react';
import { Header } from '../components/dashboard/Header';
import { HeroBanner } from '../components/dashboard/HeroBanner';
import { CategoryGrid } from '../components/dashboard/CategoryGrid';
import { NewArrivals } from '../components/dashboard/NewArrivals';
import { FlashSale } from '../components/dashboard/FlashSale';
import { Bestsellers } from '../components/dashboard/Bestsellers';
import { Footer } from '../components/dashboard/Footer';

export const DashboardPage: React.FC = () => {
  return (
    <div className="w-full">
      <Header />
      <main className="w-full bg-surface-container-lowest min-h-screen">
        <div className="flex flex-col w-full pb-space-xl overflow-hidden">
          <HeroBanner />
          <CategoryGrid />
          <NewArrivals />
          <FlashSale />
          <Bestsellers />
        </div>
      </main>
      <Footer />
    </div>
  );
};
