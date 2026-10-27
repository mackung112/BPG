import { useState } from 'react';
import { Search, Layers, CheckCircle2, ChevronRight, Info, AlertTriangle, ShieldCheck, Box, Sliders } from 'lucide-react';

export default function Hw1_3() {
  const [selectedFormFactor, setSelectedFormFactor] = useState('atx');
  const [selectedTier, setSelectedTier] = useState('mid');
  const [qvlSearch, setQvlSearch] = useState('DDR5-6000');

  const formFactors = {
    atx: {
      name: 'ATX',
      dimensions: '305 x 244 mm',
      title: 'มาตรฐานเต็มสเปค (Full-Size Standard)',
      ramSlots: '4 ช่อง (Dual-Channel)',
      pcieSlots: '4 - 7 ช่อง (รองรับการ์ดจอขนาดใหญ่ + Sound/Capture Card)',
      m2Slots: '3 - 5 สล็อต (มี Heatsink หนา)',
      caseType: 'Mid Tower / Full Tower',
      pros: 'ระบายความร้อนยอดเยี่ยม ช่องเชื่อมต่อครบครันที่สุด เหมาะสำหรับเครื่องตัดต่อและเกมเมอร์',
      boxWidth: 260,
      boxHeight: 320,
      strokeColor: '#00e5ff'
    },
    matx: {
      name: 'Micro-ATX (mATX)',
      dimensions: '244 x 244 mm',
      title: 'ยอดนิยมสำหรับองค์กร คุ้มค่าพื้นที่ (Most Popular)',
      ramSlots: '2 - 4 ช่อง',
      pcieSlots: '2 - 4 ช่อง',
      m2Slots: '2 - 3 สล็อต',
      caseType: 'Mini Tower / Mid Tower',
      pros: 'ราคาประหยัดที่สุด ขนาดกะทัดรัดแต่ฟังก์ชันยังครบถ้วน จัดสายไฟง่าย',
      boxWidth: 215,
      boxHeight: 215,
      strokeColor: '#38bdf8'
    },
    itx: {
      name: 'Mini-ITX',
      dimensions: '170 x 170 mm',
      title: 'กะทัดรัดพิเศษ สำหรับเคสไซส์เล็ก (Ultra Compact)',
      ramSlots: '2 ช่อง',
      pcieSlots: '1 ช่อง (PCIe x16 สำหรับการ์ดจอเท่านั้น)',
      m2Slots: '1 - 2 สล็อต (มักอยู่ด้านหลังแผงวงจร)',
      caseType: 'SFF (Small Form Factor) / Cube Case',
      pros: 'พกพาสะดวก พื้นที่โต๊ะทำงานสะอาดตา แต่ประกอบยากและระบายความร้อนจำกัด',
      boxWidth: 150,
      boxHeight: 150,
      strokeColor: '#818cf8'
    }
  };

  const chipsets = {
    entry: {
      tier: 'เริ่มต้น (Entry-Level)',
      intel: 'H-Series (เช่น H610, H710)',
      amd: 'A-Series (เช่น A620)',
      ramOc: 'ไม่รองรับ / บัสพื้นฐาน',
      pcieGen: 'PCIe 4.0 / PCIe 3.0',
      useCase: 'คอมพิวเตอร์พิมพ์งานเอกสาร สำนักงาน โรงเรียน หรือร้านสะดวกซื้อ',
      priceLevel: 'ประหยัด (1,800 - 3,000 บ.)'
    },
    mid: {
      tier: 'ระดับกลาง (Mainstream - ยอดนิยม)',
      intel: 'B-Series (เช่น B760, B860)',
      amd: 'B-Series (เช่น B650, B850)',
      ramOc: 'รองรับ XMP / EXPO เต็มรูปแบบ',
      pcieGen: 'PCIe 5.0 (M.2) + PCIe 4.0 (GPU)',
      useCase: 'เล่นเกม AAA, งานกราฟิก, นักศึกษาสายไอที คุ้มค่าต่อเม็ดเงินที่สุด',
      priceLevel: 'คุ้มค่า (3,500 - 6,500 บ.)'
    },
    high: {
      tier: 'ขั้นสูง (Enthusiast / Overclock)',
      intel: 'Z-Series (เช่น Z790, Z890)',
      amd: 'X-Series (เช่น X670E, X870E)',
      ramOc: 'ปลดล็อกตัวคูณ CPU + RAM OC สุดขีด',
      pcieGen: 'Full PCIe 5.0 GPU + Dual M.2 Gen5',
      useCase: 'สตรีมเมอร์ระดับสูง, ผู้ชื่นชอบการโอเวอร์คล็อก, เวิร์กสเตชันตัดต่อ 8K',
      priceLevel: 'ระดับท็อป (8,000 - 25,000+ บ.)'
    }
  };

  const currentForm = formFactors[selectedFormFactor];
  const currentChipset = chipsets[selectedTier];

  return (
    <div className="w-full max-w-5xl mx-auto my-6 font-sans">
      {/* Blueprint Container */}
      <div
        className="relative bg-white rounded-2xl border-2 border-cyan-400 shadow-[0_10px_35px_rgba(6,182,212,0.18)] p-4 sm:p-7 overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(6, 182, 212, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(6, 182, 212, 0.15) 1px, transparent 1px),
            linear-gradient(to right, rgba(6, 182, 212, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(6, 182, 212, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px, 40px 40px, 8px 8px, 8px 8px'
        }}
      >
        {/* Technical Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-300 pb-3 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-cyan-500 rounded-sm animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider text-cyan-800 uppercase">
              MAINBOARD ARCHITECTURE // ผังมิติสถาปัตยกรรมเมนบอร์ด
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-slate-500">FORM FACTOR & CHIPSET MATRIX</span>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-cyan-100 text-cyan-800 border border-cyan-300 rounded">
              SPEC SHEET 004
            </span>
          </div>
        </div>

        {/* Section 1: Form Factor Visualizer & Chipset Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          {/* Left: Chipset Comparison Matrix (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sliders className="w-5 h-5 text-cyan-600" />
                <h4 className="text-lg font-bold text-slate-900">
                  เปรียบเทียบระดับชิปเซ็ต (Chipset)
                </h4>
              </div>
              <p className="text-xs text-slate-600 mb-3">
                คลิกเลือกแถวชิปเซ็ตเพื่อตรวจสอบฟังก์ชันและความคุ้มค่า
              </p>

              {/* Chipset Tier Table */}
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse border-2 border-cyan-400 bg-white shadow-sm rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-slate-900 text-cyan-300 text-xs font-mono uppercase">
                      <th className="p-2.5 border-b border-r border-cyan-600 font-bold">ระดับ</th>
                      <th className="p-2.5 border-b border-r border-cyan-600 text-cyan-200">Intel</th>
                      <th className="p-2.5 border-b border-cyan-600 text-amber-200">AMD</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm font-sans">
                    {/* Row 1: Entry */}
                    <tr
                      onClick={() => setSelectedTier('entry')}
                      className={`cursor-pointer transition-colors border-b border-cyan-200 ${
                        selectedTier === 'entry' ? 'bg-cyan-100/80 font-bold' : 'hover:bg-cyan-50/50'
                      }`}
                    >
                      <td className="p-2.5 border-r border-cyan-200 font-semibold text-slate-800">เริ่มต้น</td>
                      <td className="p-2.5 border-r border-cyan-200 font-mono text-cyan-800">H-Series</td>
                      <td className="p-2.5 font-mono text-amber-800">A-Series</td>
                    </tr>
                    {/* Row 2: Mid (Recommended) */}
                    <tr
                      onClick={() => setSelectedTier('mid')}
                      className={`cursor-pointer transition-colors border-b border-cyan-200 ${
                        selectedTier === 'mid' ? 'bg-cyan-100/80 font-bold' : 'hover:bg-cyan-50/50'
                      }`}
                    >
                      <td className="p-2.5 border-r border-cyan-200 font-semibold text-slate-800 flex items-center gap-1">
                        ระดับกลาง
                        <span className="text-[10px] px-1 py-0.2 bg-emerald-500 text-white rounded font-mono">HIT</span>
                      </td>
                      <td className="p-2.5 border-r border-cyan-200 font-mono text-cyan-800">B-Series (B760)</td>
                      <td className="p-2.5 font-mono text-amber-800">B-Series (B650)</td>
                    </tr>
                    {/* Row 3: High */}
                    <tr
                      onClick={() => setSelectedTier('high')}
                      className={`cursor-pointer transition-colors ${
                        selectedTier === 'high' ? 'bg-cyan-100/80 font-bold' : 'hover:bg-cyan-50/50'
                      }`}
                    >
                      <td className="p-2.5 border-r border-cyan-200 font-semibold text-slate-800">ขั้นสูง (OC)</td>
                      <td className="p-2.5 border-r border-cyan-200 font-mono text-cyan-800">Z-Series</td>
                      <td className="p-2.5 font-mono text-amber-800">X-Series</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Chipset Info Pill */}
            <div className="mt-3 p-3 rounded-xl bg-slate-900 text-white border border-cyan-400/80 text-xs shadow-md">
              <div className="flex items-center justify-between mb-1.5 border-b border-slate-700 pb-1">
                <span className="font-bold text-cyan-300 font-mono">{currentChipset.tier}</span>
                <span className="text-[11px] text-amber-400 font-mono">{currentChipset.priceLevel}</span>
              </div>
              <p className="text-slate-300 mb-2 leading-relaxed">
                {currentChipset.useCase}
              </p>
              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-800 text-slate-400">
                <div>RAM Overclock: <span className="text-white font-semibold">{currentChipset.ramOc}</span></div>
                <div>PCIe Standard: <span className="text-white font-semibold">{currentChipset.pcieGen}</span></div>
              </div>
            </div>
          </div>

          {/* Right: Nested Motherboard Dimension Blueprint (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-900 rounded-2xl p-4 sm:p-5 border-2 border-cyan-400 shadow-xl relative flex flex-col justify-between">
            {/* Form factor tabs */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 border-b border-slate-800 pb-2">
              <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                NESTED DIMENSION SCALE (สเกลเปรียบเทียบขนาดจริง)
              </span>

              <div className="inline-flex gap-1 bg-slate-800 p-1 rounded-lg border border-slate-700">
                {['atx', 'matx', 'itx'].map(k => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setSelectedFormFactor(k)}
                    className={`min-h-[38px] px-2.5 py-1 text-xs font-bold font-mono rounded transition-colors ${
                      selectedFormFactor === k
                        ? 'bg-cyan-500 text-slate-950 shadow'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {k.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* SVG Blueprint Canvas */}
            <div className="w-full flex items-center justify-center p-2 relative bg-slate-950/80 rounded-xl border border-cyan-900/60 overflow-hidden">
              <svg viewBox="0 0 360 380" className="w-full max-w-[340px] h-auto">
                {/* Background Blueprint Grid Lines */}
                <defs>
                  <pattern id="innerGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0, 229, 255, 0.15)" strokeWidth="0.8" />
                  </pattern>
                </defs>
                <rect x="0" y="0" width="360" height="380" fill="url(#innerGrid)" />

                {/* ATX Box (305x244 mm -> scaled to 260x330) */}
                <rect
                  x="30"
                  y="20"
                  width="260"
                  height="330"
                  fill={selectedFormFactor === 'atx' ? 'rgba(6, 182, 212, 0.18)' : 'transparent'}
                  stroke={selectedFormFactor === 'atx' ? '#00e5ff' : '#475569'}
                  strokeWidth={selectedFormFactor === 'atx' ? '2.5' : '1.5'}
                  strokeDasharray="4 3"
                />
                <text x="35" y="38" fill={selectedFormFactor === 'atx' ? '#00e5ff' : '#64748b'} fontSize="11" fontFamily="monospace" fontWeight="bold">
                  ATX: 305 x 244 mm
                </text>

                {/* mATX Box (244x244 mm -> scaled to 260x260) */}
                <rect
                  x="30"
                  y="20"
                  width="260"
                  height="260"
                  fill={selectedFormFactor === 'matx' ? 'rgba(56, 189, 248, 0.22)' : 'transparent'}
                  stroke={selectedFormFactor === 'matx' ? '#38bdf8' : '#475569'}
                  strokeWidth={selectedFormFactor === 'matx' ? '2.5' : '1.5'}
                  strokeDasharray="4 3"
                />
                <text x="35" y="165" fill={selectedFormFactor === 'matx' ? '#38bdf8' : '#64748b'} fontSize="11" fontFamily="monospace" fontWeight="bold">
                  mATX: 244 x 244 mm
                </text>

                {/* Mini-ITX Box (170x170 mm -> scaled to 180x180) */}
                <rect
                  x="30"
                  y="20"
                  width="180"
                  height="180"
                  fill={selectedFormFactor === 'itx' ? 'rgba(129, 140, 248, 0.28)' : 'transparent'}
                  stroke={selectedFormFactor === 'itx' ? '#818cf8' : '#475569'}
                  strokeWidth={selectedFormFactor === 'itx' ? '2.5' : '1.5'}
                  strokeDasharray="4 3"
                />
                <text x="35" y="100" fill={selectedFormFactor === 'itx' ? '#818cf8' : '#64748b'} fontSize="11" fontFamily="monospace" fontWeight="bold">
                  Mini-ITX: 170 x 170 mm
                </text>

                {/* Dimension Arrows */}
                <line x1="30" y1="365" x2="290" y2="365" stroke="#00e5ff" strokeWidth="1.5" />
                <polygon points="30,365 38,362 38,368" fill="#00e5ff" />
                <polygon points="290,365 282,362 282,368" fill="#00e5ff" />
                <text x="145" y="360" fill="#00e5ff" fontSize="10" fontFamily="monospace" textAnchor="middle">
                  กว้าง 244 mm
                </text>

                <line x1="305" y1="20" x2="305" y2="350" stroke="#00e5ff" strokeWidth="1.5" />
                <polygon points="305,20 302,28 308,28" fill="#00e5ff" />
                <polygon points="305,350 302,342 308,342" fill="#00e5ff" />
                <text x="330" y="190" fill="#00e5ff" fontSize="10" fontFamily="monospace" transform="rotate(90, 330, 190)" textAnchor="middle">
                  ยาว 305 mm
                </text>
              </svg>
            </div>

            {/* Selected Form Factor Details */}
            <div className="mt-3 p-3 bg-slate-800/90 rounded-xl border border-cyan-800 text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-white text-sm">
                  {currentForm.name} ({currentForm.dimensions})
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-900 text-cyan-200">
                  เคส: {currentForm.caseType}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-slate-300 mt-2">
                <div>RAM: <span className="text-cyan-300 font-semibold">{currentForm.ramSlots}</span></div>
                <div>PCIe Expansion: <span className="text-cyan-300 font-semibold">{currentForm.pcieSlots}</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: QVL Qualified Vendor List Verification Callout (ถอดแบบกล่องล่างของสไลด์) */}
        <div className="rounded-2xl bg-cyan-500/10 border-2 border-cyan-500 p-4 sm:p-5 shadow-lg relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-cyan-500 text-slate-950 rounded-xl shadow-md shrink-0">
                <Search className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  เช็ค QVL (Qualified Vendor List) ทุกครั้งก่อนจัดสเปค
                </h4>
                <p className="text-xs sm:text-sm text-cyan-900 font-medium mt-0.5">
                  ยืนยันรหัสพาร์ตแรม (Part Number) และ SSD M.2 บนเว็บไซต์ผู้ผลิตเมนบอร์ด เพื่อการันตีเปิดติด 100% เปิด XMP/EXPO ไม่จอฟ้า
                </p>
              </div>
            </div>

            {/* Quick Interactive QVL Tester */}
            <div className="w-full sm:w-auto shrink-0 flex items-center gap-2">
              <select
                aria-label="เลือกบัสแรมตัวอย่างเพื่อทดสอบ QVL"
                value={qvlSearch}
                onChange={(e) => setQvlSearch(e.target.value)}
                className="min-h-[44px] px-3 py-1.5 rounded-lg border border-cyan-400 bg-white text-xs font-mono font-bold text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="DDR5-6000">Kingston Fury DDR5 6000MHz (Passed QVL)</option>
                <option value="DDR5-7200">G.Skill Trident DDR5 7200MHz (Requires Z790/X870)</option>
                <option value="DDR4-3200">Corsair LPX DDR4 3200MHz (Passed QVL)</option>
              </select>
              <div className="min-h-[44px] px-3 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow">
                <CheckCircle2 className="w-4 h-4" />
                VERIFIED
              </div>
            </div>
          </div>
        </div>

        {/* Blueprint Footer */}
        <div className="mt-6 pt-3 border-t border-cyan-300/60 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-500">
          <div>TECH ARCHITECTURE // MOTHERBOARD FORM FACTORS</div>
          <div className="text-cyan-800 font-bold">
            STANDARD IEC / EIA SPECIFICATION
          </div>
        </div>
      </div>
    </div>
  );
}
