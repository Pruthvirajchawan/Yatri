import React, { useState } from 'react';
import {
  Sparkles,
  MapPin,
  CheckCircle2,
  Award,
  Utensils,
  Landmark,
  Trees,
  Users,
  Sunrise,
  Compass,
  Calendar,
  Layers,
  Heart,
  Globe,
  SlidersHorizontal,
  LucideIcon
} from 'lucide-react';
import { USER_PROFILE } from '../data/userProfile';
import { useTrip } from '../context/TripContext';
import { TravelStyle } from '../types';

const getDnaIcon = (name: string): LucideIcon => {
  switch (name) {
    case 'Utensils':
      return Utensils;
    case 'Landmark':
      return Landmark;
    case 'Trees':
      return Trees;
    case 'Sparkles':
      return Sparkles;
    case 'Compass':
      return Compass;
    case 'Users':
      return Users;
    case 'Sunrise':
      return Sunrise;
    default:
      return Sparkles;
  }
};

export const Profile: React.FC = () => {
  const { trips } = useTrip();
  const [profile, setProfile] = useState(USER_PROFILE);
  const [activeTab, setActiveTab] = useState<'dna' | 'preferences'>('dna');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleStyleChange = (style: TravelStyle) => {
    setProfile({ ...profile, preferredStyle: style });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleDietaryChange = (diet: string) => {
    setProfile({ ...profile, dietaryPreference: diet });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="min-h-screen bg-atmospheric pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8EEF5] editorial-card-shadow flex flex-col sm:flex-row items-center gap-6">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-[#F4FAFF] shadow-md shrink-0"
          />

          <div className="space-y-1.5 text-center sm:text-left flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#DFF1FF] text-[#168BFF] rounded-full text-xs font-semibold">
              <Award className="w-3.5 h-3.5" />
              <span>Verified Yatri Traveler</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-[#101827]">
              {profile.name}
            </h1>
            <p className="text-xs text-[#64748B] flex items-center justify-center sm:justify-start gap-1.5 flex-wrap">
              <MapPin className="w-3.5 h-3.5 text-[#94A3B8]" />
              <span>{profile.location}</span>
              <span>·</span>
              <Calendar className="w-3.5 h-3.5 text-[#94A3B8]" />
              <span>Member since {profile.memberSince}</span>
              <span>·</span>
              <Layers className="w-3.5 h-3.5 text-[#94A3B8]" />
              <span>{profile.totalTripsCount || trips.length} journeys logged</span>
            </p>
          </div>

          <div className="bg-[#F4FAFF] p-4 rounded-2xl border border-[#E8EEF5] text-center shrink-0">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#168BFF] block">
              Travel Archetype
            </span>
            <span className="font-serif text-lg font-bold text-[#101827] block mt-0.5">
              {profile.preferredStyle} Explorer
            </span>
            <span className="text-[10px] text-[#64748B] mt-0.5 block">
              {profile.statesExploredCount} Indian States Explored
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('dna')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'dna'
                ? 'bg-[#101827] text-white shadow-xs'
                : 'bg-white text-[#64748B] hover:text-[#101827] border border-[#E8EEF5]'
            }`}
          >
            Travel DNA Dimensions ({profile.travelDNA?.length || 0})
          </button>

          <button
            onClick={() => setActiveTab('preferences')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'preferences'
                ? 'bg-[#101827] text-white shadow-xs'
                : 'bg-white text-[#64748B] hover:text-[#101827] border border-[#E8EEF5]'
            }`}
          >
            Pacing & Travel Preferences
          </button>
        </div>

        {/* Tab 1: Travel DNA Breakdown */}
        {activeTab === 'dna' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8EEF5] editorial-card-shadow space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#168BFF] block">
                  Psychographic Profiling
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#101827] mt-0.5">
                  Your Travel DNA Breakdown
                </h3>
                <p className="text-xs text-[#64748B] mt-1">
                  Yatri uses these multidimensional scores to automatically curate itinerary pacing, eliminate rush friction, and highlight culinary and cultural moments tailored for you.
                </p>
              </div>

              {/* DNA Dimension Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {profile.travelDNA.map((dnaItem, idx) => {
                  const Icon = getDnaIcon(dnaItem.iconName);
                  return (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl border border-[#E8EEF5] bg-[#F4FAFF]/40 hover:border-[#168BFF]/40 transition-all space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-white text-[#168BFF] shadow-xs flex items-center justify-center border border-[#E8EEF5]">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-[#101827]">{dnaItem.category}</h4>
                            <span className="text-[10px] text-[#64748B]">Score: {dnaItem.score}/100</span>
                          </div>
                        </div>
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                            dnaItem.score >= 80
                              ? 'bg-[#EBFBF2] text-[#065F46]'
                              : dnaItem.score >= 60
                              ? 'bg-[#DFF1FF] text-[#168BFF]'
                              : 'bg-[#FFF7ED] text-[#C2410C]'
                          }`}
                        >
                          {dnaItem.score}%
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-2 bg-white rounded-full overflow-hidden border border-[#E8EEF5]">
                        <div
                          style={{ width: `${dnaItem.score}%` }}
                          className={`h-full rounded-full ${
                            dnaItem.score >= 80
                              ? 'bg-[#35A86B]'
                              : dnaItem.score >= 60
                              ? 'bg-[#168BFF]'
                              : 'bg-[#E7A93B]'
                          }`}
                        />
                      </div>

                      <p className="text-xs text-[#64748B] leading-relaxed">
                        {dnaItem.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Preferences */}
        {activeTab === 'preferences' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8EEF5] editorial-card-shadow space-y-6">
            <h3 className="font-serif text-2xl font-bold text-[#101827]">
              Pacing & Travel Style Preferences
            </h3>

            <div className="space-y-4">
              <label className="text-xs font-semibold text-[#101827] block">
                Default Itinerary Style:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(['Relaxed', 'Balanced', 'Explorer'] as const).map((style) => (
                  <button
                    key={style}
                    onClick={() => handleStyleChange(style)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      profile.preferredStyle === style
                        ? 'bg-[#F4FAFF] border-[#168BFF] shadow-xs'
                        : 'bg-white border-[#E8EEF5] hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-[#101827]">{style}</span>
                      {profile.preferredStyle === style && (
                        <CheckCircle2 className="w-4 h-4 text-[#168BFF]" />
                      )}
                    </div>
                    <span className="text-[11px] text-[#64748B]">
                      {style === 'Relaxed'
                        ? 'Max 2 stops/day with ample leisure'
                        : style === 'Balanced'
                        ? '3-4 stops with afternoon rest buffers'
                        : 'Action-packed high-fulfillment coverage'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <label className="text-xs font-semibold text-[#101827] block">
                Dietary & Food Preference:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Authentic Local & Vegetarian Friendly',
                  'All-Inclusive Non-Vegetarian & Seafood',
                  'Pure Jain / Sattvic Cuisine',
                  'Vegan & Organic Focus'
                ].map((diet) => (
                  <button
                    key={diet}
                    onClick={() => handleDietaryChange(diet)}
                    className={`p-3.5 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                      profile.dietaryPreference === diet
                        ? 'bg-[#F4FAFF] border-[#168BFF] text-[#101827]'
                        : 'bg-white border-[#E8EEF5] text-[#64748B] hover:border-slate-300'
                    }`}
                  >
                    <span>{diet}</span>
                    {profile.dietaryPreference === diet && (
                      <CheckCircle2 className="w-4 h-4 text-[#168BFF] shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {saveSuccess && (
              <div className="p-3 bg-[#EBFBF2] text-[#065F46] rounded-xl text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#35A86B]" />
                <span>Travel preferences saved! All future generated trips will default to this pacing and dietary setup.</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
