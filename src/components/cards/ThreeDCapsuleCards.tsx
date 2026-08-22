import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, MapPin } from 'lucide-react';
import { formatINR } from '../../data/indiaData';

interface CapsuleDestination {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  tag: string;
  price: number;
  objectPosition?: string;
}

const CAPSULES: CapsuleDestination[] = [
  {
    id: 'ladakh',
    name: 'Ladakh',
    subtitle: 'Pangong Tso & High Passes',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=800&auto=format&fit=crop',
    tag: 'High Altitude & Lakes',
    price: 16999,
    objectPosition: 'object-center'
  },
  {
    id: 'gujarat',
    name: 'Gujarat',
    subtitle: 'Somnath Temple & Sacred Coast',
    image: '/images/gujarat_somnath_card.jpg?v=2',
    tag: 'Sacred Heritage & Coast',
    price: 9499,
    objectPosition: 'object-center'
  },
  {
    id: 'kerala',
    name: 'Kerala',
    subtitle: 'Alleppey Backwaters & Munnar Hills',
    image: '/images/kerala_card.jpg?v=2',
    tag: "God's Own Country",
    price: 11999,
    objectPosition: 'object-center'
  }
];

interface ThreeDCapsuleCardsProps {
  onSelect?: (destinationId: string) => void;
  onHoverChange?: (destinationId: string | null) => void;
  compact?: boolean;
}

export const ThreeDCapsuleCards: React.FC<ThreeDCapsuleCardsProps> = ({ onSelect, onHoverChange, compact = false }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
    setMousePos({ x: 0, y: 0 });
    if (onHoverChange) {
      onHoverChange(null);
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-2xl mx-auto py-2 flex items-center justify-center select-none"
      style={{ perspective: '1200px' }}
    >
      <div className="flex items-center justify-center gap-2.5 sm:gap-4 md:gap-5">
        {CAPSULES.map((item, index) => {
          const isLeft = index === 0;
          const isCenter = index === 1;
          const isRight = index === 2;
          const isHovered = hoveredId === item.id;

          // Compute base transform & dynamic tilt
          let rotateY = isLeft ? 16 : isRight ? -16 : 0;
          let rotateX = 2;
          let scale = isCenter ? 1.08 : 0.94;
          let zIndex = isCenter ? 20 : 10;
          let translateY = isCenter ? -4 : 4;

          if (isHovered) {
            rotateY += mousePos.x * 12;
            rotateX += -mousePos.y * 12;
            scale = isCenter ? 1.15 : 1.04;
            zIndex = 30;
            translateY -= 8;
          }

          return (
            <motion.div
              key={item.id}
              onClick={() => onSelect && onSelect(item.id)}
              onMouseEnter={() => {
                setHoveredId(item.id);
                if (onHoverChange) onHoverChange(item.id);
              }}
              animate={{
                rotateY,
                rotateX,
                scale,
                y: translateY
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              style={{
                transformStyle: 'preserve-3d',
                zIndex
              }}
              className={`group relative cursor-pointer ${compact
                  ? 'w-24 h-32 sm:w-28 sm:h-38'
                  : 'w-28 h-40 sm:w-36 sm:h-52 md:w-44 md:h-60'
                }`}
            >
              {/* Soft 3D Glow & Ambient Shadow Underneath */}
              <div
                className={`absolute -inset-1 rounded-[2.2rem] sm:rounded-[2.8rem] bg-gradient-to-b from-sky-400/40 via-blue-500/20 to-transparent blur-md transition-opacity duration-300 ${isHovered || isCenter ? 'opacity-80' : 'opacity-30'
                  }`}
              />

              {/* Main 3D Pill Capsule Card Container */}
              <div className="relative w-full h-full rounded-[2rem] sm:rounded-[2.6rem] overflow-hidden p-[2px] bg-gradient-to-b from-white/90 via-white/40 to-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.25)] border border-white/60 backdrop-blur-xs">
                {/* Inner Image Container */}
                <div className="relative w-full h-full rounded-[1.85rem] sm:rounded-[2.45rem] overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.name}
                    className={`w-full h-full object-cover ${item.objectPosition || 'object-center'} transition-transform duration-700 ease-out group-hover:scale-115 filter brightness-[0.95] contrast-[1.05]`}
                  />

                  {/* Gradient Vignette & Lighting */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

                  {/* Glass Reflection Arc Shine */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity" />

                  {/* Top Subtle Metallic Highlight Edge */}
                  <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/30 to-transparent pointer-events-none rounded-t-[2.45rem]" />

                  {/* Center Text Label */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2 z-10">
                    <h3 className="font-serif text-lg sm:text-2xl md:text-3xl font-semibold text-white tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                      {item.name}
                    </h3>

                    {/* Hover badge with INR pricing */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1 flex items-center gap-1 px-2.5 py-0.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] sm:text-xs text-white font-medium">
                      <span>{formatINR(item.price)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
