import fs from 'node:fs';
import path from 'node:path';

const dir = path.resolve('คำอธิบายรายวิชา/เนื้อหารายวิชา/31910-0002_องค์ประกอบศิลป์สำหรับงานกราฟิก');

const ALL_CHAPTERS = [
  {
    file: '1_31910_0002.html',
    num: 1,
    title: 'บทที่ 1: งานวิเคราะห์และจำแนกธาตุทางทัศนศิลป์',
    prev: { file: 'index.html', title: 'กลับสู่หน้าสารบัญหลัก (Master Hub)', isHub: true },
    next: { file: '2_31910_0002.html', title: 'บทที่ 2: งานประยุกต์ใช้หลักการและกฎเกณฑ์องค์ประกอบศิลป์' }
  },
  {
    file: '2_31910_0002.html',
    num: 2,
    title: 'บทที่ 2: งานประยุกต์ใช้หลักการและกฎเกณฑ์องค์ประกอบศิลป์',
    prev: { file: '1_31910_0002.html', title: 'บทที่ 1: งานวิเคราะห์และจำแนกธาตุทางทัศนศิลป์' },
    next: { file: '3_space_31910_0002.html', title: 'บทที่ 3: งานออกแบบและจัดพื้นที่ในงานกราฟิก (Space)' }
  },
  {
    file: '3_space_31910_0002.html',
    num: 3,
    title: 'บทที่ 3: งานออกแบบและจัดพื้นที่ในงานกราฟิก (Space)',
    prev: { file: '2_31910_0002.html', title: 'บทที่ 2: งานประยุกต์ใช้หลักการและกฎเกณฑ์องค์ประกอบศิลป์' },
    next: { file: '4_focal_point_emphasis_31910_0002.html', title: 'บทที่ 4: งานสร้างจุดสนใจและการเน้นวัตถุ' }
  },
  {
    file: '4_focal_point_emphasis_31910_0002.html',
    num: 4,
    title: 'บทที่ 4: งานสร้างจุดสนใจและการเน้นวัตถุ (Focal Point & Emphasis)',
    prev: { file: '3_space_31910_0002.html', title: 'บทที่ 3: งานออกแบบและจัดพื้นที่ในงานกราฟิก (Space)' },
    next: { file: '5_placement_grouping_31910_0002.html', title: 'บทที่ 5: งานจัดวางตำแหน่งและจัดกลุ่มวัตถุ' }
  },
  {
    file: '5_placement_grouping_31910_0002.html',
    num: 5,
    title: 'บทที่ 5: งานจัดวางตำแหน่งและจัดกลุ่มวัตถุ (Placement & Grouping)',
    prev: { file: '4_focal_point_emphasis_31910_0002.html', title: 'บทที่ 4: งานสร้างจุดสนใจและการเน้นวัตถุ' },
    next: { file: '6_31910_0002.html', title: 'บทที่ 6: งานสร้างชิ้นงานด้วยเครื่องมือโปรแกรมสำเร็จรูป' }
  },
  {
    file: '6_31910_0002.html',
    num: 6,
    title: 'บทที่ 6: งานสร้างชิ้นงานด้วยเครื่องมือในโปรแกรมสำเร็จรูป',
    prev: { file: '5_placement_grouping_31910_0002.html', title: 'บทที่ 5: งานจัดวางตำแหน่งและจัดกลุ่มวัตถุ' },
    next: { file: '7_31910_0002.html', title: 'บทที่ 7: งานออกแบบ แก้ไข และตกแต่งชิ้นงานกราฟิก' }
  },
  {
    file: '7_31910_0002.html',
    num: 7,
    title: 'บทที่ 7: งานออกแบบ แก้ไข และตกแต่งชิ้นงานกราฟิก',
    prev: { file: '6_31910_0002.html', title: 'บทที่ 6: งานสร้างชิ้นงานด้วยเครื่องมือโปรแกรมสำเร็จรูป' },
    next: { file: 'index.html', title: '🎉 สำเร็จหลักสูตร 31910-0002 / กลับหน้าสรุป Hub 🏆', isComplete: true }
  }
];

