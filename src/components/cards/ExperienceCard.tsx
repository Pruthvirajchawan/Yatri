import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ExperienceType } from '../../types';

interface ExperienceCardProps {
  experience: ExperienceType;
  onSelect?: (exp: ExperienceType) => void;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, onSelect }) => {
  return (
    <div
      onClick={() => onSelect && onSelect(experience)}
      className="group relative flex-shrink-0 w-[260px] sm:w-[300px] h-[340px] rounded-2xl overflow-hidden border border-[#E8EEF5] hover:border-[#168BFF]/40 transition-all duration-300 hover:-translate-y-1.5 editorial-card-shadow cursor-pointer flex flex-col justify-end p-5 bg-[#101827]"
    >
      {/* Background Image */}
      <img
        src={experience.image}
        alt={experience.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-85"
      />

      {/* Atmospheric Gradient Layer */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#101827] via-[#101827]/40 to-transparent" />

      {/* Content overlay */}
      <div className="relative z-10 text-white space-y-1.5">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-300">
          Curated Circuit
        </span>
        <h3 className="font-serif text-2xl font-bold leading-tight group-hover:text-blue-200 transition-colors">
          {experience.title}
        </h3>
        <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
          {experience.tagline}
        </p>

        <div className="pt-3 mt-2 border-t border-white/20 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-white/60 block uppercase tracking-wider">
              Start from
            </span>
            <span className="text-sm font-bold text-white">
              ₹{experience.startingPrice.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#168BFF] transition-all">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
