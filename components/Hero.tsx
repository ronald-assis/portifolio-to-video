// components/Hero.tsx
import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/thumbs/roots.png"
          alt="Casal se abraçando em um campo"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-transparent" />
      </div>
      <div className="relative z-10 flex flex-col items-center px-6 max-w-4xl mx-auto">
        <p className="uppercase tracking-[0.3em] text-sm text-neutral-300 animate-fade-in-up">
          Filmes com alma e movimento
        </p>
        <h1 className="text-5xl md:text-7xl font-bold mt-4 leading-tight animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Memórias que você pode sentir
        </h1>
        <p className="text-neutral-300 mt-6 text-lg max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          Narrativas sensíveis e cinematografia autoral para casamentos, debutantes e eventos que merecem ser eternizados.
        </p>
        <div className="flex flex-wrap gap-4 mt-10 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <Link
            href="/contact"
            className="px-8 py-3 rounded-full bg-white text-black font-semibold tracking-wide hover:bg-neutral-200 transition-transform hover:scale-105"
          >
            Solicitar Orçamento
          </Link>
          <Link
            href="/videos"
            className="px-8 py-3 rounded-full border border-white/30 text-white font-semibold tracking-wide hover:bg-white/10 transition-transform hover:scale-105"
          >
            Ver Portfólio
          </Link>
        </div>
      </div>
    </section>
  );
}
