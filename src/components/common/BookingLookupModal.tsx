import React, { useState } from 'react';
import { X, Search, CheckCircle, Clock, AlertTriangle, ShieldCheck, MapPin, Calendar, Users, Phone, FileText } from 'lucide-react';
import { bookingService, BookingResponse } from '../../services/bookingService';

interface BookingLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingLookupModal: React.FC<BookingLookupModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [booking, setBooking] = useState<BookingResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setErrorMsg(null);
    setBooking(null);

    try {
      const res = await bookingService.getBookingByPnr(query.trim());
      if (res) {
        setBooking(res);
      } else {
        setErrorMsg(`No booking found matching "${query.trim()}". Try "YTR-LDK-8941" or "YTR-KSM-5219".`);
      }
    } catch (e: any) {
      setErrorMsg('Failed to connect to backend booking database.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full flex flex-col shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-cyan-300">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 block">
                Yatri Cloud Verification
              </span>
              <h3 className="text-lg font-bold text-white">PNR & Booking Status</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <form onSubmit={handleSearch} className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Enter PNR Number or Booking ID
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. YTR-LDK-8941"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="grow px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:outline-hidden focus:ring-2 focus:ring-[#0084FF]/20 focus:border-[#0084FF] uppercase"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-3 rounded-xl bg-[#0084FF] hover:bg-blue-600 text-white font-bold text-sm transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
                <span>Verify</span>
              </button>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span>Try test records:</span>
              <button
                type="button"
                onClick={() => setQuery('YTR-LDK-8941')}
                className="font-mono text-[#0084FF] hover:underline cursor-pointer"
              >
                YTR-LDK-8941
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setQuery('YTR-KSM-5219')}
                className="font-mono text-[#0084FF] hover:underline cursor-pointer"
              >
                YTR-KSM-5219
              </button>
            </div>
          </form>

          {errorMsg && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-800 text-xs flex items-center gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {booking && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3.5 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Expedition Destination</span>
                  <h4 className="text-base font-bold text-slate-900">{booking.destinationName}</h4>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                  <CheckCircle className="w-3.5 h-3.5" />
                  {booking.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Lead Traveler</span>
                  <span className="font-bold text-slate-800">{booking.leadName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Headcount & Dates</span>
                  <span className="font-bold text-slate-800">{booking.travelerCount} Guests • {booking.startDate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Room & Vehicle</span>
                  <span className="font-medium text-slate-700">{booking.roomType} • {booking.vehicleType}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Paid Amount</span>
                  <span className="font-bold text-slate-900 font-mono">₹{booking.totalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {booking.notes && (
                <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-[11px] text-slate-600">
                  <strong>Notes:</strong> {booking.notes}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
