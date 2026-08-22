import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Compass, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#E8EEF5] bg-[#FFFFFF] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-[#E8EEF5]">
          {/* Brand & Editorial Tagline */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#168BFF] text-white flex items-center justify-center text-xs font-bold">
                ✦
              </span>
              <span className="font-serif font-bold text-2xl tracking-tight text-[#101827]">
                Yatri
              </span>
            </Link>
            <p className="font-serif text-xl sm:text-2xl text-[#101827] max-w-sm leading-snug">
              Discover India, one realistic journey at a time.
            </p>
            <p className="text-sm text-[#64748B] max-w-md">
              AI proposes. Algorithms validate. The traveler decides. Yatri brings decision-aware travel intelligence to Indian journeys.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-[#94A3B8]">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#168BFF]" />
                Decision Intelligence
              </span>
              <span>•</span>
              <span>Zero Slop Pacing</span>
              <span>•</span>
              <span>100% India Authentic</span>
            </div>
          </div>

          {/* Destinations */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#101827]">
              Destinations
            </h4>
            <ul className="space-y-2 text-sm text-[#64748B]">
              <li>
                <Link to="/discover?category=Heritage" className="hover:text-[#168BFF] transition-colors">
                  Rajasthan Circuit
                </Link>
              </li>
              <li>
                <Link to="/discover?category=Mountains" className="hover:text-[#168BFF] transition-colors">
                  Kashmir & Ladakh
                </Link>
              </li>
              <li>
                <Link to="/discover?category=Nature" className="hover:text-[#168BFF] transition-colors">
                  Kerala Backwaters
                </Link>
              </li>
              <li>
                <Link to="/discover?category=Beaches" className="hover:text-[#168BFF] transition-colors">
                  Goa & Coastal Konkan
                </Link>
              </li>
              <li>
                <Link to="/discover?category=Spiritual" className="hover:text-[#168BFF] transition-colors">
                  Varanasi & Ghats
                </Link>
              </li>
            </ul>
          </div>

          {/* Travel Intelligence */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#101827]">
              Intelligence
            </h4>
            <ul className="space-y-2 text-sm text-[#64748B]">
              <li>
                <Link to="/trip/trip-rajasthan-escape/intelligence" className="hover:text-[#168BFF] transition-colors">
                  Experience Budget
                </Link>
              </li>
              <li>
                <Link to="/trip/trip-rajasthan-escape/intelligence" className="hover:text-[#168BFF] transition-colors">
                  Trip Debt Engine
                </Link>
              </li>
              <li>
                <Link to="/trip/trip-rajasthan-escape/tradeoffs" className="hover:text-[#168BFF] transition-colors">
                  Trade-Off Simulator
                </Link>
              </li>
              <li>
                <Link to="/trip/trip-rajasthan-escape/group" className="hover:text-[#168BFF] transition-colors">
                  Group Equity Balancer
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-[#168BFF] transition-colors">
                  Travel DNA Profiling
                </Link>
              </li>
            </ul>
          </div>

          {/* Community & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#101827]">
              Platform
            </h4>
            <ul className="space-y-2 text-sm text-[#64748B]">
              <li>
                <Link to="/plan" className="hover:text-[#168BFF] transition-colors">
                  Trip Planner
                </Link>
              </li>
              <li>
                <Link to="/assistant" className="hover:text-[#168BFF] transition-colors">
                  Yatri AI Assistant
                </Link>
              </li>
              <li>
                <Link to="/community" className="hover:text-[#168BFF] transition-colors">
                  Community Yatris
                </Link>
              </li>
              <li>
                <Link to="/my-trips" className="hover:text-[#168BFF] transition-colors">
                  Saved Trips
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-[#168BFF] transition-colors">
                  Traveler Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#94A3B8] gap-4">
          <p>© 2026 Yatri Technologies. All rights reserved. Crafted for Odoo Hackathon.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#64748B] cursor-pointer">Terms & Conditions</span>
            <span className="hover:text-[#64748B] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#64748B] cursor-pointer">Security & Ethics</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
