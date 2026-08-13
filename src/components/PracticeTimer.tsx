import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Practice } from '../types';
import { Play, Pause, RotateCcw, CheckCircle2, X, Volume2, VolumeX, Sparkles, ChevronRight } from 'lucide-react';

interface PracticeTimerProps {
  practice: Practice;
  onClose?: () => void;
}

export const PracticeTimer: React.FC<PracticeTimerProps> = ({ practice, onClose }) => {
  const {
    completePractice,
    closePracticeTimer,
    navigateTo,
    getNextPracticeInSequence,
    advanceToNextPractice
  } = useApp();

  const [selectedMinutes, setSelectedMinutes] = useState<number>(practice.suggestedDurationMinutes || 5);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(selectedMinutes * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [autoAdvanceSeconds, setAutoAdvanceSeconds] = useState<number>(10);
  const [isAutoAdvancePaused, setIsAutoAdvancePaused] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextPractice = getNextPracticeInSequence(practice.id);

  // Sync state when practice prop changes (e.g. after auto advancing)
  useEffect(() => {
    setSelectedMinutes(practice.suggestedDurationMinutes || 5);
    setTimeLeftSeconds((practice.suggestedDurationMinutes || 5) * 60);
    setIsRunning(false);
    setIsCompleted(false);
    setActiveStepIndex(0);
    setAutoAdvanceSeconds(10);
    setIsAutoAdvancePaused(false);
  }, [practice.id]);

  // Timer countdown
  useEffect(() => {
    if (isRunning && timeLeftSeconds > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeftSeconds((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeftSeconds === 0) {
      setIsRunning(false);
      setIsCompleted(true);
      playCompletionChime();
      completePractice(practice.id, selectedMinutes);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeftSeconds]);

  // Auto-advance countdown when completed
  const handleAdvanceToNext = () => {
    const nextP = advanceToNextPractice(practice.id);
    if (nextP) {
      setIsCompleted(false);
      setIsRunning(false);
      setSelectedMinutes(nextP.suggestedDurationMinutes || 5);
      setTimeLeftSeconds((nextP.suggestedDurationMinutes || 5) * 60);
      setActiveStepIndex(0);
      setAutoAdvanceSeconds(10);
      setIsAutoAdvancePaused(false);
    }
  };

  // 10-second auto-advance timer
  useEffect(() => {
    if (!isCompleted || !nextPractice || isAutoAdvancePaused) {
      return;
    }

    const interval = setInterval(() => {
      setAutoAdvanceSeconds((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isCompleted, nextPractice, isAutoAdvancePaused, practice.id]);

  // Trigger advance safely when countdown hits 0
  useEffect(() => {
    if (isCompleted && nextPractice && !isAutoAdvancePaused && autoAdvanceSeconds === 0) {
      handleAdvanceToNext();
    }
  }, [autoAdvanceSeconds, isCompleted, nextPractice, isAutoAdvancePaused]);

  // Synthesize Tibetan Bowl / Bell Chime using Web Audio API
  const playCompletionChime = () => {
    if (isMuted) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();

      // Fundamental frequency (172.06 Hz - OM tone / Tibetan bowl)
      const fund = 172.06;
      const partials = [1, 2.76, 4.76, 6.2];
      const now = ctx.currentTime;

      partials.forEach((mult, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(fund * mult, now);

        // Gentle envelope
        const vol = (0.3 / (index + 1));
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(vol, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.0 + index);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 4.5 + index);
      });
    } catch (e) {
      console.log('Audio chime not supported or blocked:', e);
    }
  };

  const toggleTimer = () => {
    if (isCompleted) return;
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsCompleted(false);
    setTimeLeftSeconds(selectedMinutes * 60);
    setAutoAdvanceSeconds(4);
    setIsAutoAdvancePaused(false);
  };

  const handleFinishEarly = () => {
    setIsRunning(false);
    setIsCompleted(true);
    playCompletionChime();
    completePractice(practice.id, selectedMinutes);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = Math.min(
    100,
    Math.max(0, ((selectedMinutes * 60 - timeLeftSeconds) / (selectedMinutes * 60)) * 100)
  );

  return (
    <div className="bg-[#0b0f19] border border-[#c5a059]/30 rounded-lg p-6 shadow-2xl relative overflow-hidden text-neutral-200">
      {/* Background aura */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#c5a059]/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-[#c5a059]/20 pb-4 mb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#c5a059] font-medium block">
            PRÁTICA DA ESPIRAL • GIRO {practice.giroId}
          </span>
          <h2 className="text-xl font-serif font-bold text-[#f3e3a2] mt-0.5">
            {practice.title}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-[#f3e3a2] transition-colors"
            title={isMuted ? 'Ativar som do gongo' : 'Silenciar gongo'}
            id="timer-mute-button"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-[#c5a059]" />}
          </button>

          <button
            onClick={() => {
              closePracticeTimer();
              if (onClose) onClose();
            }}
            className="px-3 py-1.5 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-neutral-700/80 shadow-sm"
            id="timer-close-button"
            title="Fechar temporizador e voltar"
          >
            <X className="w-4 h-4 text-neutral-400" />
            <span>Fechar</span>
          </button>
        </div>
      </div>

      {/* Instructions & Short Description */}
      <div className="bg-[#121826] border border-[#c5a059]/15 rounded-xl p-4 mb-6 text-sm text-neutral-300 leading-relaxed">
        <p className="text-neutral-300 mb-3">{practice.shortDescription}</p>
        <div className="p-3 bg-[#07090e]/60 rounded-lg border-l-2 border-[#c5a059] text-xs text-neutral-300 space-y-1">
          <p className="font-semibold text-[#f3e3a2] uppercase tracking-wider text-[10px]">INSTRUÇÕES</p>
          <p>{practice.instructions}</p>
        </div>
      </div>

      {/* Steps (if available) */}
      {practice.steps && practice.steps.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wider text-[#c5a059] font-medium">
              ETAPAS DA PRÁTICA ({activeStepIndex + 1}/{practice.steps.length})
            </span>
          </div>
          <div className="bg-[#121826]/70 border border-[#c5a059]/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-[#c5a059]/20 text-[#f3e3a2] font-semibold">
                {practice.steps[activeStepIndex].category}
              </span>
              <h4 className="text-sm font-semibold text-white">
                {practice.steps[activeStepIndex].title}
              </h4>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {practice.steps[activeStepIndex].content}
            </p>

            {practice.steps.length > 1 && (
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-neutral-800">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                  className="text-xs text-neutral-400 hover:text-[#f3e3a2] disabled:opacity-30 disabled:pointer-events-none"
                >
                  ← Anterior
                </button>
                <div className="flex gap-1">
                  {practice.steps.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveStepIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        activeStepIndex === idx ? 'bg-[#c5a059] w-4' : 'bg-neutral-700'
                      }`}
                    />
                  ))}
                </div>
                <button
                  disabled={activeStepIndex === practice.steps.length - 1}
                  onClick={() => setActiveStepIndex((prev) => Math.min(practice.steps.length - 1, prev + 1))}
                  className="text-xs text-neutral-400 hover:text-[#f3e3a2] disabled:opacity-30 disabled:pointer-events-none"
                >
                  Próxima →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Duration Selector */}
      {!isRunning && !isCompleted && (
        <div className="mb-6">
          <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2 font-medium">
            DURAÇÃO SUGERIDA (MINUTOS)
          </label>
          <div className="flex items-center gap-2">
            {[3, 5, 10, 15, 20].map((mins) => (
              <button
                key={mins}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedMinutes(mins);
                  setTimeLeftSeconds(mins * 60);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedMinutes === mins
                    ? 'bg-[#c5a059] text-black shadow-md shadow-[#c5a059]/20'
                    : 'bg-[#121826] text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {mins} min
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Timer Circular Display */}
      <div className="flex flex-col items-center justify-center my-6">
        <div className="relative w-48 h-48 flex items-center justify-center">
          {/* SVG Progress Ring */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              className="text-neutral-800"
              strokeWidth="4"
              stroke="currentColor"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              className="text-[#c5a059] transition-all duration-500 ease-linear"
              strokeWidth="4"
              strokeDasharray={2 * Math.PI * 44}
              strokeDashoffset={2 * Math.PI * 44 * (1 - progressPercent / 100)}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>

          {/* Center Digital Clock */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {isCompleted ? (
              <div className="flex flex-col items-center text-emerald-400">
                <CheckCircle2 className="w-10 h-10 mb-1 text-emerald-400" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#f3e3a2]">CONCLUÍDO</span>
              </div>
            ) : (
              <>
                <span className="text-4xl font-mono font-bold text-[#f3e3a2] tracking-wider">
                  {formatTime(timeLeftSeconds)}
                </span>
                <span className="text-[10px] text-neutral-400 tracking-widest uppercase mt-1">
                  {isRunning ? 'ABIDANDO...' : 'EM ESPERA'}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Timer Controls & Completion State */}
      <div className="flex items-center justify-center gap-4 mt-2">
        {!isCompleted ? (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                resetTimer();
              }}
              className="p-3 rounded-full bg-[#121826] text-neutral-400 hover:text-white border border-neutral-800 transition-colors"
              title="Reiniciar tempo"
              id="timer-reset-button"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleTimer();
              }}
              id="timer-play-pause-button"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#c5a059] to-[#e5c158] text-black font-bold tracking-wider uppercase text-xs flex items-center gap-2 shadow-lg shadow-[#c5a059]/25 hover:scale-105 active:scale-95 transition-all"
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>PAUSAR</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>INICIAR</span>
                </>
              )}
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4 w-full">
            {/* Recognition Card */}
            <div className="p-5 sm:p-6 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-center w-full max-w-md mx-auto space-y-2.5 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase text-emerald-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>PRÁTICA CONCLUÍDA</span>
              </div>
              <p className="text-sm sm:text-base font-serif italic text-[#f3e3a2] leading-relaxed">
                “Você não precisava conquistar a mente. Só precisava observá-la.”
              </p>
            </div>

            {/* Auto-Advance Box */}
            {nextPractice ? (
              <div className="w-full max-w-md mx-auto bg-[#121826] border border-[#c5a059]/30 rounded-xl p-4 text-center space-y-3 shadow-lg">
                <div className="flex items-center justify-between text-xs text-neutral-300">
                  <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">Próxima prática no Giro</span>
                  <span className="text-[#f3e3a2] font-mono font-bold text-xs px-2 py-0.5 rounded bg-[#c5a059]/20 border border-[#c5a059]/40">
                    {autoAdvanceSeconds}s
                  </span>
                </div>

                <div className="w-full bg-neutral-900 rounded-full h-1.5 overflow-hidden border border-neutral-800">
                  <div
                    className="bg-gradient-to-r from-[#c5a059] to-[#e5c158] h-full transition-all duration-1000 ease-linear"
                    style={{ width: `${Math.min(100, Math.max(0, ((10 - autoAdvanceSeconds) / 10) * 100))}%` }}
                  />
                </div>

                <p className="text-sm font-serif text-white font-bold">
                  {nextPractice.title}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleAdvanceToNext();
                    }}
                    className="px-5 py-2.5 rounded-md bg-gradient-to-r from-[#c5a059] to-[#e5c158] hover:from-[#d4af37] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-[#c5a059]/20 transition-all"
                  >
                    <span>Avançar para Próxima Prática</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsAutoAdvancePaused((prev) => !prev);
                    }}
                    className="px-3 py-2.5 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium transition-colors border border-neutral-700"
                  >
                    {isAutoAdvancePaused ? 'Retomar Contagem' : 'Pausar Avanço'}
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-neutral-400 text-center font-serif italic">
                Você concluiu todas as práticas ativas da Espiral.
              </p>
            )}

            {/* Actions */}
            <div className="flex gap-2 w-full justify-center pt-1">
              <button
                onClick={resetTimer}
                className="px-4 py-2 rounded-md bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-300 transition-colors border border-neutral-700"
              >
                Repetir Prática
              </button>
              <button
                onClick={() => {
                  closePracticeTimer();
                  if (onClose) onClose();
                  navigateTo('espiral');
                }}
                className="px-5 py-2 rounded-md bg-[#121826] hover:bg-neutral-800 text-[#f3e3a2] border border-[#c5a059]/40 font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Ver Posição na Espiral
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="mt-6 pt-4 border-t border-[#c5a059]/20 flex items-center justify-center gap-3 text-xs text-neutral-400">
        <button
          onClick={() => {
            closePracticeTimer();
            if (onClose) onClose();
          }}
          className="text-neutral-400 hover:text-white flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors"
          id="timer-footer-exit-button"
        >
          <X className="w-3.5 h-3.5 text-neutral-400" />
          <span>Sair da Prática</span>
        </button>

        {isRunning && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleFinishEarly();
            }}
            className="text-neutral-300 hover:text-white flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 hover:border-neutral-600 transition-colors"
            id="timer-finish-early-button"
          >
            <span>Concluir</span>
          </button>
        )}
      </div>
    </div>
  );
};

