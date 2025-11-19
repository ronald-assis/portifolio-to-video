import Link from 'next/link';
import { videos } from '@/data/videos';
import { Hero } from '@/components/Hero';
import { ContentSection } from '@/components/ContentSection';

// Stats - Standby
// const stats = [
//   { label: 'Projetos Filmados', value: '120+' },
//   { label: 'Anos de Experiência', value: '8+' },
//   { label: 'Clientes Satisfeitos', value: '95%' },
// ];

const testimonials = [
  {
    quote: 'Cada video capturou a emoção do nosso dia. O filme ainda nos arrepia. Profissionalismo e arte incríveis.',
    author: 'Ana & Felipe',
  },
  {
    quote: 'Quando eu vejo o filme me recordo de cada momento daquele evento incrivel.',
    author: 'Marcos',
  },
];

export default function HomePage() {
  const featuredVideos = videos.filter(v => v.orientation === 'horizontal').slice(0, 3);
  
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <Hero />
      
      {/* Stats */}
      {/* Standby */}
      {/*<section className="border-y border-white/10 py-12 bg-neutral-950/50">*/}
      {/*  <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">*/}
      {/*    {stats.map((item) => (*/}
      {/*      <div key={item.label}>*/}
      {/*        <p className="text-4xl font-bold text-white">{item.value}</p>*/}
      {/*        <p className="text-neutral-400 uppercase tracking-widest text-xs mt-1">*/}
      {/*          {item.label}*/}
      {/*        </p>*/}
      {/*      </div>*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*</section>*/}
      
      {/* Featured Videos */}
      <ContentSection>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Cinematografia Sensorial e Autoral
          </h2>
          <p className="text-neutral-400 mt-4">
            Uma pequena amostra de histórias que tive a honra de contar através das minhas lentes.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3 mt-12">
          {featuredVideos.map((video) => (
            <Link href="/videos" key={video.id} className="group text-left">
              <div className="relative overflow-hidden rounded-xl border border-white/10 aspect-video">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <span className="bg-white text-black w-12 h-12 rounded-full flex items-center justify-center pl-1 shadow-lg transform transition-transform group-hover:scale-110">
                     ▶
                   </span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mt-4 group-hover:text-blue-400 transition-colors">{video.title}</h3>
              <p className="text-sm text-neutral-400 uppercase tracking-wider">{video.category}</p>
            </Link>
          ))}
        </div>
      </ContentSection>
      
      {/* Testimonials */}
      <section className="bg-neutral-900 py-20 md:py-24">
        <ContentSection className="py-0">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold">
              A Experiência de Quem Viveu
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 mt-12 max-w-4xl mx-auto">
            {testimonials.map((item) => (
              <div key={item.author} className="p-8 rounded-xl border border-white/10 bg-white/5">
                <p className="text-lg italic text-neutral-200">“{item.quote}”</p>
                <p className="mt-4 font-semibold text-neutral-300">— {item.author}</p>
              </div>
            ))}
          </div>
        </ContentSection>
      </section>
      
      {/* CTA */}
      <ContentSection className="text-center">
        <h2 className="text-4xl md:text-5xl font-semibold">
          Vamos contar sua história?
        </h2>
        <p className="text-neutral-300 mt-6 text-lg max-w-3xl mx-auto">
          Se você busca um filme com alma, que vai além do registro e captura a verdadeira essência de cada momento, estou aqui para ajudar.
        </p>
        <div className="mt-10">
          <Link
            href="/contact"
            className="px-10 py-4 rounded-full bg-white text-black font-semibold tracking-wide hover:bg-neutral-200 transition-transform hover:scale-105 inline-block"
          >
            Receber uma Proposta
          </Link>
        </div>
      </ContentSection>
    </main>
  );
}
