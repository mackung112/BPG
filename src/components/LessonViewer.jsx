import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import StandardHeader from './StandardHeader';

const interactiveModules = import.meta.glob('./interactive/**/*.jsx', { eager: true });

const COMPONENT_MAP = {};
for (const path in interactiveModules) {
  const componentName = path.split('/').pop().replace('.jsx', '');
  COMPONENT_MAP[`[${componentName}]`] = interactiveModules[path].default;
}

// HTML Embed component — ฝัง .html จาก interactive/<วิชา>/ ผ่าน iframe
function HtmlEmbed({ src }) {
  const iframeRef = useRef(null);
  const [height, setHeight] = useState(800);

  useEffect(() => {
    const handleMessage = (e) => {
      if (e.data?.type === 'resize' && e.data?.height) {
        setHeight(e.data.height);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src={src}
      className="w-full border-0 rounded-2xl"
      style={{ height: `${height}px`, minHeight: '400px' }}
      title="Embedded Lesson Content"
      sandbox="allow-scripts allow-same-origin"
      onLoad={() => {
        try {
          const doc = iframeRef.current?.contentDocument;
          if (doc) {
            setHeight(doc.documentElement.scrollHeight + 32);
          }
        } catch {
          // cross-origin, ใช้ postMessage แทน
        }
      }}
    />
  );
}

// สร้าง map สำหรับไฟล์ HTML ที่อยู่ใน interactive/
const htmlModules = import.meta.glob('./interactive/**/*.html', { query: '?url', import: 'default', eager: true });
const HTML_MAP = {};
for (const path in htmlModules) {
  const fileName = path.split('/').pop().replace('.html', '');
  HTML_MAP[`[html:${fileName}]`] = htmlModules[path];
}


export default function LessonViewer({ lesson, chapter, onComplete, onNext, onPrev, hasPrev = false, hasNext = true }) {
  if (!lesson.content) return null;

  // แยกเนื้อหาออกเป็นส่วนๆ ตาม Marker ของ Component และ HTML
  const allKeys = [...Object.keys(COMPONENT_MAP), ...Object.keys(HTML_MAP)];
  const escapedKeys = allKeys.map(k => k.replace(/\[/g, '\\[').replace(/\]/g, '\\]'));
  const markerPattern = escapedKeys.length > 0 ? new RegExp(`(${escapedKeys.join('|')})`) : /(?!)/;
  const parts = lesson.content.split(markerPattern);

  // ตรวจสอบว่าในบทเรียนมี Interactive Component หรือ HTML อยู่หรือไม่
  const immersivePart = parts.find(part => COMPONENT_MAP[part] || HTML_MAP[part]);
  const isImmersive = Boolean(immersivePart);

  const renderContent = () => {
    // Extract header info and clean up content
    // รองรับการรับค่าตรงๆ จาก object (แบบใหม่) หรือดึงจาก HTML (แบบเก่า)
    let mainTitle = lesson.mainTitle || lesson.title.replace(/^\d+\.\d+\s+/, '');
    let subTitle = lesson.subTitle || '';
    let description = lesson.description || '';
    let processedParts = [...parts];

    if (processedParts.length > 0 && typeof processedParts[0] === 'string') {
      let firstPart = processedParts[0];
      
      const h2Match = firstPart.match(/<h2>(.*?)<\/h2>/);
      if (h2Match) {
        if (!lesson.mainTitle) {
          const h2Text = h2Match[1];
          const splitMatch = h2Text.match(/^(.*?)(?:\s*\((.*?)\))?$/);
          if (splitMatch && splitMatch[2]) {
            mainTitle = splitMatch[1].trim();
            subTitle = `(${splitMatch[2].trim()})`;
          } else {
            mainTitle = h2Text;
          }
        }
        // ลบแท็ก h2 ออกเสมอไม่ว่าจะใช้ค่าจากไหน เพื่อไม่ให้รกหน้าจอ
        firstPart = firstPart.replace(/<h2>.*?<\/h2>/, '');
      }

      const pMatch = firstPart.match(/<p>(.*?)<\/p>/);
      if (pMatch) {
        if (!lesson.description) {
          description = pMatch[1];
        }
        // ลบแท็ก p แรกออกเสมอ
        firstPart = firstPart.replace(/<p>.*?<\/p>/, '');
      }

      processedParts[0] = firstPart;
    }

    if (isImmersive) {
      const ImmersiveComponent = COMPONENT_MAP[immersivePart];
      const htmlSrc = HTML_MAP[immersivePart];
      return (
        <section className="w-full immersive-page-wrapper bg-[#FAFAFA] min-h-screen" aria-label="Immersive Lesson" id="immersive-lesson-wrapper">
          {lesson.hideHeader !== true && (
            <StandardHeader 
              chapterTitle={chapter?.title}
              mainTitle={mainTitle}
              subTitle={subTitle}
              description={description}
              isCard={false}
              transparent={true}
            />
          )}
          <div className="immersive-content-block">
            {ImmersiveComponent ? <ImmersiveComponent /> : htmlSrc ? <HtmlEmbed src={htmlSrc} /> : null}
          </div>
        </section>
      );
    }

    return (
      <section className="p-4 md:p-8 lg:p-12 max-w-5xl mx-auto w-full" aria-label="Standard Lesson" id="standard-lesson-wrapper">
        <article className="lesson-content bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden" id="lesson-card">
          <StandardHeader 
            chapterTitle={chapter?.title}
            mainTitle={mainTitle}
            subTitle={subTitle}
            description={description}
            isCard={true}
            transparent={false}
          />
          <div className="p-8 md:p-12" id="lesson-body">
            {processedParts.map((part, idx) => {
              const Component = COMPONENT_MAP[part];
              if (Component) {
                return <Component key={idx} />;
              }
              const htmlSrc = HTML_MAP[part];
              if (htmlSrc) {
                return <HtmlEmbed key={idx} src={htmlSrc} />;
              }
              if (part && part.trim()) {
                return (
                  <div
                    key={idx}
                    className="prose prose-indigo max-w-none prose-lg text-gray-700"
                    dangerouslySetInnerHTML={{ __html: part }}
                  />
                );
              }
              return null;
            })}
          </div>
        </article>
      </section>
    );
  };

  return (
    <div className="pb-20 w-full bg-[#FAFAFA]" id="lesson-viewer-root">
      {renderContent()}

      {/* Navigation buttons: Previous / Next */}
      <nav className={`mt-12 flex items-center justify-between border-t border-gray-200 pt-8 gap-4 w-full px-6 mx-auto ${isImmersive ? 'max-w-7xl lg:px-12' : 'max-w-5xl'}`} aria-label="Lesson Navigation">
        {hasPrev ? (
          <button
            onClick={onPrev}
            className="px-6 py-4 bg-white text-gray-700 border-2 border-gray-200 rounded-2xl font-bold hover:border-teal-300 hover:text-teal-600 hover:-translate-y-0.5 transition-all flex items-center gap-2 group shadow-sm cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 transform transition-transform group-hover:-translate-x-1" />
            เนื้อหาก่อนหน้า
          </button>
        ) : (
          <div />
        )}
        <button
          onClick={() => { if(onComplete) onComplete(); if(onNext) onNext(); }}
          className="px-6 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-teal-200/50 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2 group cursor-pointer"
        >
          {hasNext ? 'เนื้อหาถัดไป' : 'กลับหน้ารวมวิชา'}
          <ChevronRight className="w-5 h-5 transform transition-transform group-hover:translate-x-1" />
        </button>
      </nav>
    </div>
  );
}
