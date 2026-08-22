import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Filter, Compass, SlidersHorizontal, MapPin, Sparkles, X, ChevronDown } from 'lucide-react';
import { DestinationCard } from '../components/cards/DestinationCard';
import { DestinationDetailModal } from '../components/common/DestinationDetailModal';
import { INDIAN_DESTINATIONS, DESTINATION_CATEGORIES, INDIAN_REGIONS } from '../data/destinations';
import { Destination } from '../types';

export const Discover: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialSearch = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'All';
  const initialRegion = searchParams.get('region') || 'All';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedRegion, setSelectedRegion] = useState(initialRegion);
  const [maxBudget, setMaxBudget] = useState(50000);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-low' | 'price-high' | 'rating'>('recommended');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  // Filter logic
  const filteredDestinations = useMemo(() => {
    return INDIAN_DESTINATIONS.filter((dest) => {
      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = dest.name.toLowerCase().includes(q);
        const matchesState = dest.state.toLowerCase().includes(q);
        const matchesTagline = dest.tagline.toLowerCase().includes(q);
        const matchesPopular = dest.popularFor.toLowerCase().includes(q);
        const matchesHighlights = dest.highlights.some((h) => h.toLowerCase().includes(q));
        if (!matchesName && !matchesState && !matchesTagline && !matchesPopular && !matchesHighlights) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'All' && !dest.category.includes(selectedCategory as any)) {
        return false;
      }

      // Region filter
      if (selectedRegion !== 'All' && dest.region !== selectedRegion) {
        return false;
      }

      // Budget filter
      if (dest.startingPrice > maxBudget) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.startingPrice - b.startingPrice;
      if (sortBy === 'price-high') return b.startingPrice - a.startingPrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // recommended order
    });
  }, [searchQuery, selectedCategory, selectedRegion, maxBudget, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedRegion('All');
    setMaxBudget(50000);
    setSortBy('recommended');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-atmospheric pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full border border-[#E8EEF5] floating-nav-shadow text-xs font-semibold text-[#101827]">
            <Compass className="w-3.5 h-3.5 text-[#168BFF]" />
            <span>Discover India's Handpicked Destinations</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#101827] tracking-tight">
            Explore Handcrafted Destinations
          </h1>
          <p className="text-sm sm:text-base text-[#64748B]">
            Search, filter, and compare iconic cultural hubs, serene mountain retreats, and coastal havens across India.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#E8EEF5] editorial-card-shadow space-y-4 mb-8">
          {/* Top Search & Sort */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Search by city, state, experience (e.g. Udaipur, Forts, Backwaters)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#F4FAFF] rounded-xl border border-[#E8EEF5] text-xs sm:text-sm text-[#101827] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#168BFF]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#101827]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-[#64748B] whitespace-nowrap">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full sm:w-auto px-4 py-3 bg-[#F4FAFF] rounded-xl border border-[#E8EEF5] text-xs font-semibold text-[#101827] focus:outline-none focus:border-[#168BFF]"
              >
                <option value="recommended">Curated / Recommended</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Categories Pill Strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar">
            {DESTINATION_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#101827] text-white shadow-xs'
                    : 'bg-[#F4FAFF] text-[#64748B] hover:text-[#101827] border border-[#E8EEF5]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Region and Budget Secondary Filters */}
          <div className="pt-3 border-t border-[#E8EEF5] flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            {/* Regions */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              <span className="text-[#94A3B8] font-medium whitespace-nowrap">Region:</span>
              {INDIAN_REGIONS.map((reg) => (
                <button
                  key={reg}
                  onClick={() => setSelectedRegion(reg)}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    selectedRegion === reg
                      ? 'bg-[#DFF1FF] text-[#168BFF] font-bold'
                      : 'text-[#64748B] hover:text-[#101827]'
                  }`}
                >
                  {reg}
                </button>
              ))}
            </div>

            {/* Budget Slider */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <span className="text-[#64748B] font-medium whitespace-nowrap">
                Max Starting Budget:
              </span>
              <input
                type="range"
                min="8000"
                max="50000"
                step="2000"
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-28 sm:w-36 accent-[#168BFF] cursor-pointer"
              />
              <span className="font-bold text-[#101827] whitespace-nowrap">
                ₹{maxBudget.toLocaleString('en-IN')}
              </span>
              {(searchQuery || selectedCategory !== 'All' || selectedRegion !== 'All' || maxBudget < 50000) && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-[#168BFF] hover:underline font-semibold whitespace-nowrap ml-2 cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-semibold text-[#64748B]">
            Showing <strong className="text-[#101827]">{filteredDestinations.length}</strong> Indian destinations
          </span>
        </div>

        {/* Destination Cards Grid */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((dest) => (
              <DestinationCard
                key={dest.id}
                destination={dest}
                onSelect={(d) => setSelectedDestination(d)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#E8EEF5] space-y-4">
            <Compass className="w-12 h-12 text-[#94A3B8] mx-auto" />
            <h3 className="font-serif text-2xl font-bold text-[#101827]">
              No destinations match your filters
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B]">
              Try resetting your category or increasing your budget slider.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2.5 bg-[#101827] text-white text-xs font-semibold rounded-full hover:bg-[#168BFF] transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

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
