import React from 'react';
import { AlertCircle, CheckCircle, TrendingUp, Sparkles } from 'lucide-react';
import { TripDebt } from '../../types';

interface TripDebtCardProps {
  debt: TripDebt;
}

export const TripDebtCard: React.FC<TripDebtCardProps> = ({ debt }) => {
  const isHealthy = debt.score <= 30;
  const isCaution = debt.score > 30 && debt.score <= 60;

  const statusBg = isHealthy ? 'bg-[#EBFBF2] text-[#35A86B]' : isCaution ? 'bg-[#FFF8ED] text-[#E7A93B]' : 'bg-[#FDEDEC] text-[#D9534F]';

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E8EEF5] editorial-card-shadow space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[11px] font-semibold text-[#168BFF] uppercase tracking-wider block">
            Fatigue & Friction Analysis
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#101827] mt-0.5">
            Trip Debt Index
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBg}`}>
            {debt.status}
          </span>
          <span className="text-xl font-serif font-bold text-[#101827]">
            {debt.score} / 100
          </span>
        </div>
      </div>

      <p className="text-xs text-[#64748B] leading-relaxed">
        {debt.message}
      </p>

      {/* Debt Contributors */}
      {debt.contributors.length > 0 && (
        <div className="space-y-2 pt-1">
          <span className="text-[11px] font-semibold text-[#101827] uppercase tracking-wider block">
            Key Friction Contributors:
          </span>
          <div className="space-y-1.5">
            {debt.contributors.map((c, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-xs text-[#64748B] bg-[#F4FAFF] p-2 rounded-lg border border-[#E8EEF5]"
              >
                <AlertCircle className="w-3.5 h-3.5 text-[#E7A93B] shrink-0 mt-0.5" />
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recovery Suggestion */}
      {debt.recoverySuggestion && (
        <div className="p-3 bg-[#EBFBF2] rounded-xl border border-[#A7F3D0] flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-[#35A86B] shrink-0 mt-0.5" />
          <div className="text-xs text-[#065F46] leading-relaxed">
            <span className="font-semibold block text-[#047857]">Recovery Recommendation:</span>
            {debt.recoverySuggestion}
          </div>
        </div>
      )}
    </div>
  );
};
