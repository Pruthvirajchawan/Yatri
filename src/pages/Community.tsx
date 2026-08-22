import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Heart, Sparkles, Copy, Route } from 'lucide-react';
import { COMMUNITY_STORIES } from '../data/community';
import { useTrip } from '../context/TripContext';
import { CommunityStory } from '../types';

export const Community: React.FC = () => {
  const navigate = useNavigate();
  const { createNewTrip } = useTrip();
  const [stories, setStories] = useState<CommunityStory[]>(COMMUNITY_STORIES);
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [clonedToast, setClonedToast] = useState<string | null>(null);

  const toggleLike = (id: string) => {
    if (likedIds.includes(id)) {
      setLikedIds(likedIds.filter((item) => item !== id));
      setStories(stories.map((s) => (s.id === id ? { ...s, likesCount: s.likesCount - 1 } : s)));
    } else {
      setLikedIds([...likedIds, id]);
      setStories(stories.map((s) => (s.id === id ? { ...s, likesCount: s.likesCount + 1 } : s)));
    }
  };

  const handleCloneTrip = async (story: CommunityStory) => {
    const days = parseInt(story.duration) || 5;
    await createNewTrip({
      title: `${story.route.join(' · ')} Community Yatri`,
      destinationSummary: story.route.join(' · '),
      startDate: '2026-11-01',
      endDate: '2026-11-08',
      totalDays: days,
      travelerCount: 2,
      budgetPerPerson: 25000,
      travelStyle: 'Balanced',
      coverImage: story.image
    });

    setClonedToast(`Cloned "${story.title}" into your My Trips!`);
    setTimeout(() => {
      setClonedToast(null);
      navigate('/my-trips');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-atmospheric pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full border border-[#E8EEF5] floating-nav-shadow text-xs font-semibold text-[#101827]">
            <Users className="w-3.5 h-3.5 text-[#168BFF]" />
            <span>Real Journeys by Real Yatris</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#101827]">
            Community Itineraries & Stories
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Browse realistic, field-tested itineraries crafted by fellow Indian travelers. 1-click clone any journey directly into your planner.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => {
            const isLiked = likedIds.includes(story.id);
            return (
              <div
                key={story.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#E8EEF5] hover:border-[#168BFF]/40 transition-all duration-300 editorial-card-shadow flex flex-col justify-between"
              >
                {/* Image & author overlay */}
                <div className="relative h-52 bg-[#101827]">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Top Destination Badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[#101827] rounded-full text-xs font-semibold">
                      {story.duration} · {story.style}
                    </span>

                    <button
                      onClick={() => toggleLike(story.id)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all cursor-pointer ${
                        isLiked
                          ? 'bg-[#D9534F] text-white'
                          : 'bg-white/80 text-[#101827] hover:bg-white'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Author avatar & name on bottom of image */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2.5 text-white">
                    <img
                      src={story.authorAvatar}
                      alt={story.author}
                      className="w-8 h-8 rounded-full object-cover border-2 border-white"
                    />
                    <div>
                      <span className="font-semibold text-xs block leading-tight">
                        {story.author}
                      </span>
                      <span className="text-[10px] text-white/80">{story.likesCount} Yatris loved this</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl font-bold text-[#101827] leading-snug">
                      {story.title}
                    </h3>
                    <p className="text-xs text-[#64748B] leading-relaxed line-clamp-3">
                      "{story.summary}"
                    </p>
                  </div>

                  {/* Route Highlights */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] uppercase font-bold text-[#94A3B8] flex items-center gap-1">
                      <Route className="w-3 h-3 text-[#168BFF]" />
                      Route Circuit:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {story.route.map((city, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-[#F4FAFF] text-[#101827] text-[10px] font-semibold rounded-md border border-[#E8EEF5]"
                        >
                          {city}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and Clone Action */}
                  <div className="pt-3 border-t border-[#E8EEF5] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#94A3B8] block uppercase font-bold">
                        Actual Spend
                      </span>
                      <span className="font-serif font-bold text-sm text-[#101827]">
                        {story.budget}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCloneTrip(story)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#101827] hover:bg-[#168BFF] text-white text-xs font-semibold rounded-full shadow-xs transition-all cursor-pointer hover:scale-105"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Clone Trip</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Toast */}
      {clonedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#101827] text-white px-5 py-3 rounded-2xl shadow-xl text-xs sm:text-sm flex items-center gap-2 animate-in fade-in duration-200">
          <Sparkles className="w-4 h-4 text-[#168BFF]" />
          <span>{clonedToast}</span>
        </div>
      )}
    </div>
  );
};
