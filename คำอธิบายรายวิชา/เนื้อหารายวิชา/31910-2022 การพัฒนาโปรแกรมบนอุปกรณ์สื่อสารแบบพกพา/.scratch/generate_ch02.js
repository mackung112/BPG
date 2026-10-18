const fs = require('fs');
const path = require('path');

const targetPath = 'd:/BPG/คำอธิบายรายวิชา/เนื้อหารายวิชา/31910-2022 การพัฒนาโปรแกรมบนอุปกรณ์สื่อสารแบบพกพา/interactive_web/ch02-figma-wireframing.html';

// We will build the HTML string cleanly
const html = `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>บทที่ 2: การออกแบบโครงสร้างหน้าจอ Wireframe ด้วย Figma | Red Broadcast</title>
  
  <!-- Google Fonts: Roboto, Sarabun & Roboto Mono ตามข้อกำหนด Red Broadcast -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Roboto+Mono:wght@400;500;600&family=Sarabun:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  
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
    
    /* ซ่อน Scrollbar ของชิปบาร์ */
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    /* สไตล์ความลึกตามข้อกำหนด design.md */
    .elevation-0 { box-shadow: none; }
    .elevation-1 { box-shadow: 0 1px 2px rgba(0,0,0,0.1); }
    .elevation-2 { box-shadow: 0 4px 32px rgba(0,0,0,0.1); }
    .elevation-3 { box-shadow: 0 8px 40px rgba(0,0,0,0.2); }

    /* การตัดข้อความ 2 บรรทัด */
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* Smooth Scroll */
    html {
      scroll-behavior: smooth;
    }

    /* Custom Mobile Phone Simulator Shell */
    .phone-simulator-frame {
      width: 330px;
      height: 660px;
      background: #0F0F0F;
      border-radius: 44px;
      padding: 12px;
      box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.4), 0 0 0 1px #262626;
      position: relative;
      margin: 0 auto;
    }

    .phone-screen {
      width: 100%;
      height: 100%;
      background: #FFFFFF;
      border-radius: 34px;
      overflow-y: auto;
      overflow-x: hidden;
      position: relative;
      display: flex;
      flex-direction: column;
    }

    .phone-notch {
      position: sticky;
      top: 0;
      left: 0;
      right: 0;
      height: 28px;
      background: #FFFFFF;
      z-index: 30;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 18px;
      font-size: 11px;
      font-weight: 600;
      color: #0F0F0F;
      border-bottom: 1px solid #F2F2F2;
    }

    .phone-island {
      width: 82px;
      height: 18px;
      background: #0F0F0F;
      border-radius: 20px;
      margin: 0 auto;
    }

    .phone-home-indicator {
      position: sticky;
      bottom: 6px;
      left: 50%;
      transform: translateX(-50%);
      width: 110px;
      height: 4px;
      background: #CCCCCC;
      border-radius: 9999px;
      z-index: 30;
      pointer-events: none;
    }

    /* Wireframe Image Box Diagonal Cross */
    .wireframe-img-box {
      background: #F2F2F2;
      position: relative;
      overflow: hidden;
      border: 1px solid #E5E5E5;
    }
    .wireframe-img-box::before, .wireframe-img-box::after {
      content: "";
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      border-top: 1px dashed #CCCCCC;
    }
    .wireframe-img-box::before {
      transform: rotate(26deg) scale(1.6);
    }
    .wireframe-img-box::after {
      transform: rotate(-26deg) scale(1.6);
    }

    /* Toast Notification for Copy */
    #copyToast {
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
  </style>
</head>
<body class="bg-white text-[#0F0F0F] min-h-screen flex flex-col">

  <!-- ========================================================================= -->
  <!-- 1. READING SCROLL PROGRESS BAR (Fixed Top, Red Line #FF0000) -->
  <!-- ========================================================================= -->
  <div id="scrollProgress" class="fixed top-0 left-0 h-1 bg-[#FF0000] z-[60] transition-all duration-75" style="width: 0%;"></div>

  <!-- ========================================================================= -->
  <!-- 2. STICKY TOP BAR (56px Height, Level 1 Shadow, Red Broadcast Branding) -->
  <!-- ========================================================================= -->
  <header class="sticky top-0 z-50 h-14 bg-white border-b border-[#E5E5E5] px-4 flex items-center justify-between elevation-1">
    <!-- ฝั่งซ้าย: ปุ่มเมนู + โลโก้แบรนด์ -->
    <div class="flex items-center gap-4">
      <button id="toggleSidebarBtn" class="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#F2F2F2] transition text-[#606060]" title="สลับแถบเมนู">
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

    <!-- ส่วนกลาง: ช่องค้นหา (Search Bar 44px) -->
    <div class="hidden sm:flex items-center flex-1 max-w-[620px] mx-6">
      <div class="flex w-full items-center">
        <div class="relative flex-1">
          <input 
            type="text" 
            id="searchInput"
            placeholder="ค้นหาหัวข้อในบทเรียน (เช่น Wireframe, Grayscale, Frame, 390x844, Auto Layout)..." 
            class="w-full h-10 pl-4 pr-3 bg-white border border-[#E5E5E5] rounded-l-full text-sm text-[#0F0F0F] placeholder-[#606060] focus:outline-none focus:border-[#065FD4]"
          />
        </div>
        <button 
          id="searchBtn"
          class="h-10 px-6 bg-[#F8F8F8] border border-l-0 border-[#E5E5E5] rounded-r-full hover:bg-[#F2F2F2] text-[#606060] flex items-center justify-center transition" 
          title="ค้นหา">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </button>
        <button onclick="alert('ฟังก์ชันค้นหาด้วยเสียงพร้อมใช้งานในห้องเรียนจริง')" class="w-10 h-10 ml-3 rounded-full bg-[#F2F2F2] hover:bg-[#E5E5E5] flex items-center justify-center text-[#0F0F0F] transition shrink-0" title="ค้นหาด้วยเสียง">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
        </button>
      </div>
    </div>

    <!-- ฝั่งขวา: เครื่องมือและการจัดการ (ไม่มีปุ่มพิมพ์เอกสารตามข้อกำหนด) -->
    <div class="flex items-center gap-2 sm:gap-3">
      <a href="index.html" class="hidden md:flex items-center gap-1.5 h-9 px-3.5 rounded-full border border-[#E5E5E5] text-xs font-medium text-[#0F0F0F] hover:bg-[#F2F2F2] transition">
        <svg class="w-4 h-4 text-[#606060]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
        <span>สารบัญ Hub</span>
      </a>

      <button class="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#F2F2F2] text-[#606060] transition relative" title="การแจ้งเตือน">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
        <span class="absolute top-2.5 right-2.5 w-2 h-2 bg-[#FF0000] rounded-full"></span>
      </button>

      <!-- รูปโปรไฟล์ครูผู้สอน -->
      <div class="flex items-center gap-2 pl-1">
        <div class="w-8 h-8 rounded-full bg-[#0F0F0F] text-white flex items-center justify-center font-bold text-xs ring-2 ring-[#FF0000]">
          MK
        </div>
      </div>
    </div>
  </header>

  <!-- ========================================================================= -->
  <!-- 3. MAIN LAYOUT WRAPPER (SIDEBAR + MAIN CONTENT AREA) -->
  <!-- ========================================================================= -->
  <div class="flex-1 flex overflow-hidden">

    <!-- ───────────────────────────────────────────────────────────────────── -->
    <!-- LEFT SIDEBAR (240px Collapsible) -->
    <!-- ───────────────────────────────────────────────────────────────────── -->
    <aside id="sidebar" class="w-60 bg-white border-r border-[#E5E5E5] shrink-0 hidden lg:flex flex-col justify-between overflow-y-auto transition-all duration-200">
      <div class="p-3 space-y-1">
        <div class="text-xs font-semibold text-[#606060] px-3 py-2 uppercase tracking-wider">สารบัญบทที่ 2</div>

        <a href="#intro" class="sidebar-link active flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition bg-[#F2F2F2] text-[#0F0F0F]">
          <span class="w-1.5 h-1.5 rounded-full bg-[#FF0000]"></span>
          <span class="truncate">เป้าหมาย & Roadmap 4 ชม.</span>
        </a>

        <a href="#fundamentals" class="sidebar-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition text-[#0F0F0F] hover:bg-[#F2F2F2]">
          <span class="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>
          <span class="truncate">1. หลักการ Wireframe & Grayscale</span>
        </a>

        <a href="#figma-setup" class="sidebar-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition text-[#0F0F0F] hover:bg-[#F2F2F2]">
          <span class="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>
          <span class="truncate">2. เริ่มต้น Figma & 7 คีย์ลัด</span>
        </a>

        <a href="#mobile-anatomy" class="sidebar-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition text-[#0F0F0F] hover:bg-[#F2F2F2]">
          <span class="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>
          <span class="truncate">3. กายวิภาค 3 โซน & Thumb Zone</span>
        </a>

        <a href="#archetypes" class="sidebar-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition text-[#0F0F0F] hover:bg-[#F2F2F2]">
          <span class="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>
          <span class="truncate">4. เจาะลึก 3 รูปแบบธุรกิจ</span>
        </a>

        <a href="#phone-simulator" class="sidebar-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition text-[#0F0F0F] hover:bg-[#F2F2F2]">
          <span class="w-1.5 h-1.5 rounded-full bg-[#065FD4]"></span>
          <span class="truncate">5. เครื่องจำลอง Phone Simulator</span>
        </a>

        <a href="#collaboration" class="sidebar-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition text-[#0F0F0F] hover:bg-[#F2F2F2]">
          <span class="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>
          <span class="truncate">6. ทำงานทีม 3 คน & จัดเลเยอร์</span>
        </a>

        <a href="#checklist" class="sidebar-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition text-[#0F0F0F] hover:bg-[#F2F2F2]">
          <span class="w-1.5 h-1.5 rounded-full bg-[#2BA640]"></span>
          <span class="truncate">7. แบบตรวจสอบตนเอง (Checklist)</span>
        </a>

        <a href="#rubric" class="sidebar-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition text-[#0F0F0F] hover:bg-[#F2F2F2]">
          <span class="w-1.5 h-1.5 rounded-full bg-[#FB8C00]"></span>
          <span class="truncate">8. เครื่องคิดเลขเกณฑ์รูบริก (10 คะแนน)</span>
        </a>

        <a href="#faq" class="sidebar-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition text-[#0F0F0F] hover:bg-[#F2F2F2]">
          <span class="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>
          <span class="truncate">9. คำถามทบทวนประจำบท</span>
        </a>

        <div class="border-t border-[#E5E5E5] my-3"></div>

        <!-- กล่องข้อมูลหลักสูตร -->
        <div class="px-3 py-2.5 bg-[#F8F8F8] rounded-xl border border-[#E5E5E5]">
          <div class="text-[10px] font-bold text-[#FF0000] tracking-wider uppercase">รหัสวิชา 31910-2022</div>
          <div class="text-xs font-semibold text-[#0F0F0F] mt-0.5 leading-snug">การพัฒนาโปรแกรมบนอุปกรณ์สื่อสารแบบพกพา</div>
          <div class="text-[11px] text-[#606060] mt-1">หลักสูตร ปวส. 2563 | สัปดาห์ที่ 2 (4 ชม.)</div>
        </div>
      </div>

      <!-- ส่วนล่างสุดของ Sidebar -->
      <div class="p-3 border-t border-[#E5E5E5] text-xs text-[#606060]">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-[#2BA640]"></span>
          <span>ระบบห้องเรียนออนไลน์ v4.0</span>
        </div>
        <div class="mt-0.5 text-[11px] text-[#606060]">สถาปัตยกรรม Red Broadcast</div>
      </div>
    </aside>

    <!-- ───────────────────────────────────────────────────────────────────── -->
    <!-- MAIN CONTENT VIEWPORT (Scrollable) -->
    <!-- ───────────────────────────────────────────────────────────────────── -->
    <main id="mainViewport" class="flex-1 overflow-y-auto bg-white flex flex-col">

      <!-- ═════════════════════════════════════════════════════════════════ -->
      <!-- 4. HORIZONTAL CHIP FILTER BAR (Pill-shaped Sticky) -->
      <!-- ═════════════════════════════════════════════════════════════════ -->
      <div class="sticky top-0 z-40 bg-white border-b border-[#E5E5E5] py-2.5 px-4 sm:px-8">
        <div class="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button onclick="filterChip('all', this)" class="chip-btn active h-8 px-4 rounded-full text-xs font-medium bg-[#0F0F0F] text-white transition shrink-0">ทั้งหมด</button>
          <button onclick="filterChip('intro', this)" class="chip-btn h-8 px-3.5 rounded-full text-xs font-medium bg-[#F2F2F2] text-[#0F0F0F] hover:bg-[#E5E5E5] transition shrink-0">เป้าหมาย & Roadmap</button>
          <button onclick="filterChip('fundamentals', this)" class="chip-btn h-8 px-3.5 rounded-full text-xs font-medium bg-[#F2F2F2] text-[#0F0F0F] hover:bg-[#E5E5E5] transition shrink-0">1. Wireframe & Grayscale</button>
          <button onclick="filterChip('figma-setup', this)" class="chip-btn h-8 px-3.5 rounded-full text-xs font-medium bg-[#F2F2F2] text-[#0F0F0F] hover:bg-[#E5E5E5] transition shrink-0">2. เริ่มต้น Figma</button>
          <button onclick="filterChip('mobile-anatomy', this)" class="chip-btn h-8 px-3.5 rounded-full text-xs font-medium bg-[#F2F2F2] text-[#0F0F0F] hover:bg-[#E5E5E5] transition shrink-0">3. กายวิภาค 3 โซน</button>
          <button onclick="filterChip('archetypes', this)" class="chip-btn h-8 px-3.5 rounded-full text-xs font-medium bg-[#F2F2F2] text-[#0F0F0F] hover:bg-[#E5E5E5] transition shrink-0">4. 3 Archetypes</button>
          <button onclick="filterChip('phone-simulator', this)" class="chip-btn h-8 px-3.5 rounded-full text-xs font-medium bg-[#F2F2F2] text-[#0F0F0F] hover:bg-[#E5E5E5] transition shrink-0">5. Phone Simulator</button>
          <button onclick="filterChip('collaboration', this)" class="chip-btn h-8 px-3.5 rounded-full text-xs font-medium bg-[#F2F2F2] text-[#0F0F0F] hover:bg-[#E5E5E5] transition shrink-0">6. ทีม & เลเยอร์</button>
          <button onclick="filterChip('checklist', this)" class="chip-btn h-8 px-3.5 rounded-full text-xs font-medium bg-[#F2F2F2] text-[#0F0F0F] hover:bg-[#E5E5E5] transition shrink-0">7. Checklist</button>
          <button onclick="filterChip('rubric', this)" class="chip-btn h-8 px-3.5 rounded-full text-xs font-medium bg-[#F2F2F2] text-[#0F0F0F] hover:bg-[#E5E5E5] transition shrink-0">8. รูบริกคำนวณคะแนน</button>
          <button onclick="filterChip('faq', this)" class="chip-btn h-8 px-3.5 rounded-full text-xs font-medium bg-[#F2F2F2] text-[#0F0F0F] hover:bg-[#E5E5E5] transition shrink-0">9. คำถามทบทวน</button>
        </div>
      </div>

      <!-- ═════════════════════════════════════════════════════════════════ -->
      <!-- 5. LESSON HERO / BROADCAST THEATER STAGE -->
      <!-- ═════════════════════════════════════════════════════════════════ -->
      <section class="max-w-6xl mx-auto w-full px-4 sm:px-8 py-6">
        
        <!-- Broadcast Stage Frame (Dark Theater Layout) -->
        <div class="w-full bg-[#0F0F0F] text-white rounded-2xl overflow-hidden relative border border-black shadow-md">
          <div class="p-6 sm:p-10 flex flex-col justify-between min-h-[300px] sm:min-h-[360px] relative z-10">
            <!-- Badges แถวบน -->
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div class="flex items-center gap-2">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FF0000] text-white">
                  <span class="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                  LECTURE BROADCAST
                </span>
                <span class="px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 text-zinc-300 border border-white/10">
                  สัปดาห์ที่ 2 • ภาคปฏิบัติการ 4 ชม.
                </span>
              </div>
              <span class="font-mono text-xs text-zinc-400">COURSE ID: 31910-2022</span>
            </div>

            <!-- ข้อความชื่อบทเรียนขนาดใหญ่ -->
            <div class="my-6">
              <div class="text-xs uppercase tracking-widest text-[#FF0000] font-bold mb-2">บทที่ 2 • MOBILE ARCHITECTURAL WIREFRAMING</div>
              <h1 class="text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                การออกแบบโครงสร้างหน้าจอ Wireframe ด้วย Figma
              </h1>
              <p class="text-sm sm:text-base text-zinc-300 mt-3 max-w-3xl leading-relaxed">
                เปลี่ยนพิมพ์เขียวแนวคิดจาก App Concept Canvas สู่โครงร่างหน้าจอสมาร์ตโฟนสีขาว-ดำ (Grayscale Wireframe) บนมาตรฐานสากล 390x844 px ทำความเข้าใจกายวิภาค 3 โซน และ Thumb Zone พร้อมเจาะลึก 3 รูปแบบธุรกิจ (Retail, Booking, Asset Tracking)
              </p>
            </div>

            <!-- แถบความคืบหน้าการอ่าน -->
            <div class="space-y-2">
              <div class="flex justify-between text-xs text-zinc-400 font-mono">
                <span>เป้าหมายชิ้นงาน: Wireframe 3-4 หน้าจอในทีม 3 คน</span>
                <span>มาตรฐานขนาด: 390 x 844 px (Pure Grayscale)</span>
              </div>
              <div class="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div class="h-full bg-[#FF0000] w-2/5"></div>
              </div>
            </div>
          </div>

          <!-- Decorative Gradient Background Behind Stage -->
          <div class="absolute inset-0 bg-gradient-to-tr from-black via-zinc-900 to-red-950/40 pointer-events-none"></div>
        </div>

        <!-- Instructor Stack & Metadata Bar -->
        <div class="mt-4 flex flex-wrap items-center justify-between gap-4 py-3 border-b border-[#E5E5E5]">
          <!-- ผู้สอน / Channel Profile -->
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-full bg-[#0F0F0F] text-white flex items-center justify-center font-bold text-sm ring-2 ring-[#FF0000]">
              MK
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <span class="font-bold text-sm text-[#0F0F0F]">ครูแม็ค (Mac Teacher)</span>
                <!-- Verified Badge (#2BA640) -->
                <svg class="w-4 h-4 text-[#2BA640]" fill="currentColor" viewBox="0 0 24 24" title="ผู้สอนผ่านการรับรอง"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              </div>
              <div class="text-xs text-[#606060]">
                ครูผู้เชี่ยวชาญคอมพิวเตอร์และธุรกิจดิจิทัล • นักศึกษาลงทะเบียน 1,420 คน
              </div>
            </div>
          </div>

          <!-- Action Buttons (Subscribe Dark Button + Like/Share Buttons) -->
          <div class="flex items-center gap-2">
            <button onclick="subscribeCourse(this)" class="h-9 px-5 bg-[#0F0F0F] hover:bg-black text-white text-xs font-medium rounded-full flex items-center gap-1.5 transition">
              <svg class="w-3.5 h-3.5 fill-current text-[#FF0000]" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
              <span id="subText">ติดตามรายวิชา</span>
            </button>

            <!-- Segmented Action Pair (Like / Share) -->
            <div class="flex items-center bg-[#F2F2F2] rounded-full p-0.5 border border-[#E5E5E5]">
              <button id="likeBtn" onclick="toggleLike()" class="flex items-center gap-1.5 h-8 px-3 rounded-full hover:bg-white text-xs text-[#0F0F0F] font-medium transition">
                <svg id="likeIcon" class="w-4 h-4 text-[#606060]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path></svg>
                <span id="likeCount">192</span>
              </button>
              <div class="w-[1px] h-4 bg-[#E5E5E5]"></div>
              <button onclick="shareLesson()" class="flex items-center gap-1.5 h-8 px-3 rounded-full hover:bg-white text-xs text-[#0F0F0F] font-medium transition">
                <svg class="w-4 h-4 text-[#606060]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
                <span>แชร์</span>
              </button>
            </div>
          </div>
        </div>

      </section>

      <!-- ═════════════════════════════════════════════════════════════════ -->
      <!-- 6. MAIN BODY TEXTBOOK CONTENT -->
      <!-- ═════════════════════════════════════════════════════════════════ -->
      <div class="max-w-4xl mx-auto w-full px-4 sm:px-8 py-6 space-y-16">

        <!-- ───────────────────────────────────────────────────────────── -->
        <!-- SECTION 0: วัตถุประสงค์การเรียนรู้ & แผนผัง ROADMAP 4 ชั่วโมง -->
        <!-- ───────────────────────────────────────────────────────────── -->
        <article id="intro" class="lesson-section scroll-mt-20">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF0000] mb-1">
            <span>บทนำและเป้าหมายการเรียนรู้</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold text-[#0F0F0F] tracking-tight mb-4">
            จุดประสงค์การเรียนรู้และแผนผัง 4 ชั่วโมงปฏิบัติการ
          </h2>

          <!-- จุดประสงค์ 5 ข้อ -->
          <div class="p-5 rounded-2xl bg-[#F8F8F8] border border-[#E5E5E5] space-y-3 mb-6">
            <h3 class="font-bold text-sm text-[#0F0F0F] flex items-center gap-2">
              <svg class="w-4 h-4 text-[#FF0000]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              สมรรถนะที่ผู้เรียนจะได้รับเมื่อจบบทเรียนนี้:
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#0F0F0F]">
              <div class="flex items-start gap-2 bg-white p-3 rounded-xl border border-[#E5E5E5]">
                <span class="font-bold text-[#FF0000] shrink-0">1.</span>
                <span>อธิบายความหมาย ประโยชน์ และความสำคัญของ <strong>Wireframe (โครงร่างจำลองขาว-ดำ)</strong> ในกระบวนการวิศวกรรมซอฟต์แวร์ได้ถูกต้อง</span>
              </div>
              <div class="flex items-start gap-2 bg-white p-3 rounded-xl border border-[#E5E5E5]">
                <span class="font-bold text-[#FF0000] shrink-0">2.</span>
                <span>สมัครและใช้งานเครื่องมือพื้นฐานของ <strong>Figma</strong> (Frame, Shapes, Text, Alignment, Layer Management) ได้อย่างคล่องแคล่ว</span>
              </div>
              <div class="flex items-start gap-2 bg-white p-3 rounded-xl border border-[#E5E5E5]">
                <span class="font-bold text-[#FF0000] shrink-0">3.</span>
                <span>ออกแบบ Wireframe ขนาดหน้าจอมือถือมาตรฐาน <strong>390 x 844 px</strong> จำนวน 3-4 หน้าจอตามแนวคิดโปรเจกต์ของกลุ่มตนเองได้ครบถ้วน</span>
              </div>
              <div class="flex items-start gap-2 bg-white p-3 rounded-xl border border-[#E5E5E5]">
                <span class="font-bold text-[#FF0000] shrink-0">4.</span>
                <span>ประยุกต์ใช้แนวคิดโครงสร้างหน้าจอตาม <strong>3 รูปแบบธุรกิจ (Archetypes)</strong> เพื่อตอบโจทย์พฤติกรรมผู้ใช้จริงได้อย่างมีประสิทธิภาพ</span>
              </div>
              <div class="flex items-start gap-2 bg-white p-3 rounded-xl border border-[#E5E5E5] sm:col-span-2">
                <span class="font-bold text-[#FF0000] shrink-0">5.</span>
                <span>ทำงานร่วมกันในทีม 3 คนบนไฟล์ Figma เดียวกัน จัดการเลเยอร์อย่างเป็นระบบ (Layer Hygiene) และแชร์ลิงก์เปิดสิทธิ์ได้อย่างถูกต้อง</span>
              </div>
            </div>
          </div>

          <!-- Roadmap 4 ชั่วโมง -->
          <div class="space-y-3">
            <div class="text-xs font-bold uppercase tracking-wider text-[#606060]">🧭 แผนผังการเรียนรู้ประจำสัปดาห์ที่ 2 (4 ชั่วโมงเต็ม):</div>
            
            <div class="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <!-- ชม. 1 -->
              <div class="p-3.5 rounded-xl border-l-4 border-l-[#FF0000] border border-[#E5E5E5] bg-white">
                <div class="text-[10px] font-bold text-[#FF0000] uppercase tracking-wider">ชั่วโมงที่ 1</div>
                <div class="font-bold text-sm text-[#0F0F0F] mt-1">ปูพื้นฐาน Wireframe</div>
                <ul class="mt-2 space-y-1 text-[#606060] text-[11px] list-disc list-inside">
                  <li>ทำความเข้าใจ Wireframe</li>
                  <li>ทำไมต้อง Grayscale ขาว-ดำ</li>
                  <li>Visual Hierarchy ลำดับสายตา</li>
                </ul>
              </div>

              <!-- ชม. 2 -->
              <div class="p-3.5 rounded-xl border-l-4 border-l-[#065FD4] border border-[#E5E5E5] bg-white">
                <div class="text-[10px] font-bold text-[#065FD4] uppercase tracking-wider">ชั่วโมงที่ 2</div>
                <div class="font-bold text-sm text-[#0F0F0F] mt-1">เริ่มต้นใช้ Figma</div>
                <ul class="mt-2 space-y-1 text-[#606060] text-[11px] list-disc list-inside">
                  <li>เข้าใช้งานผ่าน Google Workspace</li>
                  <li>ทำความรู้จัก 4 โซนหน้าต่าง</li>
                  <li>7 คีย์ลัดจำเป็น + Auto Layout</li>
                </ul>
              </div>

              <!-- ชม. 3 -->
              <div class="p-3.5 rounded-xl border-l-4 border-l-[#2BA640] border border-[#E5E5E5] bg-white">
                <div class="text-[10px] font-bold text-[#2BA640] uppercase tracking-wider">ชั่วโมงที่ 3</div>
                <div class="font-bold text-sm text-[#0F0F0F] mt-1">วาดโครงร่าง 3-4 หน้าจอ</div>
                <ul class="mt-2 space-y-1 text-[#606060] text-[11px] list-disc list-inside">
                  <li>สร้าง Frame 390x844 px</li>
                  <li>วางโครงสร้างกายวิภาค 3 โซน</li>
                  <li>เทียบเคียง Flow 3 Archetypes</li>
                </ul>
              </div>

              <!-- ชม. 4 -->
              <div class="p-3.5 rounded-xl border-l-4 border-l-[#FB8C00] border border-[#E5E5E5] bg-white">
                <div class="text-[10px] font-bold text-[#FB8C00] uppercase tracking-wider">ชั่วโมงที่ 4</div>
                <div class="font-bold text-sm text-[#0F0F0F] mt-1">จัดระเบียบ & ส่งตรวจ</div>
                <ul class="mt-2 space-y-1 text-[#606060] text-[11px] list-disc list-inside">
                  <li>จัด Layer Hygiene ในทีม 3 คน</li>
                  <li>ตรวจทาน Self-Checklist</li>
                  <li>แชร์ลิงก์เปิดสิทธิ์ Can View</li>
                </ul>
              </div>
            </div>
          </div>
        </article>

        <!-- ───────────────────────────────────────────────────────────── -->
        <!-- SECTION 1: ทำความเข้าใจ Wireframe: พิมพ์เขียวก่อนลงมือก่อสร้าง -->
        <!-- ───────────────────────────────────────────────────────────── -->
        <article id="fundamentals" class="lesson-section scroll-mt-20">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF0000] mb-1">
            <span>หัวข้อที่ 1</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold text-[#0F0F0F] tracking-tight mb-4">
            ทำความเข้าใจ Wireframe: พิมพ์เขียวก่อนลงมือก่อสร้าง
          </h2>

          <div class="prose text-[#0F0F0F] leading-relaxed space-y-4 text-base">
            <h3 class="text-lg font-bold text-[#0F0F0F]">1.1 Wireframe คืออะไร?</h3>
            <p>
              <strong>Wireframe (ไวร์เฟรม)</strong> คือ "ภาพร่างโครงสร้างเชิงสถาปัตยกรรม" ของหน้าจอแอปพลิเคชัน ที่แสดงเฉพาะ <strong>ตำแหน่งขององค์ประกอบ (Layout), ลำดับความสำคัญของเนื้อหา (Hierarchy), และเส้นทางการทำงาน (Navigation Flow)</strong> โดยตัดองค์ประกอบเรื่องสีสันตกแต่ง, รูปภาพจริง, และฟอนต์กราฟิกวิจิตรออกทั้งหมด คงเหลือไว้เพียงสีขาว, เทา, ดำ และเส้นกรอบเรขาคณิตพื้นฐาน
            </p>
            <p>
              เปรียบเสมือน <strong>"พิมพ์เขียวของบ้าน (Blueprint)"</strong> ที่สถาปนิกเขียนขึ้นเพื่อระบุว่า ประตูอยู่ตรงไหน ห้องน้ำอยู่ทิศใด บันไดมีความกว้างเท่าไร ก่อนที่จะให้ช่างปูกระเบื้องและช่างทาสีเข้ามาทำงาน หากเราไม่ทำพิมพ์เขียวให้เรียบร้อยก่อน แล้วลงมือทาสีหรือสร้างห้องทันที เมื่อพบว่าลืมเจาะช่องประตู การทุบตึกเพื่อแก้ไขย่อมก่อให้เกิดความสูญเสียมหาศาล ทั้งเวลาและงบประมาณ
            </p>

            <!-- ตารางเปรียบเทียบลำดับขั้นของการออกแบบ UI/UX -->
            <div class="overflow-x-auto my-6 border border-[#E5E5E5] rounded-xl">
              <table class="w-full text-left text-xs border-collapse">
                <thead class="bg-[#F8F8F8] border-b border-[#E5E5E5] text-[#0F0F0F]">
                  <tr>
                    <th class="p-3 font-bold">ลำดับขั้นตอน</th>
                    <th class="p-3 font-bold">ชื่อเรียก</th>
                    <th class="p-3 font-bold">คำอธิบายและวัตถุประสงค์</th>
                    <th class="p-3 font-bold">ความละเอียด (Fidelity)</th>
                    <th class="p-3 font-bold">เครื่องมือที่ใช้</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[#E5E5E5] text-[#606060]">
                  <tr>
                    <td class="p-3 font-mono font-bold text-[#0F0F0F]">ระดับ 1</td>
                    <td class="p-3 font-bold text-[#0F0F0F]">Sketch</td>
                    <td class="p-3">วาดมือบนกระดาษอย่างรวดเร็วเพื่อระดมไอเดีย ไม่เน้นความประณีต</td>
                    <td class="p-3"><span class="px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 font-medium">Low-Fidelity</span></td>
                    <td class="p-3">ดินสอ, ปากกา, กระดาษ A4</td>
                  </tr>
                  <tr class="bg-red-50/50">
                    <td class="p-3 font-mono font-bold text-[#FF0000]">ระดับ 2 (บทนี้)</td>
                    <td class="p-3 font-bold text-[#FF0000]">Wireframe</td>
                    <td class="p-3 text-[#0F0F0F]">โครงร่างขาว-ดำแบบดิจิทัล จัดวางตำแหน่ง ขนาด สัดส่วน และทิศทางการกด</td>
                    <td class="p-3"><span class="px-2 py-0.5 rounded bg-red-100 text-[#FF0000] font-bold">Low/Mid-Fidelity</span></td>
                    <td class="p-3 font-semibold text-[#0F0F0F]">Figma (Frames & Shapes)</td>
                  </tr>
                  <tr>
                    <td class="p-3 font-mono font-bold text-[#0F0F0F]">ระดับ 3 (บทที่ 3)</td>
                    <td class="p-3 font-bold text-[#0F0F0F]">Mockup / Hi-Fi UI</td>
                    <td class="p-3">ลงสีจริงของแบรนด์ ใส่รูปภาพจริง ตัวอักษร ฟอนต์ และเอฟเฟกต์แสงเงาครบถ้วน</td>
                    <td class="p-3"><span class="px-2 py-0.5 rounded bg-blue-100 text-[#065FD4] font-medium">High-Fidelity</span></td>
                    <td class="p-3">Figma (Components & Styles)</td>
                  </tr>
                  <tr>
                    <td class="p-3 font-mono font-bold text-[#0F0F0F]">ระดับ 4 (บทที่ 4)</td>
                    <td class="p-3 font-bold text-[#0F0F0F]">Interactive Prototype</td>
                    <td class="p-3">เชื่อมโยงหน้าจอให้คลิก/สัมผัสโต้ตอบได้บนมือถือ เสมือนใช้งานแอปพลิเคชันจริง</td>
                    <td class="p-3"><span class="px-2 py-0.5 rounded bg-green-100 text-[#2BA640] font-medium">Interactive Simulation</span></td>
                    <td class="p-3">Figma Mirror / Prototype Flow</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- 1.2 กฎเหล็ก Grayscale -->
            <h3 class="text-lg font-bold text-[#0F0F0F] pt-4">1.2 กฎเหล็ก: ทำไม Wireframe ต้องใช้เฉพาะสีขาว-ดำ-เทา (Grayscale)?</h3>
            <p>
              ข้อผิดพลาดอันดับ 1 ของผู้เริ่มต้นออกแบบ UI คือ <strong>"การรีบกระโดดไปเลือกสีและหารูปสวย ๆ มาใส่"</strong> ซึ่งจะนำไปสู่ปัญหาคลาสสิก 3 ประการ:
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
              <div class="p-4 rounded-xl border border-[#E5E5E5] bg-white">
                <div class="w-8 h-8 rounded-lg bg-red-50 text-[#FF0000] flex items-center justify-center font-bold mb-2 text-sm">01</div>
                <h4 class="font-bold text-sm text-[#0F0F0F]">เสียสมาธิจากฟังก์ชันหลัก (Distraction)</h4>
                <p class="text-xs text-[#606060] mt-1.5 leading-relaxed">
                  สมาชิกในกลุ่มจะเริ่มถกเถียงกันว่า "สีชมพูนี้สวยกว่าสีฟ้าหรือไม่" หรือ "รูปกาแฟแก้วไหนดูน่ากินกว่า" แทนที่จะสนใจว่า "ปุ่มกดสั่งซื้อวางอยู่ตำแหน่งที่นิ้วโป้งกดถึงง่ายหรือไม่"
                </p>
              </div>

              <div class="p-4 rounded-xl border border-[#E5E5E5] bg-white">
                <div class="w-8 h-8 rounded-lg bg-red-50 text-[#FF0000] flex items-center justify-center font-bold mb-2 text-sm">02</div>
                <h4 class="font-bold text-sm text-[#0F0F0F]">ภาพลวงตาทางสายตา (Visual Bias)</h4>
                <p class="text-xs text-[#606060] mt-1.5 leading-relaxed">
                  รูปภาพที่สวยงามและสีสันสดใสอาจหลอกตาให้เรารู้สึกว่าหน้านั้นออกแบบดีแล้ว ทั้งที่จริง ๆ โครงสร้างการจัดวางซับซ้อน หาปุ่มกดยาก และขนาดตัวหนังสืออ่านไม่ชัดเจน
                </p>
              </div>

              <div class="p-4 rounded-xl border border-[#E5E5E5] bg-white">
                <div class="w-8 h-8 rounded-lg bg-red-50 text-[#FF0000] flex items-center justify-center font-bold mb-2 text-sm">03</div>
                <h4 class="font-bold text-sm text-[#0F0F0F]">การแก้ไขที่เชื่องช้า (Slow Iteration)</h4>
                <p class="text-xs text-[#606060] mt-1.5 leading-relaxed">
                  หากลงสีและใส่กราฟิกเต็มรูปแบบ เมื่อครูผู้สอนหรือเจ้าของร้านขอปรับเปลี่ยน Flow หน้าจอ จะต้องเสียเวลาแก้งานนานกว่าการขยับกล่องสี่เหลี่ยมใน Wireframe ถึง 10 เท่า
                </p>
              </div>
            </div>

            <!-- กล่องข้อกำหนดชุดสี Grayscale Tokens -->
            <div class="p-5 rounded-2xl bg-[#0F0F0F] text-white my-6 space-y-3">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-[#FF0000]"></span>
                  <span class="font-bold text-sm uppercase tracking-wider text-white">กฎชุดสี Grayscale สำหรับบทเรียนนี้ (Tokens Palette)</span>
                </div>
                <button onclick="copyToClipboard('#FFFFFF, #F2F2F2, #CCCCCC, #666666, #0F0F0F', this)" class="text-xs text-zinc-300 hover:text-white flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded transition">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                  <span>คัดลอกชุดสี</span>
                </button>
              </div>
              <p class="text-xs text-zinc-300">ห้ามใส่สีสันฉูดฉาดเด็ดขาด ให้ใช้เฉพาะ 5 ระดับเฉดสีมาตรฐานนี้เท่านั้น:</p>
              <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
                <div class="bg-white text-black p-2 rounded-lg text-center border border-zinc-700">
                  <div class="font-mono text-xs font-bold">#FFFFFF</div>
                  <div class="text-[10px] text-zinc-500">Surface (พื้นหลังจอ)</div>
                </div>
                <div class="bg-[#F2F2F2] text-black p-2 rounded-lg text-center border border-zinc-700">
                  <div class="font-mono text-xs font-bold">#F2F2F2</div>
                  <div class="text-[10px] text-zinc-600">Cards / Input Box</div>
                </div>
                <div class="bg-[#CCCCCC] text-black p-2 rounded-lg text-center border border-zinc-700">
                  <div class="font-mono text-xs font-bold">#CCCCCC</div>
                  <div class="text-[10px] text-zinc-800">Borders / Dividers</div>
                </div>
                <div class="bg-[#666666] text-white p-2 rounded-lg text-center border border-zinc-700">
                  <div class="font-mono text-xs font-bold">#666666</div>
                  <div class="text-[10px] text-zinc-300">Subtext / Icons</div>
                </div>
                <div class="bg-[#0F0F0F] text-white p-2 rounded-lg text-center border border-zinc-700">
                  <div class="font-mono text-xs font-bold">#0F0F0F</div>
                  <div class="text-[10px] text-zinc-400">Heading & Primary CTA</div>
                </div>
              </div>
            </div>

            <!-- 1.3 Visual Hierarchy -->
            <h3 class="text-lg font-bold text-[#0F0F0F] pt-4">1.3 หลักการจัดลำดับการรับรู้ทางสายตา (Visual Hierarchy)</h3>
            <p>
              เมื่อผู้ใช้งานเปิดหน้าจอแอปขึ้นมา สายตาจะกวาดมองสิ่งที่โดดเด่นที่สุดก่อนเสมอ การออกแบบ Wireframe ที่ดีต้องกำหนดทิศทางสายตาของผู้ใช้ได้ทันทีโดยไม่ต้องพึ่งพาสี ด้วย 3 มิติหลัก:
            </p>

            <div class="space-y-3 my-4">
              <div class="p-3.5 rounded-xl border border-[#E5E5E5] bg-white flex items-start gap-3">
                <div class="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center font-bold text-xs text-[#0F0F0F] shrink-0">1</div>
                <div>
                  <h4 class="font-bold text-sm text-[#0F0F0F]">ขนาด (Scale & Proportions)</h4>
                  <p class="text-xs text-[#606060] mt-0.5">สิ่งสำคัญที่สุดต้องมีขนาดใหญ่ที่สุด เช่น ชื่อหน้าจอ (20-24px) ย่อมใหญ่กว่าข้อความรายละเอียดสินค้า (13-14px) และกล่องรูปภาพสินค้าควรมีอัตราส่วนชัดเจน</p>
                </div>
              </div>

              <div class="p-3.5 rounded-xl border border-[#E5E5E5] bg-white flex items-start gap-3">
                <div class="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center font-bold text-xs text-[#0F0F0F] shrink-0">2</div>
                <div>
                  <h4 class="font-bold text-sm text-[#0F0F0F]">น้ำหนักและความเข้ม (Weight & Luminance Contrast)</h4>
                  <p class="text-xs text-[#606060] mt-0.5">หัวข้อสำคัญและปุ่ม Call to Action ใช้สีดำทึบ (#0F0F0F) หรือฟอนต์หนา (Bold) ส่วนคำอธิบายประกอบใช้สีเทากลาง (#666666) และเส้นขอบใช้สีเทาอ่อน (#CCCCCC)</p>
                </div>
              </div>

              <div class="p-3.5 rounded-xl border border-[#E5E5E5] bg-white flex items-start gap-3">
                <div class="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center font-bold text-xs text-[#0F0F0F] shrink-0">3</div>
                <div>
                  <h4 class="font-bold text-sm text-[#0F0F0F]">พื้นที่ว่างและระบบระยะห่าง (White Space & 8-Point Grid)</h4>
                  <p class="text-xs text-[#606060] mt-0.5">องค์ประกอบที่อยู่ชิดกันคือเรื่องเดียวกัน หากเป็นคนละหมวดหมู่ต้องเว้นระยะห่างให้ชัดเจน โดยทุกระยะห่างใน Figma ต้องอิงกับฐาน <strong>8 พิกเซล (8, 16, 24, 32, 40 px)</strong> เสมอ เพื่อความสม่ำเสมอในการเขียนโปรแกรม</p>
                </div>
              </div>
            </div>

            <!-- ไดอะแกรมจำลอง Visual Hierarchy -->
            <div class="p-5 rounded-2xl border border-[#E5E5E5] bg-[#F8F8F8] my-6 font-mono text-xs">
              <div class="text-[11px] font-bold text-[#606060] mb-2 uppercase tracking-wider font-sans">ภาพจำลอง Visual Hierarchy บนโครงร่าง Wireframe (ASCII Diagram):</div>
              <pre class="overflow-x-auto text-[#0F0F0F] bg-white p-4 rounded-xl border border-[#E5E5E5]">
┌───────────────────────────────────────┐
│ [←]               หัวข้อหน้าจอ (20px) │ ← น้ำหนักหนา (#0F0F0F) ชัดเจน
├───────────────────────────────────────┤
│ ┌───────────────────────────────────┐ │
│ │ ╲                               ╱ │ │
│ │   ╲       กล่องรูปภาพ           ╱   │ │ ← กล่องเทาอ่อน (#F2F2F2) มีกากบาทไขว้
│ │     ╳      (สัดส่วน 16:9)     ╳     │ │
│ │   ╱                             ╲   │ │
│ │ ╱                                 ╲ │ │
│ └───────────────────────────────────┘ │
│                                       │
│ ชื่อนูนเด่นสินค้า (16px, Bold)        │ ← สายตาอ่านจุดนี้ก่อน
│ คำอธิบายรายละเอียดสินค้าย่อ 2 บรรทัด  │ ← ข้อความเทากลาง (13px, #666666)
│ สีเทาอ่านสบายตา ระยะห่าง 8px...       │
│                                       │
│ ฿120.00                               │ ← ราคาเด่นชัด (18px, Bold)
│                                       │
│ ┌───────────────────────────────────┐ │
│ │         [ ปุ่มกดหลัก ดำทึบ ]       │ │ ← Call to Action ใหญ่ ชัดเจน (48px Height)
│ └───────────────────────────────────┘ │
└───────────────────────────────────────┘</pre>
            </div>
          </div>
        </article>

        <!-- ───────────────────────────────────────────────────────────── -->
        <!-- SECTION 2: เริ่มต้นใช้งาน Figma สำหรับการศึกษา -->
        <!-- ───────────────────────────────────────────────────────────── -->
        <article id="figma-setup" class="lesson-section scroll-mt-20">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF0000] mb-1">
            <span>หัวข้อที่ 2</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold text-[#0F0F0F] tracking-tight mb-4">
            เริ่มต้นใช้งาน Figma สำหรับการศึกษา (จากศูนย์สู่มืออาชีพ)
          </h2>

          <div class="prose text-[#0F0F0F] leading-relaxed space-y-4 text-base">
            <p>
              <strong>Figma</strong> เป็นโปรแกรมออกแบบระดับโลกที่ทำงานบนระบบคลาวด์ 100% สามารถเปิดใช้งานผ่านเว็บเบราว์เซอร์ (Google Chrome, Microsoft Edge, Safari) หรือติดตั้งเป็นโปรแกรมบนคอมพิวเตอร์ (Figma Desktop App) ก็ได้ โดยมีจุดเด่นสูงสุดคือ <strong>การทำงานร่วมกันแบบเรียลไทม์ (Real-time Collaboration)</strong> ทำให้สมาชิกในกลุ่มทั้ง 3 คนสามารถเข้ามาร่วมออกแบบในไฟล์เดียวกันพร้อมกันได้ทันที
            </p>

            <h3 class="text-lg font-bold text-[#0F0F0F]">2.1 ขั้นตอนการเข้าใช้งาน Figma (ทีละคลิก)</h3>
            <ol class="list-decimal list-inside space-y-2 text-sm text-[#0F0F0F] pl-2">
              <li>เปิดเว็บเบราว์เซอร์ ไปที่เว็บไซต์ <a href="https://www.figma.com" target="_blank" class="text-[#065FD4] font-semibold underline">www.figma.com</a></li>
              <li>คลิกปุ่ม <strong>"Get started for free"</strong> หรือ <strong>"Sign up"</strong> ที่มุมขวาบนของหน้าเว็บ</li>
              <li>เลือก <strong>"Continue with Google"</strong> โดยใช้อีเมลสถานศึกษาของวิทยาลัย (@bpg) หรืออีเมล Gmail ที่เตรียมไว้สำหรับโครงงาน</li>
              <li>ตอบคำถามเริ่มต้นของระบบ: เลือกประเภทเป็น <strong>"Education / Student"</strong> เพื่อปลดล็อกฟีเจอร์ระดับสถาบันการศึกษา</li>
              <li>เมื่อเข้าสู่หน้าต่าง Dashboard ให้คลิกปุ่มสีฟ้า <strong>"+ Design file"</strong> ที่มุมบนขวา เพื่อเปิดกระดานทำงานว่างเปล่า</li>
              <li>
                เปลี่ยนชื่อไฟล์จาก <code>Untitled</code> ที่มุมบนซ้าย ให้เป็นรูปแบบมาตรฐานของหลักสูตร:
                <div class="mt-2 flex items-center gap-2 bg-[#F8F8F8] p-2.5 rounded-lg border border-[#E5E5E5] font-mono text-xs">
                  <span class="text-[#FF0000] font-bold">[กลุ่มที่]_[ชื่อโปรเจกต์]_Wireframe</span>
                  <span class="text-[#606060]">(เช่น Group03_FreshBrew_Wireframe)</span>
                  <button onclick="copyToClipboard('Group03_FreshBrew_Wireframe', this)" class="ml-auto px-2 py-1 bg-white border border-[#CCCCCC] rounded hover:bg-[#F2F2F2] text-[11px] text-[#0F0F0F] font-sans">คัดลอกตัวอย่างชื่อ</button>
                </div>
              </li>
            </ol>

            <!-- 2.2 โครงสร้างหน้าต่างทำงาน 4 โซน -->
            <h3 class="text-lg font-bold text-[#0F0F0F] pt-4">2.2 โครงสร้างหน้าจอการทำงานของ Figma (The Figma Workspace)</h3>
            <p class="text-sm text-[#606060]">หน้าต่างการทำงานของ Figma แบ่งออกเป็น 4 ส่วนหลักที่มีหน้าที่เฉพาะตัว:</p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
              <div class="p-4 rounded-xl border border-[#E5E5E5] bg-white">
                <div class="flex items-center gap-2 mb-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-[#FF0000]"></span>
                  <h4 class="font-bold text-sm text-[#0F0F0F]">1. Top Toolbar (แถบเครื่องมือด้านบน)</h4>
                </div>
                <p class="text-xs text-[#606060] leading-relaxed">
                  แถบควบคุมหลักรวบรวมเครื่องมือวาดทั้งหมด เช่น Move (V), Frame (F), Rectangle (R), Text (T), Hand Tool, และปุ่มแสดงความคิดเห็น (Comment C) รวมถึงปุ่ม Play Prototype และปุ่ม Share สีฟ้าที่มุมขวา
                </p>
              </div>

              <div class="p-4 rounded-xl border border-[#E5E5E5] bg-white">
                <div class="flex items-center gap-2 mb-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-[#065FD4]"></span>
                  <h4 class="font-bold text-sm text-[#0F0F0F]">2. Left Sidebar (แผงเลเยอร์และหน้า)</h4>
                </div>
                <p class="text-xs text-[#606060] leading-relaxed">
                  แสดงรายชื่อหน้าจอ (Frames) และชิ้นส่วนทั้งหมด เรียงลำดับจากบนลงล่าง โดยชิ้นที่อยู่บนสุดในรายการจะวางซ้อนทับชิ้นอื่นในหน้าจอ พร้อมทั้งแท็บ Assets สำหรับดึงคอมโพเนนต์มาใช้งาน
                </p>
              </div>

              <div class="p-4 rounded-xl border border-[#E5E5E5] bg-white">
                <div class="flex items-center gap-2 mb-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-[#2BA640]"></span>
                  <h4 class="font-bold text-sm text-[#0F0F0F]">3. Center Canvas (กระดานทำงาน)</h4>
                </div>
                <p class="text-xs text-[#606060] leading-relaxed">
                  กระดานทำงานแบบอินฟินิตี้ (Infinite Canvas) สามารถเลื่อน (Pan) และย่อ-ขยาย (Zoom) ได้อย่างอิสระ เป็นพื้นที่วางหน้าจอสมาร์ตโฟนหลาย ๆ หน้าจอเรียงต่อกันเพื่อแสดง User Flow
                </p>
              </div>

              <div class="p-4 rounded-xl border border-[#E5E5E5] bg-white">
                <div class="flex items-center gap-2 mb-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-[#FB8C00]"></span>
                  <h4 class="font-bold text-sm text-[#0F0F0F]">4. Right Sidebar (แผง Design Inspector)</h4>
                </div>
                <p class="text-xs text-[#606060] leading-relaxed">
                  แผงปรับแต่งค่าสไตล์ของวัตถุที่กำลังคลิกเลือกอยู่ เช่น ขนาด (Width, Height), พิกัด (X, Y), การจัดเรียง Auto Layout, สีพื้นหลัง (Fill), เส้นขอบ (Stroke), รัศมีมุมโค้ง (Corner Radius) และเอฟเฟกต์
                </p>
              </div>
            </div>

            <!-- 2.3 ตารางคีย์ลัดจำเป็น 7 ตัว -->
            <div class="my-6">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-lg font-bold text-[#0F0F0F]">2.3 ตาราง 7 คีย์ลัดจำเป็น (Figma Shortcut Cheatsheet)</h3>
                <button onclick="copyToClipboard('V: Move\nF: Frame\nR: Rectangle\nO: Ellipse\nT: Text\nSpace+Drag: Pan Canvas\nAlt+Drag: Duplicate\nShift+A: Auto Layout\nCtrl+R: Rename Layer', this)" class="text-xs text-[#065FD4] font-medium hover:underline flex items-center gap-1">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
                  <span>คัดลอกคีย์ลัดทั้งหมด</span>
                </button>
              </div>
              <p class="text-xs text-[#606060] mb-3">ช่วยให้การวาดหน้าจอรวดเร็วกว่าการใช้เมาส์คลิกหาเมนูถึง 3 เท่าตัว:</p>

              <div class="overflow-x-auto border border-[#E5E5E5] rounded-xl">
                <table class="w-full text-left text-xs border-collapse">
                  <thead class="bg-[#F8F8F8] border-b border-[#E5E5E5] text-[#0F0F0F]">
                    <tr>
                      <th class="p-3 font-bold text-center w-24">ปุ่มคีย์ลัด</th>
                      <th class="p-3 font-bold">ชื่อเครื่องมือ / คำสั่ง</th>
                      <th class="p-3 font-bold">วัตถุประสงค์ในการทำ Wireframe</th>
                      <th class="p-3 font-bold w-24 text-center">ปฏิบัติการ</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[#E5E5E5] text-[#606060]">
                    <tr>
                      <td class="p-3 text-center"><kbd class="px-2 py-1 bg-zinc-100 border border-zinc-300 rounded font-mono font-bold text-[#0F0F0F]">V</kbd></td>
                      <td class="p-3 font-bold text-[#0F0F0F]">Move Tool</td>
                      <td class="p-3">เครื่องมือลูกศรพื้นฐาน ใช้คลิกเลือกวัตถุ ขยับ ย้ายตำแหน่ง หรือคลิกดับเบิลคลิกเพื่อเข้าสู่เลเยอร์ข้างใน</td>
                      <td class="p-3 text-center"><button onclick="copyToClipboard('V', this)" class="text-[11px] text-[#065FD4] hover:underline">คัดลอก</button></td>
                    </tr>
                    <tr class="bg-red-50/30">
                      <td class="p-3 text-center"><kbd class="px-2 py-1 bg-red-100 border border-red-300 rounded font-mono font-bold text-[#FF0000]">F</kbd></td>
                      <td class="p-3 font-bold text-[#FF0000]">Frame Tool</td>
                      <td class="p-3 text-[#0F0F0F]">คลิกเพื่อเลือกโมเดลโทรศัพท์ (เช่น iPhone 14/15 ขนาด 390x844 px) สร้างขอบเขตหน้าจอ</td>
                      <td class="p-3 text-center"><button onclick="copyToClipboard('F', this)" class="text-[11px] text-[#065FD4] hover:underline">คัดลอก</button></td>
                    </tr>
                    <tr>
                      <td class="p-3 text-center"><kbd class="px-2 py-1 bg-zinc-100 border border-zinc-300 rounded font-mono font-bold text-[#0F0F0F]">R</kbd></td>
                      <td class="p-3 font-bold text-[#0F0F0F]">Rectangle Tool</td>
                      <td class="p-3">สร้างกล่องสี่เหลี่ยม ใช้แทนพื้นที่รูปภาพ (Placeholder), การ์ดสินค้า, ช่องกรอก หรือปุ่มกด</td>
                      <td class="p-3 text-center"><button onclick="copyToClipboard('R', this)" class="text-[11px] text-[#065FD4] hover:underline">คัดลอก</button></td>
                    </tr>
                    <tr>
                      <td class="p-3 text-center"><kbd class="px-2 py-1 bg-zinc-100 border border-zinc-300 rounded font-mono font-bold text-[#0F0F0F]">O</kbd></td>
                      <td class="p-3 font-bold text-[#0F0F0F]">Ellipse Tool</td>
                      <td class="p-3">สร้างวงกลม ใช้แทนรูปประจำตัวผู้ใช้งาน (Avatar Profile), ปุ่มสเตตัส, หรือ Radio Button</td>
                      <td class="p-3 text-center"><button onclick="copyToClipboard('O', this)" class="text-[11px] text-[#065FD4] hover:underline">คัดลอก</button></td>
                    </tr>
                    <tr>
                      <td class="p-3 text-center"><kbd class="px-2 py-1 bg-zinc-100 border border-zinc-300 rounded font-mono font-bold text-[#0F0F0F]">T</kbd></td>
                      <td class="p-3 font-bold text-[#0F0F0F]">Text Tool</td>
                      <td class="p-3">พิมพ์ข้อความระบุชื่อหน้าจอ, ชื่อสินค้า, ป้ายกำกับช่องกรอก หรือราคา</td>
                      <td class="p-3 text-center"><button onclick="copyToClipboard('T', this)" class="text-[11px] text-[#065FD4] hover:underline">คัดลอก</button></td>
                    </tr>
                    <tr>
                      <td class="p-3 text-center"><kbd class="px-1.5 py-1 bg-zinc-100 border border-zinc-300 rounded font-mono font-bold text-[#0F0F0F]">Space</kbd> + ลาก</td>
                      <td class="p-3 font-bold text-[#0F0F0F]">Hand Tool (Pan)</td>
                      <td class="p-3">กด Spacebar ค้างไว้แล้วคลิกลากเมาส์ เพื่อเลื่อนไปมาระหว่างหน้าจอได้อย่างลื่นไหลโดยไม่เผลอเลื่อนวัตถุ</td>
                      <td class="p-3 text-center"><button onclick="copyToClipboard('Spacebar + Drag', this)" class="text-[11px] text-[#065FD4] hover:underline">คัดลอก</button></td>
                    </tr>
                    <tr class="bg-blue-50/30">
                      <td class="p-3 text-center"><kbd class="px-1.5 py-1 bg-blue-100 border border-blue-300 rounded font-mono font-bold text-[#065FD4]">Alt</kbd> + ลาก</td>
                      <td class="p-3 font-bold text-[#065FD4]">Duplicate Object</td>
                      <td class="p-3 text-[#0F0F0F]">กดปุ่ม Alt (Windows) หรือ Option (Mac) ค้างไว้ แล้วคลิกลากวัตถุ เพื่อสำเนาชิ้นส่วนออกมาทันที</td>
                      <td class="p-3 text-center"><button onclick="copyToClipboard('Alt + Drag', this)" class="text-[11px] text-[#065FD4] hover:underline">คัดลอก</button></td>
                    </tr>
                    <tr>
                      <td class="p-3 text-center"><kbd class="px-1.5 py-1 bg-zinc-100 border border-zinc-300 rounded font-mono font-bold text-[#0F0F0F]">Shift</kbd> + <kbd class="px-1.5 py-1 bg-zinc-100 border border-zinc-300 rounded font-mono font-bold text-[#0F0F0F]">A</kbd></td>
                      <td class="p-3 font-bold text-[#0F0F0F]">Auto Layout</td>
                      <td class="p-3">สร้างกล่องคอนเทนเนอร์ที่จัดระยะห่าง (Gap) และระยะขอบ (Padding) อัตโนมัติเมื่อเนื้อหาเพิ่ม-ลด</td>
                      <td class="p-3 text-center"><button onclick="copyToClipboard('Shift + A', this)" class="text-[11px] text-[#065FD4] hover:underline">คัดลอก</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- 2.4 แนวคิด Frame vs Artboard -->
            <div class="p-4 rounded-xl bg-[#F8F8F8] border-l-4 border-[#0F0F0F] text-sm text-[#0F0F0F] space-y-2">
              <div class="font-bold text-[#0F0F0F] flex items-center gap-2">
                <span class="px-2 py-0.5 rounded bg-black text-white text-[10px] font-mono">GLOSSARY NOTICE</span>
                <span>ทำไม Figma จึงใช้คำว่า "Frame" ไม่ใช้คำว่า "Artboard"?</span>
              </div>
              <p class="text-xs text-[#606060] leading-relaxed">
                ตามพจนานุกรมคำศัพท์มาตรฐานประจำหลักสูตร (GLOSSARY.md): <strong>Frame</strong> ไม่ใช่เพียงกระดาษวาดรูปว่างเปล่าเหมือน Artboard ในซอฟต์แวร์กราฟิกดั้งเดิม แต่ Frame ใน Figma ทำหน้าที่เป็น <strong>"คอนเทนเนอร์จำลองหน้าจออุปกรณ์ที่มีมิติและพฤติกรรมโค้ดจริง"</strong> Frame สามารถซ้อนอยู่ภายใน Frame อื่น ๆ ได้ (Nested Frames), สามารถเปิดใช้ฟังก์ชันตัดส่วนเกิน (Clip Content), และสามารถเปิดใช้งาน Auto Layout เพื่อให้เลย์เอาต์ยืดหดตามสรีระของหน้าจอมือถือจริง
              </p>
            </div>
          </div>
        </article>

        <!-- ───────────────────────────────────────────────────────────── -->
        <!-- SECTION 3: ปฏิบัติการสร้าง Mobile Frame & กายวิภาค 3 โซน -->
        <!-- ───────────────────────────────────────────────────────────── -->
        <article id="mobile-anatomy" class="lesson-section scroll-mt-20">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF0000] mb-1">
            <span>หัวข้อที่ 3</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold text-[#0F0F0F] tracking-tight mb-4">
            ปฏิบัติการสร้าง Mobile Frame และกายวิภาค 3 โซนของหน้าจอมือถือ
          </h2>

          <div class="prose text-[#0F0F0F] leading-relaxed space-y-4 text-base">
            <h3 class="text-lg font-bold text-[#0F0F0F]">3.1 การสร้าง Frame หน้าจอมือถือมาตรฐาน (390 x 844 พิกเซล)</h3>
            <p>
              ในอุตสาหกรรมการพัฒนาโมบายล์แอปพลิเคชันยุคปัจจุบัน ขนาดหน้าจอที่นิยมใช้เป็นขนาดตั้งต้นมาตรฐาน (Base Viewport Dimension) มากที่สุดคือ <strong>390 x 844 พิกเซล</strong> ซึ่งเทียบเท่ากับหน้าจอ iPhone 13, 14 และ 15 (และใกล้เคียงกับมาตรฐาน Android Large ทั่วไป) ขนาดนี้มีอัตราส่วนสายตา (Aspect Ratio ~19.5:9) ที่เหมาะสมที่สุดในการจัดสรรพื้นที่หน้าจอ
            </p>

            <div class="flex items-center gap-3 bg-[#F8F8F8] p-3 rounded-xl border border-[#E5E5E5]">
              <span class="text-xs text-[#606060]">มิติหน้าจอมาตรฐาน:</span>
              <code class="px-2.5 py-1 bg-white border border-[#CCCCCC] rounded text-sm font-bold text-[#FF0000] font-mono">W: 390 px  |  H: 844 px</code>
              <button onclick="copyToClipboard('390x844', this)" class="ml-auto px-3 py-1 bg-[#0F0F0F] text-white rounded text-xs hover:bg-black transition">คัดลอกขนาด 390x844</button>
            </div>

            <!-- 3.2 กายวิภาค 3 โซน -->
            <h3 class="text-lg font-bold text-[#0F0F0F] pt-4">3.2 โครงสร้างกายวิภาค 3 โซนของแอปพลิเคชันมือถือ (The 3 Anatomy Zones)</h3>
            <p>
              ไม่ว่าจะเป็นแอปพลิเคชันรูปแบบใด หน้าจอมือถือจะถูกแบ่งโซนการใช้งานออกเป็น 3 ส่วนหลักตามสรีรศาสตร์เสมอ:
            </p>

            <div class="space-y-4 my-4">
              <!-- โซน 1 -->
              <div class="p-4 rounded-xl border border-[#E5E5E5] bg-white flex items-start gap-3">
                <div class="w-10 h-10 rounded-lg bg-zinc-100 flex flex-col items-center justify-center font-bold text-xs text-[#FF0000] shrink-0 border border-zinc-200">
                  <span>TOP</span>
                  <span class="text-[9px] text-[#606060]">ZONE</span>
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <h4 class="font-bold text-sm text-[#0F0F0F]">โซนที่ 1: Top Navigation / Header Area</h4>
                    <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-[#606060]">ความสูงคงที่: 56 - 64 px</span>
                  </div>
                  <p class="text-xs text-[#606060] mt-1 leading-relaxed">
                    วางไว้บนสุดของหน้าจอ ประกอบด้วยปุ่มย้อนกลับ <code>[←]</code> หรือปุ่มเมนูแฮมเบอร์เกอร์ <code>[≡]</code>, ป้ายชื่อหน้าจอปัจจุบัน, และไอคอนทางลัดเร่งด่วน เช่น ปุ่มค้นหา หรือกระดิ่งแจ้งเตือน
                  </p>
                </div>
              </div>

              <!-- โซน 2 -->
              <div class="p-4 rounded-xl border border-[#E5E5E5] bg-white flex items-start gap-3">
                <div class="w-10 h-10 rounded-lg bg-zinc-100 flex flex-col items-center justify-center font-bold text-xs text-[#065FD4] shrink-0 border border-zinc-200">
                  <span>MID</span>
                  <span class="text-[9px] text-[#606060]">ZONE</span>
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <h4 class="font-bold text-sm text-[#0F0F0F]">โซนที่ 2: Main Scrollable Content Area</h4>
                    <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-[#606060]">ความสูงยืดหยุ่น: 700+ px</span>
                  </div>
                  <p class="text-xs text-[#606060] mt-1 leading-relaxed">
                    เป็นพื้นที่เลื่อนขึ้นลงได้ (Scroll View) รวบรวมองค์ประกอบเนื้อหาทั้งหมด เช่น ชิปเลือกหมวดหมู่, การ์ดแสดงรายการสินค้า/บริการ, รายละเอียดข้อกำหนด, และฟอร์มกรอกข้อมูล
                  </p>
                </div>
              </div>

              <!-- โซน 3 -->
              <div class="p-4 rounded-xl border border-[#E5E5E5] bg-white flex items-start gap-3">
                <div class="w-10 h-10 rounded-lg bg-zinc-100 flex flex-col items-center justify-center font-bold text-xs text-[#2BA640] shrink-0 border border-zinc-200">
                  <span>BTM</span>
                  <span class="text-[9px] text-[#606060]">ZONE</span>
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <h4 class="font-bold text-sm text-[#0F0F0F]">โซนที่ 3: Bottom Navigation / Sticky Action Bar</h4>
                    <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-[#606060]">ความสูงคงที่: 64 - 80 px</span>
                  </div>
                  <p class="text-xs text-[#606060] mt-1 leading-relaxed">
                    อยู่ในตำแหน่ง <strong>Thumb Zone</strong> ที่นิ้วโป้งของผู้ใช้กดได้ง่ายที่สุดโดยไม่ต้องเอื้อมมือ นิยมวางแถบเมนูหลัก (Bottom Tab Bar 3-4 ปุ่ม) หรือปุ่มกดสำคัญสูงสุดของหน้านั้น เช่น <strong>"เพิ่มลงตะกร้า"</strong> หรือ <strong>"ยืนยันสั่งซื้อ"</strong>
                  </p>
                </div>
              </div>
            </div>

            <!-- 3.3 ทฤษฎี Thumb Zone -->
            <h3 class="text-lg font-bold text-[#0F0F0F] pt-4">3.3 ทฤษฎีพื้นที่สัมผัสของนิ้วโป้ง (The Mobile Thumb Zone Theory)</h3>
            <p>
              งานวิจัยด้านการออกแบบพฤติกรรมผู้ใช้สมาร์ตโฟนของ Steven Hoober ระบุว่า ผู้ใช้งานกว่า <strong>75% ควบคุมโทรศัพท์มือถือด้วยนิ้วโป้งเพียงนิ้วเดียว</strong> (One-handed thumb operation) ดังนั้นการจัดวางตำแหน่งปุ่มจึงส่งผลต่ออัตราความสำเร็จของแอปโดยตรง:
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4 text-xs">
              <div class="p-3 bg-green-50 border border-green-200 rounded-xl">
                <div class="font-bold text-[#2BA640] mb-1">🟢 Natural Zone (กดสบายสุด)</div>
                <p class="text-zinc-700 leading-relaxed">พื้นที่ครึ่งล่างของหน้าจอ นิ้วโป้งกวาดถึงได้เป็นธรรมชาติ เหมาะอย่างยิ่งสำหรับปุ่ม Call-to-Action (CTA), ปุ่มกดซื้อ, และเมนูนำทางหลัก</p>
              </div>
              <div class="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                <div class="font-bold text-amber-700 mb-1">🟡 Stretch Zone (ต้องเอื้อมนิ้ว)</div>
                <p class="text-zinc-700 leading-relaxed">พื้นที่กึ่งกลางจอ นิ้วโป้งเอื้อมถึงแต่ต้องขยับฝ่ามือเล็กน้อย เหมาะสำหรับเนื้อหาอ่าน หรือการ์ดรายการสินค้าที่ผู้ใช้เลื่อนดู</p>
              </div>
              <div class="p-3 bg-red-50 border border-red-200 rounded-xl">
                <div class="font-bold text-[#FF0000] mb-1">🔴 Hard to Reach Zone (เอื้อมยาก)</div>
                <p class="text-zinc-700 leading-relaxed">พื้นที่มุมบนซ้ายและมุมบนขวา นิ้วโป้งเอื้อมไม่ถึงเว้นแต่จะใช้สองมือ เหมาะสำหรับปุ่มย้อนกลับ <code>[←]</code> หรือปุ่มลบข้อมูล เพื่อป้องกันการกดพลาดโดยไม่ได้ตั้งใจ</p>
              </div>
            </div>

            <!-- 3.4 Wireframe UI Kit -->
            <h3 class="text-lg font-bold text-[#0F0F0F] pt-4">3.4 ชุดสัญลักษณ์มาตรฐานของ Wireframe (Wireframe UI Kit)</h3>
            <p>เมื่อไม่มีรูปภาพจริงและไม่มีสีสัน เราต้องใช้ภาษาภาพสากลเพื่อสื่อสารกับเพื่อนร่วมทีมและโปรแกรมเมอร์:</p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
              <div class="p-3.5 border border-[#E5E5E5] rounded-xl bg-white flex items-center gap-3">
                <div class="w-14 h-14 rounded-lg wireframe-img-box shrink-0"></div>
                <div class="text-xs">
                  <div class="font-bold text-[#0F0F0F]">1. กล่องรูปภาพ (Image Placeholder)</div>
                  <div class="text-[#606060] mt-0.5">กล่องสี่เหลี่ยมสีเทาอ่อน #F2F2F2 พร้อมเส้นทแยงมุมไขว้เป็นรูปกากบาท แทนพื้นที่ใส่รูปถ่ายสินค้าจริง</div>
                </div>
              </div>

              <div class="p-3.5 border border-[#E5E5E5] rounded-xl bg-white flex items-center gap-3">
                <div class="w-14 h-14 rounded-lg bg-zinc-50 border border-[#E5E5E5] p-2 flex flex-col justify-center gap-1.5 shrink-0">
                  <div class="h-2 w-full bg-zinc-400 rounded"></div>
                  <div class="h-1.5 w-3/4 bg-zinc-300 rounded"></div>
                  <div class="h-1.5 w-1/2 bg-zinc-200 rounded"></div>
                </div>
                <div class="text-xs">
                  <div class="font-bold text-[#0F0F0F]">2. ข้อความจำลอง (Text Skeleton)</div>
                  <div class="text-[#606060] mt-0.5">แท่งสี่เหลี่ยมแนวนอนสีเทาเข้มแทนชื่อหัวข้อ และเส้นแนวนอนหนา 2-3px แทนคำอธิบายรายละเอียด</div>
                </div>
              </div>

              <div class="p-3.5 border border-[#E5E5E5] rounded-xl bg-white flex items-center gap-3">
                <div class="w-14 h-14 rounded-lg bg-zinc-50 border border-[#E5E5E5] flex items-center justify-center p-2 shrink-0">
                  <div class="w-full py-1.5 bg-[#0F0F0F] text-white text-[9px] font-bold text-center rounded">ปุ่มกด</div>
                </div>
                <div class="text-xs">
                  <div class="font-bold text-[#0F0F0F]">3. ปุ่มกดหลัก (Primary Button)</div>
                  <div class="text-[#606060] mt-0.5">ปุ่มพื้นดำทึบ #0F0F0F ตัวหนังสือขาว สูงอย่างน้อย 44-48px ตามมาตรฐานขนาดปลายนิ้วสัมผัส (Minimum Tap Target)</div>
                </div>
              </div>

              <div class="p-3.5 border border-[#E5E5E5] rounded-xl bg-white flex items-center gap-3">
                <div class="w-14 h-14 rounded-lg bg-zinc-50 border border-[#E5E5E5] flex items-center justify-center p-2 shrink-0">
                  <div class="w-full py-1 px-1.5 bg-white border border-[#CCCCCC] rounded text-[8px] text-zinc-400">ค้นหา...</div>
                </div>
                <div class="text-xs">
                  <div class="font-bold text-[#0F0F0F]">4. ช่องกรอกข้อมูล (Input Field)</div>
                  <div class="text-[#606060] mt-0.5">กล่องขาวขอบเทากลาง #CCCCCC มีข้อความตัวอย่างจาง ๆ อยู่ข้างใน พร้อมความสูง 40-44px</div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <!-- ───────────────────────────────────────────────────────────── -->
        <!-- SECTION 4: เจาะลึก 3 รูปแบบธุรกิจ (TRI-ARCHETYPE SWITCHER) -->
        <!-- ───────────────────────────────────────────────────────────── -->
        <article id="archetypes" class="lesson-section scroll-mt-20">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF0000] mb-1">
            <span>หัวข้อที่ 4 • โมเดลธุรกิจอ้างอิง</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold text-[#0F0F0F] tracking-tight mb-2">
            เจาะลึก 3 รูปแบบธุรกิจ (Tri-Archetype Comparison)
          </h2>
          <p class="text-sm text-[#606060] mb-6">
            เลือกศึกษารูปแบบโครงสร้างหน้าจอ 4 ขั้นตอนที่ตรงกับโจทย์โปรเจกต์ของกลุ่มตนเอง:
          </p>

          <!-- ตัวสลับ 3 แท็บ Archetype Switcher -->
          <div class="flex items-center bg-[#F2F2F2] rounded-xl p-1 border border-[#E5E5E5] mb-6">
            <button id="tabArch1" onclick="switchArchetype(1)" class="flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition bg-white text-[#0F0F0F] elevation-1 flex items-center justify-center gap-2">
              <span>☕</span>
              <span>1. Retail & Ordering (Fresh Brew)</span>
            </button>
            <button id="tabArch2" onclick="switchArchetype(2)" class="flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition text-[#606060] hover:text-[#0F0F0F] flex items-center justify-center gap-2">
              <span>🐾</span>
              <span>2. Service & Booking (Happy Paws)</span>
            </button>
            <button id="tabArch3" onclick="switchArchetype(3)" class="flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition text-[#606060] hover:text-[#0F0F0F] flex items-center justify-center gap-2">
              <span>📦</span>
              <span>3. Asset & Operations (Smart Borrow)</span>
            </button>
          </div>

          <!-- กล่องเนื้อหา Archetype 1: Fresh Brew -->
          <div id="archContent1" class="archetype-box block space-y-6">
            <div class="border border-[#E5E5E5] rounded-2xl p-6 bg-white space-y-5">
              <div class="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5E5E5] pb-3">
                <div>
                  <span class="px-2.5 py-1 rounded bg-red-50 text-[#FF0000] font-bold text-xs uppercase border border-red-200">
                    RETAIL & ORDERING ARCHETYPE
                  </span>
                  <h3 class="text-xl font-bold text-[#0F0F0F] mt-1.5">ร้านกาแฟและชานม Fresh Brew</h3>
                </div>
                <div class="text-xs text-[#606060]">เป้าหมาย: สั่งล่วงหน้า รับของใน 1 นาที ไม่ต้องยืนรอคิว</div>
              </div>

              <p class="text-xs text-[#606060] leading-relaxed">
                เหมาะสำหรับธุรกิจจำหน่ายสินค้าที่มีแคตตาล็อก เช่น ร้านชานมไข่มุก, ร้านเบเกอรี, ร้านอาหารตามสั่ง, ร้านของชำชุมชน หรือร้านเสื้อผ้าแฟชั่น เน้นการเลือกสินค้า ค้นหา ดูภาพประกอบ ปรับแต่งตัวเลือก (เช่น หวาน 50%, เพิ่มไข่มุก) คำนวณยอดเงิน และออกใบเสร็จ
              </p>

              <!-- Flow 4 หน้าจอของ Fresh Brew -->
              <div class="space-y-2">
                <div class="text-xs font-bold text-[#0F0F0F] uppercase tracking-wider">เส้นทางการทำงาน 4 หน้าจอ (User Flow 4 Screens):</div>
                <div class="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                  <div class="p-3 bg-[#F8F8F8] rounded-xl border border-[#E5E5E5]">
                    <div class="font-bold text-[#0F0F0F]">1. Catalog Screen</div>
                    <div class="text-[11px] text-[#606060] mt-1">ช่องค้นหา, ชิปหมวดหมู่แนวนอน, ตารางการ์ดสินค้า 2 คอลัมน์พร้อมรูปและราคา</div>
                  </div>
                  <div class="p-3 bg-[#F8F8F8] rounded-xl border border-[#E5E5E5]">
                    <div class="font-bold text-[#0F0F0F]">2. Detail & Options</div>
                    <div class="text-[11px] text-[#606060] mt-1">รูปสินค้าใหญ่ 16:9, Radio button เลือกระดับความหวาน, Checkbox เลือกท็อปปิ้ง</div>
                  </div>
                  <div class="p-3 bg-[#F8F8F8] rounded-xl border border-[#E5E5E5]">
                    <div class="font-bold text-[#0F0F0F]">3. Cart & Checkout</div>
                    <div class="text-[11px] text-[#606060] mt-1">สรุปรายการพร้อมปุ่ม +/- ปรับจำนวน, สรุปยอดเงินรวม, วิธีการชำระเงิน</div>
                  </div>
                  <div class="p-3 bg-[#F8F8F8] rounded-xl border border-[#E5E5E5]">
                    <div class="font-bold text-[#0F0F0F]">4. Order Success</div>
                    <div class="text-[11px] text-[#606060] mt-1">ไอคอนสำเร็จตัวใหญ่, หมายเลขคำสั่งซื้อ #TB-8821, สถานะกำลังชง, ปุ่มกลับหน้าหลัก</div>
                  </div>
                </div>
              </div>

              <!-- ASCII Diagram ของ Fresh Brew -->
              <div class="font-mono text-xs overflow-x-auto bg-[#F8F8F8] p-4 rounded-xl border border-[#E5E5E5]">
<pre class="text-[#0F0F0F]">
[1. Catalog]                [2. Detail]                 [3. Cart]                   [4. Confirmation]
┌─────────────────────────┐  ┌─────────────────────────┐  ┌─────────────────────────┐  ┌─────────────────────────┐
│ [=] Fresh Brew      [🛒]│  │ [← ย้อนกลับ]            │  │ [←] ตะกร้าสินค้า        │  │                         │
│ ┌─────────────────────┐ │  │ ┌─────────────────────┐ │  │ รายการสินค้า (2 รายการ)  │  │         ( ✔ )           │
│ │ 🔍 ค้นหาเครื่องดื่ม... │ │  │ │ ╲               ╱ │ │  │ ┌─────────────────────┐ │  │      สั่งซื้อสำเร็จ!     │
│ └─────────────────────┘ │  │ │   รูปสินค้าใหญ่     │ │  │ │ [IMG] ชานมไต้หวัน   │ │  │                         │
│ [ทั้งหมด] [ชา] [กาแฟ]    │  │ └─────────────────────┘ │  │ │  หวาน 50%  x2  ฿110  │ │  │ รหัสคำสั่งซื้อ: #TB-8821│
│ ┌─────────┐ ┌─────────┐ │  │ ชานมไต้หวันบราวชูการ์   │ │  │ └─────────────────────┘ │  │ ┌─────────────────────┐ │
│ │ [IMG]   │ │ [IMG]   │ │  │ ฿55.00                │ │  │ ┌─────────────────────┐ │  │ │ สรุปยอด: ฿150.00     │ │
│ │ ชานม    │ │ ชาเขียว │ │  │ ระดับความหวาน:         │ │  │ │ [IMG] ขนมปังปิ้งเนย │ │  │ │ สแกน QR หน้าร้าน     │ │
│ │ ฿55     │ │ ฿60     │ │  │ ( ) 100%  (•) 50%  ( )0%│ │  │ └─────────────────────┘ │  │ └─────────────────────┘ │
│ └─────────┘ └─────────┘ │  │ ┌─────────────────────┐ │  │ ยอดรวม: ฿150.00         │  │ ┌─────────────────────┐ │
│ [🏠หน้าแรก] [📋ออร์เดอร์] │  │ │ [ + เพิ่มลงตะกร้า ]  │ │  │ ┌─────────────────────┐ │  │ │  [ กลับสู่หน้าหลัก ]  │ │
│ └─────────────────────┘ │  │ └─────────────────────┘ │  │ │   [ ยืนยันสั่งซื้อ ]  │ │  │ └─────────────────────┘ │
└─────────────────────────┘  └─────────────────────────┘  └─────────────────────────┘  └─────────────────────────┘</pre>
              </div>
            </div>
          </div>

          <!-- กล่องเนื้อหา Archetype 2: Happy Paws -->
          <div id="archContent2" class="archetype-box hidden space-y-6">
            <div class="border border-[#E5E5E5] rounded-2xl p-6 bg-white space-y-5">
              <div class="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5E5E5] pb-3">
                <div>
                  <span class="px-2.5 py-1 rounded bg-blue-50 text-[#065FD4] font-bold text-xs uppercase border border-blue-200">
                    SERVICE & BOOKING ARCHETYPE
                  </span>
                  <h3 class="text-xl font-bold text-[#0F0F0F] mt-1.5">คลินิกและกรูมมิ่ง Happy Paws Care</h3>
                </div>
                <div class="text-xs text-[#606060]">เป้าหมาย: จองคิวนัดหมายออนไลน์ ไม่ต้องพาสัตว์เลี้ยงมานั่งรอแออัด</div>
              </div>

              <p class="text-xs text-[#606060] leading-relaxed">
                เหมาะสำหรับธุรกิจให้บริการและนัดหมายเวลา เช่น คลินิกสัตว์เลี้ยง, ร้านตัดผมเสริมสวย, สปา, อู่ซ่อมรถยนต์, คลินิกทันตกรรม หรือสตูดิโอซ้อมดนตรี เน้นการเลือกประเภทบริการ, ปฏิทินเลือกวันและรอบเวลา (Time Slots) ที่ยังว่างอยู่, แบบฟอร์มข้อมูลลูกค้า และการออกบัตรนัดหมาย
              </p>

              <!-- Flow 4 หน้าจอของ Happy Paws -->
              <div class="space-y-2">
                <div class="text-xs font-bold text-[#0F0F0F] uppercase tracking-wider">เส้นทางการทำงาน 4 หน้าจอ (User Flow 4 Screens):</div>
                <div class="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                  <div class="p-3 bg-[#F8F8F8] rounded-xl border border-[#E5E5E5]">
                    <div class="font-bold text-[#0F0F0F]">1. Service List</div>
                    <div class="text-[11px] text-[#606060] mt-1">การ์ดบริการเด่น (อาบน้ำ/ตัดขน, ฉีดวัคซีน), ระยะเวลาบริการ (นาที), ราคาเริ่มต้น</div>
                  </div>
                  <div class="p-3 bg-[#F8F8F8] rounded-xl border border-[#E5E5E5]">
                    <div class="font-bold text-[#0F0F0F]">2. Date & Time Slots</div>
                    <div class="text-[11px] text-[#606060] mt-1">ปฏิทินแบบ Mini Month View, ปุ่มชิปรอบเวลาแสดงสถานะ [ว่าง] และ [เต็ม]</div>
                  </div>
                  <div class="p-3 bg-[#F8F8F8] rounded-xl border border-[#E5E5E5]">
                    <div class="font-bold text-[#0F0F0F]">3. Customer Form</div>
                    <div class="text-[11px] text-[#606060] mt-1">ฟอร์มกรอกชื่อน้องหมา/แมว, สายพันธุ์, เบอร์โทรเจ้าของ, หมายเหตุอาการ</div>
                  </div>
                  <div class="p-3 bg-[#F8F8F8] rounded-xl border border-[#E5E5E5]">
                    <div class="font-bold text-[#0F0F0F]">4. Booking Pass</div>
                    <div class="text-[11px] text-[#606060] mt-1">บัตรคิวนัดหมายดิจิทัล #Q-014, วันเวลานัด, ชื่อช่างผู้ดูแล, ปุ่มบันทึกลงปฏิทิน</div>
                  </div>
                </div>
              </div>

              <!-- ASCII Diagram ของ Happy Paws -->
              <div class="font-mono text-xs overflow-x-auto bg-[#F8F8F8] p-4 rounded-xl border border-[#E5E5E5]">
<pre class="text-[#0F0F0F]">
[1. Service List]           [2. Date & Slots]           [3. Customer Form]          [4. Booking Pass]
┌─────────────────────────┐  ┌─────────────────────────┐  ┌─────────────────────────┐  ┌─────────────────────────┐
│ [=] Happy Paws Care [🔔]│  │ [←] เลือกวันและเวลา     │  │ [←] ข้อมูลผู้รับบริการ  │  │                         │
│ ┌─────────────────────┐ │  │ บริการ: อาบน้ำตัดขน     │  │ สรุปการจอง: อาบน้ำตัดขน │  │      ( นัดหมายสำเร็จ )   │
│ │ 📅 คิวว่างวันนี้: 4 คิว│ │  │ ┌─────────────────────┐ │  │ วันที่ 24 ต.ค. เวลา 13:00│  │                         │
│ └─────────────────────┘ │  │ │ [ < ] ต.ค. 2026 [ > ] │ │  │ ─────────────────────── │  │ บัตรคิวที่: #Q-014     │
│ ┌─────────────────────┐ │  │ │ จ  อ  พ  พฤ  ศ  ส  อา │ │  │ ชื่อสัตว์เลี้ยง:          │  │ ┌─────────────────────┐ │
│ │ [IMG] อาบน้ำ-ตัดขน   │ │  │ │    [24] 25 26 27 28 29 │ │  │ [ น้องมอมแมม          ]│  │ │ คลินิก Happy Paws   │ │
│ │ สุนัข/แมว  ฿350-500 │ │  │ └─────────────────────┘ │  │ เบอร์โทรเจ้าของ:        │  │ │ วันที่: 24 ต.ค. 2026 │ │
│ └─────────────────────┘ │  │ รอบเวลาที่ว่าง:        │  │ [ 081-234-5678        ]│  │ │ เวลา: 13:00 - 14:30  │ │
│ ┌─────────────────────┐ │  │ ┌──────┐ ┌──────┐       │  │ ┌─────────────────────┐ │  │ └─────────────────────┘ │
│ │ [IMG] ฉีดวัคซีนรวม   │ │  │ │ 10:00│ │(11:30)เต็ม   │  │ │   [ ยืนยันการจองคิว ] │ │  │ กรุณามาถึงก่อนเวลา 10 น.│
│ │ ฿450                │ │  │ └──────┘ └──────┘       │  │ └─────────────────────┘ │  │ ┌─────────────────────┐ │
│ └─────────────────────┘ │  │ ┌─────────────────────┐ │  │                         │  │ │  [ บันทึกบัตรนัด ]   │ │
│ [🏠หน้าหลัก] [📅คิวของฉัน]│  │ │ [ ถัดไป: กรอกข้อมูล ] │ │  │                         │  │ └─────────────────────┘ │
└─────────────────────────┘  └─────────────────────────┘  └─────────────────────────┘  └─────────────────────────┘</pre>
              </div>
            </div>
          </div>

          <!-- กล่องเนื้อหา Archetype 3: Smart Borrow -->
          <div id="archContent3" class="archetype-box hidden space-y-6">
            <div class="border border-[#E5E5E5] rounded-2xl p-6 bg-white space-y-5">
              <div class="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5E5E5] pb-3">
                <div>
                  <span class="px-2.5 py-1 rounded bg-green-50 text-[#2BA640] font-bold text-xs uppercase border border-green-200">
                    ASSET & OPERATIONS ARCHETYPE
                  </span>
                  <h3 class="text-xl font-bold text-[#0F0F0F] mt-1.5">ระบบยืม-คืนพัสดุครุภัณฑ์ Smart Borrow</h3>
                </div>
                <div class="text-xs text-[#606060]">เป้าหมาย: ตรวจสอบสถานะอุปกรณ์ สแกนยืม-คืน และมีลายเซ็นรับผิดชอบ 100%</div>
              </div>

              <p class="text-xs text-[#606060] leading-relaxed">
                เหมาะสำหรับการบริหารจัดการภายในองค์กร เช่น ยืม-คืนอุปกรณ์กล้อง/โสตทัศนูปกรณ์แผนกวิชา, เบิกจ่ายเครื่องมือช่างในโรงประลอง, คลังเวชภัณฑ์ห้องพยาบาล หรือห้องสมุด เน้นการระบุรหัสครุภัณฑ์ (Asset ID), ตำแหน่งตู้จัดเก็บ, เงื่อนไขสภาพอุปกรณ์, การกำหนดวันส่งคืน และช่องเซ็นชื่อลายมือชื่อดิจิทัล
              </p>

              <!-- Flow 4 หน้าจอของ Smart Borrow -->
              <div class="space-y-2">
                <div class="text-xs font-bold text-[#0F0F0F] uppercase tracking-wider">เส้นทางการทำงาน 4 หน้าจอ (User Flow 4 Screens):</div>
                <div class="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                  <div class="p-3 bg-[#F8F8F8] rounded-xl border border-[#E5E5E5]">
                    <div class="font-bold text-[#0F0F0F]">1. Asset Catalog</div>
                    <div class="text-[11px] text-[#606060] mt-1">ปุ่มใหญ่สแกนบาร์โค้ดหาอุปกรณ์, ฟิลเตอร์สถานะ [ทั้งหมด] [ว่าง] [ถูกยืม], รายการครุภัณฑ์</div>
                  </div>
                  <div class="p-3 bg-[#F8F8F8] rounded-xl border border-[#E5E5E5]">
                    <div class="font-bold text-[#0F0F0F]">2. Specification</div>
                    <div class="text-[11px] text-[#606060] mt-1">รหัสพัสดุ #CAM-SONY-04, ตำแหน่งตู้เก็บ B2, รายการอุปกรณ์ส่วนควบในเซ็ต</div>
                  </div>
                  <div class="p-3 bg-[#F8F8F8] rounded-xl border border-[#E5E5E5]">
                    <div class="font-bold text-[#0F0F0F]">3. Borrow Form</div>
                    <div class="text-[11px] text-[#606060] mt-1">กำหนดวันส่งคืน, วัตถุประสงค์การใช้งาน, กรอบพื้นที่เซ็นลายมือชื่อดิจิทัล (Sign Pad)</div>
                  </div>
                  <div class="p-3 bg-[#F8F8F8] rounded-xl border border-[#E5E5E5]">
                    <div class="font-bold text-[#0F0F0F]">4. Borrow Receipt</div>
                    <div class="text-[11px] text-[#606060] mt-1">QR Code สำหรับเจ้าหน้าที่สแกนรับของคืน, สรุปใบยืม #BR-2026-092, ปุ่มดาวน์โหลด PDF</div>
                  </div>
                </div>
              </div>

              <!-- ASCII Diagram ของ Smart Borrow -->
              <div class="font-mono text-xs overflow-x-auto bg-[#F8F8F8] p-4 rounded-xl border border-[#E5E5E5]">
<pre class="text-[#0F0F0F]">
[1. Asset Catalog]          [2. Specification]          [3. Checkout Form]          [4. Return QR Pass]
┌─────────────────────────┐  ┌─────────────────────────┐  ┌─────────────────────────┐  ┌─────────────────────────┐
│ [=] Smart Borrow    [🔍]│  │ [←] รายละเอียดครุภัณฑ์  │  │ [←] แบบฟอร์มทำรายการยืม │  │                         │
│ ┌─────────────────────┐ │  │ รหัส: #CAM-SONY-04      │  │ รายการที่เลือก: 1 รายการ │  │      ( บันทึกสำเร็จ )   │
│ │ [📷 สแกนบาร์โค้ดหา] │ │  │ ┌─────────────────────┐ │  │ ┌─────────────────────┐ │  │                         │
│ └─────────────────────┘ │  │ │ ╲                 ╱ │ │  │ │ [IMG] SONY A7 IV    │ │  │ รหัสใบยืม: #BR-2026-092 │
│ สถานะ: [ทั้งหมด] [ว่าง] │  │ │    รูปถ่ายอุปกรณ์   │ │  │ └─────────────────────┘ │  │ ┌─────────────────────┐ │
│ ┌─────────────────────┐ │  │ └─────────────────────┘ │  │ กำหนดส่งคืนภายใน:        │  │ │      [ QR CODE ]      │ │
│ │ [IMG] กล้อง Sony A7 │ │  │ ตำแหน่งเก็บ: ตู้ B2    │  │ [ 26 ต.ค. 2026 (16:30) ]│  │ │    สำหรับสแกนคืนพัสดุ  │ │
│ │ สถานะ: [ ว่าง ]     │ │  │ สภาพ: พร้อมใช้งาน ดีมาก│  │ วัตถุประสงค์: ถ่ายงาน วท. │  │ └─────────────────────┘ │
│ └─────────────────────┘ │  │ อุปกรณ์ควบ: แบต 2, แท่น│  │ ลายมือชื่อผู้ขอยืม (Sign):│  │ ผู้ยืม: นายสมศักดิ์    │
│ ┌─────────────────────┐ │  │ ┌─────────────────────┐ │  │ ┌─────────────────────┐ │  │ ┌─────────────────────┐ │
│ │ [IMG] ขาตั้งกล้อง   │ │  │ │ [ ทำรายการยืมชิ้นนี้ ]│ │  │ │ (เซ็นชื่อดิจิทัลที่นี่)│ │  │ │  [ ดาวน์โหลดใบยืม ] │ │
│ └─────────────────────┘ │  │ └─────────────────────┘ │  │ └─────────────────────┘ │  │ └─────────────────────┘ │
└─────────────────────────┘  └─────────────────────────┘  └─────────────────────────┘  └─────────────────────────┘</pre>
              </div>
            </div>
          </div>
        </article>

        <!-- ───────────────────────────────────────────────────────────── -->
        <!-- SECTION 5: INTERACTIVE MOBILE PHONE SIMULATOR (320x640) -->
        <!-- ───────────────────────────────────────────────────────────── -->
        <article id="phone-simulator" class="lesson-section scroll-mt-20">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#065FD4] mb-1">
            <span>เครื่องมือเชิงโต้ตอบ • INTERACTIVE WIDGET</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold text-[#0F0F0F] tracking-tight mb-2">
            Interactive Mobile Phone Simulator (Grayscale Progression)
          </h2>
          <p class="text-sm text-[#606060] mb-6">
            จำลองสัมผัสการใช้งานหน้าจอมือถือมาตรฐาน (Viewport Simulator) แบบโครงร่างขาว-ดำ Grayscale ตามแต่ละขั้นตอนของทั้ง 3 โมเดลธุรกิจ:
          </p>

          <!-- ตัวควบคุมการทำงานของ Simulator ด้านนอก -->
          <div class="bg-[#F8F8F8] border border-[#E5E5E5] rounded-2xl p-4 sm:p-6 mb-6">
            <div class="flex flex-wrap items-center justify-between gap-4">
              <!-- เลือกโมเดลธุรกิจใน simulator -->
              <div>
                <label class="block text-xs font-bold text-[#0F0F0F] mb-1.5 uppercase">1. เลือกโมเดลธุรกิจ:</label>
                <div class="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-[#E5E5E5]">
                  <button id="simModel1" onclick="setSimModel('brew')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition bg-[#0F0F0F] text-white">☕ Fresh Brew</button>
                  <button id="simModel2" onclick="setSimModel('paws')" class="px-3 py-1.5 rounded-lg text-xs font-medium text-[#606060] hover:text-[#0F0F0F] transition">🐾 Happy Paws</button>
                  <button id="simModel3" onclick="setSimModel('borrow')" class="px-3 py-1.5 rounded-lg text-xs font-medium text-[#606060] hover:text-[#0F0F0F] transition">📦 Smart Borrow</button>
                </div>
              </div>

              <!-- เลือกหน้าจอที่ต้องการดูใน simulator -->
              <div>
                <label class="block text-xs font-bold text-[#0F0F0F] mb-1.5 uppercase">2. เลือกลำดับหน้าจอ (Screen Step):</label>
                <div class="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-[#E5E5E5]">
                  <button id="simStep1" onclick="setSimStep(1)" class="px-2.5 py-1.5 rounded-lg text-xs font-bold transition bg-red-100 text-[#FF0000]">1. Home</button>
                  <button id="simStep2" onclick="setSimStep(2)" class="px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#606060] hover:text-[#0F0F0F] transition">2. Detail</button>
                  <button id="simStep3" onclick="setSimStep(3)" class="px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#606060] hover:text-[#0F0F0F] transition">3. Action</button>
                  <button id="simStep4" onclick="setSimStep(4)" class="px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#606060] hover:text-[#0F0F0F] transition">4. Success</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Grid จัดแสดง Simulator กับ แผงคำอธิบายรายละเอียด -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <!-- PHONE FRAME (Col 1-7) -->
            <div class="lg:col-span-7 flex justify-center">
              <div class="phone-simulator-frame">
                <div class="phone-screen">
                  
                  <!-- Phone Notch / Status Bar -->
                  <div class="phone-notch">
                    <span>09:41</span>
                    <div class="phone-island"></div>
                    <div class="flex items-center gap-1 text-[10px]">
                      <span>5G</span>
                      <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
                    </div>
                  </div>

                  <!-- Phone Dynamic Viewport Content (Swappable by JS) -->
                  <div id="phoneScreenViewport" class="flex-1 p-3.5 flex flex-col justify-between bg-white text-[#0F0F0F]">
                    <!-- Rendered by JavaScript dynamically -->
                  </div>

                  <!-- Home Indicator Bar -->
                  <div class="phone-home-indicator"></div>

                </div>
              </div>
            </div>

            <!-- EXPLANATION PANEL (Col 8-12) -->
            <div class="lg:col-span-5 space-y-4">
              <div class="p-5 rounded-2xl border border-[#E5E5E5] bg-white space-y-4">
                <div class="flex items-center justify-between border-b border-[#E5E5E5] pb-2.5">
                  <span id="simExplStepBadge" class="text-xs font-mono font-bold text-[#FF0000] bg-red-50 px-2 py-0.5 rounded">SCREEN 1 OF 4</span>
                  <span id="simExplModelBadge" class="text-xs font-medium text-[#606060]">Fresh Brew Retail</span>
                </div>

                <h3 id="simExplTitle" class="text-lg font-bold text-[#0F0F0F]">
                  หน้าจอที่ 1: Catalog & Home View
                </h3>

                <p id="simExplDesc" class="text-xs text-[#606060] leading-relaxed">
                  หน้าแรกที่ผู้ใช้พบเจอ จัดวางช่องค้นหาไว้บนสุดเพื่อให้ค้นเมนูที่ต้องการได้ทันที พร้อมแถบหมวดหมู่แนวนอน และตารางสินค้าแบบ 2 คอลัมน์ที่แสดงรูปภาพขนาดเท่ากันพร้อมราคาชัดเจน
                </p>

                <div class="space-y-2 pt-2 border-t border-[#E5E5E5]">
                  <div class="text-[11px] font-bold uppercase tracking-wider text-[#0F0F0F]">องค์ประกอบตามหลัก Wireframe ที่ปรากฏ:</div>
                  <ul id="simExplFeatures" class="text-xs text-[#606060] space-y-1.5 list-disc list-inside">
                    <li>Top Bar: แฮมเบอร์เกอร์เมนู และไอคอนตะกร้าสินค้า</li>
                    <li>Search Field: กล่องสี่เหลี่ยมขอบเทา #CCCCCC</li>
                    <li>Category Chips: ปุ่มรูปทรงแคปซูลสำหรับสลับหมวด</li>
                    <li>Product Cards: กล่องสี่เหลี่ยมไขว้กากบาทแทนรูปภาพ</li>
                    <li>Bottom Navigation: เมนูหลัก 3 ปุ่มในโซนนิ้วโป้ง</li>
                  </ul>
                </div>

                <!-- ปุ่มควบคุม Next / Prev ด้านล่าง -->
                <div class="flex items-center gap-2 pt-3">
                  <button id="simPrevBtn" onclick="stepSimulator(-1)" class="flex-1 py-2 rounded-xl border border-[#CCCCCC] text-xs font-medium text-[#0F0F0F] hover:bg-[#F2F2F2] transition flex items-center justify-center gap-1">
                    <span>← หน้าก่อนหน้า</span>
                  </button>
                  <button id="simNextBtn" onclick="stepSimulator(1)" class="flex-1 py-2 rounded-xl bg-[#0F0F0F] text-white text-xs font-medium hover:bg-black transition flex items-center justify-center gap-1">
                    <span>หน้าถัดไป →</span>
                  </button>
                </div>
              </div>

              <!-- ข้อควรระวังในการทดสอบบนมือถือ -->
              <div class="p-4 rounded-xl bg-[#F8F8F8] border border-[#E5E5E5] text-xs text-[#606060] space-y-1.5">
                <div class="font-bold text-[#0F0F0F] flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-[#FB8C00]"></span>
                  <span>เคล็ดลับการจัดองค์ประกอบใน Figma:</span>
                </div>
                <p>
                  สังเกตว่าปุ่มยืนยันการดำเนินการหลัก (Primary Action) จะถูกวางไว้ที่ขอบล่างสุดเสมอ เพื่อให้สอดคล้องกับพฤติกรรมมือถือ และมีขนาดความสูงขั้นต่ำ 48px เพื่อไม่ให้นิ้วโป้งกดพลาด
                </p>
              </div>
            </div>

          </div>
        </article>

        <!-- ───────────────────────────────────────────────────────────── -->
        <!-- SECTION 6: การจัดระเบียบเลเยอร์และการทำงานร่วมกันเป็นทีม 3 คน -->
        <!-- ───────────────────────────────────────────────────────────── -->
        <article id="collaboration" class="lesson-section scroll-mt-20">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF0000] mb-1">
            <span>หัวข้อที่ 6</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold text-[#0F0F0F] tracking-tight mb-4">
            การจัดระเบียบเลเยอร์และการทำงานร่วมกันเป็นทีม 3 คน (Collaboration & Best Practices)
          </h2>

          <div class="prose text-[#0F0F0F] leading-relaxed space-y-4 text-base">
            <p>
              เมื่อนักศึกษา 3 คนเข้ามาร่วมออกแบบในไฟล์ Figma เดียวกันพร้อมกัน หากไม่มีข้อตกลงในการแบ่งหน้าที่และการตั้งชื่อเลเยอร์ ไฟล์งานจะกลายเป็นความสับสน เลเยอร์ทับซ้อน และไม่สามารถนำไปพัฒนาต่อในบทที่ 3 (Hi-Fi UI) ได้อย่างราบรื่น
            </p>

            <h3 class="text-lg font-bold text-[#0F0F0F]">6.1 การแบ่งบทบาทหน้าที่ในคาบเรียน (Role Division for 3 Members)</h3>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
              <div class="p-4 rounded-xl border border-[#E5E5E5] bg-white space-y-2">
                <div class="text-[10px] font-bold text-[#FF0000] uppercase tracking-wider">บทบาทที่ 1</div>
                <h4 class="font-bold text-sm text-[#0F0F0F]">Lead Navigator & Home Master</h4>
                <p class="text-xs text-[#606060] leading-relaxed">
                  รับผิดชอบ: สร้างไฟล์ Figma, เชิญเพื่อนร่วมทีมและครูผู้สอน, ออกแบบหน้า <code>01_Home / Catalog</code>, และสร้างโครงร่าง Top Bar และ Bottom Bar เพื่อให้เพื่อนก๊อปปี้ไปใช้เป็นโครงสร้างร่วม
                </p>
              </div>

              <div class="p-4 rounded-xl border border-[#E5E5E5] bg-white space-y-2">
                <div class="text-[10px] font-bold text-[#065FD4] uppercase tracking-wider">บทบาทที่ 2</div>
                <h4 class="font-bold text-sm text-[#0F0F0F]">Detail & Information Architect</h4>
                <p class="text-xs text-[#606060] leading-relaxed">
                  รับผิดชอบ: ออกแบบหน้า <code>02_Detail / Specification</code> จัดวางพื้นที่รูปภาพขนาดใหญ่, สัดส่วนย่อหน้าข้อความ, รายละเอียดราคา, และส่วนเลือกออปชัน (Radio buttons, Checkboxes)
                </p>
              </div>

              <div class="p-4 rounded-xl border border-[#E5E5E5] bg-white space-y-2">
                <div class="text-[10px] font-bold text-[#2BA640] uppercase tracking-wider">บทบาทที่ 3</div>
                <h4 class="font-bold text-sm text-[#0F0F0F]">Action Flow & QA Inspector</h4>
                <p class="text-xs text-[#606060] leading-relaxed">
                  รับผิดชอบ: ออกแบบหน้า <code>03_Action_Form</code> และหน้า <code>04_Success</code> รวมถึงตรวจสอบความถูกต้องของชื่อเลเยอร์ในทุกหน้าจอให้เป็นไปตามข้อตกลง Layer Hygiene ก่อนส่งงาน
                </p>
              </div>
            </div>

            <!-- 6.2 กฎการตั้งชื่อเลเยอร์ -->
            <h3 class="text-lg font-bold text-[#0F0F0F] pt-4">6.2 กฎการตั้งชื่อเลเยอร์ (Layer Hygiene Rules)</h3>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
              <div class="p-4 rounded-xl border border-red-200 bg-red-50/50 space-y-2">
                <div class="font-bold text-sm text-[#FF0000] flex items-center gap-1.5">
                  <svg class="w-4 h-4 text-[#FF0000]" fill="currentColor" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                  <span>สิ่งที่ห้ามทำเด็ดขาด (Bad Practice):</span>
                </div>
                <p class="text-xs text-zinc-700 leading-relaxed">
                  ปล่อยให้แถบ Layers ด้านซ้ายมือเป็นชื่อดิบที่โปรแกรมตั้งให้อัตโนมัติ เช่น:
                </p>
                <div class="font-mono text-xs text-red-700 bg-white p-2.5 rounded border border-red-200 space-y-0.5">
                  <div>❌ Rectangle 1, Rectangle 2</div>
                  <div>❌ Group 45, Frame 12</div>
                  <div>❌ Vector 3, Text 1</div>
                </div>
              </div>

              <div class="p-4 rounded-xl border border-green-200 bg-green-50/50 space-y-2">
                <div class="font-bold text-sm text-[#2BA640] flex items-center gap-1.5">
                  <svg class="w-4 h-4 text-[#2BA640]" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                  <span>สิ่งที่ถูกต้องและต้องปฏิบัติ (Clean Practice):</span>
                </div>
                <p class="text-xs text-zinc-700 leading-relaxed">
                  กดปุ่ม <kbd class="px-1 py-0.5 bg-white border border-green-300 rounded text-[10px]">Ctrl+R</kbd> เพื่อเปลี่ยนชื่อทันทีตามหน้าที่ของชิ้นส่วน:
                </p>
                <div class="font-mono text-xs text-green-800 bg-white p-2.5 rounded border border-green-200 space-y-0.5">
                  <div>✔️ TopBar / Navbar</div>
                  <div>✔️ SearchBox, Btn_Submit</div>
                  <div>✔️ Card_Product_01, Card_Product_02</div>
                </div>
              </div>
            </div>

            <!-- โครงสร้างเลเยอร์ตัวอย่าง -->
            <div class="p-4 rounded-2xl bg-[#0F0F0F] text-white my-4 font-mono text-xs">
              <div class="flex items-center justify-between mb-2">
                <span class="font-sans font-bold text-xs text-zinc-300 uppercase tracking-wider">โครงสร้าง Layers ที่เป็นระเบียบมาตรฐาน:</span>
                <button onclick="copyToClipboard('▼ 01_Home\n  ├── TopBar\n  ├── SearchBar\n  ├── Category_Chips\n  ▼ Item_List\n  │   ├── Card_Product_01\n  │   ├── Card_Product_02\n  │   └── Card_Product_03\n  └── BottomNav', this)" class="text-[11px] text-zinc-300 hover:text-white bg-white/10 px-2 py-0.5 rounded font-sans">คัดลอกโครงสร้าง</button>
              </div>
              <pre class="text-zinc-300 overflow-x-auto">
▼ 01_Home
   ├── TopBar
   ├── SearchBar
   ├── Category_Chips
   ▼ Item_List
   │   ├── Card_Product_01
   │   ├── Card_Product_02
   │   └── Card_Product_03
   └── BottomNav</pre>
            </div>

            <!-- 6.3 ขั้นตอนการแชร์ส่งงาน -->
            <h3 class="text-lg font-bold text-[#0F0F0F] pt-4">6.3 ขั้นตอนการแชร์ลิงก์ส่งงาน (How to Share Link)</h3>
            <ol class="list-decimal list-inside space-y-2 text-sm text-[#0F0F0F] pl-2">
              <li>ที่มุมบนขวาของหน้าต่าง Figma คลิกที่ปุ่มสีฟ้า <strong>"Share"</strong></li>
              <li>
                ในกล่องหน้าต่างที่ปรากฏขึ้น ให้ดูที่แถบด้านล่าง เปลี่ยนจาก <code>Only people invited</code> เป็น:  
                <span class="font-bold text-[#FF0000]">👉 "Anyone with the link"</span> และกำหนดสิทธิ์เป็น <span class="font-bold text-[#0F0F0F]">"can view"</span>
              </li>
              <li>คลิกปุ่ม <strong>"Copy link"</strong> เพื่อคัดลอก URL ของไฟล์งาน</li>
              <li>นำลิงก์ที่ได้ไปแนบส่งในระบบส่งงานของสถานศึกษา (Google Classroom / MS Teams) พร้อมระบุรายชื่อสมาชิกทั้ง 3 คน</li>
            </ol>
          </div>
        </article>

        <!-- ───────────────────────────────────────────────────────────── -->
        <!-- SECTION 7: แบบตรวจสอบตนเองก่อนส่งงาน (SELF-CHECKLIST) -->
        <!-- ───────────────────────────────────────────────────────────── -->
        <article id="checklist" class="lesson-section scroll-mt-20">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2BA640] mb-1">
            <span>การประเมินตนเอง • SELF-ASSESSMENT</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold text-[#0F0F0F] tracking-tight mb-2">
            แบบตรวจสอบตนเองก่อนส่งงาน (Interactive Self-Checklist)
          </h2>
          <p class="text-sm text-[#606060] mb-6">
            ตรวจสอบความครบถ้วนของไฟล์ Wireframe ก่อนส่งอาจารย์ผู้สอน ระบบจะบันทึกสถานะการทำเครื่องหมายไว้ในเบราว์เซอร์อัตโนมัติ (localStorage: curriculum_ch02_checklist):
          </p>

          <!-- แถบ Progress Bar ของ Checklist -->
          <div class="p-5 rounded-2xl bg-[#F8F8F8] border border-[#E5E5E5] space-y-4 mb-6">
            <div class="flex items-center justify-between text-xs">
              <span class="font-bold text-[#0F0F0F]">ความคืบหน้าการตรวจสอบชิ้นงาน:</span>
              <span id="checklistProgressText" class="font-mono font-bold text-[#FF0000]">0 / 6 รายการ (0%)</span>
            </div>
            <div class="w-full h-2.5 bg-zinc-200 rounded-full overflow-hidden">
              <div id="checklistProgressBar" class="h-full bg-[#2BA640] transition-all duration-300" style="width: 0%;"></div>
            </div>
          </div>

          <!-- รายการเช็ค 6 ข้อ -->
          <div class="space-y-3">
            <label class="checklist-item flex items-start gap-3 p-4 rounded-xl border border-[#E5E5E5] bg-white hover:border-[#0F0F0F] transition cursor-pointer">
              <input type="checkbox" id="chk1" onchange="updateChecklist()" class="mt-0.5 w-4 h-4 rounded text-[#FF0000] focus:ring-0 cursor-pointer">
              <div class="text-xs">
                <span class="font-bold text-[#0F0F0F]">1. ขนาดหน้าจอเป็นมาตรฐาน 390 x 844 px ทุกหน้า:</span>
                <span class="text-[#606060] block mt-0.5">ใช้ขนาด iPhone 14/15 หรือสัดส่วนมือถือที่กำหนด โดยไม่มีหน้าจอที่มีขนาดผิดเพี้ยน</span>
              </div>
            </label>

            <label class="checklist-item flex items-start gap-3 p-4 rounded-xl border border-[#E5E5E5] bg-white hover:border-[#0F0F0F] transition cursor-pointer">
              <input type="checkbox" id="chk2" onchange="updateChecklist()" class="mt-0.5 w-4 h-4 rounded text-[#FF0000] focus:ring-0 cursor-pointer">
              <div class="text-xs">
                <span class="font-bold text-[#0F0F0F]">2. ใช้เฉพาะเฉดสีขาว-เทา-ดำ ปราศจากสีสันตกแต่ง (Pure Grayscale):</span>
                <span class="text-[#606060] block mt-0.5">ใช้เฉพาะสี #FFFFFF, #F2F2F2, #CCCCCC, #666666, #0F0F0F และไม่มีรูปภาพจริงแทรกอยู่</span>
              </div>
            </label>

            <label class="checklist-item flex items-start gap-3 p-4 rounded-xl border border-[#E5E5E5] bg-white hover:border-[#0F0F0F] transition cursor-pointer">
              <input type="checkbox" id="chk3" onchange="updateChecklist()" class="mt-0.5 w-4 h-4 rounded text-[#FF0000] focus:ring-0 cursor-pointer">
              <div class="text-xs">
                <span class="font-bold text-[#0F0F0F]">3. โครงสร้างกายวิภาค 3 โซนครบถ้วน:</span>
                <span class="text-[#606060] block mt-0.5">มี Top Bar (56-64px), Main Content Area ตรงกลาง, และ Bottom Bar (64-80px) ที่ขอบล่าง</span>
              </div>
            </label>

            <label class="checklist-item flex items-start gap-3 p-4 rounded-xl border border-[#E5E5E5] bg-white hover:border-[#0F0F0F] transition cursor-pointer">
              <input type="checkbox" id="chk4" onchange="updateChecklist()" class="mt-0.5 w-4 h-4 rounded text-[#FF0000] focus:ring-0 cursor-pointer">
              <div class="text-xs">
                <span class="font-bold text-[#0F0F0F]">4. การจัดลำดับสายตา (Visual Hierarchy) และ Thumb Zone:</span>
                <span class="text-[#606060] block mt-0.5">ข้อความหัวข้อมีขนาดใหญ่กว่ารายละเอียด ปุ่มกด Call-to-Action เด่นชัด สูงอย่างน้อย 48px</span>
              </div>
            </label>

            <label class="checklist-item flex items-start gap-3 p-4 rounded-xl border border-[#E5E5E5] bg-white hover:border-[#0F0F0F] transition cursor-pointer">
              <input type="checkbox" id="chk5" onchange="updateChecklist()" class="mt-0.5 w-4 h-4 rounded text-[#FF0000] focus:ring-0 cursor-pointer">
              <div class="text-xs">
                <span class="font-bold text-[#0F0F0F]">5. ความเป็นระเบียบของชื่อ Frame และ Layers (Layer Hygiene):</span>
                <span class="text-[#606060] block mt-0.5">ตั้งชื่อบอกหน้าที่ชัดเจน เช่น 01_Home, TopBar, Btn_Submit ปราศจากชื่อ Rectangle หรือ Group รกเลเยอร์</span>
              </div>
            </label>

            <label class="checklist-item flex items-start gap-3 p-4 rounded-xl border border-[#E5E5E5] bg-white hover:border-[#0F0F0F] transition cursor-pointer">
              <input type="checkbox" id="chk6" onchange="updateChecklist()" class="mt-0.5 w-4 h-4 rounded text-[#FF0000] focus:ring-0 cursor-pointer">
              <div class="text-xs">
                <span class="font-bold text-[#0F0F0F]">6. สมาชิก 3 คนร่วมทำในไฟล์จริง และเปิดสิทธิ์ Anyone with link:</span>
                <span class="text-[#606060] block mt-0.5">มีประวัติการเข้าใช้งานของสมาชิกทั้ง 3 คน และเปิดสิทธิ์เป็น "can view" เพื่อให้อาจารย์ตรวจได้ทันที</span>
              </div>
            </label>
          </div>

          <!-- ปุ่มล้างข้อมูล Checklist -->
          <div class="flex justify-end pt-3">
            <button onclick="resetChecklist()" class="text-xs text-[#606060] hover:text-[#FF0000] transition flex items-center gap-1">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              <span>รีเซ็ตรายการตรวจสอบทั้งหมด</span>
            </button>
          </div>
        </article>

        <!-- ───────────────────────────────────────────────────────────── -->
        <!-- SECTION 8: เครื่องคิดเลขประเมินเกณฑ์รูบริก (RUBRIC CALCULATOR) -->
        <!-- ───────────────────────────────────────────────────────────── -->
        <article id="rubric" class="lesson-section scroll-mt-20">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FB8C00] mb-1">
            <span>เกณฑ์การให้คะแนน • SCORING RUBRIC</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold text-[#0F0F0F] tracking-tight mb-2">
            เครื่องคิดเลขคำนวณคะแนนตามเกณฑ์รูบริก (Interactive Rubric Calculator)
          </h2>
          <p class="text-sm text-[#606060] mb-6">
            เกณฑ์ประเมินการออกแบบ Wireframe 5 มิติ มิติลำดับละ 2 คะแนน รวม 10 คะแนนเต็ม คลิกเลือกระดับคุณภาพเพื่อคำนวณคะแนนและเกรดประเมินสด:
          </p>

          <!-- กล่องรวมคะแนนแบบ Live -->
          <div class="p-5 rounded-2xl bg-[#0F0F0F] text-white flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <div class="text-xs uppercase tracking-wider text-zinc-400">คะแนนประเมินรวม (Total Score):</div>
              <div class="flex items-baseline gap-2 mt-1">
                <span id="rubricTotalScore" class="text-4xl font-extrabold text-[#FF0000] font-mono">10</span>
                <span class="text-sm text-zinc-400">/ 10 คะแนน</span>
              </div>
            </div>

            <!-- Grade Badge -->
            <div class="text-right">
              <div class="text-xs uppercase tracking-wider text-zinc-400">ระดับผลการประเมิน (Grade Tier):</div>
              <div id="rubricBadge" class="mt-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#2BA640] text-white">
                <span class="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                <span>ระดับดีเยี่ยม (Master / A+)</span>
              </div>
            </div>
          </div>

          <!-- ตารางเกณฑ์การประเมิน 5 ข้อ (2, 1, 0 คะแนน) -->
          <div class="space-y-4">
            
            <!-- เกณฑ์ที่ 1 -->
            <div class="p-4 rounded-xl border border-[#E5E5E5] bg-white space-y-3">
              <div class="flex items-center justify-between">
                <h4 class="font-bold text-sm text-[#0F0F0F]">1. ความครบถ้วนของโครงสร้างหน้าจอและ Flow (Screen Completeness)</h4>
                <span class="text-xs font-mono font-bold text-[#FF0000]">เต็ม 2 คะแนน</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <label class="p-3 rounded-lg border border-[#E5E5E5] bg-zinc-50 cursor-pointer flex items-start gap-2 hover:bg-white transition">
                  <input type="radio" name="rubric1" value="2" checked onchange="calculateRubric()" class="mt-0.5 text-[#FF0000]">
                  <div>
                    <span class="font-bold text-[#0F0F0F] block">2 คะแนน (ดีมาก)</span>
                    <span class="text-[#606060]">มีครบ 3-4 หน้าจอหลัก แสดง Flow ตั้งแต่ต้นจนจบกระบวนการอย่างสมบูรณ์</span>
                  </div>
                </label>
                <label class="p-3 rounded-lg border border-[#E5E5E5] bg-zinc-50 cursor-pointer flex items-start gap-2 hover:bg-white transition">
                  <input type="radio" name="rubric1" value="1" onchange="calculateRubric()" class="mt-0.5 text-[#FF0000]">
                  <div>
                    <span class="font-bold text-[#0F0F0F] block">1 คะแนน (พอใช้)</span>
                    <span class="text-[#606060]">มี 2-3 หน้าจอ แต่ Flow ยังขาดตอน ไม่เห็นภาพการทำรายการจนจบ</span>
                  </div>
                </label>
                <label class="p-3 rounded-lg border border-[#E5E5E5] bg-zinc-50 cursor-pointer flex items-start gap-2 hover:bg-white transition">
                  <input type="radio" name="rubric1" value="0" onchange="calculateRubric()" class="mt-0.5 text-[#FF0000]">
                  <div>
                    <span class="font-bold text-[#0F0F0F] block">0 คะแนน (ปรับปรุง)</span>
                    <span class="text-[#606060]">มีเพียง 1-2 หน้าจอ โครงสร้างไม่สมบูรณ์</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- เกณฑ์ที่ 2 -->
            <div class="p-4 rounded-xl border border-[#E5E5E5] bg-white space-y-3">
              <div class="flex items-center justify-between">
                <h4 class="font-bold text-sm text-[#0F0F0F]">2. การปฏิบัติตามกฎ Grayscale ปราศจากสีสัน (Pure Grayscale Rules)</h4>
                <span class="text-xs font-mono font-bold text-[#FF0000]">เต็ม 2 คะแนน</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <label class="p-3 rounded-lg border border-[#E5E5E5] bg-zinc-50 cursor-pointer flex items-start gap-2 hover:bg-white transition">
                  <input type="radio" name="rubric2" value="2" checked onchange="calculateRubric()" class="mt-0.5 text-[#FF0000]">
                  <div>
                    <span class="font-bold text-[#0F0F0F] block">2 คะแนน (ดีมาก)</span>
                    <span class="text-[#606060]">ใช้เฉพาะสีขาว-เทา-ดำ 100% ไม่มีสีสันตกแต่ง และใช้ Placeholder ถูกต้อง</span>
                  </div>
                </label>
                <label class="p-3 rounded-lg border border-[#E5E5E5] bg-zinc-50 cursor-pointer flex items-start gap-2 hover:bg-white transition">
                  <input type="radio" name="rubric2" value="1" onchange="calculateRubric()" class="mt-0.5 text-[#FF0000]">
                  <div>
                    <span class="font-bold text-[#0F0F0F] block">1 คะแนน (พอใช้)</span>
                    <span class="text-[#606060]">มีสีสันเล็ดลอดมาเล็กน้อย 1-2 จุด หรือใช้รูปจริงบางตำแหน่ง</span>
                  </div>
                </label>
                <label class="p-3 rounded-lg border border-[#E5E5E5] bg-zinc-50 cursor-pointer flex items-start gap-2 hover:bg-white transition">
                  <input type="radio" name="rubric2" value="0" onchange="calculateRubric()" class="mt-0.5 text-[#FF0000]">
                  <div>
                    <span class="font-bold text-[#0F0F0F] block">0 คะแนน (ปรับปรุง)</span>
                    <span class="text-[#606060]">นำรูปภาพจริงและลงสีเต็มรูปแบบ ผิดวัตถุประสงค์ของ Wireframe</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- เกณฑ์ที่ 3 -->
            <div class="p-4 rounded-xl border border-[#E5E5E5] bg-white space-y-3">
              <div class="flex items-center justify-between">
                <h4 class="font-bold text-sm text-[#0F0F0F]">3. Visual Hierarchy และสรีระสัมผัส (Thumb Zone Ergonomics)</h4>
                <span class="text-xs font-mono font-bold text-[#FF0000]">เต็ม 2 คะแนน</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <label class="p-3 rounded-lg border border-[#E5E5E5] bg-zinc-50 cursor-pointer flex items-start gap-2 hover:bg-white transition">
                  <input type="radio" name="rubric3" value="2" checked onchange="calculateRubric()" class="mt-0.5 text-[#FF0000]">
                  <div>
                    <span class="font-bold text-[#0F0F0F] block">2 คะแนน (ดีมาก)</span>
                    <span class="text-[#606060]">ขนาดตัวอักษรและปุ่ม CTA ชัดเจน สอดคล้องกับ Thumb Zone สูง 48px</span>
                  </div>
                </label>
                <label class="p-3 rounded-lg border border-[#E5E5E5] bg-zinc-50 cursor-pointer flex items-start gap-2 hover:bg-white transition">
                  <input type="radio" name="rubric3" value="1" onchange="calculateRubric()" class="mt-0.5 text-[#FF0000]">
                  <div>
                    <span class="font-bold text-[#0F0F0F] block">1 คะแนน (พอใช้)</span>
                    <span class="text-[#606060]">ขนาดปุ่มเล็กเกินไป หรือข้อความหัวข้อมีขนาดกลืนกับเนื้อหา</span>
                  </div>
                </label>
                <label class="p-3 rounded-lg border border-[#E5E5E5] bg-zinc-50 cursor-pointer flex items-start gap-2 hover:bg-white transition">
                  <input type="radio" name="rubric3" value="0" onchange="calculateRubric()" class="mt-0.5 text-[#FF0000]">
                  <div>
                    <span class="font-bold text-[#0F0F0F] block">0 คะแนน (ปรับปรุง)</span>
                    <span class="text-[#606060]">ไม่มีการจัดลำดับสายตา วางปุ่มกดในจุดที่นิ้วกดยากมาก</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- เกณฑ์ที่ 4 -->
            <div class="p-4 rounded-xl border border-[#E5E5E5] bg-white space-y-3">
              <div class="flex items-center justify-between">
                <h4 class="font-bold text-sm text-[#0F0F0F]">4. ความเป็นระเบียบของเลเยอร์และโครงสร้างเฟรม (Layer Hygiene)</h4>
                <span class="text-xs font-mono font-bold text-[#FF0000]">เต็ม 2 คะแนน</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <label class="p-3 rounded-lg border border-[#E5E5E5] bg-zinc-50 cursor-pointer flex items-start gap-2 hover:bg-white transition">
                  <input type="radio" name="rubric4" value="2" checked onchange="calculateRubric()" class="mt-0.5 text-[#FF0000]">
                  <div>
                    <span class="font-bold text-[#0F0F0F] block">2 คะแนน (ดีมาก)</span>
                    <span class="text-[#606060]">ตั้งชื่อ Frame และ Layers สื่อความหมายชัดเจน จัดกลุ่มเลเยอร์สะอาดตา</span>
                  </div>
                </label>
                <label class="p-3 rounded-lg border border-[#E5E5E5] bg-zinc-50 cursor-pointer flex items-start gap-2 hover:bg-white transition">
                  <input type="radio" name="rubric4" value="1" onchange="calculateRubric()" class="mt-0.5 text-[#FF0000]">
                  <div>
                    <span class="font-bold text-[#0F0F0F] block">1 คะแนน (พอใช้)</span>
                    <span class="text-[#606060]">ตั้งชื่อ Frame ถูกต้อง แต่เลเยอร์ภายในยังมีชื่อ Rectangle ปะปน</span>
                  </div>
                </label>
                <label class="p-3 rounded-lg border border-[#E5E5E5] bg-zinc-50 cursor-pointer flex items-start gap-2 hover:bg-white transition">
                  <input type="radio" name="rubric4" value="0" onchange="calculateRubric()" class="mt-0.5 text-[#FF0000]">
                  <div>
                    <span class="font-bold text-[#0F0F0F] block">0 คะแนน (ปรับปรุง)</span>
                    <span class="text-[#606060]">เลเยอร์รกมาก ไม่มีการตั้งชื่อหรือจัดกลุ่มใด ๆ เลย</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- เกณฑ์ที่ 5 -->
            <div class="p-4 rounded-xl border border-[#E5E5E5] bg-white space-y-3">
              <div class="flex items-center justify-between">
                <h4 class="font-bold text-sm text-[#0F0F0F]">5. การทำงานร่วมกันในทีม 3 คนและสิทธิ์แชร์ลิงก์ (Collaboration & Sharing)</h4>
                <span class="text-xs font-mono font-bold text-[#FF0000]">เต็ม 2 คะแนน</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <label class="p-3 rounded-lg border border-[#E5E5E5] bg-zinc-50 cursor-pointer flex items-start gap-2 hover:bg-white transition">
                  <input type="radio" name="rubric5" value="2" checked onchange="calculateRubric()" class="mt-0.5 text-[#FF0000]">
                  <div>
                    <span class="font-bold text-[#0F0F0F] block">2 คะแนน (ดีมาก)</span>
                    <span class="text-[#606060]">สมาชิก 3 คนมีประวัติร่วมทำในไฟล์ และแชร์ลิงก์ Anyone with link (Can View)</span>
                  </div>
                </label>
                <label class="p-3 rounded-lg border border-[#E5E5E5] bg-zinc-50 cursor-pointer flex items-start gap-2 hover:bg-white transition">
                  <input type="radio" name="rubric5" value="1" onchange="calculateRubric()" class="mt-0.5 text-[#FF0000]">
                  <div>
                    <span class="font-bold text-[#0F0F0F] block">1 คะแนน (พอใช้)</span>
                    <span class="text-[#606060]">ทำงานเพียง 1-2 คน หรือลิงก์ยังติดสิทธิ์ Restricted ต้องขอ Access</span>
                  </div>
                </label>
                <label class="p-3 rounded-lg border border-[#E5E5E5] bg-zinc-50 cursor-pointer flex items-start gap-2 hover:bg-white transition">
                  <input type="radio" name="rubric5" value="0" onchange="calculateRubric()" class="mt-0.5 text-[#FF0000]">
                  <div>
                    <span class="font-bold text-[#0F0F0F] block">0 คะแนน (ปรับปรุง)</span>
                    <span class="text-[#606060]">ไม่ปรากฏประวัติการทำงานร่วมกัน หรือส่งงานไม่ตรงเวลา</span>
                  </div>
                </label>
              </div>
            </div>

          </div>
        </article>

        <!-- ───────────────────────────────────────────────────────────── -->
        <!-- SECTION 9: คำถามทบทวนประจำบท (FAQ ACCORDION) -->
        <!-- ───────────────────────────────────────────────────────────── -->
        <article id="faq" class="lesson-section scroll-mt-20">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF0000] mb-1">
            <span>คำถามทบทวนความเข้าใจ • REVIEW QUESTIONS</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold text-[#0F0F0F] tracking-tight mb-2">
            คำถามทบทวนประจำบทเรียน (Review Questions & FAQs)
          </h2>
          <p class="text-sm text-[#606060] mb-6">
            ทดสอบความเข้าใจเชิงลึก คลิกที่แต่ละข้อเพื่อเปิด-ปิดดูแนวคิดและคำเฉลย:
          </p>

          <div class="space-y-3">
            <!-- ข้อ 1 -->
            <div class="border border-[#E5E5E5] rounded-xl overflow-hidden bg-white">
              <button onclick="toggleFaq(1)" class="w-full p-4 text-left flex items-center justify-between hover:bg-[#F8F8F8] transition">
                <span class="font-bold text-sm text-[#0F0F0F]">1. เหตุใดจึงห้ามใส่สีสันและรูปถ่ายจริงในขั้นตอนการทำ Wireframe โดยเด็ดขาด?</span>
                <span id="faqIcon1" class="text-lg font-bold text-[#606060] w-6 h-6 flex items-center justify-center">+</span>
              </button>
              <div id="faqAns1" class="hidden p-4 pt-0 text-xs text-[#606060] leading-relaxed border-t border-[#E5E5E5] bg-[#F8F8F8]">
                <strong>แนวคำตอบ:</strong> เพื่อป้องกันปัญหา 3 ประการหลัก: (1) <em>Distraction</em> สมาชิกจะเสียเวลาถกเถียงเรื่องความชอบส่วนตัวเกี่ยวกับโทนสีแทนที่จะมุ่งเน้น Flow การใช้งาน (2) <em>Visual Bias</em> รูปภาพสวยงามจะหลอกตาให้รู้สึกว่าหน้าจอออกแบบดีแล้วทั้งที่โครงสร้างอาจใช้งานยาก และ (3) <em>Slow Iteration</em> การแก้ไขงานที่มีสีและกราฟิกจะใช้เวลานานกว่าการปรับกล่องสี่เหลี่ยมขาว-ดำหลายเท่า
              </div>
            </div>

            <!-- ข้อ 2 -->
            <div class="border border-[#E5E5E5] rounded-xl overflow-hidden bg-white">
              <button onclick="toggleFaq(2)" class="w-full p-4 text-left flex items-center justify-between hover:bg-[#F8F8F8] transition">
                <span class="font-bold text-sm text-[#0F0F0F]">2. ทำไม Figma จึงใช้คำว่า "Frame" แทนที่จะเป็น "Artboard" เหมือนโปรแกรมกราฟิกดั้งเดิม?</span>
                <span id="faqIcon2" class="text-lg font-bold text-[#606060] w-6 h-6 flex items-center justify-center">+</span>
              </button>
              <div id="faqAns2" class="hidden p-4 pt-0 text-xs text-[#606060] leading-relaxed border-t border-[#E5E5E5] bg-[#F8F8F8]">
                <strong>แนวคำตอบ:</strong> ตามพจนานุกรมคำศัพท์ (GLOSSARY.md): Frame ใน Figma ทำหน้าที่เป็นคอนเทนเนอร์ที่มีมิติและพฤติกรรมเสมือนโค้ดหน้าจอจริงของอุปกรณ์ (เช่น iPhone 390x844 px) Frame สามารถซ้อนอยู่ภายใน Frame อื่น ๆ ได้ (Nested Frames), รองรับระบบ Auto Layout, และรองรับการตัดส่วนเกิน (Clip Content) แตกต่างจาก Artboard ในโปรแกรมวาดภาพทั่วไปที่เป็นเพียงกระดาษขาวแบนราบ
              </div>
            </div>

            <!-- ข้อ 3 -->
            <div class="border border-[#E5E5E5] rounded-xl overflow-hidden bg-white">
              <button onclick="toggleFaq(3)" class="w-full p-4 text-left flex items-center justify-between hover:bg-[#F8F8F8] transition">
                <span class="font-bold text-sm text-[#0F0F0F]">3. ทฤษฎี Thumb Zone มีผลต่อการวางตำแหน่งปุ่ม Call-to-Action (CTA) อย่างไร?</span>
                <span id="faqIcon3" class="text-lg font-bold text-[#606060] w-6 h-6 flex items-center justify-center">+</span>
              </button>
              <div id="faqAns3" class="hidden p-4 pt-0 text-xs text-[#606060] leading-relaxed border-t border-[#E5E5E5] bg-[#F8F8F8]">
                <strong>แนวคำตอบ:</strong> งานวิจัยระบุว่าผู้ใช้งานกว่า 75% ถือโทรศัพท์ด้วยมือเดียวและใช้นิ้วโป้งสัมผัสหน้าจอ พื้นที่ครึ่งล่างของหน้าจอคือ "Natural Zone" ที่นิ้วโป้งกดถึงได้ง่ายและสบายที่สุด ดังนั้นปุ่มสำคัญสูงสุด เช่น "สั่งซื้อ" หรือ "เพิ่มลงตะกร้า" ต้องถูกวางไว้ในโซนล่าง (Bottom Sticky Bar) ที่มีความสูงอย่างน้อย 48px เพื่อให้ใช้งานได้คล่องตัว
              </div>
            </div>

            <!-- ข้อ 4 -->
            <div class="border border-[#E5E5E5] rounded-xl overflow-hidden bg-white">
              <button onclick="toggleFaq(4)" class="w-full p-4 text-left flex items-center justify-between hover:bg-[#F8F8F8] transition">
                <span class="font-bold text-sm text-[#0F0F0F]">4. Auto Layout ใน Figma ช่วยแก้ปัญหาการจัดหน้าจอได้อย่างไร?</span>
                <span id="faqIcon4" class="text-lg font-bold text-[#606060] w-6 h-6 flex items-center justify-center">+</span>
              </button>
              <div id="faqAns4" class="hidden p-4 pt-0 text-xs text-[#606060] leading-relaxed border-t border-[#E5E5E5] bg-[#F8F8F8]">
                <strong>แนวคำตอบ:</strong> Auto Layout ทำหน้าที่ควบคุมทิศทาง (Direction), ระยะห่างระหว่างวัตถุ (Gap), และระยะขอบ (Padding) โดยอัตโนมัติ ทำให้เมื่อมีการพิมพ์ข้อความยาวขึ้น หรือเพิ่มการ์ดสินค้าเข้ามา คอนเทนเนอร์จะขยายและดันองค์ประกอบอื่น ๆ ลงมาอย่างเป็นระเบียบโดยที่ผู้ออกแบบไม่ต้องคอยขยับชิ้นส่วนด้วยมือทีละชิ้น
              </div>
            </div>

            <!-- ข้อ 5 -->
            <div class="border border-[#E5E5E5] rounded-xl overflow-hidden bg-white">
              <button onclick="toggleFaq(5)" class="w-full p-4 text-left flex items-center justify-between hover:bg-[#F8F8F8] transition">
                <span class="font-bold text-sm text-[#0F0F0F]">5. หากอาจารย์ผู้สอนเปิดลิงก์ส่งงานของกลุ่มแล้วขึ้นข้อความ "You need access" เกิดจากอะไร?</span>
                <span id="faqIcon5" class="text-lg font-bold text-[#606060] w-6 h-6 flex items-center justify-center">+</span>
              </button>
              <div id="faqAns5" class="hidden p-4 pt-0 text-xs text-[#606060] leading-relaxed border-t border-[#E5E5E5] bg-[#F8F8F8]">
                <strong>แนวคำตอบ:</strong> เกิดจากการที่นักเรียนไม่ได้ปลดล็อกสิทธิ์ในหน้าต่าง Share ให้เปลี่ยนจากสถานะตั้งต้นที่เป็น <code>Only people invited</code> ให้กลายเป็น <code>Anyone with the link can view</code> วิธีแก้ไขคือหัวหน้ากลุ่มต้องเปิดหน้าต่าง Share แล้วปรับเปลี่ยนสิทธิ์ให้ถูกต้องทันที
              </div>
            </div>
          </div>
        </article>

        <!-- ───────────────────────────────────────────────────────────── -->
        <!-- SECTION 10: ความคิดเห็นและข้อซักถาม (COMMENTS SECTION) -->
        <!-- ───────────────────────────────────────────────────────────── -->
        <section class="border-t border-[#E5E5E5] pt-10 pb-12">
          <div class="flex items-center gap-6 mb-6">
            <h3 class="font-bold text-lg text-[#0F0F0F]">ความคิดเห็นและข้อซักถามประจำห้องเรียน (3)</h3>
            <span class="text-xs text-[#606060]">จัดเรียงตาม: ยอดนิยม</span>
          </div>

          <!-- ช่องกรอกความคิดเห็น -->
          <div class="flex items-start gap-3 mb-8">
            <div class="w-9 h-9 rounded-full bg-[#0F0F0F] text-white flex items-center justify-center font-bold text-xs shrink-0">
              ME
            </div>
            <div class="flex-1">
              <input 
                type="text" 
                id="commentInput"
                placeholder="เพิ่มข้อสงสัยเกี่ยวกับการทำ Wireframe หรือการใช้งาน Figma..." 
                class="w-full pb-2 bg-transparent border-b border-[#E5E5E5] text-sm text-[#0F0F0F] placeholder-[#606060] focus:outline-none focus:border-[#0F0F0F]"
              />
              <div class="flex justify-end gap-2 mt-2">
                <button onclick="clearComment()" class="h-8 px-3 rounded-full text-xs font-medium text-[#606060] hover:bg-[#F2F2F2]">ยกเลิก</button>
                <button onclick="postComment()" class="h-8 px-4 rounded-full text-xs font-medium bg-[#0F0F0F] text-white hover:bg-black transition">แสดงความคิดเห็น</button>
              </div>
            </div>
          </div>

          <!-- รายการความคิดเห็นตัวอย่าง -->
          <div id="commentList" class="space-y-6">
            <!-- ความคิดเห็น 1 -->
            <div class="flex items-start gap-3">
              <div class="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                TH
              </div>
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span class="font-bold text-xs text-[#0F0F0F]">ธีรภัทร ปวส.1/2 (กลุ่ม 4)</span>
                  <span class="text-[11px] text-[#606060]">1 ชั่วโมงที่แล้ว</span>
                </div>
                <p class="text-xs text-[#0F0F0F] leading-relaxed">
                  อาจารย์ครับ ตอนกดปุ่ม Alt ลาก Duplicate ช่วยประหยัดเวลาทำพวกการ์ดสินค้าได้เยอะมากเลยครับ เพิ่งรู้ว่า Figma ทำงานร่วมกัน 3 คนพร้อมกันได้แบบไม่มีแล็ก
                </p>
                <div class="flex items-center gap-3 pt-1 text-xs text-[#606060]">
                  <button class="hover:text-[#0F0F0F] flex items-center gap-1">👍 15</button>
                  <button class="hover:text-[#0F0F0F]">ตอบกลับ</button>
                </div>
              </div>
            </div>

            <!-- ความคิดเห็น 2 -->
            <div class="flex items-start gap-3">
              <div class="w-9 h-9 rounded-full bg-[#0F0F0F] text-white flex items-center justify-center font-bold text-xs ring-1 ring-[#FF0000] shrink-0">
                MK
              </div>
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span class="font-bold text-xs text-[#FF0000]">ครูแม็ค (ผู้สอน)</span>
                  <span class="text-[11px] text-[#606060]">45 นาทีที่แล้ว</span>
                </div>
                <p class="text-xs text-[#0F0F0F] leading-relaxed">
                  เยี่ยมมากธีรภัทร! อย่าลืมกดเปลี่ยนชื่อเลเยอร์ด้วย Ctrl+R ทันทีหลังก๊อปปี้นะครับ จะได้ไม่ติดชื่อ Rectangle รกเลเยอร์ตอนอาจารย์ตรวจเกณฑ์รูบริกครับ
                </p>
                <div class="flex items-center gap-3 pt-1 text-xs text-[#606060]">
                  <button class="hover:text-[#0F0F0F] flex items-center gap-1">👍 11</button>
                  <button class="hover:text-[#0F0F0F]">ตอบกลับ</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ───────────────────────────────────────────────────────────── -->
        <!-- SECTION 11: COURSE NAVIGATION BAR (PREV / HUB / NEXT) -->
        <!-- ───────────────────────────────────────────────────────────── -->
        <nav class="border-t border-[#E5E5E5] pt-8 pb-16 flex flex-wrap items-center justify-between gap-4">
          <!-- ย้อนกลับ บทที่ 1 -->
          <a href="ch01-sdlc-app-concept-canvas.html" class="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E5E5E5] text-xs font-semibold text-[#0F0F0F] hover:bg-[#F2F2F2] transition">
            <svg class="w-4 h-4 text-[#606060]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
            <div class="text-left">
              <div class="text-[10px] text-[#606060]">บทก่อนหน้า</div>
              <span>บทที่ 1: SDLC & App Concept Canvas</span>
            </div>
          </a>

          <!-- สารบัญกลาง -->
          <a href="index.html" class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F8F8F8] border border-[#E5E5E5] text-xs font-bold text-[#0F0F0F] hover:bg-[#F2F2F2] transition">
            <svg class="w-4 h-4 text-[#FF0000]" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
            <span>สารบัญบทเรียน (Curriculum Hub)</span>
          </a>

          <!-- ถัดไป บทที่ 3 -->
          <a href="ch03-figma-hifi-ui.html" class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F0F0F] text-white text-xs font-semibold hover:bg-black transition">
            <div class="text-right">
              <div class="text-[10px] text-zinc-300">บทถัดไป</div>
              <span>บทที่ 3: การลงสีและออกแบบ UI ฉบับสมบูรณ์</span>
            </div>
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </a>
        </nav>

      </div>
    </main>

  </div>

  <!-- TOAST NOTIFICATION FOR COPY -->
  <div id="copyToast" class="fixed bottom-6 right-6 bg-[#0F0F0F] text-white px-4 py-2.5 rounded-xl shadow-lg border border-zinc-700 text-xs font-medium flex items-center gap-2 opacity-0 pointer-events-none transform translate-y-2 z-50">
    <svg class="w-4 h-4 text-[#2BA640]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
    <span id="toastMsg">คัดลอกลงคลิปบอร์ดแล้ว!</span>
  </div>

  <!-- ========================================================================= -->
  <!-- JAVASCRIPT LOGIC (Interactive Widgets & State Management) -->
  <!-- ========================================================================= -->
  <script>
    // 1. Reading Scroll Progress Bar
    const mainViewport = document.getElementById('mainViewport');
    const scrollProgress = document.getElementById('scrollProgress');

    mainViewport.addEventListener('scroll', () => {
      const scrollTop = mainViewport.scrollTop;
      const scrollHeight = mainViewport.scrollHeight - mainViewport.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      scrollProgress.style.width = progress + '%';
    });

    // 2. Toggle Sidebar (Hide / Show)
    const toggleSidebarBtn = document.getElementById('toggleSidebarBtn');
    const sidebar = document.getElementById('sidebar');
    toggleSidebarBtn.addEventListener('click', () => {
      sidebar.classList.toggle('hidden');
    });

    // 3. Horizontal Pill Chip Filters
    function filterChip(targetId, btn) {
      document.querySelectorAll('.chip-btn').forEach(b => {
        b.className = 'chip-btn h-8 px-3.5 rounded-full text-xs font-medium bg-[#F2F2F2] text-[#0F0F0F] hover:bg-[#E5E5E5] transition shrink-0';
      });
      btn.className = 'chip-btn active h-8 px-4 rounded-full text-xs font-medium bg-[#0F0F0F] text-white transition shrink-0';

      if (targetId === 'all') {
        mainViewport.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }

    // 4. Tri-Archetype Switcher
    function switchArchetype(num) {
      for (let i = 1; i <= 3; i++) {
        const tab = document.getElementById('tabArch' + i);
        const content = document.getElementById('archContent' + i);
        if (i === num) {
          tab.className = 'flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition bg-white text-[#0F0F0F] elevation-1 flex items-center justify-center gap-2';
          content.classList.remove('hidden');
          content.classList.add('block');
        } else {
          tab.className = 'flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition text-[#606060] hover:text-[#0F0F0F] flex items-center justify-center gap-2';
          content.classList.add('hidden');
          content.classList.remove('block');
        }
      }
    }

    // 5. Interactive Phone Simulator State & Data
    let currentSimModel = 'brew'; // 'brew' | 'paws' | 'borrow'
    let currentSimStep = 1; // 1 to 4

    const simulatorData = {
      brew: {
        name: 'Fresh Brew (Retail & Ordering)',
        screens: [
          {
            title: 'หน้าจอที่ 1: Catalog & Home View',
            stepBadge: 'SCREEN 1 OF 4',
            desc: 'หน้าแรกของร้านชานม Fresh Brew แสดงแถบค้นหา แถบชิปหมวดหมู่เครื่องดื่มแนวนอน และตารางสินค้าแบบ 2 คอลัมน์ที่แสดงรูปภาพกล่องสี่เหลี่ยมกากบาทพร้อมราคาชัดเจน',
            features: [
              'Top Bar: [≡] Fresh Brew และ [🛒]',
              'Search Input: สี่เหลี่ยมขอบเทา #CCCCCC',
              'Category Chips: [ทั้งหมด] [ชา] [กาแฟ] [ขนม]',
              'Product Grid: ชานมไต้หวัน ฿55, ชาเขียว ฿60',
              'Bottom Sticky Nav: [🏠หน้าแรก] [📋ออร์เดอร์]'
            ],
            render: () => \`
              <div class="flex-1 flex flex-col justify-between text-xs font-sans">
                <!-- Top Bar -->
                <div>
                  <div class="flex items-center justify-between pb-2 border-b border-zinc-200">
                    <span class="font-bold text-xs">[≡] Fresh Brew</span>
                    <span class="p-1 rounded bg-zinc-100 font-mono text-[10px]">🛒 (2)</span>
                  </div>
                  <!-- Search -->
                  <div class="mt-2.5 p-1.5 bg-zinc-100 rounded-lg border border-zinc-300 text-zinc-500 text-[10px] flex items-center gap-1.5">
                    <span>🔍</span>
                    <span>ค้นหาเครื่องดื่ม...</span>
                  </div>
                  <!-- Chips -->
                  <div class="flex items-center gap-1 mt-2.5 overflow-x-hidden text-[9px]">
                    <span class="px-2 py-0.5 rounded-full bg-black text-white font-bold">ทั้งหมด</span>
                    <span class="px-2 py-0.5 rounded-full bg-zinc-200 text-zinc-700">ชา</span>
                    <span class="px-2 py-0.5 rounded-full bg-zinc-200 text-zinc-700">กาแฟ</span>
                    <span class="px-2 py-0.5 rounded-full bg-zinc-200 text-zinc-700">เบเกอรี</span>
                  </div>
                  <!-- Grid -->
                  <div class="grid grid-cols-2 gap-2 mt-3">
                    <div onclick="setSimStep(2)" class="p-2 rounded-xl border border-zinc-300 bg-zinc-50 cursor-pointer hover:border-black transition">
                      <div class="w-full h-16 rounded wireframe-img-box mb-1.5"></div>
                      <div class="font-bold text-[10px] text-zinc-900 truncate">ชานมไต้หวัน</div>
                      <div class="text-[9px] text-zinc-600">฿55.00</div>
                    </div>
                    <div class="p-2 rounded-xl border border-zinc-300 bg-zinc-50">
                      <div class="w-full h-16 rounded wireframe-img-box mb-1.5"></div>
                      <div class="font-bold text-[10px] text-zinc-900 truncate">ชาเขียวมัทฉะ</div>
                      <div class="text-[9px] text-zinc-600">฿60.00</div>
                    </div>
                  </div>
                </div>
                <!-- Bottom CTA -->
                <div class="pt-2 border-t border-zinc-200">
                  <button onclick="setSimStep(2)" class="w-full py-2 bg-black text-white text-[11px] font-bold rounded-xl text-center">
                    คลิกเลือกดูสินค้า (ชานม) →
                  </button>
                </div>
              </div>
            \`
          },
          {
            title: 'หน้าจอที่ 2: Product Detail & Modifiers',
            stepBadge: 'SCREEN 2 OF 4',
            desc: 'หน้ารายละเอียดสินค้า แสดงรูปถ่ายสินค้าขนาดใหญ่ 16:9 รายการระดับความหวานแบบ Radio buttons และ Checkbox ท็อปปิ้งเพิ่มเติม พร้อมปุ่มยืนยันเพิ่มลงตะกร้า',
            features: [
              'Top Bar: [← ย้อนกลับ]',
              'Hero Image: กล่องรูปภาพขนาดใหญ่ 16:9',
              'Radio Buttons: หวาน 100%, 50%, 0%',
              'Checkboxes: [✓] ไข่มุก (+฿10), [ ] พุดดิ้ง',
              'Bottom CTA: ปุ่มดำทึบ "เพิ่มลงตะกร้า ฿65.00"'
            ],
            render: () => \`
              <div class="flex-1 flex flex-col justify-between text-xs font-sans">
                <div>
                  <div class="flex items-center gap-2 pb-2 border-b border-zinc-200">
                    <button onclick="setSimStep(1)" class="text-xs font-bold">[← ย้อนกลับ]</button>
                  </div>
                  <div class="w-full h-24 rounded-xl wireframe-img-box mt-2"></div>
                  <div class="mt-2.5">
                    <div class="font-bold text-xs text-zinc-900">ชานมไต้หวันบราวชูการ์</div>
                    <div class="text-[11px] text-zinc-600 font-bold mt-0.5">฿55.00</div>
                    <div class="h-1.5 w-full bg-zinc-200 rounded mt-1.5"></div>
                    <div class="h-1.5 w-3/4 bg-zinc-200 rounded mt-1"></div>
                  </div>
                  <div class="mt-3 p-2 rounded-lg bg-zinc-100 text-[10px] space-y-1">
                    <div class="font-bold text-zinc-800">ระดับความหวาน:</div>
                    <div class="flex items-center gap-2 text-zinc-600">
                      <span>( ) 100%</span>
                      <span class="font-bold text-black">(•) 50%</span>
                      <span>( ) 0%</span>
                    </div>
                  </div>
                </div>
                <div class="pt-2 border-t border-zinc-200">
                  <button onclick="setSimStep(3)" class="w-full py-2 bg-black text-white text-[11px] font-bold rounded-xl text-center">
                    + เพิ่มลงตะกร้า (฿65.00)
                  </button>
                </div>
              </div>
            \`
          },
          {
            title: 'หน้าจอที่ 3: Cart & Checkout View',
            stepBadge: 'SCREEN 3 OF 4',
            desc: 'หน้าตะกร้าสินค้า สรุปรายการเครื่องดื่มที่เลือก ปรับจำนวนแก้ว ยอดรวมสุทธิ และปุ่มยืนยันการสั่งซื้อเพื่อตัดสต๊อกและสร้างคำสั่งซื้อ',
            features: [
              'Cart Items: ชานม หวาน 50% x2, ขนมปังปิ้ง x1',
              'Stepper: ปุ่ม [+] และ [-] ปรับจำนวน',
              'Summary: ยอดรวมสินค้า ฿150.00',
              'Payment Method: สแกน QR Code พร้อมเพย์',
              'Sticky CTA: [ ยืนยันการสั่งซื้อ ]'
            ],
            render: () => \`
              <div class="flex-1 flex flex-col justify-between text-xs font-sans">
                <div>
                  <div class="flex items-center justify-between pb-2 border-b border-zinc-200">
                    <span class="font-bold text-xs">[←] ตะกร้าสินค้า</span>
                    <span class="text-[10px] text-zinc-500">2 รายการ</span>
                  </div>
                  <div class="space-y-2 mt-2.5 text-[10px]">
                    <div class="p-2 rounded-lg border border-zinc-300 bg-zinc-50 flex items-center justify-between">
                      <div>
                        <div class="font-bold">ชานมไต้หวัน (หวาน 50%)</div>
                        <div class="text-zinc-500">฿55.00 x 2</div>
                      </div>
                      <div class="font-bold">฿110.00</div>
                    </div>
                    <div class="p-2 rounded-lg border border-zinc-300 bg-zinc-50 flex items-center justify-between">
                      <div>
                        <div class="font-bold">ขนมปังปิ้งเนยสด</div>
                        <div class="text-zinc-500">฿40.00 x 1</div>
                      </div>
                      <div class="font-bold">฿40.00</div>
                    </div>
                  </div>
                  <div class="mt-3 p-2 bg-zinc-100 rounded-lg text-[10px] space-y-1">
                    <div class="flex justify-between">
                      <span>ยอดรวมทั้งสิ้น:</span>
                      <span class="font-bold text-xs">฿150.00</span>
                    </div>
                    <div class="text-[9px] text-zinc-500">วิธีชำระ: สแกน QR พร้อมเพย์หน้าร้าน</div>
                  </div>
                </div>
                <div class="pt-2 border-t border-zinc-200">
                  <button onclick="setSimStep(4)" class="w-full py-2 bg-black text-white text-[11px] font-bold rounded-xl text-center">
                    ยืนยันสั่งซื้อ (฿150.00) →
                  </button>
                </div>
              </div>
            \`
          },
          {
            title: 'หน้าจอที่ 4: Order Confirmation Success',
            stepBadge: 'SCREEN 4 OF 4',
            desc: 'หน้าจอยืนยันคำสั่งซื้อสำเร็จ แสดงเครื่องหมายถูกขนาดใหญ่ รหัสคำสั่งซื้อ #TB-8821 สถานะกำลังจัดเตรียม และปุ่มพากลับสู่หน้าหลัก',
            features: [
              'Status Icon: เครื่องหมายถูกขนาดใหญ่ (Checkmark)',
              'Order ID: รหัสอ้างอิง #TB-8821',
              'Live Status: กำลังชงสด (คิวที่ 4)',
              'Pickup Location: สาขา 1 ตึกคอมพิวเตอร์',
              'Back Action: [ กลับสู่หน้าหลัก ]'
            ],
            render: () => \`
              <div class="flex-1 flex flex-col justify-between text-xs font-sans text-center">
                <div class="py-4">
                  <div class="w-14 h-14 mx-auto rounded-full bg-zinc-200 border-2 border-black flex items-center justify-center text-xl font-bold">
                    ✓
                  </div>
                  <div class="font-bold text-sm text-zinc-900 mt-2.5">สั่งซื้อสำเร็จ!</div>
                  <div class="font-mono text-xs text-zinc-600 mt-0.5">รหัสคำสั่งซื้อ: #TB-8821</div>
                  
                  <div class="mt-4 p-3 bg-zinc-100 rounded-xl border border-zinc-200 text-left text-[10px] space-y-1">
                    <div class="flex justify-between">
                      <span class="text-zinc-500">สถานะ:</span>
                      <span class="font-bold text-black">กำลังชงเครื่องดื่ม</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-zinc-500">ยอดชำระ:</span>
                      <span class="font-bold text-black">฿150.00 (สำเร็จ)</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-zinc-500">รับสินค้าที่:</span>
                      <span class="font-bold text-black">หน้าร้าน Fresh Brew</span>
                    </div>
                  </div>
                </div>
                <div class="pt-2 border-t border-zinc-200">
                  <button onclick="setSimStep(1)" class="w-full py-2 bg-black text-white text-[11px] font-bold rounded-xl text-center">
                    กลับสู่หน้าแรก (สั่งใหม่)
                  </button>
                </div>
              </div>
            \`
          }
        ]
      },
      paws: {
        name: 'Happy Paws (Service & Booking)',
        screens: [
          {
            title: 'หน้าจอที่ 1: Service Catalog & Queues',
            stepBadge: 'SCREEN 1 OF 4',
            desc: 'หน้ารวมบริการตัดขนและดูแลสัตว์เลี้ยง แสดงสถานะคิวว่างวันนี้ พร้อมการ์ดบริการที่มีระยะเวลาและราคาเริ่มต้น',
            features: [
              'Top Bar: [≡] Happy Paws Care [🔔]',
              'Queue Status Card: 📅 คิวว่างวันนี้ 4 คิว',
              'Service Cards: อาบน้ำตัดขน (฿350), ฉีดวัคซีน (฿450)',
              'Booking Action: คลิกการ์ดบริการเพื่อจองคิว',
              'Bottom Nav: [🏠หน้าหลัก] [📅คิวของฉัน]'
            ],
            render: () => \`
              <div class="flex-1 flex flex-col justify-between text-xs font-sans">
                <div>
                  <div class="flex items-center justify-between pb-2 border-b border-zinc-200">
                    <span class="font-bold text-xs">[≡] Happy Paws</span>
                    <span class="text-[10px]">🔔 (1)</span>
                  </div>
                  <div class="mt-2.5 p-2 bg-zinc-100 rounded-xl border border-zinc-300 text-[10px]">
                    <div class="font-bold text-black">📅 คิวว่างวันนี้: 4 คิว</div>
                    <div class="text-zinc-500 text-[9px]">เปิดให้บริการ 09:00 - 18:00 น.</div>
                  </div>
                  <div class="mt-3 space-y-2">
                    <div onclick="setSimStep(2)" class="p-2.5 rounded-xl border border-zinc-300 bg-zinc-50 cursor-pointer hover:border-black transition flex items-center gap-2">
                      <div class="w-12 h-12 rounded-lg wireframe-img-box shrink-0"></div>
                      <div class="text-[10px] flex-1">
                        <div class="font-bold text-black">อาบน้ำ-ตัดขน สุนัข/แมว</div>
                        <div class="text-zinc-500">ใช้เวลา 60-90 นาที</div>
                        <div class="font-bold text-black mt-0.5">เริ่มต้น ฿350</div>
                      </div>
                    </div>
                    <div class="p-2.5 rounded-xl border border-zinc-300 bg-zinc-50 flex items-center gap-2">
                      <div class="w-12 h-12 rounded-lg wireframe-img-box shrink-0"></div>
                      <div class="text-[10px] flex-1">
                        <div class="font-bold text-black">ฉีดวัคซีนรวม & ถ่ายพยาธิ</div>
                        <div class="text-zinc-500">ใช้เวลา 30 นาที</div>
                        <div class="font-bold text-black mt-0.5">เริ่มต้น ฿450</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="pt-2 border-t border-zinc-200">
                  <button onclick="setSimStep(2)" class="w-full py-2 bg-black text-white text-[11px] font-bold rounded-xl text-center">
                    นัดหมายบริการ (อาบน้ำตัดขน) →
                  </button>
                </div>
              </div>
            \`
          },
          {
            title: 'หน้าจอที่ 2: Date & Time Slot Picker',
            stepBadge: 'SCREEN 2 OF 4',
            desc: 'หน้าเลือกวันและรอบเวลานัดหมาย แสดงปฏิทินย่อส่วนและชิปช่วงเวลา (Time Slots) ที่แบ่งสถานะ "ว่าง" และ "เต็ม"',
            features: [
              'Calendar View: ตารางวันในสัปดาห์ [24] ต.ค.',
              'Available Slots: 10:00 น., 13:00 น.',
              'Booked Slots: (11:30 น. เต็ม)',
              'Service Summary: อาบน้ำตัดขน (60 นาที)',
              'Next Button: [ ถัดไป: กรอกข้อมูลสัตว์เลี้ยง ]'
            ],
            render: () => \`
              <div class="flex-1 flex flex-col justify-between text-xs font-sans">
                <div>
                  <div class="flex items-center gap-2 pb-2 border-b border-zinc-200">
                    <button onclick="setSimStep(1)" class="font-bold text-xs">[←] เลือกวันและเวลา</button>
                  </div>
                  <div class="mt-2.5 p-2 rounded-xl border border-zinc-300 bg-zinc-50 text-[10px] text-center">
                    <div class="font-bold mb-1">[ < ] ตุลาคม 2026 [ > ]</div>
                    <div class="grid grid-cols-7 gap-1 font-mono text-[9px] text-zinc-600">
                      <span>จ</span><span>อ</span><span>พ</span><span>พฤ</span><span>ศ</span><span>ส</span><span>อา</span>
                      <span class="p-1 rounded bg-black text-white font-bold">24</span>
                      <span class="p-1">25</span><span class="p-1">26</span><span class="p-1">27</span><span class="p-1">28</span><span class="p-1">29</span><span class="p-1">30</span>
                    </div>
                  </div>
                  <div class="mt-3">
                    <div class="font-bold text-[10px] mb-1.5">เลือกรอบเวลาที่ว่าง:</div>
                    <div class="grid grid-cols-2 gap-1.5 text-[10px]">
                      <div class="p-1.5 rounded-lg border border-zinc-300 text-center bg-zinc-100">10:00 - 11:30</div>
                      <div class="p-1.5 rounded-lg border border-zinc-200 text-center text-zinc-400 line-through">11:30 (เต็ม)</div>
                      <div class="p-1.5 rounded-lg border-2 border-black font-bold text-center bg-zinc-200">13:00 - 14:30 ✓</div>
                      <div class="p-1.5 rounded-lg border border-zinc-300 text-center bg-zinc-100">15:00 - 16:30</div>
                    </div>
                  </div>
                </div>
                <div class="pt-2 border-t border-zinc-200">
                  <button onclick="setSimStep(3)" class="w-full py-2 bg-black text-white text-[11px] font-bold rounded-xl text-center">
                    ถัดไป: กรอกข้อมูลผู้รับบริการ →
                  </button>
                </div>
              </div>
            \`
          },
          {
            title: 'หน้าจอที่ 3: Pet & Customer Info Form',
            stepBadge: 'SCREEN 3 OF 4',
            desc: 'แบบฟอร์มกรอกชื่อสัตว์เลี้ยง สายพันธุ์ เบอร์โทรศัพท์เจ้าของ และกล่องข้อควรระวังเรื่องสุขภาพสัตว์เลี้ยง',
            features: [
              'Input Field: ชื่อสัตว์เลี้ยง [น้องมอมแมม]',
              'Dropdown: สายพันธุ์ [ชิวาวา ▼]',
              'Phone Input: เบอร์โทร [081-234-5678]',
              'Notes Field: อาการ [แพ้ยาฆ่าเห็บบางชนิด]',
              'Confirm Action: [ ยืนยันการจองคิว ]'
            ],
            render: () => \`
              <div class="flex-1 flex flex-col justify-between text-xs font-sans">
                <div>
                  <div class="flex items-center gap-2 pb-2 border-b border-zinc-200">
                    <button onclick="setSimStep(2)" class="font-bold text-xs">[←] ข้อมูลผู้รับบริการ</button>
                  </div>
                  <div class="mt-2 space-y-2 text-[10px]">
                    <div>
                      <label class="block text-zinc-600 font-bold mb-0.5">ชื่อสัตว์เลี้ยง:</label>
                      <div class="p-1.5 bg-zinc-50 border border-zinc-300 rounded font-bold">น้องมอมแมม</div>
                    </div>
                    <div>
                      <label class="block text-zinc-600 font-bold mb-0.5">สายพันธุ์ / ขนาด:</label>
                      <div class="p-1.5 bg-zinc-50 border border-zinc-300 rounded text-zinc-700">สุนัขพันธุ์เล็ก (ชิวาวา) ▼</div>
                    </div>
                    <div>
                      <label class="block text-zinc-600 font-bold mb-0.5">เบอร์ติดต่อเจ้าของ:</label>
                      <div class="p-1.5 bg-zinc-50 border border-zinc-300 rounded text-zinc-700 font-mono">081-234-5678</div>
                    </div>
                    <div>
                      <label class="block text-zinc-600 font-bold mb-0.5">ข้อควรระวัง:</label>
                      <div class="p-1.5 bg-zinc-50 border border-zinc-300 rounded text-zinc-500">แพ้ยาฆ่าเห็บ</div>
                    </div>
                  </div>
                </div>
                <div class="pt-2 border-t border-zinc-200">
                  <button onclick="setSimStep(4)" class="w-full py-2 bg-black text-white text-[11px] font-bold rounded-xl text-center">
                    ยืนยันการนัดหมาย →
                  </button>
                </div>
              </div>
            \`
          },
          {
            title: 'หน้าจอที่ 4: Digital Appointment Pass',
            stepBadge: 'SCREEN 4 OF 4',
            desc: 'บัตรนัดหมายดิจิทัล แสดงหมายเลขคิว #Q-014 วันเวลาที่นัด ชื่อช่างผู้ดูแล และคำแนะนำก่อนเข้ารับบริการ',
            features: [
              'Queue Badge: บัตรคิวที่ #Q-014',
              'Appointment Card: วันที่ 24 ต.ค. เวลา 13:00 น.',
              'Groomer: คุณหมอสมชาย',
              'Notice: กรุณามาถึงก่อนเวลา 10 นาที',
              'Bottom Action: [ บันทึกบัตรนัดหมาย ]'
            ],
            render: () => \`
              <div class="flex-1 flex flex-col justify-between text-xs font-sans text-center">
                <div class="py-2">
                  <div class="font-bold text-xs text-zinc-600 uppercase">บัตรคิวนัดหมายดิจิทัล</div>
                  <div class="text-2xl font-extrabold text-black font-mono mt-1">#Q-014</div>
                  
                  <div class="mt-3 p-3 bg-zinc-100 rounded-xl border border-zinc-300 text-left text-[10px] space-y-1.5">
                    <div class="flex justify-between border-b border-zinc-200 pb-1">
                      <span class="text-zinc-500">บริการ:</span>
                      <span class="font-bold text-black">อาบน้ำตัดขน</span>
                    </div>
                    <div class="flex justify-between border-b border-zinc-200 pb-1">
                      <span class="text-zinc-500">วัน/เวลา:</span>
                      <span class="font-bold text-black font-mono">24 ต.ค. 13:00 น.</span>
                    </div>
                    <div class="flex justify-between border-b border-zinc-200 pb-1">
                      <span class="text-zinc-500">สัตว์เลี้ยง:</span>
                      <span class="font-bold text-black">น้องมอมแมม (ชิวาวา)</span>
                    </div>
                    <div class="text-[9px] text-zinc-500 pt-1 text-center">
                      *กรุณานำสัตว์เลี้ยงมาถึงก่อนเวลานัด 10 นาที*
                    </div>
                  </div>
                </div>
                <div class="pt-2 border-t border-zinc-200">
                  <button onclick="setSimStep(1)" class="w-full py-2 bg-black text-white text-[11px] font-bold rounded-xl text-center">
                    กลับหน้าหลัก (จองคิวใหม่)
                  </button>
                </div>
              </div>
            \`
          }
        ]
      },
      borrow: {
        name: 'Smart Borrow (Asset & Operations)',
        screens: [
          {
            title: 'หน้าจอที่ 1: Asset Catalog & Barcode Scan',
            stepBadge: 'SCREEN 1 OF 4',
            desc: 'หน้ารายการครุภัณฑ์และอุปกรณ์ พร้อมปุ่มใหญ่สแกนบาร์โค้ด และฟิลเตอร์สถานะ [ทั้งหมด] [ว่าง] [ถูกยืม]',
            features: [
              'Top Bar: [≡] Smart Borrow [🔍]',
              'Scan Action: ปุ่มใหญ่ [📷 สแกนบาร์โค้ดหา]',
              'Filter Chips: [ทั้งหมด] [ว่าง] [ถูกยืม]',
              'Asset Card: กล้อง Sony A7 IV (สถานะ: ว่าง)',
              'Bottom Nav: [🏠คลังของ] [📑ประวัติยืม]'
            ],
            render: () => \`
              <div class="flex-1 flex flex-col justify-between text-xs font-sans">
                <div>
                  <div class="flex items-center justify-between pb-2 border-b border-zinc-200">
                    <span class="font-bold text-xs">[≡] Smart Borrow</span>
                    <span class="text-[10px]">🔍</span>
                  </div>
                  <div class="mt-2.5 p-2 bg-black text-white rounded-xl text-center text-[10px] font-bold flex items-center justify-center gap-1.5 cursor-pointer">
                    <span>📷</span>
                    <span>สแกนบาร์โค้ดหาครุภัณฑ์</span>
                  </div>
                  <div class="flex items-center gap-1 mt-2.5 text-[9px]">
                    <span class="px-2 py-0.5 rounded-full bg-zinc-200 font-bold">ทั้งหมด</span>
                    <span class="px-2 py-0.5 rounded-full bg-black text-white font-bold">ว่าง (8)</span>
                    <span class="px-2 py-0.5 rounded-full bg-zinc-200 text-zinc-500">ถูกยืม</span>
                  </div>
                  <div class="mt-2.5 space-y-2">
                    <div onclick="setSimStep(2)" class="p-2 rounded-xl border border-zinc-300 bg-zinc-50 cursor-pointer hover:border-black transition flex items-center gap-2">
                      <div class="w-12 h-12 rounded wireframe-img-box shrink-0"></div>
                      <div class="text-[10px] flex-1">
                        <div class="font-bold text-black">Sony Alpha A7 IV</div>
                        <div class="text-zinc-500 font-mono text-[9px]">#CAM-SONY-04</div>
                        <div class="text-[9px] font-bold text-green-700 mt-0.5">[ ว่าง พร้อมใช้งาน ]</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="pt-2 border-t border-zinc-200">
                  <button onclick="setSimStep(2)" class="w-full py-2 bg-black text-white text-[11px] font-bold rounded-xl text-center">
                    คลิกทำรายการยืมกล้อง →
                  </button>
                </div>
              </div>
            \`
          },
          {
            title: 'หน้าจอที่ 2: Asset Specification View',
            stepBadge: 'SCREEN 2 OF 4',
            desc: 'หน้ารายละเอียดสเปกครุภัณฑ์ ตำแหน่งตู้จัดเก็บจริง อุปกรณ์ส่วนควบในเซ็ต และปุ่มทำรายการยืม',
            features: [
              'Asset Code: #CAM-SONY-04',
              'Cabinet Location: ตู้ B2 ชั้น 3 แผนกคอมฯ',
              'Included Accessories: แบตเตอรี่ 2 ก้อน, แท่นชาร์จ',
              'Condition: สภาพดีมาก พร้อมใช้งาน',
              'Action Button: [ ทำรายการยืมชิ้นนี้ ]'
            ],
            render: () => \`
              <div class="flex-1 flex flex-col justify-between text-xs font-sans">
                <div>
                  <div class="flex items-center gap-2 pb-2 border-b border-zinc-200">
                    <button onclick="setSimStep(1)" class="font-bold text-xs">[←] รายละเอียดครุภัณฑ์</button>
                  </div>
                  <div class="w-full h-20 rounded-xl wireframe-img-box mt-2"></div>
                  <div class="mt-2 text-[10px]">
                    <div class="font-bold text-xs text-black">Sony Alpha A7 IV (Body)</div>
                    <div class="font-mono text-[9px] text-zinc-500">รหัส: #CAM-SONY-04</div>
                    <div class="mt-2 p-2 bg-zinc-100 rounded-lg space-y-1 text-[9px]">
                      <div><strong>ตำแหน่งเก็บ:</strong> ตู้เก็บอุปกรณ์ B2 แผนก</div>
                      <div><strong>อุปกรณ์ในเซ็ต:</strong> แบต 2 ก้อน, สายคล้อง, กระเป๋า</div>
                      <div><strong>สภาพ:</strong> สมบูรณ์ 100%</div>
                    </div>
                  </div>
                </div>
                <div class="pt-2 border-t border-zinc-200">
                  <button onclick="setSimStep(3)" class="w-full py-2 bg-black text-white text-[11px] font-bold rounded-xl text-center">
                    ทำรายการยืมชิ้นนี้ →
                  </button>
                </div>
              </div>
            \`
          },
          {
            title: 'หน้าจอที่ 3: Borrow Checkout & Signature',
            stepBadge: 'SCREEN 3 OF 4',
            desc: 'แบบฟอร์มบันทึกการยืมพัสดุ ระบุกำหนดส่งคืน วัตถุประสงค์การใช้งาน และช่องเซ็นชื่อดิจิทัล (Digital Signature)',
            features: [
              'Due Date Picker: กำหนดคืน 26 ต.ค. (16:30 น.)',
              'Purpose Field: ถ่ายภาพงานนิทรรศการ วท.',
              'Borrower: นายสมศักดิ์ ปวส.1/1',
              'Signature Box: กรอบสี่เหลี่ยมเซ็นลายมือชื่อ',
              'Submit CTA: [ บันทึกการยืมพัสดุ ]'
            ],
            render: () => \`
              <div class="flex-1 flex flex-col justify-between text-xs font-sans">
                <div>
                  <div class="flex items-center gap-2 pb-2 border-b border-zinc-200">
                    <button onclick="setSimStep(2)" class="font-bold text-xs">[←] แบบฟอร์มขอยืม</button>
                  </div>
                  <div class="mt-2 space-y-2 text-[10px]">
                    <div>
                      <label class="block text-zinc-600 font-bold mb-0.5">กำหนดส่งคืนภายใน:</label>
                      <div class="p-1.5 bg-zinc-50 border border-zinc-300 rounded font-mono">26 ต.ค. 2026 (16:30 น.)</div>
                    </div>
                    <div>
                      <label class="block text-zinc-600 font-bold mb-0.5">วัตถุประสงค์การใช้งาน:</label>
                      <div class="p-1.5 bg-zinc-50 border border-zinc-300 rounded">ถ่ายงานนิทรรศการวิชาการ</div>
                    </div>
                    <div>
                      <label class="block text-zinc-600 font-bold mb-0.5">ลายมือชื่อผู้ขอยืม (Digital Sign):</label>
                      <div class="h-14 bg-zinc-100 border border-dashed border-zinc-400 rounded flex items-center justify-center text-zinc-400 text-[9px]">
                        (เซ็นลายมือชื่อที่นี่)
                      </div>
                    </div>
                  </div>
                </div>
                <div class="pt-2 border-t border-zinc-200">
                  <button onclick="setSimStep(4)" class="w-full py-2 bg-black text-white text-[11px] font-bold rounded-xl text-center">
                    ยืนยันการยืมพัสดุ →
                  </button>
                </div>
              </div>
            \`
          },
          {
            title: 'หน้าจอที่ 4: Return QR Code Pass',
            stepBadge: 'SCREEN 4 OF 4',
            desc: 'ใบรับการยืมพัสดุดิจิทัล พร้อมรหัส QR Code สำหรับให้เจ้าหน้าที่สแกนรับของคืนได้อย่างรวดเร็ว',
            features: [
              'Return QR Code: สำหรับยิงสแกนตอนคืนพัสดุ',
              'Slip Reference: #BR-2026-092',
              'Borrower Details: นายสมศักดิ์ ปวส.1/1',
              'Due Date: 26 ต.ค. 16:30 น.',
              'Actions: [ ดาวน์โหลดใบยืม PDF ]'
            ],
            render: () => \`
              <div class="flex-1 flex flex-col justify-between text-xs font-sans text-center">
                <div class="py-2">
                  <div class="font-bold text-xs text-zinc-600 uppercase">หลักฐานการยืมพัสดุ</div>
                  <div class="font-mono text-xs text-black font-bold">#BR-2026-092</div>
                  <div class="w-20 h-20 mx-auto my-2.5 bg-zinc-100 border border-black flex items-center justify-center font-mono text-[9px] text-zinc-500">
                    [ QR CODE ]
                  </div>
                  <div class="p-2.5 bg-zinc-100 rounded-xl border border-zinc-200 text-left text-[9px] space-y-1">
                    <div><strong>อุปกรณ์:</strong> Sony A7 IV (#CAM-SONY-04)</div>
                    <div><strong>กำหนดคืน:</strong> 26 ต.ค. 2026 (16:30)</div>
                    <div><strong>สถานะ:</strong> [✓ ยืมสำเร็จ]</div>
                  </div>
                </div>
                <div class="pt-2 border-t border-zinc-200">
                  <button onclick="setSimStep(1)" class="w-full py-2 bg-black text-white text-[11px] font-bold rounded-xl text-center">
                    กลับหน้าหลัก (ทำรายการใหม่)
                  </button>
                </div>
              </div>
            \`
          }
        ]
      }
    };

    function updateSimulatorUI() {
      const model = simulatorData[currentSimModel];
      const screen = model.screens[currentSimStep - 1];

      // Update Screen Viewport
      const viewport = document.getElementById('phoneScreenViewport');
      viewport.innerHTML = screen.render();

      // Update Explanation Panel
      document.getElementById('simExplStepBadge').innerText = screen.stepBadge;
      document.getElementById('simExplModelBadge').innerText = model.name;
      document.getElementById('simExplTitle').innerText = screen.title;
      document.getElementById('simExplDesc').innerText = screen.desc;

      const featuresList = document.getElementById('simExplFeatures');
      featuresList.innerHTML = screen.features.map(f => '<li>' + f + '</li>').join('');

      // Update Steps button active styling
      for (let i = 1; i <= 4; i++) {
        const btn = document.getElementById('simStep' + i);
        if (i === currentSimStep) {
          btn.className = 'px-2.5 py-1.5 rounded-lg text-xs font-bold transition bg-red-100 text-[#FF0000]';
        } else {
          btn.className = 'px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#606060] hover:text-[#0F0F0F] transition';
        }
      }

      // Prev / Next button state
      document.getElementById('simPrevBtn').disabled = currentSimStep === 1;
      document.getElementById('simNextBtn').disabled = currentSimStep === 4;
      document.getElementById('simPrevBtn').style.opacity = currentSimStep === 1 ? '0.4' : '1';
      document.getElementById('simNextBtn').style.opacity = currentSimStep === 4 ? '0.4' : '1';
    }

    function setSimModel(modelKey) {
      currentSimModel = modelKey;
      ['brew', 'paws', 'borrow'].forEach((k, idx) => {
        const btn = document.getElementById('simModel' + (idx + 1));
        if (k === modelKey) {
          btn.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition bg-[#0F0F0F] text-white';
        } else {
          btn.className = 'px-3 py-1.5 rounded-lg text-xs font-medium text-[#606060] hover:text-[#0F0F0F] transition';
        }
      });
      updateSimulatorUI();
    }

    function setSimStep(stepNum) {
      currentSimStep = stepNum;
      updateSimulatorUI();
    }

    function stepSimulator(delta) {
      const nextStep = currentSimStep + delta;
      if (nextStep >= 1 && nextStep <= 4) {
        setSimStep(nextStep);
      }
    }

    // Initialize Simulator
    updateSimulatorUI();

    // 6. Interactive Self-Checklist with localStorage
    const CHECKLIST_KEY = 'curriculum_ch02_checklist';

    function loadChecklist() {
      try {
        const saved = JSON.parse(localStorage.getItem(CHECKLIST_KEY)) || {};
        for (let i = 1; i <= 6; i++) {
          const el = document.getElementById('chk' + i);
          if (el && saved['chk' + i]) {
            el.checked = true;
          }
        }
      } catch (e) {}
      renderChecklistProgress();
    }

    function updateChecklist() {
      const state = {};
      for (let i = 1; i <= 6; i++) {
        const el = document.getElementById('chk' + i);
        if (el) state['chk' + i] = el.checked;
      }
      try {
        localStorage.setItem(CHECKLIST_KEY, JSON.stringify(state));
      } catch (e) {}
      renderChecklistProgress();
    }

    function renderChecklistProgress() {
      let count = 0;
      for (let i = 1; i <= 6; i++) {
        const el = document.getElementById('chk' + i);
        if (el && el.checked) count++;
      }
      const pct = Math.round((count / 6) * 100);
      document.getElementById('checklistProgressText').innerText = count + ' / 6 รายการ (' + pct + '%)';
      document.getElementById('checklistProgressBar').style.width = pct + '%';
    }

    function resetChecklist() {
      if (confirm('คุณต้องการรีเซ็ตสถานะการตรวจสอบทั้งหมดหรือไม่?')) {
        for (let i = 1; i <= 6; i++) {
          const el = document.getElementById('chk' + i);
          if (el) el.checked = false;
        }
        try {
          localStorage.removeItem(CHECKLIST_KEY);
        } catch (e) {}
        renderChecklistProgress();
      }
    }

    loadChecklist();

    // 7. Interactive Rubric Calculator (5 criteria x 2 pts = 10 pts)
    function calculateRubric() {
      let total = 0;
      for (let i = 1; i <= 5; i++) {
        const selected = document.querySelector('input[name="rubric' + i + '"]:checked');
        if (selected) {
          total += parseInt(selected.value, 10);
        }
      }

      document.getElementById('rubricTotalScore').innerText = total;

      const badge = document.getElementById('rubricBadge');
      if (total >= 9) {
        badge.className = 'mt-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#2BA640] text-white';
        badge.innerHTML = '<span class="w-2 h-2 rounded-full bg-white animate-pulse"></span><span>ระดับดีเยี่ยม (Master / A+)</span>';
      } else if (total >= 7) {
        badge.className = 'mt-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#065FD4] text-white';
        badge.innerHTML = '<span class="w-2 h-2 rounded-full bg-white"></span><span>ระดับดี (Proficient / B)</span>';
      } else if (total >= 5) {
        badge.className = 'mt-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FB8C00] text-white';
        badge.innerHTML = '<span class="w-2 h-2 rounded-full bg-white"></span><span>ระดับผ่านเกณฑ์ (Basic / C)</span>';
      } else {
        badge.className = 'mt-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FF0000] text-white';
        badge.innerHTML = '<span class="w-2 h-2 rounded-full bg-white"></span><span>ต้องปรับปรุงและส่งตรวจใหม่ (Need Revision)</span>';
      }
    }

    calculateRubric();

    // 8. FAQ Accordion Toggle
    function toggleFaq(num) {
      const ans = document.getElementById('faqAns' + num);
      const icon = document.getElementById('faqIcon' + num);
      if (ans.classList.contains('hidden')) {
        ans.classList.remove('hidden');
        icon.innerText = '−';
      } else {
        ans.classList.add('hidden');
        icon.innerText = '+';
      }
    }

    // 9. One-Click Copy to Clipboard with Toast Feedback
    function copyToClipboard(text, btnElement) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
          showToast('คัดลอกลงคลิปบอร์ดแล้ว!');
          if (btnElement) {
            const originalText = btnElement.innerText;
            btnElement.innerText = 'คัดลอกแล้ว!';
            setTimeout(() => {
              btnElement.innerText = originalText;
            }, 2000);
          }
        }).catch(() => fallbackCopy(text));
      } else {
        fallbackCopy(text);
      }
    }

    function fallbackCopy(text) {
      const area = document.createElement('textarea');
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      document.body.removeChild(area);
      showToast('คัดลอกแล้ว!');
    }

    function showToast(msg) {
      const toast = document.getElementById('copyToast');
      document.getElementById('toastMsg').innerText = msg;
      toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-2');
      toast.classList.add('opacity-100', 'translate-y-0');
      setTimeout(() => {
        toast.classList.remove('opacity-100', 'translate-y-0');
        toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-2');
      }, 2500);
    }

    // 10. Social Simulation: Subscribe, Like, Share, Comment
    let subscribed = false;
    function subscribeCourse(btn) {
      subscribed = !subscribed;
      const text = document.getElementById('subText');
      if (subscribed) {
        btn.classList.add('bg-zinc-700');
        text.innerText = 'ติดตามแล้ว ✓';
        showToast('ติดตามรายวิชาเรียบร้อยแล้ว');
      } else {
        btn.classList.remove('bg-zinc-700');
        text.innerText = 'ติดตามรายวิชา';
      }
    }

    let liked = false;
    function toggleLike() {
      const countEl = document.getElementById('likeCount');
      const iconEl = document.getElementById('likeIcon');
      let current = parseInt(countEl.innerText, 10);
      if (!liked) {
        countEl.innerText = current + 1;
        iconEl.classList.remove('text-[#606060]');
        iconEl.classList.add('text-[#FF0000]', 'fill-current');
        liked = true;
        showToast('คุณถูกใจบทเรียนนี้');
      } else {
        countEl.innerText = current - 1;
        iconEl.classList.add('text-[#606060]');
        iconEl.classList.remove('text-[#FF0000]', 'fill-current');
        liked = false;
      }
    }

    function shareLesson() {
      if (navigator.share) {
        navigator.share({
          title: 'บทที่ 2: การออกแบบโครงสร้างหน้าจอ Wireframe ด้วย Figma',
          url: window.location.href
        }).catch(() => {});
      } else {
        copyToClipboard(window.location.href);
      }
    }

    function postComment() {
      const input = document.getElementById('commentInput');
      const val = input.value.trim();
      if (!val) return;

      const list = document.getElementById('commentList');
      const newComment = document.createElement('div');
      newComment.className = 'flex items-start gap-3';
      newComment.innerHTML = \`
        <div class="w-9 h-9 rounded-full bg-[#0F0F0F] text-white flex items-center justify-center font-bold text-xs shrink-0">ME</div>
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <span class="font-bold text-xs text-[#0F0F0F]">นักศึกษา (คุณ)</span>
            <span class="text-[11px] text-[#606060]">เมื่อสักครู่</span>
          </div>
          <p class="text-xs text-[#0F0F0F] leading-relaxed">\${escapeHtml(val)}</p>
          <div class="flex items-center gap-3 pt-1 text-xs text-[#606060]">
            <button class="hover:text-[#0F0F0F] flex items-center gap-1">👍 0</button>
            <button class="hover:text-[#0F0F0F]">ตอบกลับ</button>
          </div>
        </div>
      \`;
      list.prepend(newComment);
      input.value = '';
      showToast('โพสต์ความคิดเห็นแล้ว');
    }

    function clearComment() {
      document.getElementById('commentInput').value = '';
    }

    function escapeHtml(text) {
      const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
      return text.replace(/[&<>"']/g, m => map[m]);
    }

    // 11. Search Box Interaction
    document.getElementById('searchInput').addEventListener('keyup', function(e) {
      if (e.key === 'Enter') {
        const query = this.value.toLowerCase().trim();
        if (!query) return;
        if (window.find) {
          window.find(query);
        }
      }
    });
    document.getElementById('searchBtn').addEventListener('click', function() {
      const query = document.getElementById('searchInput').value.toLowerCase().trim();
      if (!query) return;
      if (window.find) {
        window.find(query);
      }
    });
  </script>
</body>
</html>
\`;

fs.writeFileSync(targetPath, html, 'utf8');
const stats = fs.statSync(targetPath);
console.log('File written successfully!');
console.log('File size:', (stats.size / 1024).toFixed(2), 'KB (Bytes:', stats.size, ')');
