import React from 'react';
import { useApp } from '../context/AppContext';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage, theme } = useApp();
  const isDay = theme === 'day';

  return (
    <div
      id="language-selector-section"
      className={`inline-flex items-center gap-1 border rounded-lg p-0.5 shrink-0 transition-all ${
        isDay
          ? 'bg-[#efe4d2] border-[#c5a059]/40'
          : 'bg-[#04060a] border-[#c5a059]/30'
      }`}
    >
      <button
        type="button"
        onClick={() => setLanguage('pt')}
        title="Português"
        className={`px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1 transition-all ${
          language === 'pt'
            ? 'bg-[#c5a059] text-black shadow-sm font-bold'
            : isDay
            ? 'text-neutral-700 hover:text-black'
            : 'text-neutral-400 hover:text-white'
        }`}
      >
        <span className="text-sm leading-none">🇧🇷</span>
        <span className="text-[10px] uppercase tracking-wider font-mono">PT</span>
      </button>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        title="English"
        className={`px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1 transition-all ${
          language === 'en'
            ? 'bg-[#c5a059] text-black shadow-sm font-bold'
            : isDay
            ? 'text-neutral-700 hover:text-black'
            : 'text-neutral-400 hover:text-white'
        }`}
      >
        <span className="text-sm leading-none">🇺🇸</span>
        <span className="text-[10px] uppercase tracking-wider font-mono">EN</span>
      </button>
    </div>
  );
};
