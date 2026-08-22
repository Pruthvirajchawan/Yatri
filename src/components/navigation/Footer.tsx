import React from 'react';
import { Link } from 'react-router-dom';
import { YatriLogo } from '../common/YatriLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#E8EEF5] bg-[#FFFFFF] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand & Editorial Tagline Header */}
        <div className="mb-12">
          <Link to="/" className="inline-block mb-4">
            <YatriLogo size="lg" />
          </Link>
          <h3 className="font-serif text-2xl sm:text-4xl text-[#101827] max-w-md leading-tight font-medium">
            Discover Incredible India, one journey at a time
          </h3>
          <p className="text-xs sm:text-sm text-[#64748B] mt-2 max-w-sm">
            Curated mountain expeditions, certified Himalayan guides, and customized trip itineraries in Indian Rupees (₹).
          </p>
        </div>

        {/* 4 Footer Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 pb-12 border-b border-[#E8EEF5]">
          {/* Column 1: Support / Main Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#101827]">
              Support
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#64748B]">
              <li>
                <Link to="/discover" className="hover:text-[#101827] transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/discover?tab=activities" className="hover:text-[#101827] transition-colors">
                  Activities
                </Link>
              </li>
              <li>
                <Link to="/assistant" className="hover:text-[#101827] transition-colors">
                  Travel Tips
                </Link>
              </li>
              <li>
                <Link to="/plan" className="hover:text-[#101827] transition-colors">
                  Plan My Trip
                </Link>
              </li>
              <li>
                <Link to="/community" className="hover:text-[#101827] transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Support / Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#101827]">
              Legal
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#64748B]">
              <li>
                <a href="#faq" className="hover:text-[#101827] transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#101827] transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-[#101827] transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-[#101827] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#refund" className="hover:text-[#101827] transition-colors">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Social */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#101827]">
              Social
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#64748B]">
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#101827] transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#101827] transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-[#101827] transition-colors">
                  YouTube
                </a>
              </li>
              <li>
                <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-[#101827] transition-colors">
                  TikTok
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-[#101827] transition-colors">
                  Twitter
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Support Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#101827]">
              Contact
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-[#64748B] leading-relaxed">
              <p>Connaught Place, Central Delhi,<br />New Delhi 110001, India</p>
              <p className="font-medium text-[#101827]">+91 98765 43210</p>
              <p className="text-[#101827]">namaste@yatri.in</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#94A3B8] gap-4">
          <p>© 2026 Yatri India Inc. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#64748B] cursor-pointer">Terms & Conditions</span>
            <span>|</span>
            <span className="hover:text-[#64748B] cursor-pointer">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
