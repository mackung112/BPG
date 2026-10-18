/**
 * TDD Test Suite: Red Broadcast Interactive Web Textbook
 * 
 * Testing Seams (agreed per spec):
 * 1. Standalone Browser Execution — valid HTML, no broken structure
 * 2. Interactive Widget Functional — all widgets present and wired
 * 3. Design System Integrity — Red Broadcast tokens used correctly
 * 4. Course Navigation — Prev/Next/Hub links correct per chapter
 * 
 * Run: node tests/validate-chapters.js
 */

const fs = require('fs');
const path = require('path');

const COURSE_DIR = path.resolve(__dirname, '..');
const INTERACTIVE_DIR = path.join(COURSE_DIR, 'interactive_web');

// Chapter metadata for navigation validation
const CHAPTERS = [
  { num: '01', file: 'ch01-sdlc-app-concept-canvas.html', title: 'วงจรการพัฒนาซอฟต์แวร์และการออกแบบแนวคิดแอปพลิเคชัน' },
  { num: '02', file: 'ch02-figma-wireframing.html', title: 'การออกแบบโครงสร้างหน้าจอ Wireframe ด้วย Figma' },
  { num: '03', file: 'ch03-figma-hifi-ui.html', title: 'การลงสีและออกแบบ UI ฉบับสมบูรณ์ ด้วย Figma' },
  { num: '04', file: 'ch04-figma-prototype.html', title: 'การทำ Prototype กดเล่นบนมือถือจริง ด้วย Figma' },
  { num: '05', file: 'ch05-google-sheets-database.html', title: 'การวางโครงสร้างฐานข้อมูลร้านค้าด้วย Google Sheets' },
  { num: '06', file: 'ch06-appsheet-first-app.html', title: 'การสร้างแอปแรกและดึงข้อมูลขึ้นหน้าจอมือถือด้วย AppSheet' },
  { num: '07', file: 'ch07-appsheet-forms-validation.html', title: 'การสร้างฟอร์มเพิ่มลบแก้ไขข้อมูลและการตรวจสอบความถูกต้อง' },
  { num: '08', file: 'ch08-relations-formulas.html', title: 'การสร้างระบบสั่งซื้อและคำนวณเงินด้วยความสัมพันธ์และสูตร' },
  { num: '09', file: 'ch09-brand-actions.html', title: 'การปรับแต่งธีมแบรนด์และสร้างปุ่มดำเนินการอัจฉริยะ' },
  { num: '10', file: 'ch10-barcode-qr-signature.html', title: 'การเชื่อมต่อฮาร์ดแวร์สแกน Barcode QR Code และระบบลายเซ็นดิจิทัล' },
  { num: '11', file: 'ch11-gps-maps.html', title: 'การระบุพิกัดดาวเทียม GPS และแผนที่นำทางด้วย Google Maps' },
  { num: '12', file: 'ch12-automation-bots-pdf.html', title: 'การสร้างระบบอัตโนมัติด้วย Automation Bots และการออกใบเสร็จ PDF' },
  { num: '13', file: 'ch13-capstone-sprint-1.html', title: 'การพัฒนาโครงงานแอปพลิเคชันธุรกิจจริง Sprint 1' },
  { num: '14', file: 'ch14-uat-polish.html', title: 'การทดสอบระบบโดยผู้ใช้จริง การแก้บั๊ก และการขัดเกลาแอปพลิเคชัน' },
  { num: '15', file: 'ch15-demo-day.html', title: 'การนำเสนอผลงานในวัน Demo Day การเผยแพร่แอป และการจัดแสดงผลงาน' },
];

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

