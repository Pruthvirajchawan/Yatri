import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Heart,
  Compass,
  Star,
  ChevronLeft,
  ChevronRight,
  Play,
  CheckCircle2,
  Clock,
  Zap,
  Users,
  Layers,
  MapPin,
  Luggage,
  Calendar,
  Check,
  Award,
  ChevronDown,
  Mountain,
  Sun,
  Compass as CompassIcon,
  Tent
} from 'lucide-react';
import { ThreeDCapsuleCards } from '../components/cards/ThreeDCapsuleCards';
import { IndiaDestinationModal } from '../components/common/IndiaDestinationModal';
import { VideoPlayerModal } from '../components/common/VideoPlayerModal';
import {
  INDIA_TOP_DESTINATIONS,
  INDIA_EXPERIENCES,
  TRAVELER_TESTIMONIALS,
  QUICK_PLAN_DESTINATIONS,
  IndiaDestination,
  formatINR
} from '../data/indiaData';
import { useTrip } from '../context/TripContext';

const HERO_BACKGROUNDS: Record<string, { image: string; title: string; altitude: string; temp: string }> = {
  ladakh: {
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=85&w=2400&auto=format&fit=crop',
    title: 'Ladakh High Passes',
    altitude: '14,270 ft',
    temp: '6°C'
  },
  gujarat: {
    image: '/images/gujarat_somnath_bg.jpg',
    title: 'Gujarat Sacred Shore (Somnath)',
    altitude: 'Prabhas Patan Coast',
    temp: '27°C'
  },
  kerala: {
    image: '/images/kerala_bg.jpg',
    title: 'Kerala Backwaters & Hills',
    altitude: 'Vembanad & Munnar',
    temp: '26°C'
  }
};

