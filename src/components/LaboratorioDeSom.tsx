import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { DIMENUVEIS_SOUNDS } from '../data/soundLabData';
import { getTranslatedSound } from '../utils/dataI18n';
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
  Headphones
} from 'lucide-react';
import { motion } from 'motion/react';

export const LaboratorioDeSom: React.FC = () => {
  const { theme, t, language } = useApp();
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

  const rawDimenuvel =
    DIMENUVEIS_SOUNDS.find((d) => d.id === audioState.activeDimenuvelId) ||
    DIMENUVEIS_SOUNDS[0];

  const activeDimenuvel = getTranslatedSound(rawDimenuvel, language);

  const durationOptions: { label: string; value: DurationOption }[] = [
    { label: t('som.continuous'), value: null },
    { label: '5 min', value: 5 },
    { label: '10 min', value: 10 },
    { label: '15 min', value: 15 },
    { label: '30 min', value: 30 },
    { label: '60 min', value: 60 },
  ];

  const formatRemainingTime = (totalSecs: number | null): string => {
    if (totalSecs === null) return t('som.continuous');
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
    <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Header Section */}
      <div className="text-center space-y-2">
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-widest border ${
          isDay
            ? 'bg-[#f0e2cd] border-[#d1b88a] text-[#5a3810]'
            : 'bg-[#c5a059]/15 border-[#c5a059]/30 text-[#f3e3a2]'
        }`}>
          <Waves className={`w-3.5 h-3.5 ${isDay ? 'text-[#8a5a19]' : 'text-[#c5a059]'}`} />
          <span>{t('som.badge')}</span>
        </div>
        <h1 className={`text-2xl sm:text-3xl font-serif font-bold tracking-wider uppercase ${
          isDay ? 'text-[#3d260a]' : 'text-[#f3e3a2]'
        }`}>
          {t('som.title')}
        </h1>
        <p className={`text-xs sm:text-sm font-serif italic max-w-sm mx-auto ${
          isDay ? 'text-[#5a4835]' : 'text-neutral-400'
        }`}>
          {t('som.subtitle')}
        </p>
      </div>

      {/* Simplified Hero Player Console */}
      <div className={`relative border rounded-2xl p-5 sm:p-7 shadow-xl space-y-5 overflow-hidden transition-all duration-300 ${
        isDay
          ? 'bg-white/80 border-[#c5a059]/40 text-[#2c1e0e] shadow-amber-900/5'
          : 'bg-[#0d121f]/90 border-[#c5a059]/30 text-neutral-200 shadow-black'
      }`}>
        {/* Subtle Ambient Color Glow when playing */}
        <div
          className={`absolute inset-0 bg-radial pointer-events-none transition-opacity duration-700 ${
            isDay ? activeDimenuvel.color.dayGlow : activeDimenuvel.color.nightGlow
          } via-transparent to-transparent ${
            audioState.isPlaying ? 'opacity-80' : 'opacity-20'
          }`}
        />

        {/* Top Active Layer Info & Frequency */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="space-y-0.5">
            <div className={`text-[11px] font-mono uppercase tracking-widest font-semibold ${
              isDay ? 'text-[#8a5a19]' : 'text-[#c5a059]'
            }`}>
              {t('som.giroUnit')} {activeDimenuvel.numberStr}
            </div>
            <h2 className={`text-xl sm:text-2xl font-serif font-bold ${
              isDay ? 'text-[#3d260a]' : 'text-[#f3e3a2]'
            }`}>
              {activeDimenuvel.name}
            </h2>
            <p className={`text-xs font-serif italic max-w-md ${
              isDay ? 'text-stone-600' : 'text-neutral-400'
            }`}>
              {activeDimenuvel.description}
            </p>
          </div>

          <div className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border shrink-0 ${
            isDay ? 'bg-[#f4efe3] border-[#d1b88a]' : 'bg-[#060913] border-[#c5a059]/30'
          }`}>
            <span className={`text-xs font-mono tracking-wider ${isDay ? 'text-stone-500' : 'text-neutral-400'}`}>
              {t('som.frequency')}:
            </span>
            <span className={`text-base font-mono font-bold ${isDay ? 'text-[#3d260a]' : 'text-[#f3e3a2]'}`}>
              {activeDimenuvel.frequency} Hz
            </span>
          </div>
        </div>

        {/* Center Animated Equalizer Bar */}
        <div className="relative z-10 py-2 flex items-center justify-center gap-1.5 h-10">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <motion.div
              key={i}
              className={`w-1 rounded-full ${isDay ? 'bg-[#8a5a19]' : 'bg-[#c5a059]'}`}
              animate={
                audioState.isPlaying
                  ? {
                      height: ['8px', '32px', '14px', '28px', '8px'],
                      opacity: [0.4, 1, 0.6, 1, 0.4],
                    }
                  : { height: '6px', opacity: 0.25 }
              }
              transition={
                audioState.isPlaying
                  ? {
                      duration: 1.1 + (i % 4) * 0.25,
                      repeat: Infinity,
                      repeatType: 'mirror',
                      ease: 'easeInOut',
                      delay: i * 0.07,
                    }
                  : { duration: 0.2 }
              }
            />
          ))}
        </div>

        {/* Main Controls Row: Play/Pause, Stop, Remaining Time & Volume */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-stone-300/30 dark:border-white/10">
          {/* Primary Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleTogglePlayPause}
              id="sound-lab-play-pause-btn"
              className={`px-5 py-2.5 rounded-xl font-mono font-bold uppercase tracking-wider text-xs flex items-center gap-2 shadow-md transition-all active:scale-95 shrink-0 ${
                audioState.isPlaying
                  ? isDay
                    ? 'bg-amber-200 hover:bg-amber-300 text-amber-950 border border-amber-400'
                    : 'bg-amber-900/80 hover:bg-amber-800 text-amber-200 border border-amber-500/50'
                  : isDay
                    ? 'bg-gradient-to-r from-[#d9a036] to-[#eac266] hover:from-[#c28e28] text-[#241706] border border-[#a87a20]'
                    : 'bg-gradient-to-r from-[#c5a059] to-[#e5c158] hover:from-[#d4af37] text-black shadow-[#c5a059]/20'
              }`}
            >
              {audioState.isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>{t('som.btnPause')}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                  <span>{t('som.btnPlay')}</span>
                </>
              )}
            </button>

            <button
              onClick={handleStop}
              id="sound-lab-stop-btn"
              disabled={!audioState.isPlaying && audioState.remainingSeconds === null}
              className={`p-2.5 rounded-xl border transition-all disabled:opacity-30 disabled:cursor-not-allowed shrink-0 ${
                isDay
                  ? 'bg-stone-200/80 hover:bg-stone-300 text-stone-800 border-stone-300'
                  : 'bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 border-neutral-700/60'
              }`}
              title={t('som.stopTooltip')}
            >
              <Square className="w-4 h-4 fill-current" />
            </button>

            <div className="pl-1">
              <span className={`text-[10px] font-mono block uppercase ${isDay ? 'text-stone-500' : 'text-neutral-400'}`}>
                {t('som.sessionDuration')}
              </span>
              <span className={`text-sm font-mono font-bold ${isDay ? 'text-[#3d260a]' : 'text-[#f3e3a2]'}`}>
                {formatRemainingTime(audioState.remainingSeconds)}
              </span>
            </div>
          </div>

          {/* Volume Control Slider */}
          <div className="flex items-center gap-2 min-w-[130px] sm:min-w-[160px]">
            <button
              onClick={() => soundLabAudioService.setVolume(audioState.volume === 0 ? 0.8 : 0)}
              className="p-1 rounded hover:opacity-80 shrink-0"
              title={audioState.volume === 0 ? 'Unmute' : 'Mute'}
            >
              {audioState.volume === 0 ? (
                <VolumeX className="w-4 h-4 text-stone-400" />
              ) : (
                <Volume2 className={`w-4 h-4 ${isDay ? 'text-[#8a5a19]' : 'text-[#c5a059]'}`} />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={audioState.volume}
              onChange={handleVolumeChange}
              id="sound-lab-volume-slider"
              className={`w-full rounded-lg h-1.5 cursor-pointer ${
                isDay ? 'accent-[#8a5a19] bg-[#d1b88a]' : 'accent-[#c5a059] bg-neutral-800'
              }`}
            />
            <span className={`text-[11px] font-mono font-bold w-8 text-right shrink-0 ${
              isDay ? 'text-stone-700' : 'text-neutral-300'
            }`}>
              {volumePercent}%
            </span>
          </div>
        </div>

        {/* Duration Pills Selector */}
        <div className="relative z-10 pt-3 border-t border-stone-300/30 dark:border-white/10 flex flex-wrap items-center gap-1.5">
          <span className={`text-[11px] font-mono uppercase tracking-wider mr-2 shrink-0 ${
            isDay ? 'text-stone-600' : 'text-neutral-400'
          }`}>
            <Clock className="w-3.5 h-3.5 inline mr-1" />
            {t('som.selectDuration')}:
          </span>
          {durationOptions.map((opt) => {
            const isSelected = audioState.durationMinutes === opt.value;
            return (
              <button
                key={opt.label}
                onClick={() => handleDurationSelect(opt.value)}
                id={`duration-opt-${opt.label.replace(/\s+/g, '')}`}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all border shrink-0 ${
                  isSelected
                    ? isDay
                      ? 'bg-[#d9a036] text-[#241706] border-[#a87a20] font-bold shadow-sm'
                      : 'bg-[#c5a059]/30 text-[#f3e3a2] border-[#c5a059] font-bold shadow-sm'
                    : isDay
                      ? 'bg-white/80 text-[#5a4835] hover:text-[#3d260a] border-[#d1b88a]'
                      : 'bg-neutral-900/60 text-neutral-400 hover:text-neutral-200 border-neutral-800'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Streamlined 7-DimenÃºveis Sound List */}
      <div className="space-y-3 pt-2">
        <h3 className={`text-xs font-mono uppercase tracking-widest font-bold ${
          isDay ? 'text-[#8a5a19]' : 'text-[#c5a059]'
        }`}>
          {language === 'en' ? 'Select Sound Layer' : 'Selecionar Camada Sonora'}
        </h3>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          {DIMENUVEIS_SOUNDS.map((rawSound) => {
            const sound = getTranslatedSound(rawSound, language);
            const isSelected = audioState.activeDimenuvelId === sound.id;
            const isThisPlaying = isSelected && audioState.isPlaying;

            const bgClass = isSelected
              ? (isDay ? sound.color.daySelectedBg : sound.color.nightSelectedBg)
              : (isDay ? sound.color.dayUnselectedBg : sound.color.nightUnselectedBg);

            const borderClass = isSelected
              ? (isDay ? 'border-[#a87a20] ring-1 ring-[#a87a20]/40 shadow-sm' : 'border-[#c5a059] ring-1 ring-[#c5a059]/40 shadow-md')
              : (isDay ? sound.color.dayBorder : sound.color.nightBorder);

            const titleColor = isDay ? sound.color.dayTextTitle : sound.color.nightTextTitle;
            const numberColor = isDay ? sound.color.dayTextNumber : sound.color.nightTextNumber;

            return (
              <div
                key={sound.id}
                onClick={() => handleSelectDimenuvel(sound.id)}
                id={`dimenuvel-sound-card-${sound.id}`}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-2.5 relative overflow-hidden ${bgClass} ${borderClass}`}
              >
                <div className="flex items-start justify-between gap-2 min-w-0">
                  <div className="flex items-center gap-2 min-w-0">
                    {/* Layer Number Badge */}
                    <div className={`w-7 h-7 rounded-lg border font-mono font-bold text-xs flex items-center justify-center shrink-0 ${
                      isSelected
                        ? isDay
                          ? 'bg-[#d9a036] text-[#241706] border-[#a87a20]'
                          : 'bg-[#c5a059]/30 text-[#f3e3a2] border-[#c5a059]'
                        : isDay
                          ? 'bg-white/80 border-stone-300 ' + numberColor
                          : 'bg-black/40 border-white/10 ' + numberColor
                    }`}>
                      {sound.numberStr}
                    </div>

                    <div className="min-w-0 truncate">
                      <h4 className={`text-xs sm:text-sm font-serif font-bold truncate ${titleColor}`}>
                        {sound.name}
                      </h4>
                      <span className={`text-[10px] font-mono block opacity-80 ${isDay ? 'text-stone-600' : 'text-neutral-400'}`}>
                        {sound.frequency} Hz
                      </span>
                    </div>
                  </div>

                  {/* Play / Active Indicator Button */}
                  <div className="shrink-0">
                    {isThisPlaying ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          soundLabAudioService.pause();
                        }}
                        className={`p-1.5 sm:px-2.5 sm:py-1 rounded-lg text-xs font-mono font-bold uppercase flex items-center gap-1 transition-all ${
                          isDay
                            ? 'bg-amber-200 text-amber-950 border border-amber-400'
                            : 'bg-amber-900/90 text-amber-200 border border-amber-500/60'
                        }`}
                        title="Pausar"
                      >
                        <Pause className="w-3.5 h-3.5 fill-current" />
                        <span className="hidden sm:inline text-[10px]">Pausar</span>
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
                        className={`p-1.5 sm:px-2.5 sm:py-1 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center gap-1 ${
                          isDay
                            ? sound.color.dayBtnPlay
                            : sound.color.nightBtnPlay
                        }`}
                        title="Tocar"
                      >
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        <span className="hidden sm:inline text-[10px]">Tocar</span>
                      </button>
                    )}
                  </div>
                </div>

                <p className={`text-[11px] font-serif italic line-clamp-2 leading-tight ${
                  isDay ? 'text-stone-700/90' : 'text-neutral-300/90'
                }`}>
                  {sound.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Headphone Tip */}
      <div className={`p-3 rounded-xl border text-xs font-serif flex items-center gap-2.5 ${
        isDay
          ? 'bg-[#f0e2cd]/60 border-[#d1b88a]/50 text-[#5a3810]'
          : 'bg-[#0d121f]/60 border-[#c5a059]/20 text-neutral-400'
      }`}>
        <Headphones className={`w-4 h-4 shrink-0 ${isDay ? 'text-[#8a5a19]' : 'text-[#c5a059]'}`} />
        <p>
          {language === 'en'
            ? 'Use stereo headphones for the optimal binaural beat experience. Audio continues playing as you navigate.'
            : 'Recomendamos o uso de fones de ouvido estÃ©reo para melhor aproveitamento do batimento binaural. O Ã¡udio permanece ativo ao navegar.'
          }
        </p>
      </div>
    </div>
  );
};
