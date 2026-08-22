import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, IndianRupee, ArrowRight, Sparkles } from 'lucide-react';

export const HeroPlannerBar: React.FC = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('Rajasthan (Jaipur & Jodhpur)');
  const [dates, setDates] = useState('Oct 12 – Oct 18, 2026');
  const [travelers, setTravelers] = useState('4 Travelers');
  const [budget, setBudget] = useState('₹30,000 / person');

  const handleStartPlanning = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/plan', {
      state: {
        destination,
        dates,
        travelers: 4,
        budget: 30000
      }
    });
  };

  return (
    <form
      onSubmit={handleStartPlanning}
      className="w-full max-w-5xl mx-auto bg-white/95 backdrop-blur-xl p-3 sm:p-4 rounded-2xl sm:rounded-full border border-[#E8EEF5] floating-nav-shadow"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 items-center divide-y sm:divide-y-0 sm:divide-x divide-[#E8EEF5]">
        {/* Field 1: Destination */}
        <div className="px-4 py-2 sm:py-1">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#168BFF]" />
            Destination
          </label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full mt-0.5 text-sm font-semibold text-[#101827] bg-transparent focus:outline-none placeholder:text-[#94A3B8]"
            placeholder="Where in India?"
          />
        </div>

        {/* Field 2: Dates */}
        <div className="px-4 py-2 sm:py-1">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#168BFF]" />
            Dates
          </label>
          <input
            type="text"
            value={dates}
            onChange={(e) => setDates(e.target.value)}
            className="w-full mt-0.5 text-sm font-semibold text-[#101827] bg-transparent focus:outline-none placeholder:text-[#94A3B8]"
            placeholder="e.g. Oct 12 – Oct 18"
          />
        </div>

        {/* Field 3: Travelers */}
        <div className="px-4 py-2 sm:py-1">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-[#168BFF]" />
            Travelers
          </label>
          <input
            type="text"
            value={travelers}
            onChange={(e) => setTravelers(e.target.value)}
            className="w-full mt-0.5 text-sm font-semibold text-[#101827] bg-transparent focus:outline-none placeholder:text-[#94A3B8]"
            placeholder="Number of people"
          />
        </div>

        {/* Field 4: Budget & CTA Button */}
        <div className="px-4 py-2 sm:py-1 flex items-center justify-between gap-3">
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] flex items-center gap-1">
              <IndianRupee className="w-3.5 h-3.5 text-[#35A86B]" />
              Budget
            </label>
            <input
              type="text"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full mt-0.5 text-sm font-semibold text-[#101827] bg-transparent focus:outline-none placeholder:text-[#94A3B8]"
              placeholder="e.g. ₹30,000"
            />
          </div>

          <button
            type="submit"
            className="shrink-0 flex items-center justify-center gap-2 px-5 py-3.5 bg-[#101827] hover:bg-[#168BFF] text-white text-sm font-semibold rounded-full sm:rounded-full transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span className="hidden xl:inline">Start Planning</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </form>
  );
};
