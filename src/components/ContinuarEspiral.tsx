import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GIROS_DATA, getGiroById } from '../data/girosData';
import { GiroDetailView } from './GiroDetailView';
import { PraticaDeHoje } from './PraticaDeHoje';
import { Compass, Lock, CheckCircle, Flame, ArrowRight, BookOpen, ChevronRight, User, Plus, Users, Sparkles } from 'lucide-react';

export const ContinuarEspiral: React.FC = () => {
  const {
    activeGiroId,
    setActiveGiroId,
    getGiroStatus,
    navigateTo,
    unlockedGiros,
    completedGiros,
    profiles,
    activeProfileId,
    activeProfile,
    switchProfile,
    openProfileModal
  } = useApp();

  const [selectedGiroForDetail, setSelectedGiroForDetail] = useState<number | null>(null);

  const activeGiro = getGiroById(activeGiroId);

  // If a specific Giro was selected for detailed view
  if (selectedGiroForDetail !== null) {
    return (
      <GiroDetailView
        giroId={selectedGiroForDetail}
        onBack={() => setSelectedGiroForDetail(null)}
      />
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#f3e3a2] text-xs font-bold tracking-widest uppercase">
          <Compass className="w-4 h-4 text-[#c5a059]" />
          <span>A ESPIRAL & PRÁTICAS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-wide">
          A Espiral e Práticas Contemplativas
        </h1>
        <p className="text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
          Sua prática do dia e a jornada encadeada dos Dez Giros do Evangelho das Dimenúveis.
        </p>
      </div>

      {/* User Profiles Bar on Spiral Page */}
      <div className="bg-[#0a0e1a]/90 border border-[#c5a059]/30 rounded-xl p-4 space-y-4">
        <div className="flex items-center gap-2 border-b border-neutral-800 pb-2.5">
          <Users className="w-4 h-4 text-[#c5a059]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#c5a059]">
            Praticante Ativo na Espiral:
          </span>
          <span className="text-sm font-serif font-bold text-white bg-[#c5a059]/20 px-2.5 py-0.5 rounded border border-[#c5a059]/40">
            {activeProfile?.name || 'Praticante'}
          </span>
        </div>

        {/* Profile pills selector */}
        {profiles.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 scrollbar-none flex-wrap">
            <span className="text-[11px] text-neutral-400 font-mono uppercase tracking-wider shrink-0">
              Alternar praticante:
            </span>
            {profiles.map((p) => {
              const isSelected = p.id === activeProfileId;
              return (
                <button
                  key={p.id}
                  onClick={() => switchProfile(p.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-all shrink-0 ${
                    isSelected
                      ? 'bg-[#c5a059] text-black font-bold shadow-md'
                      : 'bg-[#121826] text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{p.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${isSelected ? 'bg-black/20 text-black' : 'bg-neutral-800 text-neutral-400'}`}>
                    {p.completedPractices?.length || 0} p.
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Centered Create New Profile Button below user list */}
        <div className="flex justify-center pt-1 border-t border-neutral-800/60">
          <button
            onClick={openProfileModal}
            className="px-5 py-2 rounded-md bg-gradient-to-r from-[#c5a059] to-[#e5c158] hover:from-[#d4af37] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
            title="Criar novo perfil de praticante"
            id="create-profile-spiral-button"
          >
            <Plus className="w-4 h-4" />
            <span>Criar Novo Perfil</span>
          </button>
        </div>
      </div>

      {/* Featured Daily Practice Section */}
      <div className="space-y-3">
        <PraticaDeHoje />
      </div>

      {/* Hero Active Position Card "CONTINUAR A ESPIRAL" */}
      {activeGiro && (
        <div className="bg-gradient-to-br from-[#101626] via-[#141b2e] to-[#090d17] border-2 border-[#c5a059]/50 rounded-xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#c5a059] font-bold flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" />
                POSIÇÃO ATUAL NA ESPIRAL
              </span>

              <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl font-serif font-bold text-[#c5a059] whitespace-nowrap shrink-0">
                  {activeGiro.numberRoman}
                </span>
                <h2 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-white tracking-wide">
                  {activeGiro.title}
                </h2>
              </div>

              <p className="text-sm text-neutral-300 max-w-xl leading-relaxed pt-1">
                {activeGiro.summary}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-neutral-400">
                <span className="px-2.5 py-1 rounded bg-[#07090e] border border-neutral-800">
                  <strong className="text-neutral-200">Virtude:</strong> {activeGiro.virtue}
                </span>
                <span className="px-2.5 py-1 rounded bg-[#07090e] border border-neutral-800">
                  <strong className="text-neutral-200">Ferramenta:</strong> {activeGiro.tool}
                </span>
                <span className="px-2.5 py-1 rounded bg-[#07090e] border border-neutral-800">
                  <strong className="text-[#f3e3a2]">Palavra:</strong> {activeGiro.word}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
              <button
                onClick={() => setSelectedGiroForDetail(activeGiro.id)}
                id="continuar-giro-atual-button"
                className="px-6 py-3.5 rounded-md bg-gradient-to-r from-[#c5a059] to-[#e5c158] hover:from-[#d4af37] hover:to-[#f3e3a2] text-black font-bold tracking-wider uppercase text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#c5a059]/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <span>CONTINUAR GIRO</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* List of All 10 Giros */}
      <div className="space-y-4" id="caminho-dos-giros">
        <h3 className="text-lg font-serif font-bold text-[#f3e3a2] flex items-center gap-2">
          <span>O Caminho dos Dez Giros</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GIROS_DATA.map((giro) => {
            const status = getGiroStatus(giro.id);
            const isUnlocked = unlockedGiros.includes(giro.id);
            const isCurrent = activeGiroId === giro.id;

            return (
              <div
                key={giro.id}
                onClick={() => {
                  if (isUnlocked) {
                    setActiveGiroId(giro.id);
                    setSelectedGiroForDetail(giro.id);
                  }
                }}
                className={`p-5 rounded-lg border transition-all duration-200 relative overflow-hidden ${
                  isUnlocked ? 'cursor-pointer hover:border-[#c5a059]' : 'opacity-60 cursor-not-allowed'
                } ${
                  isCurrent
                    ? 'bg-[#121826] border-[#c5a059] shadow-lg shadow-[#c5a059]/10'
                    : isUnlocked
                    ? 'bg-[#0b0f19] border-neutral-800 hover:bg-[#101524]'
                    : 'bg-[#07090e] border-neutral-900'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-sm font-bold text-[#c5a059] whitespace-nowrap shrink-0">
                      {giro.numberRoman}
                    </span>
                    <h4 className="font-serif font-bold text-base text-white">
                      {giro.title}
                    </h4>
                  </div>

                  {/* Status Badge */}
                  <div>
                    {status === 'CONCLUÍDO' && (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        CONCLUÍDO
                      </span>
                    )}
                    {status === 'EM PRÁTICA' && (
                      <span className="px-2.5 py-1 rounded-full bg-amber-950/80 text-amber-300 border border-amber-800 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1">
                        <Flame className="w-3 h-3 text-amber-400" />
                        EM PRÁTICA
                      </span>
                    )}
                    {status === 'BLOQUEADO' && (
                      <span className="px-2.5 py-1 rounded-full bg-neutral-900 text-neutral-500 border border-neutral-800 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        BLOQUEADO
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed mb-4 line-clamp-2">
                  {giro.summary}
                </p>

                {giro.id === 10 && (
                  <div className="mb-3 p-2 rounded bg-[#c5a059]/10 border border-[#c5a059]/30 text-[11px] text-[#f3e3a2] flex items-center gap-1.5 font-medium">
                    <BookOpen className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                    <span>Os passos avançados após o 10º Giro estão descritos no livro.</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-2 border-t border-neutral-800/60">
                  <span>{giro.practices.length} práticas contemplativas</span>
                  {isUnlocked && (
                    <span className="text-[#c5a059] flex items-center gap-1 font-medium group-hover:translate-x-1 transition-transform">
                      Ver Giro <ChevronRight className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
