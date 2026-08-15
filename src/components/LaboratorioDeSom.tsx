import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { DIMENUVEIS_SOUNDS, DimenuvelSound } from '../data/soundLabData';
import {
  soundLabAudioService,
  SoundLabState,
  DurationOption
} from '../services/soundLabAudio';
import {
  Play,
  Pause,
  Square,
  Volume2,
  VolumeX,
  Clock,
  Waves,
  Sparkles,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const LaboratorioDeSom: React.FC = () => {
  const { theme } = useApp();
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

  const activeDimenuvel =
    DIMENUVEIS_SOUNDS.find((d) => d.id === audioState.activeDimenuvelId) ||
    DIMENUVEIS_SOUNDS[0];

  const durationOptions: { label: string; value: DurationOption }[] = [
    { label: 'Contínuo', value: null },
    { label: '5 min', value: 5 },
    { label: '10 min', value: 10 },
    { label: '15 min', value: 15 },
    { label: '20 min', value: 20 },
    { label: '30 min', value: 30 },
    { label: '45 min', value: 45 },
    { label: '60 min', value: 60 },
  ];

  const formatRemainingTime = (totalSecs: number | null): string => {
    if (totalSecs === null) return 'Contínuo';
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTogglePlayPause = () => {
    if (audioState.isPlaying) {
      soundLabAudioService.pause();
    } else {
      soundLabAudioService.play();
    }
  };

  const handleStop = () => {
    soundLabAudioService.stop();
  };

  const handleSelectDimenuvel = (id: number) => {
    soundLabAudioService.selectDimenuvel(id);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    soundLabAudioService.setVolume(val);
  };

  const handleDurationSelect = (val: DurationOption) => {
    soundLabAudioService.setDuration(val);
  };

  const volumePercent = Math.round(audioState.volume * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-10 space-y-8 animate-in fade-in duration-300">
      {/* Header Section */}
      <div className="text-center space-y-3">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest border ${
          isDay
            ? 'bg-[#f0e2cd] border-[#d1b88a] text-[#5a3810]'
            : 'bg-[#c5a059]/15 border-[#c5a059]/30 text-[#f3e3a2]'
        }`}>
          <Waves className={`w-3.5 h-3.5 ${isDay ? 'text-[#8a5a19]' : 'text-[#c5a059]'}`} />
          <span>Frequências Primordiais</span>
        </div>
        <h1 className={`text-2xl sm:text-4xl font-serif font-bold tracking-wider uppercase ${
          isDay ? 'text-[#3d260a]' : 'text-[#f3e3a2]'
        }`}>
          LABORATÓRIO DE SOM
        </h1>
        <p className={`text-sm sm:text-base font-serif italic max-w-md mx-auto ${
          isDay ? 'text-[#5a4835]' : 'text-neutral-300'
        }`}>
          O som como instrumento de presença.
        </p>
      </div>

      {/* Main Active Sound Display Card */}
      <div className={`relative border rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 overflow-hidden transition-colors duration-500 ${
        isDay
          ? `${activeDimenuvel.color.daySelectedBg} ${activeDimenuvel.color.dayBorder} text-[#2c1e0e]`
          : `${activeDimenuvel.color.nightSelectedBg} ${activeDimenuvel.color.nightBorder} text-neutral-200`
      }`}>
        {/* Subtle layer color background glow when playing */}
        <div
          className={`absolute inset-0 bg-radial pointer-events-none transition-opacity duration-1000 ${
            isDay ? activeDimenuvel.color.dayGlow : activeDimenuvel.color.nightGlow
          } via-transparent to-transparent ${
            audioState.isPlaying ? 'opacity-100' : 'opacity-40'
          }`}
        />

        {/* Top Status & Frequency Indicator */}
        <div className={`relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-b pb-6 ${
          isDay ? 'border-[#d1b88a]/40' : 'border-[#c5a059]/20'
        }`}>
          <div className="text-center sm:text-left space-y-1">
            <span className={`text-xs uppercase tracking-widest font-mono ${
              isDay ? 'text-[#8a5a19]' : 'text-[#c5a059]'
            }`}>
              Camada Ativa • Dimenúvel {activeDimenuvel.numberStr}
            </span>
            <h2 className={`text-2xl sm:text-3xl font-serif font-bold ${
              isDay ? 'text-[#3d260a]' : 'text-[#f3e3a2]'
            }`}>
              {activeDimenuvel.name}
            </h2>
            <p className={`text-xs font-serif italic ${
              isDay ? 'text-[#5a4835]' : 'text-neutral-400'
            }`}>
              {activeDimenuvel.description}
            </p>
          </div>

          <div className={`flex items-center gap-3 border px-4 py-2.5 rounded-xl ${
            isDay
              ? 'bg-white/80 border-[#d1b88a]'
              : 'bg-neutral-900/80 border-[#c5a059]/30'
          }`}>
            <div className="text-center">
              <span className={`block text-[10px] uppercase font-mono tracking-wider ${
                isDay ? 'text-[#7a5e3d]' : 'text-neutral-400'
              }`}>
                Frequência
              </span>
              <span className={`text-xl font-mono font-bold ${
                isDay ? 'text-[#3d260a]' : 'text-[#f3e3a2]'
              }`}>
                {activeDimenuvel.frequency} <span className={`text-xs ${
                  isDay ? 'text-[#8a5a19]' : 'text-[#c5a059]'
                }`}>Hz</span>
              </span>
            </div>
            {audioState.isPlaying && (
              <div className={`flex items-center gap-1 pl-2 border-l ${
                isDay ? 'border-[#d1b88a]/60' : 'border-[#c5a059]/30'
              }`}>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className={`text-[10px] uppercase tracking-wider font-mono font-bold ${
                  isDay ? 'text-emerald-700' : 'text-emerald-300'
                }`}>
                  Sessão Ativa
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Center Wave Motion / Visualizer */}
        <div className="relative z-10 py-4 flex flex-col items-center justify-center space-y-3">
          <div className="flex items-center justify-center gap-1.5 h-12">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
              <motion.div
                key={i}
                className={`w-1 rounded-full ${isDay ? 'bg-[#8a5a19]' : 'bg-[#c5a059]'}`}
                animate={
                  audioState.isPlaying
                    ? {
                        height: ['12px', '36px', '18px', '42px', '12px'],
                        opacity: [0.5, 1, 0.7, 1, 0.5],
                      }
                    : { height: '8px', opacity: 0.3 }
                }
                transition={
                  audioState.isPlaying
                    ? {
                        duration: 1.2 + (i % 5) * 0.2,
                        repeat: Infinity,
                        repeatType: 'mirror',
                        ease: 'easeInOut',
                        delay: i * 0.08,
                      }
                    : { duration: 0.3 }
                }
              />
            ))}
          </div>

          <div className={`text-xs font-mono flex items-center gap-2 ${
            isDay ? 'text-[#6b5235]' : 'text-neutral-400'
          }`}>
            <span>Batimento Binaural Contemplativo (Estéreo)</span>
          </div>
        </div>

        {/* Playback Controls & Duration */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center pt-2">
          {/* Main Play/Pause & Stop Buttons */}
          <div className="flex items-center justify-center md:justify-start gap-3">
            <button
              onClick={handleTogglePlayPause}
              id="sound-lab-play-pause-btn"
              className={`px-6 py-3 rounded-full font-bold tracking-wider uppercase text-xs sm:text-sm flex items-center gap-2.5 shadow-lg transition-all transform hover:scale-105 active:scale-95 ${
                audioState.isPlaying
                  ? isDay
                    ? 'bg-amber-200 hover:bg-amber-300 text-amber-950 border border-amber-400'
                    : 'bg-amber-900/60 hover:bg-amber-800/80 text-amber-200 border border-amber-500/40'
                  : isDay
                    ? 'bg-gradient-to-r from-[#d9a036] to-[#eac266] hover:from-[#c28e28] hover:to-[#dfb559] text-[#241706] shadow-md border border-[#a87a20]'
                    : 'bg-gradient-to-r from-[#c5a059] to-[#e5c158] hover:from-[#d4af37] hover:to-[#f3e3a2] text-black shadow-[#c5a059]/20'
              }`}
            >
              {audioState.isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>Ⅱ PAUSAR</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                  <span>▶ INICIAR</span>
                </>
              )}
            </button>

            <button
              onClick={handleStop}
              id="sound-lab-stop-btn"
              disabled={!audioState.isPlaying && audioState.remainingSeconds === null}
              className={`px-4 py-3 rounded-full border transition-all text-xs font-mono uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 ${
                isDay
                  ? 'bg-stone-200 hover:bg-stone-300 text-stone-800 border-stone-300'
                  : 'bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-neutral-100 border-neutral-700/60'
              }`}
              title="Parar áudio com fade-out suave"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>PARAR</span>
            </button>
          </div>

          {/* Timer Remaining Display & Progress Bar */}
          <div className="text-center space-y-2">
            <span className={`text-[10px] uppercase tracking-widest font-mono block ${
              isDay ? 'text-[#7a5e3d]' : 'text-neutral-400'
            }`}>
              Duração da Sessão
            </span>
            <div className={`text-2xl font-mono font-bold tracking-wider ${
              isDay ? 'text-[#3d260a]' : 'text-[#f3e3a2]'
            }`}>
              {formatRemainingTime(audioState.remainingSeconds)}
            </div>

            {/* Duration Progress Bar (when a specific duration interval is set) */}
            {audioState.durationMinutes !== null && (
              <div className="space-y-1 max-w-[180px] mx-auto">
                {(() => {
                  const totalSecs = audioState.durationMinutes * 60;
                  const currentSecs = audioState.remainingSeconds ?? totalSecs;
                  const elapsedSecs = Math.max(0, totalSecs - currentSecs);
                  const progressPercent = Math.min(100, Math.max(0, (elapsedSecs / totalSecs) * 100));

                  return (
                    <>
                      <div className={`w-full h-1.5 rounded-full overflow-hidden ${
                        isDay ? 'bg-[#d1b88a]' : 'bg-neutral-800'
                      }`}>
                        <div
                          className={`h-full transition-all duration-1000 ease-linear rounded-full ${
                            isDay ? 'bg-[#8a5a19]' : 'bg-gradient-to-r from-[#c5a059] to-[#f3e3a2]'
                          }`}
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[9px] font-mono text-neutral-400">
                        <span>{Math.round(progressPercent)}% concluído</span>
                        <span>{audioState.durationMinutes} min</span>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}

            {audioState.durationMinutes !== null && audioState.isPlaying && (
              <span className={`text-[10px] font-mono italic block ${
                isDay ? 'text-[#8a5a19]' : 'text-amber-400'
              }`}>
                Termina suavemente com fade-out
              </span>
            )}
          </div>

          {/* Volume Slider */}
          <div className="space-y-1.5">
            <div className={`flex items-center justify-between text-xs font-mono ${
              isDay ? 'text-[#5a4835]' : 'text-neutral-400'
            }`}>
              <span className="flex items-center gap-1">
                {audioState.volume === 0 ? (
                  <VolumeX className="w-3.5 h-3.5" />
                ) : (
                  <Volume2 className={`w-3.5 h-3.5 ${isDay ? 'text-[#8a5a19]' : 'text-[#c5a059]'}`} />
                )}
                <span>Volume</span>
              </span>
              <span className={`font-bold ${isDay ? 'text-[#3d260a]' : 'text-[#f3e3a2]'}`}>{volumePercent}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={audioState.volume}
              onChange={handleVolumeChange}
              id="sound-lab-volume-slider"
              className={`w-full rounded-lg h-2 cursor-pointer ${
                isDay ? 'accent-[#8a5a19] bg-[#d1b88a]' : 'accent-[#c5a059] bg-neutral-800'
              }`}
            />
          </div>
        </div>

        {/* Duration Selector Buttons */}
        <div className={`relative z-10 pt-4 border-t space-y-2 ${
          isDay ? 'border-[#d1b88a]/30' : 'border-[#c5a059]/15'
        }`}>
          <span className={`text-xs uppercase font-mono tracking-widest block ${
            isDay ? 'text-[#8a5a19]' : 'text-[#c5a059]'
          }`}>
            Selecione a Duração
          </span>
          <div className="flex flex-wrap gap-2">
            {durationOptions.map((opt) => {
              const isSelected = audioState.durationMinutes === opt.value;
              return (
                <button
                  key={opt.label}
                  onClick={() => handleDurationSelect(opt.value)}
                  id={`duration-opt-${opt.label.replace(/\s+/g, '')}`}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                    isSelected
                      ? isDay
                        ? 'bg-[#d9a036] text-[#241706] border-[#a87a20] font-bold shadow-sm'
                        : 'bg-[#c5a059]/30 text-[#f3e3a2] border-[#c5a059] font-bold shadow-sm'
                      : isDay
                        ? 'bg-white/90 text-[#5a4835] hover:text-[#3d260a] border-[#d1b88a] hover:border-[#8a5a19]'
                        : 'bg-neutral-900/60 text-neutral-400 hover:text-neutral-200 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 7 Dimenúveis Selection Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-mono uppercase tracking-widest text-[#c5a059] font-bold">
            As 7 Dimenúveis Sonoras
          </h3>
          <span className="text-xs text-neutral-400 font-serif italic">
            Toque para selecionar a camada ativa
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {DIMENUVEIS_SOUNDS.map((sound) => {
            const isSelected = audioState.activeDimenuvelId === sound.id;
            const isThisPlaying = isSelected && audioState.isPlaying;
            const c = sound.color;

            const cardBgClass = isSelected
              ? isDay
                ? `${c.daySelectedBg} ${c.dayBorder} ${c.dayTextTitle} shadow-md`
                : `${c.nightSelectedBg} ${c.nightBorder} ${c.nightTextTitle} shadow-lg`
              : isDay
                ? `${c.dayUnselectedBg} ${c.dayBorder} ${c.dayTextTitle} shadow-sm`
                : `${c.nightUnselectedBg} ${c.nightBorder} ${c.nightTextTitle}`;

            return (
              <div
                key={sound.id}
                onClick={() => handleSelectDimenuvel(sound.id)}
                id={`dimenuvel-sound-card-${sound.id}`}
                className={`group text-left p-4 rounded-xl border transition-all relative overflow-hidden flex flex-col justify-between cursor-pointer ${cardBgClass}`}
              >
                {/* Active layer color glow corner */}
                <div
                  className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl pointer-events-none rounded-bl-full transition-opacity duration-300 ${
                    isDay ? c.dayGlow : c.nightGlow
                  } to-transparent ${isSelected ? 'opacity-100' : 'opacity-40 group-hover:opacity-75'}`}
                />

                <div className="space-y-1 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-mono font-bold ${isDay ? c.dayTextNumber : c.nightTextNumber}`}>
                      {sound.numberStr}
                    </span>
                    <span className={`text-xs font-mono font-bold ${isDay ? c.dayTextNumber : c.nightTextNumber}`}>
                      {sound.frequency} Hz
                    </span>
                  </div>
                  <h4 className={`text-base font-serif font-bold ${isDay ? c.dayTextTitle : c.nightTextTitle}`}>
                    {sound.name}
                  </h4>
                </div>

                <p className={`text-[11px] font-serif italic mt-3 line-clamp-2 relative z-10 ${
                  isDay ? 'text-stone-700' : 'text-neutral-300/80'
                }`}>
                  {sound.description}
                </p>

                {/* Layer Action Button Container */}
                <div className={`mt-4 pt-3 border-t flex items-center justify-between gap-2 relative z-10 ${
                  isDay ? 'border-stone-400/30' : 'border-white/10'
                }`}>
                  {isThisPlaying ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        soundLabAudioService.pause();
                      }}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm ${
                        isDay
                          ? 'bg-amber-200 hover:bg-amber-300 text-amber-950 border border-amber-400/80'
                          : 'bg-amber-900/80 hover:bg-amber-800 text-amber-200 border border-amber-500/50'
                      }`}
                      title="Pausar esta camada"
                    >
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      <span>Pausar</span>
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isSelected) {
                          soundLabAudioService.selectDimenuvel(sound.id);
                        }
                        soundLabAudioService.play();
                      }}
                      className={`px-3.5 py-1.5 rounded-lg text-[11px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md ${
                        isDay ? c.dayBtnPlay : c.nightBtnPlay
                      }`}
                      title="Tocar esta camada"
                    >
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      <span>Tocar</span>
                    </button>
                  )}

                  {isThisPlaying && (
                    <span className={`flex items-center gap-1 text-[10px] font-mono font-bold ${
                      isDay ? c.dayTextNumber : c.nightTextNumber
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                        isDay ? 'bg-emerald-600' : 'bg-emerald-400'
                      }`} />
                      <Waves className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contemplative Instructions Banner */}
      <div className="p-4 rounded-xl bg-neutral-900/50 border border-[#c5a059]/20 text-xs text-neutral-400 font-serif leading-relaxed space-y-1.5">
        <div className="flex items-center gap-2 text-[#c5a059] font-mono uppercase text-[11px] font-bold">
          <Info className="w-4 h-4 shrink-0" />
          <span>Uso Recomendado</span>
        </div>
        <p>
          Utilize fones de ouvido estéreo para usufruir da ressonância de batimento binaural. 
          O som continua tocando em segundo plano enquanto você navega pelos textos e práticas do aplicativo.
        </p>
      </div>
    </div>
  );
};