function buildSwitcher(currentFile) {
  return `
      <!-- Quick Chapter Switcher Dropdown -->
      <div class="relative">
        <button id="chapterMenuBtn" onclick="toggleChapterMenu()" class="pop-btn h-9 px-3 rounded-full bg-[#FFBE0B] hover:bg-[#FFD166] text-[#110B1E] text-xs font-heading font-bold flex items-center gap-1.5 transition" title="สลับบทเรียน 1-7">
          <span>📑</span>
          <span class="hidden md:inline">สลับบทเรียน</span>
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
        </button>
        <div id="chapterMenuDropdown" class="hidden absolute right-0 mt-2 w-64 bg-white border-2 border-[#110B1E] rounded-2xl shadow-[6px_6px_0px_#110B1E] p-2.5 space-y-1 z-50">
          <div class="text-[11px] font-heading font-extrabold text-[#110B1E] px-2 py-1 uppercase tracking-wider border-b border-zinc-200 flex justify-between items-center">
            <span>สารบัญทั้ง 7 บท</span>
            <a href="index.html" class="text-[#FF006E] hover:underline">หน้าหลัก Hub ➔</a>
          </div>
          <a href="1_31910_0002.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-heading font-semibold hover:bg-pink-50 ${currentFile === '1_31910_0002.html' ? 'bg-[#FF006E] text-white' : 'text-[#110B1E]'}">
            <span class="w-5 h-5 rounded bg-black/20 flex items-center justify-center font-bold text-[10px]">1</span>
            <span class="truncate">บทที่ 1: ธาตุทางทัศนศิลป์</span>
          </a>
          <a href="2_31910_0002.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-heading font-semibold hover:bg-purple-50 ${currentFile === '2_31910_0002.html' ? 'bg-[#8338EC] text-white' : 'text-[#110B1E]'}">
            <span class="w-5 h-5 rounded bg-black/20 flex items-center justify-center font-bold text-[10px]">2</span>
            <span class="truncate">บทที่ 2: กฎเกณฑ์องค์ประกอบศิลป์</span>
          </a>
          <a href="3_space_31910_0002.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-heading font-semibold hover:bg-blue-50 ${currentFile === '3_space_31910_0002.html' ? 'bg-[#3A86FF] text-white' : 'text-[#110B1E]'}">
            <span class="w-5 h-5 rounded bg-black/20 flex items-center justify-center font-bold text-[10px]">3</span>
            <span class="truncate">บทที่ 3: พื้นที่ในงานกราฟิก (Space)</span>
          </a>
          <a href="4_focal_point_emphasis_31910_0002.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-heading font-semibold hover:bg-orange-50 ${currentFile === '4_focal_point_emphasis_31910_0002.html' ? 'bg-[#FB5607] text-white' : 'text-[#110B1E]'}">
            <span class="w-5 h-5 rounded bg-black/20 flex items-center justify-center font-bold text-[10px]">4</span>
            <span class="truncate">บทที่ 4: จุดสนใจและการเน้นวัตถุ</span>
          </a>
          <a href="5_placement_grouping_31910_0002.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-heading font-semibold hover:bg-lime-50 ${currentFile === '5_placement_grouping_31910_0002.html' ? 'bg-[#AACC00] text-white' : 'text-[#110B1E]'}">
            <span class="w-5 h-5 rounded bg-black/20 flex items-center justify-center font-bold text-[10px]">5</span>
            <span class="truncate">บทที่ 5: ตำแหน่งและจัดกลุ่มวัตถุ</span>
          </a>
          <a href="6_31910_0002.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-heading font-semibold hover:bg-pink-50 ${currentFile === '6_31910_0002.html' ? 'bg-[#D9048E] text-white' : 'text-[#110B1E]'}">
            <span class="w-5 h-5 rounded bg-black/20 flex items-center justify-center font-bold text-[10px]">6</span>
            <span class="truncate">บทที่ 6: เครื่องมือโปรแกรมสำเร็จรูป</span>
          </a>
          <a href="7_31910_0002.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-heading font-semibold hover:bg-cyan-50 ${currentFile === '7_31910_0002.html' ? 'bg-[#00F5D4] text-[#110B1E]' : 'text-[#110B1E]'}">
            <span class="w-5 h-5 rounded bg-black/20 flex items-center justify-center font-bold text-[10px]">7</span>
            <span class="truncate">บทที่ 7: ออกแบบ แก้ไข และตกแต่ง</span>
          </a>
        </div>
      </div>`;
}

