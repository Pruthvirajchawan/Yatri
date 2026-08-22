import React, { useState } from 'react';
import { ShieldAlert, Star, CheckCircle2, ChevronRight, Info } from 'lucide-react';
import { RegretMapItem } from '../../types';

interface RegretMapCardProps {
  items: RegretMapItem[];
}

export const RegretMapCard: React.FC<RegretMapCardProps> = ({ items }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'dont-miss' | 'nice-to-have' | 'easy-to-skip'>('all');

  const filtered = activeFilter === 'all' ? items : items.filter((item) => item.tier === activeFilter);

  const tierBadges = {
    'dont-miss': { label: "Don't Miss", bg: 'bg-[#FDEDEC] text-[#D9534F] border-[#FECACA]' },
    'nice-to-have': { label: 'Nice to Have', bg: 'bg-[#FFF8ED] text-[#E7A93B] border-[#FDE68A]' },
    'easy-to-skip': { label: 'Easy to Skip', bg: 'bg-[#F4FAFF] text-[#64748B] border-[#E8EEF5]' }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E8EEF5] editorial-card-shadow space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-semibold text-[#168BFF] uppercase tracking-wider block">
            Decision Priority Matrix
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#101827] mt-0.5">
            Regret Map
          </h3>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-[#F4FAFF] p-1 rounded-full border border-[#E8EEF5] text-xs">
          {(['all', 'dont-miss', 'nice-to-have', 'easy-to-skip'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1 rounded-full font-medium transition-all capitalize cursor-pointer ${
                activeFilter === filter
                  ? 'bg-[#101827] text-white shadow-xs'
                  : 'text-[#64748B] hover:text-[#101827]'
              }`}
            >
              {filter.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-[#64748B] leading-relaxed">
        Understand what you are most likely to regret missing versus what can be safely skipped to save hours and budget without regret.
      </p>

      {/* Regret Map List */}
      <div className="space-y-3 pt-2">
        {filtered.map((item) => {
          const badge = tierBadges[item.tier];
          return (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-[#E8EEF5] bg-white hover:border-[#168BFF]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${badge.bg}`}
                  >
                    {badge.label}
                  </span>
                  <span className="text-xs text-[#94A3B8] font-medium">{item.destination}</span>
                </div>
                <h4 className="font-serif text-base sm:text-lg font-bold text-[#101827]">
                  {item.activityTitle}
                </h4>
                <p className="text-xs text-[#64748B]">{item.reason}</p>
              </div>

              <div className="shrink-0 sm:text-right">
                <span className="text-[10px] uppercase font-semibold text-[#94A3B8] block">
                  Regret Impact
                </span>
                <span className="text-sm font-bold text-[#101827]">
                  {item.impactScore} / 100
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
