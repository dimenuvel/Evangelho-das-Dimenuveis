import React from 'react';

interface SpiralIconProps {
  className?: string;
}

export const SpiralIcon: React.FC<SpiralIconProps> = ({ className = 'w-6 h-6' }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 12a1.5 1.5 0 0 1 1.5 1.5 3 3 0 0 1-3 3 4.5 4.5 0 0 1-4.5-4.5 6 6 0 0 1 6-6 7.5 7.5 0 0 1 7.5 7.5 9 9 0 0 1-9 9" />
    </svg>
  );
};
