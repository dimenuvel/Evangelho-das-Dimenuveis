import React from 'react';
import { useApp } from '../context/AppContext';
import { FileCheck } from 'lucide-react';

// ---------------------------------------------------------------------------
// Single source of truth for the Gospel PDF location.
// Change this if the filename/path in /public differs.
// ---------------------------------------------------------------------------
const PDF_URL = '/evangelho-das-dimenuveis.pdf';

// Bundled PDF.js prebuilt viewer (public/pdfjs/web/viewer.html).
// Do not point this at a CDN — it must be the local, offline copy.
const PDFJS_VIEWER_URL = '/pdfjs/web/viewer.html';

const PDF_METADATA = {
  title: 'EVANGELHO DAS DIMENÚVEIS',
  totalPages: 462
};

export const EvangelhoBook: React.FC = () => {
  const { language, theme } = useApp();
  const isDay = theme === 'day';

  const viewerSrc = `${PDFJS_VIEWER_URL}?file=${encodeURIComponent(PDF_URL)}`;

  return (
    <div className={`min-h-screen transition-colors duration-300 flex flex-col ${isDay ? 'bg-[#f8f5ee] text-[#1c1917]' : 'bg-[#06080f] text-neutral-200'}`}>
      {/* Header Banner */}
      <div className={`border-b px-4 py-3.5 ${
        isDay
          ? 'bg-gradient-to-r from-[#faf7f0] via-[#f3ece0] to-[#faf7f0] border-[#c5a059]/40'
          : 'bg-gradient-to-r from-[#0d1322] via-[#090d18] to-[#0d1322] border-[#c5a059]/30'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3 text-xs">
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
                  ? `Canonical PDF Manuscript • ${PDF_METADATA.totalPages} Pages • Author: Samuel M Tiem`
                  : `Manuscrito PDF Canônico • ${PDF_METADATA.totalPages} Páginas • Autor: Samuel M Tiem`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Body - Bundled PDF.js Viewer (offline, self-hosted) */}
      <div className={`flex-1 flex flex-col min-h-[80vh] ${isDay ? 'bg-[#f4efe3]' : 'bg-[#04060b]'}`}>
        <div className="flex-1 flex flex-col p-2 sm:p-4">
          <div className={`flex-1 rounded-xl border shadow-2xl overflow-hidden ${
            isDay
              ? 'bg-[#eae3d2] border-[#c5a059]/50 shadow-amber-900/10'
              : 'bg-[#0a0d18] border-[#c5a059]/40 shadow-black'
          }`}>
            <iframe
              src={viewerSrc}
              title={PDF_METADATA.title}
              className="w-full h-full min-h-[75vh] border-0"
              allow="fullscreen"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
