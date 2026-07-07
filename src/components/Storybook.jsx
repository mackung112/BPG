import { useState, useMemo } from 'react';
import { Search, Package, ChevronRight, Layout, Code, ExternalLink, RotateCcw, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LessonViewer from './LessonViewer';
import StandardHeader from './StandardHeader';

const interactiveModules = import.meta.glob('./interactive/**/*.jsx', { eager: true });

function StandardHeaderPreview() {
  return (
    <div className="space-y-8 bg-slate-50 p-6 rounded-2xl border border-slate-100 font-sans">
      <div>
        <div className="text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-wider">โหมดการ์ด (isCard = true)</div>
        <div className="border border-slate-200 rounded-3xl overflow-hidden bg-white shadow-sm">
          <StandardHeader 
            chapterTitle="บทที่ 1: ตัวแปรและการเขียนโปรแกรม"
            mainTitle="ความหมายของตัวแปร"
            subTitle="(Variable Definition)"
            description="เรียนรู้หลักการทำงานของตัวแปร วิธีการจองพื้นที่ในหน่วยความจำ และไวยากรณ์ในการประกาศตัวแปรเบื้องต้น"
            isCard={true}
            transparent={false}
          />
        </div>
      </div>
      
      <div>
        <div className="text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-wider">โหมดโปร่งใสสำหรับ Immersive Page (isCard = false, transparent = true)</div>
        <div className="border border-slate-200 rounded-3xl overflow-hidden bg-[#f1f5f9] p-2 shadow-sm">
          <StandardHeader 
            chapterTitle="บทที่ 2: Object-Oriented Programming"
            mainTitle="คลาสและอ็อบเจกต์"
            subTitle="(Class and Object)"
            description="ทำความเข้าใจความสัมพันธ์ระหว่างคลาส (พิมพ์เขียว) และอ็อบเจกต์ (ชิ้นงานจริง) ในการโปรแกรมเชิงวัตถุ"
            isCard={false}
            transparent={true}
          />
        </div>
      </div>
    </div>
  );
}

function LessonViewerPreview() {
  const mockLesson = {
    title: "1.1 ทำความรู้จักกับตัวแปร",
    content: `
      <h2>ตัวแปรคืออะไร (What is a Variable?)</h2>
      <p>ตัวแปรเปรียบเสมือน <strong>กล่องเก็บของ</strong> ที่เราสามารถนำข้อมูลไปใส่ไว้ แล้วแปะป้ายชื่อกล่องเพื่อนำมาใช้งานภายหลังได้อย่างสะดวกสบาย</p>
      [pyUnit3_8_MemoryVisualizer]
      <p>ในบทเรียนถัดไป เราจะเรียนรู้เกี่ยวกับชนิดข้อมูลพื้นฐานของตัวแปร...</p>
    `
  };
  const mockChapter = {
    title: "บทที่ 1: พื้นฐานภาษา Python"
  };
  return (
    <div className="border border-slate-200 rounded-3xl overflow-hidden bg-[#f1f5f9] max-h-[600px] overflow-y-auto shadow-inner">
      <LessonViewer 
        lesson={mockLesson}
        chapter={mockChapter}
        hasPrev={true}
        hasNext={true}
        onComplete={() => alert('กดทำเครื่องหมายเรียนรู้เสร็จสิ้น!')}
        onNext={() => alert('กดบทถัดไป')}
        onPrev={() => alert('กดบทก่อนหน้า')}
      />
    </div>
  );
}

const COMPONENT_LIST = [
  {
    name: 'LessonViewer',
    marker: '<LessonViewer />',
    Component: LessonViewerPreview,
    path: './LessonViewer.jsx'
  },
  {
    name: 'StandardHeader',
    marker: '<StandardHeader />',
    Component: StandardHeaderPreview,
    path: './StandardHeader.jsx'
  },
  ...Object.keys(interactiveModules).map(path => {
    const name = path.split('/').pop().replace('.jsx', '');
    return {
      name,
      marker: `[${name}]`,
      Component: interactiveModules[path].default,
      path
    };
  })
].sort((a, b) => a.name.localeCompare(b.name));

export default function Storybook() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedComponent, setSelectedComponent] = useState(COMPONENT_LIST[0]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const filteredComponents = useMemo(() => {
    return COMPONENT_LIST.filter(c => 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.marker.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const stats = useMemo(() => {
    const py = COMPONENT_LIST.filter(c => c.name.startsWith('PY')).length;
    const oop = COMPONENT_LIST.filter(c => c.name.startsWith('OOP')).length;
    const sql = COMPONENT_LIST.filter(c => c.name.startsWith('SQL')).length;
    const other = COMPONENT_LIST.length - (py + oop + sql);
    return { py, oop, sql, other };
  }, []);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-80' : 'w-0'} bg-white border-r border-slate-200 flex flex-col transition-all duration-300 overflow-hidden`}>
        <div className="p-4 border-b border-slate-100 bg-white sticky top-0 z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-100">
                <Package className="w-5 h-5 text-white" />
              </div>
              <h1 className="font-bold text-slate-800 tracking-tight">Component Storybook</h1>
            </div>
            <button onClick={() => navigate('/')} className="text-xs text-slate-400 hover:text-indigo-600 transition-colors">
              Exit
            </button>
          </div>
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search components..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
            />
          </div>

          <div className="flex gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md">PY: {stats.py}</span>
            <span className="px-2 py-1 bg-purple-50 text-purple-600 rounded-md">OOP: {stats.oop}</span>
            <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-md">SQL: {stats.sql}</span>
            <span className="px-2 py-1 bg-slate-50 text-slate-600 rounded-md">Other: {stats.other}</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredComponents.map((comp) => (
            <button
              key={comp.name}
              onClick={() => setSelectedComponent(comp)}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all flex items-center justify-between group ${
                selectedComponent?.name === comp.name 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100 font-medium' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="truncate">
                {comp.name}
              </div>
              <ChevronRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${
                selectedComponent?.name === comp.name ? 'text-indigo-200' : 'text-slate-300'
              }`} />
            </button>
          ))}
          {filteredComponents.length === 0 && (
            <div className="p-8 text-center text-slate-400 text-sm">
              No components found
            </div>
          )}
        </div>
      </aside>

      {/* Main Preview Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
            >
              <Layout className="w-5 h-5" />
            </button>
            <div className="min-w-0">
              <h2 className="font-bold text-slate-900 truncate">{selectedComponent?.name || 'Select a component'}</h2>
              <div className="flex items-center gap-2">
                <code className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-indigo-600 font-mono">
                  {selectedComponent?.marker}
                </code>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setSelectedComponent({...selectedComponent})} 
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-medium transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset State
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {selectedComponent ? (
            <div key={selectedComponent.name} className="animate-in fade-in duration-300">
              <selectedComponent.Component />
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4 pt-20">
              <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center">
                <Package className="w-10 h-10" />
              </div>
              <div className="text-xl font-medium">Select a component to preview</div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
