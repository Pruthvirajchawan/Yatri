import React, { useState } from 'react';
import { X, Copy, Check, Share2, Mail, MessageCircle } from 'lucide-react';
import { Trip } from '../../types';

interface ShareModalProps {
  trip: Trip;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ trip, onClose }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Check out our trip plan on Yatri: "${trip.title}" (${trip.totalDays} Days · ${trip.destinationSummary}) — ${shareUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#101827]/40 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 border border-[#E8EEF5] shadow-2xl animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8EEF5]">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-[#168BFF]" />
            <h3 className="font-serif text-xl font-bold text-[#101827]">
              Share This Yatri
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#F4FAFF] flex items-center justify-center text-[#94A3B8] hover:text-[#101827] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-4">
          <div className="p-3 bg-[#F4FAFF] rounded-xl border border-[#E8EEF5]">
            <h4 className="font-serif font-bold text-sm text-[#101827]">
              {trip.title}
            </h4>
            <p className="text-xs text-[#64748B]">
              {trip.totalDays} Days · {trip.travelerCount} Travelers · Trip Health: {trip.health?.score}/100
            </p>
          </div>

          {/* Copy Link Input */}
          <div>
            <label className="text-xs font-semibold text-[#101827] block mb-1.5">
              Public Itinerary Link
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="w-full px-3 py-2 bg-[#F4FAFF] rounded-xl border border-[#E8EEF5] text-xs text-[#64748B] focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-[#101827] hover:bg-[#168BFF] text-white text-xs font-medium rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 text-blue-200" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Quick Share Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={handleWhatsApp}
              className="flex items-center justify-center gap-2 py-2.5 bg-[#EBFBF2] text-[#065F46] border border-[#A7F3D0] rounded-xl text-xs font-semibold hover:bg-[#d1fae5] transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#35A86B]" />
              <span>Share to WhatsApp</span>
            </button>

            <button
              onClick={() => {
                const subject = encodeURIComponent(`Yatri Travel Plan: ${trip.title}`);
                const body = encodeURIComponent(`Explore our full itinerary and decision insights at: ${shareUrl}`);
                window.location.href = `mailto:?subject=${subject}&body=${body}`;
              }}
              className="flex items-center justify-center gap-2 py-2.5 bg-[#F4FAFF] text-[#101827] border border-[#E8EEF5] rounded-xl text-xs font-semibold hover:bg-[#DFF1FF] transition-colors cursor-pointer"
            >
              <Mail className="w-4 h-4 text-[#168BFF]" />
              <span>Email Group</span>
            </button>
          </div>
        </div>

        <div className="pt-3 border-t border-[#E8EEF5] text-center">
          <button
            onClick={onClose}
            className="w-full py-2 text-xs font-medium text-[#64748B] hover:text-[#101827] cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
