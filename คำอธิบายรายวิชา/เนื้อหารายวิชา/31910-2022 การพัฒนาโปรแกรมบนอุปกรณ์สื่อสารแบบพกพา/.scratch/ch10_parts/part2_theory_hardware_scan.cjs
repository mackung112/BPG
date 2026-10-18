module.exports = `
        <!-- ───────────────────────────────────────────────────────────── -->
        <!-- LEARNING OBJECTIVES & 4-HOUR ROADMAP -->
        <!-- ───────────────────────────────────────────────────────────── -->
        <article id="learning-plan" class="scroll-mt-20 space-y-8">
          <!-- Section Badge -->
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF0000]">
            <span class="w-2.5 h-2.5 rounded-full bg-[#FF0000]"></span>
            <span>เป้าหมายและแผนผังการเรียนรู้สัปดาห์ที่ 10</span>
          </div>

          <div class="space-y-3">
            <h2 class="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F] tracking-tight">
              🎯 จุดประสงค์การเรียนรู้ประจำบท (Learning Objectives)
            </h2>
            <p class="text-sm sm:text-base text-[#606060] leading-relaxed">
              เมื่อศึกษาบทเรียนนี้และปฏิบัติการตามขั้นตอนเสร็จสิ้น ผู้เรียนจะมีสมรรถนะเชิงวิชาชีพครบถ้วนทั้ง 8 มิติ:
            </p>
          </div>

          <!-- 8 Objectives Grid Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div class="p-4 rounded-2xl bg-zinc-50 border border-[#E5E5E5] flex items-start gap-3 hover:border-red-300 transition group">
              <span class="w-6 h-6 rounded-full bg-[#0F0F0F] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 group-hover:bg-[#FF0000] transition">1</span>
              <div>
                <div class="font-bold text-[#0F0F0F] text-sm mb-1">Hardware Adapter Pattern</div>
                <p class="text-[#606060] leading-relaxed">อธิบายสถาปัตยกรรม Hardware Adapter Pattern ในการเปลี่ยนกล้องสมาร์ตโฟนและหน้าจอสัมผัสให้เป็นอุปกรณ์ทำงานทางธุรกิจ (Mobile POS & Signature Capture Pad) ได้อย่างถูกต้อง</p>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-zinc-50 border border-[#E5E5E5] flex items-start gap-3 hover:border-red-300 transition group">
              <span class="w-6 h-6 rounded-full bg-[#0F0F0F] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 group-hover:bg-[#FF0000] transition">2</span>
              <div>
                <div class="font-bold text-[#0F0F0F] text-sm mb-1">Scannable? [✓] Configuration</div>
                <p class="text-[#606060] leading-relaxed">เปิดใช้งานคุณสมบัติ <code class="bg-red-50 text-[#FF0000] px-1.5 py-0.5 rounded font-mono font-bold">Scannable? [✓]</code> บนคอลัมน์ข้อมูลใน AppSheet เพื่อเปิดกล้องสแกน Barcode/QR Code ได้อัตโนมัติทั้งในหน้า Search และ Form</p>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-zinc-50 border border-[#E5E5E5] flex items-start gap-3 hover:border-red-300 transition group">
              <span class="w-6 h-6 rounded-full bg-[#0F0F0F] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 group-hover:bg-[#FF0000] transition">3</span>
              <div>
                <div class="font-bold text-[#0F0F0F] text-sm mb-1">Fast Scan-to-Lookup Pattern</div>
                <p class="text-[#606060] leading-relaxed">ประยุกต์ใช้รูปแบบ Fast Scan-to-Lookup Pattern เพื่อค้นหาข้อมูลสินค้า ประวัติลูกค้า หรือครุภัณฑ์ได้ในเสี้ยววินาทีโดยไม่ต้องพิมพ์ตัวอักษรแม้แต่ตัวเดียว</p>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-zinc-50 border border-[#E5E5E5] flex items-start gap-3 hover:border-red-300 transition group">
              <span class="w-6 h-6 rounded-full bg-[#0F0F0F] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 group-hover:bg-[#FF0000] transition">4</span>
              <div>
                <div class="font-bold text-[#0F0F0F] text-sm mb-1">Signature Column & Touch Canvas</div>
                <p class="text-[#606060] leading-relaxed">สร้างและกำหนดค่าคอลัมน์ประเภท <code class="bg-blue-50 text-[#065FD4] px-1.5 py-0.5 rounded font-mono font-bold">Signature</code> (ลายมือชื่อดิจิทัล) สำหรับให้ลูกค้าหรือผู้รับบริการเซ็นนิ้วมือลงบนหน้าจอสมาร์ตโฟนได้อย่างลื่นไหล</p>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-zinc-50 border border-[#E5E5E5] flex items-start gap-3 hover:border-red-300 transition group">
              <span class="w-6 h-6 rounded-full bg-[#0F0F0F] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 group-hover:bg-[#FF0000] transition">5</span>
              <div>
                <div class="font-bold text-[#0F0F0F] text-sm mb-1">Audit Trail & Non-repudiation</div>
                <p class="text-[#606060] leading-relaxed">ผูกกลไก Audit Trail & Non-repudiation เพื่อบันทึกภาพลายเซ็นคู่กับวันเวลา <code class="bg-zinc-200 text-[#0F0F0F] px-1.5 py-0.5 rounded font-mono font-bold">NOW()</code> ลง Google Drive อัตโนมัติและล็อกห้ามแก้ไขด้วยสูตร <code class="bg-amber-50 text-amber-900 px-1.5 py-0.5 rounded font-mono font-bold">ISBLANK([_THIS])</code></p>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-zinc-50 border border-[#E5E5E5] flex items-start gap-3 hover:border-red-300 transition group">
              <span class="w-6 h-6 rounded-full bg-[#0F0F0F] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 group-hover:bg-[#FF0000] transition">6</span>
              <div>
                <div class="font-bold text-[#0F0F0F] text-sm mb-1">3 Business Archetypes Integration</div>
                <p class="text-[#606060] leading-relaxed">พัฒนาระบบสแกนบาร์โค้ดและเซ็นชื่อรับมอบสิ่งของตามบริบทของ 3 รูปแบบธุรกิจ (Fresh Brew, Happy Paws, Smart Borrow) ได้อย่างสมบูรณ์แบบ</p>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-zinc-50 border border-[#E5E5E5] flex items-start gap-3 hover:border-red-300 transition group">
              <span class="w-6 h-6 rounded-full bg-[#0F0F0F] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 group-hover:bg-[#FF0000] transition">7</span>
              <div>
                <div class="font-bold text-[#0F0F0F] text-sm mb-1">Hardware Diagnostics & Permissions</div>
                <p class="text-[#606060] leading-relaxed">วินิจฉัยและแก้ไขปัญหาเชิงเทคนิคฮาร์ดแวร์ เช่น การขอสิทธิ์เข้าถึงกล้อง (Camera Permission), ปัญหาแสงสะท้อน, และการตรวจสอบไฟล์ภาพบน Google Drive</p>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-zinc-50 border border-[#E5E5E5] flex items-start gap-3 hover:border-red-300 transition group">
              <span class="w-6 h-6 rounded-full bg-[#0F0F0F] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 group-hover:bg-[#FF0000] transition">8</span>
              <div>
                <div class="font-bold text-[#0F0F0F] text-sm mb-1">Agile Triad & Device Validation</div>
                <p class="text-[#606060] leading-relaxed">ร่วมมือกันในทีม 3 คน ทดสอบระบบสแกนและเซ็นชื่อบนสมาร์ตโฟนเครื่องจริง และส่งมอบผลงานตามเกณฑ์ประเมินรูบริก 10 คะแนนเต็ม</p>
              </div>
            </div>
          </div>

          <!-- 4-Hour Roadmap Section -->
          <div class="mt-8 pt-6 border-t border-[#E5E5E5] space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-bold text-[#0F0F0F] flex items-center gap-2">
                <svg class="w-5 h-5 text-[#FF0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>แผนผังการเรียนรู้สัปดาห์ที่ 10 (Roadmap 4 ชั่วโมง)</span>
              </h3>
              <span class="text-xs text-[#606060] font-mono">ภาคปฏิบัติ 100% On-Device</span>
            </div>

            <!-- Flow Cards: 4 Hours -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <!-- Hour 1 -->
              <div class="p-4 rounded-2xl bg-white border-2 border-red-100 shadow-sm relative overflow-hidden flex flex-col justify-between">
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="px-2 py-0.5 rounded bg-red-100 text-[#FF0000] text-[10px] font-black uppercase">ชั่วโมงที่ 1</span>
                    <span class="text-[10px] text-[#606060] font-mono">60 นาที</span>
                  </div>
                  <h4 class="font-bold text-sm text-[#0F0F0F]">สถาปัตยกรรม Hardware Adapter & การสแกน</h4>
                  <ul class="text-[11px] text-[#606060] space-y-1 list-disc pl-4">
                    <li>ทำความเข้าใจ Mobile Hardware Adapter</li>
                    <li>โครงสร้างรหัส 1D Barcode & 2D QR Code</li>
                    <li>เปิดใช้งาน Scannable? [✓] บนคอลัมน์</li>
                  </ul>
                </div>
                <div class="mt-4 pt-2 border-t border-zinc-100 text-[10px] font-bold text-[#FF0000] flex items-center gap-1">
                  <span>เป้าหมาย: กล้องเปิดได้ ➔</span>
                </div>
              </div>

              <!-- Hour 2 -->
              <div class="p-4 rounded-2xl bg-white border-2 border-blue-100 shadow-sm relative overflow-hidden flex flex-col justify-between">
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="px-2 py-0.5 rounded bg-blue-100 text-[#065FD4] text-[10px] font-black uppercase">ชั่วโมงที่ 2</span>
                    <span class="text-[10px] text-[#606060] font-mono">60 นาที</span>
                  </div>
                  <h4 class="font-bold text-sm text-[#0F0F0F]">ระบบลายเซ็นดิจิทัล (Digital Signature)</h4>
                  <ul class="text-[11px] text-[#606060] space-y-1 list-disc pl-4">
                    <li>คอลัมน์ประเภท Signature บน Touch Canvas</li>
                    <li>การจัดเก็บภาพ PNG ขึ้น Google Drive</li>
                    <li>Audit Trail: Timestamp & ISBLANK Lock</li>
                  </ul>
                </div>
                <div class="mt-4 pt-2 border-t border-zinc-100 text-[10px] font-bold text-[#065FD4] flex items-center gap-1">
                  <span>เป้าหมาย: เซ็นติด & บันทึกเวลา ➔</span>
                </div>
              </div>

              <!-- Hour 3 -->
              <div class="p-4 rounded-2xl bg-white border-2 border-emerald-100 shadow-sm relative overflow-hidden flex flex-col justify-between">
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="px-2 py-0.5 rounded bg-emerald-100 text-[#2BA640] text-[10px] font-black uppercase">ชั่วโมงที่ 3</span>
                    <span class="text-[10px] text-[#606060] font-mono">60 นาที</span>
                  </div>
                  <h4 class="font-bold text-sm text-[#0F0F0F]">เวิร์กช็อป 3 รูปแบบธุรกิจ (Archetypes)</h4>
                  <ul class="text-[11px] text-[#606060] space-y-1 list-disc pl-4">
                    <li>Fresh Brew: บาร์โค้ดสินค้า & เซ็นเดลิเวอรี่</li>
                    <li>Happy Paws: QR Tag ปลอกคอ & เซ็นยินยอม</li>
                    <li>Smart Borrow: Barcode ครุภัณฑ์ & เซ็น 2 จังหวะ</li>
                  </ul>
                </div>
                <div class="mt-4 pt-2 border-t border-zinc-100 text-[10px] font-bold text-[#2BA640] flex items-center gap-1">
                  <span>เป้าหมาย: ฟังก์ชันครบตามโมเดล ➔</span>
                </div>
              </div>

              <!-- Hour 4 -->
              <div class="p-4 rounded-2xl bg-white border-2 border-amber-100 shadow-sm relative overflow-hidden flex flex-col justify-between">
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="px-2 py-0.5 rounded bg-amber-100 text-[#FB8C00] text-[10px] font-black uppercase">ชั่วโมงที่ 4</span>
                    <span class="text-[10px] text-[#606060] font-mono">60 นาที</span>
                  </div>
                  <h4 class="font-bold text-sm text-[#0F0F0F]">ทดสอบมือถือจริง & ประเมินรูบริก</h4>
                  <ul class="text-[11px] text-[#606060] space-y-1 list-disc pl-4">
                    <li>พิมพ์/เปิด QR Code ทดสอบยิงกล้องจริง</li>
                    <li>ตรวจสอบไฟล์ภาพ PNG ใน Drive</li>
                    <li>ตรวจ Self-Checklist & รูบริก 10 คะแนน</li>
                  </ul>
                </div>
                <div class="mt-4 pt-2 border-t border-zinc-100 text-[10px] font-bold text-[#FB8C00] flex items-center gap-1">
                  <span>เป้าหมาย: ผ่านเกณฑ์ 10 คะแนนเต็ม ✓</span>
                </div>
              </div>
            </div>
          </div>
        </article>

        <!-- ───────────────────────────────────────────────────────────── -->
        <!-- SECTION 1: HARDWARE ADAPTER PATTERN -->
        <!-- ───────────────────────────────────────────────────────────── -->
        <article id="hardware-adapter" class="scroll-mt-20 space-y-6 pt-10 border-t border-[#E5E5E5]">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF0000]">
            <span>หัวข้อที่ 1</span>
          </div>

          <div class="space-y-3">
            <h2 class="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F] tracking-tight">
              1. สถาปัตยกรรม Hardware Adapter บนอุปกรณ์พกพา
            </h2>
            <p class="text-sm sm:text-base text-[#606060] leading-relaxed">
              ในอดีต องค์กรธุรกิจที่ต้องการทำระบบบริหารคลังสินค้า หรือร้านอาหารที่ต้องการระบบจุดขาย (Point of Sale : POS) จำเป็นต้องลงทุนจัดซื้ออุปกรณ์ฮาร์ดแวร์เฉพาะทางราคาแพงมหาศาล เช่น <strong>เครื่องยิงเลเซอร์มือถือ (Handheld Barcode Scanner)</strong> ราคา 8,000 - 25,000 บาท หรือ <strong>แท็บเล็ตเซ็นชื่อเฉพาะทาง (Dedicated Signature Pad เช่น Wacom/Topaz)</strong> ราคา 6,000 - 15,000 บาท ซึ่งเป็นอุปสรรคสำคัญสำหรับวิสาหกิจชุมชนและธุรกิจขนาดเล็ก
            </p>
          </div>

          <!-- Conceptual Comparison Architecture Card -->
          <div class="p-6 rounded-2xl bg-zinc-900 text-white space-y-6 shadow-xl border border-zinc-800">
            <div class="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span class="text-xs font-bold uppercase tracking-wider text-[#FF0000] flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-[#FF0000] animate-pulse"></span>
                Hardware Adapter Architecture: การแปลงอุปกรณ์พกพาสู่เครื่องมือระดับ Enterprise
              </span>
              <span class="text-[10px] font-mono text-zinc-400">Zero-Hardware Overhead</span>
            </div>

            <!-- Comparison Table -->
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead>
                  <tr class="border-b border-zinc-800 text-zinc-400">
                    <th class="py-3 px-3">มิติการเปรียบเทียบ</th>
                    <th class="py-3 px-3 text-red-300">อุปกรณ์แบบดั้งเดิม (Legacy Hardware)</th>
                    <th class="py-3 px-3 text-emerald-400">ฮาร์ดแวร์บนสมาร์ตโฟน (Mobile Adapter)</th>
                    <th class="py-3 px-3 text-zinc-300">บทบาทใน AppSheet</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-zinc-800 text-zinc-300">
                  <tr>
                    <td class="py-3 px-3 font-bold text-white">1. สแกนบาร์โค้ดสินค้า</td>
                    <td class="py-3 px-3">เครื่องยิงแสงเลเซอร์ (Laser Diode) ต่อสาย USB/บลูทูธ</td>
                    <td class="py-3 px-3 text-emerald-300 font-bold">เลนส์กล้องมือถือ (CMOS Camera Sensor)</td>
                    <td class="py-3 px-3">เปิดกล้องสแกน Barcode/QR ถอดรหัสสู่ Text ทันที</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-3 font-bold text-white">2. เซ็นชื่อรับมอบเอกสาร</td>
                    <td class="py-3 px-3">แท็บเล็ตเซ็นชื่อเฉพาะ (Resistive Signature Pad)</td>
                    <td class="py-3 px-3 text-emerald-300 font-bold">กระจกหน้าจอสัมผัส (Capacitive Touchscreen)</td>
                    <td class="py-3 px-3">วาดนิ้วบน Canvas Pad แปลงเป็นไฟล์ภาพ PNG</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-3 font-bold text-white">3. ต้นทุนต่อสถานีงาน</td>
                    <td class="py-3 px-3 text-red-400 font-bold">15,000 - 40,000 บาท/คน</td>
                    <td class="py-3 px-3 text-emerald-400 font-bold">0 บาท (ใช้สมาร์ตโฟนส่วนตัว BYOD)</td>
                    <td class="py-3 px-3">ลดต้นทุนลงได้มากกว่า 95%</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-3 font-bold text-white">4. ความคล่องตัวในการทำงาน</td>
                    <td class="py-3 px-3">จำกัดอยู่เฉพาะที่เคาน์เตอร์ หรือระยะสายสัญญาณ</td>
                    <td class="py-3 px-3 text-emerald-300">พกพาไปได้ทุกที่ในไซต์งาน หรือส่งเดลิเวอรี่</td>
                    <td class="py-3 px-3">ทำงานกลางแจ้งและออฟไลน์ได้ 100%</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-3 font-bold text-white">5. การบันทึกและซิงก์ข้อมูล</td>
                    <td class="py-3 px-3">ต้องรอดัมป์ข้อมูลผ่านโปรแกรมไดรเวอร์เฉพาะ</td>
                    <td class="py-3 px-3 text-emerald-300">ส่งตรงเข้า Google Sheets และ Google Drive</td>
                    <td class="py-3 px-3">Real-time Cloud Synchronization</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Technical Insight Box -->
            <div class="p-3.5 rounded-xl bg-zinc-800/80 border border-zinc-700 text-xs text-zinc-300 leading-relaxed flex items-start gap-2.5">
              <span class="text-[#FF0000] text-base shrink-0">💡</span>
              <div>
                <strong class="text-white">หลักการทางวิศวกรรม (OS-Level Abstraction):</strong> 
                AppSheet ทำงานเป็นสะพานเชื่อม (Bridge) ข้ามระหว่างตัวอ่านเซนเซอร์ระดับระบบปฏิบัติการ (Android CameraX / iOS AVFoundation Framework) กับผืนผ้าใบ HTML5 Touch Events ทำให้แอปพลิเคชันไม่ต้องเขียนโค้ดภาษา Native หลายพันบรรทัด แต่สามารถเรียกใช้เซนเซอร์กล้องและหน้าจอสัมผัสได้ผ่านคุณสมบัติระดับคอลัมน์เพียงบรรทัดเดียว
              </div>
            </div>
          </div>
        </article>

        <!-- ───────────────────────────────────────────────────────────── -->
        <!-- SECTION 2: FAST SCAN-TO-LOOKUP PATTERN -->
        <!-- ───────────────────────────────────────────────────────────── -->
        <article id="fast-scan-lookup" class="scroll-mt-20 space-y-8 pt-10 border-t border-[#E5E5E5]">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF0000]">
            <span>หัวข้อที่ 2</span>
          </div>

          <div class="space-y-3">
            <h2 class="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F] tracking-tight">
              2. การสแกน Barcode/QR Code (Fast Scan-to-Lookup Pattern)
            </h2>
            <p class="text-sm sm:text-base text-[#606060] leading-relaxed">
              ปัญหาคอขวดที่ใหญ่ที่สุดของการใช้งานแอปบนอุปกรณ์สื่อสารแบบพกพา คือ <strong>"การพิมพ์ข้อมูลด้วยแป้นพิมพ์เสมือน (Soft Keyboard)"</strong> ซึ่งพิมพ์ช้า เกิดความผิดพลาดง่าย (Fat-finger syndrome) และสร้างความหงุดหงิดให้กับผู้ใช้งานหน้างานอย่างมาก รูปแบบ <strong>Fast Scan-to-Lookup Pattern</strong> ถูกออกแบบขึ้นเพื่อขจัดปัญหานี้ โดยการเปลี่ยนการพิมพ์ตัวอักษร 13 หลัก ให้เหลือเพียงการเล็งกล้อง 1 วินาที!
            </p>
          </div>

          <!-- Sub-topic 2.1 -->
          <div class="space-y-4">
            <h3 class="text-lg font-bold text-[#0F0F0F] flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-[#FF0000]"></span>
              <span>2.1 คอลัมน์ที่รองรับการสแกน และการตั้งค่า [✓] Scannable?</span>
            </h3>
            <p class="text-xs sm:text-sm text-[#606060] leading-relaxed">
              ใน AppSheet เราสามารถเปิดความสามารถให้คอลัมน์ใดๆ รับค่าจากการสแกนกล้องได้ โดยเฉพาะคอลัมน์ประเภท <code class="bg-zinc-100 text-[#0F0F0F] px-1.5 py-0.5 rounded font-mono font-bold">Text</code> หรือ <code class="bg-zinc-100 text-[#0F0F0F] px-1.5 py-0.5 rounded font-mono font-bold">Ref</code> โดยเข้าไปที่ <strong>Data ➔ Columns</strong> แล้วมองหาคอลัมน์ที่ต้องการ จากนั้นติ๊กเครื่องหมายถูกที่ช่อง:
            </p>

            <div class="p-4 rounded-xl bg-red-50/60 border border-red-200 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-[#FF0000] text-white flex items-center justify-center font-bold">✓</div>
                <div>
                  <div class="font-mono font-bold text-sm text-[#0F0F0F]">[✓] Scannable?</div>
                  <div class="text-xs text-[#606060]">อนุญาตให้ผู้ใช้เปิดกล้องเพื่อยิงบาร์โค้ดใส่ค่าลงในคอลัมน์นี้</div>
                </div>
              </div>
              <span class="text-xs bg-white px-3 py-1 rounded-full border border-red-200 font-bold text-[#FF0000]">AppSheet Built-in</span>
            </div>

            <!-- Scannable Behavior Table -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
              <div class="p-4 rounded-2xl bg-zinc-50 border border-[#E5E5E5] space-y-2">
                <div class="flex items-center gap-2 font-bold text-[#0F0F0F] text-sm">
                  <span class="w-6 h-6 rounded-lg bg-zinc-800 text-white flex items-center justify-center">🔍</span>
                  <span>1. ในหน้าค้นหาหลัก (Search View)</span>
                </div>
                <p class="text-[#606060] leading-relaxed">
                  หากคอลัมน์นั้นถูกเปิดทั้ง <code class="bg-zinc-200 px-1 rounded font-bold">[✓] Search?</code> และ <code class="bg-zinc-200 px-1 rounded font-bold">[✓] Scannable?</code> ไอคอนรูปกล้องสแกนเนอร์จะปรากฏขึ้นที่ <strong>ริมขวาของช่องค้นหา (Search Bar)</strong> บนหัวหน้าจอ เมื่อแตะปุ่มนี้ กล้องจะเปิดขึ้นมาทันที เมื่อยิงโค้ดติด ระบบจะกรองตารางข้อมูลและเปิดหน้ารายละเอียดของเรคคอร์ดนั้นขึ้นมาทันทีโดยไม่ต้องกดปุ่มค้นหาซ้ำ
                </p>
              </div>

              <div class="p-4 rounded-2xl bg-zinc-50 border border-[#E5E5E5] space-y-2">
                <div class="flex items-center gap-2 font-bold text-[#0F0F0F] text-sm">
                  <span class="w-6 h-6 rounded-lg bg-zinc-800 text-white flex items-center justify-center">📝</span>
                  <span>2. ในหน้าฟอร์มกรอกข้อมูล (Form View)</span>
                </div>
                <p class="text-[#606060] leading-relaxed">
                  ข้างกล่องข้อความกรอกข้อมูลจะมี <strong>ไอคอนรูปกล้องถ่ายภาพ [📷 สแกน]</strong> ปรากฏขึ้นมาอย่างเด่นชัด เมื่อผู้ใช้แตะปุ่มนี้ หน้าจอจะสลับเป็นวิวกล้องเล็งบาร์โค้ดทันที เมื่อตรวจพบรหัส ตัวเลขหรือข้อความจะถูกนำมาพิมพ์ลงในช่องนี้โดยอัตโนมัติ 100% ป้องกันข้อผิดพลาดจากการพิมพ์ตกหล่นได้อย่างสิ้นเชิง
                </p>
              </div>
            </div>
          </div>

          <!-- Sub-topic 2.2: Sequence Diagram of Scan-to-Lookup -->
          <div class="space-y-4 pt-4">
            <h3 class="text-lg font-bold text-[#0F0F0F] flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-[#FF0000]"></span>
              <span>2.2 ลำดับวงจรการทำงาน Fast Scan-to-Lookup Lifecycle</span>
            </h3>
            <p class="text-xs sm:text-sm text-[#606060] leading-relaxed">
              ภาพจำลองกระบวนการทำงานแบบเป็นลำดับขั้น (Sequence Flow) จากจังหวะที่พนักงานจรดเลนส์กล้องจนถึงการดึงข้อมูลออกมาแสดงผล:
            </p>

            <!-- Visual Flow Diagram -->
            <div class="p-6 rounded-2xl bg-[#0F0F0F] text-white space-y-4">
              <div class="text-xs font-mono text-zinc-400 border-b border-zinc-800 pb-2 flex items-center justify-between">
                <span>FAST SCAN-TO-LOOKUP SEQUENCE PIPELINE</span>
                <span class="text-emerald-400 font-bold">Latency: &lt; 0.4s</span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center text-xs">
                <!-- Step 1 -->
                <div class="p-3 rounded-xl bg-zinc-800/80 border border-zinc-700 flex flex-col justify-between">
                  <div class="w-7 h-7 mx-auto rounded-full bg-[#FF0000] text-white flex items-center justify-center font-bold text-xs mb-2">1</div>
                  <div class="font-bold text-white mb-1">ผู้ใช้แตะไอคอน</div>
                  <div class="text-[11px] text-zinc-400 leading-snug">แตะสัญลักษณ์รูปกล้องสแกนเนอร์ที่ช่องค้นหาหรือฟอร์ม</div>
                </div>

                <!-- Step 2 -->
                <div class="p-3 rounded-xl bg-zinc-800/80 border border-zinc-700 flex flex-col justify-between">
                  <div class="w-7 h-7 mx-auto rounded-full bg-zinc-700 text-white flex items-center justify-center font-bold text-xs mb-2">2</div>
                  <div class="font-bold text-white mb-1">กล้องจับภาพ & ถอดรหัส</div>
                  <div class="text-[11px] text-zinc-400 leading-snug">สแกนเนอร์วิเคราะห์แถบขาวดำแปลงเป็นสตริงรหัส "PROD-102"</div>
                </div>

                <!-- Step 3 -->
                <div class="p-3 rounded-xl bg-zinc-800/80 border border-zinc-700 flex flex-col justify-between">
                  <div class="w-7 h-7 mx-auto rounded-full bg-zinc-700 text-white flex items-center justify-center font-bold text-xs mb-2">3</div>
                  <div class="font-bold text-white mb-1">ส่ง Query ค้นหา</div>
                  <div class="text-[11px] text-zinc-400 leading-snug">AppSheet ค้นหาแถวในตาราง Products ที่ Barcode ตรงกัน</div>
                </div>

                <!-- Step 4 -->
                <div class="p-3 rounded-xl bg-zinc-800/80 border border-zinc-700 flex flex-col justify-between">
                  <div class="w-7 h-7 mx-auto rounded-full bg-zinc-700 text-white flex items-center justify-center font-bold text-xs mb-2">4</div>
                  <div class="font-bold text-white mb-1">ดึงสคีมาข้อมูล</div>
                  <div class="text-[11px] text-zinc-400 leading-snug">โหลดชื่อสินค้า, ราคาต่อหน่วย, รูปภาพ, และยอดสต๊อกคงเหลือ</div>
                </div>

                <!-- Step 5 -->
                <div class="p-3 rounded-xl bg-emerald-950/80 border border-emerald-700 text-emerald-200 flex flex-col justify-between">
                  <div class="w-7 h-7 mx-auto rounded-full bg-[#2BA640] text-white flex items-center justify-center font-bold text-xs mb-2">5</div>
                  <div class="font-bold text-white mb-1">เรนเดอร์หน้าจอ Detail</div>
                  <div class="text-[11px] text-emerald-300 leading-snug">เปิดหน้าข้อมูลสินค้าพร้อมปุ่ม Add to Cart ทันที!</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sub-topic 2.3: Formulas for Barcode Lookup -->
          <div class="space-y-4 pt-4">
            <h3 class="text-lg font-bold text-[#0F0F0F] flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-[#FF0000]"></span>
              <span>2.3 สูตรและฟังก์ชันสำหรับ Scan-to-Lookup (AppSheet Formulas)</span>
            </h3>
            <p class="text-xs sm:text-sm text-[#606060] leading-relaxed">
              เมื่อเราสแกนรหัสบาร์โค้ดลงในคอลัมน์แล้ว เราสามารถใช้สูตรของ AppSheet เพื่อดึงข้อมูลประกอบอื่นๆ (เช่น ชื่อสินค้า หรือราคาต่อหน่วย) มาใส่ในช่องฟอร์มโดยอัตโนมัติ:
            </p>

            <!-- Formula Cards with One-Click Copy -->
            <div class="space-y-3 text-xs">
              <!-- Formula 1: LOOKUP -->
              <div class="p-4 rounded-xl bg-zinc-50 border border-[#E5E5E5] space-y-2">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-[#0F0F0F] flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-[#065FD4]"></span>
                    สูตรที่ 1: ดึงชื่อสินค้าจากตาราง Products ด้วยคำสั่ง LOOKUP()
                  </span>
                  <button onclick="copyText('LOOKUP([_THISROW].[Scanned_Barcode], &quot;Products&quot;, &quot;Barcode&quot;, &quot;Product_Name&quot;)', this)" class="text-xs text-[#065FD4] hover:underline flex items-center gap-1 font-mono">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                    <span>คัดลอกสูตร</span>
                  </button>
                </div>
                <pre class="p-3 rounded-lg bg-[#0F0F0F] text-emerald-400 font-mono text-[11px] overflow-x-auto"><code>LOOKUP([_THISROW].[Scanned_Barcode], "Products", "Barcode", "Product_Name")</code></pre>
                <p class="text-[#606060] text-[11px]">
                  <strong>คำอธิบาย:</strong> ค้นหาในตาราง <code>Products</code> ที่คอลัมน์ <code>Barcode</code> ตรงกับค่าที่เพิ่งสแกนเข้ามา แล้วดึงเอาค่าจากคอลัมน์ <code>Product_Name</code> มาแสดง
                </p>
              </div>

              <!-- Formula 2: ANY(SELECT(...)) -->
              <div class="p-4 rounded-xl bg-zinc-50 border border-[#E5E5E5] space-y-2">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-[#0F0F0F] flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-[#065FD4]"></span>
                    สูตรที่ 2: ดึงราคาต่อหน่วยด้วยคำสั่ง ANY(SELECT(...))
                  </span>
                  <button onclick="copyText('ANY(SELECT(Products[Unit_Price], [Barcode] = [_THISROW].[Scanned_Barcode]))', this)" class="text-xs text-[#065FD4] hover:underline flex items-center gap-1 font-mono">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                    <span>คัดลอกสูตร</span>
                  </button>
                </div>
                <pre class="p-3 rounded-lg bg-[#0F0F0F] text-emerald-400 font-mono text-[11px] overflow-x-auto"><code>ANY(SELECT(Products[Unit_Price], [Barcode] = [_THISROW].[Scanned_Barcode]))</code></pre>
                <p class="text-[#606060] text-[11px]">
                  <strong>คำอธิบาย:</strong> เลือกค่า <code>Unit_Price</code> จากตาราง <code>Products</code> โดยมีเงื่อนไขว่า <code>Barcode</code> ต้องตรงกับรหัสที่สแกนมา แล้วดึงเอาค่าแรกที่พบด้วยคำสั่ง <code>ANY()</code>
                </p>
              </div>

              <!-- Formula 3: Dereferencing with Ref -->
              <div class="p-4 rounded-xl bg-zinc-50 border border-[#E5E5E5] space-y-2">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-[#0F0F0F] flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-[#2BA640]"></span>
                    วิธีที่ดีที่สุด (Best Practice): การใช้ Dereference Expressions ผ่านความสัมพันธ์ Ref
                  </span>
                  <button onclick="copyText('[Product_ID].[Unit_Price]', this)" class="text-xs text-[#065FD4] hover:underline flex items-center gap-1 font-mono">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                    <span>คัดลอกนิพจน์</span>
                  </button>
                </div>
                <pre class="p-3 rounded-lg bg-[#0F0F0F] text-emerald-400 font-mono text-[11px] overflow-x-auto"><code>[Product_ID].[Unit_Price]</code></pre>
                <p class="text-[#606060] text-[11px]">
                  <strong>คำอธิบาย:</strong> หากคอลัมน์ <code>Product_ID</code> ถูกกำหนดชนิดเป็น <code>Ref</code> ชี้ไปยังตาราง <code>Products</code> เมื่อเราติ๊ก <code>Scannable?</code> ที่คอลัมน์ <code>Product_ID</code> การยิงบาร์โค้ดจะเลือกสินค้านั้นทันที และคอลัมน์ที่ผูกด้วยเครื่องหมายจุด (Dereference) จะดึงราคา, หมวดหมู่, และรูปภาพมาแสดงผลโดยอัตโนมัติ 0-latency!
                </p>
              </div>
            </div>
          </div>
        </article>
`;
