import React, { useState, useRef } from 'react';
import { BOOK_CHAPTERS, getChapterById } from '../data/bookData';
import { BookOpen, Search, Bookmark, Sparkles, ChevronRight } from 'lucide-react';

export const EvangelhoBook: React.FC = () => {
  const [selectedChapterId, setSelectedChapterId] = useState<string>('definicoes_prefacio');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('TODOS');

  const readerRef = useRef<HTMLDivElement | null>(null);

  const currentChapter = getChapterById(selectedChapterId) || BOOK_CHAPTERS[0];

  const handleSelectChapter = (id: string) => {
    setSelectedChapterId(id);
    if (readerRef.current) {
      readerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Filter chapters based on category and search query
  const filteredChapters = BOOK_CHAPTERS.filter((ch) => {
    const matchesCategory =
      activeCategoryFilter === 'TODOS' || ch.category === activeCategoryFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Top Banner */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-wide">
          Evangelho das Dimenúveis
        </h1>
        <p className="text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
          "O Livro transmite. O App pratica. O Tarô reflete. A Espiral conduz."
        </p>

        {/* Notice: Summaries Disclaimer */}
        <div className="max-w-2xl mx-auto p-3.5 bg-[#1c0d11]/90 border border-red-500/50 rounded-lg text-xs leading-relaxed space-y-1.5 text-center shadow-md">
          <p className="text-red-400 font-bold flex items-center justify-center gap-1.5 tracking-wide text-xs sm:text-sm">
            <BookOpen className="w-4 h-4 text-red-400 shrink-0" />
            <span>AVISO: RESUMOS CONTEMPLATIVOS</span>
          </p>
          <p className="text-red-300/90 text-[11px] sm:text-xs leading-relaxed">
            Os textos exibidos nesta seção são <strong>resumos e excertos direcionados</strong>. Os textos integrais completos e todas as práticas e rituais em sua totalidade estão presentes exclusivamente no livro <em>Evangelho das Dimenúveis</em>.
          </p>
        </div>
      </div>

      {/* Main Grid: Sidebar Chapters + Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar Chapter Selector */}
        <div className="lg:col-span-4 space-y-4 bg-[#0b0f19] border border-[#c5a059]/30 rounded-lg p-4">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar no Evangelho..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121826] border border-neutral-800 rounded-md pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {['TODOS', 'TRANSMISSÃO', 'EVANGELHO', 'MISTÉRIOS', 'SALMOS', 'GIROS', 'PROVÉRBIOS'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategoryFilter(cat)}
                className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-colors ${
                  activeCategoryFilter === cat
                    ? 'bg-[#c5a059] text-black'
                    : 'bg-[#121826] text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Chapter List (All visible, no inner scrollbar) */}
          <div className="space-y-2">
            {filteredChapters.map((ch) => {
              const isSelected = ch.id === selectedChapterId;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => handleSelectChapter(ch.id)}
                  className={`w-full text-left p-3 rounded-md border transition-all ${
                    isSelected
                      ? 'bg-[#141b2e] border-[#c5a059] text-[#f3e3a2] shadow-md shadow-[#c5a059]/10'
                      : 'bg-[#07090e] border-neutral-800/80 text-neutral-300 hover:bg-[#101524] hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#c5a059]">
                      {ch.category}
                    </span>
                    {isSelected && <ChevronRight className="w-3.5 h-3.5 text-[#c5a059]" />}
                  </div>
                  <h4 className="font-serif font-bold text-sm mt-1 leading-snug">
                    {ch.title}
                  </h4>
                  {ch.subtitle && (
                    <p className="text-[11px] text-neutral-400 truncate mt-0.5 font-serif italic">
                      {ch.subtitle}
                    </p>
                  )}
                </button>
              );
            })}

            {filteredChapters.length === 0 && (
              <p className="text-xs text-neutral-500 text-center py-6">
                Nenhum trecho encontrado para "{searchQuery}".
              </p>
            )}
          </div>
        </div>

        {/* Right Reader Container */}
        <div
          ref={readerRef}
          className="lg:col-span-8 bg-[#0b0f19] border border-[#c5a059]/30 rounded-lg p-6 sm:p-8 space-y-6 shadow-xl relative min-h-[550px] scroll-mt-6"
        >
          {/* Chapter Header */}
          <div className="border-b border-[#c5a059]/20 pb-4 space-y-1">
            <span className="text-xs font-bold tracking-widest uppercase text-[#c5a059]">
              {currentChapter.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#f3e3a2]">
              {currentChapter.title}
            </h2>
            {currentChapter.subtitle && (
              <p className="text-sm font-serif italic text-neutral-400">
                {currentChapter.subtitle}
              </p>
            )}
          </div>

          {/* Reader Body */}
          <div className="font-serif text-sm sm:text-base text-neutral-200 leading-relaxed space-y-4 whitespace-pre-line tracking-wide text-justify">
            {currentChapter.content.trim()}
          </div>
        </div>
      </div>
    </div>
  );
};
