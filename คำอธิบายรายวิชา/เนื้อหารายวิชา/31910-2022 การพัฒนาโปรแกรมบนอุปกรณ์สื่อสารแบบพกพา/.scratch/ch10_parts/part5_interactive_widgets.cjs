module.exports = `
        <!-- ───────────────────────────────────────────────────────────── -->
        <!-- SECTION 6: HARDWARE SANDBOX (SIMULATOR & CANVAS PAD) -->
        <!-- ───────────────────────────────────────────────────────────── -->
        <article id="hardware-sandbox" class="scroll-mt-20 space-y-8 pt-10 border-t border-[#E5E5E5]">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF0000]">
            <span>หัวข้อที่ 6</span>
          </div>

          <div class="space-y-3">
            <h2 class="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F] tracking-tight">
              6. ห้องทดลอง Hardware Sandbox: Scanner Simulator & Signature Canvas Pad
            </h2>
            <p class="text-sm sm:text-base text-[#606060] leading-relaxed">
              ทดลองสัมผัสประสบการณ์ฮาร์ดแวร์จริงก่อนลงมือพัฒนาใน AppSheet ผ่านเครื่องจำลอง 2 ระบบ: <strong>เครื่องจำลองสแกนเนอร์มือถือ 320x640</strong> พร้อมแอนิเมชันเลเซอร์กวาดแสงและเสียงบี๊บ และ <strong>ผืนผ้าใบสัมผัสลายเซ็นดิจิทัล HTML5 Canvas</strong> ที่สามารถวาดเซ็นและบันทึกภาพจริงได้ทันที
            </p>
          </div>

          <!-- Dual Sandbox Grid Layout -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            <!-- Left: Mobile Phone Simulator (320x640) - 6 cols -->
            <div class="lg:col-span-6 space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-[#0F0F0F] flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-[#FF0000] animate-pulse"></span>
                  <span>1. เครื่องจำลองสแกนเนอร์สมาร์ตโฟน (320x640 Viewport)</span>
                </span>
                <span id="simStepBadge" class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-100 text-[#FF0000] font-bold">ขั้นตอน 1 / 4</span>
              </div>

              <!-- Phone Simulator Container Frame -->
              <div class="phone-mockup">
                <!-- Phone Top Notch -->
                <div class="phone-notch">
                  <div class="phone-speaker"></div>
                </div>

                <!-- Phone Screen -->
                <div class="phone-screen text-xs">
                  <!-- Phone System Status Bar -->
                  <div class="px-5 py-1.5 flex items-center justify-between text-[10px] text-zinc-500 font-medium">
                    <span id="simClock">09:41</span>
                    <div class="flex items-center gap-1.5">
                      <svg class="w-3 h-3 text-zinc-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 22l7.03-4.39C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9z"/></svg>
                      <svg class="w-3 h-3 text-zinc-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4z"/></svg>
                      <span class="font-bold text-[9px] text-zinc-700">100%</span>
                    </div>
                  </div>

                  <!-- Phone App Header Bar -->
                  <div class="px-4 py-2.5 bg-white border-b border-[#E5E5E5] flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="w-6 h-6 rounded bg-[#FF0000] text-white flex items-center justify-center font-bold text-[10px]">
                        B
                      </div>
                      <span id="simAppHeaderTitle" class="font-bold text-xs text-[#0F0F0F] truncate">Fresh Brew POS</span>
                    </div>
                    <span id="simModeTag" class="text-[9px] bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded font-mono">Retail Mode</span>
                  </div>

                  <!-- Dynamic Screen Viewport -->
                  <div id="simScreenBody" class="p-4 flex-1 flex flex-col justify-between">
                    <!-- Populated by JS -->
                  </div>

                  <!-- Phone Bottom Navigation Bar -->
                  <div class="h-11 bg-white border-t border-[#E5E5E5] px-6 flex items-center justify-around text-zinc-400">
                    <button class="text-[#FF0000]"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg></button>
                    <button><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg></button>
                    <button><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg></button>
                    <button><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg></button>
                  </div>
                </div>
              </div>

              <!-- Simulator Step Controls & Archetype Switcher -->
              <div class="p-4 rounded-2xl bg-zinc-50 border border-[#E5E5E5] space-y-3 text-xs">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-[#0F0F0F]">ควบคุมเครื่องจำลอง (Simulator Controls)</span>
                  <div class="flex items-center gap-1">
                    <button onclick="simPrevStep()" class="p-1.5 rounded-lg border border-[#E5E5E5] bg-white hover:bg-zinc-100 transition" title="ขั้นตอนก่อนหน้า">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
                    </button>
                    <button onclick="simNextStep()" class="p-1.5 rounded-lg border border-[#E5E5E5] bg-white hover:bg-zinc-100 transition" title="ขั้นตอนถัดไป">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                    </button>
                  </div>
                </div>

                <!-- 4 Step Quick Buttons -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  <button onclick="simSetStep(1)" id="simStepBtn1" class="p-2 rounded-xl border border-[#FF0000] bg-red-50 text-[#FF0000] font-bold text-[11px] transition text-center">
                    1. กล้องสแกน
                  </button>
                  <button onclick="simSetStep(2)" id="simStepBtn2" class="p-2 rounded-xl border border-[#E5E5E5] bg-white text-[#606060] font-medium text-[11px] hover:bg-zinc-100 transition text-center">
                    2. ข้อมูลสินค้า
                  </button>
                  <button onclick="simSetStep(3)" id="simStepBtn3" class="p-2 rounded-xl border border-[#E5E5E5] bg-white text-[#606060] font-medium text-[11px] hover:bg-zinc-100 transition text-center">
                    3. เซ็นชื่อ
                  </button>
                  <button onclick="simSetStep(4)" id="simStepBtn4" class="p-2 rounded-xl border border-[#E5E5E5] bg-white text-[#606060] font-medium text-[11px] hover:bg-zinc-100 transition text-center">
                    4. Audit Pass
                  </button>
                </div>

                <!-- Sound Beep Switch -->
                <div class="flex items-center justify-between pt-2 border-t border-zinc-200 text-[11px] text-[#606060]">
                  <span>เสียงสังเคราะห์บี๊บ (Web Audio Synthesizer):</span>
                  <button onclick="playScannerBeep(); showToast('ทดสอบเสียงบาร์โค้ดสำเร็จ');" class="text-[#065FD4] font-bold hover:underline flex items-center gap-1">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
                    <span>กดฟังเสียงติ๊ด 🔔</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Right: Interactive Signature Pad Studio - 6 cols -->
            <div class="lg:col-span-6 space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-[#0F0F0F] flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-[#065FD4]"></span>
                  <span>2. ผืนผ้าใบลายเซ็นดิจิทัล (HTML5 Canvas Pad Studio)</span>
                </span>
                <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-100 text-[#065FD4] font-bold">Interactive Touch / Mouse</span>
              </div>

              <!-- Working Canvas Surface -->
              <div class="p-5 rounded-2xl bg-white border-2 border-[#E5E5E5] shadow-md space-y-4">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="font-bold text-sm text-[#0F0F0F]">ลงลายมือชื่อดิจิทัล (Digital Signature Pad)</div>
                    <div class="text-[11px] text-[#606060]">ใช้นิ้วมือบนจอมือถือ หรือคลิกเมาส์ลากเส้นบนคอมพิวเตอร์</div>
                  </div>
                  <!-- Color Palette Selector -->
                  <div class="flex items-center gap-1.5">
                    <button onclick="setInkColor('#0F0F0F')" id="inkBlackBtn" class="w-6 h-6 rounded-full bg-[#0F0F0F] ring-2 ring-offset-1 ring-zinc-800 transition" title="หมึกดำ"></button>
                    <button onclick="setInkColor('#065FD4')" id="inkBlueBtn" class="w-6 h-6 rounded-full bg-[#065FD4] hover:scale-110 transition" title="หมึกน้ำเงิน"></button>
                  </div>
                </div>

                <!-- HTML5 Canvas Element -->
                <div class="relative bg-zinc-50 border-2 border-dashed border-zinc-300 rounded-xl overflow-hidden shadow-inner flex items-center justify-center">
                  <div id="canvasPlaceholder" class="absolute pointer-events-none text-zinc-300 font-mono text-xs select-none">
                    ✍️ จรดนิ้วมือหรือคลิกเมาส์ลากเส้นที่นี่...
                  </div>
                  <canvas id="signatureCanvas" width="440" height="190" class="w-full h-48 block bg-transparent"></canvas>
                </div>

                <!-- Canvas Control Buttons -->
                <div class="flex items-center justify-between pt-1">
                  <button onclick="clearSignatureCanvas()" class="h-9 px-4 rounded-xl border border-[#E5E5E5] bg-white hover:bg-zinc-100 text-xs text-[#606060] font-bold flex items-center gap-1.5 transition">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    <span>ลบเซ็นใหม่ (Clear)</span>
                  </button>

                  <button onclick="saveAndSimulateDriveUpload()" class="h-9 px-5 rounded-xl bg-[#0F0F0F] hover:bg-black text-white text-xs font-bold flex items-center gap-2 transition shadow-sm">
                    <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    <span>จำลองบันทึกขึ้น Drive</span>
                  </button>
                </div>
              </div>

              <!-- Live Audit Trail Metadata Card -->
              <div id="auditResultCard" class="p-4 rounded-2xl bg-zinc-50 border border-[#E5E5E5] space-y-3 text-xs">
                <div class="font-bold text-[#0F0F0F] flex items-center justify-between border-b border-zinc-200 pb-2">
                  <span class="flex items-center gap-1.5">
                    <span class="text-base">🛡️</span>
                    <span>Audit Trail Metadata & Non-repudiation Status</span>
                  </span>
                  <span id="auditLockStatus" class="px-2 py-0.5 rounded bg-zinc-200 text-zinc-700 font-mono text-[10px] font-bold">รอการลงลายมือชื่อ</span>
                </div>

                <div class="grid grid-cols-2 gap-3 text-[11px]">
                  <div>
                    <span class="text-zinc-500">Signer Identity:</span>
                    <div id="auditSigner" class="font-mono font-bold text-[#0F0F0F] truncate">somchai.j@bpg-student.ac.th</div>
                  </div>
                  <div>
                    <span class="text-zinc-500">Signed Timestamp:</span>
                    <div id="auditTimestamp" class="font-mono font-bold text-[#0F0F0F]">--/--/---- --:--:--</div>
                  </div>
                </div>

                <div class="space-y-1">
                  <span class="text-zinc-500 text-[10px]">Google Drive Storage Relative Path:</span>
                  <div id="auditFilePath" class="p-2 rounded bg-white border border-[#E5E5E5] font-mono text-[10px] text-zinc-600 break-all">
                    (รอการกดบันทึกเพื่อสร้างไฟล์ PNG)
                  </div>
                </div>

                <div id="auditExportPreview" class="hidden pt-2 border-t border-zinc-200 flex items-center gap-3">
                  <span class="text-zinc-500 text-[10px]">ไฟล์ภาพ PNG ที่สร้างขึ้น:</span>
                  <img id="auditPngThumb" src="" alt="Signature Preview" class="h-8 border border-zinc-300 rounded bg-white p-0.5">
                  <span class="text-[10px] text-emerald-600 font-bold">✓ อัปโหลดสำเร็จ (Alpha PNG)</span>
                </div>
              </div>
            </div>
          </div>
        </article>

        <!-- ───────────────────────────────────────────────────────────── -->
        <!-- SECTION 7: TESTING TOOLKIT & LIVE QR GENERATOR -->
        <!-- ───────────────────────────────────────────────────────────── -->
        <article id="testing-toolkit" class="scroll-mt-20 space-y-8 pt-10 border-t border-[#E5E5E5]">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF0000]">
            <span>หัวข้อที่ 7</span>
          </div>

          <div class="space-y-3">
            <h2 class="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F] tracking-tight">
              7. เครื่องมือสร้าง QR Code สำหรับการทดสอบ (Testing Toolkit & API Formula)
            </h2>
            <p class="text-sm sm:text-base text-[#606060] leading-relaxed">
              เพื่อให้การทดสอบการสแกนผ่านกล้องสมาร์ตโฟนเกิดขึ้นได้ทันทีบนโต๊ะเรียน เราสามารถสร้างภาพบาร์โค้ดและ QR Code ขึ้นมาบนหน้าจอคอมพิวเตอร์ แล้วใช้สมาร์ตโฟนยิงสแกนจากหน้าจอได้โดยไม่ต้องลงทุนซื้อเครื่องพิมพ์สติกเกอร์
            </p>
          </div>

          <!-- Formula Card -->
          <div class="p-5 rounded-2xl bg-zinc-50 border border-[#E5E5E5] space-y-3">
            <div class="flex items-center justify-between">
              <span class="font-bold text-sm text-[#0F0F0F] flex items-center gap-2">
                <span class="text-base">📊</span>
                <span>สูตรสร้างภาพ QR Code อัตโนมัติบน Google Sheets ด้วยคำสั่ง IMAGE()</span>
              </span>
              <button onclick="copyText('=IMAGE(&quot;https://api.qrserver.com/v1/create-qr-code/?size=150x150&amp;data=&quot; &amp; ENCODEURL(A2))', this)" class="text-xs text-[#065FD4] font-mono font-bold hover:underline flex items-center gap-1">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                <span>คัดลอกสูตรชีต</span>
              </button>
            </div>
            <pre class="p-3.5 rounded-xl bg-[#0F0F0F] text-emerald-400 font-mono text-xs overflow-x-auto"><code>=IMAGE("https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" & ENCODEURL(A2))</code></pre>
            <p class="text-xs text-[#606060] leading-relaxed">
              <strong>หลักการทำงาน:</strong> เมื่อนำสูตรนี้ไปวางในคอลัมน์ QR ของ Google Sheets โดยอ้างอิงเซลล์ <code>A2</code> ที่มีรหัสสินค้า เมื่อใดก็ตามที่แก้รหัสในช่อง A2 ภาพ QR Code จะถูกประมวลผลและสร้างใหม่ในเซลล์ทันที สามารถใช้กล้องมือถือเล็งยิงจากจอคอมพิวเตอร์ได้โดยตรง!
            </p>
          </div>

          <!-- Live Interactive QR Studio on Page -->
          <div class="p-6 rounded-2xl bg-[#0F0F0F] text-white space-y-6 border border-zinc-800">
            <div class="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span class="text-xs font-bold uppercase tracking-wider text-[#FF0000] flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-[#FF0000] animate-ping"></span>
                <span>Live Interactive QR Code Generator Studio</span>
              </span>
              <span class="text-xs text-zinc-400">ยิงกล้องมือถือจริงใส่หน้าจอนี้ได้ทันที!</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <!-- Left: Controls -->
              <div class="md:col-span-7 space-y-4">
                <div class="space-y-1.5">
                  <label class="text-xs text-zinc-300 font-bold block">พิมพ์ข้อความหรือรหัสที่ต้องการสร้าง QR Code:</label>
                  <div class="flex gap-2">
                    <input 
                      type="text" 
                      id="qrGenInput" 
                      value="8851234567890" 
                      placeholder="ใส่รหัสสินค้า หรือ URL..." 
                      class="flex-1 h-10 px-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-[#FF0000]"
                    />
                    <button onclick="updateLiveQrCode()" class="h-10 px-4 bg-[#FF0000] hover:bg-[#CC0000] rounded-xl text-xs font-bold text-white transition">
                      สร้าง QR
                    </button>
                  </div>
                </div>

                <!-- Pre-populated Quick Buttons -->
                <div class="space-y-2">
                  <span class="text-[11px] text-zinc-400 block font-medium">หรือเลือกชุดรหัสทดสอบของ 3 Archetypes:</span>
                  <div class="flex flex-wrap gap-2 text-xs">
                    <button onclick="setTestQrCode('8851234567890')" class="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-300 font-mono text-[11px] border border-zinc-700 transition">
                      ☕ Fresh Brew (8851234567890)
                    </button>
                    <button onclick="setTestQrCode('PAW-9901')" class="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-blue-300 font-mono text-[11px] border border-zinc-700 transition">
                      🐾 Happy Paws (PAW-9901)
                    </button>
                    <button onclick="setTestQrCode('EQUIP-CAM-001')" class="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-emerald-300 font-mono text-[11px] border border-zinc-700 transition">
                      📦 Smart Borrow (EQUIP-CAM-001)
                    </button>
                  </div>
                </div>

                <div class="p-3 rounded-xl bg-zinc-800/60 border border-zinc-700 text-zinc-300 text-xs leading-relaxed">
                  📱 <strong>วิธีทดสอบกับสมาร์ตโฟนจริง:</strong> เปิดแอปพลิเคชัน AppSheet บนมือถือของคุณ ล็อกอินเข้าแอปโครงงาน ➔ แตะปุ่มกล้องสแกนเนอร์ ➔ ยกกล้องขึ้นส่องไปที่ภาพ QR Code ด้านขวา ➔ สังเกตว่าระบบอ่านค่าได้ทันทีในเสี้ยววินาที!
                </div>
              </div>

              <!-- Right: Live QR Code Image Display -->
              <div class="md:col-span-5 flex flex-col items-center justify-center p-6 bg-white rounded-2xl text-[#0F0F0F] space-y-3 shadow-inner">
                <div class="w-44 h-44 bg-zinc-100 rounded-xl flex items-center justify-center overflow-hidden border border-zinc-300 relative group">
                  <img id="liveQrImage" src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=8851234567890" alt="Generated QR Code" class="w-40 h-40 object-contain">
                </div>
                <div class="text-center space-y-0.5">
                  <div class="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">SCANNABLE QR CODE</div>
                  <div id="liveQrCodeText" class="font-mono font-bold text-xs text-[#0F0F0F]">8851234567890</div>
                </div>
              </div>
            </div>
          </div>
        </article>
`;
