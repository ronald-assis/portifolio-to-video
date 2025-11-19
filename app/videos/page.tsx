'use client';

import { useState } from 'react';
import { videos } from '@/data/videos';
import { Category, Video } from '@/types';
import { motion } from 'framer-motion';

export default function VideosPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Todos');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  
  const categories: Category[] = ['Todos', 'Casamento', 'Debutante'];
  
  const filteredVideos = videos.filter((video) =>
    selectedCategory === 'Todos' ? true : video.category === selectedCategory
  );
  
  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-24 pb-12 px-4">
      <div className="container mx-auto">
        
        {/* Cabeçalho e Filtros */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-neutral-800 pb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Trabalhos Selecionados</h1>
            <p className="text-neutral-400">Histórias que tive a honra de contar.</p>
          </div>
          
          <div className="flex gap-2 mt-4 md:mt-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  selectedCategory === cat
                    ? 'bg-white text-black font-bold'
                    : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        {/* Grid de Vídeos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video) => (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={video.id}
              className="group cursor-pointer"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="relative overflow-hidden rounded-xl aspect-video mb-4 border border-neutral-800">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white text-black w-12 h-12 rounded-full flex items-center justify-center pl-1">▶</span>
                </div>
              </div>
              <h3 className="text-xl font-bold leading-tight group-hover:text-blue-400 transition-colors">{video.title}</h3>
              <span className="text-sm text-neutral-500 uppercase tracking-wider">{video.category}</span>
            </motion.div>
          ))}
        </div>
        
        {/* Modal Simplificado */}
        {selectedVideo && (
          <div
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <div className="w-full max-w-5xl aspect-video bg-black relative rounded-lg overflow-hidden shadow-2xl border border-neutral-800">
              <button className="absolute top-4 right-4 text-white text-xl z-10 hover:text-red-500">✕ Fechar</button>
              <iframe
                src={selectedVideo.url}
                className="w-full h-full"
                allow="autoplay; fullscreen"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}