import React, { useState } from 'react';
import { X, Star, Calendar, MapPin, CheckCircle2, ArrowRight, ShieldCheck, Clock, Users, Heart, Mountain, Ticket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { IndiaDestination, formatINR } from '../../data/indiaData';
import { useTrip } from '../../context/TripContext';
import { BookingModal } from '../forms/BookingModal';

interface IndiaDestinationModalProps {
  destination: IndiaDestination | null;
  onClose: () => void;
}

export const IndiaDestinationModal: React.FC<IndiaDestinationModalProps> = ({ destination, onClose }) => {
  const navigate = useNavigate();
  const { createTrip } = useTrip();
  const [selectedPhoto, setSelectedPhoto] = useState<number>(0);
  const [guestCount, setGuestCount] = useState<number>(2);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);

  if (!destination) return null;

  const handleStartPlanning = () => {
    createTrip({
      title: `${destination.name} Explorer`,
      destinationSummary: `${destination.name}, ${destination.state}`,
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
    <>
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
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="px-3 py-1 bg-[#168BFF]/90 backdrop-blur-md rounded-full text-xs font-semibold text-white tracking-wide flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {destination.state}, India
                    </span>
                    {destination.altitude && (
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold text-white tracking-wide flex items-center gap-1">
                        <Mountain className="w-3 h-3 text-sky-300" />
                        {destination.altitude}
                      </span>
                    )}
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
                    {destination.tagline}
                  </p>
                </div>

                {/* Price Tag in INR */}
                <div className="bg-white/15 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 text-right shrink-0">
                  <div className="text-[11px] text-slate-200 font-medium">Starts from</div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    {formatINR(destination.startPrice)}
                  </div>
                  <div className="text-[11px] text-slate-300">
                    {destination.durationDays} days, {destination.durationNights} nights / person
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

              {/* Key Trip Highlights */}
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

              {/* Price Breakdown - Transparent Genuine Rates */}
              {destination.priceBreakdown && (
                <div className="p-4 sm:p-5 bg-[#FAFCFF] rounded-2xl border border-[#E0EEFB]">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#101827] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#168BFF]" />
                      <span>Transparent Price Breakdown (per person)</span>
                    </h3>
                    <span className="text-[11px] font-semibold text-[#168BFF] bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                      Zero Hidden Fees
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-white p-3 rounded-xl border border-[#E8EEF5]">
                      <div className="text-[11px] text-[#64748B]">Stay & Haveli / Hotel</div>
                      <div className="font-serif text-sm font-bold text-[#101827] mt-0.5">
                        {formatINR(destination.priceBreakdown.stays)}
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-[#E8EEF5]">
                      <div className="text-[11px] text-[#64748B]">Private AC Transport</div>
                      <div className="font-serif text-sm font-bold text-[#101827] mt-0.5">
                        {formatINR(destination.priceBreakdown.transport)}
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-[#E8EEF5]">
                      <div className="text-[11px] text-[#64748B]">Guided Tours & Entry</div>
                      <div className="font-serif text-sm font-bold text-[#101827] mt-0.5">
                        {formatINR(destination.priceBreakdown.activitiesAndGuide)}
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-[#E8EEF5]">
                      <div className="text-[11px] text-[#64748B]">Meals & Local Taxes</div>
                      <div className="font-serif text-sm font-bold text-[#101827] mt-0.5">
                        {formatINR(destination.priceBreakdown.mealsAndTaxes)}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Included Features */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 bg-[#F4FAFF] rounded-2xl border border-[#E0F0FE] text-center">
                  <Clock className="w-4 h-4 text-[#168BFF] mx-auto mb-1" />
                  <div className="text-[11px] text-[#64748B]">Duration</div>
                  <div className="text-xs font-semibold text-[#101827]">{destination.durationDays}D / {destination.durationNights}N</div>
                </div>
                <div className="p-3 bg-[#F4FAFF] rounded-2xl border border-[#E0F0FE] text-center">
                  <Calendar className="w-4 h-4 text-[#168BFF] mx-auto mb-1" />
                  <div className="text-[11px] text-[#64748B]">Best Season</div>
                  <div className="text-xs font-semibold text-[#101827]">{destination.bestSeason || 'Year-round'}</div>
                </div>
                <div className="p-3 bg-[#F4FAFF] rounded-2xl border border-[#E0F0FE] text-center">
                  <ShieldCheck className="w-4 h-4 text-[#168BFF] mx-auto mb-1" />
                  <div className="text-[11px] text-[#64748B]">Guides</div>
                  <div className="text-xs font-semibold text-[#101827]">Certified Local Expert</div>
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
                  className="w-6 h-6 flex items-center justify-center text-sm font-bold text-[#475569] hover:text-[#101827] cursor-pointer"
                >
                  -
                </button>
                <span className="px-3 text-xs font-semibold text-[#101827]">{guestCount}</span>
                <button
                  onClick={() => setGuestCount(guestCount + 1)}
                  className="w-6 h-6 flex items-center justify-center text-sm font-bold text-[#475569] hover:text-[#101827] cursor-pointer"
                >
                  +
                </button>
              </div>
              <div className="text-xs text-[#64748B]">
                Total: <span className="font-bold text-[#101827]">{formatINR(destination.startPrice * guestCount)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0084FF] hover:bg-blue-600 text-white text-xs font-bold rounded-full transition-all shadow-md shadow-blue-500/20 active:scale-95 cursor-pointer"
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>Instant Booking</span>
              </button>

              <button
                onClick={handleStartPlanning}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-[#101827] hover:bg-[#1f2937] text-white text-xs font-medium rounded-full transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>Customize Plan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        destinationId={destination.id}
        destinationName={destination.name}
        basePrice={destination.startPrice}
        initialDays={destination.durationDays}
      />
    </>
  );
};
