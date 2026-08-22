import React, { useState } from 'react';
import { Sparkles, Activity, ShieldCheck, Zap, TrendingUp, RefreshCw, AlertCircle, ArrowRight } from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { TripSubNav } from '../components/navigation/TripSubNav';
import { HealthGauge } from '../components/intelligence/HealthGauge';
import { ExperienceBudgetCard } from '../components/intelligence/ExperienceBudgetCard';
import { TripDebtCard } from '../components/intelligence/TripDebtCard';
import { RegretMapCard } from '../components/intelligence/RegretMapCard';
import { DominoSimulator } from '../components/intelligence/DominoSimulator';

export const TripIntelligence: React.FC = () => {
  const { currentTrip, optimizeTrip } = useTrip();
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optResult, setOptResult] = useState<string | null>(null);

  const handleRunOptimizer = async () => {
    setIsOptimizing(true);
    try {
      const res = await optimizeTrip();
      setOptResult(res.message);
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <div className="min-h-screen bg-atmospheric pb-24">
      {/* Sub Navigation */}
      <TripSubNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Top Hero Banner for Intelligence */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8EEF5] editorial-card-shadow flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#DFF1FF] text-[#168BFF] rounded-full text-xs font-semibold">
              <Activity className="w-3.5 h-3.5" />
              <span>Algorithmic Fatigue & Pacing Guard</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#101827]">
              Trip Decision Intelligence
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              Yatri continuously validates your itinerary against travel fatigue, road transfer times, and time allocations to ensure high fulfillment with zero regret.
            </p>
          </div>

          {/* Overall Health Gauge */}
          <div className="shrink-0 bg-[#F4FAFF] p-6 rounded-2xl border border-[#E8EEF5] flex flex-col items-center">
            <HealthGauge health={currentTrip.health} size="lg" />
            <button
              onClick={handleRunOptimizer}
              disabled={isOptimizing}
              className="mt-4 px-5 py-2.5 bg-[#101827] hover:bg-[#168BFF] text-white text-xs font-semibold rounded-full shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isOptimizing ? 'animate-spin' : ''}`} />
              <span>{isOptimizing ? 'Re-balancing Pacing...' : 'Auto-Optimize Pacing'}</span>
            </button>
          </div>
        </div>

        {/* Optimizer Feedback Message */}
        {optResult && (
          <div className="p-4 bg-[#EBFBF2] text-[#065F46] rounded-2xl border border-[#A7F3D0] flex items-center justify-between text-xs sm:text-sm animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#35A86B]" />
              <span>{optResult}</span>
            </div>
            <button
              onClick={() => setOptResult(null)}
              className="text-xs font-bold underline cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* 2-Column Grid: Experience Budget & Trip Debt */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ExperienceBudgetCard budget={currentTrip.experienceBudget} />
          <TripDebtCard debt={currentTrip.tripDebt} />
        </div>

        {/* Regret Map Priority Matrix */}
        <RegretMapCard items={currentTrip.regretMap} />

        {/* Domino Effect Sandbox Simulator */}
        <DominoSimulator />
      </div>
    </div>
  );
};
