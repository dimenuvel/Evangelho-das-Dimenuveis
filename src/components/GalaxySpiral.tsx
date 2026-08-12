import React from 'react';

interface GalaxySpiralProps {
  className?: string;
}

export const GalaxySpiral: React.FC<GalaxySpiralProps> = ({ className = 'w-16 h-16' }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Central Core Glow */}
        <radialGradient id="galaxyCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff7d6" stopOpacity="1" />
          <stop offset="25%" stopColor="#f3e3a2" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#c5a059" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#785012" stopOpacity="0" />
        </radialGradient>

        {/* Arm Gradient 1 */}
        <linearGradient id="armGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#f3e3a2" />
          <stop offset="80%" stopColor="#c5a059" />
          <stop offset="100%" stopColor="#8c581a" stopOpacity="0.2" />
        </linearGradient>

        {/* Arm Gradient 2 */}
        <linearGradient id="armGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffd97d" />
          <stop offset="50%" stopColor="#d4af37" />
          <stop offset="85%" stopColor="#996515" />
          <stop offset="100%" stopColor="#4a2e05" stopOpacity="0.1" />
        </linearGradient>

        {/* Glow Filter */}
        <filter id="cosmicGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Galaxy Core Background Aura */}
      <circle cx="50" cy="50" r="38" fill="url(#galaxyCore)" opacity="0.6" />
      <circle cx="50" cy="50" r="18" fill="url(#galaxyCore)" opacity="0.8" filter="url(#cosmicGlow)" />

      {/* Main Swirling Galaxy Spiral Arm 1 */}
      <path
        d="M 50 50 
           C 52 46, 56 45, 59 48 
           C 64 53, 63 61, 57 66 
           C 49 73, 37 71, 30 61 
           C 20 48, 23 32, 37 22 
           C 54 10, 75 14, 87 32 
           C 101 54, 95 80, 73 95"
        stroke="url(#armGrad1)"
        strokeWidth="2.8"
        strokeLinecap="round"
        opacity="0.9"
        filter="url(#cosmicGlow)"
      />

      {/* Secondary Swirling Galaxy Spiral Arm 2 (Symmetrical/180 deg offset) */}
      <path
        d="M 50 50 
           C 48 54, 44 55, 41 52 
           C 36 47, 37 39, 43 34 
           C 51 27, 63 29, 70 39 
           C 80 52, 77 68, 63 78 
           C 46 90, 25 86, 13 68 
           C -1 46, 5 20, 27 5"
        stroke="url(#armGrad2)"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.85"
        filter="url(#cosmicGlow)"
      />

      {/* Inner Fine Whisps / Dust Arms */}
      <path
        d="M 50 50 
           C 53 47, 58 48, 60 52 
           C 63 58, 59 65, 52 68 
           C 42 72, 31 66, 27 55 
           C 22 41, 30 26, 47 20 
           C 67 13, 86 24, 92 45"
        stroke="#fff7d6"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.75"
      />

      <path
        d="M 50 50 
           C 47 53, 42 52, 40 48 
           C 37 42, 41 35, 48 32 
           C 58 28, 69 34, 73 45 
           C 78 59, 70 74, 53 80 
           C 33 87, 14 76, 8 55"
        stroke="#f3e3a2"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.65"
      />

      {/* Bright Core Center Pinpoint */}
      <circle cx="50" cy="50" r="4" fill="#ffffff" filter="url(#cosmicGlow)" />
      <circle cx="50" cy="50" r="2" fill="#fffdf0" />

      {/* Starlight / Cosmic Dust Particles along the arms */}
      <circle cx="60" cy="42" r="1" fill="#ffffff" opacity="0.9" />
      <circle cx="68" cy="58" r="1.2" fill="#f3e3a2" opacity="0.8" />
      <circle cx="34" cy="62" r="0.9" fill="#ffffff" opacity="0.9" />
      <circle cx="28" cy="38" r="1.1" fill="#ffd97d" opacity="0.85" />
      <circle cx="42" cy="22" r="1" fill="#ffffff" opacity="0.95" />
      <circle cx="76" cy="28" r="1.3" fill="#f3e3a2" opacity="0.9" />
      <circle cx="82" cy="72" r="1" fill="#ffffff" opacity="0.8" />
      <circle cx="18" cy="74" r="1.2" fill="#f3e3a2" opacity="0.8" />
      <circle cx="22" cy="20" r="0.8" fill="#ffffff" opacity="0.9" />
      <circle cx="88" cy="40" r="1.1" fill="#ffeaa7" opacity="0.85" />
      <circle cx="52" cy="88" r="1" fill="#ffffff" opacity="0.75" />
    </svg>
  );
};
