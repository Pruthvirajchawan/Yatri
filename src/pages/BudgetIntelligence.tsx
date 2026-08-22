import React, { useState } from 'react';
import { IndianRupee, PieChart, ShieldCheck, Sparkles, TrendingDown, ArrowRight, Wallet, BedDouble, Car, Camera, Utensils, AlertTriangle } from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { TripSubNav } from '../components/navigation/TripSubNav';

export const BudgetIntelligence: React.FC = () => {
  const { currentTrip } = useTrip();

  const [targetBudgetPerPerson, setTargetBudgetPerPerson] = useState(
    currentTrip.budgetPerPerson || 29500
  );

  // Breakdown percentages
  const categories = [
    { name: 'Heritage Lodging & Haveli', amount: 48000, color: 'bg-[#168BFF]', icon: BedDouble, percent: 41 },
    { name: 'Private & Rail Transit', amount: 22000, color: 'bg-[#E7A93B]', icon: Car, percent: 19 },
    { name: 'Guided Experiences & Tickets', amount: 28000, color: 'bg-[#35A86B]', icon: Camera, percent: 24 },
    { name: 'Authentic Meals & Sweets', amount: 15000, color: 'bg-[#9333EA]', icon: Utensils, percent: 12 },
    { name: 'Contingency / Emergency Buffer', amount: 5000, color: 'bg-[#94A3B8]', icon: Wallet, percent: 4 }
  ];

  const totalCalculated = categories.reduce((sum, c) => sum + c.amount, 0);
  const perPersonCalculated = totalCalculated / currentTrip.travelerCount;

  return (
    <div className="min-h-screen bg-atmospheric pb-24">
      {/* Sub Navigation */}
      <TripSubNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Header Hero Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8EEF5] editorial-card-shadow flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#DFF1FF] text-[#168BFF] rounded-full text-xs font-semibold">
              <IndianRupee className="w-3.5 h-3.5" />
              <span>Realistic Expense Architecture</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#101827]">
              Budget & Expense Intelligence
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              No hidden tourist traps or surprise toll taxes. Yatri models genuine Indian travel expenses across stays, drivers, monument guides, and dining buffers.
            </p>
          </div>

          <div className="shrink-0 bg-[#F4FAFF] p-6 rounded-2xl border border-[#E8EEF5] text-right space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#94A3B8] block">
              Total Estimated Group Cost
            </span>
            <div className="font-serif text-4xl font-bold text-[#101827]">
              ₹{totalCalculated.toLocaleString('en-IN')}
            </div>
            <span className="text-xs text-[#64748B] block">
              ₹{perPersonCalculated.toLocaleString('en-IN')} per person ({currentTrip.travelerCount} pax)
            </span>
          </div>
        </div>

        {/* Multi-segment Budget Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8EEF5] editorial-card-shadow space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="font-serif text-2xl font-bold text-[#101827]">
              Expense Allocation Breakdown
            </h3>
            <span className="text-xs text-[#35A86B] font-semibold bg-[#EBFBF2] px-3 py-1 rounded-full border border-[#A7F3D0]">
              ✓ Within Target Budget
            </span>
          </div>

          {/* Progress Strip */}
          <div className="w-full h-4 bg-[#F4FAFF] rounded-full overflow-hidden flex p-0.5 border border-[#E8EEF5]">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                style={{ width: `${cat.percent}%` }}
                className={`${cat.color} ${idx === 0 ? 'rounded-l-full' : ''} ${
                  idx === categories.length - 1 ? 'rounded-r-full' : ''
                }`}
                title={`${cat.name}: ₹${cat.amount.toLocaleString('en-IN')}`}
              />
            ))}
          </div>

          {/* Category Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-[#E8EEF5] bg-[#FFFFFF] hover:border-[#168BFF]/40 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${cat.color} text-white flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#101827]">{cat.name}</h4>
                      <span className="text-[11px] text-[#94A3B8]">{cat.percent}% of trip budget</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-serif font-bold text-sm text-[#101827] block">
                      ₹{cat.amount.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-[#64748B]">
                      ₹{(cat.amount / currentTrip.travelerCount).toLocaleString('en-IN')} / pax
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* What-if Budget Adjustment Slider & Tips */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* What-If Slider */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8EEF5] editorial-card-shadow space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#168BFF] block">
                Interactive Simulator
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#101827] mt-0.5">
                What-If Budget Target
              </h3>
            </div>

            <p className="text-xs text-[#64748B]">
              Slide to test how reducing or expanding budget impacts accommodations, train classes, or luxury haveli stays.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#64748B]">Target per person:</span>
                <span className="font-bold text-lg text-[#101827]">
                  ₹{targetBudgetPerPerson.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="15000"
                max="50000"
                step="1000"
                value={targetBudgetPerPerson}
                onChange={(e) => setTargetBudgetPerPerson(Number(e.target.value))}
                className="w-full accent-[#168BFF] cursor-pointer"
              />
            </div>

            <div className="p-4 bg-[#F4FAFF] rounded-2xl border border-[#E8EEF5] space-y-2 text-xs">
              <span className="font-bold text-[#101827] block">Algorithmic Recommendation:</span>
              {targetBudgetPerPerson < 24000 ? (
                <p className="text-[#92400E]">
                  ⚠️ To stay under ₹24,000/person, replace private AC SUV with 2nd AC train express and choose boutique homestays over heritage courtyards.
                </p>
              ) : targetBudgetPerPerson > 38000 ? (
                <p className="text-[#065F46]">
                  ✨ Budget allows upgrading to Taj Lake Palace private boat dining in Udaipur and private vintage car transfers.
                </p>
              ) : (
                <p className="text-[#065F46]">
                  ✓ Current budget of ₹{targetBudgetPerPerson.toLocaleString('en-IN')} is perfectly optimized for 4-star heritage havelis and private cab transit.
                </p>
              )}
            </div>
          </div>

          {/* Practical Indian Travel Cost Saving Tips */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8EEF5] editorial-card-shadow space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#168BFF]" />
              <h3 className="font-serif text-2xl font-bold text-[#101827]">
                Smart Savings Insights
              </h3>
            </div>

            <div className="space-y-3 pt-1 text-xs">
              <div className="p-3 bg-[#EBFBF2] rounded-xl border border-[#A7F3D0] space-y-1">
                <span className="font-bold text-[#047857] block">Composite Monument Passes</span>
                <p className="text-[#065F46]">
                  Buy the Rajasthan Tourism composite ticket in Jaipur to save ₹650/person across Amber, Hawa Mahal, Jantar Mantar, and Nahargarh.
                </p>
              </div>

              <div className="p-3 bg-[#F4FAFF] rounded-xl border border-[#E8EEF5] space-y-1">
                <span className="font-bold text-[#101827] block">Timing Lake Boat Rides</span>
                <p className="text-[#64748B]">
                  Take the government jetty from Municipal Ghat instead of hotel private charters to save ₹1,200 per ride with identical views.
                </p>
              </div>

              <div className="p-3 bg-[#F4FAFF] rounded-xl border border-[#E8EEF5] space-y-1">
                <span className="font-bold text-[#101827] block">Pre-booked Return Transfers</span>
                <p className="text-[#64748B]">
                  Pre-booking Jodhpur to Udaipur highway taxi via registered local operators saves surge pricing over on-demand station cabs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
