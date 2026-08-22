import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Heart, Calendar, Compass, Sparkles, Layers, Trash2, Cloud, ShieldCheck, LogIn } from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { useAuth } from '../context/AuthContext';
import { TripCard } from '../components/cards/TripCard';
import { DestinationCard } from '../components/cards/DestinationCard';
import { DestinationDetailModal } from '../components/common/DestinationDetailModal';
import { ShareModal } from '../components/common/ShareModal';
import { INDIAN_DESTINATIONS } from '../data/destinations';
import { Trip, Destination } from '../types';

export const MyTrips: React.FC = () => {
  const { trips, deleteTrip, savedDestinationIds, currentTrip } = useTrip();
  const { user, openAuthModal } = useAuth();
  const [activeTab, setActiveTab] = useState<'all' | 'saved-destinations'>('all');
  const [sharingTrip, setSharingTrip] = useState<Trip | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  const savedDestinations = INDIAN_DESTINATIONS.filter((d) =>
    savedDestinationIds.includes(d.id)
  );

  return (
    <div className="min-h-screen bg-atmospheric pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-[#E8EEF5] gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#168BFF] uppercase tracking-wider mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>Your Travel Portfolio</span>
              <span className="text-[#94A3B8]">·</span>
              <span className="flex items-center gap-1 text-emerald-600 font-bold lowercase first-letter:uppercase">
                <Cloud className="w-3 h-3" />
                {user ? 'Firestore synced' : 'Local drafts'}
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#101827]">
              My Yatris & Saved Journeys
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1">
              Manage your active itineraries, saved drafts, and curated bucket list.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {!user && (
              <button
                onClick={() => openAuthModal('login')}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-[#F8FAFC] text-[#101827] border border-[#D9E2EC] text-xs sm:text-sm font-semibold rounded-full shadow-xs transition-all cursor-pointer"
              >
                <LogIn className="w-4 h-4 text-[#FF5E1E]" />
                <span>Sign In to Sync</span>
              </button>
            )}
            <Link
              to="/plan"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#101827] hover:bg-[#168BFF] text-white text-xs sm:text-sm font-semibold rounded-full shadow-md transition-all self-start sm:self-auto cursor-pointer hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Trip</span>
            </Link>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 pt-6 mb-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#101827] text-white shadow-xs'
                : 'bg-white text-[#64748B] hover:text-[#101827] border border-[#E8EEF5]'
            }`}
          >
            All Trips ({trips.length})
          </button>

          <button
            onClick={() => setActiveTab('saved-destinations')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'saved-destinations'
                ? 'bg-[#101827] text-white shadow-xs'
                : 'bg-white text-[#64748B] hover:text-[#101827] border border-[#E8EEF5]'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-[#D9534F] fill-current" />
            <span>Saved Bucket List ({savedDestinations.length})</span>
          </button>
        </div>

        {/* Tab 1: Trips Grid */}
        {activeTab === 'all' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.map((trip) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  onDelete={(id) => deleteTrip(id)}
                  onShare={(t) => setSharingTrip(t)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Saved Destinations */}
        {activeTab === 'saved-destinations' && (
          <div>
            {savedDestinations.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedDestinations.map((dest) => (
                  <DestinationCard
                    key={dest.id}
                    destination={dest}
                    onSelect={(d) => setSelectedDestination(d)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-[#E8EEF5] space-y-4">
                <Heart className="w-12 h-12 text-[#94A3B8] mx-auto" />
                <h3 className="font-serif text-2xl font-bold text-[#101827]">
                  No saved destinations yet
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B]">
                  Click the heart icon on any destination card in the Discover section to save it here.
                </p>
                <Link
                  to="/discover"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#101827] text-white text-xs font-semibold rounded-full hover:bg-[#168BFF] transition-colors"
                >
                  <Compass className="w-4 h-4" />
                  <span>Discover Destinations</span>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Share Modal */}
      {sharingTrip && <ShareModal trip={sharingTrip} onClose={() => setSharingTrip(null)} />}

      {/* Destination Detail Modal */}
      {selectedDestination && (
        <DestinationDetailModal
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
        />
      )}
    </div>
  );
};
