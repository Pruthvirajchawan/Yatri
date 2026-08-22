import React, { useState } from 'react';
import { Users2, ShieldCheck, Heart, Sparkles, Scale, AlertCircle, Plus, ThumbsUp, ArrowRight, Check } from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { TripSubNav } from '../components/navigation/TripSubNav';

export const GroupEquityView: React.FC = () => {
  const { currentTrip, balanceGroupEquity } = useTrip();
  const [isBalancing, setIsBalancing] = useState(false);
  const [balanceToast, setBalanceToast] = useState<string | null>(null);

  const groupEquity = currentTrip.groupEquity;

  const handleBalance = async () => {
    setIsBalancing(true);
    try {
      await balanceGroupEquity();
      setBalanceToast('Group preference weights and satisfaction scores successfully rebalanced!');
      setTimeout(() => setBalanceToast(null), 5000);
    } finally {
      setIsBalancing(false);
    }
  };

  return (
    <div className="min-h-screen bg-atmospheric pb-24">
      {/* Sub Navigation */}
      <TripSubNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Header Hero Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8EEF5] editorial-card-shadow flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EBFBF2] text-[#065F46] rounded-full text-xs font-semibold">
              <Users2 className="w-3.5 h-3.5 text-[#35A86B]" />
              <span>Multi-Traveler Preference Harmony</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#101827]">
              Group Equity Engine
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              Travel groups fall apart when one person's interests dominate every afternoon. Yatri calculates each companion’s fulfillment score and suggests compromises that keep everyone excited.
            </p>
          </div>

          <div className="shrink-0 bg-[#F4FAFF] p-6 rounded-2xl border border-[#E8EEF5] text-center space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#168BFF] block">
              Overall Group Harmony
            </span>
            <div className="font-serif text-4xl font-bold text-[#101827]">
              {groupEquity.equityScore} / 100
            </div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
              groupEquity.equityScore >= 85
                ? 'bg-[#EBFBF2] text-[#065F46]'
                : groupEquity.equityScore >= 70
                ? 'bg-[#DFF1FF] text-[#168BFF]'
                : 'bg-[#FFF7ED] text-[#C2410C]'
            }`}>
              {groupEquity.status} Harmony
            </span>
            <button
              onClick={handleBalance}
              disabled={isBalancing}
              className="px-5 py-2.5 bg-[#101827] hover:bg-[#168BFF] text-white text-xs font-semibold rounded-full shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 w-full"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isBalancing ? 'animate-spin' : ''}`} />
              <span>{isBalancing ? 'Balancing Harmony...' : 'Auto-Balance Equity'}</span>
            </button>
          </div>
        </div>

        {/* Balance Feedback */}
        {balanceToast && (
          <div className="p-4 bg-[#EBFBF2] text-[#065F46] rounded-2xl border border-[#A7F3D0] flex items-center gap-2 text-xs sm:text-sm animate-in fade-in duration-200">
            <ShieldCheck className="w-5 h-5 text-[#35A86B] shrink-0" />
            <span>{balanceToast}</span>
          </div>
        )}

        {/* Active Insight Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8EEF5] editorial-card-shadow space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#168BFF] uppercase tracking-wider">
            <Scale className="w-4 h-4" />
            <span>Equity Diagnostic & Conflict Prevention</span>
          </div>
          <p className="text-sm font-serif font-bold text-[#101827] leading-relaxed">
            {groupEquity.insight}
          </p>
          <div className="p-4 rounded-2xl bg-[#F4FAFF] border border-[#E8EEF5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#35A86B] block">
                Algorithmic Compromise Recommendation
              </span>
              <h4 className="font-serif font-bold text-base text-[#101827]">
                {groupEquity.recommendationTitle}
              </h4>
              <p className="text-xs text-[#64748B]">
                {groupEquity.recommendationDescription}
              </p>
            </div>

            <button
              onClick={handleBalance}
              disabled={isBalancing}
              className="px-4 py-2 bg-[#168BFF] hover:bg-[#101827] text-white text-xs font-semibold rounded-xl shadow-xs transition-all shrink-0 cursor-pointer disabled:opacity-50"
            >
              Apply Recommended Balance
            </button>
          </div>
        </div>

        {/* Member Satisfaction Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {groupEquity.travelers.map((traveler) => (
            <div
              key={traveler.id}
              className="bg-white rounded-3xl p-6 border border-[#E8EEF5] editorial-card-shadow flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                {/* Member Avatar & Details */}
                <div className="flex items-center gap-3">
                  <img
                    src={traveler.avatar}
                    alt={traveler.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs"
                  />
                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#101827]">
                      {traveler.name}
                    </h4>
                    <span className="text-[11px] font-semibold text-[#168BFF] block">
                      Weight: {traveler.preferenceWeight}% Priority
                    </span>
                  </div>
                </div>

                {/* Satisfaction Meter */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#64748B]">Fulfillment Score</span>
                    <span className="font-bold text-[#101827]">{traveler.satisfactionScore}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#F4FAFF] rounded-full overflow-hidden border border-[#E8EEF5]">
                    <div
                      style={{ width: `${traveler.satisfactionScore}%` }}
                      className={`h-full rounded-full transition-all duration-700 ${
                        traveler.satisfactionScore >= 80
                          ? 'bg-[#35A86B]'
                          : traveler.satisfactionScore >= 60
                          ? 'bg-[#168BFF]'
                          : 'bg-[#E7A93B]'
                      }`}
                    />
                  </div>
                </div>

                {/* Top Preferences Tags */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] uppercase font-bold text-[#94A3B8] block">
                    Core Companion Interests:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 bg-[#DFF1FF] text-[#168BFF] rounded-lg text-[11px] font-medium border border-[#BEE0FF]">
                      ★ {traveler.primaryPreference}
                    </span>
                    <span className="px-2.5 py-1 bg-[#F4FAFF] text-[#101827] rounded-lg text-[11px] font-medium border border-[#E8EEF5]">
                      {traveler.secondaryPreference}
                    </span>
                  </div>
                </div>
              </div>

              {/* Budget Limit info if any */}
              {traveler.budgetLimit && (
                <div className="pt-3 border-t border-[#E8EEF5] flex items-center justify-between text-xs text-[#64748B]">
                  <span>Target Individual Budget:</span>
                  <span className="font-bold text-[#101827]">₹{traveler.budgetLimit.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Compromise Principles Panel */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8EEF5] editorial-card-shadow space-y-6">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#168BFF]" />
            <h3 className="font-serif text-2xl font-bold text-[#101827]">
              Intelligent Compromise Principles
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-[#F4FAFF] rounded-2xl border border-[#E8EEF5] space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#35A86B] block">
                Visual & Downtime Harmony
              </span>
              <h4 className="font-serif font-bold text-base text-[#101827]">
                Golden Hour Sunset Pairing
              </h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Stepwell rooftop chai paired with heritage architecture satisfies relaxation while preserving photography goals.
              </p>
            </div>

            <div className="p-4 bg-[#F4FAFF] rounded-2xl border border-[#E8EEF5] space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#168BFF] block">
                Culinary Balance
              </span>
              <h4 className="font-serif font-bold text-base text-[#101827]">
                Street Chaat & Royal Haveli Feast
              </h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Fast-paced evening bazaar tastings alternating with seated courtyard dinners ensures neither foodie nor comfort seeker feels fatigued.
              </p>
            </div>

            <div className="p-4 bg-[#F4FAFF] rounded-2xl border border-[#E8EEF5] space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#E7A93B] block">
                Sleep Buffer Protocol
              </span>
              <h4 className="font-serif font-bold text-base text-[#101827]">
                Protected Morning Departure Times
              </h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                No morning alarms set before 08:30 AM to accommodate varied sleep cycles across companions without losing sightseeing slots.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
