import React, { useState } from 'react';
import { LayoutTemplate, PanelTop, Compass, MousePointerClick, Component, AppWindow, Laptop, Smartphone, Coffee } from 'lucide-react';
import SimulatorShell from '../shared/SimulatorShell';
import AmbientBackdrop from '../shared/AmbientBackdrop';
import SectionBlock from '../shared/SectionBlock';
import ConceptCard from '../shared/ConceptCard';

export default function Uiux1_2() {
  const [activeArea, setActiveArea] = useState('none');
  const [viewMode, setViewMode] = useState('app');

  const uiParts = {
    header: {
      id: 'header',
      title: 'Header / Top Bar',
      desc: 'ส่วนหัวของแอปพลิเคชัน มักบรรจุโลโก้, ชื่อหน้า, และไอคอนการตั้งค่าหรือโปรไฟล์',
      textColor: 'text-indigo-600',
      activeBorder: 'border-indigo-300',
      icon: <PanelTop className="w-5 h-5" />
    },
    navigation: {
      id: 'navigation',
      title: 'Navigation Bar',
      desc: 'แถบนำทางหลัก ช่วยให้ผู้ใช้สลับหน้าหลักๆ ของแอปพลิเคชันได้ (มักอยู่ด้านล่างในมือถือ หรือด้านซ้าย/บนในเดสก์ท็อป)',
      textColor: 'text-teal-600',
      activeBorder: 'border-teal-300',
      icon: <Compass className="w-5 h-5" />
    },
    body: {
      id: 'body',
      title: 'Body / Content Area',
      desc: 'พื้นที่แสดงเนื้อหาหลักของหน้านั้นๆ เช่น รายการสินค้า, บทความ, หรือรูปภาพ',
      textColor: 'text-slate-600',
      activeBorder: 'border-slate-300',
      icon: <LayoutTemplate className="w-5 h-5" />
    },
    cta: {
      id: 'cta',
      title: 'Call to Action (CTA)',
      desc: 'ปุ่มกระตุ้นการตัดสินใจหลัก ที่ต้องการให้ผู้ใช้กด เช่น "ซื้อเลย", "สมัครสมาชิก", "บันทึก"',
      textColor: 'text-rose-600',
      activeBorder: 'border-rose-300',
      icon: <MousePointerClick className="w-5 h-5" />
    }
  };

  const handleHover = (area) => {
    setActiveArea(area);
  };

  const handleLeave = () => {
    setActiveArea('none');
  };

  return (
    <div className="relative w-full min-h-screen bg-[#FAFAFA] font-sans">
      <AmbientBackdrop />
      
      <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 pb-20">
        
        {/* Section 1.2.1 */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              1.2.1 ส่วนประกอบหลักบนอินเตอร์เฟส
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              โครงสร้างหน้าตาแอปพลิเคชันพื้นฐาน
            </h3>
          </div>
          
          <div className="prose prose-zinc max-w-none">
            <p className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed">
              ไม่ว่าจะเป็นแอปพลิเคชันมือถือ เว็บไซต์ หรือซอฟต์แวร์เดสก์ท็อป ล้วนมีโครงสร้างพื้นฐานที่ประกอบขึ้นจากบล็อก (Building Blocks) ที่คล้ายคลึงกัน การทำความเข้าใจหน้าที่ของแต่ละส่วนประกอบ จะช่วยให้ออกแบบหน้าจอที่เป็นมิตรและใช้งานง่าย
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mt-8">
            
            {/* Interactive App Mockup */}
            <SimulatorShell className="p-0 overflow-hidden border border-slate-200/60 shadow-xl bg-slate-50/50 backdrop-blur-xl rounded-3xl">
              <div className="bg-slate-900 px-4 py-3 flex items-center justify-between">
                 <div className="flex space-x-2 w-16">
                   <div className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 cursor-pointer transition-colors"></div>
                   <div className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 cursor-pointer transition-colors"></div>
                   <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 cursor-pointer transition-colors"></div>
                 </div>
                 <div className="flex bg-slate-800 rounded-lg p-1">
                   <button 
                     onClick={() => setViewMode('app')} 
                     className={`px-3 py-1 rounded-md text-xs font-medium flex items-center space-x-1.5 transition-all ${viewMode === 'app' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-300'}`}
                   >
                     <Smartphone className="w-3.5 h-3.5"/><span>Mobile</span>
                   </button>
                   <button 
                     onClick={() => setViewMode('web')} 
                     className={`px-3 py-1 rounded-md text-xs font-medium flex items-center space-x-1.5 transition-all ${viewMode === 'web' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-300'}`}
                   >
                     <Laptop className="w-3.5 h-3.5"/><span>Web</span>
                   </button>
                 </div>
                 <div className="w-16"></div>
              </div>
              
              <div className="p-8 flex items-center justify-center bg-slate-100 min-h-[500px]">
                
                {viewMode === 'app' && (
                  <div className="relative w-[280px] h-[580px] bg-white rounded-[40px] shadow-2xl border-[8px] border-slate-800 overflow-hidden flex flex-col transition-transform duration-500 hover:scale-[1.02]">
                    
                    {/* Notch */}
                    <div className="absolute top-0 inset-x-0 h-6 bg-slate-800 rounded-b-3xl w-40 mx-auto z-20"></div>

                    {/* Header Area */}
                    <div 
                      className={`relative z-10 w-full pt-10 pb-4 px-5 flex items-center justify-between border-b border-slate-100 transition-all duration-300 cursor-pointer ${activeArea === 'header' || activeArea === 'none' ? 'opacity-100' : 'opacity-30'} ${activeArea === 'header' ? 'bg-indigo-50/80' : 'bg-white'}`}
                      onMouseEnter={() => handleHover('header')}
                      onMouseLeave={handleLeave}
                    >
                      <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                      <div className="h-4 w-24 bg-slate-200 rounded-full"></div>
                      <div className="w-6 h-6 rounded-md bg-slate-200"></div>
                      
                      {activeArea === 'header' && (
                        <div className="absolute inset-0 border-2 border-indigo-500 rounded-t-[32px] pointer-events-none"></div>
                      )}
                    </div>

                    {/* Body Area */}
                    <div 
                      className={`relative z-0 flex-1 w-full bg-slate-50 p-5 space-y-4 overflow-hidden transition-all duration-300 cursor-pointer ${activeArea === 'body' || activeArea === 'none' ? 'opacity-100' : 'opacity-30'} ${activeArea === 'body' ? 'bg-slate-200/50' : ''}`}
                      onMouseEnter={() => handleHover('body')}
                      onMouseLeave={handleLeave}
                    >
                      <div className="w-full h-32 bg-white rounded-2xl shadow-sm border border-slate-100 p-4 space-y-3">
                        <div className="w-full h-16 bg-slate-100 rounded-xl"></div>
                        <div className="h-3 w-3/4 bg-slate-200 rounded-full"></div>
                        <div className="h-3 w-1/2 bg-slate-200 rounded-full"></div>
                      </div>
                      <div className="w-full h-32 bg-white rounded-2xl shadow-sm border border-slate-100 p-4 space-y-3">
                        <div className="w-full h-16 bg-slate-100 rounded-xl"></div>
                        <div className="h-3 w-3/4 bg-slate-200 rounded-full"></div>
                        <div className="h-3 w-1/2 bg-slate-200 rounded-full"></div>
                      </div>
                      {activeArea === 'body' && (
                        <div className="absolute inset-0 border-2 border-slate-400 pointer-events-none"></div>
                      )}
                    </div>

                    {/* Floating CTA */}
                    <div 
                      className={`absolute bottom-24 right-5 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 cursor-pointer z-20 ${activeArea === 'cta' || activeArea === 'none' ? 'opacity-100 scale-100' : 'opacity-30 scale-95'} ${activeArea === 'cta' ? 'bg-rose-600 scale-110' : 'bg-rose-500'}`}
                      onMouseEnter={() => handleHover('cta')}
                      onMouseLeave={handleLeave}
                    >
                      <MousePointerClick className="w-6 h-6 text-white" />
                      {activeArea === 'cta' && (
                        <div className="absolute inset-0 rounded-full border-2 border-rose-500 scale-125 animate-ping opacity-50 pointer-events-none"></div>
                      )}
                    </div>

                    {/* Navigation Bar */}
                    <div 
                      className={`relative z-10 w-full h-20 bg-white border-t border-slate-100 flex items-center justify-around pb-4 transition-all duration-300 cursor-pointer ${activeArea === 'navigation' || activeArea === 'none' ? 'opacity-100' : 'opacity-30'} ${activeArea === 'navigation' ? 'bg-teal-50/80' : ''}`}
                      onMouseEnter={() => handleHover('navigation')}
                      onMouseLeave={handleLeave}
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-800 flex flex-col items-center justify-center space-y-1">
                        <div className="w-5 h-5 bg-white/20 rounded-md"></div>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex flex-col items-center justify-center space-y-1">
                        <div className="w-5 h-5 bg-slate-300 rounded-md"></div>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex flex-col items-center justify-center space-y-1">
                        <div className="w-5 h-5 bg-slate-300 rounded-md"></div>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex flex-col items-center justify-center space-y-1">
                        <div className="w-5 h-5 bg-slate-300 rounded-md"></div>
                      </div>

                      {activeArea === 'navigation' && (
                        <div className="absolute inset-0 border-2 border-teal-500 rounded-b-[32px] pointer-events-none"></div>
                      )}
                    </div>
                  </div>
                )}

                {viewMode === 'web' && (
                  <div className="relative w-full max-w-[600px] h-[450px] bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col transition-transform duration-500 hover:scale-[1.02]">
                    {/* Browser Mockup Decor */}
                    <div className="h-6 w-full bg-slate-100 flex items-center px-3 space-x-1.5 border-b border-slate-200">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                    </div>

                    {/* Header / Top Bar */}
                    <div 
                      className={`relative z-10 w-full h-16 flex items-center justify-between px-6 border-b border-slate-100 transition-all duration-300 cursor-pointer ${activeArea === 'header' || activeArea === 'none' ? 'opacity-100' : 'opacity-30'} ${activeArea === 'header' ? 'bg-indigo-50/80' : 'bg-white'}`}
                      onMouseEnter={() => handleHover('header')}
                      onMouseLeave={handleLeave}
                    >
                      <div className="flex items-center space-x-6 z-20">
                        <div className="w-8 h-8 rounded-md bg-indigo-500 flex-shrink-0"></div>
                        
                        {/* Horizontal Navigation inside Header */}
                        <div 
                          className={`flex space-x-4 transition-all duration-300 p-2 rounded-lg cursor-pointer ${activeArea === 'navigation' || activeArea === 'none' ? 'opacity-100' : 'opacity-30'} ${activeArea === 'navigation' ? 'bg-teal-100 ring-2 ring-teal-400' : ''}`}
                          onMouseEnter={(e) => { e.stopPropagation(); handleHover('navigation'); }}
                          onMouseLeave={(e) => { e.stopPropagation(); handleLeave(); }}
                        >
                          <div className="h-3 w-12 bg-slate-300 rounded-full"></div>
                          <div className="h-3 w-12 bg-slate-300 rounded-full"></div>
                          <div className="h-3 w-12 bg-slate-300 rounded-full"></div>
                        </div>
                      </div>

                      <div className="flex space-x-4 items-center z-20">
                        {/* CTA in Web */}
                        <div 
                          className={`h-8 w-24 bg-rose-500 rounded-md transition-all duration-300 flex items-center justify-center cursor-pointer ${activeArea === 'cta' || activeArea === 'none' ? 'opacity-100' : 'opacity-30'} ${activeArea === 'cta' ? 'scale-105 shadow-md bg-rose-600' : ''}`}
                          onMouseEnter={(e) => { e.stopPropagation(); handleHover('cta'); }}
                          onMouseLeave={(e) => { e.stopPropagation(); handleLeave(); }}
                        >
                          {activeArea === 'cta' && <div className="absolute inset-0 border-2 border-rose-500 scale-110 rounded-md animate-ping opacity-50 pointer-events-none"></div>}
                        </div>
                        <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                      </div>

                      {activeArea === 'header' && (
                        <div className="absolute inset-0 border-2 border-indigo-500 pointer-events-none"></div>
                      )}
                    </div>

                    <div className="flex-1 flex w-full relative">
                      {/* Optional Sidebar Nav */}
                      <div 
                        className={`w-40 border-r border-slate-100 p-4 space-y-4 transition-all duration-300 cursor-pointer ${activeArea === 'navigation' || activeArea === 'none' ? 'opacity-100' : 'opacity-30'} ${activeArea === 'navigation' ? 'bg-teal-50/80' : 'bg-slate-50'}`}
                        onMouseEnter={() => handleHover('navigation')}
                        onMouseLeave={handleLeave}
                      >
                         <div className="h-4 w-3/4 bg-slate-200 rounded-full"></div>
                         <div className="h-4 w-full bg-slate-200 rounded-full"></div>
                         <div className="h-4 w-2/3 bg-slate-200 rounded-full"></div>
                         <div className="h-4 w-full bg-slate-200 rounded-full"></div>
                         {activeArea === 'navigation' && (
                           <div className="absolute inset-y-0 left-0 w-40 border-2 border-teal-500 pointer-events-none"></div>
                         )}
                      </div>

                      {/* Main Body */}
                      <div 
                        className={`flex-1 p-6 space-y-6 transition-all duration-300 cursor-pointer overflow-hidden ${activeArea === 'body' || activeArea === 'none' ? 'opacity-100' : 'opacity-30'} ${activeArea === 'body' ? 'bg-slate-200/50' : 'bg-white'}`}
                        onMouseEnter={() => handleHover('body')}
                        onMouseLeave={handleLeave}
                      >
                        <div className="h-8 w-1/3 bg-slate-200 rounded-lg"></div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="h-28 bg-slate-100 rounded-xl border border-slate-200"></div>
                          <div className="h-28 bg-slate-100 rounded-xl border border-slate-200"></div>
                        </div>
                        <div className="h-24 bg-slate-100 rounded-xl border border-slate-200 w-full"></div>

                        {activeArea === 'body' && (
                           <div className="absolute inset-y-0 right-0 left-40 border-2 border-slate-400 pointer-events-none"></div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </SimulatorShell>

            {/* Explanations */}
            <div className="space-y-4">
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 h-full">
                <h4 className="text-[18px] font-semibold text-slate-800 mb-2">โครงสร้างกายวิภาค (UI Anatomy)</h4>
                <p className="text-[15px] text-slate-600 mb-6">
                  ลองเอาเมาส์ชี้ (Hover) ที่หน้าจอโทรศัพท์จำลอง หรือบล็อกข้อมูลด้านล่าง เพื่อดูการเชื่อมโยงของแต่ละส่วนประกอบ
                </p>

                <div className="space-y-3">
                  {Object.values(uiParts).map((part) => (
                    <div 
                      key={part.id}
                      className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex gap-4 ${activeArea === part.id ? `bg-white shadow-md ${part.activeBorder} scale-[1.02]` : 'bg-slate-50/50 border-slate-200/50 hover:bg-slate-100'}`}
                      onMouseEnter={() => handleHover(part.id)}
                      onMouseLeave={handleLeave}
                    >
                      <div className={`p-3 rounded-xl bg-white shadow-sm flex items-center justify-center h-fit ${activeArea === part.id ? part.textColor : 'text-slate-500'}`}>
                        {part.icon}
                      </div>
                      <div>
                        <h5 className={`font-semibold text-[16px] mb-1 transition-colors ${activeArea === part.id ? part.textColor : 'text-slate-800'}`}>
                          {part.title}
                        </h5>
                        <p className="text-[14px] text-slate-600 leading-relaxed">
                          {part.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Section 1.2.2 */}
        <section className="space-y-6 pt-8">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-fuchsia-600 tracking-wider uppercase">
              1.2.2 การสำรวจและแยกแยะประเภทส่วนติดต่อผู้ใช้
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ส่วนติดต่อผู้ใช้ในชีวิตประจำวัน
            </h3>
          </div>

          <div className="prose prose-zinc max-w-none mb-8">
            <p className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed">
              อินเตอร์เฟสไม่ได้จำกัดอยู่แค่บนหน้าจอคอมพิวเตอร์หรือโทรศัพท์มือถือเท่านั้น แต่ยังแฝงอยู่ในอุปกรณ์และสภาพแวดล้อมรอบตัวเรา การสังเกตและแยกแยะช่วยให้เราเข้าใจบริบทของการออกแบบ UI มากขึ้น
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 hover:-translate-y-1 hover:shadow-2xl hover:border-indigo-400/40 transition-all duration-300 cursor-pointer group">
              <div className="p-3 rounded-2xl bg-indigo-50/80 text-indigo-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner w-fit mb-4">
                <Smartphone className="w-6 h-6 transition-transform group-hover:rotate-12 duration-300" />
              </div>
              <h4 className="text-[18px] font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
                Digital UI (แอปพลิเคชัน/เว็บไซต์)
              </h4>
              <p className="text-[15px] text-slate-600 leading-relaxed mb-4">
                อินเตอร์เฟสที่เราคุ้นเคยที่สุด โต้ตอบผ่านการสัมผัส (Touch) หรือคลิกเมาส์ เน้นการจัดวางบนหน้าจอ 2 มิติ
              </p>
              <ul className="space-y-2 text-[14.5px] text-slate-500">
                 <li className="flex items-center space-x-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div><span>แอปโซเชียลมีเดีย (Facebook, IG)</span></li>
                 <li className="flex items-center space-x-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div><span>เว็บไซต์อีคอมเมิร์ซ (Shopee, Lazada)</span></li>
                 <li className="flex items-center space-x-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div><span>แอปธนาคาร (Mobile Banking)</span></li>
              </ul>
            </div>

            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 hover:-translate-y-1 hover:shadow-2xl hover:border-rose-400/40 transition-all duration-300 cursor-pointer group">
              <div className="p-3 rounded-2xl bg-rose-50/80 text-rose-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner w-fit mb-4">
                <Coffee className="w-6 h-6 transition-transform group-hover:rotate-12 duration-300" />
              </div>
              <h4 className="text-[18px] font-bold text-slate-800 mb-2 group-hover:text-rose-600 transition-colors">
                Hardware UI (เครื่องใช้ไฟฟ้า/ตู้กด)
              </h4>
              <p className="text-[15px] text-slate-600 leading-relaxed mb-4">
                อินเตอร์เฟสทางกายภาพ โต้ตอบผ่านปุ่มกดแบบกลไก (Mechanical) ลูกบิด หรือหน้าจอสัมผัสติดเครื่องจักร
              </p>
              <ul className="space-y-2 text-[14.5px] text-slate-500">
                 <li className="flex items-center space-x-2"><div className="w-1.5 h-1.5 rounded-full bg-rose-400"></div><span>ตู้ ATM หรือตู้เต่าบิน</span></li>
                 <li className="flex items-center space-x-2"><div className="w-1.5 h-1.5 rounded-full bg-rose-400"></div><span>แผงควบคุมเครื่องซักผ้า / ไมโครเวฟ</span></li>
                 <li className="flex items-center space-x-2"><div className="w-1.5 h-1.5 rounded-full bg-rose-400"></div><span>รีโมททีวี หรือจอยสติ๊กเกมเพลย์</span></li>
              </ul>
            </div>

            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 hover:-translate-y-1 hover:shadow-2xl hover:border-teal-400/40 transition-all duration-300 cursor-pointer group">
              <div className="p-3 rounded-2xl bg-teal-50/80 text-teal-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner w-fit mb-4">
                <Laptop className="w-6 h-6 transition-transform group-hover:rotate-12 duration-300" />
              </div>
              <h4 className="text-[18px] font-bold text-slate-800 mb-2 group-hover:text-teal-600 transition-colors">
                Dashboard & System UI
              </h4>
              <p className="text-[15px] text-slate-600 leading-relaxed mb-4">
                อินเตอร์เฟสที่เน้นการแสดงข้อมูลจำนวนมาก มีความซับซ้อนสูง มักใช้ในระดับปฏิบัติการหรือควบคุมระบบ
              </p>
              <ul className="space-y-2 text-[14.5px] text-slate-500">
                 <li className="flex items-center space-x-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div><span>ระบบจัดการหลังบ้าน (CMS Admin)</span></li>
                 <li className="flex items-center space-x-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div><span>โปรแกรมควบคุมสต็อกสินค้า (POS)</span></li>
                 <li className="flex items-center space-x-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div><span>หน้าปัดรถยนต์ หรือห้องนักบิน</span></li>
              </ul>
            </div>
          </div>

          <div className="bg-indigo-50/60 backdrop-blur-md border border-indigo-200/60 rounded-2xl p-6 border-l-[3.5px] border-l-indigo-500 mt-8 shadow-sm">
            <h4 className="text-[18px] font-semibold text-indigo-900 flex items-center gap-2 mb-3">
               <Component className="w-5 h-5 text-indigo-600" />
               Tips สำหรับนักออกแบบ UX/UI
            </h4>
            <p className="text-[16px] text-indigo-800/80 leading-relaxed">
              เวลาคุณใช้งานแอปพลิเคชันใดๆ ในชีวิตประจำวัน ให้ลองตั้งคำถามกับตัวเองว่า <b>"ปุ่มนี้ทำหน้าที่อะไร ทำไมถึงอยู่ตรงนี้?"</b> การหมั่นสังเกตและถอดโครงสร้าง (Deconstruct) แอปพลิเคชันที่คนนิยมใช้ จะช่วยให้คุณซึมซับ Design Patterns ที่ดีได้โดยอัตโนมัติ
            </p>
          </div>

        </section>

      </main>
    </div>
  );
}
