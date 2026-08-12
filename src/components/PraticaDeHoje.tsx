import React from 'react';
import { useApp } from '../context/AppContext';
import { Play, Sparkles, Clock, Compass, CheckCircle2 } from 'lucide-react';

export const PraticaDeHoje: React.FC = () => {
  const { getPraticaDeHoje, openPracticeTimer, activeGiroId, navigateTo, completedPractices } = useApp();

  const hoje = getPraticaDeHoje();

  if (!hoje) {
    return (
      <div className="bg-[#0b0f19] border border-[#c5a059]/30 rounded-lg p-6 text-center">
        <Sparkles className="w-8 h-8 text-[#c5a059] mx-auto mb-2 animate-pulse" />
        <h3 className="font-serif text-lg text-[#f3e3a2] font-bold">Prática da Espiral Completa</h3>
        <p className="text-xs text-neutral-400 mt-1 max-w-md mx-auto">
          Você já concluiu todas as práticas ativas. Continue sua vivência contemplativa ou revise os Giros anteriores.
        </p>
      </div>
    );
  }

  const { practice, giroTitle, giroNumber } = hoje;
  const isAlreadyDone = completedPractices.includes(practice.id);

  return (
    <div className="bg-gradient-to-br from-[#0c101c] via-[#0e1424] to-[#07090e] border border-[#c5a059]/35 rounded-lg p-6 shadow-xl relative overflow-hidden group">
      {/* Subtle glowing halo */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#c5a059]/10 rounded-full blur-2xl group-hover:bg-[#c5a059]/20 transition-all pointer-events-none"></div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div className="space-y-3 flex-1">
          {/* Section Header Badge */}
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/40 text-[#f3e3a2] text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#c5a059]" />
              PRÁTICA DE HOJE
            </span>
            <span className="text-xs text-[#c5a059]/80 font-medium">
              • {giroNumber} — {giroTitle}
            </span>
          </div>

          {/* Practice Title */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-white tracking-wide group-hover:text-[#f3e3a2] transition-colors">
              {practice.title}
            </h3>
            <p className="text-sm text-neutral-300 mt-1.5 leading-relaxed max-w-2xl">
              {practice.shortDescription}
            </p>
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-xs text-neutral-400 pt-1">
            <div className="flex items-center gap-1.5 bg-[#07090e]/60 px-3 py-1 rounded-md border border-neutral-800">
              <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>{practice.suggestedDurationMinutes} minutos sugeridos</span>
            </div>

            {isAlreadyDone && (
              <div className="flex items-center gap-1 text-emerald-400 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>Já praticada hoje</span>
              </div>
            )}
          </div>
        </div>

        {/* INICIAR Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            onClick={() => openPracticeTimer(practice)}
            id="iniciar-pratica-hoje-button"
            className="px-6 py-3.5 rounded-md bg-gradient-to-r from-[#c5a059] to-[#e5c158] hover:from-[#d4af37] hover:to-[#f3e3a2] text-black font-bold tracking-wider uppercase text-xs flex items-center justify-center gap-2.5 shadow-lg shadow-[#c5a059]/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>INICIAR PRÁTICA</span>
          </button>

          <button
            onClick={() => {
              navigateTo('espiral');
              setTimeout(() => {
                const el = document.getElementById('caminho-dos-giros');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="px-4 py-3 rounded-md bg-[#121826] hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 text-xs font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <Compass className="w-4 h-4 text-[#c5a059]" />
            <span>Ver Giros da Espiral</span>
          </button>
        </div>
      </div>
    </div>
  );
};
