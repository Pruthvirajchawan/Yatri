import React, { useState } from 'react';
import { GitFork, Check, ArrowRight, Sparkles, Scale, Clock, IndianRupee, ShieldCheck, Zap } from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { TripSubNav } from '../components/navigation/TripSubNav';
import { TradeOffScenario } from '../types';

export const TradeOffEngine: React.FC = () => {
  const { currentTrip } = useTrip();

  // Mock trade-off scenarios
  const [scenarios, setScenarios] = useState<TradeOffScenario[]>([
    {
      id: 'tradeoff-1',
      title: 'Transit Mode: Vande Bharat Express vs Private SUV',
      category: 'Transit',
      optionA: {
        title: 'Vande Bharat Express Rail',
        pros: ['Zero highway fatigue', 'Spacious AC seating & onboard meals', 'Save ₹12,000 group total'],
        cons: ['Fixed timetable departure at 06:00 AM', 'Requires railway station luggage handling'],
        costDelta: -12000,
        timeDelta: -1.5,
        energyImpact: 'High Energy Saved'
      },
      optionB: {
        title: 'Chauffeured Toyota Innova SUV',
        pros: ['Flexible door-to-door departure', 'Spontaneous roadside Dhaba & photography stops', 'Private group space'],
        cons: ['Highway toll gate friction', 'Driver rest stops add ~2.5 hrs on NH48'],
        costDelta: 12000,
        timeDelta: 2.5,
        energyImpact: 'Moderate Highway Fatigue'
      },
      selectedOption: 'A'
    },
    {
      id: 'tradeoff-2',
      title: 'Accommodation: Heritage Palace Haveli vs Modern Boutique Hotel',
      category: 'Stay',
      optionA: {
        title: 'Alsisar Haveli / Heritage Courtyard',
        pros: ['18th-century Rajputana architecture', 'Centuries-old frescoes & live sitar evenings', 'Cultural immersion'],
        cons: ['Older plumbing charm', 'Narrow heritage street access requires rickshaw transfer'],
        costDelta: 8000,
        timeDelta: 0,
        energyImpact: 'High Soul & Relaxation'
      },
      optionB: {
        title: 'Modern 4-Star Downtown Hotel',
        pros: ['Fast fiber internet & modern fitness gym', 'Direct highway access with easy bus parking'],
        cons: ['Generic commercial ambiance', 'Lacks authentic local historic character'],
        costDelta: -8000,
        timeDelta: 0,
        energyImpact: 'Standard Comfort'
      },
      selectedOption: 'A'
    },
    {
      id: 'tradeoff-3',
      title: 'Sightseeing Pace: 3 In-Depth Sights vs 6 Quick Snapshot Visits',
      category: 'Pacing',
      optionA: {
        title: 'Slow In-Depth Exploration (Selected)',
        pros: ['Unrushed audio guides & rooftop chai', 'Trip Health 84/100', 'Zero evening exhaustion'],
        cons: ['Skips 2 secondary cenotaphs'],
        costDelta: -3500,
        timeDelta: -4.0,
        energyImpact: 'Pristine Low Debt'
      },
      optionB: {
        title: 'Whirlwind All-Checklist Tour',
        pros: ['Covers every single listed monument and market in guidebook'],
        cons: ['Trip Debt escalates to 68/100', 'Group friction over rushed transit schedules'],
        costDelta: 3500,
        timeDelta: 4.0,
        energyImpact: 'High Fatigue'
      },
      selectedOption: 'A'
    }
  ]);

  const [appliedToast, setAppliedToast] = useState<string | null>(null);

  const handleSelectOption = (scenarioId: string, option: 'A' | 'B') => {
    setScenarios(
      scenarios.map((s) => (s.id === scenarioId ? { ...s, selectedOption: option } : s))
    );
    setAppliedToast(`Updated choice for "${scenarios.find((s) => s.id === scenarioId)?.title}"`);
    setTimeout(() => setAppliedToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-atmospheric pb-24">
      {/* Sub Navigation */}
      <TripSubNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8EEF5] editorial-card-shadow">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#168BFF] uppercase tracking-wider mb-2">
            <Scale className="w-4 h-4" />
            <span>Algorithmic Trade-Off Simulator</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#101827]">
            Make Informed Travel Trade-Offs
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-3xl mt-1 leading-relaxed">
            Every travel choice has a price and energy toll. Compare alternative options side-by-side to understand exact differences in rupees, hours saved, and fatigue impact.
          </p>
        </div>

        {/* Trade-Off Scenarios List */}
        <div className="space-y-8">
          {scenarios.map((scenario) => (
            <div
              key={scenario.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8EEF5] editorial-card-shadow space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E8EEF5] gap-2">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#168BFF]">
                    Trade-Off: {scenario.category}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#101827]">
                    {scenario.title}
                  </h3>
                </div>
                <span className="text-xs font-semibold px-3 py-1 bg-[#F4FAFF] text-[#101827] rounded-full border border-[#E8EEF5] self-start sm:self-auto">
                  Active Choice: Option {scenario.selectedOption}
                </span>
              </div>

              {/* Side-by-Side Comparison Columns */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Option A */}
                <div
                  onClick={() => handleSelectOption(scenario.id, 'A')}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                    scenario.selectedOption === 'A'
                      ? 'bg-[#F4FAFF] border-[#168BFF] shadow-md ring-2 ring-[#168BFF]/20'
                      : 'bg-white border-[#E8EEF5] hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#168BFF] uppercase tracking-wider">
                        Option A
                      </span>
                      {scenario.selectedOption === 'A' && (
                        <span className="flex items-center gap-1 text-xs font-bold text-[#168BFF] bg-white px-2.5 py-0.5 rounded-full shadow-xs">
                          <Check className="w-3.5 h-3.5 stroke-[3]" /> Selected
                        </span>
                      )}
                    </div>
                    <h4 className="font-serif text-xl font-bold text-[#101827]">
                      {scenario.optionA.title}
                    </h4>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-3 gap-2 py-2 border-y border-[#E8EEF5] text-xs">
                      <div>
                        <span className="text-[10px] text-[#94A3B8] block">Cost Delta</span>
                        <span className="font-bold text-[#101827]">
                          {scenario.optionA.costDelta <= 0 ? `Save ₹${Math.abs(scenario.optionA.costDelta).toLocaleString('en-IN')}` : `+₹${scenario.optionA.costDelta.toLocaleString('en-IN')}`}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#94A3B8] block">Transit Time</span>
                        <span className="font-bold text-[#101827]">
                          {scenario.optionA.timeDelta <= 0 ? `${scenario.optionA.timeDelta}h faster` : `+${scenario.optionA.timeDelta}h longer`}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#94A3B8] block">Energy</span>
                        <span className="font-bold text-[#35A86B]">{scenario.optionA.energyImpact}</span>
                      </div>
                    </div>

                    {/* Pros and Cons */}
                    <div className="space-y-2 text-xs">
                      <div className="space-y-1">
                        <span className="font-semibold text-[#047857] block">Advantages:</span>
                        {scenario.optionA.pros.map((pro, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[#065F46]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#35A86B]" />
                            <span>{pro}</span>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-1 pt-1">
                        <span className="font-semibold text-[#B45309] block">Trade-Off Considerations:</span>
                        {scenario.optionA.cons.map((con, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[#92400E]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E7A93B]" />
                            <span>{con}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      scenario.selectedOption === 'A'
                        ? 'bg-[#168BFF] text-white shadow-xs'
                        : 'bg-[#F4FAFF] text-[#101827] hover:bg-[#E8EEF5]'
                    }`}
                  >
                    {scenario.selectedOption === 'A' ? 'Active in Itinerary' : 'Select Option A'}
                  </button>
                </div>

                {/* Option B */}
                <div
                  onClick={() => handleSelectOption(scenario.id, 'B')}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                    scenario.selectedOption === 'B'
                      ? 'bg-[#F4FAFF] border-[#168BFF] shadow-md ring-2 ring-[#168BFF]/20'
                      : 'bg-white border-[#E8EEF5] hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
                        Option B
                      </span>
                      {scenario.selectedOption === 'B' && (
                        <span className="flex items-center gap-1 text-xs font-bold text-[#168BFF] bg-white px-2.5 py-0.5 rounded-full shadow-xs">
                          <Check className="w-3.5 h-3.5 stroke-[3]" /> Selected
                        </span>
                      )}
                    </div>
                    <h4 className="font-serif text-xl font-bold text-[#101827]">
                      {scenario.optionB.title}
                    </h4>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-3 gap-2 py-2 border-y border-[#E8EEF5] text-xs">
                      <div>
                        <span className="text-[10px] text-[#94A3B8] block">Cost Delta</span>
                        <span className="font-bold text-[#101827]">
                          {scenario.optionB.costDelta <= 0 ? `Save ₹${Math.abs(scenario.optionB.costDelta).toLocaleString('en-IN')}` : `+₹${scenario.optionB.costDelta.toLocaleString('en-IN')}`}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#94A3B8] block">Transit Time</span>
                        <span className="font-bold text-[#101827]">
                          {scenario.optionB.timeDelta <= 0 ? `${scenario.optionB.timeDelta}h faster` : `+${scenario.optionB.timeDelta}h longer`}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#94A3B8] block">Energy</span>
                        <span className="font-bold text-[#E7A93B]">{scenario.optionB.energyImpact}</span>
                      </div>
                    </div>

                    {/* Pros and Cons */}
                    <div className="space-y-2 text-xs">
                      <div className="space-y-1">
                        <span className="font-semibold text-[#047857] block">Advantages:</span>
                        {scenario.optionB.pros.map((pro, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[#065F46]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#35A86B]" />
                            <span>{pro}</span>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-1 pt-1">
                        <span className="font-semibold text-[#B45309] block">Trade-Off Considerations:</span>
                        {scenario.optionB.cons.map((con, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[#92400E]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E7A93B]" />
                            <span>{con}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      scenario.selectedOption === 'B'
                        ? 'bg-[#168BFF] text-white shadow-xs'
                        : 'bg-[#F4FAFF] text-[#101827] hover:bg-[#E8EEF5]'
                    }`}
                  >
                    {scenario.selectedOption === 'B' ? 'Active in Itinerary' : 'Select Option B'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Applied Toast */}
      {appliedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#101827] text-white px-5 py-3 rounded-2xl shadow-xl text-xs sm:text-sm flex items-center gap-2 animate-in fade-in duration-200">
          <Sparkles className="w-4 h-4 text-[#168BFF]" />
          <span>{appliedToast}</span>
        </div>
      )}
    </div>
  );
};
