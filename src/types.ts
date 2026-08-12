/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type NavigationTab = 'home' | 'espiral' | 'pratica_hoje' | 'oraculo' | 'evangelho';

export type GiroState = 'BLOQUEADO' | 'EM PRÁTICA' | 'CONCLUÍDO';

export type PracticeCategory = 
  | 'TRANSMISSÃO'
  | 'INSIGHT'
  | 'PRÁTICA'
  | 'EXERCÍCIO'
  | 'REFLEXÃO'
  | 'VERSÍCULO'
  | 'FECHAMENTO';

export interface PracticeStep {
  category: PracticeCategory;
  title: string;
  content: string;
}

export interface Practice {
  id: string;
  giroId: number; // 1 to 10
  title: string;
  shortDescription: string;
  instructions: string;
  suggestedDurationMinutes: number;
  steps?: PracticeStep[];
  bookVersicleRef?: string;
  bookChapterRef?: string;
}

export interface Giro {
  id: number; // 1 to 10
  numberRoman: string; // 'GIRO I', etc.
  title: string; // User facing title e.g. "O ESPELHO DA MENTE"
  bookTitle: string; // "Giro I — A Mente"
  dimension: string; // e.g. "Mente", "Vontade", etc.
  virtue: string;
  shadow: string;
  tool: string;
  word: string;
  summary: string;
  transmissaoText: string;
  insightText: string;
  versiculoText: string;
  fechamentoText: string;
  practices: Practice[];
}

export interface TarotCard {
  id: string;
  number: string; // '0', 'I', 'II', ..., 'XXI', '♾️'
  name: string;
  dimentionName: string;
  tagline: string;
  description: string;
  reflection: string;
  giroReflection: Record<number, string>; // Reflection relative to each Giro 1..10
  iconName?: string;
  isSecretCard?: boolean;
}

export interface TarotReading {
  timestamp?: number;
  date: string;
  cards: {
    position: 'onde_estou' | 'oque_esquecendo' | 'oque_ja_aqui';
    positionTitle: string;
    card: TarotCard;
  }[];
  activeGiroAtTime: number;
}

export interface PracticeLog {
  id: string;
  practiceId: string;
  giroId: number;
  completedAt: string; // ISO date
  durationMinutes: number;
  notes?: string;
}

export interface UserProfile {
  id: string;
  name: string; // Required
  age?: string; // Optional
  sex?: string; // Optional
  createdAt: string;
  unlockedGiros: number[];
  completedGiros: number[];
  completedPractices: string[];
  activeGiroId: number;
  practiceLogs: PracticeLog[];
  tarotReadings: TarotReading[];
}

export interface UserProgress {
  unlockedGiros: number[]; // e.g. [1]
  completedGiros: number[]; // e.g. []
  completedPractices: string[]; // array of practice IDs
  currentGiroId: number; // default 1
  logs: PracticeLog[];
  tarotReadings: TarotReading[];
}
