import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Download,
  FileCheck,
  ExternalLink,
  AlertTriangle
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

export const EvangelhoBook: React.FC = () => {
  const { language, theme } = useApp();
  const isDay = theme === 'day';

  // Tracks whether the user has indicated the embedded viewer failed to
  // render (some in-app WebViews / older browsers can't display PDFs
  // inline). This never replaces the PDF — it only reveals an extra
  // fallback affordance alongside it.
  const [embedFailed, setEmbedFailed] = useState(false);

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
                  ? `Canonical PDF Manuscript • ${PDF_METADATA.totalPages} Pages • Author: Samuel M Tiem`
                  : `Manuscrito PDF Canônico • ${PDF_METADATA.totalPages} Páginas • Autor: Samuel M Tiem`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Open in new tab (uses the browser's own PDF viewer/controls) */}
            <a
              href={PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-3 py-2 rounded-lg border font-mono font-bold text-xs flex items-center gap-2 transition-all active:scale-95 shrink-0 ${
                isDay
                  ? 'border-[#c5a059]/50 text-[#78350f] hover:bg-[#c5a059]/10'
                  : 'border-[#c5a059]/40 text-[#f3e3a2] hover:bg-[#c5a059]/10'
              }`}
              title={language === 'en' ? 'Open PDF in New Tab' : 'Abrir PDF em Nova Aba'}
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">{language === 'en' ? 'Open' : 'Abrir'}</span>
            </a>

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

      {/* Main Body - Native Browser PDF Embed */}
      <div className={`flex-1 flex flex-col min-h-[80vh] ${isDay ? 'bg-[#f4efe3]' : 'bg-[#04060b]'}`}>
        <div className="flex-1 flex flex-col p-2 sm:p-4">
          <div className={`flex-1 rounded-xl border shadow-2xl overflow-hidden ${
            isDay
              ? 'bg-[#eae3d2] border-[#c5a059]/50 shadow-amber-900/10'
              : 'bg-[#0a0d18] border-[#c5a059]/40 shadow-black'
          }`}>
            {/*
              <object> is used instead of a bare <iframe> because it gives us
              a genuine, browser-native fallback: if the browser/WebView has
              no PDF renderer registered for the type, the child content
              below is displayed automatically — no JS detection needed.
              The <embed> nested inside covers browsers that render object
              fallbacks differently. Both point at the same, unmodified
              existing PDF_URL.
            */}
            <object
              data={PDF_URL}
              type="application/pdf"
              className="w-full h-full min-h-[75vh]"
              aria-label={PDF_METADATA.title}
            >
              <embed
                src={PDF_URL}
                type="application/pdf"
                className="w-full h-full min-h-[75vh]"
              />

              {/* Native fallback content — shown only if neither <object> nor <embed> can render the PDF */}
              <div className="w-full h-full min-h-[75vh] flex items-center justify-center p-8">
                <div className="text-center space-y-4 max-w-md">
                  <AlertTriangle className={`w-10 h-10 mx-auto ${isDay ? 'text-[#92400e]' : 'text-[#c5a059]'}`} />
                  <p className={`font-serif text-sm ${isDay ? 'text-stone-700' : 'text-neutral-300'}`}>
                    {language === 'en'
                      ? 'Your browser cannot display this PDF inline. You can still open or download the original document.'
                      : 'Seu navegador não consegue exibir este PDF diretamente. Você ainda pode abrir ou baixar o documento original.'}
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <a
                      href={PDF_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border font-bold text-xs ${
                        isDay ? 'border-[#c5a059]/50 text-[#78350f]' : 'border-[#c5a059]/40 text-[#f3e3a2]'
                      }`}
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>{language === 'en' ? 'Open PDF' : 'Abrir PDF'}</span>
                    </a>
                    <a
                      href={PDF_URL}
                      download="Evangelho-das-Dimenuveis-Obra-Canonica.pdf"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#c5a059] to-[#e5c158] text-black font-bold text-xs shadow-lg"
                    >
                      <Download className="w-4 h-4" />
                      <span>{language === 'en' ? 'Download PDF' : 'Baixar PDF'}</span>
                    </a>
                  </div>
                </div>
              </div>
            </object>
          </div>

          {/* Small, always-visible fallback affordance for in-app WebViews that
              silently render a blank frame instead of triggering the native
              <object> fallback above (common on some Android Capacitor builds). */}
          <div className="mt-2 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setEmbedFailed((v) => !v)}
              className={`text-[11px] font-serif italic underline underline-offset-2 opacity-70 hover:opacity-100 transition-opacity ${
                isDay ? 'text-stone-600' : 'text-neutral-400'
              }`}
            >
              {language === 'en' ? "PDF not showing?" : 'O PDF não aparece?'}
            </button>
          </div>

          {embedFailed && (
            <div className={`mt-2 p-4 rounded-lg border text-center space-y-3 ${
              isDay ? 'bg-[#eae3d2] border-[#c5a059]/40' : 'bg-[#0a0d18] border-[#c5a059]/30'
            }`}>
              <p className={`font-serif text-xs ${isDay ? 'text-stone-700' : 'text-neutral-300'}`}>
                {language === 'en'
                  ? 'Some in-app browsers cannot preview PDFs. Open or download the original file directly:'
                  : 'Alguns navegadores internos do app não conseguem pré-visualizar PDFs. Abra ou baixe o arquivo original diretamente:'}
              </p>
              <div className="flex items-center justify-center gap-3">
                <a
                  href={PDF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border font-bold text-xs ${
                    isDay ? 'border-[#c5a059]/50 text-[#78350f]' : 'border-[#c5a059]/40 text-[#f3e3a2]'
                  }`}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{language === 'en' ? 'Open PDF' : 'Abrir PDF'}</span>
                </a>
                <a
                  href={PDF_URL}
                  download="Evangelho-das-Dimenuveis-Obra-Canonica.pdf"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#c5a059] to-[#e5c158] text-black font-bold text-xs shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  <span>{language === 'en' ? 'Download PDF' : 'Baixar PDF'}</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
