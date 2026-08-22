import React, { useState } from 'react';
import { Clock, MapPin, IndianRupee, MoreVertical, Trash2, ArrowUp, ArrowDown, CheckCircle2, Circle, Camera, Utensils, Landmark, Car, Coffee, Compass } from 'lucide-react';
import { Activity } from '../../types';

interface ActivityCardProps {
  activity: Activity;
  index: number;
  totalActivities: number;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onDelete?: () => void;
  onToggleComplete?: () => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  index,
  totalActivities,
  onMoveUp,
  onMoveDown,
  onDelete,
  onToggleComplete
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const categoryIcons = {
    sightseeing: Camera,
    food: Utensils,
    culture: Landmark,
    transit: Car,
    relaxation: Coffee,
    adventure: Compass
  };

  const priorityStyles = {
    'must-do': 'bg-[#FFF8ED] text-[#E7A93B] border-[#FDE68A]',
    recommended: 'bg-[#DFF1FF] text-[#168BFF] border-[#BAE6FD]',
    optional: 'bg-[#F4FAFF] text-[#64748B] border-[#E8EEF5]'
  };

  const IconComponent = categoryIcons[activity.category] || Landmark;

  return (
    <div
      className={`group relative bg-white rounded-2xl p-4 sm:p-5 border transition-all duration-200 ${
        activity.completed
          ? 'border-[#E8EEF5] bg-slate-50/60 opacity-75'
          : 'border-[#E8EEF5] hover:border-[#168BFF]/40 hover:shadow-md'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Left icon & Details */}
        <div className="flex items-start gap-3.5 flex-1">
          {/* Category Icon Badge */}
          <button
            onClick={onToggleComplete}
            aria-label="Toggle completed"
            className="w-10 h-10 rounded-xl bg-[#F4FAFF] border border-[#E8EEF5] flex items-center justify-center text-[#168BFF] group-hover:bg-[#168BFF] group-hover:text-white transition-colors cursor-pointer shrink-0 mt-0.5"
          >
            {activity.completed ? (
              <CheckCircle2 className="w-5 h-5 text-[#35A86B]" />
            ) : (
              <IconComponent className="w-5 h-5" />
            )}
          </button>

          <div className="space-y-1.5 flex-1 min-w-0">
            {/* Time and Priority */}
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="inline-flex items-center gap-1 font-semibold text-[#101827]">
                <Clock className="w-3.5 h-3.5 text-[#168BFF]" />
                {activity.time} ({activity.durationHours}h)
              </span>

              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border uppercase tracking-wider ${
                  priorityStyles[activity.priority]
                }`}
              >
                {activity.priority.replace('-', ' ')}
              </span>
            </div>

            {/* Title */}
            <h4
              className={`font-serif text-lg sm:text-xl font-bold leading-snug ${
                activity.completed ? 'line-through text-[#94A3B8]' : 'text-[#101827]'
              }`}
            >
              {activity.title}
            </h4>

            {/* Description */}
            <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2">
              {activity.description}
            </p>

            {/* Location & Cost Info */}
            <div className="pt-2 flex items-center gap-4 text-xs text-[#64748B] flex-wrap">
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#94A3B8]" />
                <span className="truncate max-w-[200px]">{activity.location}</span>
              </span>
              <span className="inline-flex items-center gap-1 font-semibold text-[#101827]">
                <IndianRupee className="w-3.5 h-3.5 text-[#35A86B]" />
                {activity.cost === 0 ? 'Free Entry' : `₹${activity.cost.toLocaleString('en-IN')}`}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Reorder and Delete Actions */}
        <div className="flex items-center gap-1 shrink-0">
          {onMoveUp && index > 0 && (
            <button
              onClick={onMoveUp}
              title="Move Up"
              className="w-7 h-7 rounded-lg bg-[#F4FAFF] hover:bg-[#E8EEF5] text-[#64748B] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          )}

          {onMoveDown && index < totalActivities - 1 && (
            <button
              onClick={onMoveDown}
              title="Move Down"
              className="w-7 h-7 rounded-lg bg-[#F4FAFF] hover:bg-[#E8EEF5] text-[#64748B] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          )}

          {onDelete && (
            <button
              onClick={onDelete}
              title="Remove Activity"
              className="w-7 h-7 rounded-lg hover:bg-red-50 text-[#94A3B8] hover:text-[#D9534F] flex items-center justify-center transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
