import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PraticaDeHoje } from './PraticaDeHoje';
import { getGiroById, GIROS_DATA } from '../data/girosData';
import { getRandomHumorousQuote, HumorousQuote } from '../data/humorousQuotes';
import { Compass, Flame, Sparkles, BookOpen, ArrowRight, Quote, RefreshCw, Sun, Sunrise, Moon, User, CheckCircle2, Play } from 'lucide-react';
import { GalaxySpiral } from './GalaxySpiral';

export const HomeScreen: React.FC = () => {
  const {
    navigateTo,
    activeGiroId,
    openSplash,
    activeProfile,
    completedPractices,
    completedGiros,
    openProfileModal
  } = useApp();

  const [quote, setQuote] = useState<HumorousQuote>(getRandomHumorousQuote);

  const activeGiro = getGiroById(activeGiroId);

  const handleNewQuote = () => {
    setQuote(getRandomHumorousQuote());
  };

  // Time of day greeting calculation
  const getGreetingData = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return { text: 'Bom dia', icon: <Sunrise className="w-5 h-5 text-amber-300" /> };
    }
    if (hour >= 12 && hour < 18) {
      return { text: 'Boa tarde', icon: <Sun className="w-5 h-5 text-amber-400" /> };
    }
    return { text: 'Boa noite', icon: <Moon className="w-5 h-5 text-indigo-300" /> };
  };

  const greeting = getGreetingData();
  const userName = activeProfile?.name || 'Praticante';
  const totalPracticesCount = GIROS_DATA.reduce((acc, g) => acc + g.practices.length, 0);
  const hasStarted = completedPractices.length > 0;

  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-4 space-y-6">
      {/* Hero Welcome Banner */}
      <div className="text-center space-y-4 pt-0">
        <div
          onClick={openSplash}
          className="w-32 h-32 rounded-full bg-gradient-to-br from-[#c5a059]/30 to-amber-900/40 border border-[#c5a059]/50 flex items-center justify-center mx-auto shadow-2xl shadow-[#c5a059]/20 relative overflow-hidden group cursor-pointer"
          title="Ver Tela de Abertura / Poster"
        >
          <GalaxySpiral className="w-24 h-24 text-[#f3e3a2] transition-transform duration-700 group-hover:scale-105" />
        </div>

        <div className="space-y-2">
          <p className="text-xs sm:text-sm font-serif italic text-[#c5a059] tracking-wider max-w-lg mx-auto">
            "O LIVRO TRANSMITE. O APP PRATICA. O TARÔ REFLETE. A ESPIRAL CONDUZ."
          </p>
        </div>

        <p className="text-xs text-neutral-400 max-w-xl mx-auto leading-relaxed pt-1">
          Companheiro prático do <strong className="text-neutral-200">Evangelho das Dimenúveis</strong>.
          Percorra os Dez Giros da Espiral com presença, contemplação e serenidade hermética.
        </p>

        {/* Personalized Time-of-Day Greeting & User Progress Card */}
        <div className="max-w-xl mx-auto pt-2">
          <div className="bg-gradient-to-br from-[#101726] via-[#0d1220] to-[#07090e] border border-[#c5a059]/50 rounded-xl p-4 sm:p-5 text-left space-y-3 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#c5a059]/20 pb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-[#c5a059]/15 border border-[#c5a059]/30">
                  {greeting.icon}
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-serif font-bold text-[#f3e3a2] flex items-center gap-2">
                    <span>{greeting.text}, {userName}!</span>
                  </h2>
                  <p className="text-[11px] text-neutral-400 font-mono">
                    {activeProfile?.age ? `${activeProfile.age} anos • ` : ''}
                    {activeProfile?.sex ? `${activeProfile.sex} • ` : ''}
                    Praticante da Espiral
                  </p>
                </div>
              </div>

              <button
                onClick={openProfileModal}
                className="px-2.5 py-1.5 rounded bg-[#161d2e] hover:bg-neutral-800 border border-[#c5a059]/30 text-[11px] text-[#f3e3a2] flex items-center gap-1.5 font-medium transition-colors"
                title="Trocar ou gerenciar praticantes"
              >
                <User className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Perfil</span>
              </button>
            </div>

            {/* Progress Status or Encouragement Incentive */}
            {!hasStarted ? (
              <div className="p-3.5 rounded-lg bg-[#07090e] border border-amber-500/30 space-y-2">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Sua Jornada Começa Agora</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Sua caminhada na Espiral está prestes a iniciar. Dedique alguns minutos para realizar sua primeira prática no <strong className="text-[#f3e3a2]">Giro I ({activeGiro?.title})</strong> e desperte sua percepção no Padrão.
                </p>
                <button
                  onClick={() => navigateTo('espiral')}
                  className="mt-1 px-4 py-2 rounded bg-gradient-to-r from-[#c5a059] to-[#e5c158] hover:from-[#d4af37] text-black text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-black" />
                  <span>Iniciar Primeira Prática</span>
                </button>
              </div>
            ) : (
              <div className="p-3.5 rounded-lg bg-[#07090e] border border-[#c5a059]/25 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#c5a059] uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Progresso do Praticante</span>
                  </span>
                  <span className="text-amber-200 font-mono text-[11px]">
                    {completedPractices.length}/{totalPracticesCount}
                  </span>
                </div>

                <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#c5a059] to-[#f3e3a2] h-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.round((completedPractices.length / totalPracticesCount) * 100))}%` }}
                  ></div>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed pt-0.5">
                  Você já completou <strong className="text-white">{completedPractices.length} práticas</strong> e <strong className="text-white">{completedGiros.length} de 10 Giros</strong>. Posição atual: <strong className="text-[#f3e3a2]">{activeGiro?.numberRoman} — {activeGiro?.title}</strong>.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Humorous Random Quote Box */}
        <div className="max-w-xl mx-auto pt-1">
          <div className="bg-[#0a0e1a]/80 border border-[#c5a059]/30 hover:border-[#c5a059]/60 rounded-xl p-3.5 sm:p-4 text-center space-y-1.5 relative shadow-lg group transition-all">
            <div className="flex items-center justify-between text-[#c5a059]/70 text-[10px] uppercase font-mono tracking-widest pb-1 border-b border-[#c5a059]/15">
              <span className="flex items-center gap-1">
                <Quote className="w-3 h-3 text-[#f3e3a2]" />
                <span>Citação do Evangelho</span>
              </span>
              <button
                onClick={handleNewQuote}
                className="p-1 hover:text-[#f3e3a2] hover:bg-[#c5a059]/10 rounded transition-colors flex items-center gap-1 text-[10px]"
                title="Gerar outra citação"
                id="refresh-quote-button"
              >
                <RefreshCw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
                <span className="hidden sm:inline">Outra</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm font-serif italic text-amber-100/90 leading-relaxed px-2">
              "{quote.text}"
            </p>

            {quote.source && (
              <p className="text-[10px] font-mono text-[#c5a059]/80 uppercase tracking-wider pt-0.5">
                — {quote.source}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Primary Section: PRÁTICA DE HOJE */}
      <div className="space-y-3">
        <PraticaDeHoje />
      </div>

      {/* Quick Access Grid: 3 DESTINATIONS */}
      <div className="space-y-4">
        <h3 className="text-xs uppercase tracking-widest font-bold text-[#c5a059] flex items-center gap-2">
          <span>TRÊS CAMINHOS DA ESPIRAL</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {/* Destination 1: A ESPIRAL & PRÁTICAS */}
          <div
            onClick={() => navigateTo('espiral')}
            id="dest-espiral-button"
            className="bg-[#0b0f19] border border-[#c5a059]/30 hover:border-[#c5a059] p-5 rounded-lg cursor-pointer hover:bg-[#111728] transition-all group shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-[#c5a059]/20 border border-[#c5a059]/40 flex items-center justify-center text-[#f3e3a2] group-hover:scale-110 transition-transform shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#c5a059] block">
                    GIRO ATUAL: {activeGiro?.numberRoman || 'I'}
                  </span>
                  <h4 className="font-serif font-bold text-base text-white mt-0.5 group-hover:text-[#f3e3a2]">
                    🌀 A Espiral & Práticas
                  </h4>
                </div>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Prática meditativa do dia e a jornada encadeada dos 10 Giros contemplativos.
              </p>
            </div>

            <div className="pt-4 text-xs font-semibold text-[#c5a059] flex items-center justify-between border-t border-neutral-800 mt-4">
              <span>Iniciar & Ver Giros</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Destination 2: ORÁCULO */}
          <div
            onClick={() => navigateTo('oraculo')}
            id="dest-oraculo-button"
            className="bg-[#0b0f19] border border-purple-500/30 hover:border-purple-400 p-5 rounded-lg cursor-pointer hover:bg-[#111728] transition-all group shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400 block">
                    CONTEMPLAÇÃO
                  </span>
                  <h4 className="font-serif font-bold text-base text-white mt-0.5 group-hover:text-purple-200">
                    🔮 Oráculo
                  </h4>
                </div>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Consulte os 22 Arcanos Maiores para uma reflexão de 3 cartas alinhada ao seu Giro.
              </p>
            </div>

            <div className="pt-4 text-xs font-semibold text-purple-300 flex items-center justify-between border-t border-neutral-800 mt-4">
              <span>Consultar Tarô</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Destination 3: EVANGELHO */}
          <div
            onClick={() => navigateTo('evangelho')}
            id="dest-evangelho-button"
            className="bg-[#0b0f19] border border-blue-500/30 hover:border-blue-400 p-5 rounded-lg cursor-pointer hover:bg-[#111728] transition-all group shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-300 group-hover:scale-110 transition-transform shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400 block">
                    TRANSMISSÃO
                  </span>
                  <h4 className="font-serif font-bold text-base text-white mt-0.5 group-hover:text-blue-200">
                    📖 Evangelho
                  </h4>
                </div>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Leia a transmissão integral do Evangelho das Dimenúveis, Salmos e Capítulos.
              </p>
            </div>

            <div className="pt-4 text-xs font-semibold text-blue-300 flex items-center justify-between border-t border-neutral-800 mt-4">
              <span>Abrir Leitor</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
