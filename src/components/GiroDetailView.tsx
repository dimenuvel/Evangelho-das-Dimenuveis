import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getGiroById } from '../data/girosData';
import { getTranslatedGiro, getTranslatedPractice } from '../utils/dataI18n';
import { ArrowLeft, Play, CheckCircle2, Compass, Clock, Sparkles, Share2 } from 'lucide-react';

interface GiroDetailViewProps {
  giroId: number;
  onBack: () => void;
}

export const GiroDetailView: React.FC<GiroDetailViewProps> = ({ giroId, onBack }) => {
  const { openPracticeTimer, completedPractices, completedGiros, openGiroShareModal, t, language } = useApp();
  const [activeTab, setActivePracticeTab] = useState<'praticas' | 'transmissao'>('praticas');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [giroId]);

  const rawGiro = getGiroById(giroId);
  const giro = rawGiro ? getTranslatedGiro(rawGiro, language) : null;

  if (!giro) {
    return (
      <div className="p-8 text-center">
        <p className="text-neutral-400">{language === 'en' ? 'Turn not found.' : 'Giro não encontrado.'}</p>
        <button onClick={onBack} className="mt-4 text-[#c5a059] underline">
          {language === 'en' ? 'Back' : 'Voltar'}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#c5a059]/20 pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-400 hover:text-[#f3e3a2] transition-colors"
          id="giro-detail-back-button"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'en' ? 'Back to All Turns' : 'Voltar para Todos os Giros'}</span>
        </button>

        <span className="text-xs uppercase font-serif text-[#c5a059]">
          {giro.numberRoman} • {giro.dimension}
        </span>
      </div>

      {/* Hero Giro Header */}
      <div className="bg-gradient-to-br from-[#0c101c] via-[#121826] to-[#07090e] border border-[#c5a059]/40 rounded-xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
          <span className="text-xl sm:text-2xl font-serif font-bold text-[#c5a059] whitespace-nowrap shrink-0">
            {giro.numberRoman}
          </span>
          <h1 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-white tracking-wide">
            {giro.title}
          </h1>
        </div>

        <p className="text-sm text-neutral-300 leading-relaxed max-w-2xl">
          {giro.summary}
        </p>

        {/* Virtues & Word Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#07090e] border border-neutral-800 text-neutral-300">
              <strong className="text-[#c5a059]">{language === 'en' ? 'Virtue:' : 'Virtude:'}</strong> {giro.virtue}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#07090e] border border-neutral-800 text-neutral-300">
              <strong className="text-[#c5a059]">{language === 'en' ? 'Shadow:' : 'Sombra:'}</strong> {giro.shadow}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#07090e] border border-neutral-800 text-neutral-300">
              <strong className="text-[#c5a059]">{language === 'en' ? 'Tool:' : 'Ferramenta:'}</strong> {giro.tool}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/40 text-[#f3e3a2] font-bold">
              {language === 'en' ? 'Word:' : 'Palavra:'} {giro.word}
            </span>
          </div>

          {(completedGiros.includes(giroId) || (giro.practices.length > 0 && giro.practices.every((p) => completedPractices.includes(p.id)))) && (
            <button
              onClick={() => openGiroShareModal(giroId)}
              className="px-4 py-1.5 rounded-lg bg-[#c5a059]/20 hover:bg-[#c5a059]/30 text-[#f3e3a2] border border-[#c5a059]/50 font-bold text-xs flex items-center gap-2 transition-all shadow-sm"
              title="Compartilhar realização com um amigo"
              id="share-giro-accomplishment-button"
            >
              <Share2 className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>{language === 'en' ? 'Share Achievement' : 'Compartilhar Conquista'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Navigation tabs between Practices & Transmissão */}
      <div className="flex border-b border-neutral-800 gap-6">
        <button
          onClick={() => setActivePracticeTab('praticas')}
          className={`pb-3 text-xs uppercase font-bold tracking-wider transition-colors border-b-2 ${
            activeTab === 'praticas'
              ? 'border-[#c5a059] text-[#f3e3a2]'
              : 'border-transparent text-neutral-400 hover:text-neutral-200'
          }`}
        >
          {language === 'en' ? 'Turn Practices' : 'Práticas do Giro'} ({giro.practices.length})
        </button>

        <button
          onClick={() => setActivePracticeTab('transmissao')}
          className={`pb-3 text-xs uppercase font-bold tracking-wider transition-colors border-b-2 ${
            activeTab === 'transmissao'
              ? 'border-[#c5a059] text-[#f3e3a2]'
              : 'border-transparent text-neutral-400 hover:text-neutral-200'
          }`}
        >
          {language === 'en' ? 'Transmission & Teaching' : 'Transmissão & Ensino'}
        </button>
      </div>

      {/* Tab 1: Practices List */}
      {activeTab === 'praticas' && (
        <div className="space-y-4">
          <h3 className="text-sm uppercase tracking-wider text-neutral-400 font-semibold">
            {language === 'en' ? 'Exercises of Turn' : 'Exercícios do Giro'} {giro.numberRoman}
          </h3>

          <div className="space-y-4">
            {giro.practices.map((rawPractice, index) => {
              const practice = getTranslatedPractice(rawPractice, language);
              const isDone = completedPractices.includes(practice.id);

              return (
                <div
                  key={practice.id}
                  className="bg-[#0b0f19] border border-neutral-800 hover:border-[#c5a059]/40 rounded-lg p-5 space-y-3 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-[#c5a059]/20 text-[#f3e3a2] font-bold">
                          {language === 'en' ? 'Exercise' : 'Exercício'} {index + 1}
                        </span>
                        {isDone && (
                          <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {t('praticaHoje.completedTag')}
                          </span>
                        )}
                      </div>
                      <h4 className="font-serif font-bold text-lg text-white">
                        {practice.title}
                      </h4>
                    </div>

                    <button
                      onClick={() => openPracticeTimer(practice)}
                      className="px-5 py-2.5 rounded-md bg-gradient-to-r from-[#c5a059] to-[#e5c158] hover:from-[#d4af37] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-[#c5a059]/20 transition-all self-start sm:self-auto"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{isDone ? (language === 'en' ? 'PRACTICE AGAIN' : 'PRATICAR NOVAMENTE') : t('praticaHoje.startBtn')}</span>
                    </button>
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {practice.shortDescription}
                  </p>

                  <div className="p-3 bg-[#07090e] rounded-lg border-l-2 border-[#c5a059] text-xs text-neutral-300 leading-relaxed">
                    <p className="font-semibold text-[#f3e3a2] text-[10px] uppercase tracking-wider mb-0.5">
                      {language === 'en' ? 'EXECUTION INSTRUCTIONS' : 'INSTRUÇÕES DE EXECUÇÃO'}
                    </p>
                    <p>{practice.instructions}</p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-2 border-t border-neutral-800">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#c5a059]" />
                      {language === 'en' ? 'Suggested duration:' : 'Duração sugerida:'} {practice.suggestedDurationMinutes} {t('praticaHoje.min')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Advanced Steps Message for 10th Giro (Giro X) */}
          {giro.id === 10 && (
            <div className="p-6 bg-gradient-to-r from-[#121826] via-[#1a2236] to-[#07090e] border-2 border-[#c5a059]/60 rounded-xl space-y-3 shadow-2xl relative overflow-hidden mt-6">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none text-5xl">📖</div>
              <div className="flex items-center gap-2 text-[#f3e3a2] font-serif font-bold text-base sm:text-lg">
                <Sparkles className="w-5 h-5 text-[#c5a059] shrink-0" />
                <h3>{language === 'en' ? 'Advanced Spiral Steps' : 'Passos Avançados da Espiral'}</h3>
              </div>
              <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed max-w-2xl">
                {language === 'en'
                  ? 'Upon completing the 10th Turn (The Crown / Return to Center), the advanced steps, rituals, and deeper practices of the Spiral are detailed in full in the book Gospel of Dimenuous.'
                  : 'Após a conclusão do 10º Giro (A Coroa / Retorno ao Centro), as etapas, rituais e aprofundamentos avançados da Espiral estão detalhados e delineados na íntegra no livro Evangelho das Dimenúveis.'
                }
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Transmissão & Ensino */}
      {activeTab === 'transmissao' && (
        <div className="space-y-6">
          {/* Transmissão */}
          <div className="bg-[#0b0f19] border border-[#c5a059]/30 rounded-lg p-6 space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#c5a059] px-2.5 py-0.5 rounded bg-[#c5a059]/20 inline-block">
              {language === 'en' ? 'CANONICAL TRANSMISSION' : 'TRANSMISSÃO CANÔNICA'}
            </span>
            <p className="font-serif italic text-base text-neutral-200 leading-relaxed">
              "{giro.transmissaoText}"
            </p>
          </div>

          {/* Insight */}
          <div className="bg-[#0b0f19] border border-neutral-800 rounded-lg p-6 space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 px-2.5 py-0.5 rounded bg-amber-950/50 border border-amber-800/50 inline-block">
              {language === 'en' ? 'SPIRAL INSIGHT' : 'INSIGHT DA ESPIRAL'}
            </span>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {giro.insightText}
            </p>
          </div>

          {/* Versículo */}
          <div className="bg-[#0b0f19] border border-neutral-800 rounded-lg p-6 space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-300 px-2.5 py-0.5 rounded bg-indigo-950/50 border border-indigo-800/50 inline-block">
              {language === 'en' ? 'RECOGNITION VERSE' : 'VERSÍCULO DO RECONHECIMENTO'}
            </span>
            <p className="font-serif text-sm text-[#f3e3a2] italic leading-relaxed">
              "{giro.versiculoText}"
            </p>
          </div>

          {/* Fechamento */}
          <div className="bg-[#0b0f19] border border-neutral-800 rounded-lg p-6 space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 px-2.5 py-0.5 rounded bg-emerald-950/50 border border-emerald-800/50 inline-block">
              {language === 'en' ? 'CLOSING REFLECTION' : 'FECHAMENTO DO CARA'}
            </span>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {giro.fechamentoText}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
