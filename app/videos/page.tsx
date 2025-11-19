'use client';

import { useState } from 'react';
import { videos } from '@/data/videos';
import { Video } from '@/types';
import ModalVideo from '@/components/ModalVideo';
import { motion } from 'framer-motion';

export default function VideosPage() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  
  // Separação automática baseada no seu arquivo de dados
  const horizontalVideos = videos.filter(v => v.orientation === 'horizontal');
  const verticalVideos = videos.filter(v => v.orientation === 'vertical');
  
  return (
    <div className="min-h-screen bg-neutral-950 text-white pb-20">
      {/* Cabeçalho com Título Elegante */}
      <div className="pt-28 pb-12 px-4 bg-gradient-to-b from-neutral-900 to-neutral-950 border-b border-neutral-800">
        <div className="container mx-auto max-w-6xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-3 tracking-tight"
          >
            Nossos <span className="text-blue-500">Filmes</span>
          </motion.h1>
          <p className="text-neutral-400 text-lg max-w-xl">
            Confira os melhores momentos dos nossos eventos e produções.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 max-w-6xl space-y-20 mt-12">
        
        {/* --- SEÇÃO 1: VÍDEOS DEITADOS (CINEMÁTICOS) --- */}
        {horizontalVideos.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-8 pl-4 border-l-4 border-blue-500 text-white/90">
              Produções & Eventos
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {horizontalVideos.map((video) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className="group cursor-pointer"
                >
                  {/* Card Horizontal */}
                  <div className="relative overflow-hidden rounded-xl aspect-video mb-4 border border-neutral-800 group-hover:border-blue-500/50 transition-all duration-500 shadow-lg">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />
                    {/* Botão Play */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform shadow-xl">
                        <span className="text-white text-2xl pl-1">▶</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-1">
                    <h3 className="text-xl font-bold text-neutral-100 group-hover:text-blue-400 transition-colors">{video.title}</h3>
                    <p className="text-sm text-neutral-500 mt-1 line-clamp-2">{video.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}
        
        {/* --- SEÇÃO 2: VÍDEOS EM PÉ (SHORTS/REELS) --- */}
        {verticalVideos.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-8 pl-4 border-l-4 border-pink-500 text-white/90">
              Shorts & Reels
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {verticalVideos.map((video) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className="group cursor-pointer"
                >
                  {/* Card Vertical (Estilo Instagram) */}
                  <div className="relative overflow-hidden rounded-xl aspect-[9/16] border border-neutral-800 group-hover:border-pink-500/50 transition-all duration-300 shadow-lg">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
                    
                    <div className="absolute bottom-3 left-3 right-3">
                       <span className="inline-block text-[10px] font-bold text-white bg-pink-600 px-2 py-0.5 rounded mb-1 shadow-sm">
                         REELS
                       </span>
                      <h3 className="text-sm font-medium text-white leading-snug line-clamp-2 drop-shadow-md">
                        {video.title}
                      </h3>
                    </div>
                    
                    {/* Ícone de Play Pequeno no topo */}
                    <div className="absolute top-2 right-2">
                      <span className="text-white/80 text-xs drop-shadow-md">▶ 15s</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      
      </div>
      
      {/* O Modal Inteligente que já configuramos */}
      <ModalVideo video={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </div>
  );
}