import React, { useState, useEffect } from 'react';
import { X, CheckCircle, ShieldCheck, MapPin, Calendar, Users, Mountain, Sparkles, Phone, Mail, User, FileText, Compass, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { bookingService, BookingPayload, BookingResponse } from '../../services/bookingService';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  destinationId: string;
  destinationName: string;
  basePrice?: number;
  initialDays?: number;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  destinationId,
  destinationName,
  basePrice = 28500,
  initialDays = 7
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form Fields
  const [leadName, setLeadName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [travelerCount, setTravelerCount] = useState(2);
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split('T')[0];
  });
  const [durationDays, setDurationDays] = useState(initialDays);
  const [roomType, setRoomType] = useState<'Standard' | 'Deluxe Mountain View' | 'Luxury Camp' | 'Homestay'>('Deluxe Mountain View');
  const [vehicleType, setVehicleType] = useState<'None' | '4x4 SUV (Scorpio/Fortuner)' | 'Himalayan 450' | 'Private Tempo Traveler'>('4x4 SUV (Scorpio/Fortuner)');
  const [guideIncluded, setGuideIncluded] = useState(true);
  const [permitAssistance, setPermitAssistance] = useState(true);
  const [oxygenSafetyKit, setOxygenSafetyKit] = useState(true);
  const [notes, setNotes] = useState('');

  // Live Price Calculation State from Backend
  const [livePrice, setLivePrice] = useState({
    subtotal: basePrice * 2,
    taxes: Math.round(basePrice * 2 * 0.05),
    grandTotal: Math.round(basePrice * 2 * 1.05),
    perPerson: Math.round(basePrice * 1.05)
  });

  // Calculate live estimate whenever options change
  useEffect(() => {
    let stayTier: string = 'comfort';
    if (roomType === 'Homestay') stayTier = 'homestay';
    if (roomType === 'Luxury Camp') stayTier = 'luxury';

    let transportMode = 'suv_4x4';
    if (vehicleType === 'Himalayan 450') transportMode = 'bike_himalayan';
    if (vehicleType === 'Private Tempo Traveler') transportMode = 'tempo_shared';
    if (vehicleType === 'None') transportMode = 'self_drive';

    const fetchEstimate = async () => {
      try {
        const res = await bookingService.calculateLiveEstimate({
          destination: destinationId,
          durationDays,
          travelers: travelerCount,
          stayTier,
          transportMode,
          includeSherpaGuide: guideIncluded,
          includePermits: permitAssistance,
          includeOxygenSafetyKit: oxygenSafetyKit
        });

        if (res.success && res.data) {
          setLivePrice({
            subtotal: res.data.breakdown.subtotal,
            taxes: res.data.breakdown.taxesAndGST,
            grandTotal: res.data.grandTotal,
            perPerson: res.data.costPerPerson
          });
        }
      } catch (e) {
        // Fallback local calc
        const base = (basePrice * travelerCount * durationDays) / 7;
        const addOns = (guideIncluded ? 2500 * durationDays : 0) + (permitAssistance ? 850 * travelerCount : 0);
        const sub = Math.round(base + addOns);
        const gst = Math.round(sub * 0.05);
        setLivePrice({
          subtotal: sub,
          taxes: gst,
          grandTotal: sub + gst,
          perPerson: Math.round((sub + gst) / travelerCount)
        });
      }
    };

    fetchEstimate();
  }, [destinationId, durationDays, travelerCount, roomType, vehicleType, guideIncluded, permitAssistance, oxygenSafetyKit, basePrice]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!leadName.trim() || !email.trim() || !phone.trim()) {
      setErrorMsg('Please enter lead traveler name, email, and phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const endD = new Date(startDate);
      endD.setDate(endD.getDate() + durationDays);

      const payload: BookingPayload = {
        destinationId,
        destinationName,
        leadName,
        email,
        phone,
        emergencyContact,
        travelerCount,
        startDate,
        endDate: endD.toISOString().split('T')[0],
        roomType,
        vehicleType,
        guideIncluded,
        permitAssistance,
        totalPrice: livePrice.grandTotal,
        notes
      };

      const res = await bookingService.createBooking(payload);
      if (res.success && res.data) {
        setConfirmedBooking(res.data);
        setStep('success');
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else {
        setErrorMsg(res.error || 'Failed to complete booking. Please try again.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during booking.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-slate-800 to-[#0084FF] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-cyan-300 border border-white/20">
              <Mountain className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300 bg-white/10 px-2 py-0.5 rounded-full">
                  Real-Time Booking
                </span>
                <span className="text-[11px] text-white/70">Verified Indian Pass Circuit</span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                {step === 'form' ? `Book Expedition — ${destinationName}` : 'Booking Confirmed!'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto grow space-y-6">
          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-rose-800 text-sm">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Traveler Details Section */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#0084FF]" />
                  1. Lead Traveler Information
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aarav Sharma"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0084FF]/20 focus:border-[#0084FF] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="aarav@example.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0084FF]/20 focus:border-[#0084FF] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0084FF]/20 focus:border-[#0084FF] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Emergency Contact (Family/Friend)</label>
                    <input
                      type="text"
                      placeholder="+91 98111 22334 (Brother)"
                      value={emergencyContact}
                      onChange={(e) => setEmergencyContact(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0084FF]/20 focus:border-[#0084FF] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Expedition Configurations */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#0084FF]" />
                  2. Travel Dates & Group Size
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0084FF]/20 focus:border-[#0084FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Duration</label>
                    <select
                      value={durationDays}
                      onChange={(e) => setDurationDays(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0084FF]/20 focus:border-[#0084FF]"
                    >
                      <option value={5}>5 Days (Quick Escape)</option>
                      <option value={7}>7 Days (Recommended Classic)</option>
                      <option value={10}>10 Days (Deep Expedition)</option>
                      <option value={14}>14 Days (Grand Circuit)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Travelers</label>
                    <input
                      type="number"
                      min={1}
                      max={16}
                      value={travelerCount}
                      onChange={(e) => setTravelerCount(Math.max(1, Number(e.target.value)))}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0084FF]/20 focus:border-[#0084FF]"
                    />
                  </div>
                </div>
              </div>

              {/* Mountain Addons & Stays */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#0084FF]" />
                  3. Stays, 4x4 Transport & High-Altitude Safety
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Stay Category</label>
                    <select
                      value={roomType}
                      onChange={(e) => setRoomType(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                    >
                      <option value="Deluxe Mountain View">Deluxe Mountain View (Heated)</option>
                      <option value="Luxury Camp">Luxury Camp by Lake/Valley</option>
                      <option value="Homestay">Authentic Ladakhi/Himachali Homestay</option>
                      <option value="Standard">Standard Alpine Lodge</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Mountain Transport</label>
                    <select
                      value={vehicleType}
                      onChange={(e) => setVehicleType(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                    >
                      <option value="4x4 SUV (Scorpio/Fortuner)">Dedicated 4x4 SUV (Scorpio/Fortuner)</option>
                      <option value="Himalayan 450">Royal Enfield Himalayan 450 (Per Person)</option>
                      <option value="Private Tempo Traveler">Private Tempo Traveler (Group)</option>
                      <option value="None">Self-Arranged / Local Taxis</option>
                    </select>
                  </div>
                </div>

                {/* Toggles */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={guideIncluded}
                      onChange={(e) => setGuideIncluded(e.target.checked)}
                      className="w-4 h-4 text-[#0084FF] rounded-sm focus:ring-[#0084FF]"
                    />
                    <div className="text-left">
                      <p className="text-xs font-bold text-slate-900">Certified Local Guide</p>
                      <p className="text-[10px] text-slate-500">Local Sherpa / mountain expert</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={permitAssistance}
                      onChange={(e) => setPermitAssistance(e.target.checked)}
                      className="w-4 h-4 text-[#0084FF] rounded-sm focus:ring-[#0084FF]"
                    />
                    <div className="text-left">
                      <p className="text-xs font-bold text-slate-900">Inner Line Permit (ILP)</p>
                      <p className="text-[10px] text-slate-500">Fast-track pass clearances</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={oxygenSafetyKit}
                      onChange={(e) => setOxygenSafetyKit(e.target.checked)}
                      className="w-4 h-4 text-[#0084FF] rounded-sm focus:ring-[#0084FF]"
                    />
                    <div className="text-left">
                      <p className="text-xs font-bold text-slate-900">Altitude Medical Kit</p>
                      <p className="text-[10px] text-slate-500">Portable O2 + Oximeter</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Live Price Summary Box */}
              <div className="p-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Expedition Subtotal ({travelerCount} Travelers · {durationDays} Days)</span>
                  <span>₹{livePrice.subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Taxes & Tourism GST (5%)</span>
                  <span>₹{livePrice.taxes.toLocaleString('en-IN')}</span>
                </div>
                <div className="h-px bg-white/10" />
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-cyan-300 font-bold block">Total Amount (INR)</span>
                    <span className="text-[11px] text-slate-400">₹{livePrice.perPerson.toLocaleString('en-IN')} per person</span>
                  </div>
                  <span className="text-2xl font-extrabold text-white">
                    ₹{livePrice.grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#0084FF] to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-base shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing with Yatri Backend...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5 text-cyan-200" />
                    <span>Confirm & Generate PNR Voucher</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Booking Success View / Real PNR Ticket */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  Confirmed on Yatri Cloud
                </span>
                <h4 className="text-2xl font-extrabold text-slate-900 mt-2">
                  Your Himalayan Journey is Booked!
                </h4>
                <p className="text-sm text-slate-500 mt-1">
                  A copy of your official travel voucher has been dispatched to <strong className="text-slate-800">{confirmedBooking?.email}</strong>.
                </p>
              </div>

              {/* Boarding Pass / Voucher Card */}
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-5 text-left space-y-4 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Yatri PNR Number</span>
                    <span className="text-xl font-mono font-extrabold text-[#0084FF] tracking-wider">
                      {confirmedBooking?.pnr}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Status</span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      ● {confirmedBooking?.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Lead Traveler</span>
                    <span className="font-bold text-slate-800">{confirmedBooking?.leadName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Headcount</span>
                    <span className="font-bold text-slate-800">{confirmedBooking?.travelerCount} Travelers</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Start Date</span>
                    <span className="font-bold text-slate-800">{confirmedBooking?.startDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Total Paid (INR)</span>
                    <span className="font-bold text-slate-900 font-mono">₹{confirmedBooking?.totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Includes Certified Sherpa Guide & 4x4 Mountain Vehicle</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-400">REF: {confirmedBooking?.paymentId}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-slate-500" />
                  Print Voucher
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
