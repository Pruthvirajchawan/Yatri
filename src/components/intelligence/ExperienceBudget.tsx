import React from 'react';
import { Clock, Compass, Car, Coffee, BedDouble } from 'lucide-react';
import { ExperienceBudget } from '../../types';

interface ExperienceBudgetCardProps {
  budget: ExperienceBudget;
}

export const ExperienceBudgetCard: React.FC<ExperienceBudgetCardProps> = ({ budget }) => {
  const explorationPercent = Math.round((budget.explorationHours / budget.totalHours) * 100);
  const transitPercent = Math.round((budget.transitHours / budget.totalHours) * 100);
  const freeTimePercent = Math.round((budget.freeTimeHours / budget.totalHours) * 100);
  const recoveryPercent = Math.round((budget.recoveryHours / budget.totalHours) * 100);

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E8EEF5] editorial-card-shadow space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[11px] font-semibold text-[#168BFF] uppercase tracking-wider block">
            Energy & Time Intelligence
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#101827] mt-0.5">
            Experience Budget
          </h3>
        </div>

        <div className="text-right">
          <span className="text-2xl font-serif font-bold text-[#101827]">
            {budget.usedHours} / {budget.totalHours}h
          </span>
          <span className="text-xs text-[#64748B] block">Hours Allocated</span>
        </div>
      </div>

      <p className="text-xs text-[#64748B] leading-relaxed">
        Your trip has limited daily stamina and wakefulness — not just financial budget. We balance cultural wonder with adequate downtime.
      </p>

      {/* Multi-segment Progress Bar */}
      <div className="w-full h-3.5 bg-[#F4FAFF] rounded-full overflow-hidden flex p-0.5 border border-[#E8EEF5]">
        <div
          style={{ width: `${explorationPercent}%` }}
          className="bg-[#168BFF] rounded-l-full"
          title={`Exploration: ${budget.explorationHours}h`}
        />
        <div
          style={{ width: `${transitPercent}%` }}
          className="bg-[#E7A93B]"
          title={`Transit: ${budget.transitHours}h`}
        />
        <div
          style={{ width: `${freeTimePercent}%` }}
          className="bg-[#35A86B]"
          title={`Free Time: ${budget.freeTimeHours}h`}
        />
        <div
          style={{ width: `${recoveryPercent}%` }}
          className="bg-[#94A3B8] rounded-r-full"
          title={`Recovery: ${budget.recoveryHours}h`}
        />
      </div>

      {/* Breakdown Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <div className="p-3 bg-[#F4FAFF] rounded-xl border border-[#E8EEF5]">
          <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
            <Compass className="w-3.5 h-3.5 text-[#168BFF]" />
            <span>Exploration</span>
          </div>
          <span className="text-lg font-bold font-serif text-[#101827] mt-1 block">
            {budget.explorationHours}h
          </span>
          <span className="text-[10px] text-[#94A3B8]">{explorationPercent}% of trip</span>
        </div>

        <div className="p-3 bg-[#F4FAFF] rounded-xl border border-[#E8EEF5]">
          <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
            <Car className="w-3.5 h-3.5 text-[#E7A93B]" />
            <span>Transit</span>
          </div>
          <span className="text-lg font-bold font-serif text-[#101827] mt-1 block">
            {budget.transitHours}h
          </span>
          <span className="text-[10px] text-[#94A3B8]">{transitPercent}% highway/train</span>
        </div>

        <div className="p-3 bg-[#F4FAFF] rounded-xl border border-[#E8EEF5]">
          <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
            <Coffee className="w-3.5 h-3.5 text-[#35A86B]" />
            <span>Free Time</span>
          </div>
          <span className="text-lg font-bold font-serif text-[#101827] mt-1 block">
            {budget.freeTimeHours}h
          </span>
          <span className="text-[10px] text-[#94A3B8]">{freeTimePercent}% unhurried</span>
        </div>

        <div className="p-3 bg-[#F4FAFF] rounded-xl border border-[#E8EEF5]">
          <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
            <BedDouble className="w-3.5 h-3.5 text-[#94A3B8]" />
            <span>Recovery</span>
          </div>
          <span className="text-lg font-bold font-serif text-[#101827] mt-1 block">
            {budget.recoveryHours}h
          </span>
          <span className="text-[10px] text-[#94A3B8]">{recoveryPercent}% buffers</span>
        </div>
      </div>
    </div>
  );
};
