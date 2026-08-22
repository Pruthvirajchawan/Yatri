import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Plus, Sparkles, MapPin, Calendar, Clock, Car, Navigation, IndianRupee, Activity, CheckCircle2 } from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { TripSubNav } from '../components/navigation/TripSubNav';
import { ActivityCard } from '../components/cards/ActivityCard';
import { AddActivityModal } from '../components/forms/AddActivityModal';
import { HealthGauge } from '../components/intelligence/HealthGauge';
import { Activity as ActivityType } from '../types';

export const ItineraryView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    currentTrip,
    addActivity,
    removeActivity,
    moveActivity,
    toggleActivityCompleted,
    optimizeTrip
  } = useTrip();

  const [activeDayFilter, setActiveDayFilter] = useState<number | 'all'>('all');
  const [modalState, setModalState] = useState<{ isOpen: boolean; dayNumber: number; city: string }>({
    isOpen: false,
    dayNumber: 1,
    city: ''
  });

  const itineraryDays = currentTrip.itinerary || currentTrip.days || [];

  const daysToShow =
    activeDayFilter === 'all'
      ? itineraryDays
      : itineraryDays.filter((d) => d.dayNumber === activeDayFilter);

  const handleOpenAddModal = (dayNumber: number, city: string) => {
    setModalState({ isOpen: true, dayNumber, city });
  };

  const handleAddActivity = (dayNumber: number, activity: Omit<ActivityType, 'id'>) => {
    addActivity(dayNumber, activity);
  };

  return (
    <div className="min-h-screen bg-atmospheric pb-24">
      {/* Trip Sub Navigation */}
      <TripSubNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Itinerary Column (2 Cols on desktop) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Day Filter Pills */}
            <div className="bg-white p-2 rounded-2xl border border-[#E8EEF5] flex items-center gap-1.5 overflow-x-auto no-scrollbar shadow-xs">
              <button
                onClick={() => setActiveDayFilter('all')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeDayFilter === 'all'
                    ? 'bg-[#101827] text-white shadow-xs'
                    : 'text-[#64748B] hover:text-[#101827] hover:bg-[#F4FAFF]'
                }`}
              >
                All {currentTrip.totalDays} Days
              </button>

              {itineraryDays.map((day) => (
                <button
                  key={day.dayNumber}
                  onClick={() => setActiveDayFilter(day.dayNumber)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeDayFilter === day.dayNumber
                      ? 'bg-[#101827] text-white shadow-xs'
                      : 'text-[#64748B] hover:text-[#101827] hover:bg-[#F4FAFF]'
                  }`}
                >
                  Day {day.dayNumber}: {day.city}
                </button>
              ))}
            </div>

            {/* Render Days */}
            <div className="space-y-8">
              {daysToShow.map((day) => (
                <div
                  key={day.dayNumber}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8EEF5] editorial-card-shadow space-y-5"
                >
                  {/* Day Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E8EEF5] gap-3">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#168BFF] uppercase tracking-wider mb-0.5">
                        <span>Day {day.dayNumber}</span>
                        <span>•</span>
                        <span>{day.date}</span>
                      </div>
                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#101827]">
                        {day.theme}
                      </h2>
                      <p className="text-xs sm:text-sm text-[#64748B] mt-0.5 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#94A3B8]" />
                        <span>{day.city}</span>
                        <span>·</span>
                        <span>{day.activities.length} planned experiences</span>
                      </p>
                    </div>

                    {/* Add Activity Button */}
                    <button
                      onClick={() => handleOpenAddModal(day.dayNumber, day.city)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#F4FAFF] hover:bg-[#DFF1FF] text-[#168BFF] text-xs font-semibold rounded-full border border-[#E8EEF5] transition-all cursor-pointer shrink-0 self-start sm:self-auto"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Experience</span>
                    </button>
                  </div>

                  {/* Inter-city Transit Banner (If applicable) */}
                  {day.transitInfo && (
                    <div className="p-3.5 bg-[#FFF8ED] rounded-2xl border border-[#FDE68A] flex items-center justify-between text-xs text-[#92400E]">
                      <div className="flex items-center gap-2">
                        <Car className="w-4 h-4 text-[#E7A93B]" />
                        <span className="font-semibold">Transit: {day.transitInfo.fromCity} → {day.transitInfo.toCity}</span>
                        <span>({day.transitInfo.mode})</span>
                      </div>
                      <span className="font-bold">{day.transitInfo.durationHours}h · {day.transitInfo.distanceKm} km</span>
                    </div>
                  )}

                  {/* Activities List */}
                  <div className="space-y-3 pt-1">
                    {day.activities.map((activity, actIdx) => (
                      <ActivityCard
                        key={activity.id}
                        activity={activity}
                        index={actIdx}
                        totalActivities={day.activities.length}
                        onMoveUp={() => moveActivity(day.dayNumber, activity.id, 'up')}
                        onMoveDown={() => moveActivity(day.dayNumber, activity.id, 'down')}
                        onDelete={() => removeActivity(day.dayNumber, activity.id)}
                        onToggleComplete={() => toggleActivityCompleted(day.dayNumber, activity.id)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sticky Summary Sidebar */}
          <div className="space-y-6 lg:sticky lg:top-40">
            {/* Trip Health Widget */}
            <div className="bg-white rounded-3xl p-6 border border-[#E8EEF5] editorial-card-shadow space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8EEF5] pb-3">
                <h3 className="font-serif text-xl font-bold text-[#101827]">
                  Trip Health
                </h3>
                <span className="text-xs font-semibold text-[#168BFF]">
                  Live Algorithm
                </span>
              </div>

              <HealthGauge health={currentTrip.health} size="md" />

              <div className="pt-2">
                <Link
                  to={`/trip/${currentTrip.id}/intelligence`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#F4FAFF] hover:bg-[#DFF1FF] text-[#168BFF] text-xs font-semibold rounded-xl border border-[#E8EEF5] transition-colors"
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Deep Intelligence Analysis</span>
                </Link>
              </div>
            </div>

            {/* Quick Budget Ticker */}
            <div className="bg-white rounded-3xl p-6 border border-[#E8EEF5] editorial-card-shadow space-y-3">
              <h3 className="font-serif text-xl font-bold text-[#101827] border-b border-[#E8EEF5] pb-2">
                Cost Ticker
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#64748B]">
                  <span>Lodging (6 Nights)</span>
                  <span className="font-semibold text-[#101827]">₹48,000</span>
                </div>
                <div className="flex items-center justify-between text-[#64748B]">
                  <span>Intercity & Local Transit</span>
                  <span className="font-semibold text-[#101827]">₹22,000</span>
                </div>
                <div className="flex items-center justify-between text-[#64748B]">
                  <span>Curated Experiences</span>
                  <span className="font-semibold text-[#101827]">₹28,000</span>
                </div>
                <div className="flex items-center justify-between text-[#64748B]">
                  <span>Dining & Contingency</span>
                  <span className="font-semibold text-[#101827]">₹20,000</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E8EEF5] flex items-center justify-between">
                <span className="text-xs font-semibold text-[#101827]">Total Group Est.</span>
                <span className="text-base font-bold text-[#168BFF]">
                  ₹{currentTrip.estimatedTotalBudget.toLocaleString('en-IN')}
                </span>
              </div>

              <Link
                to={`/trip/${currentTrip.id}/budget`}
                className="block text-center text-[11px] font-semibold text-[#64748B] hover:text-[#168BFF] pt-1"
              >
                View Detailed Cost Allocations →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Add Activity Modal */}
      {modalState.isOpen && (
        <AddActivityModal
          dayNumber={modalState.dayNumber}
          city={modalState.city}
          onClose={() => setModalState({ isOpen: false, dayNumber: 1, city: '' })}
          onAdd={handleAddActivity}
        />
      )}
    </div>
  );
};
