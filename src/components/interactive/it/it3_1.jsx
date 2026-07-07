import React, { useState } from 'react';

export default function Windows11Download() {
  const [activeSpot, setActiveSpot] = useState(null);

  const hotspots = [
    {
      id: 1,
      top: '32%',
      left: '8%',
      title: '1. ตัวช่วยติดตั้ง Windows 11',
      desc: 'สำหรับอัปเกรดเครื่องเดิมที่ใช้งานอยู่ให้เป็น Windows 11 โดยระบบจะตรวจสอบสเปกอัตโนมัติและอัปเกรดโดยที่ไฟล์ข้อมูลเดิมไม่หาย'
    },
    {
      id: 2,
      top: '52%',
      left: '8%',
      title: '2. สร้างสื่อการติดตั้ง (Media Creation Tool)',
      desc: 'ใช้สำหรับดาวน์โหลดเครื่องมือเพื่อนำไปสร้าง USB บูตติดตั้ง เหมาะสำหรับการลงวินโดวส์ใหม่ทั้งหมด (Clean Install)'
    },
    {
      id: 3,
      top: '76%',
      left: '8%',
      title: '3. ดาวน์โหลดดิสก์อิมเมจ (ISO)',
      desc: 'ดาวน์โหลดไฟล์ .ISO ตัวเต็มโดยตรง เหมาะสำหรับผู้ใช้ระดับสูงที่ต้องการใช้โปรแกรมภายนอก (เช่น Rufus) ทำ USB บูตด้วยตนเอง หรือนำไปติดตั้งในระบบจำลอง (VirtualBox, VMware)'
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Introduction Block */}
      <section className="space-y-6">
        <div className="border-b border-zinc-200/80 pb-4">
          <span className="text-sm font-bold text-blue-600 tracking-wider uppercase">
            การเตรียมไฟล์ติดตั้ง
          </span>
          <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
            ทำความเข้าใจหน้าดาวน์โหลดของ Microsoft
          </h3>
        </div>
        <p className="text-[16px] text-zinc-600 leading-relaxed bg-blue-50/50 p-4 rounded-xl border border-blue-100">
          💡 <strong>คำแนะนำ:</strong> นำเมาส์ไปชี้หรือคลิกที่ <strong>ตัวเลขบนภาพ</strong> เพื่อดูคำอธิบายเชิงลึกของแต่ละช่องทางการดาวน์โหลด
        </p>
      </section>

      {/* Image with Hotspots */}
      <div className="relative bg-white border border-slate-200 shadow-xl rounded-2xl p-2">
        <div className="relative w-full rounded-xl bg-slate-50 flex items-center justify-center">
          
          {/* Main Image */}
          <img 
            src="/windows11-download.png" 
            alt="Windows 11 Download Page" 
            className="w-full h-auto object-contain rounded-lg shadow-sm"
            onError={(e) => {
              // Fallback if image not found
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
          
          {/* Fallback Missing Image Placeholder */}
          <div 
            className="absolute inset-0 flex-col items-center justify-center text-slate-500 bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl m-2"
            style={{ display: 'none', minHeight: '600px' }}
          >
            <svg className="w-16 h-16 text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-lg font-semibold text-slate-700 mb-2">ไม่พบภาพหน้าจอจำลอง</p>
            <p>กรุณานำภาพที่ต้องการใช้งานมาตั้งชื่อว่า <code className="text-blue-600 bg-blue-50 px-2 py-1 rounded">windows11-download.png</code></p>
            <p>แล้วนำไปวางไว้ในโฟลเดอร์ <code className="text-slate-700 bg-slate-200 px-2 py-1 rounded">public</code> ของโปรเจกต์</p>
          </div>

          {/* Hotspots Rendered on top of image */}
          {hotspots.map((spot) => (
            <div 
              key={spot.id} 
              className="absolute group z-10"
              style={{ top: spot.top, left: spot.left }}
              onMouseEnter={() => setActiveSpot(spot.id)}
              onMouseLeave={() => setActiveSpot(null)}
              onClick={() => setActiveSpot(spot.id === activeSpot ? null : spot.id)}
            >
              {/* Pulse Effect */}
              <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
              
              {/* Spot Button */}
              <div className="relative w-8 h-8 md:w-10 md:h-10 bg-[#0067b8] hover:bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-base md:text-lg shadow-[0_0_15px_rgba(0,103,184,0.5)] cursor-pointer transition-transform hover:scale-110 border-2 border-white">
                {spot.id}
              </div>

              {/* Tooltip / Explanation Box */}
              <div 
                className={`absolute left-12 md:left-14 top-0 w-64 md:w-80 bg-white/95 backdrop-blur-md border border-blue-100 shadow-2xl rounded-2xl p-5 transition-all duration-300 origin-left z-50
                ${activeSpot === spot.id ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
              >
                <div className="absolute -left-2 top-3 w-4 h-4 bg-white border-l border-b border-blue-100 transform rotate-45"></div>
                <h4 className="font-bold text-slate-800 text-[16px] md:text-lg mb-2 relative z-10">{spot.title}</h4>
                <p className="text-slate-600 text-[13px] md:text-[14px] leading-relaxed relative z-10">{spot.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
