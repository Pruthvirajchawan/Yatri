import React, { useState } from 'react';
import { X, Star, Calendar, MapPin, CheckCircle2, ArrowRight, ShieldCheck, DollarSign, Clock, Users, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { IndonesiaDestination } from '../../data/indonesiaData';
import { useTrip } from '../../context/TripContext';

interface IndonesiaDestinationModalProps {
  destination: IndonesiaDestination | null;
  onClose: () => void;
}

export const IndonesiaDestinationModal: React.FC<IndonesiaDestinationModalProps> = ({ destination, onClose }) => {
  const navigate = useNavigate();
  const { createTrip } = useTrip();
  const [selectedPhoto, setSelectedPhoto] = useState<number>(0);
  const [guestCount, setGuestCount] = useState<number>(2);

  if (!destination) return null;

  const handleStartPlanning = () => {
    // Generate a new trip based on this destination
    createTrip({
      title: `${destination.name} Explorer`,
      destinationSummary: destination.name,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + destination.durationDays * 86400000).toISOString().split('T')[0],
      totalDays: destination.durationDays,
      estimatedTotalBudget: destination.startPrice * guestCount,
      budgetPerPerson: destination.startPrice,
      travelerCount: guestCount,
      coverImage: destination.heroImage
    });
    onClose();
    navigate('/plan');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-[#E8EEF5]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content Body - Scrollable */}
        <div className="overflow-y-auto flex-1">
          {/* Hero Image Section */}
          <div className="relative h-64 sm:h-80 md:h-96 w-full bg-slate-900">
            <img
              src={destination.gallery[selectedPhoto] || destination.heroImage}
              alt={destination.name}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-sky-500/80 backdrop-blur-md rounded-full text-xs font-semibold text-white uppercase tracking-wider">
                    Indonesia
                  </span>
                  <div className="flex items-center gap-1 text-xs text-amber-300 font-medium">
                    <Star className="w-3.5 h-3.5 fill-amber-300" />
                    <span>{destination.rating}</span>
                    <span className="text-white/70">({destination.reviewsCount} reviews)</span>
                  </div>
                </div>
                <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
                  {destination.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-lg">
                  {destination.subtitle}
                </p>
              </div>

              {/* Price Tag */}
              <div className="bg-white/15 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 text-right shrink-0">
                <div className="text-[11px] text-slate-200">Start from</div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  ${destination.startPrice}.00
                </div>
                <div className="text-[11px] text-slate-300">
                  {destination.durationDays} days, {destination.durationNights} nights
                </div>
              </div>
            </div>
          </div>

          {/* Photo Gallery Thumbnails */}
          <div className="px-6 pt-4 flex gap-2 overflow-x-auto no-scrollbar">
            {destination.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPhoto(idx)}
                className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  selectedPhoto === idx ? 'border-[#168BFF] scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Details Section */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#168BFF] mb-2">
                Overview & Experience
              </h3>
              <p className="text-[#475569] text-sm sm:text-base leading-relaxed">
                {destination.description}
              </p>
            </div>

            {/* Highlights List */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#101827] mb-3">
                Key Trip Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {destination.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F8FAFC] border border-[#E8EEF5]">
                    <CheckCircle2 className="w-4 h-4 text-[#168BFF] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#334155] font-medium">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Included Features */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 bg-[#F4FAFF] rounded-2xl border border-[#E0F0FE] text-center">
                <Clock className="w-4 h-4 text-[#168BFF] mx-auto mb-1" />
                <div className="text-[11px] text-[#64748B]">Pacing</div>
                <div className="text-xs font-semibold text-[#101827]">Balanced</div>
              </div>
              <div className="p-3 bg-[#F4FAFF] rounded-2xl border border-[#E0F0FE] text-center">
                <ShieldCheck className="w-4 h-4 text-[#168BFF] mx-auto mb-1" />
                <div className="text-[11px] text-[#64748B]">Guide</div>
                <div className="text-xs font-semibold text-[#101827]">Local Expert</div>
              </div>
              <div className="p-3 bg-[#F4FAFF] rounded-2xl border border-[#E0F0FE] text-center">
                <Users className="w-4 h-4 text-[#168BFF] mx-auto mb-1" />
                <div className="text-[11px] text-[#64748B]">Group</div>
                <div className="text-xs font-semibold text-[#101827]">Private / Small</div>
              </div>
              <div className="p-3 bg-[#F4FAFF] rounded-2xl border border-[#E0F0FE] text-center">
                <Star className="w-4 h-4 text-[#168BFF] mx-auto mb-1" />
                <div className="text-[11px] text-[#64748B]">Rating</div>
                <div className="text-xs font-semibold text-[#101827]">{destination.rating} / 5.0</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 sm:p-6 bg-white border-t border-[#E8EEF5] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-[#64748B]">Travelers:</span>
            <div className="flex items-center border border-[#E8EEF5] rounded-full px-2 py-1 bg-[#F8FAFC]">
              <button
                onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                className="w-6 h-6 flex items-center justify-center text-sm font-bold text-[#475569] hover:text-[#101827]"
              >
                -
              </button>
              <span className="px-3 text-xs font-semibold text-[#101827]">{guestCount}</span>
              <button
                onClick={() => setGuestCount(guestCount + 1)}
                className="w-6 h-6 flex items-center justify-center text-sm font-bold text-[#475569] hover:text-[#101827]"
              >
                +
              </button>
            </div>
            <div className="text-xs text-[#64748B]">
              Total: <span className="font-bold text-[#101827]">${destination.startPrice * guestCount}.00</span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-full border border-[#E8EEF5] text-xs font-medium text-[#64748B] hover:text-[#101827] transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleStartPlanning}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-[#101827] hover:bg-[#168BFF] text-white text-xs font-medium rounded-full transition-all shadow-md active:scale-95"
            >
              <span>Plan This Destination</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
