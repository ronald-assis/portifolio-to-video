'use client';

import { useState } from 'react';
import { videos } from '@/data/videos';
import { Category, Video } from '@/types';
import { VideoGrid } from '@/components/VideoGrid';
import { VideoModal } from '@/components/VideoModal';

export default function VideosPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Todos');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  
  const categories: Category[] = ['Todos', 'Eventos', 'Aniversário'];
  
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
        <VideoGrid videos={filteredVideos} onVideoClick={setSelectedVideo} />
        
        {/* Modal */}
        <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      </div>
    </div>
  );
}
