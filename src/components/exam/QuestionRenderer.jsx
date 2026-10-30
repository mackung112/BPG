import React, { useState } from 'react';
import { ZoomIn, X, Image as ImageIcon } from 'lucide-react';

/**
 * Tokenize GIFT/HTML/Markdown rich content into text, br, and image tokens.
 * Safe tokenizer that avoids dangerouslySetInnerHTML.
 */
export function parseRichQuestionContent(rawText) {
  if (!rawText || typeof rawText !== 'string') return [];

  // Strip Moodle [html] prefix if present
  let text = rawText.replace(/^\[html\]\s*/i, '');

  // Combined regex to match:
  // 1. HTML <img> tags (<img ... /?>)
  // 2. Markdown images (![alt](url))
  // 3. HTML linebreaks (<br\s*/?>)
  const tagRegex = /(<img\s+[^>]*\/?>)|(!\[(.*?)\]\((.*?)\))|(<br\s*\/?>)/gi;

  const tokens = [];
  let lastIndex = 0;
  let match;

  while ((match = tagRegex.exec(text)) !== null) {
    const matchIndex = match.index;
    if (matchIndex > lastIndex) {
      tokens.push({
        type: 'text',
        text: text.substring(lastIndex, matchIndex)
      });
    }

    if (match[1]) {
      // HTML <img> tag
      const tagContent = match[1];
      const srcMatch = tagContent.match(/src=["']([^"']+)["']/i);
      const altMatch = tagContent.match(/alt=["']([^"']+)["']/i);
      const widthMatch = tagContent.match(/width=["']?(\d+%?|\d+px)?["']?/i);
      const heightMatch = tagContent.match(/height=["']?(\d+%?|\d+px)?["']?/i);
      const classMatch = tagContent.match(/class(?:Name)?=["']([^"']+)["']/i);

      const src = srcMatch ? srcMatch[1] : '';
      if (src) {
        tokens.push({
          type: 'image',
          src,
          alt: altMatch ? altMatch[1] : 'ภาพประกอบข้อสอบ',
          width: widthMatch ? widthMatch[1] : undefined,
          height: heightMatch ? heightMatch[1] : undefined,
          customClass: classMatch ? classMatch[1] : undefined
        });
      }
    } else if (match[2]) {
      // Markdown image: ![alt](url)
      const alt = match[3] || 'ภาพประกอบข้อสอบ';
      const src = match[4] || '';
      if (src) {
        tokens.push({
          type: 'image',
          src: src.trim(),
          alt: alt.trim()
        });
      }
    } else if (match[5]) {
      // HTML <br>
      tokens.push({ type: 'br' });
    }

    lastIndex = tagRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    tokens.push({
      type: 'text',
      text: text.substring(lastIndex)
    });
  }

  return tokens;
}

/**
 * QuestionRenderer
 * Component for safely rendering GIFT format question texts and choices
 * with embedded Base64 images, external image URLs, and inline icons.
 *
 * Props:
 *  - content: string
 *  - inline: boolean (render as inline span with inline icons)
 *  - compact: boolean (render small thumbnail tags for lists/pickers)
 *  - className: string
 *  - enableZoom: boolean (default true, allows clicking to expand diagram)
 */
export default function QuestionRenderer({
  content,
  inline = false,
  compact = false,
  className = '',
  enableZoom = true
}) {
  const [zoomImage, setZoomImage] = useState(null);

  if (!content) return null;

  const tokens = parseRichQuestionContent(content);

  // If no rich tokens (just plain text), render simple span
  if (tokens.length === 1 && tokens[0].type === 'text') {
    return <span className={className}>{tokens[0].text}</span>;
  }

  const handleImageClick = (e, src, alt) => {
    if (!enableZoom) return;
    e.stopPropagation();
    setZoomImage({ src, alt });
  };

  const closeZoom = (e) => {
    if (e) e.stopPropagation();
    setZoomImage(null);
  };

  const renderContent = () => {
    return tokens.map((token, idx) => {
      if (token.type === 'text') {
        return <span key={idx}>{token.text}</span>;
      }

      if (token.type === 'br') {
        return inline ? ' ' : <br key={idx} />;
      }

      if (token.type === 'image') {
        // Compact thumbnail mode for lists / pickers
        if (compact) {
          return (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[10px] text-zinc-600 dark:text-zinc-300 font-mono align-middle mx-1"
              title={token.alt || 'รูปภาพประกอบ'}
            >
              <img
                src={token.src}
                alt={token.alt}
                className="w-4 h-4 object-contain inline-block rounded-xs"
                loading="lazy"
              />
              <span className="text-[10px] font-sans font-medium">[รูปภาพ]</span>
            </span>
          );
        }

        // Check if explicitly styled as a small icon (height specified <= 36px or inline mode)
        const isSmallIcon = inline || (token.height && parseInt(token.height, 10) <= 36);

        if (isSmallIcon) {
          const heightVal = token.height
            ? (token.height.endsWith('px') || token.height.endsWith('%') ? token.height : `${token.height}px`)
            : '20px';

          return (
            <img
              key={idx}
              src={token.src}
              alt={token.alt}
              style={{
                height: heightVal,
                width: token.width ? (token.width.endsWith('px') || token.width.endsWith('%') ? token.width : `${token.width}px`) : 'auto',
                maxHeight: '36px'
              }}
              className="inline-block align-middle mx-1 object-contain rounded cursor-pointer hover:opacity-90 active:scale-95 transition-all"
              onClick={(e) => handleImageClick(e, token.src, token.alt)}
              loading="lazy"
            />
          );
        }

        // Block Diagram / Question Image
        return (
          <span key={idx} className="block my-2 text-center">
            <span className="relative group inline-block max-w-full">
              <img
                src={token.src}
                alt={token.alt}
                style={{
                  maxHeight: '320px',
                  maxWidth: '100%',
                  height: token.height && parseInt(token.height, 10) > 36
                    ? (token.height.endsWith('px') ? token.height : `${token.height}px`)
                    : undefined
                }}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs bg-zinc-50 dark:bg-zinc-950 p-1 object-contain mx-auto transition-transform duration-150 group-hover:scale-[1.01] cursor-zoom-in"
                onClick={(e) => handleImageClick(e, token.src, token.alt)}
                loading="lazy"
              />
              {enableZoom && (
                <span className="absolute bottom-2 right-2 bg-zinc-900/80 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 pointer-events-none shadow-sm">
                  <ZoomIn className="w-3 h-3" /> ขยายภาพ
                </span>
              )}
            </span>
          </span>
        );
      }

      return null;
    });
  };

  return (
    <>
      <span className={className}>{renderContent()}</span>

      {/* Lightbox Modal for enlarged view */}
      {zoomImage && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={closeZoom}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-fade-in cursor-zoom-out"
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-white dark:bg-zinc-900 rounded-3xl p-3 sm:p-4 shadow-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col items-center cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                <ImageIcon className="w-4 h-4 text-indigo-500" />
                <span>{zoomImage.alt || 'ดูรูปภาพขนาดเต็ม'}</span>
              </div>
              <button
                type="button"
                onClick={closeZoom}
                className="p-1 rounded-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                title="ปิด"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-auto max-h-[75vh] flex items-center justify-center p-2 bg-zinc-50 dark:bg-zinc-950 rounded-2xl w-full">
              <img
                src={zoomImage.src}
                alt={zoomImage.alt}
                className="max-h-[70vh] max-w-full object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
