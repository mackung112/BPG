import React, { useEffect } from 'react';

export default function oop3_1() {
  useEffect(() => {
    // Load Phosphor Icons
    if (!document.getElementById('phosphor-icons')) {
      const script = document.createElement('script');
      script.id = 'phosphor-icons';
      script.src = 'https://unpkg.com/@phosphor-icons/web';
      document.head.appendChild(script);
    }

    // Load Highlight.js CSS
    if (!document.getElementById('highlight-css')) {
      const link = document.createElement('link');
      link.id = 'highlight-css';
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css';
      document.head.appendChild(link);
    }

    // Load Highlight.js Script
    if (!document.getElementById('highlight-js')) {
      const script = document.createElement('script');
      script.id = 'highlight-js';
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';
      script.onload = () => {
        if (window.hljs) window.hljs.highlightAll();
      };
      document.head.appendChild(script);
    } else if (window.hljs) {
      window.hljs.highlightAll();
    }
  }, []);

  return (
    <div className="font-sans pb-20 bg-[#f3f4f6] text-[#1f2937]">
      <style>{`
        .mac-window {
            background-color: #1e1e1e;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
            border: 1px solid #333;
        }
        .mac-header {
            background-color: #2d2d2d;
            padding: 12px 16px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .mac-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
        }
        .dot-red { background-color: #ff5f56; }
        .dot-yellow { background-color: #ffbd2e; }
        .dot-green { background-color: #27c93f; }
        
        pre { margin: 0; }
        .hljs { background: transparent !important; padding: 1.5rem !important; font-size: 0.95rem; line-height: 1.6; }
        
        .info-card {
            background: white;
            border-radius: 16px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .info-card:hover {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            transform: translateY(-2px);
        }
      `}</style>

      {/* Header Section */}
      <header className="bg-[#111827] pt-20 pb-24 px-4 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-slate-800 rounded-full px-4 py-1.5 text-xs font-semibold text-[#facc15] mb-6 border border-slate-700 tracking-wider">
            <i className="ph-fill ph-chalkboard-teacher text-lg"></i> TEACHER'S GUIDE
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
            สอน <span className="text-[#facc15]">OOP & Tkinter</span><br />ให้ใช้งานได้จริง
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto font-light">
            แผนการสอน 3 สัปดาห์: เปลี่ยนเรื่องนามธรรมให้จับต้องได้ผ่านโปรเจกต์
          </p>
        </div>
        {/* ตกแต่งพื้นหลัง Header แบบ Grid */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 -mt-10 relative z-20 space-y-16">

        {/* Section 1: แผนการสอน (Timeline Style) */}
        <section>
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 md:p-10">
            <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 text-2xl">
                <i className="ph-duotone ph-calendar-check"></i>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">แผนการสอนระยะเวลา 3 สัปดาห์</h2>
                <p className="text-slate-500 text-sm">รวม 9 ชั่วโมง (สัปดาห์ละ 3 ชั่วโมง)</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="mt-1 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">สัปดาห์ 1</div>
                <p className="text-slate-700 leading-relaxed"><strong className="text-slate-900">ชั่วโมงที่ 1-1.5:</strong> สอนโค้ด 4 เสาหลัก OOP เพียวๆ รันบนจอดำ ให้นักเรียนเข้าใจการสร้างคลาส การสืบทอด และการซ่อนข้อมูล</p>
              </div>
              <div className="flex gap-4 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="mt-1 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">สัปดาห์ 1</div>
                <p className="text-slate-700 leading-relaxed"><strong className="text-slate-900">ชั่วโมงที่ 1.5-3:</strong> สอนโค้ด Tkinter เพียวๆ แบบใช้ฟังก์ชันธรรมดา ให้นักเรียนตื่นเต้นกับการสร้างหน้าต่าง ปุ่มกด และกล่องข้อความ</p>
              </div>
              <div className="flex gap-4 items-start bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                <div className="mt-1 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">สัปดาห์ 2</div>
                <p className="text-slate-700 leading-relaxed"><strong className="text-slate-900">ชั่วโมงที่ 1-1.5:</strong> สอนเทคนิค "ประกอบร่าง" โดยนำเครื่องมือ Tkinter เข้าไปไว้ในเมธอด __init__ ของคลาส และเปลี่ยนฟังก์ชันธรรมดาให้เป็นเมธอดที่มีคำว่า self</p>
              </div>
              <div className="flex gap-4 items-start bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                <div className="mt-1 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">สัปดาห์ 2</div>
                <p className="text-slate-700 leading-relaxed"><strong className="text-slate-900">ชั่วโมงที่ 1.5-3:</strong> แบ่งกลุ่มนักเรียน ให้ตัวแทนมาจับฉลากสุ่มหัวข้อโปรเจกต์ และให้เวลาลงมือออกแบบโครงสร้างคลาสในห้องเรียน</p>
              </div>
              <div className="flex gap-4 items-start bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                <div className="mt-1 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">สัปดาห์ 3</div>
                <p className="text-slate-700 leading-relaxed"><strong className="text-slate-900">ชั่วโมงที่ 1-3:</strong> นักเรียนแต่ละกลุ่มนำเสนอผลงานโปรเจกต์หน้าชั้นเรียน พร้อมเปิดโค้ดเพื่ออธิบายว่าใช้ 4 เสาหลัก OOP และ Tkinter ไว้ตรงจุดไหนบ้าง</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: โครงสร้างการให้คะแนน (4 Pillars Design) */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">โครงสร้างการให้คะแนน 20 คะแนน</h2>
            <p className="text-slate-500">แบ่งการเก็บคะแนนเป็นระยะ เพื่อประเมินความเข้าใจอย่างต่อเนื่อง</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="info-card p-6">
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-4 text-red-500">
                <i className="ph-duotone ph-file-code text-3xl"></i>
              </div>
              <div className="flex justify-between items-end mb-2">
                <h3 className="text-lg font-bold text-slate-800">งานเดี่ยว (สัปดาห์ที่ 1)</h3>
                <span className="text-2xl font-black text-red-500">5 <span className="text-sm font-normal text-slate-400">คะแนน</span></span>
              </div>
              <p className="text-sm text-slate-600">ส่งไฟล์โค้ด OOP และโค้ด Tkinter ที่เรียนในห้อง โดยให้ดัดแปลงข้อความหรือสีปุ่มเล็กน้อยเพื่อยืนยันความเข้าใจ</p>
            </div>
            {/* Card 2 */}
            <div className="info-card p-6">
              <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center mb-4 text-yellow-600">
                <i className="ph-duotone ph-users-three text-3xl"></i>
              </div>
              <div className="flex justify-between items-end mb-2">
                <h3 className="text-lg font-bold text-slate-800">งานกลุ่ม (สัปดาห์ที่ 2)</h3>
                <span className="text-2xl font-black text-yellow-500">5 <span className="text-sm font-normal text-slate-400">คะแนน</span></span>
              </div>
              <p className="text-sm text-slate-600">ตรวจโครงร่างโปรเจกต์ (ความคืบหน้า) ว่ามีการสร้างคลาสแม่ คลาสลูก และวาดหน้าต่าง GUI ขึ้นมาได้ตรงตามหัวข้อที่จับฉลากได้หรือไม่</p>
            </div>
            {/* Card 3 */}
            <div className="info-card p-6 md:ring-2 md:ring-[#111827]">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4 text-green-600">
                <i className="ph-duotone ph-presentation-chart text-3xl"></i>
              </div>
              <div className="flex justify-between items-end mb-2">
                <h3 className="text-lg font-bold text-slate-800">นำเสนอ (สัปดาห์ที่ 3)</h3>
                <span className="text-2xl font-black text-green-500">10 <span className="text-sm font-normal text-slate-400">คะแนน</span></span>
              </div>
              <p className="text-sm text-slate-600">ประเมินผลจากโปรเจกต์ที่ทำงานได้จริง (ไม่ Error) และทักษะการนำเสนออธิบายโค้ดหน้าชั้นเรียน</p>
            </div>
          </div>
        </section>

        {/* Section 3: หัวข้อโปรเจกต์ (Grid Design) */}
        <section>
          <div className="bg-[#111827] rounded-3xl p-8 md:p-10 shadow-xl text-white">
            <div className="text-center mb-10">
              <div className="inline-block bg-slate-800 p-3 rounded-full mb-4">
                <i className="ph-duotone ph-dice-five text-3xl text-[#facc15]"></i>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">5 หัวข้อโปรเจกต์มาตรฐานสำหรับการจับฉลาก</h2>
              <p className="text-slate-400">ทุกหัวข้อมีลักษณะเป็น "ระบบบันทึกข้อมูลและคำนวณราคา" เพื่อให้มีความยากที่เท่าเทียมกัน</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                <div className="text-2xl mb-2">🍲</div>
                <h3 className="font-bold text-[#facc15] mb-1">ระบบสั่งอาหารร้านชาบู</h3>
                <p className="text-sm text-slate-300">คลาสแม่คือ 'วัตถุดิบ' คลาสลูกคือ 'เนื้อสัตว์' (คิดราคาตามน้ำหนัก) และ 'ผัก' (คิดราคาเป็นชุด)</p>
              </div>
              <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                <div className="text-2xl mb-2">🎟️</div>
                <h3 className="font-bold text-[#facc15] mb-1">ระบบจองตั๋วภาพยนตร์</h3>
                <p className="text-sm text-slate-300">คลาสแม่คือ 'ที่นั่ง' คลาสลูกคือ 'ที่นั่งธรรมดา' และ 'ที่นั่งโซฟา VIP' (มีบวกราคาเพิ่ม)</p>
              </div>
              <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                <div className="text-2xl mb-2">📚</div>
                <h3 className="font-bold text-[#facc15] mb-1">ระบบร้านเช่าหนังสือ</h3>
                <p className="text-sm text-slate-300">คลาสแม่คือ 'หนังสือ' คลาสลูกคือ 'การ์ตูน' (เช่ารายวัน) และ 'นวนิยาย' (เช่ารายสัปดาห์)</p>
              </div>
              <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                <div className="text-2xl mb-2">🦷</div>
                <h3 className="font-bold text-[#facc15] mb-1">ระบบจองคิวคลินิกทำฟัน</h3>
                <p className="text-sm text-slate-300">คลาสแม่คือ 'คนไข้' คลาสลูกคือ 'เด็ก' (มีส่วนลด) และ 'ผู้ใหญ่' (ราคาปกติ)</p>
              </div>
              <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 md:col-span-2 lg:col-span-1">
                <div className="text-2xl mb-2">⚔️</div>
                <h3 className="font-bold text-[#facc15] mb-1">ระบบซื้อขายไอเทมเกม</h3>
                <p className="text-sm text-slate-300">คลาสแม่คือ 'ไอเทม' คลาสลูกคือ 'อาวุธ' (มีพลังโจมตี) และ 'ชุดเกราะ' (มีพลังป้องกัน)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Code OOP (Mac Window) */}
        <section>
          <div className="flex items-center gap-3 mb-6 px-2">
            <i className="ph-duotone ph-terminal-window text-3xl text-purple-600"></i>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">ส่วนที่ 1: โค้ดเพียวๆ ของ 4 เสาหลัก OOP</h2>
              <p className="text-slate-500 text-sm">รันบนหน้าจอดำ Console (ไม่มี Tkinter มารบกวน)</p>
            </div>
          </div>
          
          <div className="mac-window mb-6 max-w-4xl mx-auto">
            <div className="mac-header">
              <div className="mac-dot dot-red"></div>
              <div className="mac-dot dot-yellow"></div>
              <div className="mac-dot dot-green"></div>
              <div className="text-slate-400 text-xs font-mono ml-2">oop_concept.py</div>
            </div>
<pre><code className="language-python">{`from abc import ABC, abstractmethod

# -----------------------------------------------------
# เสาหลักที่ 2: Abstraction (คลาสแม่ที่เป็นนามธรรม สร้าง Object ตรงๆ ไม่ได้)
# -----------------------------------------------------
class Beverage(ABC):
    def __init__(self, name, price):
        self.name = name
        self.__price = price  # เสาหลักที่ 1: Encapsulation (ซ่อนราคาเป็น Private)

    # เมธอดเปิดช่องทางให้คนภายนอกอ่านค่า Private ได้อย่างปลอดภัย (Getter)
    def get_price(self):
        return self.__price

    @abstractmethod
    def prepare(self):
        pass  # บังคับว่าคลาสลูกทุกตัว "ต้อง" เขียนคำสั่งชงเครื่องดื่มเอง

# -----------------------------------------------------
# เสาหลักที่ 3: Inheritance (สืบทอดคุณสมบัติจากคลาส Beverage)
# -----------------------------------------------------
class Coffee(Beverage):
    def __init__(self, name, price, bean_type):
        super().__init__(name, price) # ส่งชื่อและราคาไปให้คลาสแม่จัดการ
        self.bean_type = bean_type

    # เสาหลักที่ 4: Polymorphism (เขียนทับพฤติกรรม prepare ของตัวเอง)
    def prepare(self):
        return f"บดเมล็ด {self.bean_type} แล้วสกัดผ่านเครื่องเอสเปรสโซ่"

class Tea(Beverage):
    def __init__(self, name, price, flavor):
        super().__init__(name, price)
        self.flavor = flavor

    # เสาหลักที่ 4: Polymorphism (พฤติกรรมชื่อเดียวกัน แต่ทำงานต่างกัน)
    def prepare(self):
        return f"แช่ถุงชา {self.flavor} ในน้ำร้อนจัด 3 นาที"

# ================= ทดสอบรันโปรแกรม =================
order1 = Coffee("อเมริกาโน่", 60, "อาราบิก้า")
order2 = Tea("ชาเขียว", 50, "มัทฉะ")

print(f"เมนู: {order1.name} | ราคา: {order1.get_price()} บาท -> {order1.prepare()}")
print(f"เมนู: {order2.name} | ราคา: {order2.get_price()} บาท -> {order2.prepare()}")`}</code></pre>
          </div>

          {/* คำอธิบาย Code OOP */}
          <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 max-w-4xl mx-auto">
            <h3 className="font-bold text-purple-800 mb-4 flex items-center gap-2"><i className="ph-bold ph-lightbulb"></i> คำอธิบายสำหรับครูไปสอนเด็ก (อะไรเป็นอะไร)</h3>
            <div className="space-y-3">
              <div className="flex gap-3 text-sm text-slate-700 bg-white p-3 rounded-lg border border-purple-50 shadow-sm"><span className="text-purple-500 mt-1">●</span> <div><strong>ABC และ @abstractmethod</strong> คือ "สัญญาจ้าง" ที่คลาสแม่สั่งว่า “ใครจะเป็นเครื่องดื่มร้านฉัน แกต้องมีวิธีชง (prepare) เป็นของตัวเองนะ”</div></div>
              <div className="flex gap-3 text-sm text-slate-700 bg-white p-3 rounded-lg border border-purple-50 shadow-sm"><span className="text-purple-500 mt-1">●</span> <div><strong>__price (มีขีดล่างสองตัว)</strong> คือการเอาตัวแปรใส่ตู้เซฟล็อกไว้ สั่ง order1.__price = 5 จากข้างนอกไม่ได้ ต้องอ่านผ่าน get_price() เท่านั้น</div></div>
              <div className="flex gap-3 text-sm text-slate-700 bg-white p-3 rounded-lg border border-purple-50 shadow-sm"><span className="text-purple-500 mt-1">●</span> <div><strong>super().__init__()</strong> คือการบอกคลาสลูกว่า “ไม่ต้องเหนื่อยสร้างตัวแปรชื่อกับราคาเองนะ โยนไปให้คลาสแม่ทำ”</div></div>
              <div className="flex gap-3 text-sm text-slate-700 bg-white p-3 rounded-lg border border-purple-50 shadow-sm"><span className="text-purple-500 mt-1">●</span> <div><strong>prepare()</strong> เป็นฟังก์ชันชื่อเดียวกันเป๊ะ แต่พอกาแฟถูกเรียกใช้บอกให้ "บดเมล็ด" พอชาถูกเรียกใช้บอกให้ "แช่ถุงชา" นี่คือการพ้องรูป</div></div>
            </div>
          </div>
        </section>

        {/* Section 5: Code Tkinter (Mac Window) */}
        <section className="pb-10">
          <div className="flex items-center gap-3 mb-6 px-2">
            <i className="ph-duotone ph-app-window text-3xl text-pink-600"></i>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">ส่วนที่ 2: โค้ดเพียวๆ ของ Tkinter</h2>
              <p className="text-slate-500 text-sm">เขียนแบบฟังก์ชันธรรมดา เพื่อให้เข้าใจกลไกการคลิกปุ่ม</p>
            </div>
          </div>
          
          <div className="mac-window mb-6 max-w-4xl mx-auto">
            <div className="mac-header">
              <div className="mac-dot dot-red"></div>
              <div className="mac-dot dot-yellow"></div>
              <div className="mac-dot dot-green"></div>
              <div className="text-slate-400 text-xs font-mono ml-2">tkinter_basic.py</div>
            </div>
<pre><code className="language-python">{`import tkinter as tk
from tkinter import messagebox

# 1. สร้างหน้าต่างหลัก
root = tk.Tk()
root.title("หน้าต่างทดสอบ Tkinter เพียวๆ")
root.geometry("400x350")

# ฟังก์ชันธรรมดา ที่จะถูกเรียกใช้เมื่อผู้ใช้คลิกปุ่ม
def submit_data():
    txt_input = entry_box.get()  # ดึงข้อความจากช่องกรอก
    
    if txt_input == "":
        messagebox.showwarning("แจ้งเตือน", "กรุณาพิมพ์ข้อความก่อนกดปุ่มครับ")
    else:
        messagebox.showinfo("ข้อความจากระบบ", f"รับค่า: {txt_input} สำเร็จ!")
        display_area.insert(tk.END, f"เพิ่มรายการ -> {txt_input}\\n")
        entry_box.delete(0, tk.END) # ล้างข้อความในช่องกรอกออก

# 2. เครื่องมือ Label (ข้อความโชว์เฉยๆ)
header_label = tk.Label(root, text="ทดสอบเครื่องมือ GUI", font=("Tahoma", 14, "bold"))
header_label.pack(pady=10)

# 3. เครื่องมือ Entry (ช่องพิมพ์ข้อความบรรทัดเดียว)
entry_box = tk.Entry(root, width=25, font=("Tahoma", 11))
entry_box.pack(pady=5)

# 4. เครื่องมือ Button (ปุ่มกด)
action_button = tk.Button(root, text="บันทึกข้อมูล", bg="#2196F3", fg="white", font=("Tahoma", 11), command=submit_data)
action_button.pack(pady=10)

# 5. เครื่องมือ Text (กล่องข้อความขนาดใหญ่)
display_area = tk.Text(root, height=8, width=35, font=("Tahoma", 10))
display_area.pack(pady=5)

# สั่งให้โปรแกรมเปิดหน้าต่างค้างไว้ตลอดเวลา
root.mainloop()`}</code></pre>
          </div>

          {/* คำอธิบาย Code Tkinter */}
          <div className="bg-pink-50 p-6 rounded-2xl border border-pink-100 max-w-4xl mx-auto">
            <h3 className="font-bold text-pink-800 mb-4 flex items-center gap-2"><i className="ph-bold ph-lightbulb"></i> คำอธิบายสำหรับครูไปสอนเด็ก (อะไรเป็นอะไร)</h3>
            <div className="space-y-3">
              <div className="flex gap-3 text-sm text-slate-700 bg-white p-3 rounded-lg border border-pink-50 shadow-sm"><span className="text-pink-500 mt-1">●</span> <div><strong>tk.Tk()</strong> คือการวาง "กระดาษวาดเขียนแผ่นใหญ่" ขึ้นมาบนหน้าจอคอมพิวเตอร์</div></div>
              <div className="flex gap-3 text-sm text-slate-700 bg-white p-3 rounded-lg border border-pink-50 shadow-sm"><span className="text-pink-500 mt-1">●</span> <div><strong>.pack()</strong> คือคำสั่งเอาเครื่องมือ (Widget) หย่อนลงไปแปะบนกระดาษ โดยมันจะเรียงจากบนลงล่างให้เองอัตโนมัติ</div></div>
              <div className="flex gap-3 text-sm text-slate-700 bg-white p-3 rounded-lg border border-pink-50 shadow-sm"><span className="text-pink-500 mt-1">●</span> <div><strong>command=submit_data</strong> คือการผูกสายสิญจน์จากปุ่มกด ไปหาฟังก์ชันข้างบนว่า “ถ้ามีคนคลิกแก ให้ไปปลุกฟังก์ชัน submit_data ให้ทำงานนะ” (ห้ามมีวงเล็บหลังชื่อฟังก์ชันเด็ดขาด)</div></div>
              <div className="flex gap-3 text-sm text-slate-700 bg-white p-3 rounded-lg border border-pink-50 shadow-sm"><span className="text-pink-500 mt-1">●</span> <div><strong>.get() และ .insert()</strong> คือท่ามาตรฐานในการ "ล้วงเอาข้อความออกมา" และ "ยัดข้อความเข้าไป" ในเครื่องมือของ Tkinter</div></div>
              <div className="flex gap-3 text-sm text-slate-700 bg-white p-3 rounded-lg border border-pink-50 shadow-sm"><span className="text-pink-500 mt-1">●</span> <div><strong>.mainloop()</strong> คือคำสั่งบอกคอมพิวเตอร์ว่า “ห้ามปิดโปรแกรมนี้นะ นั่งเฝ้าหน้าจอไปเรื่อยๆ จนกว่าคนใช้จะกดปุ่ม X กากบาทบนขวา”</div></div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
