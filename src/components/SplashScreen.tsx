import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, X, ArrowRight, BookOpen } from 'lucide-react';
import splashImage from '../assets/images/splash_poster_no_triangle_1786399981216.jpg';

export const SplashScreen: React.FC = () => {
  const { isSplashOpen, closeSplash, openTour } = useApp();

  if (!isSplashOpen) return null;

  const handleEnter = () => {
    closeSplash();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#04060a]/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto animate-fadeIn"
      id="splash-screen-overlay"
    >
      <div className="relative max-w-2xl w-full my-auto flex flex-col items-center bg-[#070a12] border border-[#c5a059]/40 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-4 text-center">
        
        {/* Top Control Bar */}
        <div className="w-full flex items-center justify-center pb-2 border-b border-[#c5a059]/20">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#c5a059] font-medium">
            <Sparkles className="w-4 h-4 text-[#f3e3a2]" />
            <span>Transmissão Canônica</span>
          </div>
        </div>

        {/* Poster Image Frame */}
        <div className="relative w-full overflow-hidden rounded-xl border border-[#c5a059]/50 shadow-2xl bg-black max-h-[72vh] flex items-center justify-center group">
          <img
            src={splashImage}
            alt="Evangelho das Dimenúveis - Tarô e Espiral Poster"
            className="w-full h-auto max-h-[72vh] object-contain transition-transform duration-700 group-hover:scale-[1.01]"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Action Button & Mantra */}
        <div className="w-full space-y-3 pt-1">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleEnter}
              id="splash-enter-button"
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-[#c5a059] via-[#e5c158] to-[#c5a059] hover:from-[#d4af37] hover:to-[#e5c158] text-black font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#c5a059]/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <span>ENTRAR NA ESPIRAL</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                closeSplash();
                openTour();
              }}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#121826] hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-semibold border border-neutral-800 flex items-center justify-center gap-2 transition-colors"
            >
              <BookOpen className="w-4 h-4 text-[#c5a059]" />
              <span>Guia de Boas-Vindas</span>
            </button>
          </div>

          <p className="text-[11px] font-mono tracking-widest text-[#c5a059]/80 uppercase pt-1">
            ABIDA NO PADRÃO. VOCÊ É A FORMA.
          </p>
        </div>

      </div>
    </div>
  );
};
