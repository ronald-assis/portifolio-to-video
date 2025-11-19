'use client';

import { Video } from '@/types';

interface VideoModalProps {
  video: Video | null;
  onClose: () => void;
}

export function VideoModal({ video, onClose }: VideoModalProps) {
  if (!video) return null;
  
  const isVertical = video.orientation === 'vertical';
  
  return (
    <div
      className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className={`bg-black relative rounded-lg overflow-hidden shadow-2xl border border-neutral-800 ${
          isVertical ? 'w-full max-w-md aspect-[9/16]' : 'w-full max-w-5xl aspect-video'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-xl z-10 bg-black/50 hover:bg-red-500 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
        >
          ✕
        </button>
        <iframe
          src={video.url}
          className="w-full h-full"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </div>
    </div>
  );
}
