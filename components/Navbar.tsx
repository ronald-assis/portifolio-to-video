'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [theme, setTheme] = useState('dark'); // Filmmakers geralmente preferem dark por padrão
  
  useEffect(() => {
    // Lógica de persistência
    const t = localStorage.getItem('theme') || 'dark';
    setTheme(t);
    document.documentElement.classList.toggle('dark', t === 'dark');
  }, []);
  
  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  }
  
  return (
    <nav className="fixed w-full z-50 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-sm border-b border-gray-200 dark:border-neutral-800 transition-colors">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter text-neutral-900 dark:text-white">
          RONALD<span className="text-blue-600">.FILMS</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link href="/videos" className="text-sm font-medium hover:text-blue-600 dark:text-gray-300 dark:hover:text-white transition">
            PORTFÓLIO
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-blue-600 dark:text-gray-300 dark:hover:text-white transition">
            CONTATO
          </Link>
          
          {/* Botão Toggle [cite: 51] */}
          <button
            onClick={toggle}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
            aria-label="Alternar tema"
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </nav>
  );
}