import React from 'react';
import { TripHealth } from '../../types';
import { ShieldCheck, Zap, Clock, Users2 } from 'lucide-react';

interface HealthGaugeProps {
  health: TripHealth;
  size?: 'sm' | 'md' | 'lg';
}

export const HealthGauge: React.FC<HealthGaugeProps> = ({ health, size = 'md' }) => {
  const score = health.score;

  // Determine stroke color
  let strokeColor = '#35A86B'; // green
  if (score < 60) strokeColor = '#D9534F';
  else if (score < 80) strokeColor = '#E7A93B';

  const radius = size === 'lg' ? 68 : size === 'sm' ? 36 : 52;
  const strokeWidth = size === 'lg' ? 10 : size === 'sm' ? 6 : 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center text-center">
      {/* Radial Gauge */}
      <div className="relative inline-flex items-center justify-center">
        <svg
          className="transform -rotate-90"
          width={radius * 2 + strokeWidth * 2}
          height={radius * 2 + strokeWidth * 2}
        >
          {/* Background circle */}
          <circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            stroke="#E8EEF5"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated score arc */}
          <circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center score readout */}
        <div className="absolute flex flex-col items-center justify-center">
          <span
            className={`font-serif font-bold text-[#101827] leading-none ${
              size === 'lg' ? 'text-4xl' : size === 'sm' ? 'text-lg' : 'text-3xl'
            }`}
          >
            {score}
          </span>
          <span className="text-[10px] uppercase font-semibold text-[#94A3B8] tracking-wider mt-0.5">
            / 100
          </span>
        </div>
      </div>

      {/* 4 Pillars Indicators */}
      <div className="grid grid-cols-2 gap-2 mt-6 w-full text-left">
        <div className="bg-[#F4FAFF] p-2.5 rounded-xl border border-[#E8EEF5]">
          <div className="flex items-center gap-1.5 text-[11px] text-[#64748B]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#168BFF]" />
            <span>Budget</span>
          </div>
          <span className="text-xs font-bold text-[#101827] mt-0.5 block">
            {health.budgetStatus}
          </span>
        </div>

        <div className="bg-[#F4FAFF] p-2.5 rounded-xl border border-[#E8EEF5]">
          <div className="flex items-center gap-1.5 text-[11px] text-[#64748B]">
            <Zap className="w-3.5 h-3.5 text-[#E7A93B]" />
            <span>Travel Load</span>
          </div>
          <span className="text-xs font-bold text-[#101827] mt-0.5 block">
            {health.travelLoad}
          </span>
        </div>

        <div className="bg-[#F4FAFF] p-2.5 rounded-xl border border-[#E8EEF5]">
          <div className="flex items-center gap-1.5 text-[11px] text-[#64748B]">
            <Clock className="w-3.5 h-3.5 text-[#35A86B]" />
            <span>Free Time</span>
          </div>
          <span className="text-xs font-bold text-[#101827] mt-0.5 block">
            {health.freeTime}
          </span>
        </div>

        <div className="bg-[#F4FAFF] p-2.5 rounded-xl border border-[#E8EEF5]">
          <div className="flex items-center gap-1.5 text-[11px] text-[#64748B]">
            <Users2 className="w-3.5 h-3.5 text-[#9333EA]" />
            <span>Group Equity</span>
          </div>
          <span className="text-xs font-bold text-[#101827] mt-0.5 block">
            {health.groupBalance}
          </span>
        </div>
      </div>
    </div>
  );
};
