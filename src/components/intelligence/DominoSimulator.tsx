import React, { useState } from 'react';
import { GitCompare, ArrowRight, AlertTriangle, CheckCircle, Zap, RefreshCw } from 'lucide-react';

export const DominoSimulator: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<'early-departure' | 'add-night' | 'private-cab'>('early-departure');

  const scenarios = {
    'early-departure': {
      title: 'Shift Departure on Day 5 from 08:30 to 06:30 AM',
      trigger: 'Leave 2 hours earlier for Jodhpur to beat highway truck traffic',
      ripples: [
        { step: 1, title: 'Highway Transit', effect: 'Saves 45 mins road time due to clear toll gates.', status: 'positive' },
        { step: 2, title: 'Breakfast Experience', effect: 'Misses leisurely courtyard breakfast at Alsisar Haveli.', status: 'warning' },
        { step: 3, title: 'Check-in Readiness', effect: 'Arrives at Jodhpur before hotel room is ready (11:15 AM).', status: 'neutral' },
        { step: 4, title: 'Trip Debt Impact', effect: 'Trip Debt increases +8 due to sleep reduction under 6.5 hours.', status: 'negative' }
      ]
    },
    'add-night': {
      title: 'Add an extra night in Udaipur (Total 8 Days)',
      trigger: 'Extend Udaipur stay for slow lakeside leisure',
      ripples: [
        { step: 1, title: 'Schedule Relief', effect: 'Reclaims +4.5 hours of free time on Day 6 & 7.', status: 'positive' },
        { step: 2, title: 'Budget Impact', effect: 'Increases lodging and meals by ₹6,800/person.', status: 'warning' },
        { step: 3, title: 'Flight Rescheduling', effect: 'Requires shifting return flight to Sunday evening.', status: 'neutral' },
        { step: 4, title: 'Trip Health Score', effect: 'Trip Health jumps from 84 to 92 (Pristine slow pace).', status: 'positive' }
      ]
    },
    'private-cab': {
      title: 'Replace Train with Private SUV for whole circuit',
      trigger: 'Door-to-door luggage handling and photography stops',
      ripples: [
        { step: 1, title: 'Flexibility', effect: 'Stop at roadside dhaba and stepwells on demand.', status: 'positive' },
        { step: 2, title: 'Total Transit Time', effect: '+2.5 hours longer overall compared to express rail.', status: 'warning' },
        { step: 3, title: 'Budget Change', effect: 'Adds ₹11,200 total fuel and driver allowances.', status: 'negative' },
        { step: 4, title: 'Group Equity', effect: 'Rahul and Sneha both prefer private legroom (+6% satisfaction).', status: 'positive' }
      ]
    }
  };

  const current = scenarios[selectedScenario];

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E8EEF5] editorial-card-shadow space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-semibold text-[#168BFF] uppercase tracking-wider block">
            Simulation Sandbox
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#101827] mt-0.5">
            Domino Effect Simulator
          </h3>
        </div>

        {/* Scenario Toggle */}
        <div className="flex items-center gap-1 bg-[#F4FAFF] p-1 rounded-full border border-[#E8EEF5] text-xs">
          <button
            onClick={() => setSelectedScenario('early-departure')}
            className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${
              selectedScenario === 'early-departure'
                ? 'bg-[#101827] text-white shadow-xs'
                : 'text-[#64748B] hover:text-[#101827]'
            }`}
          >
            Early Departure
          </button>
          <button
            onClick={() => setSelectedScenario('add-night')}
            className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${
              selectedScenario === 'add-night'
                ? 'bg-[#101827] text-white shadow-xs'
                : 'text-[#64748B] hover:text-[#101827]'
            }`}
          >
            Add Night
          </button>
          <button
            onClick={() => setSelectedScenario('private-cab')}
            className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${
              selectedScenario === 'private-cab'
                ? 'bg-[#101827] text-white shadow-xs'
                : 'text-[#64748B] hover:text-[#101827]'
            }`}
          >
            Private SUV
          </button>
        </div>
      </div>

      <div className="p-4 bg-[#F4FAFF] rounded-xl border border-[#E8EEF5]">
        <span className="text-[10px] uppercase font-semibold text-[#168BFF] block tracking-wider">
          Single Decision Trigger
        </span>
        <h4 className="font-serif text-lg font-bold text-[#101827] mt-0.5">
          {current.title}
        </h4>
        <p className="text-xs text-[#64748B] mt-0.5">{current.trigger}</p>
      </div>

      {/* Cascading Domino Chain */}
      <div className="space-y-3">
        <span className="text-xs font-semibold text-[#101827] uppercase tracking-wider block">
          Cascading Downstream Repercussions:
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {current.ripples.map((ripple) => (
            <div
              key={ripple.step}
              className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
                ripple.status === 'positive'
                  ? 'bg-[#EBFBF2] border-[#A7F3D0] text-[#065F46]'
                  : ripple.status === 'warning'
                  ? 'bg-[#FFF8ED] border-[#FDE68A] text-[#92400E]'
                  : ripple.status === 'negative'
                  ? 'bg-[#FDEDEC] border-[#FECACA] text-[#991B1B]'
                  : 'bg-white border-[#E8EEF5] text-[#101827]'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-white/80 shrink-0 flex items-center justify-center font-bold text-xs shadow-xs">
                {ripple.step}
              </div>
              <div className="space-y-0.5">
                <h5 className="font-semibold text-xs">{ripple.title}</h5>
                <p className="text-xs opacity-90 leading-relaxed">{ripple.effect}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
