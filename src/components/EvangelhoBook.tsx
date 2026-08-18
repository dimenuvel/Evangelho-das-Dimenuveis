import React, { useState, useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { useApp } from '../context/AppContext';
import {
  Download,
  FileCheck,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ZoomIn,
  ZoomOut,
  Loader2
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Single source of truth for the Gospel PDF location.
// Change this if the filename/path in /public differs.
// ---------------------------------------------------------------------------
const PDF_URL = '/evangelho-das-dimenuveis.pdf';

const PDF_METADATA = {
  title: 'EVANGELHO DAS DIMENÚVEIS',
  totalPages: 462
};

// Configure worker for pdfjs-dist
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;

export const EvangelhoBook: React.FC = () => {
  const { language, theme } = useApp();

  // State
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [totalPages, setTotalPages] = useState<number>(PDF_METADATA.totalPages || 462);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageInput, setPageInput] = useState<string>('1');
  const [zoomScale, setZoomScale] = useState<number>(1.0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const renderTaskRef = useRef<any>(null);

  // Load PDF Document
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const loadingTask = pdfjsLib.getDocument(PDF_URL);
    loadingTask.promise
      .then((doc) => {
        if (!isMounted) return;
        setPdfDoc(doc);
        setTotalPages(doc.numPages);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load PDF with PDF.js:', err);
        if (isMounted) {
          setError(
            language === 'en'
              ? 'Could not load PDF document directly.'
              : 'Não foi possível carregar o documento PDF diretamente.'
          );
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [language]);

  // Sync pageInput when currentPage changes
  useEffect(() => {
    setPageInput(currentPage.toString());
  }, [currentPage]);

  // Render Page to Canvas
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;

    let isCancelled = false;

    const renderPage = async () => {
      try {
        const page = await pdfDoc.getPage(currentPage);
        if (isCancelled || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Determine base width from container
        const containerWidth = containerRef.current?.clientWidth || 800;
        const availableWidth = Math.max(300, containerWidth - 32);

        const unscaledViewport = page.getViewport({ scale: 1.0 });
        const fitScale = availableWidth / unscaledViewport.width;
        const finalScale = fitScale * zoomScale;

        const viewport = page.getViewport({ scale: finalScale });

        // Adjust for device pixel ratio for crisp rendering
        const outputScale = window.devicePixelRatio || 1;
        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

        const renderContext = {
          canvasContext: ctx,
          transform: transform || undefined,
          viewport: viewport,
        };

        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
        }

        const task = page.render(renderContext);
        renderTaskRef.current = task;
        await task.promise;
      } catch (err: any) {
        if (err?.name !== 'RenderingCancelledException') {
          console.error('Error rendering page:', err);
        }
      }
    };

    renderPage();

    return () => {
      isCancelled = true;
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }
    };
  }, [pdfDoc, currentPage, zoomScale]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT') return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        goToPage(currentPage + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        goToPage(currentPage - 1);
      } else if (e.key === 'Home') {
        goToPage(1);
      } else if (e.key === 'End') {
        goToPage(totalPages);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages]);

  // Page Navigation Handlers
  const goToPage = (page: number) => {
    const target = Math.max(1, Math.min(totalPages, page));
    setCurrentPage(target);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  };

  const handlePageInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(pageInput, 10);
    if (!isNaN(parsed)) {
      goToPage(parsed);
    } else {
      setPageInput(currentPage.toString());
    }
  };

  // Zoom Handlers
  const zoomIn = () => setZoomScale((prev) => Math.min(prev + 0.25, 2.5));
  const zoomOut = () => setZoomScale((prev) => Math.max(prev - 0.25, 0.5));

  const isDay = theme === 'day';

  return (
    <div className={`min-h-screen transition-colors duration-300 flex flex-col ${isDay ? 'bg-[#f8f5ee] text-[#1c1917]' : 'bg-[#06080f] text-neutral-200'}`}>
      {/* Header Banner & Download Button */}
      <div className={`border-b px-4 py-3.5 ${
        isDay
          ? 'bg-gradient-to-r from-[#faf7f0] via-[#f3ece0] to-[#faf7f0] border-[#c5a059]/40'
          : 'bg-gradient-to-r from-[#0d1322] via-[#090d18] to-[#0d1322] border-[#c5a059]/30'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg border shrink-0 ${
              isDay ? 'bg-[#c5a059]/15 border-[#c5a059]/40 text-[#78350f]' : 'bg-[#c5a059]/20 border-[#c5a059]/40 text-[#f3e3a2]'
            }`}>
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className={`font-serif font-bold text-sm tracking-wide ${isDay ? 'text-[#78350f]' : 'text-[#f3e3a2]'}`}>
                {PDF_METADATA.title}
              </h2>
              <p className={`text-[11px] font-serif italic mt-0.5 ${isDay ? 'text-stone-600' : 'text-neutral-400'}`}>
                {language === 'en'
                  ? `Canonical PDF Manuscript • ${totalPages} Pages • Author: Samuel M Tiem`
                  : `Manuscrito PDF Canônico • ${totalPages} Páginas • Autor: Samuel M Tiem`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Direct Download Button */}
            <a
              href={PDF_URL}
              download="Evangelho-das-Dimenuveis-Obra-Canonica.pdf"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#c5a059] to-[#e5c158] hover:from-[#d4af37] text-black font-mono font-bold text-xs flex items-center gap-2 shadow-lg transition-all active:scale-95 shrink-0"
              title={language === 'en' ? 'Download PDF File' : 'Baixar PDF'}
            >
              <Download className="w-4 h-4" />
              <span>{language === 'en' ? 'Download PDF' : 'Baixar PDF'}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Embedded PDF Controls Toolbar — Page Stepper Navigation + Fixed Zoom Controls (Single-line, no layout shifts) */}
      <div className={`sticky top-0 z-20 border-b backdrop-blur-md px-3 py-2 shadow-md ${
        isDay
          ? 'bg-[#f2ece0]/95 border-[#c5a059]/30 text-stone-800'
          : 'bg-[#0b0f1a]/95 border-[#c5a059]/20 text-neutral-200'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between sm:justify-center gap-2 sm:gap-4 text-xs overflow-x-auto custom-scrollbar">
          {/* Page Stepper Navigation (Single Line) */}
          <div className={`flex items-center gap-0.5 sm:gap-1 p-1 rounded-lg border font-mono shrink-0 whitespace-nowrap ${
            isDay ? 'bg-stone-200/90 border-stone-300' : 'bg-black/60 border-white/10'
          }`}>
            <button
              type="button"
              onClick={() => goToPage(1)}
              disabled={currentPage <= 1}
              className="p-1.5 rounded hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-30 transition-colors shrink-0"
              title={language === 'en' ? 'First Page' : 'Primeira Página'}
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage <= 1}
              className="p-1.5 rounded hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-30 transition-colors shrink-0"
              title={language === 'en' ? 'Previous Page' : 'Página Anterior'}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <form onSubmit={handlePageInputSubmit} className="flex items-center gap-1 px-1 shrink-0">
              <span className="text-[10px] uppercase opacity-75 shrink-0">
                {language === 'en' ? 'P.' : 'Pág'}
              </span>
              <input
                type="text"
                value={pageInput}
                onChange={(e) => setPageInput(e.target.value)}
                onBlur={handlePageInputSubmit}
                className={`w-11 text-center border rounded py-0.5 px-0.5 font-bold text-xs focus:outline-none shrink-0 ${
                  isDay
                    ? 'bg-white border-stone-300 text-[#78350f] focus:border-[#92400e]'
                    : 'bg-black/80 border-white/20 text-[#c5a059] focus:border-[#c5a059]'
                }`}
              />
              <span className="text-[10px] opacity-75 shrink-0">/ {totalPages}</span>
            </form>

            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="p-1.5 rounded hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-30 transition-colors shrink-0"
              title={language === 'en' ? 'Next Page' : 'Próxima Página'}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => goToPage(totalPages)}
              disabled={currentPage >= totalPages}
              className="p-1.5 rounded hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-30 transition-colors shrink-0"
              title={language === 'en' ? 'Last Page' : 'Última Página'}
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>

          {/* Fixed-Width Zoom Controls (Without reset option, single line) */}
          <div className={`flex items-center gap-0.5 sm:gap-1 p-1 rounded-lg border font-mono text-xs shrink-0 whitespace-nowrap min-w-[110px] justify-center ${
            isDay ? 'bg-stone-200/90 border-stone-300' : 'bg-black/60 border-white/10'
          }`}>
            <button
              type="button"
              onClick={zoomOut}
              disabled={zoomScale <= 0.5}
              className="p-1.5 rounded hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-30 transition-colors shrink-0"
              title={language === 'en' ? 'Zoom Out' : 'Diminuir Zoom'}
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            <span className={`w-12 text-center font-bold text-[11px] shrink-0 ${isDay ? 'text-[#78350f]' : 'text-[#c5a059]'}`}>
              {Math.round(zoomScale * 100)}%
            </span>

            <button
              type="button"
              onClick={zoomIn}
              disabled={zoomScale >= 2.5}
              className="p-1.5 rounded hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-30 transition-colors shrink-0"
              title={language === 'en' ? 'Zoom In' : 'Aumentar Zoom'}
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Body - Embedded PDF Canvas Container */}
      <div
        ref={containerRef}
        className={`flex-1 overflow-auto p-3 sm:p-6 flex flex-col items-center justify-start min-h-[75vh] ${
          isDay ? 'bg-[#f4efe3]' : 'bg-[#04060b]'
        }`}
      >
        <div className="w-full max-w-5xl flex flex-col items-center justify-center">
          {loading && (
            <div className={`py-24 flex flex-col items-center justify-center space-y-4 ${isDay ? 'text-[#78350f]' : 'text-[#c5a059]'}`}>
              <Loader2 className="w-10 h-10 animate-spin" />
              <p className={`font-serif text-sm tracking-wide ${isDay ? 'text-stone-700' : 'text-neutral-300'}`}>
                {language === 'en'
                  ? 'Loading PDF manuscript...'
                  : 'Carregando o manuscrito PDF...'}
              </p>
            </div>
          )}

          {error && (
            <div className="p-8 text-center space-y-4 max-w-md bg-red-950/30 border border-red-500/30 rounded-xl my-12">
              <p className="text-red-300 font-serif text-sm">{error}</p>
              <a
                href={PDF_URL}
                download="Evangelho-das-Dimenuveis-Obra-Canonica.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#c5a059] text-black font-bold rounded-lg shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>{language === 'en' ? 'Download PDF' : 'Baixar PDF'}</span>
              </a>
            </div>
          )}

          {/* Pure HTML5 Canvas Rendering */}
          <div
            className={`transition-opacity duration-200 ${
              loading ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'
            } flex justify-center w-full`}
          >
            <div className={`p-2 sm:p-4 rounded-xl border shadow-2xl overflow-x-auto max-w-full ${
              isDay
                ? 'bg-[#eae3d2] border-[#c5a059]/50 shadow-amber-900/10'
                : 'bg-[#0a0d18] border-[#c5a059]/40 shadow-black'
            }`}>
              <canvas
                ref={canvasRef}
                className="mx-auto rounded shadow-lg bg-white block transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
