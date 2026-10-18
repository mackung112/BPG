module.exports = `<!DOCTYPE html>
<html lang="th" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>บทที่ 10: การเชื่อมต่อฮาร์ดแวร์สแกน Barcode/QR Code และระบบลายเซ็นดิจิทัล | ห้องเรียนครูแม็ค BROADCAST</title>
  
  <!-- Google Fonts: Roboto, Roboto Mono, Sarabun ตามข้อกำหนด Red Broadcast -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&family=Roboto+Mono:wght@400;500;600;700&family=Sarabun:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  
  <!-- Tailwind CSS CDN พร้อม inline config ตาม Design Tokens -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: {
              red: '#FF0000',
              redHover: '#CC0000',
              blue: '#065FD4',
              neutral: '#606060',
              dark: '#0F0F0F',
              surface: '#F2F2F2',
              surfaceHover: '#E5E5E5',
              border: '#E5E5E5',
              success: '#2BA640',
              warning: '#FB8C00'
            }
          },
          fontFamily: {
            sans: ['Roboto', 'Sarabun', 'sans-serif'],
            mono: ['Roboto Mono', 'monospace']
          }
        }
      }
    }
  </script>

  <style>
    body {
      font-family: 'Roboto', 'Sarabun', sans-serif;
      color: #0F0F0F;
      background-color: #FFFFFF;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    
    /* Scrollbar Styling */
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    /* Red Broadcast Elevation tokens */
    .elevation-0 { box-shadow: none; }
    .elevation-1 { box-shadow: 0 1px 2px rgba(0,0,0,0.1); }
    .elevation-2 { box-shadow: 0 4px 32px rgba(0,0,0,0.1); }
    .elevation-3 { box-shadow: 0 8px 40px rgba(0,0,0,0.2); }

    /* Mobile Phone Simulator 320x640 */
    .phone-mockup {
      width: 320px;
      height: 640px;
      border: 10px solid #0F0F0F;
      border-radius: 40px;
      position: relative;
      background: #FFFFFF;
      overflow: hidden;
      box-shadow: 0 20px 50px -15px rgba(0,0,0,0.35);
      display: flex;
      flex-direction: column;
      margin: 0 auto;
    }
    .phone-notch {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 124px;
      height: 20px;
      background: #0F0F0F;
      border-bottom-left-radius: 14px;
      border-bottom-right-radius: 14px;
      z-index: 50;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .phone-speaker {
      width: 38px;
      height: 4px;
      background: #333333;
      border-radius: 2px;
    }
    .phone-screen {
      flex: 1;
      overflow-y: auto;
      padding-top: 24px;
      display: flex;
      flex-direction: column;
      background-color: #FAFAFA;
      position: relative;
    }

    /* Red Laser Sweeping Animation for Camera Scanner Viewfinder */
    @keyframes laserSweep {
      0% { top: 12%; opacity: 0.9; }
      50% { top: 82%; opacity: 1; }
      100% { top: 12%; opacity: 0.9; }
    }
    .laser-line {
      position: absolute;
      left: 8%;
      right: 8%;
      height: 3px;
      background: linear-gradient(90deg, rgba(255,0,0,0.1) 0%, rgba(255,0,0,1) 50%, rgba(255,0,0,0.1) 100%);
      box-shadow: 0 0 12px #FF0000, 0 0 4px #FF5252;
      animation: laserSweep 2s ease-in-out infinite;
      z-index: 20;
    }

    /* Reticle Corner Marks */
    .viewfinder-corner {
      width: 22px;
      height: 22px;
      border-color: #FF0000;
      position: absolute;
    }

    /* HTML5 Signature Pad Canvas */
    #signatureCanvas {
      touch-action: none;
      cursor: crosshair;
    }

    /* Toast Animation */
    .toast-anim {
      animation: fadeInOut 2.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    @keyframes fadeInOut {
      0% { opacity: 0; transform: translateY(12px) scale(0.96); }
      15% { opacity: 1; transform: translateY(0) scale(1); }
      85% { opacity: 1; transform: translateY(0) scale(1); }
      100% { opacity: 0; transform: translateY(-8px) scale(0.98); }
    }
  </style>
</head>
<body class="bg-white text-[#0F0F0F] min-h-screen flex flex-col selection:bg-red-100 selection:text-[#FF0000]">

  <!-- ========================================================================= -->
  <!-- 1. READING SCROLL PROGRESS BAR (Fixed Top, Red Line 0-100%) -->
  <!-- ========================================================================= -->
  <div id="scrollProgressBar" class="fixed top-0 left-0 h-1 bg-[#FF0000] z-[100] transition-all duration-75" style="width: 0%;"></div>

  <!-- ========================================================================= -->
  <!-- 2. STICKY TOP BAR (56px Height, Level 1 Shadow on Scroll, NO PRINT BUTTON) -->
  <!-- ========================================================================= -->
  <header class="sticky top-0 z-50 h-14 bg-white border-b border-[#E5E5E5] px-4 flex items-center justify-between elevation-1">
    <!-- ฝั่งซ้าย: ปุ่มสลับแถบเมนูข้าง + แบรนด์ Broadcast -->
    <div class="flex items-center gap-3">
      <button id="toggleSidebarBtn" onclick="toggleSidebar()" class="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#F2F2F2] transition text-[#606060]" title="สลับแถบสารบัญ">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </button>
      
      <a href="index.html" class="flex items-center gap-2 group">
        <div class="w-8 h-6 bg-[#FF0000] rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
          <svg class="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        </div>
        <div class="flex items-center">
          <span class="font-bold text-lg tracking-tight text-[#0F0F0F]">ห้องเรียนครูแม็ค</span>
          <span class="text-[10px] ml-1.5 font-bold uppercase tracking-wider text-[#FF0000] bg-red-50 px-1.5 py-0.5 rounded border border-red-200">BROADCAST</span>
        </div>
      </a>
    </div>

    <!-- ส่วนกลาง: ช่องค้นหาอัจฉริยะ (Search Bar 44px) -->
    <div class="hidden sm:flex items-center flex-1 max-w-[620px] mx-6">
      <div class="flex w-full items-center">
        <div class="relative flex-1">
          <input 
            type="text" 
            id="searchInput"
            placeholder="ค้นหาในบทเรียน (กด / เพื่อค้นหา เช่น Scannable, Signature, Audit Trail, Barcode)..." 
            class="w-full h-10 pl-4 pr-3 bg-white border border-[#E5E5E5] rounded-l-full text-sm text-[#0F0F0F] placeholder-[#606060] focus:outline-none focus:border-[#065FD4]"
          />
        </div>
        <button 
          id="searchBtn"
          onclick="performSearch()"
          class="h-10 px-5 bg-[#F8F8F8] border border-l-0 border-[#E5E5E5] rounded-r-full hover:bg-[#F2F2F2] text-[#606060] flex items-center justify-center transition" 
          title="ค้นหา">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </button>
        <button onclick="triggerVoiceSearch()" class="w-10 h-10 ml-2 rounded-full bg-[#F2F2F2] hover:bg-[#E5E5E5] flex items-center justify-center text-[#0F0F0F] transition shrink-0" title="ค้นหาด้วยเสียง">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
        </button>
      </div>
    </div>

    <!-- ฝั่งขวา: เมนูสารบัญ, การแจ้งเตือน และโปรไฟล์ผู้สอน (NO PRINT BUTTON EXPLICITLY) -->
    <div class="flex items-center gap-2 sm:gap-3">
      <!-- Hub Link Button -->
      <a href="index.html" class="hidden md:flex items-center gap-1.5 h-9 px-3.5 rounded-full border border-[#E5E5E5] text-xs font-medium text-[#0F0F0F] hover:bg-[#F2F2F2] transition" title="กลับสู่สารบัญรายวิชา">
        <svg class="w-4 h-4 text-[#606060]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
        <span>สารบัญหลัก</span>
      </a>

      <!-- Notification Bell with Red Dot -->
      <div class="relative">
        <button id="notifBtn" onclick="toggleNotifPopover()" class="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#F2F2F2] text-[#606060] transition relative" title="การแจ้งเตือนบทเรียน">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
          <span class="absolute top-2.5 right-2.5 w-2 h-2 bg-[#FF0000] rounded-full ring-2 ring-white"></span>
        </button>

        <!-- Notification Popover -->
        <div id="notifPopover" class="hidden absolute right-0 mt-2 w-80 bg-white border border-[#E5E5E5] rounded-2xl shadow-xl p-4 z-50 text-xs">
          <div class="font-bold text-[#0F0F0F] border-b border-[#E5E5E5] pb-2 flex items-center justify-between">
            <span>การแจ้งเตือนสัปดาห์ที่ 10</span>
            <span class="text-[10px] bg-red-100 text-[#FF0000] px-2 py-0.5 rounded-full font-bold">ใหม่ 2 รายการ</span>
          </div>
          <div class="mt-3 space-y-2.5">
            <div class="p-2.5 rounded-xl bg-red-50/50 border border-red-100">
              <div class="font-bold text-[#FF0000]">📷 เตรียมอุปกรณ์ทดสอบจริง</div>
              <p class="text-[#606060] text-[11px] mt-0.5">ให้นักศึกษาเตรียมสมาร์ตโฟนที่มีกล้องพร้อมใช้งาน และเชื่อมต่อแอป AppSheet บัญชีเดียวกัน</p>
            </div>
            <div class="p-2.5 rounded-xl bg-blue-50/50 border border-blue-100">
              <div class="font-bold text-[#065FD4]">✍️ สูตรล็อกลายเซ็น ISBLANK</div>
              <p class="text-[#606060] text-[11px] mt-0.5">อย่าลืมใส่สูตร ISBLANK([_THIS]) ในช่อง Editable? เพื่อป้องกันการแก้ไขย้อนหลัง</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Teacher Avatar Profile -->
      <div class="flex items-center gap-2 pl-1">
        <div class="w-8 h-8 rounded-full bg-[#0F0F0F] text-white flex items-center justify-center font-bold text-xs ring-2 ring-[#FF0000]">
          MK
        </div>
      </div>
    </div>
  </header>

  <!-- ========================================================================= -->
  <!-- MAIN LAYOUT WRAPPER (SIDEBAR + MAIN CONTENT VIEWPORT) -->
  <!-- ========================================================================= -->
  <div class="flex-1 flex overflow-hidden">

    <!-- ───────────────────────────────────────────────────────────────────── -->
    <!-- 3. COLLAPSIBLE 240px SIDEBAR (With Sections + Course Metadata) -->
    <!-- ───────────────────────────────────────────────────────────────────── -->
    <aside id="sidebar" class="w-60 bg-white border-r border-[#E5E5E5] shrink-0 hidden lg:flex flex-col justify-between overflow-y-auto transition-all duration-200">
      <div class="p-3 space-y-1">
        <div class="text-[11px] font-bold text-[#606060] px-3 py-2 uppercase tracking-wider">สารบัญบทที่ 10</div>

        <a href="#learning-plan" class="sidebar-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-[#0F0F0F] hover:bg-[#F2F2F2] transition">
          <span class="w-2 h-2 rounded-full bg-[#FF0000]"></span>
          <span class="truncate">จุดประสงค์ & ผัง 4 ชั่วโมง</span>
        </a>

        <a href="#hardware-adapter" class="sidebar-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-[#0F0F0F] hover:bg-[#F2F2F2] transition">
          <span class="w-2 h-2 rounded-full bg-zinc-400"></span>
          <span class="truncate">1. Hardware Adapter Pattern</span>
        </a>

        <a href="#fast-scan-lookup" class="sidebar-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-[#0F0F0F] hover:bg-[#F2F2F2] transition">
          <span class="w-2 h-2 rounded-full bg-zinc-400"></span>
          <span class="truncate">2. Barcode & Fast Lookup</span>
        </a>

        <a href="#digital-signature" class="sidebar-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-[#0F0F0F] hover:bg-[#F2F2F2] transition">
          <span class="w-2 h-2 rounded-full bg-zinc-400"></span>
          <span class="truncate">3. ระบบลายเซ็นดิจิทัล</span>
        </a>

        <a href="#audit-trail" class="sidebar-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-[#0F0F0F] hover:bg-[#F2F2F2] transition">
          <span class="w-2 h-2 rounded-full bg-zinc-400"></span>
          <span class="truncate">4. Audit Trail & Immutability</span>
        </a>

        <a href="#archetypes-workshop" class="sidebar-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-[#0F0F0F] hover:bg-[#F2F2F2] transition">
          <span class="w-2 h-2 rounded-full bg-zinc-400"></span>
          <span class="truncate">5. เวิร์กช็อป 3 Archetypes</span>
        </a>

        <a href="#hardware-sandbox" class="sidebar-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-[#0F0F0F] hover:bg-[#F2F2F2] transition">
          <span class="w-2 h-2 rounded-full bg-zinc-400"></span>
          <span class="truncate">6. ห้องทดลอง Simulator & Pad</span>
        </a>

        <a href="#testing-toolkit" class="sidebar-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-[#0F0F0F] hover:bg-[#F2F2F2] transition">
          <span class="w-2 h-2 rounded-full bg-zinc-400"></span>
          <span class="truncate">7. QR Testing Toolkit & API</span>
        </a>

        <a href="#agile-triad" class="sidebar-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-[#0F0F0F] hover:bg-[#F2F2F2] transition">
          <span class="w-2 h-2 rounded-full bg-zinc-400"></span>
          <span class="truncate">8. บทบาททีม Agile Triad</span>
        </a>

        <a href="#troubleshooting" class="sidebar-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-[#0F0F0F] hover:bg-[#F2F2F2] transition">
          <span class="w-2 h-2 rounded-full bg-zinc-400"></span>
          <span class="truncate">9. คู่มือแก้บั๊กกล้อง & เซ็น</span>
        </a>

        <a href="#self-checklist" class="sidebar-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-[#0F0F0F] hover:bg-[#F2F2F2] transition">
          <span class="w-2 h-2 rounded-full bg-zinc-400"></span>
          <span class="truncate">10. แบบตรวจสอบตนเอง</span>
        </a>

        <a href="#rubric-calculator" class="sidebar-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-[#0F0F0F] hover:bg-[#F2F2F2] transition">
          <span class="w-2 h-2 rounded-full bg-zinc-400"></span>
          <span class="truncate">11. เกณฑ์การประเมิน 10 คะแนน</span>
        </a>

        <a href="#faq-section" class="sidebar-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-[#0F0F0F] hover:bg-[#F2F2F2] transition">
          <span class="w-2 h-2 rounded-full bg-zinc-400"></span>
          <span class="truncate">12. FAQ & นำทางบทเรียน</span>
        </a>
      </div>

      <!-- ข้อมูลรายวิชา (Course Metadata Card) -->
      <div class="p-3 m-3 bg-[#F8F8F8] border border-[#E5E5E5] rounded-xl text-xs space-y-2">
        <div class="flex items-center gap-1.5 text-[#FF0000] font-bold">
          <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
          <span>ข้อมูลหลักสูตร</span>
        </div>
        <div class="text-[11px] text-[#606060] leading-relaxed">
          <strong>รหัสวิชา:</strong> 31910-2022<br>
          <strong>ชื่อวิชา:</strong> การพัฒนาโปรแกรมบนอุปกรณ์สื่อสารแบบพกพา<br>
          <strong>ระดับ:</strong> ปวส. เทคโนโลยีสารสนเทศ<br>
          <strong>สัปดาห์:</strong> 10 จาก 15 สัปดาห์
        </div>
        <div class="pt-1 border-t border-[#E5E5E5] flex items-center justify-between text-[10px] text-[#606060]">
          <span>สถานะ: คลาสเรียนเปิด</span>
          <span class="font-bold text-[#2BA640]">4 คาบ (240 น.)</span>
        </div>
      </div>
    </aside>

    <!-- ───────────────────────────────────────────────────────────────────── -->
    <!-- MAIN CONTENT VIEWPORT (SCROLLABLE) -->
    <!-- ───────────────────────────────────────────────────────────────────── -->
    <main id="mainViewport" class="flex-1 overflow-y-auto flex flex-col bg-white">

      <!-- =================================================================== -->
      <!-- 4. STICKY HORIZONTAL PILL CHIP FILTER BAR -->
      <!-- =================================================================== -->
      <div class="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-[#E5E5E5] px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <button onclick="filterChip('all', this)" class="chip-btn active h-8 px-4 rounded-full text-xs font-bold bg-[#0F0F0F] text-white transition shrink-0">
          ทั้งหมด
        </button>
        <button onclick="filterChip('hardware-adapter', this)" class="chip-btn h-8 px-3.5 rounded-full text-xs font-medium bg-[#F2F2F2] text-[#0F0F0F] hover:bg-[#E5E5E5] transition shrink-0">
          สถาปัตยกรรม Hardware Adapter
        </button>
        <button onclick="filterChip('fast-scan-lookup', this)" class="chip-btn h-8 px-3.5 rounded-full text-xs font-medium bg-[#F2F2F2] text-[#0F0F0F] hover:bg-[#E5E5E5] transition shrink-0">
          Barcode / QR & Fast Lookup
        </button>
        <button onclick="filterChip('digital-signature', this)" class="chip-btn h-8 px-3.5 rounded-full text-xs font-medium bg-[#F2F2F2] text-[#0F0F0F] hover:bg-[#E5E5E5] transition shrink-0">
          ลายเซ็นดิจิทัล Touch Canvas
        </button>
        <button onclick="filterChip('audit-trail', this)" class="chip-btn h-8 px-3.5 rounded-full text-xs font-medium bg-[#F2F2F2] text-[#0F0F0F] hover:bg-[#E5E5E5] transition shrink-0">
          Audit Trail & ISBLANK Lock
        </button>
        <button onclick="filterChip('archetypes-workshop', this)" class="chip-btn h-8 px-3.5 rounded-full text-xs font-medium bg-[#F2F2F2] text-[#0F0F0F] hover:bg-[#E5E5E5] transition shrink-0">
          เวิร์กช็อป 3 Archetypes
        </button>
        <button onclick="filterChip('hardware-sandbox', this)" class="chip-btn h-8 px-3.5 rounded-full text-xs font-medium bg-[#F2F2F2] text-[#0F0F0F] hover:bg-[#E5E5E5] transition shrink-0">
          ห้องทดลอง Scanner & Signature
        </button>
        <button onclick="filterChip('testing-toolkit', this)" class="chip-btn h-8 px-3.5 rounded-full text-xs font-medium bg-[#F2F2F2] text-[#0F0F0F] hover:bg-[#E5E5E5] transition shrink-0">
          Live QR Code Generator
        </button>
        <button onclick="filterChip('rubric-calculator', this)" class="chip-btn h-8 px-3.5 rounded-full text-xs font-medium bg-[#F2F2F2] text-[#0F0F0F] hover:bg-[#E5E5E5] transition shrink-0">
          รูบริกประเมิน 10 คะแนน
        </button>
      </div>

      <!-- =================================================================== -->
      <!-- 5. BROADCAST LECTURE THEATER HERO STAGE (Dark Container) -->
      <!-- =================================================================== -->
      <section class="bg-[#0F0F0F] text-white px-4 sm:px-8 py-8 sm:py-12 border-b border-zinc-800 relative overflow-hidden">
        <!-- Background Glowing Ambient Accents -->
        <div class="absolute -top-32 -right-32 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div class="max-w-5xl mx-auto relative z-10 space-y-6">
          <!-- Live Episode Badges -->
          <div class="flex flex-wrap items-center gap-2.5">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF0000] text-white text-xs font-black tracking-wide uppercase shadow-sm">
              <span class="w-2 h-2 rounded-full bg-white animate-ping"></span>
              LIVE BROADCAST
            </span>
            <span class="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-bold border border-zinc-700">
              บทที่ 10 / 15
            </span>
            <span class="px-3 py-1 rounded-full bg-zinc-800/80 text-zinc-300 text-xs font-mono border border-zinc-700">
              HARDWARE ADAPTER & MOBILE SENSORS
            </span>
            <span class="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold border border-emerald-800">
              คะแนนเก็บ 10 คะแนน
            </span>
          </div>

          <!-- Hero Main Title -->
          <div class="space-y-2">
            <h1 class="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              การเชื่อมต่อฮาร์ดแวร์สแกน Barcode/QR Code และระบบลายเซ็นดิจิทัล
            </h1>
            <p class="text-sm sm:text-lg text-zinc-400 font-normal leading-relaxed">
              (Hardware Adapter, Fast Scan-to-Lookup & Digital Signature Audit Trail Patterns)
            </p>
          </div>

          <!-- Instructor Metadata Card + Key Stat Metrics -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-zinc-800 text-xs">
            <!-- Instructor Info -->
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-full bg-zinc-800 border-2 border-[#FF0000] flex items-center justify-center font-black text-sm text-white shrink-0">
                MK
              </div>
              <div>
                <div class="font-bold text-white text-sm">ครูแม็ค (อัครพล แดงเพ็ง)</div>
                <div class="text-zinc-400 text-[11px]">สาขาวิชาเทคโนโลยีสารสนเทศ</div>
                <div class="text-[#FF0000] text-[10px] font-bold">เชี่ยวชาญ: Mobile Architecture & Cloud Database</div>
              </div>
            </div>

            <!-- Key Metrics -->
            <div class="flex items-center gap-6 text-zinc-300">
              <div>
                <div class="text-zinc-400 text-[10px] uppercase font-bold">ระยะเวลาเรียน</div>
                <div class="text-base font-black text-white font-mono">4 คาบ (240 นาที)</div>
              </div>
              <div class="border-l border-zinc-800 pl-6">
                <div class="text-zinc-400 text-[10px] uppercase font-bold">ฮาร์ดแวร์เป้าหมาย</div>
                <div class="text-base font-black text-white font-mono">กล้อง + Touch Screen</div>
              </div>
            </div>

            <!-- Quick Jump to Interactive Sandboxes -->
            <div class="flex items-center md:justify-end gap-2">
              <a href="#hardware-sandbox" class="h-9 px-4 rounded-full bg-[#FF0000] hover:bg-[#CC0000] text-white text-xs font-bold flex items-center gap-1.5 transition shadow-lg shadow-red-900/30">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>
                <span>เปิดห้องทดลองสแกนเนอร์</span>
              </a>
              <a href="#self-checklist" class="h-9 px-3.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium flex items-center gap-1 transition">
                <span>เช็คลิสต์</span>
              </a>
            </div>
          </div>

          <!-- Social Engagement Simulation Bar (Like / Share / Subscribe) -->
          <div class="flex items-center justify-between pt-3 border-t border-zinc-800/80 text-xs">
            <div class="flex items-center gap-2">
              <button id="likeBtn" onclick="toggleLike()" class="h-8 px-3.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center gap-1.5 transition">
                <svg id="likeIcon" class="w-4 h-4 text-zinc-400 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/></svg>
                <span>ถูกใจ</span>
                <span id="likeCount" class="font-mono font-bold text-white ml-0.5">384</span>
              </button>

              <button onclick="shareLesson()" class="h-8 px-3.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center gap-1.5 transition">
                <svg class="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
                <span>แชร์บทเรียน</span>
              </button>

              <button id="subBtn" onclick="toggleSubscribe()" class="h-8 px-4 rounded-full bg-white hover:bg-zinc-200 text-[#0F0F0F] font-bold flex items-center gap-1.5 transition">
                <span id="subBtnText">ติดตามรายวิชา</span>
              </button>
            </div>

            <a href="#comments-section" class="text-zinc-400 hover:text-white flex items-center gap-1 text-[11px] transition">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/></svg>
              <span>ความคิดเห็น (<span id="commentTotalCount">28</span>)</span>
            </a>
          </div>
        </div>
      </section>

      <!-- =================================================================== -->
      <!-- MAIN BODY CONTAINER -->
      <!-- =================================================================== -->
      <div class="max-w-5xl mx-auto px-4 sm:px-8 py-10 space-y-16">
`;
