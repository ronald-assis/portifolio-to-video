'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center bg-neutral-950 text-white overflow-hidden">
      {/* Gradiente para simular ambiente premium */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-neutral-950 z-10" />
      
      {/* Imagem de Fundo (Substitua por um frame bonito ou vídeo) */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-50" />
      </div>
      
      <div className="z-20 px-4 max-w-4xl">
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-blue-400 font-medium tracking-[0.3em] uppercase text-sm md:text-base"
        >
          Filmmaker & Storyteller
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mt-4 mb-6 leading-tight"
        >
          Eternizando seus <br/>melhores momentos
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4 justify-center mt-8"
        >
          <Link
            href="/videos"
            className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition duration-300"
          >
            Ver Portfólio
          </Link>
          <Link
            href="/contact"
            className="border border-white/30 backdrop-blur-sm text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition duration-300"
          >
            Falar Comigo
          </Link>
        </motion.div>
      </div>
    </section>
  );
}