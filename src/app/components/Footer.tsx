// src/app/components/Footer.tsx
'use client';

import { FiHeart, FiCoffee } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="flex items-center">
              Made with 
              <FiHeart className="mx-2 text-red-500 animate-pulse" /> 
              and 
              <FiCoffee className="mx-2 text-yellow-500" />
          War Muzamil
            </p>
          </div>
          
          <div className="text-center md:text-right">
            <p>© {currentYear} All rights reserved.</p>
            {/* <p className="text-gray-400 text-sm mt-1">
              Built with Next.js, Tailwind CSS & Framer Motion
            </p> */}
          </div>
        </div>
      </div>
    </footer>
  );
}