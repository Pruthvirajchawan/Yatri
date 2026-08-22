import React from 'react';

interface TravelerAvatarProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
}

export const TravelerAvatar: React.FC<TravelerAvatarProps> = ({
  className = '',
  size = 'md',
  showBadge = false
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20 sm:w-24 sm:h-24',
    xl: 'w-28 h-28 sm:w-32 sm:h-32'
  };

  return (
    <div className={`relative shrink-0 ${className}`}>
      {/* Cool Modern Illustrated Explorer Avatar */}
      <div
        className={`${sizeMap[size]} rounded-full overflow-hidden border-4 border-white shadow-xl bg-gradient-to-tr from-[#0F172A] via-[#1E293B] to-[#334155] flex items-center justify-center`}
      >
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full transform transition-transform duration-300 hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Radial Glow */}
          <circle cx="60" cy="60" r="58" fill="url(#avatarBgGrad)" />
          <circle cx="60" cy="60" r="54" stroke="#38BDF8" strokeWidth="1.5" strokeOpacity="0.25" strokeDasharray="3 3" />

          {/* Mountains silhouette in background */}
          <path d="M15 88L40 55L65 88H15Z" fill="#1E293B" fillOpacity="0.85" />
          <path d="M48 88L76 46L105 88H48Z" fill="#0F172A" fillOpacity="0.95" />
          <path d="M76 46L86 60L70 60L76 46Z" fill="#E2E8F0" fillOpacity="0.6" />

          {/* Sun / Moon behind head */}
          <circle cx="88" cy="34" r="9" fill="#F59E0B" fillOpacity="0.85" />

          {/* Neck */}
          <path d="M52 75H68V90H52V75Z" fill="#D4A373" />
          <path d="M52 75H68V80H52V75Z" fill="#C58F5B" />

          {/* Torso / Jacket */}
          <path
            d="M32 110C32 94 44 86 60 86C76 86 88 94 88 110H32Z"
            fill="#0284C7"
          />
          {/* Jacket Collar & Zipper */}
          <path d="M54 86L60 98L66 86" stroke="#F8FAFC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M60 98V115" stroke="#F8FAFC" strokeWidth="2" strokeLinecap="round" />
          {/* Backpack straps */}
          <path d="M42 90L46 112" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M78 90L74 112" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />

          {/* Head & Face */}
          <rect x="45" y="44" width="30" height="34" rx="14" fill="#E2A76F" />

          {/* Cool Beard & Stubble */}
          <path
            d="M45 58C45 74 51 80 60 80C69 80 75 74 75 58C73 66 69 72 60 72C51 72 47 66 45 58Z"
            fill="#1E293B"
          />
          {/* Mustache */}
          <path
            d="M52 64C56 63 59 65 60 66C61 65 64 63 68 64C65 67 62 67 60 67C58 67 55 67 52 64Z"
            fill="#0F172A"
          />

          {/* Ears */}
          <circle cx="44" cy="56" r="4.5" fill="#D4A373" />
          <circle cx="76" cy="56" r="4.5" fill="#D4A373" />

          {/* Stylish Aviator / Explorer Sunglasses */}
          {/* Frame Bar */}
          <path d="M44 49H76" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          {/* Left Lens */}
          <rect x="46" y="48" width="12" height="11" rx="4" fill="#0F172A" stroke="#F59E0B" strokeWidth="1.5" />
          <path d="M48 50L55 57" stroke="#38BDF8" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.8" />
          {/* Bridge */}
          <path d="M58 52H62" stroke="#F59E0B" strokeWidth="1.8" />
          {/* Right Lens */}
          <rect x="62" y="48" width="12" height="11" rx="4" fill="#0F172A" stroke="#F59E0B" strokeWidth="1.5" />
          <path d="M64 50L71 57" stroke="#38BDF8" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.8" />

          {/* Cool Modern Hair / Traveler Beanie or Fade */}
          <path
            d="M44 48C44 36 50 32 60 32C70 32 76 36 76 48C73 40 68 38 60 38C52 38 47 40 44 48Z"
            fill="#0F172A"
          />
          {/* Side hair texture */}
          <path d="M44 46L44 54L48 49Z" fill="#0F172A" />
          <path d="M76 46L76 54L72 49Z" fill="#0F172A" />

          {/* Explorer Headband / Cap accent */}
          <path d="M43 43C48 39 72 39 77 43" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />

          {/* Gradients */}
          <defs>
            <radialGradient id="avatarBgGrad" cx="0.5" cy="0.3" r="0.8">
              <stop offset="0%" stopColor="#1E3A8A" />
              <stop offset="60%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {showBadge && (
        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold shadow-md">
          ✓
        </div>
      )}
    </div>
  );
};
