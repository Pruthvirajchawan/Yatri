import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, Calendar, MapPin, Users, IndianRupee, Compass, Clock, Check, ArrowRight, ShieldCheck, Heart, Wand2 } from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { INDIAN_DESTINATIONS } from '../data/destinations';

export const Planner: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { createTrip } = useTrip();

  // Pre-fill state if passed from Hero bar or cards
  const stateData = (location.state as any) || {};

  const [prompt, setPrompt] = useState(
    stateData.prompt || 'A 7-day heritage and lakeside escape through Jaipur and Udaipur with sunset spots and leisure courtyards.'
  );
  const [selectedDestination, setSelectedDestination] = useState<string>(
    stateData.destination || 'Rajasthan (Jaipur & Jodhpur)'
  );
  const [startDate, setStartDate] = useState('2026-10-12');
  const [totalDays, setTotalDays] = useState<number>(7);
  const [travelerCount, setTravelerCount] = useState<number>(stateData.travelers || 4);
  const [budgetPerPerson, setBudgetPerPerson] = useState<number>(stateData.budget || 29500);
  const [travelStyle, setTravelStyle] = useState<'Relaxed' | 'Balanced' | 'Explorer'>('Balanced');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Heritage & Forts',
    'Sunset Viewpoints',
    'Local Street Food'
  ]);
  const [isGenerating, setIsGenerating] = useState(false);

  const interestOptions = [
    'Heritage & Forts',
    'Sunset Viewpoints',
    'Local Street Food',
    'Lake Cruises & Haveli Stays',
    'Desert Safari & Dunes',
    'Spiritual Ghats',
    'Artisans & Handicrafts',
    'Nature & Wildlife'
  ];

  const quickPrompts = [
    '7-Day Rajasthan royal forts and blue city alleys for 4 friends under ₹30k',
    '5-Day slow backwater escape and Ayurvedic wellness in Kerala for couples',
    '6-Day Kashmir alpine lakes, tulip gardens and houseboat living in Srinagar',
    '4-Day beach cafes, heritage Portuguese churches, and spice farms in Goa'
  ];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const newTrip = await createTrip({
        title: `${selectedDestination.split('(')[0].trim()} Signature Yatri`,
        destinationSummary: selectedDestination,
        startDate,
        endDate: '2026-10-18',
        totalDays,
        travelerCount,
        budgetPerPerson,
        travelStyle,
        coverImage:
          INDIAN_DESTINATIONS.find((d) => selectedDestination.includes(d.name))?.heroImage ||
          'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop'
      });

      navigate(`/trip/${newTrip.id}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-atmospheric pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full border border-[#E8EEF5] floating-nav-shadow text-xs font-semibold text-[#101827]">
            <Wand2 className="w-3.5 h-3.5 text-[#168BFF]" />
            <span>Decision-Aware Trip Architect</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#101827] tracking-tight">
            Plan Your Realistic Yatri
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Specify your vision in natural language or customize dates, pacing, and group budget below.
          </p>
        </div>

        {/* Quick NLP Prompt Input Box */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E8EEF5] editorial-card-shadow mb-8 space-y-3">
          <label className="text-xs font-semibold text-[#101827] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#168BFF]" />
            <span>Describe Your Dream Journey in Natural Language</span>
          </label>
          <textarea
            rows={2}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. A 7-day leisurely trip to Rajasthan with 4 friends under ₹35,000 each with sunset viewpoints and fort heritage..."
            className="w-full p-4 bg-[#F4FAFF] rounded-xl border border-[#E8EEF5] text-xs sm:text-sm text-[#101827] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#168BFF]"
          />

          {/* Quick Prompt Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pt-1 no-scrollbar text-xs">
            <span className="text-[11px] text-[#94A3B8] font-medium shrink-0">Try prompt:</span>
            {quickPrompts.map((qp, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPrompt(qp)}
                className="px-3 py-1 bg-[#F4FAFF] hover:bg-[#DFF1FF] text-[#64748B] hover:text-[#168BFF] rounded-lg border border-[#E8EEF5] shrink-0 text-[11px] transition-colors cursor-pointer"
              >
                {qp.slice(0, 36)}...
              </button>
            ))}
          </div>
        </div>

        {/* Structured Form Card */}
        <form
          onSubmit={handleGenerate}
          className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8EEF5] editorial-card-shadow space-y-8"
        >
          {/* Section 1: Destination and Duration */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#101827] border-b border-[#E8EEF5] pb-2">
              1. Destination & Duration
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#101827] block mb-1.5">
                  Select Destination Circuit
                </label>
                <select
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F4FAFF] rounded-xl border border-[#E8EEF5] text-xs sm:text-sm font-semibold text-[#101827] focus:outline-none focus:border-[#168BFF]"
                >
                  {INDIAN_DESTINATIONS.map((d) => (
                    <option key={d.id} value={`${d.name} (${d.state})`}>
                      {d.name} — {d.state} ({d.durationDays} Days / {d.region})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#101827] block mb-1.5">
                  Trip Duration (Days)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="3"
                    max="14"
                    value={totalDays}
                    onChange={(e) => setTotalDays(Number(e.target.value))}
                    className="flex-1 accent-[#168BFF] cursor-pointer"
                  />
                  <span className="w-16 text-center px-3 py-2 bg-[#F4FAFF] rounded-xl font-bold text-xs sm:text-sm text-[#101827] border border-[#E8EEF5]">
                    {totalDays} Days
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Pacing & Travel Style */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#101827] border-b border-[#E8EEF5] pb-2">
              2. Pacing & Travel Style
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  style: 'Relaxed' as const,
                  title: 'Relaxed Pacing',
                  desc: 'Max 2 activities/day. Ample lakeside tea breaks and late mornings.'
                },
                {
                  style: 'Balanced' as const,
                  title: 'Balanced Pacing',
                  desc: '3-4 activities/day with structured downtime and scenic transit.'
                },
                {
                  style: 'Explorer' as const,
                  title: 'Explorer Pacing',
                  desc: 'High energy, sunrise hikes, hidden trails, maximum coverage.'
                }
              ].map((item) => (
                <div
                  key={item.style}
                  onClick={() => setTravelStyle(item.style)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    travelStyle === item.style
                      ? 'bg-[#F4FAFF] border-[#168BFF] shadow-xs'
                      : 'bg-white border-[#E8EEF5] hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-serif font-bold text-sm text-[#101827]">
                      {item.title}
                    </span>
                    {travelStyle === item.style && (
                      <span className="w-4 h-4 rounded-full bg-[#168BFF] text-white flex items-center justify-center text-[10px]">
                        ✓
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#64748B] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Group & Budget */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#101827] border-b border-[#E8EEF5] pb-2">
              3. Group Size & Budget
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#101827] block mb-1.5">
                  Number of Travelers
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 4, 6, 8].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setTravelerCount(num)}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        travelerCount === num
                          ? 'bg-[#101827] text-white shadow-xs'
                          : 'bg-[#F4FAFF] text-[#64748B] hover:text-[#101827] border border-[#E8EEF5]'
                      }`}
                    >
                      {num} {num === 1 ? 'Solo' : num === 2 ? 'Duo' : 'Pax'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#101827] block mb-1.5">
                  Budget per Person (₹)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="10000"
                    max="80000"
                    step="2500"
                    value={budgetPerPerson}
                    onChange={(e) => setBudgetPerPerson(Number(e.target.value))}
                    className="flex-1 accent-[#168BFF] cursor-pointer"
                  />
                  <span className="w-24 text-center px-3 py-2 bg-[#F4FAFF] rounded-xl font-bold text-xs sm:text-sm text-[#101827] border border-[#E8EEF5]">
                    ₹{budgetPerPerson.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Focus & Interests */}
          <div className="space-y-3">
            <h3 className="font-serif text-xl font-bold text-[#101827] border-b border-[#E8EEF5] pb-2">
              4. Key Priorities
            </h3>

            <div className="flex flex-wrap gap-2 pt-1">
              {interestOptions.map((interest) => {
                const isSelected = selectedInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#168BFF] text-white shadow-xs'
                        : 'bg-[#F4FAFF] text-[#64748B] hover:text-[#101827] border border-[#E8EEF5]'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    <span>{interest}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-[#E8EEF5] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#64748B] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#35A86B]" />
              <span>
                Total Est. Group Budget: <strong className="text-[#101827]">₹{(travelerCount * budgetPerPerson).toLocaleString('en-IN')}</strong>
              </span>
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full sm:w-auto px-9 py-4 bg-[#101827] hover:bg-[#168BFF] text-white text-xs sm:text-sm font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-blue-300" />
                  <span>Validating Itinerary Intelligence...</span>
                </>
              ) : (
                <>
                  <span>Generate Validated Yatri</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
