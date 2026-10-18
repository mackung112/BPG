module.exports = `
        <!-- ───────────────────────────────────────────────────────────── -->
        <!-- SECTION 3: DIGITAL SIGNATURE & TOUCH CANVAS -->
        <!-- ───────────────────────────────────────────────────────────── -->
        <article id="digital-signature" class="scroll-mt-20 space-y-8 pt-10 border-t border-[#E5E5E5]">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF0000]">
            <span>หัวข้อที่ 3</span>
          </div>

          <div class="space-y-3">
            <h2 class="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F] tracking-tight">
              3. ระบบลายเซ็นดิจิทัล (Digital Signature & Touch Canvas)
            </h2>
            <p class="text-sm sm:text-base text-[#606060] leading-relaxed">
              ในกระบวนการทางธุรกิจจริง ไม่ว่าจะเป็นการส่งมอบสินค้าพัสดุ (Proof of Delivery), การยินยอมรับการรักษาพยาบาลสัตว์เลี้ยง (Consent Form), หรือการเบิกยืมครุภัณฑ์มูลค่าสูง (Equipment Sign-off) <strong>"ลายมือชื่อ (Signature)"</strong> คือหลักฐานเชิงประจักษ์ที่ยืนยันความรับผิดชอบและการทำธุรกรรมที่สมบูรณ์ตามกฎหมาย
            </p>
          </div>

          <!-- Sub-topic 3.1 -->
          <div class="space-y-4">
            <h3 class="text-lg font-bold text-[#0F0F0F] flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-[#FF0000]"></span>
              <span>3.1 การกำหนดค่าคอลัมน์ประเภท Signature และการทำงานของผืนผ้าใบสัมผัส</span>
            </h3>
            <p class="text-xs sm:text-sm text-[#606060] leading-relaxed">
              ใน Google Sheets ให้สร้างหัวคอลัมน์ขึ้นมา เช่น <code class="bg-zinc-100 text-[#0F0F0F] px-1.5 py-0.5 rounded font-mono font-bold">Customer_Signature</code> หรือ <code class="bg-zinc-100 text-[#0F0F0F] px-1.5 py-0.5 rounded font-mono font-bold">Recipient_Signature</code> เมื่อนำเข้ามายัง AppSheet:
            </p>

            <div class="p-4 rounded-xl bg-blue-50/60 border border-blue-200 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-[#065FD4] text-white flex items-center justify-center font-bold">✍️</div>
                <div>
                  <div class="font-mono font-bold text-sm text-[#0F0F0F]">Type: Signature</div>
                  <div class="text-xs text-[#606060]">เปลี่ยนช่องกรอกข้อความเป็นผืนผ้าใบวาดภาพสัมผัส (Capacitive Touch Canvas)</div>
                </div>
              </div>
              <span class="text-xs bg-white px-3 py-1 rounded-full border border-blue-200 font-bold text-[#065FD4]">Canvas Vector Engine</span>
            </div>

            <!-- UI Mockup for Signature Field -->
            <div class="p-5 rounded-2xl bg-zinc-50 border border-[#E5E5E5] space-y-3">
              <div class="flex items-center justify-between text-xs">
                <span class="font-bold text-[#0F0F0F]">ลายมือชื่อผู้รับสินค้าหรือบริการ (Recipient Signature) *</span>
                <span class="text-[#2BA640] font-mono text-[11px] font-bold">✓ พร้อมลงลายมือชื่อ</span>
              </div>
              
              <!-- Canvas Frame Box -->
              <div class="h-36 bg-white border-2 border-dashed border-zinc-300 rounded-xl relative flex flex-col items-center justify-center overflow-hidden shadow-inner group">
                <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                  <span class="text-zinc-400 font-bold text-xs uppercase tracking-widest">Capacitive Touch Signature Surface</span>
                </div>
                <!-- Simulated Hand-drawn Signature SVG -->
                <svg class="w-56 h-20 text-[#0F0F0F] z-10 transition-transform group-hover:scale-105 duration-300" viewBox="0 0 200 60" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M 20,45 Q 40,10 60,35 T 100,20 Q 120,45 140,25 T 180,40" />
                  <path d="M 50,50 L 170,48" stroke-width="1.5" stroke-dasharray="2 2" />
                </svg>
                <div class="absolute bottom-2 right-3 text-[10px] text-zinc-400 font-mono">
                  Vector Smoothing: Bezier Spline 60fps
                </div>
              </div>

              <div class="flex items-center justify-between pt-1">
                <button type="button" class="px-3 py-1.5 rounded-lg border border-[#E5E5E5] bg-white hover:bg-zinc-100 text-xs text-[#606060] font-medium flex items-center gap-1.5 transition">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                  <span>ลบเซ็นใหม่ (Clear)</span>
                </button>
                <span class="text-[11px] text-[#606060]">ใช้นิ้วมือหรือปากกาสไตลัสจรดบนหน้าจอสัมผัส</span>
              </div>
            </div>
          </div>

          <!-- Sub-topic 3.2 -->
          <div class="space-y-4 pt-4">
            <h3 class="text-lg font-bold text-[#0F0F0F] flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-[#FF0000]"></span>
              <span>3.2 การจัดเก็บไฟล์ภาพลง Google Drive และโครงสร้างการตั้งชื่อไฟล์</span>
            </h3>
            <p class="text-xs sm:text-sm text-[#606060] leading-relaxed">
              เมื่อผู้ใช้กดปุ่ม <strong>Save</strong> เพื่อบันทึกข้อมูลแบบฟอร์ม AppSheet จะทำงานเบื้องหลังดังนี้:
            </p>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div class="p-4 rounded-xl bg-zinc-50 border border-[#E5E5E5] space-y-2">
                <div class="font-bold text-[#0F0F0F] flex items-center gap-1.5">
                  <span class="w-5 h-5 rounded bg-zinc-800 text-white flex items-center justify-center text-[10px]">1</span>
                  <span>แปลงเป็นภาพโปร่งใส</span>
                </div>
                <p class="text-[#606060] leading-relaxed">
                  แปลงเส้นพิกัด Vector Path บน Canvas ออกมาเป็นไฟล์ภาพบิตแมปความละเอียดสูง สกุล <strong>.png</strong> ที่มีพื้นหลังโปร่งใส (Alpha Transparency)
                </p>
              </div>

              <div class="p-4 rounded-xl bg-zinc-50 border border-[#E5E5E5] space-y-2">
                <div class="font-bold text-[#0F0F0F] flex items-center gap-1.5">
                  <span class="w-5 h-5 rounded bg-zinc-800 text-white flex items-center justify-center text-[10px]">2</span>
                  <span>อัปโหลดขึ้น Google Drive</span>
                </div>
                <p class="text-[#606060] leading-relaxed">
                  ส่งไฟล์ภาพขึ้นไปจัดเก็บในโฟลเดอร์ของ Google Drive โดยอัตโนมัติ เช่น โฟลเดอร์ <code class="bg-zinc-200 px-1 rounded font-mono">Orders_Images/</code> ใต้ที่อยู่ของชีตหลัก
                </p>
              </div>

              <div class="p-4 rounded-xl bg-zinc-50 border border-[#E5E5E5] space-y-2">
                <div class="font-bold text-[#0F0F0F] flex items-center gap-1.5">
                  <span class="w-5 h-5 rounded bg-zinc-800 text-white flex items-center justify-center text-[10px]">3</span>
                  <span>บันทึก Relative Path ในชีต</span>
                </div>
                <p class="text-[#606060] leading-relaxed">
                  ในตารางชีตจะเก็บเฉพาะข้อความชื่อพาธไฟล์ เช่น <code class="bg-zinc-200 px-1 rounded font-mono text-[10px]">Orders_Images/4a8c91d2.png</code> ทำให้ไฟล์ชีตมีขนาดเล็กและเปิดได้รวดเร็ว
                </p>
              </div>
            </div>

            <!-- Path Format Anatomy Box -->
            <div class="p-4 rounded-xl bg-[#0F0F0F] text-zinc-300 font-mono text-xs space-y-2">
              <div class="text-[10px] text-zinc-500 uppercase tracking-wider">โครงสร้างชื่อไฟล์ภาพลายเซ็น (AppSheet File Naming Anatomy):</div>
              <div class="text-emerald-400 font-bold break-all">
                Orders_Images / 8f2b4c10 . Customer_Signature . 154030 . png
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-zinc-800 text-[10px] text-zinc-400">
                <div><span class="text-white font-bold">[ตาราง_Images]</span>: โฟลเดอร์ประจำตาราง</div>
                <div><span class="text-white font-bold">[8f2b4c10]</span>: รหัส Key แถวนั้น</div>
                <div><span class="text-white font-bold">[Customer_Sig]</span>: ชื่อคอลัมน์</div>
                <div><span class="text-white font-bold">[154030.png]</span>: เวลาเซ็น (HHmmss)</div>
              </div>
            </div>
          </div>
        </article>

        <!-- ───────────────────────────────────────────────────────────── -->
        <!-- SECTION 4: AUDIT TRAIL & IMMUTABILITY -->
        <!-- ───────────────────────────────────────────────────────────── -->
        <article id="audit-trail" class="scroll-mt-20 space-y-8 pt-10 border-t border-[#E5E5E5]">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF0000]">
            <span>หัวข้อที่ 4</span>
          </div>

          <div class="space-y-3">
            <h2 class="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F] tracking-tight">
              4. การสร้าง Audit Trail และกลไกป้องกันการแก้ไขย้อนหลัง (Non-repudiation)
            </h2>
            <p class="text-sm sm:text-base text-[#606060] leading-relaxed">
              ตาม <strong>พระราชบัญญัติว่าด้วยธุรกรรมทางอิเล็กทรอนิกส์ พ.ศ. 2544 (และฉบับแก้ไขเพิ่มเติม)</strong> ลายมือชื่ออิเล็กทรอนิกส์จะมีผลผูกพันทางกฎหมายได้ จะต้องมีองค์ประกอบพิสูจน์ได้ว่า <em>"ใครเป็นผู้ลงลายมือชื่อ"</em> และ <em>"ลงลายมือชื่อเมื่อใด"</em> รวมถึง <em>"ไม่มีการดัดแปลงแก้ไขเนื้อหาหลังจากลงนามแล้ว"</em>
            </p>
          </div>

          <!-- 3 Pillars of Audit Trail -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div class="p-4 rounded-2xl bg-zinc-50 border border-[#E5E5E5] space-y-2">
              <div class="font-bold text-[#0F0F0F] flex items-center gap-1.5 text-sm">
                <span class="text-base">👤</span>
                <span>1. ตัวตนผู้ลงนาม (Who)</span>
              </div>
              <p class="text-[#606060] leading-relaxed">
                บันทึกอีเมลหรือบัญชีผู้ใช้งานที่กำลังล็อกอินอยู่ในแอปพลิเคชันขณะกดบันทึก โดยใช้สูตร:
              </p>
              <pre class="p-2 rounded bg-white border border-[#E5E5E5] font-mono text-[#065FD4]">USEREMAIL()</pre>
            </div>

            <div class="p-4 rounded-2xl bg-zinc-50 border border-[#E5E5E5] space-y-2">
              <div class="font-bold text-[#0F0F0F] flex items-center gap-1.5 text-sm">
                <span class="text-base">⏰</span>
                <span>2. วันเวลาที่ลงนาม (When)</span>
              </div>
              <p class="text-[#606060] leading-relaxed">
                สร้างคอลัมน์ชนิด <code class="bg-zinc-200 px-1 rounded font-bold">DateTime</code> แล้วตั้งค่าในช่อง <strong>Initial value</strong> ด้วยสูตร:
              </p>
              <pre class="p-2 rounded bg-white border border-[#E5E5E5] font-mono text-[#065FD4]">=NOW()</pre>
              <p class="text-[10px] text-zinc-500">และปิดสิทธิ์การแก้ไข (Editable? = FALSE)</p>
            </div>

            <div class="p-4 rounded-2xl bg-zinc-50 border border-[#E5E5E5] space-y-2">
              <div class="font-bold text-[#0F0F0F] flex items-center gap-1.5 text-sm">
                <span class="text-base">🔒</span>
                <span>3. การล็อกห้ามแก้ไข (Integrity)</span>
              </div>
              <p class="text-[#606060] leading-relaxed">
                ล็อกคอลัมน์ Signature ทันทีหลังจากมีการเซ็นและบันทึกแล้ว เพื่อป้องกันการลบหรือแอบแก้ไข โดยกำหนดในช่อง <strong>Editable?</strong>:
              </p>
              <pre class="p-2 rounded bg-white border border-[#E5E5E5] font-mono text-[#FF0000]">ISBLANK([_THIS])</pre>
            </div>
          </div>

          <!-- Deep Dive Box: How ISBLANK([_THIS]) Works -->
          <div class="p-6 rounded-2xl bg-red-50/50 border-2 border-red-200 space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2 font-bold text-[#FF0000] text-sm">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                <span>วิเคราะห์สูตรหัวใจสำคัญ: ทำไมต้อง ISBLANK([_THIS]) ในช่อง Editable?</span>
              </div>
              <button onclick="copyText('ISBLANK([_THIS])', this)" class="text-xs bg-white px-3 py-1 rounded-full border border-red-300 text-[#FF0000] font-mono font-bold hover:bg-red-50 flex items-center gap-1 transition">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                <span>คัดลอกสูตร ISBLANK</span>
              </button>
            </div>

            <div class="text-xs text-[#0F0F0F] space-y-3 leading-relaxed">
              <p>
                ใน AppSheet สัญลักษณ์ <code class="bg-white px-1.5 py-0.5 rounded font-mono font-bold text-[#FF0000]">[_THIS]</code> หมายถึง <strong>"ค่าปัจจุบันของคอลัมน์ตัวมันเอง"</strong> ดังนั้น เมื่อเรานำสูตรนี้ไปวางไว้ในช่อง <strong>Editable? (อนุญาตให้แก้ไขหรือไม่?)</strong> จะเกิดตรรกะ 2 สถานะ:
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="p-3 bg-white rounded-xl border border-red-200">
                  <div class="font-bold text-[#2BA640] mb-1">จังหวะที่ 1: ตอนยังไม่มีลายเซ็น (ก่อนเซ็น)</div>
                  <p class="text-[#606060]">ค่าในช่องว่างเปล่า ➔ <code class="font-mono">ISBLANK([_THIS])</code> มีค่าเป็น <strong>TRUE</strong> ➔ ระบบอนุญาตให้เปิดผืนผ้าใบและใช้นิ้วเซ็นได้ตามปกติ</p>
                </div>
                <div class="p-3 bg-white rounded-xl border border-red-200">
                  <div class="font-bold text-[#FF0000] mb-1">จังหวะที่ 2: หลังจากกดบันทึกแล้ว (หลังเซ็น)</div>
                  <p class="text-[#606060]">ในช่องมีรูปภาพแล้ว ➔ <code class="font-mono">ISBLANK([_THIS])</code> กลายเป็น <strong>FALSE</strong> ➔ ล็อกกล่องลายเซ็นทันที กลายเป็น Read-Only ไม่มีใครแก้ไขหรือลบลายเซ็นทิ้งได้อีก!</p>
                </div>
              </div>
            </div>
          </div>
        </article>
`;