function buildBottomDock(item) {
  const prevCard = item.prev.isHub ? `
              <a href="index.html" class="pop-card p-4 rounded-2xl flex items-center gap-3.5 group bg-zinc-50 hover:bg-yellow-50">
                <div class="w-10 h-10 rounded-xl bg-white border-2 border-[#110B1E] flex items-center justify-center text-base font-bold shrink-0 shadow-[2px_2px_0px_#110B1E]">
                  🏠
                </div>
                <div class="overflow-hidden">
                  <div class="text-[10px] font-heading font-extrabold text-zinc-500 uppercase">ศูนย์รวมหลักสูตร</div>
                  <div class="text-xs font-heading font-bold text-[#110B1E] truncate group-hover:text-[#8338EC]">
                    กลับสู่หน้าสารบัญหลัก (Master Hub)
                  </div>
                </div>
              </a>` : `
              <a href="${item.prev.file}" class="pop-card p-4 rounded-2xl flex items-center gap-3.5 group bg-zinc-50 hover:bg-yellow-50">
                <div class="w-10 h-10 rounded-xl bg-white border-2 border-[#110B1E] flex items-center justify-center text-base font-bold shrink-0 shadow-[2px_2px_0px_#110B1E] group-hover:-translate-x-1 transition-transform">
                  ⬅️
                </div>
                <div class="overflow-hidden">
                  <div class="text-[10px] font-heading font-extrabold text-zinc-500 uppercase">บทก่อนหน้า</div>
                  <div class="text-xs font-heading font-bold text-[#110B1E] truncate group-hover:text-[#8338EC]">
                    ${item.prev.title}
                  </div>
                </div>
              </a>`;

  const nextCard = item.next.isComplete ? `
              <a href="index.html" class="pop-card p-4 rounded-2xl flex items-center justify-between gap-3.5 group bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 hover:from-emerald-100 hover:to-cyan-100 border-[#00F5D4]">
                <div class="overflow-hidden">
                  <div class="text-[10px] font-heading font-extrabold text-emerald-700 uppercase">สำเร็จหลักสูตร 🏆</div>
                  <div class="text-xs font-heading font-bold text-[#110B1E] truncate group-hover:text-emerald-700">
                    ดูสรุปผลการเรียนรู้ & คะแนนรวม (Master Hub)
                  </div>
                </div>
                <div class="w-10 h-10 rounded-xl bg-[#00F5D4] text-[#110B1E] border-2 border-[#110B1E] flex items-center justify-center text-base font-bold shrink-0 shadow-[2px_2px_0px_#110B1E] group-hover:scale-110 transition-transform">
                  🎉
                </div>
              </a>` : `
              <a href="${item.next.file}" class="pop-card p-4 rounded-2xl flex items-center justify-between gap-3.5 group bg-gradient-to-r from-pink-50 to-purple-50 hover:from-pink-100 hover:to-purple-100 border-[#FF006E]">
                <div class="overflow-hidden">
                  <div class="text-[10px] font-heading font-extrabold text-[#FF006E] uppercase">บทถัดไป ➔</div>
                  <div class="text-xs font-heading font-bold text-[#110B1E] truncate group-hover:text-[#FF006E]">
                    ${item.next.title}
                  </div>
                </div>
                <div class="w-10 h-10 rounded-xl bg-[#FF006E] text-white border-2 border-[#110B1E] flex items-center justify-center text-base font-bold shrink-0 shadow-[2px_2px_0px_#110B1E] group-hover:translate-x-1 transition-transform">
                  ➔
                </div>
              </a>`;

  return `
        <!-- ================================================================= -->
        <!-- BOTTOM INTER-CHAPTER NAVIGATION DOCK                              -->
        <!-- ================================================================= -->
        <section class="mt-12 pt-8 border-t-2 border-[#110B1E] no-print">
          <div class="p-6 rounded-3xl bg-white border-2 border-[#110B1E] shadow-[6px_6px_0px_#110B1E] space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-zinc-100 pb-4">
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-1 rounded-lg bg-[#FFBE0B] border border-[#110B1E] text-[11px] font-mono font-bold">
                  UNIT 0${item.num} OF 07
                </span>
                <span class="text-xs font-heading font-bold text-[#110B1E]">
                  การนำทางข้ามบทเรียน (Curriculum Navigation)
                </span>
              </div>
              <a href="index.html" class="pop-btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 hover:bg-[#FFBE0B] text-xs font-heading font-bold text-[#110B1E]">
                <span>🏠 สารบัญรวมรายวิชา 31910-0002</span>
              </a>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              ${prevCard}
              ${nextCard}
            </div>
          </div>
        </section>
`;
}

