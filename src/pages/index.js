import React from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import FancyCarousel from '@/Components/Fancycomponent';

const inter = Inter({ subsets: ['latin'] });

const images = [
  'https://dummyimage.com/400x400/000000/ffffff&text=Frank',
  'https://dummyimage.com/400x400/000000/ffffff&text=Slate',
  'https://dummyimage.com/400x400/000000/ffffff&text=Sandy',
];

const Home = () => {
  return (
    <main className={`min-h-screen bg-slate-100 ${inter.className}`}>
      <h1>Hello</h1>
      <FancyCarousel images={images} autoRotateTime={3}  />
    </main>
  );
};

export default Home;
