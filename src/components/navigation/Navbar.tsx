import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Ticket, User, LogOut, Heart, MapPin, Sparkles, LogIn, ChevronDown } from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { useAuth } from '../../context/AuthContext';
import { YatriLogo } from '../common/YatriLogo';
import { BookingLookupModal } from '../common/BookingLookupModal';
import { apiRequest } from '../../services/apiClient';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentTrip } = useTrip();
  const { user, userProfile, openAuthModal, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showPnrModal, setShowPnrModal] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Discover', path: '/discover', href: '#destinations' },
    { name: 'Plan Trip', path: '/plan', href: '#planner' },
    { name: 'Itinerary', path: `/trip/${currentTrip?.id || 'trip-rajasthan-escape'}` },
    { name: 'My Trips', path: '/my-trips' },
    { name: 'AI Assistant', path: '/assistant' },
    { name: 'Community', path: '/community' }
  ];

  const handleNavClick = (link: typeof navLinks[0]) => {
    if (location.pathname === '/' && link.href) {
      const el = document.querySelector(link.href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
        return;
      }
    }
    navigate(link.path);
    setMobileMenuOpen(false);
  };

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
      <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 sm:px-8 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          {/* Brand Logo - Yatri */}
          <Link
            to="/"
            className="flex items-center px-4 py-2 bg-white/90 hover:bg-white backdrop-blur-md rounded-full border border-[#E8EEF5] floating-nav-shadow group transition-all"
          >
            <YatriLogo size="md" />
          </Link>

          {/* Desktop Centered Floating Navigation Capsule */}
          <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 bg-white/85 backdrop-blur-md rounded-full border border-[#E8EEF5] floating-nav-shadow">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link)}
                  className={`px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
                    active
                      ? 'bg-[#101827] text-white shadow-xs'
                      : 'text-[#475569] hover:text-[#101827] hover:bg-black/5'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}

            {/* PNR Status Button */}
            <button
              onClick={() => setShowPnrModal(true)}
              className="px-3.5 py-1.5 text-xs font-semibold text-[#0084FF] hover:bg-blue-50 rounded-full transition-all flex items-center gap-1.5 cursor-pointer ml-1"
            >
              <Ticket className="w-3.5 h-3.5" />
              <span>PNR Status</span>
            </button>
          </nav>

          {/* Right Action Icons & Auth / Plan Pill */}
          <div className="flex items-center gap-2">
            {/* Search Icon */}
            <button
              onClick={() => setShowSearchModal(true)}
              aria-label="Search destinations"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/85 backdrop-blur-md border border-[#E8EEF5] flex items-center justify-center text-[#475569] hover:text-[#101827] hover:border-[#168BFF] transition-all floating-nav-shadow cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* User Profile / Auth Button with Dropdown */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1 sm:pr-3 rounded-full bg-white/90 hover:bg-white backdrop-blur-md border border-[#E8EEF5] floating-nav-shadow transition-all cursor-pointer group"
                >
                  <img
                    src={userProfile?.avatar || user.photoURL || '/images/pruthviraj_profile.jpg'}
                    alt={userProfile?.name || 'User'}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-emerald-500"
                  />
                  <span className="hidden sm:inline-block text-xs font-semibold text-[#101827] max-w-[90px] truncate">
                    {userProfile?.name?.split(' ')[0] || 'Explorer'}
                  </span>
                  <ChevronDown className="w-3 h-3 text-[#64748B] group-hover:text-[#101827] transition-transform hidden sm:block" />
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl border border-[#E8EEF5] shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="p-3 bg-[#F8FAFC] rounded-xl mb-1.5 border border-[#E2E8F0]/60">
                      <p className="text-xs font-bold text-[#101827] truncate">
                        {userProfile?.name || 'Traveler'}
                      </p>
                      <p className="text-[11px] text-[#64748B] truncate mt-0.5">
                        {user.email || 'Cloud Synced'}
                      </p>
                      <div className="mt-2 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider">
                          Cloud Database Active
                        </span>
                      </div>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#334E68] hover:text-[#101827] hover:bg-[#F1F5F9] rounded-lg transition-colors"
                    >
                      <User className="w-4 h-4 text-[#64748B]" />
                      <span>My Profile & Preferences</span>
                    </Link>

                    <Link
                      to="/my-trips"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#334E68] hover:text-[#101827] hover:bg-[#F1F5F9] rounded-lg transition-colors"
                    >
                      <MapPin className="w-4 h-4 text-[#64748B]" />
                      <span>My Saved Itineraries</span>
                    </Link>

                    <div className="my-1 border-t border-[#E8EEF5]" />

                    <button
                      onClick={async () => {
                        setProfileDropdownOpen(false);
                        await logout();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 sm:py-2 bg-white/90 hover:bg-white text-[#101827] border border-[#E8EEF5] text-xs sm:text-xs font-bold rounded-full transition-all duration-200 floating-nav-shadow cursor-pointer hover:border-[#168BFF]"
              >
                <LogIn className="w-3.5 h-3.5 text-[#FF5E1E]" />
                <span className="hidden sm:inline">Sign In</span>
                <span className="sm:hidden">Login</span>
              </button>
            )}

            {/* Plan My Trip Pill */}
            <Link
              to="/plan"
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 bg-[#101827] hover:bg-[#1f2937] active:scale-95 text-white text-xs sm:text-sm font-medium rounded-full transition-all duration-200 floating-nav-shadow shadow-md"
            >
              <span>Plan Trip</span>
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation"
              className="lg:hidden w-9 h-9 rounded-full bg-white/85 backdrop-blur-md border border-[#E8EEF5] flex items-center justify-center text-[#101827] floating-nav-shadow cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 max-w-sm mx-auto p-4 bg-white/95 backdrop-blur-xl rounded-2xl border border-[#E8EEF5] floating-nav-shadow pointer-events-auto animate-in fade-in slide-in-from-top-2 duration-200">
            {/* User card in mobile */}
            {user ? (
              <div className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-xl mb-3 border border-[#E2E8F0]/80">
                <div className="flex items-center gap-2.5">
                  <img
                    src={userProfile?.avatar || '/images/pruthviraj_profile.jpg'}
                    alt="User avatar"
                    className="w-9 h-9 rounded-full object-cover border border-[#101827]/20"
                  />
                  <div>
                    <p className="text-xs font-bold text-[#101827]">{userProfile?.name || 'Explorer'}</p>
                    <p className="text-[11px] text-[#64748B]">{user.email || 'Signed in'}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal('login');
                  }}
                  className="flex-1 py-2.5 text-xs font-bold bg-[#F1F5F9] text-[#101827] rounded-xl hover:bg-[#E2E8F0] cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal('signup');
                  }}
                  className="flex-1 py-2.5 text-xs font-bold bg-[#FF5E1E] text-white rounded-xl hover:brightness-105 cursor-pointer shadow-sm"
                >
                  Create Account
                </button>
              </div>
            )}

            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link)}
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium text-[#475569] hover:bg-[#F4FAFF] hover:text-[#101827] transition-colors text-left"
                >
                  <span>{link.name}</span>
                </button>
              ))}

              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-[#475569] hover:bg-[#F4FAFF] hover:text-[#101827] transition-colors text-left"
              >
                <User className="w-4 h-4" />
                <span>Profile & Settings</span>
              </Link>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowPnrModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-[#0084FF] hover:bg-blue-50 transition-colors text-left"
              >
                <Ticket className="w-4 h-4" />
                <span>Check PNR Status</span>
              </button>

              <div className="pt-2 mt-2 border-t border-[#E8EEF5] flex flex-col gap-2">
                <Link
                  to="/plan"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#101827] text-white text-xs font-semibold rounded-full shadow-xs"
                >
                  <span>Plan My Trip</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* PNR Lookup Modal */}
      <BookingLookupModal isOpen={showPnrModal} onClose={() => setShowPnrModal(false)} />

      {/* Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-[#101827]/40 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-white rounded-3xl p-6 border border-[#E8EEF5] shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8EEF5]">
              <span className="text-xs uppercase font-semibold tracking-wider text-[#168BFF]">
                Search Indian Destinations & Mountain Trails
              </span>
              <button
                onClick={() => setShowSearchModal(false)}
                className="text-[#94A3B8] hover:text-[#101827] cursor-pointer"
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
                  placeholder="e.g. Ladakh passes, Kashmir snow, Spiti Valley, Manali..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[#F4FAFF] rounded-2xl border border-[#E8EEF5] focus:outline-hidden focus:border-[#168BFF] text-sm text-[#101827]"
                />
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-[#94A3B8]">
                <span>Trending: Ladakh · Kashmir · Spiti · Manali · Sikkim</span>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#101827] text-white text-xs font-medium rounded-full hover:bg-[#168BFF] transition-colors cursor-pointer"
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
