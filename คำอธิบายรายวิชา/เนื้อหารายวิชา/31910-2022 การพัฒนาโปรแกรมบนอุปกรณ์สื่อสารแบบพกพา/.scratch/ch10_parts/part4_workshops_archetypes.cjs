module.exports = `
        <!-- ───────────────────────────────────────────────────────────── -->
        <!-- SECTION 5: TRI-ARCHETYPE WORKSHOPS -->
        <!-- ───────────────────────────────────────────────────────────── -->
        <article id="archetypes-workshop" class="scroll-mt-20 space-y-8 pt-10 border-t border-[#E5E5E5]">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF0000]">
            <span>หัวข้อที่ 5</span>
          </div>

          <div class="space-y-3">
            <h2 class="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F] tracking-tight">
              5. เวิร์กช็อปปฏิบัติการ: พัฒนาระบบตาม 3 รูปแบบธุรกิจ (Click-by-Click)
            </h2>
            <p class="text-sm sm:text-base text-[#606060] leading-relaxed">
              ให้นักศึกษาแต่ละกลุ่มปฏิบัติตามแนวทางของโมเดลธุรกิจที่กลุ่มตนเองเลือก โดยทุกโมเดลจะผสานการทำงานของ <strong>ระบบสแกนฮาร์ดแวร์ (Camera Barcode/QR Scanner)</strong> ควบคู่กับ <strong>ระบบลายเซ็นดิจิทัล (Digital Signature Pad)</strong>
            </p>
          </div>

          <!-- Tri-Archetype Switcher Navigation Tabs -->
          <div class="p-1.5 bg-[#F2F2F2] rounded-2xl flex flex-wrap gap-1 border border-[#E5E5E5]">
            <button onclick="switchWorkshopArchetype('freshbrew')" id="wsTab-freshbrew" class="ws-tab flex-1 min-w-[140px] py-2.5 px-3 rounded-xl font-bold text-xs bg-white text-[#0F0F0F] shadow-sm transition flex items-center justify-center gap-2">
              <span>☕</span>
              <span>Fresh Brew & Bakery</span>
            </button>
            <button onclick="switchWorkshopArchetype('happypaws')" id="wsTab-happypaws" class="ws-tab flex-1 min-w-[140px] py-2.5 px-3 rounded-xl font-medium text-xs text-[#606060] hover:text-[#0F0F0F] transition flex items-center justify-center gap-2">
              <span>🐾</span>
              <span>Happy Paws Care</span>
            </button>
            <button onclick="switchWorkshopArchetype('smartborrow')" id="wsTab-smartborrow" class="ws-tab flex-1 min-w-[140px] py-2.5 px-3 rounded-xl font-medium text-xs text-[#606060] hover:text-[#0F0F0F] transition flex items-center justify-center gap-2">
              <span>📦</span>
              <span>Smart Equipment Borrow</span>
            </button>
          </div>

          <!-- Archetype 1: Fresh Brew & Bakery -->
          <div id="wsContent-freshbrew" class="ws-content space-y-6">
            <div class="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 flex items-start gap-3">
              <span class="text-2xl">☕</span>
              <div class="space-y-1">
                <div class="font-bold text-[#0F0F0F] text-sm">บริบทธุรกิจ: ร้านกาแฟและเบเกอรี่ Fresh Brew (Retail & Food Ordering)</div>
                <p class="text-xs text-[#606060] leading-relaxed">
                  <strong>ภารกิจ:</strong> ยกระดับร้านกาแฟให้เป็น Mobile POS พนักงานสแกนบาร์โค้ดบนกล่องขนมปังเพื่อคิดเงินอย่างรวดเร็ว และมีระบบให้ลูกค้าลงลายมือชื่อบนหน้าจอมือถือไรเดอร์เพื่อยืนยันการรับเครื่องดื่มเดลิเวอรี่
                </p>
              </div>
            </div>

            <!-- Step by Step -->
            <div class="space-y-4">
              <!-- Step 1 -->
              <div class="p-5 rounded-2xl bg-white border border-[#E5E5E5] shadow-sm space-y-3">
                <div class="flex items-center justify-between border-b border-zinc-100 pb-2">
                  <span class="font-bold text-sm text-[#0F0F0F] flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-[#0F0F0F] text-white flex items-center justify-center text-xs">1</span>
                    <span>ติดตั้งระบบสแกนบาร์โค้ดสินค้า (Product Barcode POS)</span>
                  </span>
                  <span class="text-[10px] bg-red-100 text-[#FF0000] px-2 py-0.5 rounded-full font-bold">ตาราง Products & Order_Details</span>
                </div>

                <div class="text-xs text-[#0F0F0F] space-y-2 leading-relaxed">
                  <ol class="list-decimal pl-5 space-y-1.5 text-[#606060]">
                    <li>เปิดชีต <code class="bg-zinc-100 px-1 rounded font-bold text-[#0F0F0F]">Products</code> บน Google Sheets ตรวจสอบว่ามีคอลัมน์ <code class="font-mono text-[#0F0F0F]">Barcode</code> แล้ว (เช่น ใส่รหัสตัวเลข <code class="font-mono text-red-600">8851234567890</code> สำหรับขนมปังครัวซองต์เนยสด)</li>
                    <li>ใน AppSheet ไปที่ <strong>Data ➔ Columns</strong> ของตาราง <code>Products</code>:
                      <ul class="list-disc pl-5 mt-1 space-y-1">
                        <li>คอลัมน์ <strong>Barcode</strong> ➔ Type: <code class="font-mono font-bold text-[#0F0F0F]">Text</code></li>
                        <li>ติ๊กถูกที่ช่อง <code class="bg-red-50 text-[#FF0000] font-bold px-1 rounded">[✓] Scannable?</code></li>
                        <li>ติ๊กถูกที่ช่อง <code class="bg-blue-50 text-[#065FD4] font-bold px-1 rounded">[✓] Search?</code></li>
                      </ul>
                    </li>
                    <li>ไปที่ตารางลูก <code class="bg-zinc-100 px-1 rounded font-bold text-[#0F0F0F]">Order_Details</code> ➔ คอลัมน์ <strong>Product_ID</strong> (ชนิด <code>Ref</code> ชี้ไปที่ตาราง Products):
                      <ul class="list-disc pl-5 mt-1">
                        <li>ติ๊กถูกที่ช่อง <code class="bg-red-50 text-[#FF0000] font-bold px-1 rounded">[✓] Scannable?</code> ด้วยเช่นกัน</li>
                      </ul>
                    </li>
                  </ol>

                  <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
                    🎉 <strong>ผลลัพธ์หน้างาน:</strong> เวลาเปิดฟอร์มขายสินค้า พนักงานแตะไอคอนรูปกล้องข้างช่องเลือกสินค้า แล้วยกกล้องยิงสแกนบาร์โค้ดบนกล่องขนมปัง รายการสินค้าและราคาจะถูกดึงเข้าบิลสั่งซื้อทันที ไม่ต้องเลื่อนหาในรายการ!
                  </div>
                </div>
              </div>

              <!-- Step 2 -->
              <div class="p-5 rounded-2xl bg-white border border-[#E5E5E5] shadow-sm space-y-3">
                <div class="flex items-center justify-between border-b border-zinc-100 pb-2">
                  <span class="font-bold text-sm text-[#0F0F0F] flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-[#0F0F0F] text-white flex items-center justify-center text-xs">2</span>
                    <span>ติดตั้งระบบเซ็นชื่อรับอาหารเดลิเวอรี่ (Delivery Signature Sign-off)</span>
                  </span>
                  <span class="text-[10px] bg-blue-100 text-[#065FD4] px-2 py-0.5 rounded-full font-bold">ตาราง Orders</span>
                </div>

                <div class="text-xs text-[#0F0F0F] space-y-2 leading-relaxed">
                  <ol class="list-decimal pl-5 space-y-1.5 text-[#606060]">
                    <li>ในชีต <code class="bg-zinc-100 px-1 rounded font-bold text-[#0F0F0F]">Orders</code> เพิ่ม 2 คอลัมน์ใหม่:
                      <code class="font-mono text-[#0F0F0F]">Customer_Signature</code> และ <code class="font-mono text-[#0F0F0F]">Delivered_At</code>
                    </li>
                    <li>ใน AppSheet กดปุ่ม <strong>Regenerate Schema</strong> ที่ตาราง <code>Orders</code></li>
                    <li>กำหนดค่าคอลัมน์:
                      <ul class="list-disc pl-5 mt-1 space-y-1">
                        <li><strong>Customer_Signature</strong> ➔ Type: <code class="font-mono font-bold text-[#065FD4]">Signature</code></li>
                        <li>กำหนด <strong>Show_If:</strong> <code class="font-mono bg-zinc-100 px-1 rounded text-[#0F0F0F]">[Order_Status] = "Delivered"</code> หรือแสดงเฉพาะตอนส่งมอบ</li>
                        <li>กำหนด <strong>Editable?:</strong> <code class="font-mono bg-red-50 text-[#FF0000] font-bold px-1 rounded">ISBLANK([_THIS])</code> (ป้องกันการลบลายเซ็น)</li>
                        <li><strong>Delivered_At</strong> ➔ Type: <code class="font-mono font-bold text-[#0F0F0F]">DateTime</code>, Initial value: <code class="font-mono bg-zinc-100 px-1 rounded text-[#065FD4]">=NOW()</code></li>
                      </ul>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <!-- Archetype 2: Happy Paws Care -->
          <div id="wsContent-happypaws" class="ws-content hidden space-y-6">
            <div class="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 flex items-start gap-3">
              <span class="text-2xl">🐾</span>
              <div class="space-y-1">
                <div class="font-bold text-[#0F0F0F] text-sm">บริบทธุรกิจ: ศูนย์ดูแลและคลินิกสัตว์เลี้ยง Happy Paws Care (Service & Booking)</div>
                <p class="text-xs text-[#606060] leading-relaxed">
                  <strong>ภารกิจ:</strong> สร้างระบบ Pet ID QR Tag บนปลอกคอสุนัข/แมว เมื่อมาถึงคลินิก พนักงานยิงสแกนเพื่อดึงประวัติการฉีดวัคซีนและโรคประจำตัวได้ทันที พร้อมระบบให้เจ้าของเซ็นชื่อยินยอมรับบริการและเงื่อนไขการรักษา (Consent Form)
                </p>
              </div>
            </div>

            <!-- Steps -->
            <div class="space-y-4">
              <!-- Step 1 -->
              <div class="p-5 rounded-2xl bg-white border border-[#E5E5E5] shadow-sm space-y-3">
                <div class="flex items-center justify-between border-b border-zinc-100 pb-2">
                  <span class="font-bold text-sm text-[#0F0F0F] flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-[#0F0F0F] text-white flex items-center justify-center text-xs">1</span>
                    <span>สแกนค้นหาประวัติสัตว์เลี้ยงด้วย Pet Tag (QR Code Tag)</span>
                  </span>
                  <span class="text-[10px] bg-red-100 text-[#FF0000] px-2 py-0.5 rounded-full font-bold">ตาราง Pets</span>
                </div>

                <div class="text-xs text-[#0F0F0F] space-y-2 leading-relaxed">
                  <ol class="list-decimal pl-5 space-y-1.5 text-[#606060]">
                    <li>ในชีต <code class="bg-zinc-100 px-1 rounded font-bold text-[#0F0F0F]">Pets</code> มีคอลัมน์ <code class="font-mono text-[#0F0F0F]">Pet_QR_Code</code> (เช่น ใส่รหัส <code class="font-mono text-blue-600">PAW-9901</code>)</li>
                    <li>ใน AppSheet ตั้งค่าคอลัมน์ <strong>Pet_QR_Code</strong>:
                      <ul class="list-disc pl-5 mt-1 space-y-1">
                        <li>Type: <code class="font-mono font-bold text-[#0F0F0F]">Text</code></li>
                        <li>ติ๊กถูกที่ช่อง <code class="bg-red-50 text-[#FF0000] font-bold px-1 rounded">[✓] Scannable?</code></li>
                        <li>ติ๊กถูกที่ช่อง <code class="bg-blue-50 text-[#065FD4] font-bold px-1 rounded">[✓] Search?</code></li>
                      </ul>
                    </li>
                  </ol>
                  <div class="p-3 rounded-xl bg-blue-50 border border-blue-200 text-[#065FD4] text-xs">
                    💡 <strong>ผลลัพธ์หน้างาน:</strong> เมื่อลูกค้านำสุนัขมาถึง เจ้าหน้าที่แตะไอคอนกล้องที่ช่อง Search ยิงสแกนเหรียญห้อยคอ ข้อมูลประวัติการแพ้ยา ประวัติวัคซีน และเบอร์ติดต่อเจ้าของจะเด้งขึ้นมาบนหน้าจอทันที!
                  </div>
                </div>
              </div>

              <!-- Step 2 -->
              <div class="p-5 rounded-2xl bg-white border border-[#E5E5E5] shadow-sm space-y-3">
                <div class="flex items-center justify-between border-b border-zinc-100 pb-2">
                  <span class="font-bold text-sm text-[#0F0F0F] flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-[#0F0F0F] text-white flex items-center justify-center text-xs">2</span>
                    <span>เซ็นยินยอมเงื่อนไขการบริการและรักษาพยาบาล (Owner Consent Signature)</span>
                  </span>
                  <span class="text-[10px] bg-emerald-100 text-[#2BA640] px-2 py-0.5 rounded-full font-bold">ตาราง Appointments</span>
                </div>

                <div class="text-xs text-[#0F0F0F] space-y-2 leading-relaxed">
                  <ol class="list-decimal pl-5 space-y-1.5 text-[#606060]">
                    <li>ในตาราง <code class="bg-zinc-100 px-1 rounded font-bold text-[#0F0F0F]">Appointments</code> เพิ่ม 2 คอลัมน์:
                      <code class="font-mono text-[#0F0F0F]">Owner_Consent_Signature</code> และ <code class="font-mono text-[#0F0F0F]">Consent_Timestamp</code>
                    </li>
                    <li>ตั้งค่าใน AppSheet:
                      <ul class="list-disc pl-5 mt-1 space-y-1">
                        <li><strong>Owner_Consent_Signature</strong> ➔ Type: <code class="font-mono font-bold text-[#065FD4]">Signature</code></li>
                        <li><strong>Editable?:</strong> <code class="font-mono bg-red-50 text-[#FF0000] font-bold px-1 rounded">ISBLANK([_THIS])</code></li>
                        <li><strong>Consent_Timestamp</strong> ➔ Type: <code class="font-mono font-bold text-[#0F0F0F]">DateTime</code>, Initial value: <code class="font-mono bg-zinc-100 px-1 rounded text-[#065FD4]">=NOW()</code>, Editable?: <code class="font-mono font-bold text-zinc-500">FALSE</code></li>
                      </ul>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <!-- Archetype 3: Smart Borrow -->
          <div id="wsContent-smartborrow" class="ws-content hidden space-y-6">
            <div class="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex items-start gap-3">
              <span class="text-2xl">📦</span>
              <div class="space-y-1">
                <div class="font-bold text-[#0F0F0F] text-sm">บริบทธุรกิจ: ระบบยืม-คืนอุปกรณ์และครุภัณฑ์ Smart Equipment Borrow (Asset Tracking)</div>
                <p class="text-xs text-[#606060] leading-relaxed">
                  <strong>ภารกิจ:</strong> สแกน Asset Barcode บนตัวอุปกรณ์ไอทีหรือกล้องถ่ายภาพเพื่อเบิกยืมอย่างรวดเร็ว พร้อมระบบลายเซ็นรับรอง 2 จังหวะ (Dual-Signature Audit: ผู้ยืมเซ็นรับของ + เจ้าหน้าที่ตรวจรับเซ็นปิดใบยืมตอนส่งคืน)
                </p>
              </div>
            </div>

            <!-- Steps -->
            <div class="space-y-4">
              <!-- Step 1 -->
              <div class="p-5 rounded-2xl bg-white border border-[#E5E5E5] shadow-sm space-y-3">
                <div class="flex items-center justify-between border-b border-zinc-100 pb-2">
                  <span class="font-bold text-sm text-[#0F0F0F] flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-[#0F0F0F] text-white flex items-center justify-center text-xs">1</span>
                    <span>สแกนบาร์โค้ด Asset Tag บนตัวเครื่องครุภัณฑ์</span>
                  </span>
                  <span class="text-[10px] bg-red-100 text-[#FF0000] px-2 py-0.5 rounded-full font-bold">ตาราง Equipments & Borrow_Items</span>
                </div>

                <div class="text-xs text-[#0F0F0F] space-y-2 leading-relaxed">
                  <ol class="list-decimal pl-5 space-y-1.5 text-[#606060]">
                    <li>ในชีต <code class="bg-zinc-100 px-1 rounded font-bold text-[#0F0F0F]">Equipments</code> มีคอลัมน์ <code class="font-mono text-[#0F0F0F]">Asset_Barcode</code> (เช่น สติกเกอร์รหัส <code class="font-mono text-emerald-600">EQUIP-CAM-001</code>)</li>
                    <li>ใน AppSheet ติ๊กถูก <code class="bg-red-50 text-[#FF0000] font-bold px-1 rounded">[✓] Scannable?</code> ที่คอลัมน์ <code>Asset_Barcode</code></li>
                    <li>ในตารางลูก <code class="bg-zinc-100 px-1 rounded font-bold text-[#0F0F0F]">Borrow_Items</code> ➔ คอลัมน์ <strong>Equipment_ID</strong> (ชนิด <code>Ref</code>) ให้ติ๊กถูก <code class="bg-red-50 text-[#FF0000] font-bold px-1 rounded">[✓] Scannable?</code> ด้วย</li>
                  </ol>
                  <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-[#2BA640] text-xs">
                    📦 <strong>ผลลัพธ์หน้างาน:</strong> ผู้ยืมเดินไปที่ชั้นเก็บอุปกรณ์ หยิบกล้องขึ้นมาแล้วใช้มือถือสแกนสติกเกอร์บาร์โค้ด รายการอุปกรณ์จะถูกบันทึกใส่ใบยืมทันทีในเวลาไม่ถึง 2 วินาที!
                  </div>
                </div>
              </div>

              <!-- Step 2 -->
              <div class="p-5 rounded-2xl bg-white border border-[#E5E5E5] shadow-sm space-y-3">
                <div class="flex items-center justify-between border-b border-zinc-100 pb-2">
                  <span class="font-bold text-sm text-[#0F0F0F] flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-[#0F0F0F] text-white flex items-center justify-center text-xs">2</span>
                    <span>ระบบลายเซ็นรับรอง 2 จังหวะ (Dual Signature Audit Trail)</span>
                  </span>
                  <span class="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-bold">ตาราง Borrow_Requests</span>
                </div>

                <div class="text-xs text-[#0F0F0F] space-y-2 leading-relaxed">
                  <ol class="list-decimal pl-5 space-y-1.5 text-[#606060]">
                    <li>ในตาราง <code class="bg-zinc-100 px-1 rounded font-bold text-[#0F0F0F]">Borrow_Requests</code> เพิ่ม 2 คอลัมน์ลายเซ็น:
                      <ul class="list-disc pl-5 mt-1 space-y-1">
                        <li><strong>Borrower_Signature:</strong> ลายเซ็นผู้ยืมตอนรับของออกจากคลัง</li>
                        <li><strong>Officer_Return_Signature:</strong> ลายเซ็นเจ้าหน้าที่ตอนตรวจรับอุปกรณ์คืนเข้าคลัง</li>
                      </ul>
                    </li>
                    <li>กำหนดค่าความปลอดภัยใน AppSheet:
                      <ul class="list-disc pl-5 mt-1 space-y-1">
                        <li><code>Borrower_Signature</code> ➔ Show_If: <code class="font-mono bg-zinc-100 px-1 rounded text-[#0F0F0F]">[Status] = "Borrowed"</code>, Editable?: <code class="font-mono text-[#FF0000] font-bold">ISBLANK([_THIS])</code></li>
                        <li><code>Officer_Return_Signature</code> ➔ Show_If: <code class="font-mono bg-zinc-100 px-1 rounded text-[#0F0F0F]">[Status] = "Returned"</code>, Editable?: <code class="font-mono text-[#FF0000] font-bold">ISBLANK([_THIS])</code></li>
                      </ul>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </article>
`;
