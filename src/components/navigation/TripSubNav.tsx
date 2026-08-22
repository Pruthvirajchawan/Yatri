import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Layers, Activity, GitFork, Users2, IndianRupee, Sparkles, Share2, Heart } from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { ShareModal } from '../common/ShareModal';

export const TripSubNav: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentTrip, optimizeTrip } = useTrip();
  const [showShare, setShowShare] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optToast, setOptToast] = useState<string | null>(null);

  const tripId = id || currentTrip.id || 'trip-rajasthan-escape';

  const subLinks = [
    { name: 'Itinerary', path: `/trip/${tripId}`, icon: Layers },
    { name: 'Trip Intelligence', path: `/trip/${tripId}/intelligence`, icon: Activity },
    { name: 'Trade-Off Engine', path: `/trip/${tripId}/tradeoffs`, icon: GitFork },
    { name: 'Group Equity', path: `/trip/${tripId}/group`, icon: Users2 },
    { name: 'Budget Intelligence', path: `/trip/${tripId}/budget`, icon: IndianRupee }
  ];

  const handleOptimize = async () => {
    setIsOptimizing(true);
    try {
      const res = await optimizeTrip();
      setOptToast(res.message);
      setTimeout(() => setOptToast(null), 4000);
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <>
      <div className="bg-white border-b border-[#E8EEF5] pt-24 pb-4 sticky top-0 z-30 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Summary */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#168BFF] uppercase tracking-wider mb-1">
                <span>Trip Overview</span>
                <span>•</span>
                <span>{currentTrip.status}</span>
                <span>•</span>
                <span>{currentTrip.travelStyle} Pace</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl text-[#101827] font-bold">
                {currentTrip.title}
              </h1>
              <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
                {currentTrip.destinationSummary} · {currentTrip.totalDays} Days · {currentTrip.travelerCount} Travelers · ₹{currentTrip.estimatedTotalBudget.toLocaleString('en-IN')} Est. Total
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Trip Health Badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#F4FAFF] border border-[#DFF1FF] rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#35A86B] animate-pulse" />
                <span className="text-xs font-medium text-[#64748B]">Trip Health:</span>
                <span className="text-xs font-bold text-[#101827]">{currentTrip.health.score} / 100</span>
              </div>

              {/* Optimize Button */}
              <button
                onClick={handleOptimize}
                disabled={isOptimizing}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#168BFF] hover:bg-[#1277db] text-white text-xs font-medium rounded-full shadow-xs transition-all cursor-pointer hover:scale-[1.02] disabled:opacity-50"
              >
                <Sparkles className={`w-3.5 h-3.5 ${isOptimizing ? 'animate-spin' : ''}`} />
                <span>{isOptimizing ? 'Optimizing...' : 'Optimize Pace'}</span>
              </button>

              {/* Share Button */}
              <button
                onClick={() => setShowShare(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-[#E8EEF5] hover:border-[#168BFF] text-[#101827] text-xs font-medium rounded-full transition-all cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-[#64748B]" />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pt-2 border-t border-[#E8EEF5]">
            {subLinks.map((tab) => {
              const Icon = tab.icon;
              return (
                <NavLink
                  key={tab.name}
                  to={tab.path}
                  end={tab.path === `/trip/${tripId}`}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-full whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-[#101827] text-white shadow-xs'
                        : 'text-[#64748B] hover:text-[#101827] hover:bg-[#F4FAFF]'
                    }`
                  }
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.name}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>

      {/* Toast */}
      {optToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#101827] text-white px-5 py-3 rounded-2xl shadow-xl border border-white/10 text-xs sm:text-sm flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <Sparkles className="w-4 h-4 text-[#168BFF]" />
          <span>{optToast}</span>
        </div>
      )}

      {/* Share Modal */}
      {showShare && <ShareModal trip={currentTrip} onClose={() => setShowShare(false)} />}
    </>
  );
};
