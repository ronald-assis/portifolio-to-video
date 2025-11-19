'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);
  
  const closeMenu = () => setIsMenuOpen(false);
  
  return (
    <>
      <nav className="fixed w-full z-50 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-lg border-b border-gray-200 dark:border-neutral-800 transition-colors">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" onClick={closeMenu} className="text-xl font-bold tracking-tighter text-neutral-900 dark:text-white z-10">
            RONALD<span className="text-blue-500">.FILMS</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="/videos" className="text-sm font-medium hover:text-blue-500 dark:text-gray-300 dark:hover:text-white transition-colors">
              PORTFÓLIO
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-blue-500 dark:text-gray-300 dark:hover:text-white transition-colors">
              CONTATO
            </Link>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-neutral-800 dark:text-neutral-200"
              aria-label="Abrir menu"
            >
              <FiMenu size={24} />
            </button>
          </div>
        </div>
      </nav>
      
      <div
        className={`fixed inset-0 z-[100] bg-neutral-950/95 backdrop-blur-xl transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end p-6">
          <button onClick={closeMenu} aria-label="Fechar menu">
            <FiX size={28} className="text-neutral-400" />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center h-full -mt-16 text-center gap-8">
          <Link href="/videos" onClick={closeMenu} className="text-2xl font-semibold text-neutral-200 hover:text-blue-400">
            PORTFÓLIO
          </Link>
          <Link href="/contact" onClick={closeMenu} className="text-2xl font-semibold text-neutral-200 hover:text-blue-400">
            CONTATO
          </Link>
          <Link
            href="/contact"
            onClick={closeMenu}
            className="mt-8 px-8 py-3 rounded-full bg-white text-black font-semibold tracking-wide"
          >
            Solicitar Orçamento
          </Link>
        </div>
      </div>
    </>
  );
}
