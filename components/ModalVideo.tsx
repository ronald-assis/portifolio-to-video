'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Video } from '@/types';

const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-neutral-900 animate-pulse" />
});

interface ModalVideoProps {
  video: Video | null;
  onClose: () => void;
}

export default function ModalVideo({ video, onClose }: ModalVideoProps) {
  const [mounted, setMounted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    if (video) {
      const frame = requestAnimationFrame(() => {
        setMounted(true);
        setTimeout(() => setIsReady(true), 100);
      });
      return () => {
        cancelAnimationFrame(frame);
        setIsReady(false);
        setMounted(false);
      };
    }
  }, [video]);
  
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  
  if (!video || !mounted) return null;
  
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-black rounded-xl overflow-hidden w-full max-w-5xl aspect-video shadow-2xl relative border border-neutral-800"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white z-10 bg-black/50 px-3 py-1 rounded-full"
        >
          ✕ Fechar
        </button>
        
        {isReady && (
          <ReactPlayer
            url={video.url}
            width="100%"
            height="100%"
            controls={true}
            playing={true}
            config={{
              youtube: {
                playerVars: {
                  rel: 0,
                  modestbranding: 1
                }
              }
            }}
          />
        )}
      </div>
    </div>
  );
}
