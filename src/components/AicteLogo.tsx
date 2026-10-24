import React from 'react';

export const AicteLogo: React.FC<{ size?: number; className?: string }> = ({ size = 44, className = '' }) => {
  return (
    <div 
      className={`relative flex items-center justify-center shrink-0 rounded-full shadow-xs ${className}`}
      style={{ width: size, height: size }}
      aria-label="AICTE Official Seal"
    >
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Circular Rim */}
        <circle cx="50" cy="50" r="48" fill="#0D3B66" stroke="#D97706" strokeWidth="2.5" />
        
        {/* Inner Ring */}
        <circle cx="50" cy="50" r="43" fill="#002546" stroke="#FFFFFF" strokeWidth="0.8" strokeDasharray="2 1.5" />
        
        {/* Radiating Rays / Cogwheel teeth */}
        {[...Array(16)].map((_, i) => {
          const angle = (i * 360) / 16;
          return (
            <rect
              key={i}
              x="48.5"
              y="9"
              width="3"
              height="4"
              rx="1"
              fill="#F59E0B"
              transform={`rotate(${angle} 50 50)`}
            />
          );
        })}

        {/* Inner white circle */}
        <circle cx="50" cy="50" r="32" fill="#FFFFFF" />

        {/* Ashoka Wheel Spokes in background center */}
        {[...Array(24)].map((_, i) => {
          const angle = (i * 360) / 24;
          return (
            <line
              key={i}
              x1="50"
              y1="50"
              x2="50"
              y2="28"
              stroke="#0D3B66"
              strokeWidth="0.6"
              strokeOpacity="0.4"
              transform={`rotate(${angle} 50 50)`}
            />
          );
        })}

        {/* Gyan Deep / Traditional Lamp Flame */}
        <path
          d="M50 25 C45 34 42 41 42 48 C42 54 45.5 58 50 58 C54.5 58 58 54 58 48 C58 41 55 34 50 25 Z"
          fill="url(#saffronGrad)"
        />
        <path
          d="M50 31 C47 37 45 42 45 47 C45 51 47 54 50 54 C53 54 55 51 55 47 C55 42 53 37 50 31 Z"
          fill="#FEF08A"
        />

        {/* Base of Lamp / Book of Wisdom */}
        <path
          d="M32 58 C38 54 44 56 50 58 C56 56 62 54 68 58 L66 64 C60 60 55 62 50 63 C45 62 40 60 34 64 Z"
          fill="#0D3B66"
        />
        {/* Tricolor Ribbon underline */}
        <path d="M30 67 Q50 63 70 67" stroke="#FF9933" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M32 70 Q50 66 68 70" stroke="#138808" strokeWidth="1.5" strokeLinecap="round" />

        {/* Saffron Gradient */}
        <defs>
          <linearGradient id="saffronGrad" x1="50" y1="25" x2="50" y2="58" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E65100" />
            <stop offset="0.6" stopColor="#F59E0B" />
            <stop offset="1" stopColor="#D97706" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
