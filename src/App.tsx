import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { CelestialBackground } from './components/CelestialBackground';
import { Navigation } from './components/Navigation';
import { HomeScreen } from './components/HomeScreen';
import { ContinuarEspiral } from './components/ContinuarEspiral';
import { OraculoTarot } from './components/OraculoTarot';
import { EvangelhoBook } from './components/EvangelhoBook';
import { PracticeTimer } from './components/PracticeTimer';
import { TourModal } from './components/TourModal';
import { SplashScreen } from './components/SplashScreen';
import { ProfileModal } from './components/ProfileModal';

const MainContent: React.FC = () => {
  const { currentTab, isTimerOpen, activePractice, closePracticeTimer } = useApp();

  return (
    <CelestialBackground>
      <Navigation />

      {/* Launch Splash Screen */}
      <SplashScreen />

      <main className="flex-1 pb-6 md:pb-8">
        {currentTab === 'home' && <HomeScreen />}
        {(currentTab === 'espiral' || currentTab === 'pratica_hoje') && <ContinuarEspiral />}
        {currentTab === 'oraculo' && <OraculoTarot />}
        {currentTab === 'evangelho' && <EvangelhoBook />}
      </main>

      {/* Tour / Onboarding Modal */}
      <TourModal />

      {/* Profile Form Modal */}
      <ProfileModal />

      {/* Practice Timer Modal */}
      {isTimerOpen && activePractice && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md overflow-y-auto p-3 sm:p-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) closePracticeTimer();
          }}
        >
          <div className="min-h-full flex items-start justify-center pt-2 sm:pt-6 pb-24">
            <div className="max-w-xl w-full relative">
              <PracticeTimer
                practice={activePractice}
                onClose={closePracticeTimer}
              />
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[#c5a059]/15 bg-[#05070a] pt-10 pb-24 md:pb-12 px-4 text-center text-xs text-neutral-400 space-y-4">
        {/* Centered Main Quote */}
        <div className="max-w-md mx-auto text-center space-y-1">
          <p className="font-serif italic text-sm sm:text-base text-[#f3e3a2] tracking-wide">
            "Abida no padrão. Você é a forma."
          </p>
        </div>

        {/* Sub-footer details */}
        <div className="flex items-center justify-center gap-3 text-[11px] text-neutral-400 pt-1">
          <span>© Evangelho das Dimenúveis</span>
          <span className="text-[#c5a059]/40">•</span>
          <span className="text-neutral-500 font-mono text-[10px] bg-neutral-900/80 px-1.5 py-0.5 rounded border border-neutral-800/80">v1.0.3</span>
          <span className="text-[#c5a059]/40">•</span>
          <a
            href={`mailto:samuel.tiem@proton.me?subject=${encodeURIComponent('Evangelho das Dimenúveis')}`}
            className="text-[#c5a059] hover:text-[#f3e3a2] hover:underline not-italic font-sans text-xs font-medium transition-colors"
          >
            Contato
          </a>
        </div>
      </footer>
    </CelestialBackground>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
