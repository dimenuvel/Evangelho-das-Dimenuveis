import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getGiroById } from '../data/girosData';
import { getTranslatedGiro } from '../utils/dataI18n';
import {
  Share2,
  Copy,
  Check,
  ExternalLink,
  Mail,
  Send,
  X,
  Sparkles,
  Trophy,
  MessageCircle
} from 'lucide-react';

const OFFICIAL_GITHUB_URL = 'https://dimenuvel.github.io/Evangelho-das-Dimenuveis-site/';

export const GiroShareModal: React.FC = () => {
  const { completedGiroToShare, closeGiroShareModal, activeProfile, language } = useApp();
  const [copied, setCopied] = useState(false);

  if (completedGiroToShare === null) {
    return null;
  }

  const rawGiro = getGiroById(completedGiroToShare);
  if (!rawGiro) {
    return null;
  }

  const giro = getTranslatedGiro(rawGiro, language);

  const practitionerName = activeProfile?.name
    ? activeProfile.name
    : (language === 'en' ? 'Practitioner' : 'Praticante');
  const isFullSpiral = completedGiroToShare === 10;

  // Generate share message for messaging app, social media, or email
  const generatedMessage = isFullSpiral
    ? language === 'en'
      ? `✨ Achievement in the Spiral of the Gospel of Dimenuous ✨\n\nI, ${practitionerName}, completed ALL 10 TURNS OF THE SPIRAL in the Gospel of Dimenuous app!\n\nThe Gospel of Dimenuous is a contemplative path of self-knowledge, presence, and metagnoia — an invitation to reflect, practice silence, and recognize the dimensions of being with complete freedom, without dogmas or judgment.\n\nYou can also join this journey and begin your own Spiral practices! Discover the project on the official site:\n${OFFICIAL_GITHUB_URL}\n\n"Before Silence, there was no word... The Spiral abides."`
      : `✨ Realização na Espiral do Evangelho das Dimenúveis ✨\n\nEu, ${practitionerName}, concluí TODOS OS 10 GIROS DA ESPIRAL no aplicativo do Evangelho das Dimenúveis!\n\nO Evangelho das Dimenúveis é um caminho contemplativo de autoconhecimento, presença e metagnose — um convite para refletir, exercitar o silêncio e reconhecer as dimensões do ser com total liberdade, sem dogmas ou julgamentos.\n\nVocê também pode participar desta jornada e iniciar suas próprias práticas da Espiral! Conheça o projeto oficial e participe através do site:\n${OFFICIAL_GITHUB_URL}\n\n"Antes do Silêncio, não havia palavra... A Espiral abida."`
    : language === 'en'
      ? `🌀 Achievement in the Gospel of Dimenuous 🌀\n\nI, ${practitionerName}, completed Turn ${giro.numberRoman} — ${giro.title} (${giro.dimension}) in the Gospel of Dimenuous app!\n\nThe Gospel of Dimenuous is a contemplative path of self-knowledge, presence, and metagnoia — an invitation to reflect, practice silence, and recognize the dimensions of being with complete freedom, without dogmas or judgment.\n\nYou can also join this journey and begin your own Spiral practices! Discover the project on the official site:\n${OFFICIAL_GITHUB_URL}\n\n"Before Silence, there was no word... The Spiral abides."`
      : `🌀 Realização no Evangelho das Dimenúveis 🌀\n\nEu, ${practitionerName}, concluí o Giro ${giro.numberRoman} — ${giro.title} (${giro.dimension}) no aplicativo do Evangelho das Dimenúveis!\n\nO Evangelho das Dimenúveis é um caminho contemplativo de autoconhecimento, presença e metagnose — um convite para refletir, exercitar o silêncio e reconhecer as dimensões do ser com total liberdade, sem dogmas ou julgamentos.\n\nVocê também pode participar desta jornada e iniciar suas próprias práticas da Espiral! Conheça o projeto e participe através do site oficial:\n${OFFICIAL_GITHUB_URL}\n\n"Antes do Silêncio, não havia palavra... A Espiral abida."`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Erro ao copiar texto:', err);
    }
  };

  const handleWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(generatedMessage)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(OFFICIAL_GITHUB_URL)}&text=${encodeURIComponent(generatedMessage)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleEmail = () => {
    const subject = language === 'en'
      ? `Achievement in the Gospel of Dimenuous — Turn ${giro.numberRoman}`
      : `Realização no Evangelho das Dimenúveis — Giro ${giro.numberRoman}`;
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(generatedMessage)}`;
    window.open(mailtoUrl, '_blank');
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share({
          title: language === 'en'
            ? `Achievement in the Gospel of Dimenuous — Turn ${giro.numberRoman}`
            : `Realização no Evangelho das Dimenúveis — Giro ${giro.numberRoman}`,
          text: generatedMessage,
          url: OFFICIAL_GITHUB_URL
        });
      } catch (err) {
        // User dismissed share drawer or unsupported
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md overflow-y-auto p-4 sm:p-6 flex justify-center items-start sm:items-center min-h-full animate-in fade-in duration-200"
      onClick={closeGiroShareModal}
    >
      <div
        className="bg-gradient-to-b from-[#0e1424] via-[#0b0f19] to-[#07090e] border border-[#c5a059]/40 rounded-2xl max-w-xl w-full p-5 sm:p-7 space-y-5 shadow-2xl relative text-neutral-200 my-auto"
        onClick={(e) => e.stopPropagation()}
        id="giro-share-modal"
      >
        {/* Close Button */}
        <button
          onClick={closeGiroShareModal}
          className="absolute top-4 right-4 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800/80 transition-colors"
          title={language === 'en' ? 'Close' : 'Fechar'}
          id="close-giro-share-modal-button"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/40 text-[#f3e3a2] text-xs font-bold tracking-widest uppercase">
            <Trophy className="w-4 h-4 text-[#c5a059]" />
            <span>
              {isFullSpiral
                ? (language === 'en' ? 'SPIRAL COMPLETED' : 'ESPIRAL COMPLETA')
                : (language === 'en' ? 'TURN COMPLETED' : 'GIRO CONCLUÍDO')}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
            {language === 'en' ? `Congratulations, ${practitionerName}!` : `Parabéns, ${practitionerName}!`}
          </h2>

          <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
            {language === 'en' ? (
              <>
                You completed <strong className="text-[#f3e3a2]">Turn {giro.numberRoman} — {giro.title}</strong>! Would you like to share your achievement and invite a friend to join the Gospel?
              </>
            ) : (
              <>
                Você concluiu o <strong className="text-[#f3e3a2]">Giro {giro.numberRoman} — {giro.title}</strong>! Deseja compartilhar sua realização e convidar um amigo para participar do Evangelho?
              </>
            )}
          </p>
        </div>

        {/* Generated Message Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-neutral-300">
            <span className="font-semibold uppercase tracking-wider text-[11px] text-[#c5a059] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
              {language === 'en' ? 'Message for Sending / Sharing:' : 'Mensagem para Envio / Compartilhamento:'}
            </span>

            <button
              onClick={handleCopy}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 border ${
                copied
                  ? 'bg-emerald-600 border-emerald-500 text-white'
                  : 'bg-[#121826] hover:bg-neutral-800 border-[#c5a059]/40 text-[#f3e3a2]'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'Copied!' : 'Copiado!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'Copy Message' : 'Copiar Mensagem'}</span>
                </>
              )}
            </button>
          </div>

          <div className="relative">
            <textarea
              readOnly
              rows={5}
              value={generatedMessage}
              className="w-full bg-[#07090e] border border-neutral-800 rounded-xl p-3 text-xs text-neutral-200 font-sans leading-relaxed resize-none focus:outline-none focus:border-[#c5a059]/60"
            />
          </div>
        </div>

        {/* Quick Share Buttons */}
        <div className="space-y-2.5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block text-center">
            {language === 'en' ? 'Share via app or email:' : 'Compartilhar via aplicativo ou e-mail:'}
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={handleWhatsApp}
              className="px-3 py-2.5 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/40 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={handleTelegram}
              className="px-3 py-2.5 rounded-lg bg-[#0088cc]/20 hover:bg-[#0088cc]/30 text-[#0088cc] border border-[#0088cc]/40 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span>Telegram</span>
            </button>

            <button
              onClick={handleEmail}
              className="px-3 py-2.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <Mail className="w-4 h-4" />
              <span>E-mail</span>
            </button>

            {typeof navigator !== 'undefined' && 'share' in navigator ? (
              <button
                onClick={handleNativeShare}
                className="px-3 py-2.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <Share2 className="w-4 h-4" />
                <span>{language === 'en' ? 'Others' : 'Outros'}</span>
              </button>
            ) : (
              <button
                onClick={handleCopy}
                className="px-3 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <Copy className="w-4 h-4" />
                <span>{language === 'en' ? 'Copy' : 'Copiar'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Official Site Link Button */}
        <div>
          <a
            href={OFFICIAL_GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl bg-[#07090e]/80 hover:bg-[#121826] border border-[#c5a059]/40 text-[#f3e3a2] font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
            id="visit-official-site-button"
          >
            <span>{language === 'en' ? 'Visit Official Page on GitHub' : 'Visitar Página Oficial no GitHub'}</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#c5a059]" />
          </a>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex justify-center">
          <button
            onClick={closeGiroShareModal}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#c5a059] to-[#e5c158] hover:from-[#d4af37] text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#c5a059]/20 transition-all hover:scale-105"
            id="close-giro-share-modal-footer"
          >
            {language === 'en' ? 'Continue in the Spiral' : 'Continuar na Espiral'}
          </button>
        </div>
      </div>
    </div>
  );
};
