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
  IndiaDestination,
  formatINR
} from '../data/indiaData';
import { useTrip } from '../context/TripContext';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { createTrip } = useTrip();

  // State management
  const [selectedDestination, setSelectedDestination] = useState<IndiaDestination | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [testimonialTab, setTestimonialTab] = useState<'text' | 'video'>('text');
  const [savedFavorites, setSavedFavorites] = useState<Record<string, boolean>>({});

  // Experience carousel ref
  const experienceScrollRef = useRef<HTMLDivElement>(null);
  const testimonialScrollRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="min-h-screen bg-white text-[#101827] overflow-x-hidden font-sans">
      {/* =========================================================================
          HERO SECTION — Mountain Image Backdrop, Cool UI, & 3D Capsule Cards
      ========================================================================= */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden bg-[#F4FAFF]">
        {/* Mountain Image Background with High-End Cool Gradient Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1920&auto=format&fit=crop"
            alt="Majestic Himalayan Mountains"
            className="w-full h-full object-cover object-center opacity-25 filter contrast-105"
          />
          {/* Gradients blending into soft clean aesthetic */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#EBF5FF]/90 via-[#F4FAFF]/80 to-[#FFFFFF]" />
          <div className="absolute inset-0 bg-radial from-[#D4ECFF]/40 via-transparent to-transparent" />
        </div>

        {/* Floating Mountain Altitude & Weather Pill */}
        <div className="hidden sm:flex absolute top-20 right-8 z-10 items-center gap-2 px-3.5 py-1.5 bg-white/80 backdrop-blur-md rounded-full border border-sky-100 shadow-sm text-xs font-medium text-[#1e293b]">
          <Mountain className="w-3.5 h-3.5 text-[#168BFF]" />
          <span>Himalayan Range</span>
          <span className="text-slate-300">•</span>
          <span className="text-[#168BFF] font-semibold">11,500 ft</span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1 text-amber-500 font-semibold">
            <Sun className="w-3 h-3 fill-amber-400" /> 12°C
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
              Popular Mountain Destinations
            </span>
          </div>

          {/* 3D Curved Capsule Cards Carousel (Ladakh, Kashmir, Spiti) */}
          <div className="my-2 sm:my-4">
            <ThreeDCapsuleCards onSelect={handleSelectFromCapsule} />
          </div>

          {/* Main Hero Serif Headline & Subtitle */}
          <div className="text-center max-w-3xl mx-auto mt-6 sm:mt-8 space-y-4">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#101827] leading-[1.08]">
              Discover the Majestic <br />
              <span className="font-serif font-bold text-[#101827]">Wild Mountains of India</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-[#64748B] max-w-2xl mx-auto leading-relaxed">
              Explore curated Himalayan trails, plan your customized journey, and uncover the timeless wonders of incredible India in just one click
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
          SECTION 2: WHY TRAVEL WITH YATRI? (Himalayan Video Card + 3 Feature Boxes)
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
              Handpicked Himalayan destinations, certified local Sherpas, and transparent pricing in Indian Rupees (₹) — everything you need for an unforgettable journey.
            </p>
          </div>

          {/* Large Video Feature Banner Card (Himalayas / Pangong Pass) */}
          <div className="relative w-full max-w-5xl mx-auto rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-900 border border-[#E8EEF5] group">
            <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1600&auto=format&fit=crop"
                alt="Pangong Lake and High Himalayan Passes"
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
                  From high altitude passes to tranquil valley retreats
                </p>
              </div>
            </div>
          </div>

          {/* 3 Feature Boxes Grid Underneath */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-10 sm:mt-12">
            {/* Box 1: Curated Mountain Trails */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#F8FAFC] border border-[#E8EEF5] hover:border-[#168BFF]/40 transition-all hover:shadow-md flex flex-col items-start text-left">
              <div className="w-10 h-10 rounded-full bg-[#E0F2FE] text-[#168BFF] flex items-center justify-center mb-4 shadow-xs">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-sans font-bold text-base sm:text-lg text-[#101827] mb-1">
                Curated Mountain Trails
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Handpicked scenic passes and serene valleys across India
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
                Travel safely with experienced mountain specialists & 24/7 support
              </p>
            </div>

            {/* Box 3: Transparent Pricing in INR */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#F8FAFC] border border-[#E8EEF5] hover:border-[#168BFF]/40 transition-all hover:shadow-md flex flex-col items-start text-left">
              <div className="w-10 h-10 rounded-full bg-[#E0F2FE] text-[#168BFF] flex items-center justify-center mb-4 shadow-xs">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-sans font-bold text-base sm:text-lg text-[#101827] mb-1">
                Instant INR Pricing
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Transparent costs in ₹ with no hidden fees or conversion surcharges
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: TOP DESTINATIONS IN INDIA (6 Cards with INR Currency)
      ========================================================================= */}
      <section id="destinations" className="py-16 sm:py-24 bg-[#FAFCFF] relative border-t border-[#E8EEF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#E0F2FE] text-[#168BFF] mb-3 text-xs">
              ✦
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#101827]">
              Top Destinations in India
            </h2>
            <p className="mt-3 text-xs sm:text-sm md:text-base text-[#64748B] leading-relaxed max-w-xl mx-auto">
              From Ladakh's high passes to Kashmir's snow peaks and Spiti's cliff monasteries — find your perfect mountain getaway
            </p>
          </div>

          {/* 6 Destination Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {INDIA_TOP_DESTINATIONS.map((destination) => {
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
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/20" />

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

                    {/* Altitude Tag if available */}
                    {destination.altitude && (
                      <div className="absolute bottom-16 left-4 px-2.5 py-0.5 bg-black/40 backdrop-blur-md rounded-full text-[10px] text-sky-200 font-medium flex items-center gap-1">
                        <Mountain className="w-2.5 h-2.5" />
                        <span>{destination.altitude}</span>
                      </div>
                    )}

                    {/* Bottom Title on Image */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-serif text-2xl font-bold tracking-tight">
                        {destination.name}
                      </h3>
                      <p className="text-xs text-slate-200 font-medium">
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
          SECTION 4: WHAT DO YOU WANT TO EXPERIENCE? (Himalayan Carousel in INR)
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
                Choose from a variety of authentic Indian mountain expeditions, river adventures, and spiritual retreats.
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
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-semibold">
                    {exp.category}
                  </div>

                  {/* Title and Price on Card */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-serif text-2xl font-bold tracking-tight">
                      {exp.title}
                    </h3>
                    <p className="text-xs text-slate-200 mt-1">
                      Start from {formatINR(exp.price)}
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
          SECTION 5: PLAN YOUR TRIP IN MINUTES (3-Step Indian Mountain Stepper)
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
                Choose your Himalayan destination, pick your activities, and get a personalized itinerary with transparent pricing in Indian Rupees (₹).
              </p>

              <div className="pt-2">
                <Link
                  to="/plan"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#101827] hover:bg-[#1f2937] text-white text-xs sm:text-sm font-medium rounded-full transition-all duration-200 shadow-md active:scale-95 cursor-pointer"
                >
                  <span>Start Planning Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
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
                    <h3 className="font-sans font-bold text-base sm:text-lg text-[#101827]">
                      Select Destination
                    </h3>
                    {/* Speech Tag Bubble Sticker */}
                    <div className="px-3 py-1 bg-[#FEF08A] rounded-full text-[11px] font-bold text-[#854D0E] shadow-xs transform rotate-2">
                      Loved by Himalayan trekkers!
                    </div>
                  </div>

                  {/* Destination Mini Preview Carousel */}
                  <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2">
                    <div className="relative w-24 h-20 rounded-2xl overflow-hidden shrink-0 border-2 border-[#168BFF] shadow-xs">
                      <img
                        src="https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=300&auto=format&fit=crop"
                        alt="Ladakh"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-1.5">
                        <span className="text-[11px] font-semibold text-white">Ladakh</span>
                      </div>
                    </div>

                    <div className="relative w-24 h-20 rounded-2xl overflow-hidden shrink-0 opacity-70 hover:opacity-100 transition-opacity">
                      <img
                        src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=300&auto=format&fit=crop"
                        alt="Kashmir"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-1.5">
                        <span className="text-[11px] font-semibold text-white">Kashmir</span>
                      </div>
                    </div>

                    <div className="relative w-24 h-20 rounded-2xl overflow-hidden shrink-0 opacity-70 hover:opacity-100 transition-opacity">
                      <img
                        src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=300&auto=format&fit=crop"
                        alt="Spiti"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-1.5">
                        <span className="text-[11px] font-semibold text-white">Spiti</span>
                      </div>
                    </div>
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
                    <h3 className="font-sans font-bold text-base sm:text-lg text-[#101827]">
                      Pick Activities
                    </h3>
                    {/* Speech Tag Bubble Sticker */}
                    <div className="px-3 py-1 bg-[#FEF08A] rounded-full text-[11px] font-bold text-[#854D0E] shadow-xs transform -rotate-1">
                      Thrilling mountain activities!
                    </div>
                  </div>

                  {/* Activity Checkboxes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD]">
                      <div className="w-4 h-4 rounded-md bg-[#168BFF] text-white flex items-center justify-center text-[10px]">
                        ✓
                      </div>
                      <span className="text-xs font-medium text-[#0369A1]">Pangong Tso Stargazing Camp</span>
                    </div>

                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD]">
                      <div className="w-4 h-4 rounded-md bg-[#168BFF] text-white flex items-center justify-center text-[10px]">
                        ✓
                      </div>
                      <span className="text-xs font-medium text-[#0369A1]">Khardung La High Pass 4x4 Safari</span>
                    </div>

                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E8EEF5]">
                      <div className="w-4 h-4 rounded-md border border-[#CBD5E1]" />
                      <span className="text-xs font-medium text-[#64748B]">Dal Lake Shikara Sunrise Cruise</span>
                    </div>

                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E8EEF5]">
                      <div className="w-4 h-4 rounded-md border border-[#CBD5E1]" />
                      <span className="text-xs font-medium text-[#64748B]">Gulmarg Powder Snow Skiing</span>
                    </div>
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
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-sans font-bold text-base sm:text-lg text-[#101827]">
                        Get Itinerary & Price
                      </h3>
                      <p className="text-xs text-[#64748B]">Customized 6-Day Ladakh Mountain Expedition</p>
                    </div>

                    <div className="text-right">
                      <div className="text-[11px] text-[#64748B]">Estimated Total</div>
                      <div className="font-serif text-2xl font-bold text-[#101827]">{formatINR(24999)}</div>
                    </div>
                  </div>

                  <Link
                    to="/plan"
                    className="w-full py-2.5 bg-[#101827] hover:bg-[#168BFF] text-white text-xs font-medium rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>Book Your Trip Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: LOVED BY TRAVELERS WORLDWIDE (Indian Traveler Reviews)
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
              Thousands of explorers trust Yatri to make their mountain journeys seamless, memorable, and safe.
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
          SECTION 7: READY FOR YOUR NEXT ADVENTURE? (3D Floating Mountain Section)
      ========================================================================= */}
      <section className="relative pt-20 pb-28 md:pt-28 md:pb-36 overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F4FAFF] to-[#EBF5FF] border-t border-[#E8EEF5]">
        {/* Soft atmospheric background glow */}
        <div className="absolute inset-0 bg-radial from-[#D4ECFF]/50 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Top Mountain Badge */}
          <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#E0F2FE] text-[#168BFF] mb-4 text-xs">
            ✦
          </div>

          {/* 3D Floating Capsule Cards (Ladakh, Kashmir, Spiti) */}
          <div className="my-4 sm:my-6">
            <ThreeDCapsuleCards onSelect={handleSelectFromCapsule} compact />
          </div>

          {/* Heading and Call to Action */}
          <div className="max-w-2xl mx-auto space-y-4 mt-6">
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#101827] leading-tight">
              Ready for Your Himalayan Journey?
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-[#64748B] max-w-lg mx-auto leading-relaxed">
              Start planning your Indian mountain expedition today and discover hidden trails with custom itineraries in Indian Rupees (₹).
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