function buildScript(file) {
  return `
  <!-- Unified Navigation & Progress State Sync -->
  <script>
    function toggleChapterMenu() {
      const menu = document.getElementById('chapterMenuDropdown');
      if (menu) menu.classList.toggle('hidden');
    }
    document.addEventListener('click', function(e) {
      const menu = document.getElementById('chapterMenuDropdown');
      const btn = document.getElementById('chapterMenuBtn');
      if (menu && btn && !menu.contains(e.target) && !btn.contains(e.target)) {
        menu.classList.add('hidden');
      }
    });

    (function recordCourseProgress() {
      try {
        const key = 'bpg_course_31910_0002_state';
        const currentFile = '${file}';
        const raw = localStorage.getItem(key);
        const data = raw ? JSON.parse(raw) : { lastChapter: currentFile, visitedChapters: [] };
        data.lastChapter = currentFile;
        if (!data.visitedChapters) data.visitedChapters = [];
        if (!data.visitedChapters.includes(currentFile)) {
          data.visitedChapters.push(currentFile);
        }
        localStorage.setItem(key, JSON.stringify(data));
      } catch (e) {
        console.warn('Progress sync warning', e);
      }
    })();
  </script>
`;
}

export function patchChapter(fileItem) {
  const filePath = path.join(dir, fileItem.file);
  let content = fs.readFileSync(filePath, 'utf8');
  const originalLength = content.length;

  // 1. Update brand link in header
  content = content.replace(
    /<a href="#hero-stage" class="flex items-center gap-2.5 group">/g,
    '<a href="index.html" class="flex items-center gap-2.5 group" title="กลับสู่หน้าหลักสูตร 31910-0002">'
  );

  // 2. Add chapter switcher in header if not present
  if (!content.includes('id="chapterMenuBtn"')) {
    const switcherHtml = buildSwitcher(fileItem.file);
    const targetAnchor = '<div class="flex items-center gap-2 sm:gap-3">';
    const pos = content.indexOf(targetAnchor);
    if (pos !== -1) {
      content = content.slice(0, pos + targetAnchor.length) + switcherHtml + content.slice(pos + targetAnchor.length);
    }
  }

  // 3. Insert bottom dock before </main>
  if (!content.includes('BOTTOM INTER-CHAPTER NAVIGATION DOCK')) {
    const mainEndPos = content.lastIndexOf('</main>');
    if (mainEndPos !== -1) {
      const dockHtml = buildBottomDock(fileItem);
      content = content.slice(0, mainEndPos) + dockHtml + content.slice(mainEndPos);
    }
  }

  // 4. Insert script before </body>
  if (!content.includes('recordCourseProgress')) {
    const bodyEndPos = content.lastIndexOf('</body>');
    if (bodyEndPos !== -1) {
      const scriptHtml = buildScript(fileItem.file);
      content = content.slice(0, bodyEndPos) + scriptHtml + content.slice(bodyEndPos);
    }
  }

  if (content.length < originalLength) {
    throw new Error(`Content reduced for ${fileItem.file}! Previous: ${originalLength}, New: ${content.length}`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`${fileItem.file} patched successfully! Previous: ${originalLength}, New: ${content.length}`);
}

// Mode: if run directly, patch specified chapters or all
const targetArgs = process.argv.slice(2);
const toPatch = targetArgs.length > 0 
  ? ALL_CHAPTERS.filter(c => targetArgs.includes(c.num.toString()) || targetArgs.includes(c.file))
  : ALL_CHAPTERS;

console.log(`Patching ${toPatch.length} chapters...`);
for (const item of toPatch) {
  patchChapter(item);
}
