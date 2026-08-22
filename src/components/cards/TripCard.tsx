import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, IndianRupee, ArrowRight, Activity, Trash2, Share2 } from 'lucide-react';
import { Trip } from '../../types';

interface TripCardProps {
  trip: Trip;
  onDelete?: (id: string) => void;
  onShare?: (trip: Trip) => void;
}

export const TripCard: React.FC<TripCardProps> = ({ trip, onDelete, onShare }) => {
  const statusColors = {
    Upcoming: 'bg-[#DFF1FF] text-[#168BFF]',
    Draft: 'bg-[#FFF8ED] text-[#E7A93B]',
    Completed: 'bg-[#EBFBF2] text-[#35A86B]'
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#E8EEF5] hover:border-[#168BFF]/40 transition-all duration-300 editorial-card-shadow flex flex-col justify-between">
      {/* Top Image & Badges */}
      <div className="relative h-48 overflow-hidden bg-[#F4FAFF]">
        <img
          src={trip.coverImage}
          alt={trip.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold shadow-xs ${
              statusColors[trip.status]
            }`}
          >
            {trip.status}
          </span>

          <div className="flex items-center gap-1">
            {onShare && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onShare(trip);
                }}
                className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md text-[#101827] hover:bg-white flex items-center justify-center transition-all cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`Delete "${trip.title}"?`)) onDelete(trip.id);
                }}
                className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md text-[#64748B] hover:text-[#D9534F] hover:bg-white flex items-center justify-center transition-all cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Title overlay on bottom of image */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="font-serif text-xl sm:text-2xl font-bold leading-snug">
            {trip.title}
          </h3>
          <p className="text-xs text-white/80">{trip.destinationSummary}</p>
        </div>
      </div>

      {/* Details & Health */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="grid grid-cols-3 gap-2 py-2 border-b border-[#E8EEF5] text-center">
          <div>
            <span className="text-[11px] text-[#94A3B8] block font-medium">Duration</span>
            <span className="text-xs sm:text-sm font-semibold text-[#101827]">
              {trip.totalDays} Days
            </span>
          </div>
          <div>
            <span className="text-[11px] text-[#94A3B8] block font-medium">Travelers</span>
            <span className="text-xs sm:text-sm font-semibold text-[#101827]">
              {trip.travelerCount} Persons
            </span>
          </div>
          <div>
            <span className="text-[11px] text-[#94A3B8] block font-medium">Budget</span>
            <span className="text-xs sm:text-sm font-semibold text-[#101827]">
              ₹{(trip.estimatedTotalBudget / 1000).toFixed(1)}k
            </span>
          </div>
        </div>

        {/* Health pill */}
        <div className="flex items-center justify-between text-xs bg-[#F4FAFF] px-3 py-2 rounded-xl border border-[#E8EEF5]">
          <div className="flex items-center gap-1.5 text-[#64748B]">
            <Activity className="w-3.5 h-3.5 text-[#168BFF]" />
            <span>Trip Health:</span>
            <span className="font-bold text-[#101827]">{trip.health?.score || 84}/100</span>
          </div>
          <span className="text-[11px] font-medium text-[#35A86B]">
            {trip.health?.travelLoad || 'Moderate'} Pace
          </span>
        </div>

        {/* Action Link */}
        <Link
          to={`/trip/${trip.id}`}
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#101827] hover:bg-[#168BFF] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
        >
          <span>Open Yatri Itinerary</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
