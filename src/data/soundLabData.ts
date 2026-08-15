export interface DimenuvelLayerColor {
  accentHex: string; // e.g., '#818cf8'
  // Night Mode Classes
  nightUnselectedBg: string;
  nightSelectedBg: string;
  nightBorder: string;
  nightTextTitle: string;
  nightTextNumber: string;
  nightBtnPlay: string;
  nightGlow: string;
  // Day Mode Classes
  dayUnselectedBg: string;
  daySelectedBg: string;
  dayBorder: string;
  dayTextTitle: string;
  dayTextNumber: string;
  dayBtnPlay: string;
  dayGlow: string;
}

export interface DimenuvelSound {
  id: number;
  numberStr: string;
  name: string;
  frequency: number; // Hz
  description: string;
  color: DimenuvelLayerColor;
}

export const DIMENUVEIS_SOUNDS: DimenuvelSound[] = [
  {
    id: 1,
    numberStr: '01',
    name: 'Silêncio',
    frequency: 64,
    description: 'Quietude fundamental e presença sem ruído.',
    color: {
      accentHex: '#818cf8',
      nightUnselectedBg: 'bg-indigo-950/35 hover:bg-indigo-950/60',
      nightSelectedBg: 'bg-indigo-900/50',
      nightBorder: 'border-indigo-800/60 hover:border-indigo-500/80',
      nightTextTitle: 'text-indigo-200',
      nightTextNumber: 'text-indigo-400',
      nightBtnPlay: 'bg-indigo-700 hover:bg-indigo-600 text-white border-indigo-500',
      nightGlow: 'from-indigo-600/25',
      dayUnselectedBg: 'bg-indigo-50/80 hover:bg-indigo-100/90',
      daySelectedBg: 'bg-indigo-100',
      dayBorder: 'border-indigo-200 hover:border-indigo-400',
      dayTextTitle: 'text-indigo-950',
      dayTextNumber: 'text-indigo-700',
      dayBtnPlay: 'bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-700',
      dayGlow: 'from-indigo-400/25',
    }
  },
  {
    id: 2,
    numberStr: '02',
    name: 'Visão',
    frequency: 144,
    description: 'Clareza perceptiva e testemunho livre de projeções.',
    color: {
      accentHex: '#38bdf8',
      nightUnselectedBg: 'bg-sky-950/35 hover:bg-sky-950/60',
      nightSelectedBg: 'bg-sky-900/50',
      nightBorder: 'border-sky-800/60 hover:border-sky-500/80',
      nightTextTitle: 'text-sky-200',
      nightTextNumber: 'text-sky-400',
      nightBtnPlay: 'bg-sky-700 hover:bg-sky-600 text-white border-sky-500',
      nightGlow: 'from-sky-600/25',
      dayUnselectedBg: 'bg-sky-50/80 hover:bg-sky-100/90',
      daySelectedBg: 'bg-sky-100',
      dayBorder: 'border-sky-200 hover:border-sky-400',
      dayTextTitle: 'text-sky-950',
      dayTextNumber: 'text-sky-700',
      dayBtnPlay: 'bg-sky-600 hover:bg-sky-700 text-white border-sky-700',
      dayGlow: 'from-sky-400/25',
    }
  },
  {
    id: 3,
    numberStr: '03',
    name: 'Mente',
    frequency: 216,
    description: 'Discernimento sereno e ordenação dos pensamentos.',
    color: {
      accentHex: '#c084fc',
      nightUnselectedBg: 'bg-purple-950/35 hover:bg-purple-950/60',
      nightSelectedBg: 'bg-purple-900/50',
      nightBorder: 'border-purple-800/60 hover:border-purple-500/80',
      nightTextTitle: 'text-purple-200',
      nightTextNumber: 'text-purple-400',
      nightBtnPlay: 'bg-purple-700 hover:bg-purple-600 text-white border-purple-500',
      nightGlow: 'from-purple-600/25',
      dayUnselectedBg: 'bg-purple-50/80 hover:bg-purple-100/90',
      daySelectedBg: 'bg-purple-100',
      dayBorder: 'border-purple-200 hover:border-purple-400',
      dayTextTitle: 'text-purple-950',
      dayTextNumber: 'text-purple-700',
      dayBtnPlay: 'bg-purple-600 hover:bg-purple-700 text-white border-purple-700',
      dayGlow: 'from-purple-400/25',
    }
  },
  {
    id: 4,
    numberStr: '04',
    name: 'Coração',
    frequency: 136.1,
    description: 'Ressonância compassiva, tom primordial de equilíbrio.',
    color: {
      accentHex: '#34d399',
      nightUnselectedBg: 'bg-emerald-950/35 hover:bg-emerald-950/60',
      nightSelectedBg: 'bg-emerald-900/50',
      nightBorder: 'border-emerald-800/60 hover:border-emerald-500/80',
      nightTextTitle: 'text-emerald-200',
      nightTextNumber: 'text-emerald-400',
      nightBtnPlay: 'bg-emerald-700 hover:bg-emerald-600 text-white border-emerald-500',
      nightGlow: 'from-emerald-600/25',
      dayUnselectedBg: 'bg-emerald-50/80 hover:bg-emerald-100/90',
      daySelectedBg: 'bg-emerald-100',
      dayBorder: 'border-emerald-200 hover:border-emerald-400',
      dayTextTitle: 'text-emerald-950',
      dayTextNumber: 'text-emerald-700',
      dayBtnPlay: 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700',
      dayGlow: 'from-emerald-400/25',
    }
  },
  {
    id: 5,
    numberStr: '05',
    name: 'Vontade',
    frequency: 256,
    description: 'Intenção firme, direção clara e centro de gravidade.',
    color: {
      accentHex: '#fbbf24',
      nightUnselectedBg: 'bg-amber-950/35 hover:bg-amber-950/60',
      nightSelectedBg: 'bg-amber-900/50',
      nightBorder: 'border-amber-800/60 hover:border-amber-500/80',
      nightTextTitle: 'text-amber-200',
      nightTextNumber: 'text-amber-400',
      nightBtnPlay: 'bg-amber-700 hover:bg-amber-600 text-white border-amber-500',
      nightGlow: 'from-amber-600/25',
      dayUnselectedBg: 'bg-amber-50/80 hover:bg-amber-100/90',
      daySelectedBg: 'bg-amber-100',
      dayBorder: 'border-amber-200 hover:border-amber-400',
      dayTextTitle: 'text-amber-950',
      dayTextNumber: 'text-amber-700',
      dayBtnPlay: 'bg-amber-600 hover:bg-amber-700 text-white border-amber-700',
      dayGlow: 'from-amber-400/25',
    }
  },
  {
    id: 6,
    numberStr: '06',
    name: 'Energia',
    frequency: 320,
    description: 'Vitalidade sutil, expansão e fluxo contínuo.',
    color: {
      accentHex: '#fb7185',
      nightUnselectedBg: 'bg-rose-950/35 hover:bg-rose-950/60',
      nightSelectedBg: 'bg-rose-900/50',
      nightBorder: 'border-rose-800/60 hover:border-rose-500/80',
      nightTextTitle: 'text-rose-200',
      nightTextNumber: 'text-rose-400',
      nightBtnPlay: 'bg-rose-700 hover:bg-rose-600 text-white border-rose-500',
      nightGlow: 'from-rose-600/25',
      dayUnselectedBg: 'bg-rose-50/80 hover:bg-rose-100/90',
      daySelectedBg: 'bg-rose-100',
      dayBorder: 'border-rose-200 hover:border-rose-400',
      dayTextTitle: 'text-rose-950',
      dayTextNumber: 'text-rose-700',
      dayBtnPlay: 'bg-rose-600 hover:bg-rose-700 text-white border-rose-700',
      dayGlow: 'from-rose-400/25',
    }
  },
  {
    id: 7,
    numberStr: '07',
    name: 'Matéria',
    frequency: 72,
    description: 'Ancoramento, presença no corpo e estabilidade terrena.',
    color: {
      accentHex: '#fb923c',
      nightUnselectedBg: 'bg-orange-950/35 hover:bg-orange-950/60',
      nightSelectedBg: 'bg-orange-900/50',
      nightBorder: 'border-orange-800/60 hover:border-orange-500/80',
      nightTextTitle: 'text-orange-200',
      nightTextNumber: 'text-orange-400',
      nightBtnPlay: 'bg-orange-700 hover:bg-orange-600 text-white border-orange-500',
      nightGlow: 'from-orange-600/25',
      dayUnselectedBg: 'bg-orange-50/80 hover:bg-orange-100/90',
      daySelectedBg: 'bg-orange-100',
      dayBorder: 'border-orange-200 hover:border-orange-400',
      dayTextTitle: 'text-orange-950',
      dayTextNumber: 'text-orange-700',
      dayBtnPlay: 'bg-orange-600 hover:bg-orange-700 text-white border-orange-700',
      dayGlow: 'from-orange-400/25',
    }
  }
];
