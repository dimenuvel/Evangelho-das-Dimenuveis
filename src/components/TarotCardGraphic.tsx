import React, { useState } from 'react';
import { TarotCard } from '../types';
import tarotCardBackImg from '../assets/images/tarot_card_back_1786327772061.jpg';
import tarotDeckArtImg from '../assets/images/tarot_deck_art_1786327783427.jpg';

interface TarotCardGraphicProps {
  card: TarotCard;
  isFlipped?: boolean; // true = showing back, false = showing face
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  interactiveFlip?: boolean;
}

export const TarotCardGraphic: React.FC<TarotCardGraphicProps> = ({
  card,
  isFlipped = false,
  onClick,
  size = 'md',
  interactiveFlip = false,
}) => {
  const [internalFlipped, setInternalFlipped] = useState<boolean>(isFlipped);

  const handleCardClick = () => {
    if (interactiveFlip) {
      setInternalFlipped(!internalFlipped);
    }
    if (onClick) {
      onClick();
    }
  };

  const showBack = interactiveFlip ? internalFlipped : isFlipped;

  // Size scaling classes
  const sizeClasses = {
    sm: 'w-36 h-60 text-[10px]',
    md: 'w-48 sm:w-56 h-80 sm:h-96 text-xs',
    lg: 'w-64 sm:w-72 h-[26rem] sm:h-[30rem] text-sm',
  };

  return (
    <div
      onClick={handleCardClick}
      className={`relative group perspective-1000 ${sizeClasses[size]} cursor-pointer select-none transition-transform duration-300 hover:scale-[1.03]`}
    >
      <div
        className={`w-full h-full rounded-lg transition-all duration-700 transform-style-3d shadow-2xl ${
          showBack ? 'rotate-y-180' : ''
        }`}
      >
        {/* CARD FRONT FACE */}
        <div className="tarot-card-face absolute inset-0 w-full h-full backface-hidden rounded-lg border-2 border-[#c5a059] p-2 flex flex-col justify-between shadow-[0_0_20px_rgba(197,160,89,0.25)] group-hover:shadow-[0_0_30px_rgba(197,160,89,0.45)] transition-shadow overflow-hidden">
          {/* Gold Foil Inner Border Frame */}
          <div className="absolute inset-1 border border-[#c5a059]/40 rounded-md pointer-events-none" />
          <div className="absolute inset-1.5 border border-[#f3e3a2]/20 rounded-sm pointer-events-none" />

          {/* Corner Ornaments */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#c5a059]" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#c5a059]" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#c5a059]" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#c5a059]" />

          {/* Card Top Banner: Number & Astrological Element */}
          <div className="relative z-10 flex items-center justify-center pt-1 pb-1.5 border-b border-[#c5a059]/30">
            <div className="absolute left-2 flex items-center justify-center opacity-80">
              <span className="text-[12px] sm:text-sm font-serif text-[#c5a059]">
                {getArcanoSymbol(card.number)}
              </span>
            </div>
            
            <div className="tarot-card-number min-w-[24px] h-[24px] px-1.5 rounded-sm border border-[#c5a059]/60 bg-[#07090e]/50 flex items-center justify-center font-serif font-bold text-[10px] sm:text-xs shadow-inner">
              {card.number}
            </div>

            <div className="absolute right-2 flex items-center justify-center opacity-80">
              <span className="text-[12px] sm:text-sm font-serif text-[#c5a059] transform scale-x-[-1]">
                {getArcanoSymbol(card.number)}
              </span>
            </div>
          </div>

          {/* Card Illustration Graphic */}
          <div className="tarot-card-illustration-box relative z-10 flex-1 my-1.5 rounded-lg border overflow-hidden flex items-center justify-center p-1 shadow-inner">
            <TarotIllustration cardId={card.id} cardNum={card.number} />
          </div>

          {/* Card Bottom Banner: Name & Dimension */}
          <div className="tarot-card-banner relative z-10 text-center space-y-0.5 px-1 py-1 border-t rounded-b-lg">
            <h3 className="tarot-card-name font-serif font-bold tracking-widest text-xs sm:text-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              {card.name}
            </h3>
            <p className="tarot-card-subtext text-[10px] font-serif italic truncate px-1">
              {card.dimentionName}
            </p>
          </div>
        </div>

        {/* CARD BACK FACE */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-lg border-2 border-[#c5a059] shadow-2xl overflow-hidden bg-[#0a0712]">
          <img
            src={tarotCardBackImg}
            alt="Tarot Card Back"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />
          <div className="absolute inset-3 border border-[#c5a059]/60 rounded-xl pointer-events-none flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border border-[#c5a059] bg-black/60 backdrop-blur-xs flex items-center justify-center">
              <span className="tarot-card-name font-serif font-bold text-lg">
                🌀
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to return authentic Tarot / Astrological symbols per card
function getArcanoSymbol(numStr: string): string {
  switch (numStr) {
    case '0': return '☀️ 🧳';
    case 'I': return '🪄 🎴';
    case 'II': return '🌙 📜';
    case 'III': return '♀️ 🌾';
    case 'IV': return '♈ 👑';
    case 'V': return '♉ 🗝️';
    case 'VI': return '♊ 🕊️';
    case 'VII': return '♋ 🛡️';
    case 'VIII': return '♎ ⚖️';
    case 'IX': return '♍ 🏮';
    case 'X': return '☸️ 🐍';
    case 'XI': return '♌ 🦁';
    case 'XII': return '🌊 🪢';
    case 'XIII': return '♏ 🥀';
    case 'XIV': return '♐ 🏺';
    case 'XV': return '♑ 🔗';
    case 'XVI': return '⚡ 🏰';
    case 'XVII': return '♒ ⭐';
    case 'XVIII': return '♓ 🐺';
    case 'XIX': return '☀️ 🌻';
    case 'XX': return '🎺 🌅';
    case 'XXI': return '🪐 🌿';
    case '♾️': return '🪞 🌌';
    default: return '✨';
  }
}

// Graphic Vector Illustration Component rendering unique classical Tarot artwork
const TarotIllustration: React.FC<{ cardId: string; cardNum: string }> = ({ cardId, cardNum }) => {
  switch (cardId) {
    case 'c0': // O LOUCO
      return (
        <svg viewBox="0 0 200 280" className="w-full h-full">
          <defs>
            <linearGradient id="sky0" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2c1a4d" />
              <stop offset="50%" stopColor="#63326e" />
              <stop offset="100%" stopColor="#f3a852" />
            </linearGradient>
            <radialGradient id="sunGlow" cx="0.8" cy="0.2" r="0.4">
              <stop offset="0%" stopColor="#fff7d6" />
              <stop offset="60%" stopColor="#ffd23f" />
              <stop offset="100%" stopColor="#ffd23f00" />
            </radialGradient>
          </defs>
          <rect width="200" height="280" fill="url(#sky0)" />
          {/* Sun */}
          <circle cx="160" cy="50" r="35" fill="url(#sunGlow)" />
          <circle cx="160" cy="50" r="18" fill="#fff7d6" />
          {/* Mountains & Cliff */}
          <path d="M-10 280 L60 180 L120 220 L210 160 L210 280 Z" fill="#181124" />
          <path d="M0 280 L0 210 Q60 210 90 230 L110 280 Z" fill="#d4af37" opacity="0.8" />
          <path d="M-10 280 L0 195 Q50 195 85 220 L105 280 Z" fill="#2d1f10" />
          {/* The Traveler Figure */}
          <g transform="translate(45, 125)">
            {/* Tunic */}
            <path d="M15 35 L5 75 L30 75 L22 35 Z" fill="#c0392b" />
            <path d="M12 35 L2 75 L15 75 Z" fill="#f1c40f" />
            {/* Head & Feather Cap */}
            <circle cx="18" cy="20" r="7" fill="#f5cdab" />
            <path d="M12 18 Q20 12 28 15" stroke="#e74c3c" strokeWidth="3" fill="none" />
            <path d="M22 12 Q32 0 35 -5" stroke="#f1c40f" strokeWidth="2" fill="none" />
            {/* Staff & Bindle */}
            <line x1="-5" y1="55" x2="40" y2="10" stroke="#7f8c8d" strokeWidth="2.5" />
            <circle cx="38" cy="8" r="8" fill="#e67e22" />
            {/* Legs walking toward cliff */}
            <line x1="12" y1="75" x2="8" y2="98" stroke="#f1c40f" strokeWidth="3" />
            <line x1="22" y1="75" x2="28" y2="95" stroke="#f1c40f" strokeWidth="3" />
          </g>
          {/* White Dog */}
          <path d="M100 225 Q110 215 115 220 Q120 225 112 232 Z" fill="#ffffff" />
          <circle cx="112" cy="218" r="4" fill="#ffffff" />
          {/* Floating Rose */}
          <circle cx="35" cy="160" r="3" fill="#e74c3c" />
        </svg>
      );

    case 'c1': // O MAGO
      return (
        <svg viewBox="0 0 200 280" className="w-full h-full">
          <defs>
            <linearGradient id="magoBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#120c1f" />
              <stop offset="100%" stopColor="#2e1438" />
            </linearGradient>
          </defs>
          <rect width="200" height="280" fill="url(#magoBg)" />
          {/* Infinity Symbol above head */}
          <path d="M85 45 C75 35 75 55 85 45 C95 35 115 35 105 45 C95 55 115 55 105 45 C95 35 75 35 85 45 Z" stroke="#ffd700" strokeWidth="2.5" fill="none" />
          {/* Magician figure */}
          <g transform="translate(80, 55)">
            {/* White Robe & Red Cloak */}
            <path d="M0 40 L-15 120 L35 120 L20 40 Z" fill="#ffffff" />
            <path d="M-10 40 C-25 70 -20 120 -20 120 L-5 120 Z" fill="#c0392b" />
            <path d="M30 40 C45 70 40 120 40 120 L25 120 Z" fill="#c0392b" />
            {/* Face */}
            <circle cx="10" cy="22" r="10" fill="#f5cdab" />
            {/* Upward Wand */}
            <line x1="-10" y1="20" x2="-22" y2="-10" stroke="#f1c40f" strokeWidth="3" />
            <circle cx="-22" cy="-10" r="3" fill="#ffffff" />
            {/* Downward Hand */}
            <line x1="30" y1="35" x2="40" y2="65" stroke="#f5cdab" strokeWidth="3" strokeLinecap="round" />
          </g>
          {/* Altar Table */}
          <rect x="35" y="175" width="130" height="15" fill="#8e44ad" rx="3" stroke="#ffd700" strokeWidth="1" />
          <rect x="45" y="190" width="110" height="70" fill="#2c3e50" stroke="#ffd700" strokeWidth="1" />
          {/* Four Elements on Table */}
          {/* Wand */}
          <line x1="55" y1="170" x2="70" y2="160" stroke="#f1c40f" strokeWidth="2" />
          {/* Cup */}
          <path d="M85 170 L82 162 L90 162 Z" fill="#e67e22" />
          {/* Sword */}
          <line x1="110" y1="172" x2="122" y2="158" stroke="#bdc3c7" strokeWidth="2" />
          {/* Pentacle */}
          <circle cx="140" cy="166" r="5" fill="#f1c40f" stroke="#d35400" strokeWidth="1" />
          {/* Roses and Lilies border */}
          <circle cx="30" cy="260" r="8" fill="#e74c3c" />
          <circle cx="170" cy="260" r="8" fill="#ffffff" />
        </svg>
      );

    case 'c2': // A SACERDOTISA
      return (
        <svg viewBox="0 0 200 280" className="w-full h-full">
          <rect width="200" height="280" fill="#091326" />
          {/* Pillars B and J */}
          <rect x="20" y="30" width="28" height="220" fill="#111" stroke="#444" strokeWidth="1" />
          <text x="30" y="140" fill="#fff" fontSize="18" fontWeight="bold">B</text>
          <rect x="152" y="30" width="28" height="220" fill="#ffffff" opacity="0.9" />
          <text x="162" y="140" fill="#000" fontSize="18" fontWeight="bold">J</text>
          {/* Veil behind with pomegranates */}
          <rect x="48" y="40" width="104" height="180" fill="#1b2a4a" />
          <circle cx="70" cy="80" r="6" fill="#c0392b" />
          <circle cx="130" cy="80" r="6" fill="#c0392b" />
          <circle cx="100" cy="120" r="6" fill="#c0392b" />
          {/* High Priestess figure */}
          <path d="M70 110 L130 110 L140 250 L60 250 Z" fill="#2980b9" />
          {/* Crown with Horns & Full Moon */}
          <circle cx="100" cy="85" r="10" fill="#f5cdab" />
          <circle cx="100" cy="68" r="8" fill="#f1c40f" />
          <path d="M88 68 Q100 80 112 68" stroke="#f1c40f" strokeWidth="3" fill="none" />
          {/* TORA Scroll */}
          <rect x="80" y="150" width="40" height="25" fill="#f39c12" rx="2" />
          <text x="85" y="167" fill="#000" fontSize="10" fontWeight="bold">TORA</text>
          {/* Crescent Moon at Feet */}
          <path d="M80 240 A20 20 0 0 0 120 240 A15 15 0 0 1 80 240 Z" fill="#f1c40f" />
        </svg>
      );

    case 'c3': // A IMPERATRIZ
      return (
        <svg viewBox="0 0 200 280" className="w-full h-full">
          <rect width="200" height="280" fill="#270f1c" />
          {/* Golden Wheat field */}
          <rect x="0" y="200" width="200" height="80" fill="#f39c12" opacity="0.7" />
          {/* Lush Trees */}
          <circle cx="30" cy="120" r="35" fill="#27ae60" />
          <circle cx="170" cy="120" r="35" fill="#27ae60" />
          {/* Velvet Throne */}
          <rect x="55" y="90" width="90" height="130" fill="#8e44ad" rx="10" />
          {/* Empress Figure */}
          <path d="M75 110 Q100 100 125 110 L135 220 L65 220 Z" fill="#ffffff" />
          {/* Pomegranate patterns on dress */}
          <circle cx="90" cy="150" r="4" fill="#e74c3c" />
          <circle cx="110" cy="170" r="4" fill="#e74c3c" />
          {/* Star Crown */}
          <circle cx="100" cy="90" r="9" fill="#f5cdab" />
          <path d="M85 80 L115 80" stroke="#f1c40f" strokeWidth="4" />
          <polygon points="100,70 103,76 109,77 104,81 106,87 100,83 94,87 96,81 91,77 97,76" fill="#ffd700" />
          {/* Venus Shield */}
          <circle cx="140" cy="180" r="14" fill="#e74c3c" stroke="#ffd700" strokeWidth="2" />
          <text x="135" y="185" fill="#ffd700" fontSize="14" fontWeight="bold">♀</text>
        </svg>
      );

    case 'c4': // O IMPERADOR
      return (
        <svg viewBox="0 0 200 280" className="w-full h-full">
          <rect width="200" height="280" fill="#3a1005" />
          {/* Jagged red stone mountains */}
          <polygon points="0,280 40,100 80,280" fill="#78281f" />
          <polygon points="60,280 120,80 180,280" fill="#641e16" />
          <polygon points="130,280 165,120 200,280" fill="#78281f" />
          {/* Ram Throne */}
          <rect x="55" y="90" width="90" height="140" fill="#515a5a" rx="4" />
          <circle cx="55" cy="100" r="8" fill="#95a5a6" />
          <circle cx="145" cy="100" r="8" fill="#95a5a6" />
          {/* Emperor Figure */}
          <path d="M70 110 L130 110 L135 220 L65 220 Z" fill="#c0392b" />
          {/* Armor */}
          <rect x="80" y="125" width="40" height="50" fill="#7f8c8d" rx="4" />
          {/* Crown & White Beard */}
          <circle cx="100" cy="92" r="9" fill="#f5cdab" />
          <path d="M90 100 Q100 115 110 100 Z" fill="#ffffff" />
          <polygon points="88,85 100,72 112,85" fill="#ffd700" />
          {/* Ankh Scepter */}
          <line x1="125" y1="120" x2="125" y2="170" stroke="#ffd700" strokeWidth="3" />
          <circle cx="125" cy="115" r="5" stroke="#ffd700" strokeWidth="2" fill="none" />
        </svg>
      );

    case 'c5': // O HIEROFANTE
      return (
        <svg viewBox="0 0 200 280" className="w-full h-full">
          <rect width="200" height="280" fill="#1b122c" />
          {/* Temple Pillars */}
          <rect x="25" y="40" width="20" height="200" fill="#4a235a" />
          <rect x="155" y="40" width="20" height="200" fill="#4a235a" />
          {/* Hierophant Figure */}
          <path d="M65 90 L135 90 L145 250 L55 250 Z" fill="#922b21" />
          {/* Triple Crown */}
          <circle cx="100" cy="75" r="9" fill="#f5cdab" />
          <rect x="85" y="50" width="30" height="8" fill="#f1c40f" />
          <rect x="88" y="40" width="24" height="8" fill="#f1c40f" />
          <rect x="91" y="30" width="18" height="8" fill="#f1c40f" />
          {/* Papal Cross Staff */}
          <line x1="60" y1="80" x2="60" y2="180" stroke="#ffd700" strokeWidth="3" />
          <line x1="50" y1="95" x2="70" y2="95" stroke="#ffd700" strokeWidth="3" />
          <line x1="53" y1="105" x2="67" y2="105" stroke="#ffd700" strokeWidth="3" />
          <line x1="56" y1="115" x2="64" y2="115" stroke="#ffd700" strokeWidth="3" />
          {/* Crossed Keys at feet */}
          <line x1="85" y1="230" x2="115" y2="250" stroke="#f1c40f" strokeWidth="2" />
          <line x1="115" y1="230" x2="85" y2="250" stroke="#f1c40f" strokeWidth="2" />
        </svg>
      );

    case 'c6': // OS AMANTES
      return (
        <svg viewBox="0 0 200 280" className="w-full h-full">
          <rect width="200" height="280" fill="#0d1f2d" />
          {/* Glowing Angel Raphael in sky */}
          <circle cx="100" cy="55" r="30" fill="#f39c12" opacity="0.6" />
          <path d="M40 50 Q100 20 160 50 Q100 70 40 50 Z" fill="#af7ac5" />
          <circle cx="100" cy="50" r="12" fill="#f5cdab" />
          {/* Sun */}
          <circle cx="100" cy="20" r="15" fill="#f1c40f" />
          {/* Tree of Knowledge with serpent */}
          <rect x="25" y="140" width="10" height="80" fill="#5d4037" />
          <circle cx="30" cy="130" r="22" fill="#27ae60" />
          <path d="M20 130 Q35 120 25 150" stroke="#e74c3c" strokeWidth="3" fill="none" />
          {/* Tree of Life with flames */}
          <rect x="165" y="140" width="10" height="80" fill="#5d4037" />
          <circle cx="170" cy="130" r="22" fill="#d35400" />
          {/* Two Lovers */}
          <g transform="translate(50, 150)">
            {/* Female */}
            <circle cx="10" cy="15" r="7" fill="#f5cdab" />
            <path d="M2 30 L18 30 L22 80 L-2 80 Z" fill="#fcd34d" />
          </g>
          <g transform="translate(120, 150)">
            {/* Male */}
            <circle cx="10" cy="15" r="7" fill="#f5cdab" />
            <path d="M2 30 L18 30 L22 80 L-2 80 Z" fill="#3b82f6" />
          </g>
        </svg>
      );

    case 'c7': // O CARRO
      return (
        <svg viewBox="0 0 200 280" className="w-full h-full">
          <rect width="200" height="280" fill="#0a192f" />
          {/* Starry canopy */}
          <rect x="30" y="30" width="140" height="20" fill="#1e3a8a" />
          <circle cx="50" cy="40" r="2" fill="#fff" />
          <circle cx="100" cy="40" r="2" fill="#fff" />
          <circle cx="150" cy="40" r="2" fill="#fff" />
          {/* Chariot Body */}
          <rect x="50" y="110" width="100" height="80" fill="#475569" stroke="#cbd5e1" strokeWidth="2" />
          {/* Warrior */}
          <circle cx="100" cy="80" r="10" fill="#f5cdab" />
          <rect x="88" y="92" width="24" height="30" fill="#e2e8f0" />
          <polygon points="90,72 100,60 110,72" fill="#ffd700" />
          {/* Black Sphinx */}
          <path d="M40 210 Q60 180 80 210 L80 250 L40 250 Z" fill="#000000" stroke="#ffd700" strokeWidth="1" />
          {/* White Sphinx */}
          <path d="M120 210 Q140 180 160 210 L160 250 L120 250 Z" fill="#ffffff" stroke="#000000" strokeWidth="1" />
        </svg>
      );

    case 'c8': // A JUSTIÇA
      return (
        <svg viewBox="0 0 200 280" className="w-full h-full">
          <rect width="200" height="280" fill="#2a080c" />
          {/* Purple drape */}
          <rect x="40" y="30" width="120" height="180" fill="#581845" />
          {/* Justice figure */}
          <path d="M60 80 L140 80 L150 250 L50 250 Z" fill="#c0392b" />
          <circle cx="100" cy="70" r="10" fill="#f5cdab" />
          <polygon points="88,62 100,48 112,62" fill="#ffd700" />
          {/* Upright Sword in right hand */}
          <line x1="140" y1="60" x2="140" y2="150" stroke="#f1c40f" strokeWidth="3" />
          <line x1="130" y1="130" x2="150" y2="130" stroke="#f1c40f" strokeWidth="2" />
          {/* Golden Scales in left hand */}
          <line x1="60" y1="100" x2="60" y2="150" stroke="#ffd700" strokeWidth="2" />
          <line x1="40" y1="110" x2="80" y2="110" stroke="#ffd700" strokeWidth="2" />
          <polygon points="40,110 32,130 48,130" fill="#ffd700" />
          <polygon points="80,110 72,130 88,130" fill="#ffd700" />
        </svg>
      );

    case 'c9': // O EREMITA
      return (
        <svg viewBox="0 0 200 280" className="w-full h-full">
          <rect width="200" height="280" fill="#070a14" />
          {/* Snowy Mountain Peak */}
          <polygon points="-20,280 100,100 220,280" fill="#1c2833" />
          <polygon points="70,140 100,100 130,140" fill="#ecf0f1" />
          {/* Cloaked Hermit */}
          <path d="M80 120 C70 160 65 240 65 260 L135 260 C135 240 130 160 120 120 Z" fill="#34495e" />
          {/* Hood & Beard */}
          <path d="M85 110 Q100 95 115 110 Q100 135 85 110 Z" fill="#2c3e50" />
          <path d="M92 125 Q100 145 108 125 Z" fill="#ecf0f1" />
          {/* Staff */}
          <line x1="70" y1="110" x2="55" y2="260" stroke="#d35400" strokeWidth="3" />
          {/* Glowing Lantern with Star */}
          <circle cx="140" cy="130" r="22" fill="#f1c40f" opacity="0.3" />
          <rect x="133" y="120" width="14" height="20" fill="#ffd700" rx="2" stroke="#d35400" strokeWidth="1" />
          <polygon points="140,123 142,128 147,128 143,131 145,136 140,133 135,136 137,131 133,128 138,128" fill="#ffffff" />
        </svg>
      );

    case 'c10': // A RODA DA FORTUNA
      return (
        <svg viewBox="0 0 200 280" className="w-full h-full">
          <rect width="200" height="280" fill="#0f172a" />
          {/* The Golden Wheel */}
          <circle cx="100" cy="140" r="55" fill="none" stroke="#f1c40f" strokeWidth="6" />
          <circle cx="100" cy="140" r="42" fill="none" stroke="#f39c12" strokeWidth="2" />
          <circle cx="100" cy="140" r="12" fill="#f1c40f" />
          {/* Spokes */}
          <line x1="100" y1="85" x2="100" y2="195" stroke="#f1c40f" strokeWidth="2" />
          <line x1="45" y1="140" x2="155" y2="140" stroke="#f1c40f" strokeWidth="2" />
          <line x1="61" y1="101" x2="139" y2="179" stroke="#f1c40f" strokeWidth="2" />
          <line x1="61" y1="179" x2="139" y2="101" stroke="#f1c40f" strokeWidth="2" />
          {/* Sphinx atop Wheel */}
          <path d="M85 80 Q100 60 115 80 Z" fill="#8e44ad" />
          <circle cx="100" cy="65" r="7" fill="#f1c40f" />
          {/* Four Winged Beasts in corners */}
          <circle cx="25" cy="35" r="12" fill="#3b82f6" opacity="0.8" />
          <circle cx="175" cy="35" r="12" fill="#ef4444" opacity="0.8" />
          <circle cx="25" cy="245" r="12" fill="#10b981" opacity="0.8" />
          <circle cx="175" cy="245" r="12" fill="#f59e0b" opacity="0.8" />
        </svg>
      );

    case 'c11': // A FORÇA
      return (
        <svg viewBox="0 0 200 280" className="w-full h-full">
          <rect width="200" height="280" fill="#2d1b00" />
          {/* Infinity Symbol overhead */}
          <path d="M85 45 C75 35 75 55 85 45 C95 35 115 35 105 45 C95 55 115 55 105 45 C95 35 75 35 85 45 Z" stroke="#ffd700" strokeWidth="2.5" fill="none" />
          {/* White Maiden */}
          <path d="M60 100 L90 100 L100 240 L50 240 Z" fill="#ffffff" />
          <circle cx="75" cy="85" r="9" fill="#f5cdab" />
          {/* Floral Garland */}
          <path d="M55 110 Q75 130 95 110" stroke="#10b981" strokeWidth="3" fill="none" />
          {/* Golden Lion */}
          <path d="M100 160 Q150 140 170 180 L160 240 L100 240 Z" fill="#d97706" />
          <circle cx="125" cy="165" r="18" fill="#b45309" />
          {/* Maiden gently closing Lion's jaw */}
          <circle cx="115" cy="170" r="5" fill="#f5cdab" />
        </svg>
      );

    case 'c12': // O ENFORCADO
      return (
        <svg viewBox="0 0 200 280" className="w-full h-full">
          <rect width="200" height="280" fill="#06121e" />
          {/* Living T-shaped Wood Cross */}
          <rect x="20" y="30" width="160" height="15" fill="#78350f" rx="2" />
          <rect x="92" y="30" width="16" height="220" fill="#78350f" rx="2" />
          {/* Green leaves sprouting on cross */}
          <circle cx="30" cy="25" r="4" fill="#22c55e" />
          <circle cx="170" cy="25" r="4" fill="#22c55e" />
          {/* Suspended Rope */}
          <line x1="100" y1="45" x2="100" y2="80" stroke="#f59e0b" strokeWidth="3" />
          {/* Inverted Figure */}
          <g transform="translate(100, 80) scale(1, -1)">
            {/* Blue tunic & Red leggings */}
            <path d="M-12 -20 L12 -20 L18 -80 L-18 -80 Z" fill="#2563eb" />
            <line x1="0" y1="-80" x2="-20" y2="-120" stroke="#dc2626" strokeWidth="6" />
            <line x1="0" y1="-80" x2="15" y2="-120" stroke="#dc2626" strokeWidth="6" />
            {/* Halo around upside-down head */}
            <circle cx="0" cy="-10" r="16" fill="#fde047" opacity="0.6" />
            <circle cx="0" cy="-10" r="8" fill="#f5cdab" />
          </g>
        </svg>
      );

    case 'c13': // A MORTE
      return (
        <svg viewBox="0 0 200 280" className="w-full h-full">
          <rect width="200" height="280" fill="#09090b" />
          {/* Golden Sunrise between Two Distant Towers */}
          <rect x="20" y="100" width="15" height="80" fill="#27272a" />
          <rect x="165" y="100" width="15" height="80" fill="#27272a" />
          <circle cx="100" cy="150" r="25" fill="#f59e0b" opacity="0.7" />
          {/* White Horse */}
          <path d="M20 200 Q70 150 110 200 L110 260 L20 260 Z" fill="#f8fafc" />
          {/* Black Armored Skeleton Knight */}
          <path d="M50 140 L90 140 L100 210 L40 210 Z" fill="#18181b" stroke="#71717a" strokeWidth="1" />
          <circle cx="70" cy="120" r="10" fill="#e4e4e7" />
          {/* Black Banner with White Rose */}
          <rect x="90" y="80" width="55" height="40" fill="#09090b" stroke="#f8fafc" strokeWidth="1" />
          <circle cx="117" cy="100" r="8" fill="#f8fafc" />
        </svg>
      );

    case 'c14': // A TEMPERANÇA
      return (
        <svg viewBox="0 0 200 280" className="w-full h-full">
          <rect width="200" height="280" fill="#0c1a24" />
          {/* Winged Angel */}
          <path d="M30 90 Q100 50 170 90 Q100 120 30 90 Z" fill="#f43f5e" opacity="0.8" />
          <path d="M70 100 L130 100 L140 240 L60 240 Z" fill="#ffffff" />
          <circle cx="100" cy="80" r="10" fill="#f5cdab" />
          {/* Sun on forehead */}
          <circle cx="100" cy="72" r="3" fill="#f59e0b" />
          {/* Two Golden Chalices & Flowing Liquid */}
          <path d="M70 150 L65 140 L75 140 Z" fill="#f59e0b" />
          <path d="M130 180 L125 170 L135 170 Z" fill="#f59e0b" />
          <path d="M70 145 C110 145 90 175 130 175" stroke="#38bdf8" strokeWidth="3" fill="none" />
          {/* One foot on water, one on land */}
          <rect x="0" y="240" width="100" height="40" fill="#0284c7" />
          <rect x="100" y="240" width="100" height="40" fill="#15803d" />
        </svg>
      );

    case 'c15': // O DIABO
      return (
        <svg viewBox="0 0 200 280" className="w-full h-full">
          <rect width="200" height="280" fill="#180505" />
          {/* Inverted Pentagram on forehead pedestal */}
          <rect x="65" y="140" width="70" height="80" fill="#262626" />
          {/* Horned Figure */}
          <circle cx="100" cy="70" r="16" fill="#525252" />
          <path d="M88 60 C75 30 65 40 75 20" stroke="#a3a3a3" strokeWidth="4" fill="none" />
          <path d="M112 60 C125 30 135 40 125 20" stroke="#a3a3a3" strokeWidth="4" fill="none" />
          {/* Bat Wings */}
          <path d="M30 70 Q70 40 100 80 Q130 40 170 70 Q100 120 30 70 Z" fill="#292524" />
          {/* Chained figures at base */}
          <circle cx="45" cy="210" r="8" fill="#f5cdab" />
          <circle cx="155" cy="210" r="8" fill="#f5cdab" />
          <line x1="45" y1="210" x2="80" y2="180" stroke="#d4d4d8" strokeWidth="2" />
          <line x1="155" y1="210" x2="120" y2="180" stroke="#d4d4d8" strokeWidth="2" />
        </svg>
      );

    case 'c16': // A TORRE
      return (
        <svg viewBox="0 0 200 280" className="w-full h-full">
          <rect width="200" height="280" fill="#030712" />
          {/* Dark Mountain Base */}
          <polygon points="-10,280 100,180 210,280" fill="#111827" />
          {/* Tower */}
          <polygon points="70,250 80,80 120,80 130,250" fill="#374151" stroke="#1f2937" strokeWidth="2" />
          {/* Falling Crown */}
          <polygon points="75,70 100,50 125,70" fill="#f59e0b" />
          {/* Lightning Bolt */}
          <path d="M160 10 L105 70 L125 75 L85 140" stroke="#fde047" strokeWidth="5" fill="none" />
          {/* Flames & Yod sparks */}
          <circle cx="90" cy="95" r="4" fill="#ef4444" />
          <circle cx="110" cy="110" r="4" fill="#f59e0b" />
          <circle cx="80" cy="130" r="3" fill="#fde047" />
          <circle cx="120" cy="140" r="3" fill="#fde047" />
        </svg>
      );

    case 'c17': // A ESTRELA
      return (
        <svg viewBox="0 0 200 280" className="w-full h-full">
          <rect width="200" height="280" fill="#0284c7" />
          {/* Big 8-Pointed Star */}
          <g transform="translate(100, 50)">
            <polygon points="0,-25 6,-7 25,0 6,7 0,25 -6,7 -25,0 -6,-7" fill="#fde047" />
            <polygon points="0,-18 4,-5 18,0 4,5 0,18 -4,5 -18,0 -4,-5" fill="#ffffff" />
          </g>
          {/* 7 Surrounding Smaller Stars */}
          <circle cx="40" cy="30" r="3" fill="#ffffff" />
          <circle cx="160" cy="30" r="3" fill="#ffffff" />
          <circle cx="20" cy="70" r="3" fill="#ffffff" />
          <circle cx="180" cy="70" r="3" fill="#ffffff" />
          {/* Maiden Maiden pouring water */}
          <path d="M70 150 Q100 130 110 180 L100 240 L60 240 Z" fill="#fcd34d" />
          <circle cx="85" cy="135" r="8" fill="#f5cdab" />
          {/* Two Urns & Water Streams */}
          <line x1="70" y1="160" x2="40" y2="210" stroke="#38bdf8" strokeWidth="3" />
          <line x1="100" y1="160" x2="130" y2="210" stroke="#38bdf8" strokeWidth="3" />
          <rect x="0" y="220" width="200" height="60" fill="#0369a1" />
        </svg>
      );

    case 'c18': // A LUA
      return (
        <svg viewBox="0 0 200 280" className="w-full h-full">
          <rect width="200" height="280" fill="#091428" />
          {/* Full Moon with Face */}
          <circle cx="100" cy="50" r="30" fill="#fef08a" />
          <path d="M85 50 A 20 20 0 0 0 115 50" stroke="#ca8a04" strokeWidth="2" fill="none" />
          {/* Towers */}
          <rect x="15" y="120" width="25" height="100" fill="#1e293b" />
          <rect x="160" y="120" width="25" height="100" fill="#1e293b" />
          {/* Wolf and Dog Howling */}
          <polygon points="50,200 65,170 70,200" fill="#64748b" />
          <polygon points="130,200 145,170 150,200" fill="#94a3b8" />
          {/* Pool & Crayfish */}
          <ellipse cx="100" cy="250" rx="60" ry="20" fill="#0284c7" />
          <circle cx="100" cy="245" r="6" fill="#ef4444" />
        </svg>
      );

    case 'c19': // O SOL
      return (
        <svg viewBox="0 0 200 280" className="w-full h-full">
          <rect width="200" height="280" fill="#fef3c7" />
          {/* Radiant Sun with Face */}
          <circle cx="100" cy="70" r="35" fill="#f59e0b" />
          <circle cx="100" cy="70" r="28" fill="#fde047" />
          {/* Sun Rays */}
          <path d="M100 10 L100 30 M100 110 L100 130 M40 70 L60 70 M140 70 L160 70 M55 25 L70 40 M130 100 L145 115 M145 25 L130 40 M70 100 L55 115" stroke="#f59e0b" strokeWidth="4" />
          {/* Brick Wall */}
          <rect x="0" y="170" width="200" height="40" fill="#d97706" />
          {/* Sunflowers above wall */}
          <circle cx="30" cy="160" r="8" fill="#f59e0b" />
          <circle cx="80" cy="160" r="8" fill="#f59e0b" />
          <circle cx="130" cy="160" r="8" fill="#f59e0b" />
          <circle cx="170" cy="160" r="8" fill="#f59e0b" />
          {/* Child on White Horse holding Red Banner */}
          <ellipse cx="100" cy="235" rx="35" ry="18" fill="#ffffff" />
          <circle cx="100" cy="205" r="8" fill="#f5cdab" />
          <line x1="100" y1="200" x2="140" y2="180" stroke="#dc2626" strokeWidth="5" />
        </svg>
      );

    case 'c20': // O JULGAMENTO
      return (
        <svg viewBox="0 0 200 280" className="w-full h-full">
          <rect width="200" height="280" fill="#0f172a" />
          {/* Archangel Gabriel in Clouds */}
          <ellipse cx="100" cy="50" rx="80" ry="25" fill="#38bdf8" opacity="0.4" />
          <circle cx="100" cy="45" r="14" fill="#f5cdab" />
          {/* Golden Trumpet with Banner */}
          <line x1="100" y1="45" x2="100" y2="100" stroke="#f59e0b" strokeWidth="3" />
          <rect x="100" y="70" width="30" height="25" fill="#ef4444" />
          <line x1="100" y1="82" x2="130" y2="82" stroke="#ffffff" strokeWidth="2" />
          <line x1="115" y1="70" x2="115" y2="95" stroke="#ffffff" strokeWidth="2" />
          {/* Tombs & Awakening Figures Below */}
          <rect x="20" y="220" width="40" height="50" fill="#475569" />
          <rect x="80" y="220" width="40" height="50" fill="#475569" />
          <rect x="140" y="220" width="40" height="50" fill="#475569" />
          <circle cx="40" cy="205" r="6" fill="#f5cdab" />
          <circle cx="100" cy="200" r="6" fill="#f5cdab" />
          <circle cx="160" cy="205" r="6" fill="#f5cdab" />
        </svg>
      );

    case 'c21': // O MUNDO
      return (
        <svg viewBox="0 0 200 280" className="w-full h-full">
          <rect width="200" height="280" fill="#05050a" />
          {/* Laurel Wreath / Ouroboros Ring */}
          <ellipse cx="100" cy="140" rx="55" ry="85" fill="none" stroke="#16a34a" strokeWidth="8" />
          {/* Red Ribbon Ties */}
          <path d="M100 50 L90 38 L110 38 Z" fill="#dc2626" />
          <path d="M100 225 L90 237 L110 237 Z" fill="#dc2626" />
          {/* Dancing Maiden with Scarf */}
          <path d="M90 110 Q110 100 105 160 L115 200 L90 200 Z" fill="#a855f7" />
          <circle cx="100" cy="100" r="8" fill="#f5cdab" />
          {/* Two Wands */}
          <line x1="80" y1="120" x2="70" y2="170" stroke="#f59e0b" strokeWidth="2" />
          <line x1="120" y1="120" x2="130" y2="170" stroke="#f59e0b" strokeWidth="2" />
          {/* 4 Tetramorphs in corners */}
          <circle cx="20" cy="25" r="10" fill="#3b82f6" />
          <circle cx="180" cy="25" r="10" fill="#ef4444" />
          <circle cx="20" cy="255" r="10" fill="#10b981" />
          <circle cx="180" cy="255" r="10" fill="#f59e0b" />
        </svg>
      );

    case 'c_secret': // A CARTA SECRETA (The Mirror / 8th Dimenúvel)
    default:
      return (
        <svg viewBox="0 0 200 280" className="w-full h-full">
          <defs>
            <radialGradient id="mirrorGrad" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#fff7d6" />
              <stop offset="30%" stopColor="#c5a059" />
              <stop offset="70%" stopColor="#1e1035" />
              <stop offset="100%" stopColor="#05020a" />
            </radialGradient>
          </defs>
          <rect width="200" height="280" fill="url(#mirrorGrad)" />
          {/* Golden Infinity Cosmic Spiral */}
          <path d="M100 140 C60 100 60 180 100 140 C140 100 140 180 100 140 Z" stroke="#f3e3a2" strokeWidth="3" fill="none" />
          <circle cx="100" cy="140" r="65" fill="none" stroke="#c5a059" strokeWidth="1.5" strokeDasharray="4 2" />
          {/* Stardust */}
          <circle cx="60" cy="80" r="2" fill="#fff" />
          <circle cx="140" cy="80" r="2" fill="#fff" />
          <circle cx="50" cy="200" r="2" fill="#fff" />
          <circle cx="150" cy="200" r="2" fill="#fff" />
          <circle cx="100" cy="50" r="3" fill="#ffd700" />
          <circle cx="100" cy="230" r="3" fill="#ffd700" />
        </svg>
      );
  }
};
