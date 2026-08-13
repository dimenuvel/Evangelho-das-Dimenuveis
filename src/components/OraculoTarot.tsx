import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { TAROT_CARDS } from '../data/tarotData';
import { getGiroById } from '../data/girosData';
import { TarotCard, TarotReading } from '../types';
import { TarotCardGraphic } from './TarotCardGraphic';
import { Sparkles, RotateCcw, Eye, Compass, History, Layers, Clock, Lock } from 'lucide-react';

const ONE_HOUR_MS = 60 * 60 * 1000;

const GalaxySpiralGraphic: React.FC = () => {
  // Generate logarithmic spiral arm paths for a realistic spiral galaxy
  const spiralPaths = React.useMemo(() => {
    const generateArm = (startAngle: number, maxTheta: number, growth: number) => {
      const points: string[] = [];
      const steps = 50;
      for (let i = 0; i <= steps; i++) {
        const t = (i / steps) * maxTheta;
        const r = 3 + growth * Math.pow(t, 1.25);
        const angle = t + startAngle;
        const x = 100 + r * Math.cos(angle);
        const y = 100 + r * Math.sin(angle);
        points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`);
      }
      return points.join(' ');
    };

    return [
      { d: generateArm(0, Math.PI * 3.4, 4.2), width: 3.8, opacity: 0.95, grad: 'url(#goldArmGrad)' },
      { d: generateArm(Math.PI, Math.PI * 3.4, 4.2), width: 3.8, opacity: 0.95, grad: 'url(#goldArmGrad)' },
      { d: generateArm(Math.PI * 0.5, Math.PI * 2.8, 3.8), width: 2.4, opacity: 0.7, grad: 'url(#purpleArmGrad)' },
      { d: generateArm(Math.PI * 1.5, Math.PI * 2.8, 3.8), width: 2.4, opacity: 0.7, grad: 'url(#purpleArmGrad)' },
    ];
  }, []);

  // Generate stardust stars along the galaxy arms
  const stardust = React.useMemo(() => {
    const stars = [];
    const arms = [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5];
    let count = 0;

    arms.forEach((armAngle, armIdx) => {
      const maxSteps = armIdx % 2 === 0 ? 26 : 18;
      const growth = armIdx % 2 === 0 ? 4.2 : 3.8;
      const maxTheta = armIdx % 2 === 0 ? Math.PI * 3.4 : Math.PI * 2.8;

      for (let i = 1; i <= maxSteps; i++) {
        const t = (i / maxSteps) * maxTheta;
        const r = 3 + growth * Math.pow(t, 1.25);
        const angle = t + armAngle;
        const scatterX = (Math.sin(count * 12.7) * 4);
        const scatterY = (Math.cos(count * 15.3) * 4);
        const x = 100 + r * Math.cos(angle) + scatterX;
        const y = 100 + r * Math.sin(angle) + scatterY;

        stars.push({
          id: count++,
          cx: x,
          cy: y,
          r: (i < 4 ? 2.2 : Math.random() * 1.6 + 0.6),
          color: count % 4 === 0 ? '#ffffff' : count % 4 === 1 ? '#f3e3a2' : count % 4 === 2 ? '#e5c158' : '#d8b4fe',
          opacity: Math.random() * 0.4 + 0.6,
        });
      }
    });

    return stars;
  }, []);

  return (
    <div className="relative w-60 h-60 sm:w-72 sm:h-72 flex items-center justify-center select-none my-2">
      {/* Outer Cosmic Ambient Nebula (Slow Rotation) */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
        className="absolute inset-0 rounded-full bg-radial from-[#c5a059]/25 via-[#8b5cf6]/15 to-transparent blur-2xl pointer-events-none"
      />

      {/* Main Galaxy Spiral Body (Clockwise Rotation) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
        className="relative w-full h-full flex items-center justify-center drop-shadow-[0_0_35px_rgba(197,160,89,0.9)]"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
          <defs>
            {/* Main Gold Gradient */}
            <linearGradient id="goldArmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="25%" stopColor="#f3e3a2" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#c5a059" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8c6a2d" stopOpacity="0" />
            </linearGradient>

            {/* Secondary Violet-Gold Gradient */}
            <linearGradient id="purpleArmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="35%" stopColor="#e9d5ff" stopOpacity="0.85" />
              <stop offset="70%" stopColor="#c5a059" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#4c1d95" stopOpacity="0" />
            </linearGradient>

            {/* Galactic Core Glow */}
            <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="20%" stopColor="#f3e3a2" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#c5a059" stopOpacity="0.6" />
              <stop offset="80%" stopColor="#a855f7" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>

            {/* Bloom Filter */}
            <filter id="galaxyBloom" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outer Constellation Rings */}
          <circle cx="100" cy="100" r="95" fill="none" stroke="#c5a059" strokeWidth="0.8" strokeDasharray="3 6" opacity="0.4" />
          <circle cx="100" cy="100" r="75" fill="none" stroke="#f3e3a2" strokeWidth="0.5" strokeDasharray="2 8" opacity="0.3" />

          {/* Cardinal Orbit Markers */}
          <circle cx="100" cy="5" r="3" fill="#f3e3a2" className="animate-ping opacity-75" />
          <circle cx="195" cy="100" r="3" fill="#f3e3a2" />
          <circle cx="100" cy="195" r="3" fill="#f3e3a2" />
          <circle cx="5" cy="100" r="3" fill="#f3e3a2" />

          {/* Logarithmic Spiral Galaxy Arms */}
          <g filter="url(#galaxyBloom)">
            {spiralPaths.map((arm, idx) => (
              <path
                key={idx}
                d={arm.d}
                fill="none"
                stroke={arm.grad}
                strokeWidth={arm.width}
                strokeLinecap="round"
                opacity={arm.opacity}
              />
            ))}
          </g>

          {/* Stardust Particles Scattered Along Arms */}
          <g>
            {stardust.map((s) => (
              <circle
                key={s.id}
                cx={s.cx}
                cy={s.cy}
                r={s.r}
                fill={s.color}
                opacity={s.opacity}
              />
            ))}
          </g>

          {/* Radiant Galactic Core */}
          <circle cx="100" cy="100" r="28" fill="url(#coreGlow)" />
          <circle cx="100" cy="100" r="8" fill="#ffffff" className="drop-shadow-[0_0_12px_#ffffff]" />

          {/* Multi-Point Core Starlight Beams */}
          <g transform="translate(100,100)">
            <polygon points="0,-18 3,-4 18,0 3,4 0,18 -3,4 -18,0 -3,-4" fill="#ffffff" />
            <polygon points="0,-12 2,-2 12,0 2,2 0,12 -2,2 -12,0 -2,-2" fill="#f3e3a2" transform="rotate(45)" />
          </g>
        </svg>
      </motion.div>

      {/* Pulsing Center Diamond Gem */}
      <motion.div
        animate={{ scale: [0.85, 1.25, 0.85], opacity: [0.7, 1, 0.7] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        className="absolute w-7 h-7 bg-gradient-to-r from-amber-100 via-white to-amber-200 rounded-full blur-[2px] shadow-[0_0_24px_#ffffff]"
      />
    </div>
  );
};

export const OraculoTarot: React.FC = () => {
  const { activeGiroId, saveTarotReading, tarotReadings } = useApp();

  const [currentReading, setCurrentReading] = useState<TarotReading | null>(null);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [activeTabMode, setActiveTabMode] = useState<'oraculo' | 'baralho'>('oraculo');
  const [selectedCardForModal, setSelectedCardForModal] = useState<{
    card: TarotCard;
    positionTitle?: string;
  } | null>(null);
  const [nowTime, setNowTime] = useState<number>(Date.now());

  // Live timer tick for cooldown
  useEffect(() => {
    const interval = setInterval(() => {
      setNowTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const activeGiro = getGiroById(activeGiroId);

  // Latest reading from history
  const latestReading = tarotReadings && tarotReadings.length > 0 ? tarotReadings[0] : null;

  // Determine last draw timestamp
  const getLastTimestamp = (reading: TarotReading | null): number => {
    if (!reading) return 0;
    if (reading.timestamp) return reading.timestamp;
    const parsed = Date.parse(reading.date);
    return isNaN(parsed) ? 0 : parsed;
  };

  const lastDrawTimestamp = getLastTimestamp(latestReading);
  const timeSinceLastDraw = lastDrawTimestamp ? nowTime - lastDrawTimestamp : Infinity;
  const cooldownRemainingMs = Math.max(0, ONE_HOUR_MS - timeSinceLastDraw);
  const isCooldownActive = cooldownRemainingMs > 0;

  // Auto-display latest reading if user enters during active cooldown and hasn't manually picked a reading
  useEffect(() => {
    if (!currentReading && latestReading && isCooldownActive) {
      setCurrentReading(latestReading);
    }
  }, [latestReading, isCooldownActive, currentReading]);

  const formatCooldown = (ms: number) => {
    const totalSeconds = Math.ceil(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s`;
  };

  // Draw 3 random unique cards
  const handleDrawCards = () => {
    if (isCooldownActive) return;

    setIsFlipping(true);
    setTimeout(() => {
      // Shuffle cards
      const shuffled = [...TAROT_CARDS].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);
      const now = Date.now();

      const reading: TarotReading = {
        timestamp: now,
        date: new Date(now).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        activeGiroAtTime: activeGiroId,
        cards: [
          { position: 'onde_estou', positionTitle: '1. PRESENÇA ATUAL (ONDE ESTOU AGORA)', card: selected[0] },
          { position: 'oque_esquecendo', positionTitle: '2. SOMBRA DA PRESENÇA (O QUE ESQUEÇO AGORA)', card: selected[1] },
          { position: 'oque_ja_aqui', positionTitle: '3. ANCORAGEM NO AGORA (O QUE JÁ ESTÁ PRESENTE)', card: selected[2] },
        ]
      };

      setCurrentReading(reading);
      saveTarotReading(reading);
      setIsFlipping(false);
    }, 2800);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#f3e3a2] text-xs font-bold tracking-widest uppercase">
          <Sparkles className="w-4 h-4 text-[#c5a059]" />
          <span>ORÁCULO CONTEMPLATIVO</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-wide">
          O Tarô das Dimenúveis
        </h1>
        <p className="text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
          "O baralho não adivinha acontecimentos futuros; ele reflete exclusivamente sua presença no momento presente. O Tarô reflete o Agora, a Espiral conduz."
        </p>

        {/* View Switcher: Oráculo vs Galeria do Baralho */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={() => setActiveTabMode('oraculo')}
            className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wider uppercase flex items-center gap-2 transition-all ${
              activeTabMode === 'oraculo'
                ? 'bg-[#c5a059] text-black shadow-lg shadow-[#c5a059]/20'
                : 'bg-[#0b0f19] text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tiragem de 3 Cartas</span>
          </button>

          <button
            onClick={() => setActiveTabMode('baralho')}
            className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wider uppercase flex items-center gap-2 transition-all ${
              activeTabMode === 'baralho'
                ? 'bg-[#c5a059] text-black shadow-lg shadow-[#c5a059]/20'
                : 'bg-[#0b0f19] text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Baralho Completo ({TAROT_CARDS.length})</span>
          </button>
        </div>
      </div>

      {activeTabMode === 'baralho' ? (
        /* FULL DECK GALLERY SHOWCASE */
        <div className="space-y-6">
          <div className="bg-[#0b0f19] border border-[#c5a059]/30 rounded-lg p-4 sm:p-6 text-center space-y-2">
            <h3 className="font-serif font-bold text-xl text-[#f3e3a2]">
              Os Arcanos Maiores & A Carta Secreta
            </h3>
            <p className="text-xs text-neutral-300 max-w-lg mx-auto">
              Clique em qualquer carta para virar e contemplar sua iconografia clássica, significados profundos da presença atual e conexões com a Espiral.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center">
            {TAROT_CARDS.map((card) => (
              <div
                key={card.id}
                onClick={() => setSelectedCardForModal({ card, positionTitle: `ARCANO ${card.number}` })}
                className="flex flex-col items-center group cursor-pointer"
              >
                <TarotCardGraphic card={card} size="sm" interactiveFlip={false} />
                <span className="text-[11px] font-serif font-bold text-neutral-300 mt-2 group-hover:text-[#f3e3a2] transition-colors text-center truncate max-w-[130px]">
                  {card.number} — {card.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* ORÁCULO DRAW TAB */
        <>
          {/* Transition Screen with Spinning Spiral or Draw Action or Current Reading View */}
          {isFlipping ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-[#0c101c] via-[#141b2e] to-[#07090e] border border-[#c5a059]/50 rounded-2xl p-8 sm:p-14 text-center flex flex-col items-center justify-center min-h-[420px] shadow-2xl relative overflow-hidden space-y-6"
            >
              {/* Background Ambient Glow */}
              <div className="absolute w-80 h-80 bg-[#c5a059]/15 rounded-full blur-3xl animate-pulse pointer-events-none" />

              {/* Spinning Galaxy Spiral */}
              <div className="relative z-10 flex flex-col items-center justify-center">
                <GalaxySpiralGraphic />

                {/* Text directly below saying MENSAGEM DA ESPIRAL */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6 space-y-2 text-center"
                >
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#f3e3a2] tracking-[0.2em] uppercase drop-shadow-[0_0_15px_rgba(243,227,162,0.4)]">
                    MENSAGEM DA ESPIRAL
                  </h2>
                  <p className="text-xs text-neutral-300 font-serif italic max-w-sm mx-auto animate-pulse">
                    Sintonizando a presença no momento presente...
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ) : !currentReading ? (
            <div className="bg-gradient-to-br from-[#0c101c] via-[#121826] to-[#07090e] border border-[#c5a059]/40 rounded-xl p-8 text-center space-y-6 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-center gap-3 sm:gap-4 my-2">
                {[1, 2, 3].map((num) => (
                  <div
                    key={num}
                    className="w-20 sm:w-24 h-32 sm:h-36 rounded-lg border-2 border-[#c5a059] flex items-center justify-center bg-[#07090e]/80 shadow-2xl shadow-[#c5a059]/20 animate-pulse relative"
                  >
                    <div className="text-center space-y-1">
                      <span className="text-xl sm:text-2xl">🔮</span>
                      <span className="text-[9px] sm:text-[10px] font-serif font-bold text-[#c5a059] block tracking-widest">
                        TARÔ
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 max-w-lg mx-auto">
                <h3 className="font-serif text-2xl font-bold text-[#f3e3a2]">
                  Tiragem de Três Cartas de Presença
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Consulte as cartas para reconhecer sua presença no momento presente, a sombra esquecida do agora e aquilo que já está manifestado na sua consciência.
                </p>
              </div>

              {isCooldownActive && (
                <div className="max-w-md mx-auto p-3.5 bg-[#1c130b] border border-[#c5a059]/40 rounded-lg text-xs text-[#f3e3a2] space-y-1.5 text-center">
                  <div className="flex items-center justify-center gap-1.5 font-bold text-amber-400">
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>LIMITADO A 1 CONSULTA POR HORA</span>
                  </div>
                  <p className="text-neutral-300 text-[11px] leading-relaxed">
                    Para promover a contemplação profunda da presença atual e evitar ansiedade de adivinhação do futuro, novas tiragens são permitidas a cada 60 minutos.
                  </p>
                  <p className="font-mono text-amber-300 font-bold pt-1 text-xs">
                    Próxima tiragem disponível em: {formatCooldown(cooldownRemainingMs)}
                  </p>
                </div>
              )}

              <button
                onClick={handleDrawCards}
                disabled={isFlipping || isCooldownActive}
                id="retirar-cartas-oraculo-button"
                className={`px-8 py-4 rounded-md font-bold tracking-wider uppercase text-xs inline-flex items-center gap-2.5 shadow-xl transition-all ${
                  isCooldownActive
                    ? 'bg-neutral-800 text-neutral-400 border border-neutral-700 cursor-not-allowed opacity-80'
                    : 'bg-gradient-to-r from-[#c5a059] to-[#e5c158] hover:from-[#d4af37] text-black shadow-[#c5a059]/20 hover:scale-105 active:scale-95'
                }`}
              >
                {isCooldownActive ? (
                  <>
                    <Lock className="w-4 h-4 text-amber-400" />
                    <span>INDISPONÍVEL ({formatCooldown(cooldownRemainingMs)})</span>
                  </>
                ) : isFlipping ? (
                  <>
                    <Sparkles className="w-4 h-4 fill-current animate-spin" />
                    <span>EMBARALHANDO O BARALHO...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 fill-current" />
                    <span>CONSULTAR O ORÁCULO</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Cooldown Warning Notice if active */}
              {isCooldownActive && (
                <div className="bg-[#18130a] border border-[#c5a059]/40 rounded-lg p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-[#f3e3a2]">
                    <Clock className="w-4 h-4 text-[#c5a059] shrink-0" />
                    <span>
                      <strong>Leitura Ativa da Presença Atual:</strong> Novas tiragens são permitidas a cada 1 hora para cultivar a contemplação do Agora.
                    </span>
                  </div>
                  <span className="font-mono font-bold text-amber-300 bg-[#c5a059]/10 px-3 py-1 rounded border border-[#c5a059]/30 shrink-0">
                    Próxima em: {formatCooldown(cooldownRemainingMs)}
                  </span>
                </div>
              )}

              {/* Cards Display Grid with Graphic Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
                {currentReading.cards.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedCardForModal({ card: item.card, positionTitle: item.positionTitle })}
                    className="w-full bg-[#0b0f19] border border-[#c5a059]/30 hover:border-[#c5a059] rounded-lg p-5 space-y-4 cursor-pointer hover:bg-[#0f1524] transition-all group shadow-xl flex flex-col items-center text-center relative overflow-hidden"
                  >
                    {/* Position Title */}
                    <div className="w-full border-b border-neutral-800 pb-2">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#c5a059] block">
                        {item.positionTitle}
                      </span>
                    </div>

                    {/* Fancy Graphical Tarot Card */}
                    <div className="py-2 flex justify-center">
                      <TarotCardGraphic card={item.card} size="md" interactiveFlip={false} />
                    </div>

                    {/* Tagline */}
                    <p className="text-xs text-neutral-300 italic font-serif leading-relaxed px-2">
                      "{item.card.tagline}"
                    </p>

                    {/* Click for Contemplation */}
                    <div className="w-full pt-2 text-center border-t border-neutral-800/80">
                      <span className="text-[11px] text-[#c5a059] group-hover:underline inline-flex items-center gap-1 font-medium">
                        <Eye className="w-3.5 h-3.5" />
                        Ver Contemplação Detalhada
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* REFLEXÃO DA ESPIRAL (Integrated Contemplative Suggestion) */}
              {activeGiro && (
                <div className="bg-gradient-to-br from-[#101626] via-[#141b2e] to-[#07090e] border border-[#c5a059]/40 rounded-lg p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <Compass className="w-5 h-5 text-[#c5a059]" />
                    <h3 className="font-serif font-bold text-[#f3e3a2] text-lg">
                      REFLEXÃO DA ESPIRAL
                    </h3>
                  </div>

                  <p className="text-xs text-neutral-300 italic font-serif">
                    "Esta leitura pode ser contemplada em relação ao seu Giro atual ({activeGiro.numberRoman} — {activeGiro.title})."
                  </p>

                  <div className="p-4 bg-[#07090e]/80 rounded-md border-l-2 border-[#c5a059] text-xs text-neutral-200 leading-relaxed space-y-2">
                    <p className="font-bold text-[#f3e3a2]">
                      Contemplação da Presença no Giro {activeGiro.id} ({activeGiro.dimension}):
                    </p>
                    <p>
                      {currentReading.cards[0].card.giroReflection[activeGiro.id] ||
                        currentReading.cards[0].card.reflection}
                    </p>
                  </div>

                  <p className="text-[11px] text-neutral-400">
                    Lembre-se: As cartas do Tarô das Dimenúveis são unicamente espelhos de observação contemplativa da presença atual. Elas não realizam adivinhações do futuro nem preveem eventos subsequentes.
                  </p>
                </div>
              )}

              {/* Controls Bar - Tiragem de presença realizada em */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0b0f19] border border-[#c5a059]/20 rounded-lg p-4">
                <span className="text-xs text-neutral-400">
                  Tiragem de presença realizada em <strong className="text-[#f3e3a2]">{currentReading.date}</strong>
                </span>

                <button
                  onClick={handleDrawCards}
                  disabled={isCooldownActive}
                  className={`px-4 py-2 rounded-md text-xs flex items-center gap-2 transition-colors ${
                    isCooldownActive
                      ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700'
                      : 'bg-[#121826] hover:bg-neutral-800 text-[#f3e3a2] border border-[#c5a059]/30'
                  }`}
                  title={isCooldownActive ? `Próxima tiragem disponível em ${formatCooldown(cooldownRemainingMs)}` : 'Nova Tiragem'}
                >
                  {isCooldownActive ? (
                    <>
                      <Lock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Aguarde {formatCooldown(cooldownRemainingMs)}</span>
                    </>
                  ) : (
                    <>
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Nova Tiragem</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Card Detail Modal */}
      {selectedCardForModal && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md overflow-y-auto p-3 sm:p-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedCardForModal(null);
          }}
        >
          <div className="min-h-full flex items-start justify-center pt-2 sm:pt-6 pb-24">
            <div className="bg-[#0b0f19] border border-[#c5a059]/50 rounded-xl p-6 sm:p-8 max-w-2xl w-full space-y-5 shadow-2xl relative">
              <button
                onClick={() => setSelectedCardForModal(null)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white p-2 text-lg"
              >
                ✕
              </button>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              {/* Graphic Card on left */}
              <div className="sm:col-span-5 flex justify-center">
                <TarotCardGraphic card={selectedCardForModal.card} size="md" interactiveFlip={true} />
              </div>

              {/* Card textual information on right */}
              <div className="sm:col-span-7 space-y-4 text-xs text-neutral-300">
                <div className="space-y-1">
                  {selectedCardForModal.positionTitle && (
                    <span className="text-[10px] uppercase tracking-widest text-[#c5a059] font-bold block">
                      {selectedCardForModal.positionTitle}
                    </span>
                  )}
                  <h3 className="text-2xl font-serif font-bold text-[#f3e3a2]">
                    {selectedCardForModal.card.number} — {selectedCardForModal.card.name}
                  </h3>
                  <p className="text-xs text-[#c5a059] font-serif italic">
                    Dimenúvel: {selectedCardForModal.card.dimentionName}
                  </p>
                </div>

                <div className="p-3 bg-[#121826] rounded-xl border border-neutral-800 space-y-1">
                  <h4 className="font-bold text-[#f3e3a2]">Descrição do Arcano:</h4>
                  <p className="leading-relaxed">{selectedCardForModal.card.description}</p>
                </div>

                <div className="p-3 bg-[#121826] rounded-xl border border-neutral-800 space-y-1">
                  <h4 className="font-bold text-[#f3e3a2]">Reflexão na Presença Atual:</h4>
                  <p className="leading-relaxed">{selectedCardForModal.card.reflection}</p>
                </div>

                {activeGiro && selectedCardForModal.card.giroReflection[activeGiro.id] && (
                  <div className="p-3 bg-[#07090e] rounded-xl border-l-2 border-[#c5a059] space-y-1">
                    <h4 className="font-bold text-[#c5a059]">
                      Relação com Giro {activeGiro.id} ({activeGiro.title}):
                    </h4>
                    <p className="leading-relaxed">{selectedCardForModal.card.giroReflection[activeGiro.id]}</p>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => setSelectedCardForModal(null)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#e5c158] text-black font-bold text-xs uppercase tracking-wider hover:from-[#d4af37] transition-all"
            >
              Entendido (Abidar)
            </button>
          </div>
        </div>
      </div>
      )}

      {/* Historical Readings */}
      {tarotReadings.length > 0 && activeTabMode === 'oraculo' && (
        <div className="space-y-4 pt-6 border-t border-neutral-800">
          <h3 className="font-serif font-bold text-lg text-[#f3e3a2] flex items-center gap-2">
            <History className="w-4 h-4 text-[#c5a059]" />
            <span>Histórico de Leituras de Presença</span>
          </h3>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
            {tarotReadings.map((reading, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentReading(reading)}
                className="bg-[#0b0f19] hover:bg-[#121826] border border-neutral-800 p-3 rounded-xl flex items-center justify-between text-xs cursor-pointer transition-colors"
              >
                <div>
                  <span className="font-medium text-neutral-200">
                    Tiragem de {reading.date}
                  </span>
                  <span className="text-neutral-500 block text-[10px]">
                    Cartas: {reading.cards.map((c) => c.card.name).join(' • ')}
                  </span>
                </div>
                <span className="text-[#c5a059] font-medium text-[11px]">Ver tiragem →</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


