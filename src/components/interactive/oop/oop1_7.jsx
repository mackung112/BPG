import React, { useState } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  AmbientBackdrop, 
  SimulatorShell, 
  SectionBlock, 
  ConceptCard 
} from '../shared';
import { 
  FolderTree, 
  FolderPlus, 
  FileCode, 
  Settings, 
  CheckCircle2,
  AlertCircle,
  FolderOpen
} from 'lucide-react';

const OOP1_BLOBS = [
  { color: 'bg-orange-200', size: 'w-[45vw] h-[45vw]', position: '-top-10 -left-10', opacity: 'opacity-25' },
  { color: 'bg-amber-200',  size: 'w-[40vw] h-[40vw]', position: 'top-[20%] -right-10', opacity: 'opacity-20' },
  { color: 'bg-rose-200',   size: 'w-[42vw] h-[42vw]', position: 'bottom-[10%] -left-5', opacity: 'opacity-25' },
  { color: 'bg-yellow-200', size: 'w-[38vw] h-[38vw]', position: 'bottom-[-10%] right-[10%]', opacity: 'opacity-20' },
];

export default function oop1_7() {
  const [selectedFolder, setSelectedFolder] = useState('root');

  return (
    <div className="font-sans text-zinc-800 pb-24 relative">
      <AmbientBackdrop blobs={OOP1_BLOBS} />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">

        <SectionBlock
          title="การจัดการโครงสร้างโฟลเดอร์โปรเจกต์"
          icon={<FolderTree className="w-6 h-6 text-orange-500" />}
          description="จัดระเบียบไฟล์งานให้เป็นมาตรฐานสากล เพื่อง่ายต่อการขยายขนาดโปรเจกต์ในอนาคต"
          variant="default"
          accent="orange"
        >
          <div className="space-y-6 leading-relaxed mb-6">
            <p className="text-[16px] md:text-[17px] font-normal text-zinc-600">
              เมื่อเราพัฒนาโปรแกรมด้วยแนวคิดเชิงวัตถุ (OOP) ไฟล์โค้ดของเราจะมีจำนวนเพิ่มขึ้นอย่างรวดเร็ว เนื่องจากเรามักจะแยกคลาสแต่ละคลาสออกเป็นไฟล์ย่อยๆ เพื่อความสะดวกในการดูแลรักษา การวางโครงสร้างโฟลเดอร์ (Directory Structure) อย่างเป็นระเบียบจึงเป็นสิ่งสำคัญเทียบเท่ากับการเขียนโค้ดที่ถูกต้อง
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ConceptCard 
                symbol="Modularity"
                title="ระบบโมดูลและแพ็กเกจ"
                description="การแยกไฟล์โค้ด (Module) และรวมกลุ่มไฟล์ที่เกี่ยวข้องกันไว้ในโฟลเดอร์เดียวกัน (Package) โดยอาจมีไฟล์ __init__.py กำกับไว้"
                accent="rose"
              />
              <ConceptCard 
                symbol="Naming"
                title="กฎการตั้งชื่อ (Naming Convention)"
                description="ชื่อไฟล์และโฟลเดอร์ควรใช้ตัวพิมพ์เล็กทั้งหมด ใช้ขีดล่าง (_) คั่นคำ และหลีกเลี่ยงช่องว่างหรือภาษาไทยเด็ดขาด"
                accent="amber"
              />
            </div>
          </div>

          <SimulatorShell
            title="โครงสร้างแฟ้มมาตรฐาน (Standard Project Directory)"
            accentBg="bg-orange-50/60"
            iconColor="text-orange-600"
            icon={<FolderOpen className="w-6 h-6 text-orange-600" />}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              
              {/* Left Panel: File Explorer */}
              <div className="bg-[#1E1E1E] rounded-2xl shadow-2xl p-5 border border-slate-700 flex flex-col font-mono text-sm text-[#CCCCCC]">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-700 uppercase tracking-widest text-[11px] font-bold text-slate-400">
                  <FolderTree className="w-4 h-4" /> EXPLORER: OOP_GAME_PROJECT
                </div>

                <div className="flex-1 space-y-1">
                  <div 
                    onClick={() => setSelectedFolder('root')}
                    className={`flex items-center gap-2 py-1 px-2 rounded cursor-pointer transition-colors ${selectedFolder === 'root' ? 'bg-[#37373D] text-white' : 'hover:bg-[#2A2D2E]'}`}
                  >
                    <FolderOpen className="w-4 h-4 text-orange-400" />
                    <span>OOP_Game_Project</span>
                  </div>

                  <div className="pl-4 space-y-1 border-l border-slate-700 ml-2 mt-1">
                    {/* src folder */}
                    <div 
                      onClick={() => setSelectedFolder('src')}
                      className={`flex items-center gap-2 py-1 px-2 rounded cursor-pointer transition-colors ${selectedFolder === 'src' ? 'bg-[#37373D] text-white' : 'hover:bg-[#2A2D2E]'}`}
                    >
                      <FolderPlus className="w-4 h-4 text-blue-400" />
                      <span>src</span>
                    </div>
                    
                    <div className="pl-4 space-y-1 border-l border-slate-700 ml-2 mt-1">
                      <div className="flex items-center gap-2 py-1 px-2 text-[#9CDCFE]">
                        <FileCode className="w-3.5 h-3.5" /> __init__.py
                      </div>
                      <div className="flex items-center gap-2 py-1 px-2 text-[#9CDCFE]">
                        <FileCode className="w-3.5 h-3.5" /> player.py
                      </div>
                      <div className="flex items-center gap-2 py-1 px-2 text-[#9CDCFE]">
                        <FileCode className="w-3.5 h-3.5" /> enemy.py
                      </div>
                    </div>

                    {/* assets folder */}
                    <div 
                      onClick={() => setSelectedFolder('assets')}
                      className={`flex items-center gap-2 py-1 px-2 rounded cursor-pointer transition-colors mt-1 ${selectedFolder === 'assets' ? 'bg-[#37373D] text-white' : 'hover:bg-[#2A2D2E]'}`}
                    >
                      <FolderPlus className="w-4 h-4 text-amber-400" />
                      <span>assets</span>
                    </div>

                    <div className="pl-4 space-y-1 border-l border-slate-700 ml-2 mt-1">
                      <div className="flex items-center gap-2 py-1 px-2 text-emerald-400">
                        <FolderPlus className="w-3.5 h-3.5" /> images
                      </div>
                      <div className="flex items-center gap-2 py-1 px-2 text-rose-400">
                        <FolderPlus className="w-3.5 h-3.5" /> sounds
                      </div>
                    </div>

                    {/* Main file */}
                    <div 
                      onClick={() => setSelectedFolder('main')}
                      className={`flex items-center gap-2 py-1 px-2 rounded cursor-pointer transition-colors mt-1 ${selectedFolder === 'main' ? 'bg-[#37373D] text-white' : 'hover:bg-[#2A2D2E]'}`}
                    >
                      <FileCode className="w-4 h-4 text-yellow-400" />
                      <span className="font-bold text-white">main.py</span>
                    </div>

                    {/* Virtual Env */}
                    <div className="flex items-center gap-2 py-1 px-2 text-slate-500 opacity-70 cursor-not-allowed">
                      <FolderOpen className="w-4 h-4" /> .venv
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Panel: Explanations */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200 flex flex-col justify-center">
                
                {selectedFolder === 'root' && (
                  <div className="animate-fadeIn">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                      <FolderTree className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">โฟลเดอร์หลัก (Root Directory)</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      โฟลเดอร์นอกสุดที่ครอบคลุมทุกไฟล์ในโปรเจกต์ ควรตั้งชื่อให้สื่อถึงตัวโปรเจกต์ (เช่น <code className="bg-slate-100 px-1.5 py-0.5 rounded text-rose-600">OOP_Game_Project</code>) และไม่ควรมีช่องว่างหรือตัวอักษรภาษาไทยเพื่อป้องกันปัญหา Path Error
                    </p>
                  </div>
                )}

                {selectedFolder === 'src' && (
                  <div className="animate-fadeIn">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                      <FileCode className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">โฟลเดอร์ Source Code (src/)</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      ใช้เก็บซอร์สโค้ดเชิงวัตถุทั้งหมด โดยแยกคลาสต่างๆ ออกเป็นไฟล์ (Module) เช่น ไฟล์ <code className="bg-slate-100 px-1.5 py-0.5 rounded">player.py</code> เก็บเฉพาะคลาสผู้เล่น
                    </p>
                    <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-xs text-blue-800 flex gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <p>
                        <strong>ไฟล์ __init__.py คืออะไร?</strong> เป็นไฟล์เปล่า (หรือมีโค้ดบางส่วน) ที่ทำหน้าที่บอกระบบ Python ว่าโฟลเดอร์นี้คือ <em>Package</em> ทำให้เราสามารถใช้คำสั่ง <code>from src.player import Player</code> ได้
                      </p>
                    </div>
                  </div>
                )}

                {selectedFolder === 'assets' && (
                  <div className="animate-fadeIn">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                      <FolderPlus className="w-6 h-6 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">โฟลเดอร์ทรัพยากร (assets/)</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      แยกเก็บไฟล์ที่ไม่ใช่โค้ดออกจากตัวโค้ดหลัก เช่น รูปภาพกราฟิก (PNG, JPG) ดนตรีประกอบ (MP3, WAV) เพื่อความเป็นระเบียบและไม่ปะปนกับ Source Code
                    </p>
                  </div>
                )}

                {selectedFolder === 'main' && (
                  <div className="animate-fadeIn">
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                      <FileCode className="w-6 h-6 text-yellow-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">ไฟล์หลัก (main.py)</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      เป็นจุดเริ่มต้นการรันโปรแกรม (Entry Point) มักจะวางไว้ชั้นนอกสุดของโฟลเดอร์ ทำหน้าที่ดึง (import) คลาสต่างๆ จากโฟลเดอร์ src/ มาประกอบกันและสั่งรัน
                    </p>
                    <div className="mt-4 p-3 bg-slate-900 rounded-lg font-mono text-xs text-emerald-400">
                      {">"} python main.py
                    </div>
                  </div>
                )}

              </div>
            </div>
          </SimulatorShell>
        </SectionBlock>

        <TeacherTask
          title="ใบงานปฏิบัติ: การจัดโครงสร้างโปรเจกต์"
          taskText={`ให้นักเรียนปฏิบัติตามเพื่อสร้างโครงสร้างโฟลเดอร์เตรียมพร้อมสำหรับทำโปรเจกต์:

1. สร้างโฟลเดอร์หลักชื่อ 'oop_project_01' ในไดรฟ์ D: ของนักเรียน
2. เปิดโฟลเดอร์นั้นด้วย VS Code
3. ภายในโปรแกรม VS Code ให้คลิกสร้างโฟลเดอร์ย่อยชื่อ 'src' และ 'assets'
4. ภายในโฟลเดอร์ src ให้สร้างไฟล์ '__init__.py' (พิมพ์ underscore 2 ครั้ง) และ 'main.py' วางไว้นอกสุดระดับเดียวกับโฟลเดอร์
5. บันทึกภาพหน้าต่าง Explorer ใน VS Code ที่แสดงโครงสร้าง Tree ทั้งหมดกางออกให้เห็นอย่างชัดเจน`}
        />

      </main>
    </div>
  );
}
