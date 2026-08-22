import React, { useState, useEffect } from 'react';
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
  LucideIcon,
  LogIn,
  LogOut,
  Edit3,
  Save,
  ShieldCheck,
  User as UserIcon,
  Cloud
} from 'lucide-react';
import { USER_PROFILE } from '../data/userProfile';
import { useTrip } from '../context/TripContext';
import { useAuth } from '../context/AuthContext';
import { TravelStyle } from '../types';
import { TravelerAvatar } from '../components/common/TravelerAvatar';

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
  const { trips, savedDestinationIds } = useTrip();
  const { user, userProfile, openAuthModal, logout, updateUserProfileData } = useAuth();
  
  const [profile, setProfile] = useState(USER_PROFILE);
  const [activeTab, setActiveTab] = useState<'dna' | 'preferences' | 'account'>('dna');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(userProfile?.name || USER_PROFILE.name);
  const [editLocation, setEditLocation] = useState(userProfile?.location || USER_PROFILE.location);
  const [editBio, setEditBio] = useState(userProfile?.bio || 'Passionate about cultural trails, mountain circuits & sustainable Indian heritage journeys.');

  useEffect(() => {
    if (userProfile) {
      setEditName(userProfile.name);
      setEditLocation(userProfile.location || 'Pune, Maharashtra, India');
      if (userProfile.bio) setEditBio(userProfile.bio);
    }
  }, [userProfile]);

  const handleSaveProfile = async () => {
    await updateUserProfileData({
      name: editName,
      location: editLocation,
      bio: editBio
    });
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleStyleChange = (style: TravelStyle) => {
    setProfile({ ...profile, preferredStyle: style });
    if (user) {
      updateUserProfileData({ travelStyle: `${style} Explorer` }).catch(() => {});
    }
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleDietaryChange = (diet: string) => {
    setProfile({ ...profile, dietaryPreference: diet });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const displayName = userProfile?.name || (user ? (user.displayName || 'Traveler') : USER_PROFILE.name);
  const displayLocation = userProfile?.location || USER_PROFILE.location;
  const displayEmail = user?.email || USER_PROFILE.email;

  return (
    <div className="min-h-screen bg-atmospheric pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8EEF5] editorial-card-shadow flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
          {/* Cloud Active indicator */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200/80 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
              <Cloud className="w-3 h-3 text-emerald-600" />
              {user ? 'Firestore Live Synced' : 'Offline Guest Mode'}
            </span>
          </div>

          <div className="relative shrink-0">
            <TravelerAvatar size="lg" showBadge />
          </div>

          <div className="space-y-1.5 text-center sm:text-left flex-1 pt-2 sm:pt-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#DFF1FF] text-[#168BFF] rounded-full text-xs font-semibold">
              <Award className="w-3.5 h-3.5" />
              <span>Verified Yatri Traveler</span>
            </div>

            {isEditing ? (
              <div className="space-y-2 mt-2">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-[#168BFF] text-xl font-serif font-bold text-[#101827] w-full"
                  placeholder="Full Name"
                />
                <input
                  type="text"
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  className="px-3 py-1 rounded-xl border border-[#D9E2EC] text-xs text-[#64748B] w-full"
                  placeholder="City, State, Country"
                />
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={handleSaveProfile}
                    className="px-3.5 py-1.5 bg-[#101827] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 hover:bg-[#168BFF] cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-3.5 py-1.5 bg-[#F1F5F9] text-[#64748B] rounded-xl text-xs font-semibold hover:bg-[#E2E8F0] cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h1 className="font-serif text-3xl font-bold text-[#101827]">
                    {displayName}
                  </h1>
                  {user && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-1.5 text-[#94A3B8] hover:text-[#101827] rounded-lg hover:bg-[#F1F5F9] cursor-pointer"
                      title="Edit Profile"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <p className="text-xs text-[#64748B] flex items-center justify-center sm:justify-start gap-1.5 flex-wrap">
                  <MapPin className="w-3.5 h-3.5 text-[#94A3B8]" />
                  <span>{displayLocation}</span>
                  <span>·</span>
                  <Calendar className="w-3.5 h-3.5 text-[#94A3B8]" />
                  <span>{userProfile?.memberSince || 'Member since 2026'}</span>
                  <span>·</span>
                  <Layers className="w-3.5 h-3.5 text-[#94A3B8]" />
                  <span>{trips.length} active itineraries</span>
                  <span>·</span>
                  <Heart className="w-3.5 h-3.5 text-rose-500" />
                  <span>{savedDestinationIds.length} saved destinations</span>
                </p>
              </>
            )}
          </div>

          <div className="bg-[#F4FAFF] p-4 rounded-2xl border border-[#E8EEF5] text-center shrink-0 w-full sm:w-auto">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#168BFF] block">
              Travel Archetype
            </span>
            <span className="font-serif text-lg font-bold text-[#101827] block mt-0.5">
              {profile.preferredStyle} Explorer
            </span>
            <span className="text-[10px] text-[#64748B] mt-0.5 block">
              {USER_PROFILE.statesExploredCount} Indian States Explored
            </span>
          </div>
        </div>

        {/* Authentication Callout Banner if Guest */}
        {!user ? (
          <div className="bg-gradient-to-r from-[#101827] to-[#1E293B] rounded-3xl p-6 sm:p-7 text-white flex flex-col sm:flex-row items-center justify-between gap-5 shadow-lg border border-[#334E68]">
            <div className="space-y-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-[#FF5E1E]/20 text-[#FF8C38] rounded-full text-xs font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Cloud Account Benefits</span>
              </div>
              <h3 className="text-xl font-bold font-serif">Sign in to save trips across devices</h3>
              <p className="text-xs text-white/75 max-w-lg">
                Unlock instant live synchronization, cloud backup, PNR travel records, and custom collaborative itineraries powered by Firestore database.
              </p>
            </div>
            <div className="flex gap-2.5 shrink-0">
              <button
                onClick={() => openAuthModal('login')}
                className="px-5 py-2.5 rounded-xl bg-white text-[#101827] font-semibold text-xs hover:bg-[#F8FAFC] shadow-sm transition-all cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => openAuthModal('signup')}
                className="px-5 py-2.5 rounded-xl bg-[#FF5E1E] text-white font-semibold text-xs hover:brightness-105 shadow-sm transition-all cursor-pointer"
              >
                Create Account
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-950">Signed in as {displayEmail}</p>
                <p className="text-[11px] text-emerald-700">Authenticated via Firebase · Real-time Firestore sync enabled</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-white text-red-600 border border-red-200 rounded-xl text-xs font-semibold hover:bg-red-50 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        )}

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
                <span>Travel preferences saved to database! All future generated trips will default to this pacing and dietary setup.</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
