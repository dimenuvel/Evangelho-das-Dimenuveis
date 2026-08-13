import { GOSPEL_INTRO } from './gospel/intro';
import { GOSPEL_LIVRO1 } from './gospel/livro1';
import { GOSPEL_LIVRO2 } from './gospel/livro2';
import { GOSPEL_LIVRO3 } from './gospel/livro3';
import { GOSPEL_LIVRO4 } from './gospel/livro4';
import { GOSPEL_LIVRO5 } from './gospel/livro5';
import { GOSPEL_LIVRO6 } from './gospel/livro6';
import { GOSPEL_LIVRO8 } from './gospel/livro8';
import { GOSPEL_LIVRO9 } from './gospel/livro9';
import { GOSPEL_PARTE_FINAL } from './gospel/parteFinal';
import { GOSPEL_APENDICE } from './gospel/apendice';

export interface BookChapter {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  content: string;
}

export const BOOK_CHAPTERS: BookChapter[] = [
  GOSPEL_INTRO,
  GOSPEL_LIVRO1,
  GOSPEL_LIVRO2,
  GOSPEL_LIVRO3,
  GOSPEL_LIVRO4,
  GOSPEL_LIVRO5,
  GOSPEL_LIVRO6,
  GOSPEL_LIVRO8,
  GOSPEL_LIVRO9,
  GOSPEL_PARTE_FINAL,
  GOSPEL_APENDICE
];

export function getChapterById(id: string): BookChapter | undefined {
  return BOOK_CHAPTERS.find((ch) => ch.id === id);
}
