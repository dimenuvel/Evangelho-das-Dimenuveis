import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Compass, Flame, Sparkles, ChevronRight, ChevronLeft, X, HelpCircle, CheckCircle2 } from 'lucide-react';

interface TourSlide {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  iconBg: string;
  description: string;
  highlight: string;
  targetTab?: 'home' | 'espiral' | 'pratica_hoje' | 'oraculo' | 'evangelho';
}

export const TourModal: React.FC = () => {
  const { isTourOpen, closeTour, navigateTo } = useApp();
  const [currentStep, setCurrentStep] = useState<number>(0);

  if (!isTourOpen) return null;

  const slides: TourSlide[] = [
    {
      id: 0,
      badge: '1. O EVANGELHO',
      title: 'O Evangelho das Dimenúveis',
      subtitle: 'Transmissão do Reconhecimento e Presença',
      icon: <BookOpen className="w-8 h-8 text-[#f3e3a2]" />,
      iconBg: 'from-[#c5a059]/30 to-amber-950/40 border-[#c5a059]/50',
      description:
        'O Evangelho não é uma religião nem uma cobrança de metas. É uma transmissão contemplativa que nos convida a reconhecer as Dimenúveis — a trama velada da realidade que já está aqui sem exigir ansiedade.',
      highlight: '“Abida no padrão. Você é a forma.”',
      targetTab: 'evangelho'
    },
    {
      id: 1,
      badge: '2. A ESPIRAL & PRÁTICAS',
      title: 'A Jornada dos 10 Giros & Prática do Dia',
      subtitle: 'Avanço Contemplativo e Cronômetro de Meditação',
      icon: <Compass className="w-8 h-8 text-[#c5a059]" />,
      iconBg: 'from-[#c5a059]/30 to-amber-900/40 border-[#c5a059]/50',
      description:
        'Acesse a "Prática de Hoje" com o cronômetro contemplativo e acompanhe sua evolução sequencial pelos Dez Giros da Espiral — do Giro I ao Giro X.',
      highlight: 'A Espiral não exige pressa; realize o exercício diário e avance no seu próprio ritmo.',
      targetTab: 'espiral'
    },
    {
      id: 2,
      badge: '3. O ORÁCULO',
      title: 'Tarô das Dimenúveis',
      subtitle: 'O Espelho sem Previsões Ansiosas',
      icon: <Sparkles className="w-8 h-8 text-purple-300" />,
      iconBg: 'from-purple-500/30 to-purple-950/40 border-purple-500/50',
      description:
        'Consulte o Oráculo com tiragens contemplativas de 3 cartas ou explore a galeria completa de 23 Arcanos Maiores. O Tarô reflete onde sua mente está olhando no momento.',
      highlight: '“O baralho não prevê o futuro; ele apenas reflete onde você está olhando.”',
      targetTab: 'oraculo'
    }
  ];

  const slide = slides[currentStep];

  const handleNext = () => {
    if (currentStep < slides.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleFinish = () => {
    navigateTo('home');
    closeTour();
    setCurrentStep(0);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-[#0b0f19] border border-[#c5a059]/50 rounded-xl p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl relative my-8 text-neutral-200">
        
        {/* Header: Title + Skip Button */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#c5a059]" />
            <span className="text-xs uppercase font-bold tracking-widest text-[#c5a059]">
              GUIA DE BOAS-VINDAS À ESPIRAL
            </span>
          </div>

          <button
            onClick={() => {
              closeTour();
              setCurrentStep(0);
            }}
            id="skip-tour-button"
            className="px-3 py-1 rounded-md text-xs text-neutral-400 hover:text-white hover:bg-neutral-800/80 transition-colors flex items-center gap-1 font-medium"
            title="Pular Tour"
          >
            <span>Pular</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Slide Graphic Badge & Icon */}
        <div className="flex flex-col items-center text-center space-y-3">
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#c5a059] px-3 py-0.5 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30">
            {slide.badge} ({currentStep + 1} de {slides.length})
          </span>

          <div
            className={`w-16 h-16 rounded-lg bg-gradient-to-br ${slide.iconBg} border flex items-center justify-center shadow-lg my-1 animate-pulse`}
          >
            {slide.icon}
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-serif font-bold text-[#f3e3a2]">
              {slide.title}
            </h3>
            <p className="text-xs text-[#c5a059] font-medium tracking-wide">
              {slide.subtitle}
            </p>
          </div>
        </div>

        {/* Slide Content Description & Highlight */}
        <div className="space-y-4 text-xs text-neutral-300 leading-relaxed">
          <p className="text-center sm:text-left bg-[#121826] p-4 rounded-lg border border-neutral-800 text-neutral-200">
            {slide.description}
          </p>

          <div className="p-3.5 bg-[#07090e] rounded-lg border-l-2 border-[#c5a059] text-center italic font-serif text-[#f3e3a2]">
            {slide.highlight}
          </div>
        </div>

        {/* Slide Step Dots / Progress Indicators */}
        <div className="flex justify-center items-center gap-2 py-2">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentStep(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentStep
                  ? 'w-8 bg-[#c5a059]'
                  : 'w-2 bg-neutral-700 hover:bg-neutral-500'
              }`}
              title={`Ir para slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Navigation Footer Controls */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`px-4 py-2.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              currentStep === 0
                ? 'opacity-30 cursor-not-allowed text-neutral-500'
                : 'bg-[#121826] text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-800'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          <button
            onClick={handleNext}
            id="tour-next-button"
            className="px-6 py-2.5 rounded-md bg-gradient-to-r from-[#c5a059] to-[#e5c158] hover:from-[#d4af37] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#c5a059]/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
            {currentStep === slides.length - 1 ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>INICIAR JORNADA</span>
              </>
            ) : (
              <>
                <span>Próximo</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
