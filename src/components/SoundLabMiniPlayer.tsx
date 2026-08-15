import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { DIMENUVEIS_SOUNDS } from '../data/soundLabData';
import { soundLabAudioService, SoundLabState } from '../services/soundLabAudio';
import { Play, Pause, Square, Waves, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const SoundLabMiniPlayer: React.FC = () => {
  const { currentTab, navigateTo, theme } = useApp();
  const isDay = theme === 'day';
  const [audioState, setAudioState] = useState<SoundLabState>(
    soundLabAudioService.getSnapshot()
  );

  useEffect(() => {
    const unsubscribe = soundLabAudioService.subscribe((newState) => {
      setAudioState(newState);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Show mini-player ONLY if audio is playing AND user is NOT on the 'som' tab
  if (!audioState.isPlaying || currentTab === 'som') {
    return null;
  }

  const activeDimenuvel =
    DIMENUVEIS_SOUNDS.find((d) => d.id === audioState.activeDimenuvelId) ||
    DIMENUVEIS_SOUNDS[0];

  const formatRemainingTime = (totalSecs: number | null): string => {
    if (totalSecs === null) return 'Contínuo';
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className={`fixed bottom-16 md:bottom-4 left-4 right-4 max-w-md mx-auto z-50 backdrop-blur-md border rounded-2xl p-3 shadow-2xl flex items-center justify-between gap-3 ${
          isDay
            ? 'bg-[#fdfbf7]/95 border-[#d1b88a] text-[#2c1e0e]'
            : 'bg-[#120e08]/95 border-[#c5a059]/50 text-[#f3e3a2]'
        }`}
      >
        {/* Duration Progress Bar Line (when interval duration is set) */}
        {audioState.durationMinutes !== null && (
          <div className="absolute top-0 left-3 right-3 h-0.5 overflow-hidden rounded-t-full bg-neutral-800/50">
            {(() => {
              const totalSecs = audioState.durationMinutes * 60;
              const currentSecs = audioState.remainingSeconds ?? totalSecs;
              const elapsedSecs = Math.max(0, totalSecs - currentSecs);
              const progressPercent = Math.min(100, Math.max(0, (elapsedSecs / totalSecs) * 100));

              return (
                <div
                  className={`h-full transition-all duration-1000 ease-linear ${
                    isDay ? 'bg-[#8a5a19]' : 'bg-[#c5a059]'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              );
            })()}
          </div>
        )}

        {/* Left Info Section */}
        <button
          onClick={() => navigateTo('som')}
          className="flex items-center gap-3 text-left hover:opacity-80 transition-opacity min-w-0"
          id="sound-mini-player-navigate-btn"
        >
          <div className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 ${
            isDay
              ? 'bg-[#f0e2cd] border-[#d1b88a] text-[#8a5a19]'
              : 'bg-[#c5a059]/20 border-[#c5a059]/40 text-[#f3e3a2]'
          }`}>
            <Waves className="w-4 h-4 animate-pulse" />
          </div>
          <div className="truncate space-y-0.5">
            <div className={`flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-wider ${
              isDay ? 'text-[#8a5a19]' : 'text-[#c5a059]'
            }`}>
              <span>Lab de Som</span>
              <span>•</span>
              <span className={`font-bold ${isDay ? 'text-emerald-700' : 'text-emerald-400'}`}>
                {formatRemainingTime(audioState.remainingSeconds)}
              </span>
            </div>
            <div className={`text-xs font-serif font-bold truncate ${
              isDay ? 'text-[#3d260a]' : 'text-[#f3e3a2]'
            }`}>
              {activeDimenuvel.numberStr} — {activeDimenuvel.name} ({activeDimenuvel.frequency} Hz)
            </div>
          </div>
        </button>

        {/* Right Action Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => soundLabAudioService.pause()}
            className={`p-2 rounded-full border transition-colors ${
              isDay
                ? 'bg-[#f0d8a8] hover:bg-[#e2c48e] text-[#3d260a] border-[#c59a48]'
                : 'bg-[#c5a059]/20 hover:bg-[#c5a059]/30 text-[#f3e3a2] border-[#c5a059]/40'
            }`}
            title="Pausar Som"
            id="sound-mini-player-pause-btn"
          >
            <Pause className="w-4 h-4 fill-current" />
          </button>

          <button
            onClick={() => soundLabAudioService.stop()}
            className={`p-2 rounded-full border transition-colors ${
              isDay
                ? 'bg-stone-200 hover:bg-stone-300 text-stone-800 border-stone-300'
                : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 border-neutral-700/60'
            }`}
            title="Parar Som"
            id="sound-mini-player-stop-btn"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
          </button>

          <button
            onClick={() => navigateTo('som')}
            className={`p-1.5 transition-colors ${
              isDay ? 'text-[#8a5a19] hover:text-[#3d260a]' : 'text-[#c5a059] hover:text-[#f3e3a2]'
            }`}
            title="Abrir Laboratório de Som"
            id="sound-mini-player-open-tab-btn"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
