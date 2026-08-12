import { GOSPEL_CHAPTERS_PART1 } from './gospelPart1';
import { GOSPEL_CHAPTERS_PART2 } from './gospelPart2';
import { GOSPEL_CHAPTERS_PART3 } from './gospelPart3';
import { GOSPEL_CHAPTERS_PART4 } from './gospelPart4';
import { GOSPEL_CHAPTERS_PROVERBIOS } from './proverbiosData';

export interface BookChapter {
  id: string;
  title: string;
  subtitle?: string;
  category: 'TRANSMISSÃO' | 'EVANGELHO' | 'MISTÉRIOS' | 'SALMOS' | 'GIROS' | 'PROVÉRBIOS';
  content: string;
}

export const BOOK_CHAPTERS: BookChapter[] = [
  ...GOSPEL_CHAPTERS_PART1,
  ...GOSPEL_CHAPTERS_PART2,
  ...GOSPEL_CHAPTERS_PART3,
  ...GOSPEL_CHAPTERS_PART4,
  ...GOSPEL_CHAPTERS_PROVERBIOS
];

export function getChapterById(id: string): BookChapter | undefined {
  return BOOK_CHAPTERS.find((ch) => ch.id === id);
}
