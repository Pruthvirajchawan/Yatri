import React from 'react';
import { X, Play, Sparkles, Mountain } from 'lucide-react';

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Frame */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1600&auto=format&fit=crop"
            alt="Himalayan pass and snow peak documentary"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/80" />

          {/* Video Controls Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center mb-4 shadow-2xl animate-pulse cursor-pointer">
              <Play className="w-8 h-8 text-white fill-white ml-1" />
            </div>
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold uppercase tracking-widest text-sky-300 mb-2 flex items-center gap-1.5">
              <Mountain className="w-3.5 h-3.5" />
              Yatri Himalayan Cinematic Series
            </span>
            <h3 className="font-serif text-xl sm:text-3xl font-bold max-w-lg">
              From high altitude passes to tranquil valley retreats
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-md">
              Witness the snow peaks of Ladakh, the pine forests of Kashmir, and the ancient monasteries of Spiti Valley.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="p-4 sm:p-5 bg-slate-900 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>4K HDR Incredible India Expedition Series</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
