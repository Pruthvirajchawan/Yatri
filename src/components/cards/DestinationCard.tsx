import React from 'react';
import { Heart, Star, Compass, ArrowUpRight } from 'lucide-react';
import { Destination } from '../../types';
import { useTrip } from '../../context/TripContext';

interface DestinationCardProps {
  destination: Destination;
  onSelect?: (dest: Destination) => void;
  compact?: boolean;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  onSelect,
  compact = false
}) => {
  const { savedDestinationIds, toggleSaveDestination } = useTrip();
  const isSaved = savedDestinationIds.includes(destination.id);

  return (
    <div
      onClick={() => onSelect && onSelect(destination)}
      className={`group relative bg-white rounded-2xl overflow-hidden border border-[#E8EEF5] hover:border-[#168BFF]/40 transition-all duration-300 hover:-translate-y-1.5 editorial-card-shadow cursor-pointer flex flex-col ${
        compact ? 'h-[320px]' : 'h-[380px]'
      }`}
    >
      {/* Image Container */}
      <div className="relative w-full h-[62%] overflow-hidden bg-[#F4FAFF]">
        <img
          src={destination.heroImage}
          alt={destination.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 opacity-70 group-hover:opacity-80 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-full text-[11px] font-semibold text-[#101827] shadow-xs">
            {destination.region}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveDestination(destination.id);
            }}
            aria-label="Save destination"
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all pointer-events-auto cursor-pointer ${
              isSaved
                ? 'bg-[#D9534F] text-white'
                : 'bg-white/80 text-[#101827] hover:bg-white hover:text-[#D9534F]'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottom Tagline on Image */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center gap-1 text-[11px] text-white/90">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold">{destination.rating.toFixed(1)}</span>
            <span className="text-white/70">({destination.reviewCount})</span>
          </div>
        </div>
      </div>

      {/* Card Content (Exact Reference Layout) */}
      <div className="p-4 flex-1 flex flex-col justify-between bg-white">
        <div>
          <div className="flex items-start justify-between gap-1">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#101827] group-hover:text-[#168BFF] transition-colors leading-tight">
              {destination.name}
            </h3>
            <span className="text-xs text-[#64748B] whitespace-nowrap pt-1">
              {destination.durationDays}d · {destination.durationNights}n
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5 line-clamp-1">
            {destination.popularFor}
          </p>
        </div>

        {/* Pricing & Duration */}
        <div className="pt-2 border-t border-[#E8EEF5] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-semibold text-[#94A3B8] block tracking-wider">
              Start from
            </span>
            <span className="text-sm sm:text-base font-bold text-[#101827]">
              ₹{destination.startingPrice.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="inline-flex items-center gap-1 text-xs font-semibold text-[#168BFF] group-hover:translate-x-0.5 transition-transform">
            <span>Explore</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
