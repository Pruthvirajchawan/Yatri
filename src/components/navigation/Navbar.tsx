import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, Search, User, Menu, X, Compass, Calendar, Layers, MessageSquareHeart, Users, Heart } from 'lucide-react';
import { useTrip } from '../../context/TripContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentTrip } = useTrip();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);

  const navLinks = [
    { name: 'Discover', path: '/discover', icon: Compass },
    { name: 'Plan Trip', path: '/plan', icon: Calendar },
    { name: 'Itinerary', path: `/trip/${currentTrip?.id || 'trip-rajasthan-escape'}`, icon: Layers },
    { name: 'My Trips', path: '/my-trips', icon: Heart },
    { name: 'AI Assistant', path: '/assistant', icon: MessageSquareHeart },
    { name: 'Community', path: '/community', icon: Users }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/discover?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchModal(false);
    }
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 sm:px-6 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2.5 bg-white/90 backdrop-blur-md rounded-full border border-[#E8EEF5] floating-nav-shadow group transition-transform hover:scale-[1.02]"
          >
            <span className="w-6 h-6 rounded-full bg-[#168BFF] text-white flex items-center justify-center text-xs font-semibold shadow-sm">
              ✦
            </span>
            <span className="font-serif font-bold text-xl tracking-tight text-[#101827]">
              Yatri
            </span>
          </Link>

          {/* Desktop Centered Floating Navigation Container */}
          <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full border border-[#E8EEF5] floating-nav-shadow">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                    active
                      ? 'bg-[#101827] text-white shadow-xs'
                      : 'text-[#64748B] hover:text-[#101827] hover:bg-[#F4FAFF]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & CTA */}
          <div className="flex items-center gap-2">
            {/* Search Trigger */}
            <button
              onClick={() => setShowSearchModal(true)}
              aria-label="Search destinations"
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-[#E8EEF5] flex items-center justify-center text-[#64748B] hover:text-[#101827] hover:border-[#168BFF] transition-all floating-nav-shadow cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Profile */}
            <Link
              to="/profile"
              aria-label="Profile"
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-[#E8EEF5] flex items-center justify-center text-[#64748B] hover:text-[#101827] hover:border-[#168BFF] transition-all floating-nav-shadow"
            >
              <User className="w-4 h-4" />
            </Link>

            {/* Primary Plan CTA Button */}
            <Link
              to="/plan"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#101827] hover:bg-[#168BFF] text-white text-sm font-medium rounded-full transition-all duration-300 floating-nav-shadow hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Plan My Trip</span>
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation"
              className="lg:hidden w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-[#E8EEF5] flex items-center justify-center text-[#101827] floating-nav-shadow cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 max-w-sm mx-auto p-4 bg-white/95 backdrop-blur-xl rounded-2xl border border-[#E8EEF5] floating-nav-shadow pointer-events-auto animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      active
                        ? 'bg-[#101827] text-white'
                        : 'text-[#64748B] hover:bg-[#F4FAFF] hover:text-[#101827]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
              <div className="pt-2 mt-2 border-t border-[#E8EEF5]">
                <Link
                  to="/plan"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#168BFF] text-white text-sm font-semibold rounded-xl shadow-xs"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Start Planning</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-[#101827]/40 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-white rounded-2xl p-6 border border-[#E8EEF5] shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8EEF5]">
              <span className="text-xs uppercase font-semibold tracking-wider text-[#168BFF]">
                Search Indian Destinations
              </span>
              <button
                onClick={() => setShowSearchModal(false)}
                className="text-[#94A3B8] hover:text-[#101827]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="mt-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                <input
                  type="text"
                  autoFocus
                  placeholder="e.g. Udaipur, Kashmir, Kerala backwaters, Forts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-[#F4FAFF] rounded-xl border border-[#E8EEF5] focus:outline-none focus:border-[#168BFF] text-sm text-[#101827] placeholder:text-[#94A3B8]"
                />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-[#94A3B8]">
                  Popular: Udaipur, Jaipur, Kashmir, Goa, Coorg
                </span>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#101827] text-white text-sm font-medium rounded-full hover:bg-[#168BFF] transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
