import {
  Home,
  LayoutDashboard,
  BookOpen,
  Users,
  Sparkles,
  Layers,
  Wand2,
  FileCode,
  CheckSquare,
  HelpCircle,
  Play,
  Trophy,
  ShieldCheck,
  BookMarked,
  Palette
} from 'lucide-react';

export const NAVIGATION_CATEGORIES = [
  {
    id: 'fundamentals',
    label: 'พื้นฐาน',
    labelEn: 'Fundamentals',
    items: [
      { to: '/', icon: Home, label: 'หน้าแรก', exact: true, external: true },
      { to: '/admin', icon: LayoutDashboard, label: 'แดชบอร์ด', exact: true },
      { to: '/admin/teacher-subjects', icon: BookOpen, label: 'จัดการวิชา' },
      { to: '/admin/students', icon: Users, label: 'จัดการนักเรียน' }
    ]
  },
  {
    id: 'planning',
    label: 'วางแผนและออกแบบ',
    labelEn: 'Planning & Design',
    items: [
      { to: '/admin/curriculum-draft', icon: Sparkles, label: 'ร่างหลักสูตร', badge: 'AI' },
      { to: '/admin/curriculum-structure', icon: Layers, label: 'โครงสร้างเนื้อหา' }
    ]
  },
  {
    id: 'content',
    label: 'สร้างเนื้อหา',
    labelEn: 'Content Creation',
    items: [
      { to: '/admin/ai-creator', icon: Wand2, label: 'AI Content Creator', badge: 'New' },
      { to: '/admin/documents', icon: FileCode, label: 'ไฟล์เอกสาร' }
    ]
  },
  {
    id: 'teaching',
    label: 'การสอนและการประเมิน',
    labelEn: 'Teaching & Assessment',
    items: [
      { to: '/admin/worksheets', icon: CheckSquare, label: 'ใบงาน' },
      { to: '/admin/questions', icon: HelpCircle, label: 'แบบทดสอบ' },
      { to: '/admin/exam-control', icon: Play, label: 'ระบบสอบ' },
      { to: '/admin/exam-results', icon: Trophy, label: 'ผลคะแนนสอบ' }
    ]
  },
  {
    id: 'settings',
    label: 'ตั้งค่าและคู่มือ',
    labelEn: 'Settings & Documentation',
    items: [
      { to: '/admin/users', icon: ShieldCheck, label: 'จัดการผู้ใช้งาน / แอดมิน', requireSuperAdmin: true },
      { to: '/admin/docs', icon: BookMarked, label: 'คู่มือและมาตรฐาน' },
      { to: '/library', icon: Palette, label: 'Storybook UI' }
    ]
  }
];