function assert(condition, testName, detail = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✅ ${testName}`);
  } else {
    failedTests++;
    const msg = detail ? `${testName}: ${detail}` : testName;
    failures.push(msg);
    console.log(`  ❌ ${testName}${detail ? ' — ' + detail : ''}`);
  }
}

function testChapter(chapter, index) {
  const filePath = path.join(INTERACTIVE_DIR, chapter.file);
  const exists = fs.existsSync(filePath);

  console.log(`\n📖 Chapter ${chapter.num}: ${chapter.title}`);

  // Seam 1: File existence and basic structure
  assert(exists, `File exists: ${chapter.file}`);
  if (!exists) return; // Skip further tests if file doesn't exist

  const content = fs.readFileSync(filePath, 'utf8');
  const sizeKB = (Buffer.byteLength(content, 'utf8') / 1024).toFixed(1);

  // Seam 1: Standalone HTML validity
  assert(content.includes('<!DOCTYPE html>'), 'Has DOCTYPE declaration');
  assert(content.includes('<html lang="th"'), 'Has lang="th" attribute');
  assert(content.includes('<meta charset="UTF-8"'), 'Has UTF-8 charset');
  assert(content.includes('<meta name="viewport"'), 'Has viewport meta');
  assert(content.includes('cdn.tailwindcss.com'), 'Uses Tailwind CDN');
  assert(content.includes('fonts.googleapis.com'), 'Uses Google Fonts');
  assert(parseFloat(sizeKB) >= 40, `Content depth ≥ 40 KB (actual: ${sizeKB} KB)`);

  // Seam 2: Design System Integrity — Red Broadcast tokens
  assert(content.includes('#FF0000'), 'Uses brand red #FF0000');
  assert(content.includes('#0F0F0F'), 'Uses brand dark #0F0F0F');
  assert(content.includes('#F2F2F2'), 'Uses surface gray #F2F2F2');
  assert(content.includes('#E5E5E5'), 'Uses border color #E5E5E5');
  assert(content.includes('#065FD4'), 'Uses action blue #065FD4');
  assert(content.includes('Roboto') && content.includes('Sarabun'), 'Uses Roboto + Sarabun fonts');
  assert(content.includes('ห้องเรียนครูแม็ค'), 'Has brand name ห้องเรียนครูแม็ค');
  assert(content.includes('BROADCAST'), 'Has BROADCAST badge');

  // Seam 2: Layout structure
  assert(content.includes('toggleSidebar') || content.includes('sidebar'), 'Has collapsible sidebar');
  assert(content.includes('chip-btn') || content.includes('chip'), 'Has chip filter bar');
  assert(content.includes('LECTURE BROADCAST') || content.includes('Broadcast'), 'Has lecture theater hero');

  // Seam 2: NO print button (explicitly excluded)
  assert(!content.includes('window.print()'), 'Does NOT contain window.print()');

  // Seam 3: Interactive Widgets
  // 3a: Reading Scroll Progress Bar
  assert(
    content.includes('scrollProgress') || content.includes('scroll-progress') || content.includes('progressBar'),
    'Has reading scroll progress bar'
  );

  // 3b: Tri-Archetype Switcher
  assert(
    content.includes('Fresh Brew') || content.includes('freshBrew') || content.includes('archetype'),
    'Has Fresh Brew archetype reference'
  );
  assert(
    content.includes('Happy Paws') || content.includes('happyPaws'),
    'Has Happy Paws archetype reference'
  );
  assert(
    content.includes('Smart Borrow') || content.includes('smartBorrow') || content.includes('Smart Equipment Borrow'),
    'Has Smart Borrow archetype reference'
  );

  // 3c: Interactive Self-Checklist with localStorage
  assert(
    content.includes('localStorage') && (content.includes('checklist') || content.includes('Checklist')),
    'Has checklist with localStorage persistence'
  );

  // 3d: Interactive Rubric Calculator
  assert(
    content.includes('rubric') || content.includes('Rubric') || content.includes('รูบริก'),
    'Has rubric calculator'
  );

  // 3e: Copy buttons
  assert(
    content.includes('clipboard') || content.includes('copyToClipboard') || content.includes('คัดลอก'),
    'Has copy-to-clipboard functionality'
  );

  // 3f: FAQ / Review Questions
  assert(
    content.includes('toggleFaq') || content.includes('accordion') || content.includes('คำถามทบทวน'),
    'Has FAQ / review questions section'
  );

  // Seam 4: Course Navigation
  const prevChapter = index > 0 ? CHAPTERS[index - 1] : null;
  const nextChapter = index < CHAPTERS.length - 1 ? CHAPTERS[index + 1] : null;

  if (prevChapter) {
    assert(
      content.includes(prevChapter.file) || content.includes('บทก่อนหน้า') || content.includes('prev'),
      `Has navigation to previous chapter (${prevChapter.file})`
    );
  }
  if (nextChapter) {
    assert(
      content.includes(nextChapter.file) || content.includes('บทถัดไป') || content.includes('next'),
      `Has navigation to next chapter (${nextChapter.file})`
    );
  }
  assert(
    content.includes('index.html') || content.includes('สารบัญ') || content.includes('Hub'),
    'Has link back to Curriculum Hub'
  );

  // Seam 3: Interactive Phone Simulator
  assert(
    content.includes('phone-simulator') || content.includes('phoneSimulator') ||
    content.includes('simulator') || content.includes('smartphone'),
    'Has interactive phone simulator'
  );
}

function testCurriculumHub() {
  const hubPath = path.join(INTERACTIVE_DIR, 'index.html');
  const exists = fs.existsSync(hubPath);

  console.log(`\n🏠 Curriculum Hub (index.html)`);

  assert(exists, 'Hub index.html exists');
  if (!exists) return;

  const content = fs.readFileSync(hubPath, 'utf8');
  const sizeKB = (Buffer.byteLength(content, 'utf8') / 1024).toFixed(1);

  assert(content.includes('<!DOCTYPE html>'), 'Has DOCTYPE declaration');
  assert(content.includes('31910-2022'), 'Contains course code');
  assert(parseFloat(sizeKB) >= 10, `Content depth ≥ 10 KB (actual: ${sizeKB} KB)`);

  // Verify links to all 15 chapters
  for (const ch of CHAPTERS) {
    assert(content.includes(ch.file), `Links to ${ch.file}`);
  }
}

// ═══════════════════════════════════════════════════
// MAIN TEST RUNNER
// ═══════════════════════════════════════════════════
console.log('═══════════════════════════════════════════════════');
console.log('  🧪 Red Broadcast Interactive Web Textbook Tests');
console.log('═══════════════════════════════════════════════════');
console.log(`  Target: ${INTERACTIVE_DIR}`);
console.log(`  Chapters: ${CHAPTERS.length}`);
console.log('');

// Test each chapter
CHAPTERS.forEach((ch, i) => testChapter(ch, i));

// Test curriculum hub
testCurriculumHub();

// Summary
console.log('\n═══════════════════════════════════════════════════');
console.log(`  📊 Results: ${passedTests}/${totalTests} passed, ${failedTests} failed`);
console.log('═══════════════════════════════════════════════════');

if (failures.length > 0) {
  console.log('\n❌ Failures:');
  failures.forEach((f, i) => console.log(`  ${i + 1}. ${f}`));
}

process.exit(failedTests > 0 ? 1 : 0);
