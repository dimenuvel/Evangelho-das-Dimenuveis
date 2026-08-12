import React from 'react';
import { useApp } from '../context/AppContext';
import { NavigationTab } from '../types';
import { Sparkles, Compass, Flame, BookOpen, Disc, HelpCircle, Image as ImageIcon, Sun, Moon } from 'lucide-react';
import { SpiralIcon } from './SpiralIcon';
import { motion } from 'motion/react';

export const Navigation: React.FC = () => {
  const { currentTab, navigateTo, activeGiroId, openTour, isTourOpen, isSplashOpen, theme, toggleTheme } = useApp();

  if (isTourOpen || isSplashOpen) return null;

  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Início', icon: <Disc className="w-5 h-5" /> },
    { id: 'espiral', label: 'A Espiral', icon: <Compass className="w-5 h-5" />, badge: `Giro ${activeGiroId}` },
    { id: 'oraculo', label: 'Oráculo', icon: <Sparkles className="w-5 h-5 text-purple-300" /> },
    { id: 'evangelho', label: 'Evangelho', icon: <BookOpen className="w-5 h-5 text-blue-300" /> },
  ];

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-[60] bg-[#07090e]/85 backdrop-blur-md border-b border-[#c5a059]/20 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo / App Name */}
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2.5 sm:gap-3 text-left group focus:outline-none shrink-0"
            id="nav-logo-button"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-[#c5a059]/30 to-amber-900/40 border border-[#c5a059]/50 flex items-center justify-center shadow-lg shadow-[#c5a059]/10 group-hover:scale-105 transition-transform shrink-0">
              <SpiralIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#f3e3a2]" />
            </div>
            <span className="font-serif text-sm sm:text-base md:text-lg tracking-wider sm:tracking-widest text-[#f3e3a2] font-semibold whitespace-nowrap">
              Evangelho das Dimenúveis
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1" id="desktop-nav">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => navigateTo(item.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs tracking-wider uppercase transition-all duration-200 flex items-center gap-2 font-medium ${
                    isActive
                      ? 'bg-[#c5a059]/20 text-[#f3e3a2] border border-[#c5a059]/40 shadow-sm'
                      : 'text-neutral-400 hover:text-[#f3e3a2] hover:bg-neutral-800/40'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-[#c5a059]/20 text-[#f3e3a2] border border-[#c5a059]/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Subtle status tag, Theme Toggle and Info / Splash Buttons on the very right */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={toggleTheme}
              id="theme-toggle-button"
              className={`p-2 rounded-lg border transition-all flex items-center justify-center gap-1.5 ${
                theme === 'day'
                  ? 'bg-amber-100/80 hover:bg-amber-200/90 text-amber-900 border-amber-300 shadow-sm'
                  : 'bg-[#121826] hover:bg-neutral-800 text-[#f3e3a2] border-[#c5a059]/30'
              }`}
              title={theme === 'day' ? 'Alternar para Modo Noite' : 'Alternar para Modo Dia (Sol)'}
              aria-label={theme === 'day' ? 'Ativar Modo Noite' : 'Ativar Modo Dia'}
            >
              {theme === 'day' ? (
                <>
                  <Sun className="w-5 h-5 text-amber-600 animate-spin-slow" />
                  <span className="hidden sm:inline text-xs font-serif font-bold text-amber-900">Dia</span>
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5 text-indigo-300" />
                  <span className="hidden sm:inline text-xs font-serif font-bold text-[#f3e3a2]">Noite</span>
                </>
              )}
            </button>

            <button
              onClick={openTour}
              id="open-tour-button"
              className="p-2 rounded-lg text-neutral-400 hover:text-[#f3e3a2] hover:bg-[#c5a059]/15 border border-transparent hover:border-[#c5a059]/30 transition-all flex items-center justify-center"
              title="Guia da Espiral & Práticas"
              aria-label="Abrir Guia da Espiral"
            >
              <HelpCircle className="w-5 h-5 text-[#c5a059]" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Bar Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[60] bg-[#07090e]/95 backdrop-blur-lg border-t border-[#c5a059]/20 px-2 py-1.5 flex justify-around items-center" id="mobile-nav">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              id={`mobile-nav-${item.id}`}
              onClick={() => navigateTo(item.id)}
              className={`relative flex flex-col items-center justify-center py-1.5 px-2 rounded-lg transition-colors min-w-[64px] ${
                isActive ? 'text-[#f3e3a2]' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <div className="relative p-1 rounded-md">
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-active-bg"
                    className="absolute inset-0 bg-[#c5a059]/25 rounded-md"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <motion.div
                  className="relative z-10"
                  animate={isActive ? { scale: [1, 1.25, 1], y: [0, -4, 0] } : { scale: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {item.icon}
                </motion.div>
              </div>
              <span className="text-[10px] tracking-tight mt-0.5 whitespace-nowrap font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
