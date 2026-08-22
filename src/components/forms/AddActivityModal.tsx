import React, { useState } from 'react';
import { X, Clock, MapPin, IndianRupee, Tag, Sparkles } from 'lucide-react';
import { Activity } from '../../types';

interface AddActivityModalProps {
  dayNumber: number;
  city: string;
  onClose: () => void;
  onAdd: (dayNumber: number, activity: Omit<Activity, 'id'>) => void;
}

export const AddActivityModal: React.FC<AddActivityModalProps> = ({
  dayNumber,
  city,
  onClose,
  onAdd
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'sightseeing' | 'food' | 'culture' | 'transit' | 'relaxation' | 'adventure'>('sightseeing');
  const [time, setTime] = useState('15:00 - 16:30');
  const [durationHours, setDurationHours] = useState(1.5);
  const [cost, setCost] = useState(800);
  const [location, setLocation] = useState(city);
  const [priority, setPriority] = useState<'must-do' | 'recommended' | 'optional'>('recommended');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd(dayNumber, {
      title,
      category,
      time,
      durationHours: Number(durationHours),
      cost: Number(cost),
      location: location.trim() || city,
      priority,
      description: description.trim() || `Experience in ${city}`
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#101827]/40 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white rounded-2xl p-6 border border-[#E8EEF5] shadow-2xl animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#E8EEF5]">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#168BFF]">
              Day {dayNumber} · {city}
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#101827]">
              Add New Experience
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#F4FAFF] flex items-center justify-center text-[#94A3B8] hover:text-[#101827] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Title */}
          <div>
            <label className="text-xs font-semibold text-[#101827] block mb-1">
              Activity Title *
            </label>
            <input
              type="text"
              required
              autoFocus
              placeholder="e.g. Nahargarh Fort Sunset Chai Walk"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#F4FAFF] rounded-xl border border-[#E8EEF5] text-sm text-[#101827] focus:outline-none focus:border-[#168BFF]"
            />
          </div>

          {/* Category & Priority */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-[#101827] block mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-[#F4FAFF] rounded-xl border border-[#E8EEF5] text-xs font-medium text-[#101827] focus:outline-none focus:border-[#168BFF]"
              >
                <option value="sightseeing">Sightseeing</option>
                <option value="culture">Culture & Heritage</option>
                <option value="food">Culinary / Dining</option>
                <option value="relaxation">Relaxation & Spa</option>
                <option value="adventure">Adventure</option>
                <option value="transit">Transit / Drive</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#101827] block mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-[#F4FAFF] rounded-xl border border-[#E8EEF5] text-xs font-medium text-[#101827] focus:outline-none focus:border-[#168BFF]"
              >
                <option value="must-do">Must Do (Core)</option>
                <option value="recommended">Recommended</option>
                <option value="optional">Optional / Buffer</option>
              </select>
            </div>
          </div>

          {/* Time, Duration & Cost */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-[#101827] block mb-1">
                Time Window
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="15:00 - 16:30"
                className="w-full px-3 py-2.5 bg-[#F4FAFF] rounded-xl border border-[#E8EEF5] text-xs text-[#101827] focus:outline-none focus:border-[#168BFF]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#101827] block mb-1">
                Duration (Hours)
              </label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                max="12"
                value={durationHours}
                onChange={(e) => setDurationHours(parseFloat(e.target.value))}
                className="w-full px-3 py-2.5 bg-[#F4FAFF] rounded-xl border border-[#E8EEF5] text-xs text-[#101827] focus:outline-none focus:border-[#168BFF]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#101827] block mb-1">
                Est. Cost (₹)
              </label>
              <input
                type="number"
                min="0"
                step="100"
                value={cost}
                onChange={(e) => setCost(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2.5 bg-[#F4FAFF] rounded-xl border border-[#E8EEF5] text-xs text-[#101827] focus:outline-none focus:border-[#168BFF]"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="text-xs font-semibold text-[#101827] block mb-1">
              Location / Venue
            </label>
            <input
              type="text"
              placeholder="e.g. Nahargarh Hill Road, Jaipur"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#F4FAFF] rounded-xl border border-[#E8EEF5] text-xs text-[#101827] focus:outline-none focus:border-[#168BFF]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-semibold text-[#101827] block mb-1">
              Notes & Highlights
            </label>
            <textarea
              rows={2}
              placeholder="Why this fits the itinerary and best viewpoint spots..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 bg-[#F4FAFF] rounded-xl border border-[#E8EEF5] text-xs text-[#101827] focus:outline-none focus:border-[#168BFF]"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-[#E8EEF5]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#64748B] hover:text-[#101827] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#101827] hover:bg-[#168BFF] text-white text-xs font-semibold rounded-full shadow-xs transition-colors cursor-pointer"
            >
              Add to Day {dayNumber}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
