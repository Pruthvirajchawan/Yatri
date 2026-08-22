import React from 'react';

interface YatriLogoProps {
  className?: string;
  starClassName?: string;
  textClassName?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const YatriLogo: React.FC<YatriLogoProps> = ({
  className = '',
  starClassName = '',
  textClassName = '',
  size = 'md'
}) => {
  const starSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5 sm:w-6 sm:h-6',
    lg: 'w-7 h-7 sm:w-8 sm:h-8'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl'
  };

  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      {/* 4-Pointed Star Icon in vibrant blue matching the logo */}
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`text-[#0084FF] shrink-0 transform transition-transform group-hover:scale-110 duration-200 ${starSizes[size]} ${starClassName}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 0C12 6.62742 6.62742 12 0 12C6.62742 12 12 17.3726 12 24C12 17.3726 17.3726 12 24 12C17.3726 12 12 6.62742 12 0Z" />
      </svg>

      {/* Serif typography matching uploaded image */}
      <span
        className={`font-serif font-bold tracking-tight text-[#0F172A] leading-none ${textSizes[size]} ${textClassName}`}
      >
        Yatri
      </span>
    </div>
  );
};
