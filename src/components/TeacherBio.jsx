import React from 'react';
import { Phone, GraduationCap, Award, BookOpen, Heart, ArrowRight } from 'lucide-react';

const FacebookIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function TeacherBio() {
  const contacts = [
    {
      id: 'phone',
      label: 'เบอร์โทรศัพท์ติดต่อ',
      value: '093-6189243',
      href: 'tel:0936189243',
      icon: Phone,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200/60 hover:bg-emerald-500 hover:text-white',
      glow: 'hover:shadow-emerald-200/50'
    },
    {
      id: 'facebook',
      label: 'Facebook Profile',
      value: 'Thitiwut Chansom',
      href: 'https://www.facebook.com/search/top/?q=Thitiwut%20Chansom',
      icon: FacebookIcon,
      color: 'bg-blue-50 text-blue-600 border-blue-200/60 hover:bg-blue-600 hover:text-white',
      glow: 'hover:shadow-blue-200/50'
    },
    {
      id: 'instagram',
      label: 'Instagram ID',
      value: 'mac_xvii.10',
      href: 'https://www.instagram.com/mac_xvii.10/',
      icon: InstagramIcon,
      color: 'bg-rose-50 text-rose-600 border-rose-200/60 hover:bg-rose-500 hover:text-white',
      glow: 'hover:shadow-rose-200/50'
    }
  ];

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 md:p-8 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
      {/* Background soft blob inside card */}
      <div className="absolute bottom-[-50px] right-[-50px] w-80 h-80 rounded-full bg-teal-200/15 blur-3xl group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
      <div className="absolute top-[-30px] left-[-30px] w-60 h-60 rounded-full bg-cyan-200/15 blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column: Portrait Showcase with shine frame */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative group/avatar cursor-pointer">
            {/* Ambient Background Aura */}
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-teal-500 via-emerald-500 to-cyan-400 rounded-3xl blur-md opacity-25 group-hover/avatar:opacity-40 group-hover/avatar:scale-102 transition-all duration-500" />
            
            {/* Bezel frame */}
            <div className="relative bg-white/70 backdrop-blur-md border border-white rounded-[26px] p-2.5 shadow-2xl transition-transform duration-500 group-hover/avatar:-translate-y-1.5">
              <div className="w-64 h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden relative shadow-inner bg-slate-100">
                <img
                  src="/images/media__1780183273005.png"
                  alt="อ.ธิติวุฒิ จันทร์โสม (ครูแม็ค)"
                  className="w-full h-full object-cover object-center group-hover/avatar:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    // Fallback to second image if error
                    e.target.src = "/images/media__1780183271941.jpg";
                  }}
                />
                
                {/* Decorative absolute tag */}
                <div className="absolute bottom-3 left-3 right-3 py-1.5 px-3 bg-slate-900/75 backdrop-blur-sm rounded-xl border border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-white tracking-wide">LMS INSTRUCTOR</span>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Bio & Social Info */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-100 text-teal-700 rounded-full text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5" />
              ครูผู้สอนประจำวิชา
            </span>
            <h4 className="text-3xl md:text-[34px] font-black text-zinc-900 tracking-tight leading-none mt-1">
              อ.ธิติวุฒิ จันทร์โสม <span className="text-teal-600">(ครูแม็ค)</span>
            </h4>
            <p className="text-sm font-semibold text-slate-500 leading-normal tracking-wide">
              อาจารย์ผู้เชี่ยวชาญด้านเทคโนโลยีสารสนเทศ การสื่อสาร และสื่อดิจิทัลเพื่อการเรียนรู้
            </p>
          </div>

          <div className="border-t border-gray-200/50 pt-4 space-y-4">
            <p className="text-[15px] md:text-base text-zinc-600 leading-relaxed font-normal">
              มุ่งเน้นการสร้างสรรค์รูปแบบการเรียนรู้ยุคใหม่ที่ผสมผสานวิทยาการคอมพิวเตอร์เข้ากับความตื่นตาตื่นใจ (Interactive Visual Lab) เพื่อให้นักเรียนเข้าใจกระบวนการทำงานที่ซับซ้อนได้อย่างเป็นรูปธรรม ทันสมัย และสามารถนำไปประยุกต์ใช้งานจริงได้ในภาคธุรกิจอุตสาหกรรม
            </p>

            {/* Quick stats mini list */}
            <div className="grid grid-cols-2 gap-3 text-xs md:text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-teal-600" />
                <span>หลักสูตร Interactive IT & Python</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-500" />
                <span>จำลองสภาวะแวดล้อมเสมือนจริง 100%</span>
              </div>
            </div>
          </div>

          {/* Social Contact Grid */}
          <div className="space-y-2.5">
            <span className="block text-[11px] font-bold text-slate-400 tracking-widest uppercase">
              ช่องทางการติดต่อด่วน (Direct Connect)
            </span>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {contacts.map((c) => {
                const Icon = c.icon;
                return (
                  <a
                    key={c.id}
                    href={c.href}
                    target={c.id !== 'phone' ? '_blank' : undefined}
                    rel={c.id !== 'phone' ? 'noopener noreferrer' : undefined}
                    className={`flex items-center gap-3 p-3 rounded-xl border border-gray-200/60 font-semibold transition-all duration-300 cursor-pointer ${c.color} ${c.glow} group/card`}
                  >
                    <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100 group-hover/card:scale-105 group-hover/card:rotate-6 transition-transform text-current shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-tight group-hover:text-white/60 transition-colors">
                        {c.label}
                      </span>
                      <span className="text-xs font-mono font-bold block truncate group-hover:text-white transition-colors">
                        {c.value}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
