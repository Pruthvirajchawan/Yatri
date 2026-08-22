import React, { useState, useRef } from 'react';
import { X, Play, Pause, Sparkles, Volume2, VolumeX, Maximize2, Compass, Film } from 'lucide-react';

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CINEMATIC_CLIPS = [
  {
    id: 'heritage',
    title: 'Royal Rajasthan & Golden Forts',
    region: 'Jaipur & Thar Desert',
    duration: '2:45',
    poster: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1600&auto=format&fit=crop',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-beautiful-ancient-temple-in-india-42416-large.mp4'
  },
  {
    id: 'backwaters',
    title: 'Kerala Emerald Lagoons',
    region: 'Alleppey & Vembanad',
    duration: '3:10',
    poster: '/images/kerala_houseboat.jpg',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-traditional-wooden-boat-floating-in-the-water-43306-large.mp4'
  },
  {
    id: 'himalayas',
    title: 'Himalayan High Passes',
    region: 'Ladakh & Spiti Valley',
    duration: '3:30',
    poster: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1600&auto=format&fit=crop',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-snowy-mountain-range-in-winter-under-a-clear-blue-sky-42426-large.mp4'
  }
];

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ isOpen, onClose }) => {
  const [activeClipIndex, setActiveClipIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!isOpen) return null;

  const currentClip = CINEMATIC_CLIPS[activeClipIndex];

  const handleTogglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSelectClip = (idx: number) => {
    setActiveClipIndex(idx);
    setVideoError(false);
    setIsPlaying(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col">
        {/* Header bar */}
        <div className="px-5 py-4 bg-slate-900/90 border-b border-white/10 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#168BFF] animate-ping" />
            <Film className="w-4 h-4 text-sky-400" />
            <span className="font-serif font-bold text-sm sm:text-base text-white">
              Yatri Incredible India Cinematic Showcase
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player Frame */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden group">
          {!videoError ? (
            <video
              ref={videoRef}
              src={currentClip.videoUrl}
              poster={currentClip.poster}
              autoPlay
              playsInline
              loop
              muted={isMuted}
              onError={() => setVideoError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={currentClip.poster}
              alt={currentClip.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          )}

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />

          {/* Floating Info Overlay Top-Left */}
          <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-white text-xs flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-sky-400" />
            <span className="font-medium">{currentClip.region}</span>
          </div>

          {/* Center Play/Pause button on hover */}
          <button
            onClick={handleTogglePlay}
            className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 flex items-center justify-center text-white transition-all transform hover:scale-110 shadow-2xl cursor-pointer opacity-80 hover:opacity-100"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 fill-white text-white" />
            ) : (
              <Play className="w-8 h-8 fill-white text-white ml-1" />
            )}
          </button>

          {/* Bottom Video Controls */}
          <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-white text-xs">
            <div className="space-y-0.5">
              <h4 className="font-serif font-bold text-base sm:text-xl text-white drop-shadow-md">
                {currentClip.title}
              </h4>
              <p className="text-slate-300 text-xs hidden sm:block">
                Ultra HD 4K Master Expedition Stream · Certified Yatri Visual Archive
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleMute}
                className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Video selector clips strip */}
        <div className="p-4 sm:p-5 bg-slate-900 border-t border-white/10">
          <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Select Expedition Chapter</span>
            </div>
            <span>3 Chapters Available</span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {CINEMATIC_CLIPS.map((clip, idx) => (
              <button
                key={clip.id}
                onClick={() => handleSelectClip(idx)}
                className={`relative rounded-2xl overflow-hidden text-left p-2 border transition-all cursor-pointer ${
                  activeClipIndex === idx
                    ? 'border-[#168BFF] bg-[#168BFF]/10 ring-2 ring-[#168BFF]/40'
                    : 'border-white/10 bg-slate-800/60 hover:border-white/30'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-12 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-700">
                    <img
                      src={clip.poster}
                      alt={clip.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-xs text-white truncate">{clip.title}</p>
                    <p className="text-[10px] text-slate-400 truncate">{clip.region}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