const DEFAULT_HERO_INFO = {
  image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=85&w=2400&auto=format&fit=crop',
  title: 'Himalayan Range',
  altitude: '11,500 ft',
  temp: '12°C'
};

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { createTrip } = useTrip();

  // State management
  const [hoveredCapsuleId, setHoveredCapsuleId] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<IndiaDestination | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [testimonialTab, setTestimonialTab] = useState<'text' | 'video'>('text');
  const [savedFavorites, setSavedFavorites] = useState<Record<string, boolean>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Quick Plan In Minutes State
  const [quickPlanDestId, setQuickPlanDestId] = useState<string>('jaipur');
  const [selectedActivities, setSelectedActivities] = useState<string[]>(['j-1', 'j-2']);

  // Experience carousel ref
  const experienceScrollRef = useRef<HTMLDivElement>(null);
  const testimonialScrollRef = useRef<HTMLDivElement>(null);

  const activePlanDest = QUICK_PLAN_DESTINATIONS.find((d) => d.id === quickPlanDestId) || QUICK_PLAN_DESTINATIONS[0];

  const handleSelectPlanDest = (destId: string) => {
    setQuickPlanDestId(destId);
    const dest = QUICK_PLAN_DESTINATIONS.find((d) => d.id === destId);
    if (dest && dest.activities.length >= 2) {
      setSelectedActivities([dest.activities[0].id, dest.activities[1].id]);
    } else if (dest) {
      setSelectedActivities(dest.activities.map((a) => a.id));
    }
  };

  const handleToggleActivity = (actId: string) => {
    setSelectedActivities((prev) =>
      prev.includes(actId)
        ? prev.filter((id) => id !== actId)
        : [...prev, actId]
    );
  };

  const activeActivitiesTotal = activePlanDest.activities
    .filter((a) => selectedActivities.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);

  const calculatedQuickPlanPrice = activePlanDest.basePrice + activeActivitiesTotal;

  const handleBookQuickPlan = async () => {
    await createTrip({
      title: `${activePlanDest.name} Signature Explorer`,
      destinationSummary: `${activePlanDest.name}, ${activePlanDest.state}`,
      startDate: '2026-10-15',
      endDate: '2026-10-18',
      totalDays: activePlanDest.durationDays,
      travelerCount: 2,
      budgetPerPerson: calculatedQuickPlanPrice,
      coverImage: activePlanDest.image,
      travelStyle: 'Balanced'
    });
    navigate(`/plan?destination=${encodeURIComponent(activePlanDest.name)}`);
  };

  const currentHeroInfo = hoveredCapsuleId && HERO_BACKGROUNDS[hoveredCapsuleId]
    ? HERO_BACKGROUNDS[hoveredCapsuleId]
    : DEFAULT_HERO_INFO;

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedFavorites((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleScroll = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleSelectFromCapsule = (destinationId: string) => {
    const matched = INDIA_TOP_DESTINATIONS.find((d) => d.id.includes(destinationId));
    if (matched) {
      setSelectedDestination(matched);
    } else {
      navigate('/discover');
    }
  };

  // Filtered destinations by category
  const filteredDestinations = selectedCategory === 'All'
    ? INDIA_TOP_DESTINATIONS
    : INDIA_TOP_DESTINATIONS.filter((d) => {
        if (selectedCategory === 'Heritage') return d.category === 'Heritage';
        if (selectedCategory === 'Beaches & Backwaters') return d.category === 'Beaches' || d.category === 'Backwaters';
        if (selectedCategory === 'Spiritual') return d.category === 'Spiritual';
        if (selectedCategory === 'Wildlife') return d.category === 'Wildlife';
        if (selectedCategory === 'Mountains') return d.category === 'Mountains';
        return true;
      });

  const categories = ['All', 'Heritage', 'Beaches & Backwaters', 'Spiritual', 'Wildlife', 'Mountains'];

  return (
    <div className="min-h-screen bg-white text-[#101827] overflow-x-hidden font-sans">
      {/* =========================================================================
          HERO SECTION — Preserved 3 Places (Ladakh, Gujarat Somnath, Kerala) with 3D Capsule Cards
      ========================================================================= */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden bg-[#F4FAFF]">
        {/* Scenery Background with Smooth Dynamic Hover Switching */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Default Base Background */}
          <img
            src={DEFAULT_HERO_INFO.image}
            alt="Incredible India Landscape"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out filter contrast-110 saturate-110 ${
              hoveredCapsuleId ? 'opacity-0 scale-105' : 'opacity-65 scale-100'
            }`}
          />

          {/* Ladakh Hover Background */}
          <img
            src={HERO_BACKGROUNDS.ladakh.image}
            alt="Ladakh Mountain High Passes"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out filter contrast-110 saturate-110 ${
              hoveredCapsuleId === 'ladakh' ? 'opacity-85 scale-100' : 'opacity-0 scale-105'
            }`}
          />

          {/* Gujarat Hover Background */}
          <img
            src={HERO_BACKGROUNDS.gujarat.image}
            alt="Gujarat Somnath Temple Sacred Coast"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out filter contrast-105 saturate-110 ${
              hoveredCapsuleId === 'gujarat' ? 'opacity-90 scale-100' : 'opacity-0 scale-105'
            }`}
          />

          {/* Kerala Hover Background */}
          <img
            src={HERO_BACKGROUNDS.kerala.image}
            alt="Kerala Alleppey Backwaters and Houseboats"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out filter contrast-105 saturate-115 ${
              hoveredCapsuleId === 'kerala' ? 'opacity-90 scale-100' : 'opacity-0 scale-105'
            }`}
          />

          {/* Clean gradient overlay ensuring scenery is vibrant while text stays super crisp */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white/95" />
          <div className="absolute inset-0 bg-radial from-transparent via-transparent to-white/30" />
        </div>

        {/* Floating Region & Weather Pill */}
        <div className="hidden sm:flex absolute top-20 right-8 z-10 items-center gap-2 px-3.5 py-1.5 bg-white/85 backdrop-blur-md rounded-full border border-sky-100 shadow-sm text-xs font-medium text-[#1e293b] transition-all duration-300">
          <Compass className="w-3.5 h-3.5 text-[#168BFF]" />
          <span className="transition-all duration-300">{currentHeroInfo.title}</span>
          <span className="text-slate-300">•</span>
          <span className="text-[#168BFF] font-semibold transition-all duration-300">{currentHeroInfo.altitude}</span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1 text-amber-500 font-semibold transition-all duration-300">
            <Sun className="w-3 h-3 fill-amber-400" /> {currentHeroInfo.temp}
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Top Center: Indian Emblem Badge & Eyebrow */}
          <div className="flex flex-col items-center justify-center mb-4 text-center">
            {/* Indian Circular Flag/Chakra Emblem */}
            <div className="relative mb-2 group cursor-default">
              <div className="w-11 h-11 rounded-full p-[2.5px] bg-white shadow-[0_4px_14px_rgba(0,0,0,0.12)] border border-[#E0EEFB] flex items-center justify-center overflow-hidden">
                <div className="w-full h-full rounded-full overflow-hidden flex flex-col relative">
                  {/* Saffron Top */}
                  <div className="w-full h-1/3 bg-[#FF9933]" />
                  {/* White Middle with Chakra */}
                  <div className="w-full h-1/3 bg-[#FFFFFF] flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full border border-[#000080] flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-[#000080]" />
                    </div>
                  </div>
                  {/* Green Bottom */}
                  <div className="w-full h-1/3 bg-[#138808]" />
                </div>
              </div>
              {/* Soft glow ring */}
              <div className="absolute -inset-1 rounded-full bg-amber-400/20 blur-xs pointer-events-none" />
            </div>

            {/* Script Italic Eyebrow */}
            <span className="font-serif italic text-base sm:text-lg text-[#168BFF] font-medium tracking-wide">
              Featured Iconic Destinations of India
            </span>
          </div>

          {/* 3D Curved Capsule Cards Carousel (Ladakh, Gujarat Somnath, Kerala) */}
          <div className="my-2 sm:my-4">
            <ThreeDCapsuleCards
              onSelect={handleSelectFromCapsule}
              onHoverChange={setHoveredCapsuleId}
            />
          </div>

          {/* Main Hero Serif Headline & Subtitle */}
          <div className="text-center max-w-3xl mx-auto mt-6 sm:mt-8 space-y-4">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#101827] leading-[1.08]">
              Discover the Wonders of <br />
              <span className="font-serif font-bold text-[#101827]">Incredible India</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-[#64748B] max-w-2xl mx-auto leading-relaxed">
              Explore royal heritage palaces, tranquil backwaters, sacred coastal temples, wildlife safaris, and high mountain passes with genuine transparent pricing in Indian Rupees (₹).
            </p>

            {/* Hero CTAs */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link
                to="/plan"
                className="px-6 sm:px-8 py-3 bg-[#101827] hover:bg-[#1f2937] text-white text-xs sm:text-sm font-medium rounded-full transition-all duration-200 shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>Plan My Trip</span>
              </Link>
              <a
                href="#destinations"
                className="px-6 sm:px-8 py-3 bg-white hover:bg-[#F8FAFC] text-[#101827] border border-[#E2E8F0] text-xs sm:text-sm font-medium rounded-full transition-all duration-200 shadow-xs active:scale-95 cursor-pointer"
              >
                Explore Destinations
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: WHY TRAVEL WITH YATRI? (India-Wide Banner + 3 Feature Boxes)
      ========================================================================= */}
      <section id="why-us" className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#E0F2FE] text-[#168BFF] mb-3 text-xs">
              ✦
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#101827]">
              Why Travel with Yatri?
            </h2>
            <p className="mt-3 text-xs sm:text-sm md:text-base text-[#64748B] leading-relaxed">
              Handpicked heritage palaces, coastal lagoons, sacred ghats, and mountain trails with certified local guides and genuine transparent pricing in Indian Rupees (₹).
            </p>
          </div>

          {/* Large Video Feature Banner Card */}
          <div className="relative w-full max-w-5xl mx-auto rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-900 border border-[#E8EEF5] group">
            <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1600&auto=format&fit=crop"
                alt="Rajasthan Palaces, Kerala Backwaters & Indian Wonders"
                referrerPolicy="no-referrer"
                loading="eager"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/gujarat_somnath_bg.jpg';
                }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.88]"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

              {/* Yatri Watermark Top Right */}
              <div className="absolute top-6 right-6 px-3.5 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/20 flex items-center gap-1.5 text-white text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#168BFF]" />
                <span>Yatri India</span>
              </div>

              {/* Centered Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  aria-label="Play promotional video"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/50 flex items-center justify-center text-white transition-all transform hover:scale-110 shadow-2xl cursor-pointer"
                >
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white text-white ml-1" />
                </button>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 text-white">
                <p className="font-serif text-lg sm:text-2xl md:text-3xl font-medium tracking-tight drop-shadow-md">
                  From royal Rajput fortresses to serene palm-fringed backwaters
                </p>
              </div>
            </div>
          </div>

          {/* 3 Feature Boxes Grid Underneath */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-10 sm:mt-12">
            {/* Box 1: Curated Pan-India Itineraries */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#F8FAFC] border border-[#E8EEF5] hover:border-[#168BFF]/40 transition-all hover:shadow-md flex flex-col items-start text-left">
              <div className="w-10 h-10 rounded-full bg-[#E0F2FE] text-[#168BFF] flex items-center justify-center mb-4 shadow-xs">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-sans font-bold text-base sm:text-lg text-[#101827] mb-1">
                Handcrafted Pan-India Journeys
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Curated itineraries across Rajasthan palaces, Kerala waters, Varanasi ghats & coastal havens
              </p>
            </div>

            {/* Box 2: Certified Local Guides */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#F8FAFC] border border-[#E8EEF5] hover:border-[#168BFF]/40 transition-all hover:shadow-md flex flex-col items-start text-left">
              <div className="w-10 h-10 rounded-full bg-[#E0F2FE] text-[#168BFF] flex items-center justify-center mb-4 shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-sans font-bold text-base sm:text-lg text-[#101827] mb-1">
                Certified Local Guides
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Explore deeply with verified regional historians, licensed boat captains & 24/7 on-ground support
              </p>
            </div>

            {/* Box 3: Genuine Transparent INR Pricing */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#F8FAFC] border border-[#E8EEF5] hover:border-[#168BFF]/40 transition-all hover:shadow-md flex flex-col items-start text-left">
              <div className="w-10 h-10 rounded-full bg-[#E0F2FE] text-[#168BFF] flex items-center justify-center mb-4 shadow-xs">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-sans font-bold text-base sm:text-lg text-[#101827] mb-1">
                Genuine Market Rates in ₹
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Honest, itemized costs with stays, private transport & permits included — zero hidden markups
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: TOP DESTINATIONS IN INDIA (Diverse Places with Category Tabs)
      ========================================================================= */}
      <section id="destinations" className="py-16 sm:py-24 bg-[#FAFCFF] relative border-t border-[#E8EEF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#E0F2FE] text-[#168BFF] mb-3 text-xs">
              ✦
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#101827]">
              Top Destinations Across India
            </h2>
            <p className="mt-3 text-xs sm:text-sm md:text-base text-[#64748B] leading-relaxed max-w-xl mx-auto">
              From the golden forts of Rajasthan and serene backwaters of Kerala to sacred ghats in Varanasi and turquoise Andaman lagoons.
            </p>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#101827] text-white shadow-sm'
                      : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:border-[#168BFF]/50 hover:text-[#101827]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Diverse Destination Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {filteredDestinations.map((destination) => {
              const isFav = !!savedFavorites[destination.id];

              return (
                <div
                  key={destination.id}
                  onClick={() => setSelectedDestination(destination)}
                  className="group bg-white rounded-3xl overflow-hidden border border-[#E8EEF5] hover:border-[#168BFF]/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1"
                >
                  {/* Card Image Banner */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                    {/* Favorite Heart Button */}
                    <button
                      onClick={(e) => toggleFavorite(destination.id, e)}
                      aria-label="Save to favorites"
                      className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/70 hover:bg-white backdrop-blur-md flex items-center justify-center text-[#101827] shadow-sm transition-transform active:scale-90 cursor-pointer"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          isFav ? 'fill-rose-500 text-rose-500' : 'text-[#475569]'
                        }`}
                      />
                    </button>

                    {/* Rating Badge */}
                    <div className="absolute top-4 left-4 px-2.5 py-1 bg-black/50 backdrop-blur-md rounded-full text-white text-xs font-semibold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                      <span>{destination.rating}</span>
                    </div>

                    {/* State Tag & Category */}
                    <div className="absolute bottom-16 left-4 flex items-center gap-1.5 flex-wrap">
                      <span className="px-2.5 py-0.5 bg-black/50 backdrop-blur-md rounded-full text-[11px] text-white font-medium flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#168BFF]" />
                        <span>{destination.state}</span>
                      </span>
                      <span className="px-2.5 py-0.5 bg-[#168BFF]/80 backdrop-blur-md rounded-full text-[10px] text-white font-medium">
                        {destination.category}
                      </span>
                    </div>

                    {/* Bottom Title on Image */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-serif text-2xl font-bold tracking-tight">
                        {destination.name}
                      </h3>
                      <p className="text-xs text-slate-200 font-medium truncate">
                        {destination.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer Details */}
                  <div className="p-5 flex items-center justify-between border-t border-[#F1F5F9] bg-white">
                    <div>
                      <div className="text-[11px] text-[#64748B] font-medium">Starts from</div>
                      <div className="font-serif text-lg sm:text-xl font-bold text-[#101827]">
                        {formatINR(destination.startPrice)}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-medium text-[#475569]">
                        {destination.durationDays} days, {destination.durationNights} nights
                      </div>
                      <div className="text-[11px] text-[#168BFF] font-semibold group-hover:underline flex items-center justify-end gap-1 mt-0.5">
                        <span>View Details</span>
                        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: WHAT DO YOU WANT TO EXPERIENCE? (Pan-India Experiences)
      ========================================================================= */}
      <section id="experiences" className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header with Left/Right Navigation Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#E0F2FE] text-[#168BFF] mb-3 text-xs">
                ★
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#101827]">
                What Do You Want to Experience?
              </h2>
              <p className="mt-2 text-xs sm:text-sm md:text-base text-[#64748B] max-w-xl">
                Choose from luxury backwater cruises, sunrise Ganges Aarti boats, desert camel safaris, tiger tracking, scuba diving, and mountain treks.
              </p>
            </div>

            {/* Carousel Arrow Controls */}
            <div className="flex items-center gap-2 self-end md:self-auto">
              <button
                onClick={() => handleScroll(experienceScrollRef, 'left')}
                aria-label="Previous experience"
                className="w-10 h-10 rounded-full border border-[#E2E8F0] hover:border-[#168BFF] flex items-center justify-center text-[#475569] hover:text-[#101827] transition-colors cursor-pointer active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleScroll(experienceScrollRef, 'right')}
                aria-label="Next experience"
                className="w-10 h-10 rounded-full border border-[#E2E8F0] hover:border-[#168BFF] flex items-center justify-center text-[#475569] hover:text-[#101827] transition-colors cursor-pointer active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Horizontal Scrolling Card Track */}
          <div
            ref={experienceScrollRef}
            className="flex gap-6 overflow-x-auto no-scrollbar pb-4 pt-2 snap-x snap-mandatory"
          >
            {INDIA_EXPERIENCES.map((exp) => (
              <div
                key={exp.id}
                onClick={() => navigate('/plan')}
                className="group shrink-0 w-80 sm:w-96 rounded-3xl overflow-hidden border border-[#E8EEF5] hover:border-[#168BFF]/40 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer snap-start flex flex-col bg-white"
              >
                {/* Panorama Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                  {/* Category & Location Badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-semibold">
                      {exp.category}
                    </span>
                  </div>

                  {/* Title and Price on Card */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-[11px] text-sky-200 font-medium flex items-center gap-1 mb-1">
                      <MapPin className="w-3 h-3" />
                      <span>{exp.location}</span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight line-clamp-2">
                      {exp.title}
                    </h3>
                    <p className="text-xs text-slate-200 mt-1">
                      Starts from <span className="font-bold text-white">{formatINR(exp.price)}</span>
                    </p>
                  </div>
                </div>

                {/* Card Sub-info */}
                <div className="p-4 bg-white flex items-center justify-between text-xs text-[#64748B]">
                  <span>{exp.duration}</span>
                  <span className="font-semibold text-[#168BFF] group-hover:underline flex items-center gap-1">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: PLAN YOUR TRIP IN MINUTES (Pan-India 3-Step Stepper)
      ========================================================================= */}
      <section id="planning" className="py-16 sm:py-24 bg-[#FAFCFF] relative border-t border-[#E8EEF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Side: Headline & Description & CTA */}
            <div className="lg:col-span-5 space-y-6">
              <div className="w-10 h-10 rounded-full bg-[#E0F2FE] text-[#168BFF] flex items-center justify-center shadow-xs">
                <Luggage className="w-5 h-5" />
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#101827] leading-tight">
                Plan Your Trip <br />
                <span className="font-serif font-bold text-[#101827]">in Minutes</span>
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-[#64748B] leading-relaxed max-w-md">
                Choose your dream Indian destination, select authentic local experiences, and get a realistic itemized plan with transparent pricing in Indian Rupees (₹).
              </p>

              <div className="space-y-3 pt-2">
                <button
                  onClick={handleBookQuickPlan}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#101827] hover:bg-[#168BFF] text-white text-xs sm:text-sm font-medium rounded-full transition-all duration-200 shadow-md active:scale-95 cursor-pointer"
                >
                  <span>Start Planning for {activePlanDest.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-[#64748B] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>No hidden fees · Free instant itinerary builder</span>
                </p>
              </div>
            </div>

            {/* Right Side: 3 Connected Stepper Cards */}
            <div className="lg:col-span-7 space-y-6 relative">
              {/* Step 1: Select Destination */}
              <div className="relative pl-12">
                {/* Step Marker 1 */}
                <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-[#E0F2FE] border-2 border-[#168BFF] text-[#168BFF] font-bold text-xs flex items-center justify-center shadow-xs z-10">
                  1
                </div>
                {/* Connecting vertical line */}
                <div className="absolute left-4 top-8 bottom-0 w-[2px] bg-[#E2E8F0]" />

                <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E8EEF5] shadow-xs relative">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-sans font-bold text-base sm:text-lg text-[#101827]">
                        1. Select Destination
                      </h3>
                      <p className="text-[11px] text-[#64748B]">
                        Currently selected:{' '}
                        <span className="font-bold text-[#168BFF]">{activePlanDest.name} ({activePlanDest.state})</span>
                      </p>
                    </div>
                    {/* Speech Tag Bubble Sticker */}
                    <div className="hidden sm:block px-3 py-1 bg-[#FEF08A] rounded-full text-[11px] font-bold text-[#854D0E] shadow-xs transform rotate-2">
                      Click to choose!
                    </div>
                  </div>

                  {/* Destination Mini Preview Carousel */}
                  <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-2">
                    {QUICK_PLAN_DESTINATIONS.map((dest) => {
                      const isSelected = quickPlanDestId === dest.id;
                      return (
                        <button
                          key={dest.id}
                          onClick={() => handleSelectPlanDest(dest.id)}
                          className={`relative w-28 h-24 rounded-2xl overflow-hidden shrink-0 transition-all text-left cursor-pointer group ${
                            isSelected
                              ? 'ring-2 ring-[#168BFF] ring-offset-2 scale-[1.03] shadow-md'
                              : 'opacity-70 hover:opacity-100 hover:scale-[1.01] border border-[#E2E8F0]'
                          }`}
                        >
                          <img
                            src={dest.image}
                            alt={dest.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-between p-2">
                            <div className="flex justify-end">
                              {isSelected && (
                                <span className="w-4 h-4 rounded-full bg-[#168BFF] text-white flex items-center justify-center text-[10px] shadow-xs font-bold">
                                  ✓
                                </span>
                              )}
                            </div>
                            <div>
                              <span className="text-[11px] font-bold text-white block leading-tight">
                                {dest.name}
                              </span>
                              <span className="text-[9px] text-sky-200">
                                {dest.durationDays}D · from {formatINR(dest.basePrice)}
                              </span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Step 2: Pick Activities */}
              <div className="relative pl-12">
                {/* Step Marker 2 */}
                <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-[#E0F2FE] border-2 border-[#168BFF] text-[#168BFF] font-bold text-xs flex items-center justify-center shadow-xs z-10">
                  2
                </div>
                {/* Connecting line */}
                <div className="absolute left-4 top-8 bottom-0 w-[2px] bg-[#E2E8F0]" />

                <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E8EEF5] shadow-xs relative">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-sans font-bold text-base sm:text-lg text-[#101827]">
                        2. Pick Activities in {activePlanDest.name}
                      </h3>
                      <p className="text-[11px] text-[#64748B]">
                        Select or uncheck experiences to customize your price
                      </p>
                    </div>
                    <div className="px-2.5 py-0.5 bg-sky-50 text-[#168BFF] rounded-full text-[11px] font-bold">
                      {selectedActivities.length} Chosen
                    </div>
                  </div>

                  {/* Activity Checkboxes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activePlanDest.activities.map((activity) => {
                      const isChecked = selectedActivities.includes(activity.id);
                      return (
                        <button
                          key={activity.id}
                          type="button"
                          onClick={() => handleToggleActivity(activity.id)}
                          className={`flex items-center justify-between gap-2 p-2.5 rounded-xl text-left transition-all cursor-pointer border ${
                            isChecked
                              ? 'bg-[#F0F9FF] border-[#BAE6FD] text-[#0369A1]'
                              : 'bg-[#F8FAFC] border-[#E8EEF5] text-[#64748B] hover:border-[#CBD5E1]'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <div
                              className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] shrink-0 font-bold ${
                                isChecked
                                  ? 'bg-[#168BFF] text-white'
                                  : 'border border-[#CBD5E1] bg-white'
                              }`}
                            >
                              {isChecked ? '✓' : ''}
                            </div>
                            <span className="text-xs font-medium truncate">
                              {activity.name}
                            </span>
                          </div>
                          <span className="text-[10px] font-semibold shrink-0 text-[#168BFF]">
                            +{formatINR(activity.price)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Step 3: Get Itinerary & Price */}
              <div className="relative pl-12">
                {/* Step Marker 3 */}
                <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-[#168BFF] text-white font-bold text-xs flex items-center justify-center shadow-xs z-10">
                  3
                </div>

                <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E8EEF5] shadow-md relative">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="font-sans font-bold text-base sm:text-lg text-[#101827]">
                        3. Get Itinerary & Price
                      </h3>
                      <p className="text-xs text-[#64748B]">
                        Customized {activePlanDest.durationDays}-Day {activePlanDest.name} & {activePlanDest.state} Explorer
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <div className="text-[11px] text-[#64748B]">Estimated Total / Person</div>
                      <div className="font-serif text-2xl font-bold text-[#101827]">
                        {formatINR(calculatedQuickPlanPrice)}
                      </div>
                      <div className="text-[10px] text-emerald-600 font-medium">
                        Includes stays, {selectedActivities.length} activities & local guide
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <button
                      onClick={handleBookQuickPlan}
                      className="w-full py-3 bg-[#101827] hover:bg-[#168BFF] text-white text-xs sm:text-sm font-medium rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95"
                    >
                      <span>Book {activePlanDest.name} Trip Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: LOVED BY TRAVELERS ACROSS INDIA (Verified Traveler Reviews)
      ========================================================================= */}
      <section className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#E0F2FE] text-[#168BFF] mb-3 text-xs">
              ★
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#101827]">
              Loved by Travelers Across India
            </h2>
            <p className="mt-3 text-xs sm:text-sm md:text-base text-[#64748B] leading-relaxed max-w-xl mx-auto">
              Thousands of explorers trust Yatri to make their Indian journeys seamless, memorable, and safe.
            </p>

            {/* Text / Video Switch Pill */}
            <div className="mt-6 inline-flex items-center p-1 bg-[#F1F5F9] rounded-full border border-[#E2E8F0]">
              <button
                onClick={() => setTestimonialTab('text')}
                className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  testimonialTab === 'text'
                    ? 'bg-[#101827] text-white shadow-xs'
                    : 'text-[#64748B] hover:text-[#101827]'
                }`}
              >
                • Text Reviews
              </button>
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="flex items-center gap-1 px-5 py-1.5 rounded-full text-xs font-semibold text-[#64748B] hover:text-[#101827] transition-all cursor-pointer"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Video Stories</span>
              </button>
            </div>
          </div>

          {/* Testimonial Cards Track */}
          <div
            ref={testimonialScrollRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {TRAVELER_TESTIMONIALS.map((item) => (
              <div
                key={item.id}
                className="bg-[#FAFCFF] rounded-3xl p-6 sm:p-7 border border-[#E8EEF5] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Avatar, Name & 5 Gold Stars */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-11 h-11 rounded-full object-cover border border-[#E2E8F0]"
                      />
                      <div>
                        <h4 className="font-sans font-bold text-sm text-[#101827]">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-[#64748B]">{item.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(item.stars)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Destination Tag */}
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-sky-50 text-sky-700 text-[11px] font-semibold rounded-full">
                    <MapPin className="w-3 h-3 text-[#168BFF]" />
                    <span>Trip to {item.destination}</span>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                    "{item.review}"
                  </p>
                </div>

                {/* 3 Trip Photo Thumbnails */}
                <div className="pt-5 mt-4 border-t border-[#E8EEF5] flex items-center gap-2">
                  {item.photos.map((photo, pIdx) => (
                    <div
                      key={pIdx}
                      className="w-16 h-12 rounded-xl overflow-hidden bg-slate-200 border border-[#E2E8F0]"
                    >
                      <img
                        src={photo}
                        alt="travel thumb"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Carousel Arrow Controls */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => handleScroll(testimonialScrollRef, 'left')}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-[#E2E8F0] hover:border-[#168BFF] flex items-center justify-center text-[#475569] hover:text-[#101827] transition-colors cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll(testimonialScrollRef, 'right')}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border border-[#E2E8F0] hover:border-[#168BFF] flex items-center justify-center text-[#475569] hover:text-[#101827] transition-colors cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: READY FOR YOUR NEXT ADVENTURE? (3D Floating Section)
      ========================================================================= */}
      <section className="relative pt-20 pb-28 md:pt-28 md:pb-36 overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F4FAFF] to-[#EBF5FF] border-t border-[#E8EEF5]">
        {/* Soft atmospheric background glow */}
        <div className="absolute inset-0 bg-radial from-[#D4ECFF]/50 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Top Badge */}
          <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#E0F2FE] text-[#168BFF] mb-4 text-xs">
            ✦
          </div>

          {/* 3D Floating Capsule Cards (Ladakh, Gujarat Somnath, Kerala) */}
          <div className="my-4 sm:my-6">
            <ThreeDCapsuleCards onSelect={handleSelectFromCapsule} compact />
          </div>

          {/* Heading and Call to Action */}
          <div className="max-w-2xl mx-auto space-y-4 mt-6">
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#101827] leading-tight">
              Ready to Explore Incredible India?
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-[#64748B] max-w-lg mx-auto leading-relaxed">
              Start planning your journey today and discover ancient palaces, tranquil waterways, and iconic landscapes with transparent pricing in Indian Rupees (₹).
            </p>

            <div className="pt-4">
              <Link
                to="/plan"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#101827] hover:bg-[#1f2937] text-white text-xs sm:text-sm font-medium rounded-full transition-all duration-200 shadow-xl active:scale-95 cursor-pointer"
              >
                <span>Book Your Trip Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Destination Details Modal */}
      <IndiaDestinationModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
      />

      {/* Video Player Modal */}
      <VideoPlayerModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </div>
  );
};
