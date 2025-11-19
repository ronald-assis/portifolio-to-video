'use client';

import { motion } from 'framer-motion';
import { Video } from '@/types';

interface VideoGridProps {
  videos: Video[];
  onVideoClick: (video: Video) => void;
}

export function VideoGrid({ videos, onVideoClick }: VideoGridProps) {
  const horizontalVideos = videos.filter(v => v.orientation === 'horizontal');
  const verticalVideos = videos.filter(v => v.orientation === 'vertical');
  
  return (
    <div className="space-y-16">
      {/* Vídeos Horizontais */}
      {horizontalVideos.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-neutral-300">Formato Cinematográfico</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {horizontalVideos.map((video) => (
              <VideoCard key={video.id} video={video} onClick={() => onVideoClick(video)} />
            ))}
          </div>
        </div>
      )}
      
      {/* Vídeos Verticais */}
      {verticalVideos.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-neutral-300">Formato Vertical (Reels)</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {verticalVideos.map((video) => (
              <VideoCard key={video.id} video={video} onClick={() => onVideoClick(video)} vertical />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface VideoCardProps {
  video: Video;
  onClick: () => void;
  vertical?: boolean;
}

function VideoCard({ video, onClick, vertical }: VideoCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className={`relative overflow-hidden rounded-xl mb-3 border border-neutral-800 ${
        vertical ? 'aspect-[9/16]' : 'aspect-video'
      }`}>
        <img
          src={video.thumbnail}
          alt={video.title}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-white text-black w-12 h-12 rounded-full flex items-center justify-center pl-1 shadow-lg">
              ▶
            </span>
          </div>
        </div>
      </div>
      <h3 className={`font-bold leading-tight group-hover:text-blue-400 transition-colors ${
        vertical ? 'text-sm' : 'text-lg'
      }`}>
        {video.title}
      </h3>
      <span className="text-xs text-neutral-500 uppercase tracking-wider">{video.category}</span>
    </motion.div>
  );
}
