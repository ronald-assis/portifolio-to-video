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
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    // Ativa a reprodução quando um vídeo é selecionado
    if (video) {
      // Pequeno delay para garantir que a transição de entrada do modal seja suave
      const timer = setTimeout(() => setPlaying(true), 300);
      return () => clearTimeout(timer);
    } else {
      setPlaying(false);
    }
  }, [video]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Renderiza o componente apenas se um vídeo for selecionado
  if (!video) {
    return null;
  }

  return (
    <div
      // Fundo semi-transparente com efeito de desfoque
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        // Container do vídeo, impedindo que o clique feche o modal
        className="bg-black rounded-xl overflow-hidden w-full max-w-5xl aspect-video shadow-2xl relative border border-neutral-800"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white z-10 bg-black/50 px-3 py-1 rounded-full"
        >
          ✕ Fechar
        </button>

        <ReactPlayer
          url={video.url}
          width="100%"
          height="100%"
          controls={true}
          playing={playing}
          onEnded={onClose} // Fecha o modal quando o vídeo termina
          config={{
            youtube: {
              playerVars: {
                rel: 0,
                modestbranding: 1,
              },
            },
          }}
        />
      </div>
    </div>
  );
}
