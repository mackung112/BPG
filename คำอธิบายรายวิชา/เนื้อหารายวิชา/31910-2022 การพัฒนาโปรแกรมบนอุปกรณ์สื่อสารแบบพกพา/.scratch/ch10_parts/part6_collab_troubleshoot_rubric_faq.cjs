module.exports = `
        <!-- ───────────────────────────────────────────────────────────── -->
        <!-- SECTION 8: AGILE TRIAD COLLABORATION -->
        <!-- ───────────────────────────────────────────────────────────── -->
        <article id="agile-triad" class="scroll-mt-20 space-y-8 pt-10 border-t border-[#E5E5E5]">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF0000]">
            <span>หัวข้อที่ 8</span>
          </div>

          <div class="space-y-3">
            <h2 class="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F] tracking-tight">
              8. การแบ่งบทบาทหน้าที่ของสมาชิก 3 คนในทีม (Agile Triad Collaboration)
            </h2>
            <p class="text-sm sm:text-base text-[#606060] leading-relaxed">
              เพื่อให้การพัฒนาเสร็จสิ้นภายในกรอบเวลา 4 ชั่วโมง การแบ่งงานในทีม 3 คนต้องชัดเจนตามความเชี่ยวชาญเฉพาะด้าน (Specialized Matrix) โดยประสานงานแบบคู่ขนาน:
            </p>
          </div>

          <!-- Team Matrix Table -->
          <div class="p-5 rounded-2xl bg-zinc-50 border border-[#E5E5E5] space-y-4">
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead>
                  <tr class="border-b border-zinc-200 text-[#0F0F0F] font-bold">
                    <th class="py-2.5 px-3">บทบาทสมาชิก</th>
                    <th class="py-2.5 px-3">ตำแหน่งเชิงวิศวกรรม</th>
                    <th class="py-2.5 px-3">ภารกิจหลักในสปรินต์ที่ 10</th>
                    <th class="py-2.5 px-3 text-center">สิ่งส่งมอบ (Deliverable)</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-zinc-200 text-[#606060]">
                  <tr>
                    <td class="py-3 px-3 font-bold text-[#FF0000]">สมาชิกคนที่ 1</td>
                    <td class="py-3 px-3 font-bold text-[#0F0F0F]">Hardware Integration Specialist</td>
                    <td class="py-3 px-3 leading-relaxed">
                      - วางโครงสร้างรหัสบาร์โค้ดในชีต<br>
                      - เปิดคุณสมบัติ [✓] Scannable? และ [✓] Search?<br>
                      - ทดสอบความเร็วในการเปิดกล้องและการดึงข้อมูลสินค้า
                    </td>
                    <td class="py-3 px-3 text-center font-mono font-bold text-[#0F0F0F]">กล้องสแกนทำงาน 100%</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-3 font-bold text-[#065FD4]">สมาชิกคนที่ 2</td>
                    <td class="py-3 px-3 font-bold text-[#0F0F0F]">Signature & Audit Engineer</td>
                    <td class="py-3 px-3 leading-relaxed">
                      - สร้างคอลัมน์ประเภท Signature บนหน้าจอสัมผัส<br>
                      - ผูกสูตร =NOW() เก็บวันเวลาที่ลงนามอัตโนมัติ<br>
                      - ใส่สูตร ISBLANK([_THIS]) ในช่อง Editable? ล็อกห้ามแก้
                    </td>
                    <td class="py-3 px-3 text-center font-mono font-bold text-[#0F0F0F]">ไฟล์ภาพบันทึกลง Drive</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-3 font-bold text-[#2BA640]">สมาชิกคนที่ 3</td>
                    <td class="py-3 px-3 font-bold text-[#0F0F0F]">Field QA & Validation Lead</td>
                    <td class="py-3 px-3 leading-relaxed">
                      - นำแอปพลิเคชันไปติดตั้งบนสมาร์ตโฟนจริง 3 เครื่อง<br>
                      - ทดสอบสแกนโค้ดในสภาพแสงสว่างจ้าและแสงน้อย<br>
                      - ตรวจสอบรายการในชีตและประเมินตนเองตาม Rubric
                    </td>
                    <td class="py-3 px-3 text-center font-mono font-bold text-[#0F0F0F]">คะแนนประเมิน 10/10</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </article>

        <!-- ───────────────────────────────────────────────────────────── -->
        <!-- SECTION 9: TROUBLESHOOTING MATRIX -->
        <!-- ───────────────────────────────────────────────────────────── -->
        <article id="troubleshooting" class="scroll-mt-20 space-y-8 pt-10 border-t border-[#E5E5E5]">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF0000]">
            <span>หัวข้อที่ 9</span>
          </div>

          <div class="space-y-3">
            <h2 class="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F] tracking-tight">
              9. ข้อผิดพลาดที่พบบ่อยและแนวทางแก้ไข (Troubleshooting & Common Pitfalls)
            </h2>
            <p class="text-sm sm:text-base text-[#606060] leading-relaxed">
              รวมปัญหาหน้างานที่นักพัฒนามักพบเมื่อเชื่อมต่อกับฮาร์ดแวร์จริงของสมาร์ตโฟน พร้อมแนวทางการแก้ไขอย่างเป็นระบบ:
            </p>
          </div>

          <!-- Troubleshooting Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <!-- Bug 1 -->
            <div class="p-4 rounded-2xl bg-white border border-[#E5E5E5] space-y-2 shadow-sm">
              <div class="flex items-center gap-2 text-[#FF0000] font-bold">
                <span class="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-xs">❌</span>
                <span>1. แตะไอคอนสแกนแล้วกล้องไม่เปิด หรือหน้าจอดำ</span>
              </div>
              <p class="text-[#606060] leading-relaxed">
                <strong>สาเหตุ:</strong> ผู้ใช้งานกดปฏิเสธ (Deny) ตอนที่เบราว์เซอร์หรือแอปขอสิทธิ์เข้าถึงกล้อง (Camera Permission)<br>
                <strong>วิธีแก้ไข:</strong> เข้าไปที่ <em>Settings มือถือ ➔ Apps ➔ AppSheet (หรือ Chrome) ➔ Permissions ➔ Camera ➔ เปลี่ยนเป็น "Allow only while using the app"</em>
              </p>
            </div>

            <!-- Bug 2 -->
            <div class="p-4 rounded-2xl bg-white border border-[#E5E5E5] space-y-2 shadow-sm">
              <div class="flex items-center gap-2 text-[#FF0000] font-bold">
                <span class="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-xs">❌</span>
                <span>2. สแกนบาร์โค้ดไม่ติด หรือต้องเล็งนานมาก</span>
              </div>
              <p class="text-[#606060] leading-relaxed">
                <strong>สาเหตุ:</strong> แสงสะท้อนจากหน้าจอคอมพิวเตอร์ หรือขนาดรหัสเล็กเกินไป ทำให้เซนเซอร์กล้องโฟกัสไม่ได้<br>
                <strong>วิธีแก้ไข:</strong> ขยายขนาดหน้าต่างเบราว์เซอร์ หรือซูมภาพ QR Code ให้มีขนาดไม่น้อยกว่า 5x5 ซม. และรักษาระยะห่างของกล้องไว้ที่ 15 - 25 ซม.
              </p>
            </div>

            <!-- Bug 3 -->
            <div class="p-4 rounded-2xl bg-white border border-[#E5E5E5] space-y-2 shadow-sm">
              <div class="flex items-center gap-2 text-[#FF0000] font-bold">
                <span class="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-xs">❌</span>
                <span>3. ใน Google Sheets เห็นแต่ชื่อไฟล์ ไม่เห็นภาพลายเซ็น</span>
              </div>
              <p class="text-[#606060] leading-relaxed">
                <strong>สาเหตุ:</strong> เป็นพฤติกรรมมาตรฐานที่ถูกต้องของ AppSheet เพื่อไม่ให้ชีตอืด โดยชีตจะเก็บเฉพาะ Relative Path<br>
                <strong>วิธีแก้ไข:</strong> รูปภาพจริงถูกจัดเก็บอยู่ในโฟลเดอร์ของ Google Drive แล้ว สามารถเปิดดูภาพลายเซ็นได้จากหน้า Detail View ของแอปพลิเคชัน
              </p>
            </div>

            <!-- Bug 4 -->
            <div class="p-4 rounded-2xl bg-white border border-[#E5E5E5] space-y-2 shadow-sm">
              <div class="flex items-center gap-2 text-[#FF0000] font-bold">
                <span class="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-xs">❌</span>
                <span>4. ลูกค้าแอบมากดแก้ไขหรือลบลายเซ็นทิ้งในภายหลัง</span>
              </div>
              <p class="text-[#606060] leading-relaxed">
                <strong>สาเหตุ:</strong> ลืมกำหนดเงื่อนไขการล็อกความปลอดภัยในคอลัมน์ลายเซ็น<br>
                <strong>วิธีแก้ไข:</strong> ที่คอลัมน์ <code>Signature</code> ใน AppSheet ให้ใส่สูตร <code class="font-mono font-bold text-[#FF0000]">ISBLANK([_THIS])</code> ลงในช่อง <strong>Editable?</strong> ทันที!
              </p>
            </div>

            <!-- Bug 5 -->
            <div class="p-4 rounded-2xl bg-white border border-[#E5E5E5] space-y-2 shadow-sm">
              <div class="flex items-center gap-2 text-[#FF0000] font-bold">
                <span class="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-xs">❌</span>
                <span>5. สแกนแล้วขึ้น "No match found" ทั้งที่มีรหัสในชีต</span>
              </div>
              <p class="text-[#606060] leading-relaxed">
                <strong>สาเหตุ:</strong> มีช่องว่าง (Trailing Whitespace) ติดอยู่ที่หัวหรือท้ายรหัสในชีต หรือชนิดข้อมูลในชีตถูกตั้งเป็นตัวเลขแต่ AppSheet มองเป็นข้อความ<br>
                <strong>วิธีแก้ไข:</strong> ใช้คำสั่ง <code class="font-mono">=TRIM(A2)</code> ทำความสะอาดข้อมูลในชีต และตั้งชนิดคอลัมน์ใน AppSheet เป็น <code>Text</code> ให้ตรงกัน
              </p>
            </div>

            <!-- Bug 6 -->
            <div class="p-4 rounded-2xl bg-white border border-[#E5E5E5] space-y-2 shadow-sm">
              <div class="flex items-center gap-2 text-[#FF0000] font-bold">
                <span class="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-xs">❌</span>
                <span>6. ฟอร์มเปิดกล้องขึ้นมาอัตโนมัติซ้ำๆ ไม่ยอมหยุด</span>
              </div>
              <p class="text-[#606060] leading-relaxed">
                <strong>สาเหตุ:</strong> ไปเปิดคุณสมบัติ Auto-scan หรือตั้งคอลัมน์ Scannable คอลัมน์แรกในฟอร์มแบบบังคับ<br>
                <strong>วิธีแก้ไข:</strong> ตรวจสอบที่ UX ➔ Views ➔ Form View ให้ปิดการติ๊ก "Auto advance on scan" หากต้องการให้ผู้ใช้เลือกกดเอง
              </p>
            </div>
          </div>
        </article>

        <!-- ───────────────────────────────────────────────────────────── -->
        <!-- SECTION 10: SELF-CHECKLIST (LOCALSTORAGE PERSISTENCE) -->
        <!-- ───────────────────────────────────────────────────────────── -->
        <article id="self-checklist" class="scroll-mt-20 space-y-8 pt-10 border-t border-[#E5E5E5]">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF0000]">
            <span>หัวข้อที่ 10</span>
          </div>

          <div class="space-y-3">
            <h2 class="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F] tracking-tight">
              10. แบบตรวจสอบตนเองก่อนส่งงาน (Self-Checklist ประจำบทที่ 10)
            </h2>
            <p class="text-sm sm:text-base text-[#606060] leading-relaxed">
              ให้นักศึกษาตรวจสอบความถูกต้องและความสมบูรณ์ของระบบงานให้ครบทุกข้อ ระบบจะบันทึกสถานะลงในเบราว์เซอร์ของคุณอัตโนมัติ (LocalStorage: <code class="font-mono text-zinc-500 font-bold">curriculum_ch10_checklist</code>):
            </p>
          </div>

          <!-- Interactive Checklist Card -->
          <div class="p-6 rounded-2xl bg-zinc-50 border border-[#E5E5E5] space-y-6 shadow-sm">
            <!-- Header & Progress Bar -->
            <div class="space-y-2">
              <div class="flex items-center justify-between text-xs font-bold">
                <span class="text-[#0F0F0F] flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-[#FF0000]"></span>
                  <span>ความก้าวหน้าการตรวจสอบชิ้นงาน</span>
                </span>
                <span id="checklistPercentage" class="text-sm font-mono text-[#FF0000]">0%</span>
              </div>
              <div class="w-full h-3 bg-zinc-200 rounded-full overflow-hidden">
                <div id="checklistProgressBar" class="h-full bg-[#FF0000] transition-all duration-300" style="width: 0%;"></div>
              </div>
              <div class="flex items-center justify-between text-[11px] text-[#606060]">
                <span id="checklistCount">เสร็จสิ้น 0 จาก 8 ข้อกำหนด</span>
                <button onclick="resetChecklist()" class="text-zinc-500 hover:text-[#FF0000] underline transition">
                  รีเซ็ตสถานะทั้งหมด
                </button>
              </div>
            </div>

            <!-- 8 Interactive Checklist Items -->
            <div class="space-y-3 text-xs">
              <label class="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#E5E5E5] hover:border-zinc-400 cursor-pointer transition">
                <input type="checkbox" class="check-item w-4 h-4 mt-0.5 accent-[#FF0000] rounded" onchange="updateChecklist()">
                <div class="space-y-0.5">
                  <div class="font-bold text-[#0F0F0F]">1. การเปิดใช้งาน Scannable บนคอลัมน์รหัส</div>
                  <p class="text-[#606060]">คอลัมน์รหัสสินค้า/รหัสพัสดุมีการเปิด <code class="font-mono">[✓] Scannable?</code> และปรากฏไอคอนรูปกล้องสแกนเนอร์ข้างช่องกรอก</p>
                </div>
              </label>

              <label class="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#E5E5E5] hover:border-zinc-400 cursor-pointer transition">
                <input type="checkbox" class="check-item w-4 h-4 mt-0.5 accent-[#FF0000] rounded" onchange="updateChecklist()">
                <div class="space-y-0.5">
                  <div class="font-bold text-[#0F0F0F]">2. การค้นหาด้วยกล้อง (Search Bar Scanner)</div>
                  <p class="text-[#606060]">คอลัมน์เปิด <code class="font-mono">[✓] Search?</code> ควบคู่กัน ทำให้มีปุ่มกล้องที่ Search Bar สำหรับยิงสแกนหาเรคคอร์ดได้ทันที</p>
                </div>
              </label>

              <label class="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#E5E5E5] hover:border-zinc-400 cursor-pointer transition">
                <input type="checkbox" class="check-item w-4 h-4 mt-0.5 accent-[#FF0000] rounded" onchange="updateChecklist()">
                <div class="space-y-0.5">
                  <div class="font-bold text-[#0F0F0F]">3. วงจร Fast Scan-to-Lookup สมบูรณ์</div>
                  <p class="text-[#606060]">สามารถใช้กล้องยิงสแกนบาร์โค้ดแล้วดึงข้อมูล (ชื่อสินค้า, ราคา, หรือประวัติ) มาแสดงผลได้จริง 100%</p>
                </div>
              </label>

              <label class="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#E5E5E5] hover:border-zinc-400 cursor-pointer transition">
                <input type="checkbox" class="check-item w-4 h-4 mt-0.5 accent-[#FF0000] rounded" onchange="updateChecklist()">
                <div class="space-y-0.5">
                  <div class="font-bold text-[#0F0F0F]">4. ช่องเซ็นลายมือชื่อดิจิทัล (Signature Column)</div>
                  <p class="text-[#606060]">กำหนดชนิดข้อมูลเป็น <code class="font-mono text-[#065FD4]">Signature</code> สามารถใช้นิ้วมือหรือเมาส์จรดวาดลายเซ็นได้ลื่นไหล</p>
                </div>
              </label>

              <label class="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#E5E5E5] hover:border-zinc-400 cursor-pointer transition">
                <input type="checkbox" class="check-item w-4 h-4 mt-0.5 accent-[#FF0000] rounded" onchange="updateChecklist()">
                <div class="space-y-0.5">
                  <div class="font-bold text-[#0F0F0F]">5. การจัดเก็บภาพลง Google Drive ถูกต้อง</div>
                  <p class="text-[#606060]">เมื่อกดบันทึก ภาพลายเซ็นถูกสร้างเป็นไฟล์ <code class="font-mono text-zinc-700">.png</code> บน Drive และในชีตบันทึกเป็น Relative Path</p>
                </div>
              </label>

              <label class="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#E5E5E5] hover:border-zinc-400 cursor-pointer transition">
                <input type="checkbox" class="check-item w-4 h-4 mt-0.5 accent-[#FF0000] rounded" onchange="updateChecklist()">
                <div class="space-y-0.5">
                  <div class="font-bold text-[#0F0F0F]">6. การบันทึก Audit Timestamp อัตโนมัติ</div>
                  <p class="text-[#606060]">มีคอลัมน์เก็บวันเวลา <code class="font-mono text-[#065FD4]">DateTime = NOW()</code> เพื่อยืนยันเวลาทำธุรกรรมตามหลัก Non-repudiation</p>
                </div>
              </label>

              <label class="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#E5E5E5] hover:border-zinc-400 cursor-pointer transition">
                <input type="checkbox" class="check-item w-4 h-4 mt-0.5 accent-[#FF0000] rounded" onchange="updateChecklist()">
                <div class="space-y-0.5">
                  <div class="font-bold text-[#0F0F0F]">7. การล็อกลายเซ็นด้วยสูตร ISBLANK([_THIS])</div>
                  <p class="text-[#606060]">ใส่สูตรล็อกในช่อง <strong>Editable?</strong> ของคอลัมน์ Signature เพื่อป้องกันไม่ให้ผู้ใช้หรือลูกค้าแอบลบลายเซ็นทิ้ง</p>
                </div>
              </label>

              <label class="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#E5E5E5] hover:border-zinc-400 cursor-pointer transition">
                <input type="checkbox" class="check-item w-4 h-4 mt-0.5 accent-[#FF0000] rounded" onchange="updateChecklist()">
                <div class="space-y-0.5">
                  <div class="font-bold text-[#0F0F0F]">8. การทดสอบจริงบนอุปกรณ์พกพาสมาชิก 3 คน</div>
                  <p class="text-[#606060]">สมาชิกทั้ง 3 คนได้ทดสอบยิงสแกนและเซ็นชื่อบนสมาร์ตโฟนจริง และบันทึกผลการทดสอบเรียบร้อย</p>
                </div>
              </label>
            </div>

            <!-- Complete Badge -->
            <div id="checklistBadge" class="hidden p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-3">
              <span class="text-2xl">🏆</span>
              <div>
                <div class="font-bold text-sm">ยินดีด้วย! คุณผ่านการตรวจสอบรายการจำเป็นครบถ้วน 100%</div>
                <div class="text-[11px] text-emerald-700">ชิ้นงานพร้อมสำหรับการประเมินรูบริก 10 คะแนนเต็มแล้ว</div>
              </div>
            </div>
          </div>
        </article>

        <!-- ───────────────────────────────────────────────────────────── -->
        <!-- SECTION 11: RUBRIC CALCULATOR (10 POINTS) -->
        <!-- ───────────────────────────────────────────────────────────── -->
        <article id="rubric-calculator" class="scroll-mt-20 space-y-8 pt-10 border-t border-[#E5E5E5]">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF0000]">
            <span>หัวข้อที่ 11</span>
          </div>

          <div class="space-y-3">
            <h2 class="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F] tracking-tight">
              11. เกณฑ์การประเมินผลงาน 10 คะแนน (Rubric Assessment Matrix)
            </h2>
            <p class="text-sm sm:text-base text-[#606060] leading-relaxed">
              เครื่องมือคำนวณคะแนนตามเกณฑ์รูบริก 5 มิติ มิติละ 2 คะแนน รวมทั้งสิ้น 10 คะแนน พร้อมระบบวิเคราะห์ผลการประเมินอัตโนมัติ:
            </p>
          </div>

          <!-- Rubric Interactive Form -->
          <div class="p-6 rounded-2xl bg-zinc-50 border border-[#E5E5E5] space-y-6 shadow-sm">
            
            <!-- Criterion 1 -->
            <div class="space-y-3 border-b border-zinc-200 pb-5 text-xs">
              <div class="flex items-center justify-between">
                <span class="font-bold text-sm text-[#0F0F0F]">1. การเปิดใช้งาน Scannable และการเชื่อมต่อฮาร์ดแวร์กล้อง</span>
                <span id="rubricC1Score" class="font-mono font-bold text-[#FF0000] text-xs">2 คะแนน</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label class="rubric-opt flex flex-col justify-between p-3 rounded-xl border-2 border-[#0F0F0F] bg-zinc-50 cursor-pointer transition">
                  <div class="space-y-1">
                    <div class="flex items-center justify-between font-bold text-[#0F0F0F]">
                      <span>ดีมาก (Mastered)</span>
                      <input type="radio" name="rc1" value="2" checked onchange="calcRubric()" class="accent-[#FF0000]">
                    </div>
                    <p class="text-[11px] text-[#606060]">เปิด Scannable สมบูรณ์ กล้องเปิดติด 100% มีไอคอนกล้องทั้งใน Search และ Form</p>
                  </div>
                  <span class="text-[10px] text-emerald-600 font-bold mt-2">2 คะแนน</span>
                </label>
                <label class="rubric-opt flex flex-col justify-between p-3 rounded-xl border border-[#E5E5E5] bg-white cursor-pointer hover:bg-zinc-50 transition">
                  <div class="space-y-1">
                    <div class="flex items-center justify-between font-bold text-[#0F0F0F]">
                      <span>พอใช้ (Developing)</span>
                      <input type="radio" name="rc1" value="1" onchange="calcRubric()" class="accent-[#FF0000]">
                    </div>
                    <p class="text-[11px] text-[#606060]">เปิด Scannable ได้ แต่กล้องเปิดติดยาก หรือใช้ได้เฉพาะใน Search แต่ใน Form ไม่ได้</p>
                  </div>
                  <span class="text-[10px] text-amber-600 font-bold mt-2">1 คะแนน</span>
                </label>
                <label class="rubric-opt flex flex-col justify-between p-3 rounded-xl border border-[#E5E5E5] bg-white cursor-pointer hover:bg-zinc-50 transition">
                  <div class="space-y-1">
                    <div class="flex items-center justify-between font-bold text-[#0F0F0F]">
                      <span>ต้องปรับปรุง (Needs Work)</span>
                      <input type="radio" name="rc1" value="0" onchange="calcRubric()" class="accent-[#FF0000]">
                    </div>
                    <p class="text-[11px] text-[#606060]">ไม่สามารถเปิดกล้องสแกนได้ หรือไม่ได้เปิดใช้งาน Scannable ในคอลัมน์</p>
                  </div>
                  <span class="text-[10px] text-red-600 font-bold mt-2">0 คะแนน</span>
                </label>
              </div>
            </div>

            <!-- Criterion 2 -->
            <div class="space-y-3 border-b border-zinc-200 pb-5 text-xs">
              <div class="flex items-center justify-between">
                <span class="font-bold text-sm text-[#0F0F0F]">2. ประสิทธิภาพของระบบ Fast Scan-to-Lookup</span>
                <span id="rubricC2Score" class="font-mono font-bold text-[#FF0000] text-xs">2 คะแนน</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label class="rubric-opt flex flex-col justify-between p-3 rounded-xl border-2 border-[#0F0F0F] bg-zinc-50 cursor-pointer transition">
                  <div class="space-y-1">
                    <div class="flex items-center justify-between font-bold text-[#0F0F0F]">
                      <span>ดีมาก (Mastered)</span>
                      <input type="radio" name="rc2" value="2" checked onchange="calcRubric()" class="accent-[#FF0000]">
                    </div>
                    <p class="text-[11px] text-[#606060]">สแกนแล้วดึงข้อมูลสินค้าหรือครุภัณฑ์ได้ในเวลา &lt; 1 วินาที สูตรคำนวณถูกต้อง</p>
                  </div>
                  <span class="text-[10px] text-emerald-600 font-bold mt-2">2 คะแนน</span>
                </label>
                <label class="rubric-opt flex flex-col justify-between p-3 rounded-xl border border-[#E5E5E5] bg-white cursor-pointer hover:bg-zinc-50 transition">
                  <div class="space-y-1">
                    <div class="flex items-center justify-between font-bold text-[#0F0F0F]">
                      <span>พอใช้ (Developing)</span>
                      <input type="radio" name="rc2" value="1" onchange="calcRubric()" class="accent-[#FF0000]">
                    </div>
                    <p class="text-[11px] text-[#606060]">สแกนติดแต่ข้อมูลบางฟิลด์ไม่ขึ้นอัตโนมัติ หรือต้องกดรีเฟรชหน้าจอ</p>
                  </div>
                  <span class="text-[10px] text-amber-600 font-bold mt-2">1 คะแนน</span>
                </label>
                <label class="rubric-opt flex flex-col justify-between p-3 rounded-xl border border-[#E5E5E5] bg-white cursor-pointer hover:bg-zinc-50 transition">
                  <div class="space-y-1">
                    <div class="flex items-center justify-between font-bold text-[#0F0F0F]">
                      <span>ต้องปรับปรุง (Needs Work)</span>
                      <input type="radio" name="rc2" value="0" onchange="calcRubric()" class="accent-[#FF0000]">
                    </div>
                    <p class="text-[11px] text-[#606060]">ไม่มีการผูกตรรกะ Scan-to-Lookup หรือขึ้นข้อผิดพลาด Formula Error</p>
                  </div>
                  <span class="text-[10px] text-red-600 font-bold mt-2">0 คะแนน</span>
                </label>
              </div>
            </div>

            <!-- Criterion 3 -->
            <div class="space-y-3 border-b border-zinc-200 pb-5 text-xs">
              <div class="flex items-center justify-between">
                <span class="font-bold text-sm text-[#0F0F0F]">3. ผืนผ้าใบลายมือชื่อดิจิทัล (Signature Pad & Touch UI)</span>
                <span id="rubricC3Score" class="font-mono font-bold text-[#FF0000] text-xs">2 คะแนน</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label class="rubric-opt flex flex-col justify-between p-3 rounded-xl border-2 border-[#0F0F0F] bg-zinc-50 cursor-pointer transition">
                  <div class="space-y-1">
                    <div class="flex items-center justify-between font-bold text-[#0F0F0F]">
                      <span>ดีมาก (Mastered)</span>
                      <input type="radio" name="rc3" value="2" checked onchange="calcRubric()" class="accent-[#FF0000]">
                    </div>
                    <p class="text-[11px] text-[#606060]">คอลัมน์ Signature วาดลื่นไหล บันทึกเป็นภาพ PNG โปร่งใสขึ้น Drive ได้สมบูรณ์</p>
                  </div>
                  <span class="text-[10px] text-emerald-600 font-bold mt-2">2 คะแนน</span>
                </label>
                <label class="rubric-opt flex flex-col justify-between p-3 rounded-xl border border-[#E5E5E5] bg-white cursor-pointer hover:bg-zinc-50 transition">
                  <div class="space-y-1">
                    <div class="flex items-center justify-between font-bold text-[#0F0F0F]">
                      <span>พอใช้ (Developing)</span>
                      <input type="radio" name="rc3" value="1" onchange="calcRubric()" class="accent-[#FF0000]">
                    </div>
                    <p class="text-[11px] text-[#606060]">เซ็นชื่อได้ แต่ภาพใน Drive เสียหาย หรือตั้งค่าประเภทคอลัมน์ไม่ถูกต้อง</p>
                  </div>
                  <span class="text-[10px] text-amber-600 font-bold mt-2">1 คะแนน</span>
                </label>
                <label class="rubric-opt flex flex-col justify-between p-3 rounded-xl border border-[#E5E5E5] bg-white cursor-pointer hover:bg-zinc-50 transition">
                  <div class="space-y-1">
                    <div class="flex items-center justify-between font-bold text-[#0F0F0F]">
                      <span>ต้องปรับปรุง (Needs Work)</span>
                      <input type="radio" name="rc3" value="0" onchange="calcRubric()" class="accent-[#FF0000]">
                    </div>
                    <p class="text-[11px] text-[#606060]">ไม่มีคอลัมน์ Signature หรือไม่สามารถใช้นิ้วมือเซ็นชื่อได้</p>
                  </div>
                  <span class="text-[10px] text-red-600 font-bold mt-2">0 คะแนน</span>
                </label>
              </div>
            </div>

            <!-- Criterion 4 -->
            <div class="space-y-3 border-b border-zinc-200 pb-5 text-xs">
              <div class="flex items-center justify-between">
                <span class="font-bold text-sm text-[#0F0F0F]">4. ระบบ Audit Trail & Timestamp & Security Lock ISBLANK</span>
                <span id="rubricC4Score" class="font-mono font-bold text-[#FF0000] text-xs">2 คะแนน</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label class="rubric-opt flex flex-col justify-between p-3 rounded-xl border-2 border-[#0F0F0F] bg-zinc-50 cursor-pointer transition">
                  <div class="space-y-1">
                    <div class="flex items-center justify-between font-bold text-[#0F0F0F]">
                      <span>ดีมาก (Mastered)</span>
                      <input type="radio" name="rc4" value="2" checked onchange="calcRubric()" class="accent-[#FF0000]">
                    </div>
                    <p class="text-[11px] text-[#606060]">มี Timestamp =NOW() อัตโนมัติ และใส่สูตร ISBLANK([_THIS]) ล็อกห้ามแก้ไขสมบูรณ์</p>
                  </div>
                  <span class="text-[10px] text-emerald-600 font-bold mt-2">2 คะแนน</span>
                </label>
                <label class="rubric-opt flex flex-col justify-between p-3 rounded-xl border border-[#E5E5E5] bg-white cursor-pointer hover:bg-zinc-50 transition">
                  <div class="space-y-1">
                    <div class="flex items-center justify-between font-bold text-[#0F0F0F]">
                      <span>พอใช้ (Developing)</span>
                      <input type="radio" name="rc4" value="1" onchange="calcRubric()" class="accent-[#FF0000]">
                    </div>
                    <p class="text-[11px] text-[#606060]">มี Timestamp แต่ลืมล็อกสูตร ISBLANK หรือผู้ใช้ยังสามารถแอบลบลายเซ็นได้</p>
                  </div>
                  <span class="text-[10px] text-amber-600 font-bold mt-2">1 คะแนน</span>
                </label>
                <label class="rubric-opt flex flex-col justify-between p-3 rounded-xl border border-[#E5E5E5] bg-white cursor-pointer hover:bg-zinc-50 transition">
                  <div class="space-y-1">
                    <div class="flex items-center justify-between font-bold text-[#0F0F0F]">
                      <span>ต้องปรับปรุง (Needs Work)</span>
                      <input type="radio" name="rc4" value="0" onchange="calcRubric()" class="accent-[#FF0000]">
                    </div>
                    <p class="text-[11px] text-[#606060]">ไม่มีกลไก Audit Trail ใดๆ ขาดทั้งการบันทึกเวลาและการล็อกความปลอดภัย</p>
                  </div>
                  <span class="text-[10px] text-red-600 font-bold mt-2">0 คะแนน</span>
                </label>
              </div>
            </div>

            <!-- Criterion 5 -->
            <div class="space-y-3 pb-2 text-xs">
              <div class="flex items-center justify-between">
                <span class="font-bold text-sm text-[#0F0F0F]">5. การทดสอบจริงบนสมาร์ตโฟน & ความร่วมมือในทีม Agile Triad</span>
                <span id="rubricC5Score" class="font-mono font-bold text-[#FF0000] text-xs">2 คะแนน</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label class="rubric-opt flex flex-col justify-between p-3 rounded-xl border-2 border-[#0F0F0F] bg-zinc-50 cursor-pointer transition">
                  <div class="space-y-1">
                    <div class="flex items-center justify-between font-bold text-[#0F0F0F]">
                      <span>ดีมาก (Mastered)</span>
                      <input type="radio" name="rc5" value="2" checked onchange="calcRubric()" class="accent-[#FF0000]">
                    </div>
                    <p class="text-[11px] text-[#606060]">สาธิตบนเครื่องจริงได้คล่องแคล่ว สมาชิก 3 คนตอบคำถามและทำงานร่วมกันดีเยี่ยม</p>
                  </div>
                  <span class="text-[10px] text-emerald-600 font-bold mt-2">2 คะแนน</span>
                </label>
                <label class="rubric-opt flex flex-col justify-between p-3 rounded-xl border border-[#E5E5E5] bg-white cursor-pointer hover:bg-zinc-50 transition">
                  <div class="space-y-1">
                    <div class="flex items-center justify-between font-bold text-[#0F0F0F]">
                      <span>พอใช้ (Developing)</span>
                      <input type="radio" name="rc5" value="1" onchange="calcRubric()" class="accent-[#FF0000]">
                    </div>
                    <p class="text-[11px] text-[#606060]">สาธิตบนเครื่องจริงได้แต่ติดขัดเล็กน้อย หรือการแบ่งบทบาทในทีมยังไม่สมดุล</p>
                  </div>
                  <span class="text-[10px] text-amber-600 font-bold mt-2">1 คะแนน</span>
                </label>
                <label class="rubric-opt flex flex-col justify-between p-3 rounded-xl border border-[#E5E5E5] bg-white cursor-pointer hover:bg-zinc-50 transition">
                  <div class="space-y-1">
                    <div class="flex items-center justify-between font-bold text-[#0F0F0F]">
                      <span>ต้องปรับปรุง (Needs Work)</span>
                      <input type="radio" name="rc5" value="0" onchange="calcRubric()" class="accent-[#FF0000]">
                    </div>
                    <p class="text-[11px] text-[#606060]">ไม่สามารถสาธิตการทำงานจริงบนสมาร์ตโฟนได้ หรือขาดสมาชิกนำเสนอ</p>
                  </div>
                  <span class="text-[10px] text-red-600 font-bold mt-2">0 คะแนน</span>
                </label>
              </div>
            </div>

            <!-- Rubric Total Summary Bar -->
            <div class="pt-4 border-t border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <span class="text-xs text-[#606060] font-bold">คะแนนรวมที่ได้:</span>
                <span class="text-3xl font-black font-mono text-[#0F0F0F]"><span id="rubricTotal">10</span> / 10</span>
                <span id="rubricBadge" class="px-3.5 py-1.5 rounded-xl bg-emerald-100 text-[#2BA640] font-bold text-xs border border-emerald-300">
                  ระดับ: ดีเยี่ยม (Mastered / Grade A)
                </span>
              </div>
            </div>

            <!-- Diagnostic Advice Box -->
            <div id="rubricDiagnostic" class="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-[#2BA640] leading-relaxed">
              <strong>ข้อเสนอแนะเชิงวิชาการ:</strong> ยอดเยี่ยมมาก! สถาปัตยกรรมฮาร์ดแวร์และการสร้าง Audit Trail ของทีมท่านมีความสมบูรณ์แบบระดับวิศวกรซอฟต์แวร์ พร้อมสำหรับการต่อยอดระบบแผนที่นำทาง GPS ในสัปดาห์ที่ 11
            </div>
          </div>
        </article>

        <!-- ───────────────────────────────────────────────────────────── -->
        <!-- SECTION 12: FAQ ACCORDION -->
        <!-- ───────────────────────────────────────────────────────────── -->
        <article id="faq-section" class="scroll-mt-20 space-y-8 pt-10 border-t border-[#E5E5E5]">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF0000]">
            <span>หัวข้อที่ 12</span>
          </div>

          <div class="space-y-3">
            <h2 class="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F] tracking-tight">
              12. คลังคำถามทบทวนเชิงลึก (Frequently Asked Questions)
            </h2>
            <p class="text-sm sm:text-base text-[#606060] leading-relaxed">
              ตอบข้อสงสัยยอดฮิตเกี่ยวกับการเชื่อมต่อเซนเซอร์ฮาร์ดแวร์ การสแกน และความปลอดภัยของลายเซ็น:
            </p>
          </div>

          <!-- FAQ Accordions -->
          <div class="space-y-3 text-xs">
            <!-- FAQ 1 -->
            <div class="border border-[#E5E5E5] rounded-xl overflow-hidden bg-white">
              <button onclick="toggleFaq(1)" class="w-full p-4 text-left font-bold text-[#0F0F0F] flex items-center justify-between hover:bg-zinc-50 transition">
                <span>1. ทำไม AppSheet จึงไม่บันทึกรูปภาพลายเซ็นเป็นไฟล์ลงในเซลล์ชีตโดยตรง?</span>
                <span id="faqIcon1" class="text-base text-zinc-400 font-mono">−</span>
              </button>
              <div id="faqAns1" class="p-4 pt-0 text-[#606060] leading-relaxed border-t border-zinc-100">
                หากนำไบนารีภาพขนาดใหญ่ไปเก็บไว้ในเซลล์ของ Google Sheets จะทำให้ขนาดชีตพองตัวอย่างรวดเร็ว (Sheet Bloat) ส่งผลให้เวลาโหลดข้อมูลช้ามากและอาจชนขีดจำกัดขนาด 10 ล้านเซลล์ของ Google Drive ดังนั้น AppSheet จึงใช้รูปแบบ <strong>Decoupled Asset Pattern</strong> โดยเก็บไฟล์ภาพจริงไว้บน Google Drive Storage แล้วบันทึกเพียง Relative Path สั้นๆ ในชีตเพื่อประสิทธิภาพสูงสุด
              </div>
            </div>

            <!-- FAQ 2 -->
            <div class="border border-[#E5E5E5] rounded-xl overflow-hidden bg-white">
              <button onclick="toggleFaq(2)" class="w-full p-4 text-left font-bold text-[#0F0F0F] flex items-center justify-between hover:bg-zinc-50 transition">
                <span>2. เราสามารถเปิดกล้องสแกน Barcode ขณะที่สมาร์ตโฟนไม่มีอินเทอร์เน็ต (Offline) ได้หรือไม่?</span>
                <span id="faqIcon2" class="text-base text-zinc-400 font-mono">+</span>
              </button>
              <div id="faqAns2" class="hidden p-4 pt-0 text-[#606060] leading-relaxed border-t border-zinc-100">
                <strong>ทำได้ 100%!</strong> เพราะการประมวลผลถอดรหัสบาร์โค้ด (Image Decoding) เกิดขึ้นที่ระดับเซนเซอร์และชิปประมวลผลบนเครื่องสมาร์ตโฟนของผู้ใช้ (On-Device Local Processing) โดยไม่ต้องส่งภาพขึ้นคลาวด์ เมื่อสแกนติด ข้อมูลจะถูกจัดเก็บไว้ใน Local Database ของแอปก่อน และจะทำการซิงก์ขึ้น Google Sheets ทันทีเมื่อเครื่องกลับมาต่อเน็ต
              </div>
            </div>

            <!-- FAQ 3 -->
            <div class="border border-[#E5E5E5] rounded-xl overflow-hidden bg-white">
              <button onclick="toggleFaq(3)" class="w-full p-4 text-left font-bold text-[#0F0F0F] flex items-center justify-between hover:bg-zinc-50 transition">
                <span>3. หากต้องการให้เปิดกล้องสแกนได้ทั้งกล้องหน้าและกล้องหลัง ต้องตั้งค่าอย่างไร?</span>
                <span id="faqIcon3" class="text-base text-zinc-400 font-mono">+</span>
              </button>
              <div id="faqAns3" class="hidden p-4 pt-0 text-[#606060] leading-relaxed border-t border-zinc-100">
                โดยค่าเริ่มต้น AppSheet จะเปิดกล้องหลัง (Rear Camera) เพราะมีระบบ Auto-focus ที่จับภาพบาร์โค้ดได้คมชัดที่สุด แต่ที่หน้าจอวิวกล้องของสมาร์ตโฟน จะมีไอคอนรูปกล้องสลับทิศทาง (Flip Camera Icon) ให้ผู้ใช้สามารถแตะเพื่อสลับเป็นกล้องหน้าได้ตลอดเวลา
              </div>
            </div>

            <!-- FAQ 4 -->
            <div class="border border-[#E5E5E5] rounded-xl overflow-hidden bg-white">
              <button onclick="toggleFaq(4)" class="w-full p-4 text-left font-bold text-[#0F0F0F] flex items-center justify-between hover:bg-zinc-50 transition">
                <span>4. ลายเซ็นดิจิทัลบน AppSheet สามารถนำไปใช้ในเอกสารใบเสร็จ PDF ได้หรือไม่?</span>
                <span id="faqIcon4" class="text-base text-zinc-400 font-mono">+</span>
              </button>
              <div id="faqAns4" class="hidden p-4 pt-0 text-[#606060] leading-relaxed border-t border-zinc-100">
                <strong>สามารถนำไปออกรายงานได้อย่างสมบูรณ์แบบ!</strong> ในบทที่ 12 เราจะได้เรียนการสร้าง Automation Bot สำหรับออกใบเสร็จ PDF โดยเราสามารถนำแท็ก <code>&lt;&lt;[Customer_Signature]&gt;&gt;</code> ไปวางไว้ในเทมเพลต Google Docs ระบบจะดึงภาพลายเซ็นมาวางบนเอกสารอัตโนมัติ
              </div>
            </div>

            <!-- FAQ 5 -->
            <div class="border border-[#E5E5E5] rounded-xl overflow-hidden bg-white">
              <button onclick="toggleFaq(5)" class="w-full p-4 text-left font-bold text-[#0F0F0F] flex items-center justify-between hover:bg-zinc-50 transition">
                <span>5. บาร์โค้ดแบบ 1 มิติ (1D EAN-13) กับ 2 มิติ (2D QR Code) มีความแตกต่างกันอย่างไรในการใช้งาน?</span>
                <span id="faqIcon5" class="text-base text-zinc-400 font-mono">+</span>
              </button>
              <div id="faqAns5" class="hidden p-4 pt-0 text-[#606060] leading-relaxed border-t border-zinc-100">
                1D Barcode (แท่งลายเส้น) เก็บข้อมูลได้เฉพาะตัวเลขหรือข้อความสั้นๆ ประมาณ 8-20 หลัก เหมาะกับสินค้าค้าปลีกที่มีรหัสสากล ส่วน 2D QR Code เก็บข้อมูลได้มากถึงหลักพันตัวอักษร และมีระบบ Error Correction (แก้ไขจุดเสียหาย) จึงทนทานต่อการเปียกน้ำหรือรอยขีดข่วน เหมาะกับแท็กปลอกคอสัตว์เลี้ยงและป้ายครุภัณฑ์
              </div>
            </div>

            <!-- FAQ 6 -->
            <div class="border border-[#E5E5E5] rounded-xl overflow-hidden bg-white">
              <button onclick="toggleFaq(6)" class="w-full p-4 text-left font-bold text-[#0F0F0F] flex items-center justify-between hover:bg-zinc-50 transition">
                <span>6. ถ้าพนักงานพิมพ์รหัสผิดเอง ระบบจะป้องกันได้อย่างไร?</span>
                <span id="faqIcon6" class="text-base text-zinc-400 font-mono">+</span>
              </button>
              <div id="faqAns6" class="hidden p-4 pt-0 text-[#606060] leading-relaxed border-t border-zinc-100">
                เราสามารถตั้งค่าคุณสมบัติ <strong>Valid_If</strong> ให้กับคอลัมน์ เช่น <code class="font-mono">IN([_THIS], Products[Barcode])</code> ซึ่งจะบังคับว่าค่าที่พิมพ์หรือสแกนเข้ามา จะต้องมีรหัสตัวนี้บันทึกอยู่ในสต๊อกสินค้าจริงเท่านั้น หากไม่ตรง ระบบจะขึ้นเตือนสีแดงและไม่ยอมให้กดบันทึก
              </div>
            </div>
          </div>

          <!-- Course Navigation Bar -->
          <div class="pt-8 border-t border-[#E5E5E5] space-y-4">
            <div class="p-6 rounded-2xl bg-[#0F0F0F] text-white flex flex-col md:flex-row items-center justify-between gap-4">
              <div class="space-y-1 text-center md:text-left">
                <span class="text-xs text-zinc-400 font-mono">BROADCAST CURRICULUM NAVIGATION</span>
                <div class="text-base font-bold text-white">เส้นทางการเรียนรู้สู่สัปดาห์ถัดไป</div>
                <p class="text-xs text-zinc-400">ในบทที่ 11 เราจะเชื่อมต่อระบบดาวเทียมระบุพิกัด GPS และ Google Maps นำทางเลี้ยวต่อเลี้ยว!</p>
              </div>

              <!-- Navigation Button Group -->
              <div class="flex flex-wrap items-center gap-2">
                <a href="ch09-brand-actions.html" class="h-10 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold flex items-center gap-1.5 transition">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
                  <span>บทก่อนหน้า (บทที่ 9)</span>
                </a>
                <a href="index.html" class="h-10 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold flex items-center gap-1.5 transition">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                  <span>สารบัญ</span>
                </a>
                <a href="ch11-gps-maps.html" class="h-10 px-5 rounded-xl bg-[#FF0000] hover:bg-[#CC0000] text-white text-xs font-bold flex items-center gap-1.5 transition shadow-lg shadow-red-900/30">
                  <span>บทถัดไป: GPS & Maps (บทที่ 11)</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </a>
              </div>
            </div>
          </div>
        </article>

        <!-- ───────────────────────────────────────────────────────────── -->
        <!-- SECTION 13: COMMUNITY & COMMENTS STREAM -->
        <!-- ───────────────────────────────────────────────────────────── -->
        <article id="comments-section" class="scroll-mt-20 space-y-6 pt-10 border-t border-[#E5E5E5]">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="font-bold text-lg text-[#0F0F0F]">ความคิดเห็นและกระดานถาม-ตอบประจำบทเรียน</span>
              <span class="text-xs text-[#606060] font-mono">(จำลองการโต้ตอบ)</span>
            </div>
          </div>

          <!-- New Comment Input -->
          <div class="flex items-start gap-3 p-4 rounded-2xl bg-zinc-50 border border-[#E5E5E5]">
            <div class="w-9 h-9 rounded-full bg-[#0F0F0F] text-white flex items-center justify-center font-bold text-xs shrink-0">
              ME
            </div>
            <div class="flex-1 space-y-2">
              <input 
                type="text" 
                id="commentInput" 
                placeholder="มีข้อสงสัยเรื่องการตั้งค่า Scannable หรือสูตร ISBLANK เขียนคำถามที่นี่..." 
                class="w-full h-10 px-4 bg-white border border-[#E5E5E5] rounded-xl text-xs text-[#0F0F0F] focus:outline-none focus:border-[#FF0000]"
              />
              <div class="flex items-center justify-end gap-2">
                <button onclick="clearComment()" class="h-8 px-3 rounded-lg text-xs text-zinc-500 hover:text-[#0F0F0F] transition">
                  ยกเลิก
                </button>
                <button onclick="postComment()" class="h-8 px-4 rounded-lg bg-[#FF0000] hover:bg-[#CC0000] text-white text-xs font-bold transition">
                  ส่งความคิดเห็น
                </button>
              </div>
            </div>
          </div>

          <!-- Comment Stream List -->
          <div id="commentList" class="space-y-3">
            <!-- Simulated Comment 1 -->
            <div class="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#E5E5E5] text-xs">
              <div class="w-8 h-8 rounded-full bg-blue-100 text-[#065FD4] flex items-center justify-center font-bold text-[11px] shrink-0">
                TK
              </div>
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span class="font-bold text-[#0F0F0F]">ธนกฤต ชนะชัย (กลุ่ม Fresh Brew)</span>
                  <span class="text-[10px] text-[#606060]">1 ชั่วโมงที่แล้ว</span>
                </div>
                <p class="text-[#0F0F0F] leading-relaxed">
                  อาจารย์ครับ ตอนสแกนบาร์โค้ดบนจอมือถือ กล้องเปิดเร็วมากครับ ใช้เวลาน้อยกว่า 1 วินาทีจริงตามทฤษฎีเลยครับ กลุ่มผมลองทำทั้ง 1D Barcode และ QR Code ผ่านฉลุยครับ!
                </p>
                <div class="flex items-center gap-3 pt-1 text-zinc-500 text-[11px]">
                  <button class="hover:text-[#0F0F0F] flex items-center gap-1">👍 14</button>
                  <button class="hover:text-[#0F0F0F]">ตอบกลับ</button>
                </div>
              </div>
            </div>

            <!-- Simulated Comment 2 (Teacher reply) -->
            <div class="flex items-start gap-3 p-3 rounded-xl bg-red-50/50 border border-red-100 text-xs ml-6">
              <div class="w-8 h-8 rounded-full bg-[#0F0F0F] text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                MK
              </div>
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span class="font-bold text-[#FF0000]">ครูแม็ค (อาจารย์ผู้สอน)</span>
                  <span class="text-[9px] bg-red-100 text-[#FF0000] px-1.5 py-0.2 rounded font-bold">ผู้สอน</span>
                  <span class="text-[10px] text-[#606060]">45 นาทีที่แล้ว</span>
                </div>
                <p class="text-[#0F0F0F] leading-relaxed">
                  ยอดเยี่ยมมากครับธนกฤต อย่าลืมใส่สูตร <code>ISBLANK([_THIS])</code> ที่ช่อง Editable ของลายเซ็นด้วยนะ เพื่อให้ระบบมี Audit Trail สมบูรณ์แบบตามเกณฑ์ 10 คะแนนครับ
                </p>
              </div>
            </div>
          </div>
        </article>
      </div> <!-- End Max-w-5xl -->

      <!-- Footer -->
      <footer class="mt-16 bg-[#0F0F0F] text-zinc-400 py-10 px-4 sm:px-8 border-t border-zinc-800 text-xs">
        <div class="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            <div class="w-6 h-5 bg-[#FF0000] rounded flex items-center justify-center text-white font-bold text-xs">
              <svg class="w-3.5 h-3.5 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <span class="font-bold text-white">ห้องเรียนครูแม็ค BROADCAST</span>
            <span class="text-zinc-500">| วิทยาลัยเทคโนโลยีและอุตสาหกรรมการต่อเรือหนองคาย</span>
          </div>
          <div class="text-zinc-500 text-[11px]">
            หลักสูตร ปวส. 31910-2022 การพัฒนาโปรแกรมบนอุปกรณ์สื่อสารแบบพกพา • สัปดาห์ที่ 10
          </div>
        </div>
      </footer>
    </main>
  </div>

  <!-- Toast Notification Element -->
  <div id="toast" class="hidden fixed bottom-6 right-6 z-[120] bg-[#0F0F0F] text-white px-5 py-3 rounded-2xl shadow-2xl border border-zinc-700 items-center gap-3 text-xs">
    <span class="w-2 h-2 rounded-full bg-[#2BA640]"></span>
    <span id="toastMsg" class="font-medium">การแจ้งเตือน</span>
  </div>

  <!-- ========================================================================= -->
  <!-- JAVASCRIPT LOGIC (Interactive Widgets, Canvas, Simulator & LocalStorage) -->
  <!-- ========================================================================= -->
  <script>
    // -------------------------------------------------------------
    // 1. Reading Scroll Progress Bar
    // -------------------------------------------------------------
    const mainViewport = document.getElementById('mainViewport');
    const scrollProgressBar = document.getElementById('scrollProgressBar');

    mainViewport.addEventListener('scroll', () => {
      const scrollTop = mainViewport.scrollTop;
      const scrollHeight = mainViewport.scrollHeight - mainViewport.clientHeight;
      const pct = (scrollTop / scrollHeight) * 100;
      scrollProgressBar.style.width = Math.min(100, Math.max(0, pct)) + '%';
    });

    // -------------------------------------------------------------
    // 2. Sidebar Toggle
    // -------------------------------------------------------------
    function toggleSidebar() {
      const sidebar = document.getElementById('sidebar');
      sidebar.classList.toggle('hidden');
    }

    // -------------------------------------------------------------
    // 3. Notification Popover
    // -------------------------------------------------------------
    function toggleNotifPopover() {
      const popover = document.getElementById('notifPopover');
      popover.classList.toggle('hidden');
    }

    // -------------------------------------------------------------
    // 4. Horizontal Chip Filter Navigation
    // -------------------------------------------------------------
    function filterChip(targetId, btn) {
      document.querySelectorAll('.chip-btn').forEach(b => {
        b.className = 'chip-btn h-8 px-3.5 rounded-full text-xs font-medium bg-[#F2F2F2] text-[#0F0F0F] hover:bg-[#E5E5E5] transition shrink-0';
      });
      btn.className = 'chip-btn active h-8 px-4 rounded-full text-xs font-bold bg-[#0F0F0F] text-white transition shrink-0';

      if (targetId === 'all') {
        mainViewport.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }

    // -------------------------------------------------------------
    // 5. Tri-Archetype Switcher for Workshop Section
    // -------------------------------------------------------------
    let currentArchetype = 'freshbrew';

    function switchWorkshopArchetype(type) {
      currentArchetype = type;

      // Update tabs
      document.querySelectorAll('.ws-tab').forEach(t => {
        t.className = 'ws-tab flex-1 min-w-[140px] py-2.5 px-3 rounded-xl font-medium text-xs text-[#606060] hover:text-[#0F0F0F] transition flex items-center justify-center gap-2';
      });
      const activeTab = document.getElementById('wsTab-' + type);
      if (activeTab) {
        activeTab.className = 'ws-tab flex-1 min-w-[140px] py-2.5 px-3 rounded-xl font-bold text-xs bg-white text-[#0F0F0F] shadow-sm transition flex items-center justify-center gap-2';
      }

      // Update views
      document.querySelectorAll('.ws-content').forEach(c => c.classList.add('hidden'));
      const activeContent = document.getElementById('wsContent-' + type);
      if (activeContent) activeContent.classList.remove('hidden');

      // Sync with Phone simulator
      simArchetype = type;
      updateSimContent();
    }

    // -------------------------------------------------------------
    // 6. Mobile Phone Simulator (320x640)
    // -------------------------------------------------------------
    let simCurrentStep = 1;
    let simArchetype = 'freshbrew';

    const simDatabase = {
      freshbrew: {
        header: 'Fresh Brew POS',
        mode: 'Retail POS',
        code: '8851234567890',
        itemName: 'ครัวซองต์เนยสดอัลมอนด์ (Croissant Almond)',
        itemCategory: 'Bakery & Pastry',
        price: '65.00 บาท',
        stock: '14 ชิ้นคงเหลือ',
        imageSvg: '<svg class="w-12 h-12 text-amber-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',
        signatureTitle: 'เซ็นรับมอบเครื่องดื่ม & เบเกอรี่ (Delivery Sign-off)',
        signerName: 'สมชาย มั่นคง (ลูกค้า)',
        receiptTitle: 'ใบเสร็จและใบส่งมอบ #ORD-2026-892'
      },
      happypaws: {
        header: 'Happy Paws Care',
        mode: 'Clinic & Grooming',
        code: 'PAW-9901',
        itemName: 'ไมโล (Milo) - สุนัขโกลเด้นรีทรีฟเวอร์',
        itemCategory: 'อายุ 2 ปี • น้ำหนัก 28.5 kg',
        price: 'ค่าบริการอาบน้ำตัดขน 450 บาท',
        stock: 'วัคซีนครบถ้วน (ไม่มีประวัติแพ้ยา)',
        imageSvg: '<svg class="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M4.5 10.5C3.67 10.5 3 11.17 3 12s.67 1.5 1.5 1.5S6 12.83 6 12s-.67-1.5-1.5-1.5zm3-3C6.67 7.5 6 8.17 6 9s.67 1.5 1.5 1.5S9 9.83 9 9s-.67-1.5-1.5-1.5zm9 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm3 3c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zM12 11.5c-2.33 0-4.31 1.46-5.11 3.5h10.22c-.8-2.04-2.78-3.5-5.11-3.5z"/></svg>',
        signatureTitle: 'เซ็นยินยอมรับการดูแลรักษา (Owner Consent)',
        signerName: 'คุณกานดา รักสัตว์ (เจ้าของ)',
        receiptTitle: 'บัตรนัดหมายและใบรับสัตว์ #PET-9901'
      },
      smartborrow: {
        header: 'Smart Equipment',
        mode: 'Asset Management',
        code: 'EQUIP-CAM-001',
        itemName: 'Sony Alpha 7 IV Kit 28-70mm',
        itemCategory: 'กล้องและอุปกรณ์บันทึกภาพดิจิทัล',
        price: 'มูลค่าครุภัณฑ์ 89,000 บาท',
        stock: 'พร้อมใช้งาน (สภาพ A+ สมบูรณ์)',
        imageSvg: '<svg class="w-12 h-12 text-emerald-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/></svg>',
        signatureTitle: 'เซ็นรับมอบอุปกรณ์ครุภัณฑ์ (Borrower Sign-off)',
        signerName: 'นายณภัทร สมบูรณ์ (ผู้เบิกยืม)',
        receiptTitle: 'ใบเบิกยืมครุภัณฑ์ #BRW-CAM-440'
      }
    };

    function updateSimContent() {
      const data = simDatabase[simArchetype];
      document.getElementById('simAppHeaderTitle').innerText = data.header;
      document.getElementById('simModeTag').innerText = data.mode;
      document.getElementById('simStepBadge').innerText = 'ขั้นตอน ' + simCurrentStep + ' / 4';

      const screen = document.getElementById('simScreenBody');

      // Update button visual styles
      for (let i = 1; i <= 4; i++) {
        const btn = document.getElementById('simStepBtn' + i);
        if (i === simCurrentStep) {
          btn.className = 'p-2 rounded-xl border border-[#FF0000] bg-red-50 text-[#FF0000] font-bold text-[11px] transition text-center';
        } else {
          btn.className = 'p-2 rounded-xl border border-[#E5E5E5] bg-white text-[#606060] font-medium text-[11px] hover:bg-zinc-100 transition text-center';
        }
      }

      if (simCurrentStep === 1) {
        screen.innerHTML = \`
          <div class="space-y-3">
            <div class="flex items-center justify-between text-zinc-500 text-[10px]">
              <span>สแกนเนอร์เปิดใช้งาน [✓] Scannable</span>
              <span class="text-[#FF0000] font-bold animate-pulse">● LIVE CAMERA</span>
            </div>

            <!-- Viewfinder Camera Box -->
            <div class="h-64 bg-zinc-900 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center border-2 border-zinc-700 shadow-inner">
              <!-- Laser Sweep Line -->
              <div class="laser-line"></div>

              <!-- Reticle Corners -->
              <div class="viewfinder-corner top-4 left-4 border-t-2 border-l-2"></div>
              <div class="viewfinder-corner top-4 right-4 border-t-2 border-r-2"></div>
              <div class="viewfinder-corner bottom-4 left-4 border-b-2 border-l-2"></div>
              <div class="viewfinder-corner bottom-4 right-4 border-b-2 border-r-2"></div>

              <!-- Center Target Graphic -->
              <div class="text-center space-y-2 z-10 p-4">
                <div class="w-32 h-14 mx-auto bg-white/95 rounded-lg p-1.5 flex flex-col items-center justify-center border border-zinc-300 shadow">
                  <div class="font-mono text-[9px] text-[#0F0F0F] tracking-widest">||| |||| | ||||| | |||</div>
                  <div class="font-mono text-[10px] font-bold text-[#0F0F0F] mt-0.5">\${data.code}</div>
                </div>
                <div class="text-[10px] text-zinc-300 font-medium bg-black/60 px-3 py-1 rounded-full backdrop-blur">
                  เล็งกรอบเลเซอร์ไปที่รหัสบาร์โค้ด...
                </div>
              </div>
            </div>

            <button onclick="simTriggerScanSuccess()" class="w-full py-2.5 rounded-xl bg-[#FF0000] hover:bg-[#CC0000] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path></svg>
              <span>กดจำลองการสแกนติด (Fast Scan)</span>
            </button>
          </div>
        \`;
      } else if (simCurrentStep === 2) {
        screen.innerHTML = \`
          <div class="space-y-3">
            <div class="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] flex items-center justify-between">
              <span class="font-bold">✓ สแกนสำเร็จ! ถอดรหัส:</span>
              <span class="font-mono font-bold">\${data.code}</span>
            </div>

            <!-- Product Card retrieved from Database -->
            <div class="p-4 rounded-2xl bg-white border border-[#E5E5E5] space-y-3 shadow-sm">
              <div class="flex items-center gap-3">
                <div class="w-14 h-14 rounded-xl bg-zinc-100 flex items-center justify-center shrink-0 border border-zinc-200">
                  \${data.imageSvg}
                </div>
                <div class="space-y-0.5">
                  <div class="text-[10px] text-zinc-500 font-medium">\${data.itemCategory}</div>
                  <div class="font-bold text-xs text-[#0F0F0F] leading-snug">\${data.itemName}</div>
                  <div class="font-mono font-black text-sm text-[#FF0000]">\${data.price}</div>
                </div>
              </div>

              <div class="pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px]">
                <span class="text-zinc-500">สถานะสต๊อก:</span>
                <span class="font-bold text-[#2BA640]">\${data.stock}</span>
              </div>
            </div>

            <button onclick="simSetStep(3)" class="w-full py-2.5 rounded-xl bg-[#0F0F0F] hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow">
              <span>ไปขั้นตอนเซ็นชื่อรับรอง ➔</span>
            </button>
          </div>
        \`;
      } else if (simCurrentStep === 3) {
        screen.innerHTML = \`
          <div class="space-y-3">
            <div class="text-[11px] font-bold text-[#0F0F0F]">\${data.signatureTitle}</div>
            
            <div class="p-3 rounded-2xl bg-white border border-[#E5E5E5] space-y-2 shadow-sm">
              <div class="flex items-center justify-between text-[10px] text-zinc-500">
                <span>ผู้ลงนาม: \${data.signerName}</span>
                <span class="font-mono">NOW()</span>
              </div>

              <!-- Mobile Canvas Frame -->
              <div class="h-28 bg-zinc-50 border-2 border-dashed border-zinc-300 rounded-xl flex items-center justify-center relative overflow-hidden">
                <svg class="w-48 h-16 text-[#065FD4]" viewBox="0 0 200 60" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M 25,40 Q 50,15 75,35 T 120,20 Q 140,45 160,25 T 185,38" />
                  <path d="M 50,48 L 165,46" stroke-width="1.5" stroke-dasharray="2 2" />
                </svg>
                <div class="absolute bottom-1 right-2 text-[9px] text-zinc-400 font-mono">
                  [Touch Signature Pad]
                </div>
              </div>

              <div class="text-[10px] text-zinc-500 flex items-center justify-between">
                <span>ความปลอดภัย: ISBLANK([_THIS])</span>
                <span class="text-[#2BA640] font-bold">✓ เซ็นแล้ว</span>
              </div>
            </div>

            <button onclick="simSetStep(4)" class="w-full py-2.5 rounded-xl bg-[#2BA640] hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              <span>บันทึกและล็อกข้อมูลถาวร</span>
            </button>
          </div>
        \`;
      } else if (simCurrentStep === 4) {
        screen.innerHTML = \`
          <div class="space-y-3 text-center">
            <div class="p-4 rounded-2xl bg-white border border-zinc-200 space-y-2.5 shadow-sm text-left">
              <div class="flex items-center justify-between">
                <span class="px-2 py-0.5 rounded bg-emerald-100 text-[#2BA640] text-[9px] font-bold">AUDIT TRAIL VERIFIED</span>
                <span class="text-[9px] font-mono text-zinc-400">STATUS: COMPLETED</span>
              </div>

              <div class="font-bold text-xs text-[#0F0F0F]">\${data.receiptTitle}</div>
              <div class="text-[11px] text-zinc-500">บันทึกลง Google Sheets และ Google Drive เรียบร้อยแล้ว</div>

              <div class="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-[10px] space-y-1 font-mono">
                <div><span class="text-zinc-400">File:</span> Orders_Images/8f2b4c10.png</div>
                <div><span class="text-zinc-400">Signer:</span> \${data.signerName}</div>
                <div><span class="text-zinc-400">Lock:</span> ISBLANK([_THIS]) = FALSE 🔒</div>
              </div>
            </div>

            <button onclick="simSetStep(1)" class="text-xs text-[#065FD4] font-bold hover:underline">
              ← กลับไปเริ่มสแกนรายการใหม่
            </button>
          </div>
        \`;
      }
    }

    function simTriggerScanSuccess() {
      playScannerBeep();
      showToast('ตรวจพบบาร์โค้ดสำเร็จ!');
      simSetStep(2);
    }

    function simSetStep(step) {
      simCurrentStep = step;
      updateSimContent();
    }

    function simNextStep() {
      if (simCurrentStep < 4) simCurrentStep++;
      else simCurrentStep = 1;
      updateSimContent();
    }

    function simPrevStep() {
      if (simCurrentStep > 1) simCurrentStep--;
      else simCurrentStep = 4;
      updateSimContent();
    }

    // Web Audio API Synthesizer for Barcode Beep
    function playScannerBeep() {
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1760, audioCtx.currentTime); // High crisp beep
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.12);
      } catch (e) {
        console.log('Audio not supported or blocked');
      }
    }

    // -------------------------------------------------------------
    // 7. Interactive HTML5 Canvas Digital Signature Pad
    // -------------------------------------------------------------
    const canvas = document.getElementById('signatureCanvas');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let inkColor = '#0F0F0F';
    let hasSignature = false;

    // Stroke settings
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    function setInkColor(color) {
      inkColor = color;
      ctx.strokeStyle = color;
      if (color === '#0F0F0F') {
        document.getElementById('inkBlackBtn').className = 'w-6 h-6 rounded-full bg-[#0F0F0F] ring-2 ring-offset-1 ring-zinc-800 transition';
        document.getElementById('inkBlueBtn').className = 'w-6 h-6 rounded-full bg-[#065FD4] hover:scale-110 transition';
      } else {
        document.getElementById('inkBlackBtn').className = 'w-6 h-6 rounded-full bg-[#0F0F0F] hover:scale-110 transition';
        document.getElementById('inkBlueBtn').className = 'w-6 h-6 rounded-full bg-[#065FD4] ring-2 ring-offset-1 ring-blue-600 transition';
      }
    }

    function getCanvasCoordinates(e) {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      if (e.touches && e.touches[0]) {
        return {
          x: (e.touches[0].clientX - rect.left) * scaleX,
          y: (e.touches[0].clientY - rect.top) * scaleY
        };
      }
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      };
    }

    function startDrawing(e) {
      e.preventDefault();
      isDrawing = true;
      hasSignature = true;
      document.getElementById('canvasPlaceholder').style.display = 'none';
      const pos = getCanvasCoordinates(e);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    }

    function draw(e) {
      if (!isDrawing) return;
      e.preventDefault();
      const pos = getCanvasCoordinates(e);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }

    function stopDrawing() {
      isDrawing = false;
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    window.addEventListener('mouseup', stopDrawing);

    canvas.addEventListener('touchstart', startDrawing, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });
    window.addEventListener('touchend', stopDrawing);

    function clearSignatureCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hasSignature = false;
      document.getElementById('canvasPlaceholder').style.display = 'block';
      document.getElementById('auditLockStatus').className = 'px-2 py-0.5 rounded bg-zinc-200 text-zinc-700 font-mono text-[10px] font-bold';
      document.getElementById('auditLockStatus').innerText = 'รอการลงลายมือชื่อ';
      document.getElementById('auditTimestamp').innerText = '--/--/---- --:--:--';
      document.getElementById('auditFilePath').innerText = '(รอการกดบันทึกเพื่อสร้างไฟล์ PNG)';
      document.getElementById('auditExportPreview').classList.add('hidden');
      showToast('ลบผืนผ้าใบเพื่อเซ็นใหม่เรียบร้อย');
    }

    function saveAndSimulateDriveUpload() {
      if (!hasSignature) {
        alert('กรุณาลงลายมือชื่อบนผืนผ้าใบก่อนทำการบันทึก');
        return;
      }

      const pngData = canvas.toDataURL('image/png');
      const now = new Date();
      const timestampStr = now.toLocaleDateString('th-TH') + ' ' + now.toLocaleTimeString('th-TH');
      const randomHex = Math.random().toString(16).substring(2, 10);
      const simulatedDrivePath = 'Orders_Images/' + randomHex + '.Customer_Signature.' + now.getHours() + now.getMinutes() + now.getSeconds() + '.png';

      // Update Audit UI
      document.getElementById('auditLockStatus').className = 'px-2 py-0.5 rounded bg-red-100 text-[#FF0000] font-mono text-[10px] font-bold';
      document.getElementById('auditLockStatus').innerText = '🔒 LOCKED (ISBLANK=FALSE)';
      document.getElementById('auditTimestamp').innerText = timestampStr;
      document.getElementById('auditFilePath').innerText = simulatedDrivePath;

      document.getElementById('auditPngThumb').src = pngData;
      document.getElementById('auditExportPreview').classList.remove('hidden');

      showToast('จำลองอัปโหลดไฟล์ภาพ PNG ขึ้น Drive สำเร็จแล้ว! ✓');
    }

    // -------------------------------------------------------------
    // 8. Testing Toolkit: Live QR Generator
    // -------------------------------------------------------------
    function updateLiveQrCode() {
      const val = document.getElementById('qrGenInput').value.trim();
      if (!val) return;
      const url = 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=' + encodeURIComponent(val);
      document.getElementById('liveQrImage').src = url;
      document.getElementById('liveQrCodeText').innerText = val;
      showToast('สร้าง QR Code สำหรับทดสอบเรียบร้อย');
    }

    function setTestQrCode(code) {
      document.getElementById('qrGenInput').value = code;
      updateLiveQrCode();
    }

    // -------------------------------------------------------------
    // 9. Interactive Self-Checklist (LocalStorage Persistence)
    // -------------------------------------------------------------
    const CHECKLIST_KEY = 'curriculum_ch10_checklist';

    function initChecklist() {
      const saved = localStorage.getItem(CHECKLIST_KEY);
      if (saved) {
        try {
          const checkedArr = JSON.parse(saved);
          const checkboxes = document.querySelectorAll('.check-item');
          checkboxes.forEach((cb, index) => {
            cb.checked = !!checkedArr[index];
          });
        } catch (e) {}
      }
      calculateChecklist();
    }

    function updateChecklist() {
      const checkboxes = document.querySelectorAll('.check-item');
      const checkedArr = Array.from(checkboxes).map(cb => cb.checked);
      localStorage.setItem(CHECKLIST_KEY, JSON.stringify(checkedArr));
      calculateChecklist();
    }

    function calculateChecklist() {
      const checkboxes = document.querySelectorAll('.check-item');
      const total = checkboxes.length;
      let checked = 0;
      checkboxes.forEach(cb => {
        if (cb.checked) checked++;
      });

      const pct = Math.round((checked / total) * 100);
      document.getElementById('checklistPercentage').innerText = pct + '%';
      document.getElementById('checklistProgressBar').style.width = pct + '%';
      document.getElementById('checklistCount').innerText = 'เสร็จสิ้น ' + checked + ' จาก ' + total + ' ข้อกำหนด';

      const badge = document.getElementById('checklistBadge');
      if (pct === 100) {
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }
    }

    function resetChecklist() {
      if (confirm('คุณต้องการรีเซ็ตสถานะการตรวจสอบตนเองทั้งหมดหรือไม่?')) {
        localStorage.removeItem(CHECKLIST_KEY);
        const checkboxes = document.querySelectorAll('.check-item');
        checkboxes.forEach(cb => cb.checked = false);
        calculateChecklist();
        showToast('รีเซ็ตสถานะเช็คลิสต์แล้ว');
      }
    }

    // -------------------------------------------------------------
    // 10. Interactive Rubric Calculator (10 Points)
    // -------------------------------------------------------------
    function calcRubric() {
      let total = 0;
      for (let i = 1; i <= 5; i++) {
        const val = parseInt(document.querySelector('input[name="rc' + i + '"]:checked').value);
        total += val;
        document.getElementById('rubricC' + i + 'Score').innerText = val + ' คะแนน';

        // Update card styles
        const labels = document.querySelectorAll('input[name="rc' + i + '"]');
        labels.forEach(input => {
          const parent = input.closest('label');
          if (input.checked) {
            parent.className = 'rubric-opt flex flex-col justify-between p-3 rounded-xl border-2 border-[#0F0F0F] bg-zinc-50 cursor-pointer transition';
          } else {
            parent.className = 'rubric-opt flex flex-col justify-between p-3 rounded-xl border border-[#E5E5E5] bg-white cursor-pointer hover:bg-zinc-50 transition';
          }
        });
      }

      document.getElementById('rubricTotal').innerText = total;

      const badge = document.getElementById('rubricBadge');
      const diag = document.getElementById('rubricDiagnostic');

      if (total >= 9) {
        badge.className = 'px-3.5 py-1.5 rounded-xl bg-emerald-100 text-[#2BA640] font-bold text-xs border border-emerald-300';
        badge.innerText = 'ระดับ: ดีเยี่ยม (Mastered / Grade A)';
        diag.className = 'p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-[#2BA640] leading-relaxed';
        diag.innerHTML = '<strong>ข้อเสนอแนะเชิงวิชาการ:</strong> ยอดเยี่ยมมาก! สถาปัตยกรรมฮาร์ดแวร์และการสร้าง Audit Trail ของทีมท่านมีความสมบูรณ์แบบระดับวิศวกรซอฟต์แวร์ พร้อมสำหรับการต่อยอดระบบแผนที่นำทาง GPS ในสัปดาห์ที่ 11';
      } else if (total >= 7) {
        badge.className = 'px-3.5 py-1.5 rounded-xl bg-blue-100 text-[#065FD4] font-bold text-xs border border-blue-300';
        badge.innerText = 'ระดับ: ดี (Proficient / Grade B)';
        diag.className = 'p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-[#065FD4] leading-relaxed';
        diag.innerHTML = '<strong>ข้อเสนอแนะเชิงวิชาการ:</strong> ระบบทำงานได้ดีมาก แนะนำให้ตรวจสอบความคมชัดของภาพที่บันทึกลงใน Drive และทดสอบยิงสแกนในสภาวะแสงสว่างต่ำอีกครั้ง';
      } else if (total >= 5) {
        badge.className = 'px-3.5 py-1.5 rounded-xl bg-amber-100 text-[#FB8C00] font-bold text-xs border border-amber-300';
        badge.innerText = 'ระดับ: พอใช้ (Developing / Grade C)';
        diag.className = 'p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-[#FB8C00] leading-relaxed';
        diag.innerHTML = '<strong>ข้อเสนอแนะเชิงวิชาการ:</strong> ฟังก์ชันพื้นฐานทำงานได้ แต่ยังขาดระบบความปลอดภัย อย่าลืมใส่สูตร ISBLANK([_THIS]) ในช่อง Editable? และตรวจสอบการผูกสูตร Scan-to-Lookup';
      } else {
        badge.className = 'px-3.5 py-1.5 rounded-xl bg-red-100 text-[#FF0000] font-bold text-xs border border-red-300';
        badge.innerText = 'ระดับ: ควรปรับปรุง (Needs Revision)';
        diag.className = 'p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-[#FF0000] leading-relaxed';
        diag.innerHTML = '<strong>ข้อเสนอแนะเชิงวิชาการ:</strong> กล้องยังไม่สามารถเปิดใช้งานได้ หรือลายเซ็นยังไม่บันทึกลงระบบ ให้ทบทวนหัวข้อที่ 1 และ 2 และตรวจสอบสิทธิ์เข้าถึงกล้อง (Permission) อีกครั้ง';
      }
    }

    // -------------------------------------------------------------
    // 11. FAQ Accordion Logic
    // -------------------------------------------------------------
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

    // -------------------------------------------------------------
    // 12. Copy to Clipboard Utility & Toast
    // -------------------------------------------------------------
    function copyText(str, btn) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(str).then(() => {
          showToast('คัดลอกข้อความสำเร็จแล้ว!');
        });
      } else {
        const input = document.createElement('textarea');
        input.value = str;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        showToast('คัดลอกข้อความสำเร็จแล้ว!');
      }

      if (btn) {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span class="text-[#2BA640] font-bold">คัดลอกแล้ว! ✓</span>';
        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 2000);
      }
    }

    function showToast(msg) {
      const toast = document.getElementById('toast');
      const toastMsg = document.getElementById('toastMsg');
      toastMsg.innerText = msg;
      toast.classList.remove('hidden');
      toast.classList.add('flex', 'toast-anim');
      setTimeout(() => {
        toast.classList.add('hidden');
        toast.classList.remove('flex', 'toast-anim');
      }, 2200);
    }

    // -------------------------------------------------------------
    // 13. Social Actions (Like, Subscribe, Comment)
    // -------------------------------------------------------------
    let isSubscribed = false;
    function toggleSubscribe() {
      const btn = document.getElementById('subBtn');
      const text = document.getElementById('subBtnText');
      if (!isSubscribed) {
        btn.className = 'h-8 px-4 bg-[#F2F2F2] hover:bg-[#E5E5E5] text-[#0F0F0F] text-xs font-bold rounded-full flex items-center gap-1.5 transition';
        text.innerText = 'ติดตามแล้ว ✓';
        isSubscribed = true;
        showToast('ติดตามรายวิชาเรียบร้อยแล้ว');
      } else {
        btn.className = 'h-8 px-4 bg-white hover:bg-zinc-200 text-[#0F0F0F] font-bold flex items-center gap-1.5 transition';
        text.innerText = 'ติดตามรายวิชา';
        isSubscribed = false;
      }
    }

    let isLiked = false;
    function toggleLike() {
      const countEl = document.getElementById('likeCount');
      const iconEl = document.getElementById('likeIcon');
      let count = parseInt(countEl.innerText);
      if (!isLiked) {
        countEl.innerText = count + 1;
        iconEl.classList.remove('text-zinc-400');
        iconEl.classList.add('text-[#FF0000]', 'fill-current');
        isLiked = true;
        showToast('ถูกใจบทเรียนนี้');
      } else {
        countEl.innerText = count - 1;
        iconEl.classList.add('text-zinc-400');
        iconEl.classList.remove('text-[#FF0000]', 'fill-current');
        isLiked = false;
      }
    }

    function shareLesson() {
      copyText(window.location.href);
      showToast('คัดลอกลิงก์บทเรียนเรียบร้อย');
    }

    function postComment() {
      const input = document.getElementById('commentInput');
      const text = input.value.trim();
      if (!text) return;

      const list = document.getElementById('commentList');
      const newComment = document.createElement('div');
      newComment.className = 'flex items-start gap-3 bg-red-50/40 p-3 rounded-xl border border-red-100 text-xs';
      newComment.innerHTML = \`
        <div class="w-8 h-8 rounded-full bg-[#0F0F0F] text-white flex items-center justify-center font-bold text-[11px] shrink-0">ME</div>
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <span class="font-bold text-[#0F0F0F]">นักศึกษา (คุณ)</span>
            <span class="text-[10px] text-[#606060]">เมื่อสักครู่</span>
          </div>
          <p class="text-[#0F0F0F] leading-relaxed">\${escapeHtml(text)}</p>
          <div class="flex items-center gap-3 pt-1 text-zinc-500 text-[11px]">
            <button class="hover:text-[#0F0F0F] flex items-center gap-1">👍 1</button>
            <button class="hover:text-[#0F0F0F]">ตอบกลับ</button>
          </div>
        </div>
      \`;
      list.prepend(newComment);
      input.value = '';

      const totalCount = document.getElementById('commentTotalCount');
      totalCount.innerText = parseInt(totalCount.innerText) + 1;
      showToast('โพสต์ความคิดเห็นแล้ว');
    }

    function clearComment() {
      document.getElementById('commentInput').value = '';
    }

    function escapeHtml(text) {
      const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
      return text.replace(/[&<>"']/g, m => map[m]);
    }

    function triggerVoiceSearch() {
      alert('ระบบค้นหาด้วยเสียงพร้อมใช้งานในโหมดทดสอบ กรุณาพิมพ์คำค้นหาในช่องค้นหา');
    }

    // -------------------------------------------------------------
    // 14. Search Shortcut & Execution
    // -------------------------------------------------------------
    function performSearch() {
      const q = document.getElementById('searchInput').value.trim();
      if (q && window.find) {
        window.find(q);
      }
    }

    document.getElementById('searchInput').addEventListener('keyup', (e) => {
      if (e.key === 'Enter') performSearch();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
      }
    });

    // Initialize Simulator and Checklist on page load
    updateSimContent();
    initChecklist();
    calcRubric();
  </script>
</body>
</html>
`;
