import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { PDF_PAGES } from '../data/pdfPagesContent';

function sanitizeForWinAnsi(str: string): string {
  if (!str) return '';
  return str
    .replace(/→/g, '->')
    .replace(/•/g, '*')
    .replace(/🖼️/g, '[Poster]')
    .replace(/“/g, '"')
    .replace(/”/g, '"')
    .replace(/‘/g, "'")
    .replace(/’/g, "'")
    .replace(/—/g, '-')
    .replace(/–/g, '-')
    .replace(/🔥/g, '[Fogo]')
    .replace(/🌬️/g, '[Ar]')
    .replace(/💧/g, '[Agua]')
    .replace(/🪨/g, '[Terra]')
    .replace(/🌌/g, '[Cosmico]')
    .replace(/📜/g, '[Pergaminho]')
    .replace(/🕶️/g, '[OLED]')
    .replace(/☀️/g, '[Sol]')
    .replace(/…/g, '...')
    .replace(/[^\x00-\xFF]/g, ''); // strip any remaining non-latin1 characters
}

async function generateCanonicalPdf() {
  console.log('Generating canonical PDF document...');
  const pdfDoc = await PDFDocument.create();
  
  // Set metadata
  pdfDoc.setTitle('EVANGELHO DAS DIMENÚVEIS');
  pdfDoc.setAuthor('Samuel M Tiem');
  pdfDoc.setSubject('Obra Canônica Metagnóstica — Edição Oficial');
  pdfDoc.setCreator('Google AI Studio Build');

  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const timesBoldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const timesItalicFont = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
  const courierFont = await pdfDoc.embedFont(StandardFonts.Courier);

  // Colors
  const darkBg = rgb(0.03, 0.04, 0.07); // #080b12
  const goldColor = rgb(0.77, 0.63, 0.35); // #c5a059
  const lightGold = rgb(0.95, 0.89, 0.64); // #f3e3a2
  const whiteColor = rgb(0.9, 0.9, 0.9);
  const mutedText = rgb(0.6, 0.6, 0.65);
  const posterBg = rgb(0.08, 0.06, 0.04);

  // Total pages count
  const totalPagesCount = 462;

  for (let pageNum = 1; pageNum <= totalPagesCount; pageNum++) {
    const rawPageData = PDF_PAGES[pageNum] || {
      pageNumber: pageNum,
      bookTitle: 'EVANGELHO DAS DIMENÚVEIS',
      text: `[Página ${pageNum} — Evangelho das Dimenúveis]\n\n"Abida no padrão. Você é a forma."\n— Samuel M Tiem`
    };

    const pageData = {
      ...rawPageData,
      bookTitle: sanitizeForWinAnsi(rawPageData.bookTitle || ''),
      chapterTitle: rawPageData.chapterTitle ? sanitizeForWinAnsi(rawPageData.chapterTitle) : undefined,
      posterTitle: rawPageData.posterTitle ? sanitizeForWinAnsi(rawPageData.posterTitle) : undefined,
      posterSubtitle: rawPageData.posterSubtitle ? sanitizeForWinAnsi(rawPageData.posterSubtitle) : undefined,
      posterQuote: rawPageData.posterQuote ? sanitizeForWinAnsi(rawPageData.posterQuote) : undefined,
      text: sanitizeForWinAnsi(rawPageData.text || ''),
    };

    const page = pdfDoc.addPage([595.28, 841.89]); // A4 Size
    const { width, height } = page.getSize();

    // Draw background
    const isPoster = pageData.isPosterPage;
    page.drawRectangle({
      x: 0,
      y: 0,
      width,
      height,
      color: isPoster ? posterBg : darkBg,
    });

    // Draw Outer Ornamental Border
    page.drawRectangle({
      x: 20,
      y: 20,
      width: width - 40,
      height: height - 40,
      borderWidth: isPoster ? 2 : 1,
      borderColor: goldColor,
      opacity: isPoster ? 0.8 : 0.4,
    });

    page.drawRectangle({
      x: 24,
      y: 24,
      width: width - 48,
      height: height - 48,
      borderWidth: 0.5,
      borderColor: goldColor,
      opacity: 0.25,
    });

    // Draw Page Header
    if (pageNum > 1) {
      page.drawText('EVANGELHO DAS DIMENUVEIS', {
        x: 40,
        y: height - 38,
        size: 8,
        font: timesBoldFont,
        color: goldColor,
      });

      const headerChapter = (pageData.bookTitle || 'Obra Canonica').toUpperCase();
      const headerWidth = timesRomanFont.widthOfTextAtSize(headerChapter, 8);
      page.drawText(headerChapter, {
        x: width - 40 - headerWidth,
        y: height - 38,
        size: 8,
        font: timesItalicFont,
        color: lightGold,
      });

      page.drawLine({
        start: { x: 40, y: height - 44 },
        end: { x: width - 40, y: height - 44 },
        thickness: 0.5,
        color: goldColor,
        opacity: 0.3,
      });
    }

    // Draw Content
    if (isPoster) {
      // Poster Graphic Layout
      page.drawText('ILUSTRACAO & POSTER CANONICO', {
        x: width / 2 - timesBoldFont.widthOfTextAtSize('ILUSTRACAO & POSTER CANONICO', 10) / 2,
        y: height - 80,
        size: 10,
        font: courierFont,
        color: goldColor,
      });

      const title = pageData.posterTitle || pageData.bookTitle || 'POSTER CANONICO';
      page.drawText(title, {
        x: width / 2 - timesBoldFont.widthOfTextAtSize(title, 18) / 2,
        y: height - 130,
        size: 18,
        font: timesBoldFont,
        color: lightGold,
      });

      if (pageData.posterSubtitle) {
        page.drawText(pageData.posterSubtitle, {
          x: width / 2 - timesItalicFont.widthOfTextAtSize(pageData.posterSubtitle, 11) / 2,
          y: height - 155,
          size: 11,
          font: timesItalicFont,
          color: goldColor,
        });
      }

      // Draw Center Emblem Circle
      const centerX = width / 2;
      const centerY = height / 2 + 10;
      page.drawCircle({
        x: centerX,
        y: centerY,
        size: 90,
        borderWidth: 2,
        borderColor: goldColor,
        color: darkBg,
      });

      page.drawText('ABIDAR', {
        x: centerX - timesBoldFont.widthOfTextAtSize('ABIDAR', 16) / 2,
        y: centerY + 10,
        size: 16,
        font: timesBoldFont,
        color: lightGold,
      });

      page.drawText('VOCE E A FORMA', {
        x: centerX - timesRomanFont.widthOfTextAtSize('VOCE E A FORMA', 9) / 2,
        y: centerY - 12,
        size: 9,
        font: courierFont,
        color: goldColor,
      });

      if (pageData.posterQuote) {
        const quoteLines = splitTextIntoLines(`"${pageData.posterQuote}"`, 60);
        let quoteY = centerY - 130;
        for (const line of quoteLines) {
          page.drawText(line, {
            x: width / 2 - timesItalicFont.widthOfTextAtSize(line, 10) / 2,
            y: quoteY,
            size: 10,
            font: timesItalicFont,
            color: lightGold,
          });
          quoteY -= 15;
        }
      }

      // Poster Body text
      const posterLines = splitTextIntoLines(pageData.text, 65);
      let textY = centerY - 200;
      for (const line of posterLines.slice(0, 10)) {
        page.drawText(line, {
          x: width / 2 - timesRomanFont.widthOfTextAtSize(line, 9.5) / 2,
          y: textY,
          size: 9.5,
          font: timesRomanFont,
          color: whiteColor,
        });
        textY -= 14;
      }
    } else {
      // Regular Page Layout
      if (pageData.bookTitle && pageNum > 1) {
        page.drawText(pageData.bookTitle, {
          x: 45,
          y: height - 70,
          size: 13,
          font: timesBoldFont,
          color: lightGold,
        });
      }

      if (pageData.chapterTitle) {
        page.drawText(pageData.chapterTitle, {
          x: 45,
          y: height - 90,
          size: 10.5,
          font: timesItalicFont,
          color: goldColor,
        });
      }

      const textStartY = pageData.chapterTitle ? height - 120 : (pageNum === 1 ? height - 180 : height - 90);
      const lines = splitTextIntoLines(pageData.text, 72);
      let currentY = textStartY;

      for (const line of lines) {
        if (currentY < 60) break; // stop if overflowing page footer
        const font = line.startsWith('I -') || line.startsWith('II -') || line.startsWith('LIVRO') || line.startsWith('GIRO') || line.startsWith('FRAME')
          ? timesBoldFont
          : (line.startsWith('"') ? timesItalicFont : timesRomanFont);

        const color = line.startsWith('LIVRO') || line.startsWith('GIRO') || line.startsWith('FRAME')
          ? lightGold
          : whiteColor;

        page.drawText(line, {
          x: 45,
          y: currentY,
          size: 10,
          font,
          color,
        });
        currentY -= 14.5;
      }
    }

    // Page Footer
    page.drawLine({
      start: { x: 40, y: 44 },
      end: { x: width - 40, y: 44 },
      thickness: 0.5,
      color: goldColor,
      opacity: 0.3,
    });

    const pageStr = `${pageNum}`;
    const pageNumWidth = timesBoldFont.widthOfTextAtSize(pageStr, 10);
    page.drawText(pageStr, {
      x: width / 2 - pageNumWidth / 2,
      y: 30,
      size: 10,
      font: timesBoldFont,
      color: goldColor,
    });

    page.drawText('Samuel M Tiem', {
      x: 40,
      y: 30,
      size: 8,
      font: timesItalicFont,
      color: mutedText,
    });

    page.drawText('Metagnose', {
      x: width - 40 - timesRomanFont.widthOfTextAtSize('Metagnose', 8),
      y: 30,
      size: 8,
      font: timesRomanFont,
      color: mutedText,
    });
  }

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.join(process.cwd(), 'public', 'evangelho-das-dimenuveis.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`PDF created successfully at: ${outputPath} (${(pdfBytes.length / 1024 / 1024).toFixed(2)} MB)`);
}

function splitTextIntoLines(text: string, maxCharsPerLine: number): string[] {
  const rawLines = text.split('\n');
  const result: string[] = [];

  for (const rawLine of rawLines) {
    if (rawLine.length <= maxCharsPerLine) {
      result.push(rawLine);
    } else {
      const words = rawLine.split(' ');
      let current = '';
      for (const word of words) {
        if ((current + ' ' + word).trim().length <= maxCharsPerLine) {
          current = (current + ' ' + word).trim();
        } else {
          if (current) result.push(current);
          current = word;
        }
      }
      if (current) result.push(current);
    }
  }

  return result;
}

generateCanonicalPdf().catch((err) => {
  console.error('Failed to generate PDF:', err);
  process.exit(1);
});
