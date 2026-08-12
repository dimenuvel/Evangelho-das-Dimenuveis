import React from 'react';
import { useApp } from '../context/AppContext';

export const CelestialBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useApp();
  const isDay = theme === 'day';

  return (
    <div
      className={`relative min-h-screen transition-colors duration-500 font-sans overflow-x-hidden ${
        isDay
          ? 'bg-[#f8f5ee] text-stone-800 selection:bg-amber-200 selection:text-amber-950'
          : 'bg-[#07090e] text-[#e0ded7] selection:bg-[#c5a059]/30 selection:text-[#f3e3a2]'
      }`}
    >
      {/* Background celestial particles & glowing spiral gradients */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {isDay ? (
          <>
            {/* Daytime Solar & Sky Aura Gradients */}
            <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] bg-amber-400/25 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s' }}></div>
            <div className="absolute top-1/4 -right-40 w-[28rem] h-[28rem] bg-yellow-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '14s' }}></div>
            <div className="absolute -bottom-40 left-1/3 w-[32rem] h-[32rem] bg-orange-300/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '16s' }}></div>

            {/* Solar Rays Overlay */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="grad-day" cx="50%" cy="15%" r="75%">
                  <stop offset="0%" stopColor="#d97706" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#f8f5ee" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="50%" cy="15%" r="60%" fill="url(#grad-day)" />
            </svg>

            {/* Solar sparkle points */}
            <div className="absolute top-[12%] left-[18%] w-1.5 h-1.5 bg-amber-500 rounded-full opacity-60 animate-ping" style={{ animationDuration: '5s' }}></div>
            <div className="absolute top-[28%] left-[78%] w-1 h-1 bg-amber-600 rounded-full opacity-50"></div>
            <div className="absolute top-[55%] left-[12%] w-2 h-2 bg-yellow-500 rounded-full opacity-40"></div>
            <div className="absolute top-[72%] left-[82%] w-1.5 h-1.5 bg-amber-400 rounded-full opacity-50 animate-pulse"></div>
          </>
        ) : (
          <>
            {/* Soft Night Nebula gradients */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s' }}></div>
            <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-900/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '15s' }}></div>
            <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-indigo-900/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '18s' }}></div>
            
            {/* Celestial spiral overlay */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="grad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#c5a059" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#07090e" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="50%" cy="50%" r="40%" fill="url(#grad)" />
            </svg>

            {/* Constellation points */}
            <div className="absolute top-[10%] left-[15%] w-1 h-1 bg-[#f3e3a2] rounded-full opacity-60 animate-ping" style={{ animationDuration: '4s' }}></div>
            <div className="absolute top-[25%] left-[80%] w-1 h-1 bg-[#c5a059] rounded-full opacity-40"></div>
            <div className="absolute top-[60%] left-[10%] w-1.5 h-1.5 bg-[#f3e3a2] rounded-full opacity-50"></div>
            <div className="absolute top-[75%] left-[85%] w-1 h-1 bg-[#f3e3a2] rounded-full opacity-30 animate-pulse"></div>
            <div className="absolute top-[40%] left-[90%] w-1 h-1 bg-amber-200 rounded-full opacity-50"></div>
            <div className="absolute top-[85%] left-[20%] w-1 h-1 bg-yellow-100 rounded-full opacity-40"></div>
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
};
