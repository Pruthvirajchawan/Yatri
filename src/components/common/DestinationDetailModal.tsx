import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, MapPin, Calendar, Star, Sparkles, Heart, Check, ArrowRight } from 'lucide-react';
import { Destination } from '../../types';
import { useTrip } from '../../context/TripContext';

interface DestinationDetailModalProps {
  destination: Destination | null;
  onClose: () => void;
}

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  onClose
}) => {
  const navigate = useNavigate();
  const { savedDestinationIds, toggleSaveDestination } = useTrip();
  const [selectedPhoto, setSelectedPhoto] = useState<number>(0);

  if (!destination) return null;

  const isSaved = savedDestinationIds.includes(destination.id);
  const photos = destination.galleryImages && destination.galleryImages.length > 0
    ? destination.galleryImages
    : [destination.heroImage];

  const handlePlanThis = () => {
    onClose();
    navigate('/plan', {
      state: {
        destination: `${destination.name}, ${destination.state}`,
        travelers: 2,
        budget: destination.startingPrice * 2
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#101827]/50 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-white rounded-3xl overflow-hidden border border-[#E8EEF5] shadow-2xl animate-in zoom-in-95 duration-150 max-h-[92vh] flex flex-col">
        {/* Header Image Gallery */}
        <div className="relative h-64 sm:h-72 w-full bg-[#101827] shrink-0">
          <img
            src={photos[selectedPhoto] || destination.heroImage}
            alt={destination.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

          {/* Top Actions */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-semibold text-[#101827]">
              {destination.region} · {destination.state}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleSaveDestination(destination.id)}
                aria-label="Save"
                className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all cursor-pointer ${
                  isSaved
                    ? 'bg-[#D9534F] text-white'
                    : 'bg-white/80 text-[#101827] hover:bg-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={onClose}
                aria-label="Close"
                className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-md hover:bg-white text-[#101827] flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Bottom Heading on Image */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold mb-1">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{destination.rating.toFixed(1)} rating</span>
              <span className="text-white/70">({destination.reviewCount} traveler reviews)</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
              {destination.name}
            </h2>
            <p className="text-xs sm:text-sm text-white/90 italic font-serif">
              "{destination.tagline}"
            </p>
          </div>
        </div>

        {/* 3 Photos Gallery Thumbnails */}
        {photos.length > 1 && (
          <div className="px-6 pt-3 pb-1 flex gap-2 overflow-x-auto bg-[#F8FAFC] border-b border-[#E8EEF5]">
            {photos.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPhoto(idx)}
                className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  selectedPhoto === idx
                    ? 'border-[#168BFF] scale-105 shadow-md'
                    : 'border-transparent opacity-65 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`${destination.name} view ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Key Facts strip */}
          <div className="grid grid-cols-3 gap-3 p-3.5 bg-[#F4FAFF] rounded-2xl border border-[#E8EEF5] text-center">
            <div>
              <span className="text-[10px] uppercase font-semibold text-[#94A3B8] block">
                Starting Budget
              </span>
              <span className="text-sm sm:text-base font-bold text-[#101827]">
                ₹{destination.startingPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-[#94A3B8] block">
                Ideal Duration
              </span>
              <span className="text-sm sm:text-base font-bold text-[#101827]">
                {destination.durationDays}d · {destination.durationNights}n
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-[#94A3B8] block">
                Best Season
              </span>
              <span className="text-sm sm:text-base font-bold text-[#101827]">
                {destination.bestSeason}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#101827] mb-1.5">
              About This Destination
            </h4>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              {destination.description}
            </p>
          </div>

          {/* Curated Highlights */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#101827] mb-2.5">
              Unmissable Highlights (Zero-Regret)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {destination.highlights.map((h, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2.5 bg-[#FFFFFF] rounded-xl border border-[#E8EEF5] text-xs text-[#101827]"
                >
                  <div className="w-5 h-5 rounded-full bg-[#DFF1FF] text-[#168BFF] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="p-4 sm:p-5 border-t border-[#E8EEF5] bg-white flex items-center justify-between gap-3 shrink-0">
          <div>
            <span className="text-[10px] uppercase font-semibold text-[#94A3B8] block">
              Estimated Trip Cost
            </span>
            <span className="text-base sm:text-lg font-bold text-[#101827]">
              ₹{destination.startingPrice.toLocaleString('en-IN')}{' '}
              <span className="text-xs font-normal text-[#64748B]">/ person</span>
            </span>
          </div>

          <button
            onClick={handlePlanThis}
            className="flex items-center gap-2 px-6 py-3 bg-[#101827] hover:bg-[#168BFF] text-white text-xs sm:text-sm font-semibold rounded-full shadow-md transition-all cursor-pointer hover:scale-[1.02]"
          >
            <span>Plan {destination.name} Trip</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
