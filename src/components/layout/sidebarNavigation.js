import { 
  Home, 
  LayoutDashboard, 
  BookOpen, 
  BookMarked,
  ShieldCheck,
  Palette,
  FileText,
  Users,
  GraduationCap,
  ClipboardList,
  PenTool
} from 'lucide-react';

export const NAVIGATION_CATEGORIES = [
  {
    id: 'fundamentals',
    label: 'พื้นฐาน',
    labelEn: 'Fundamentals',
    items: [
      { to: '/', icon: Home, label: 'หน้าแรก', exact: true, external: true },
      { to: '/admin', icon: LayoutDashboard, label: 'แดชบอร์ด', exact: true },
      { to: '/admin/teacher-subjects', icon: BookOpen, label: 'จัดการวิชา' }
    ]
  },
  {
    id: 'course_materials',
    label: 'สื่อรายวิชา',
    labelEn: 'Course Materials',
    items: [
      // Items here will be injected dynamically by Sidebar.jsx
    ]
  },
  {
    id: 'teaching_and_assessment',
    label: 'การสอนและการประเมิน',
    labelEn: 'Teaching & Assessment',
    items: [
      { to: '/admin/students', icon: Users, label: 'การจัดการนักเรียน' },
      { to: '/admin/questions', icon: ClipboardList, label: 'คลังข้อสอบ' },
      { to: '/admin/exam-control', icon: PenTool, label: 'ระบบจัดการห้องสอบ' },
      { to: '/admin/exam-results', icon: GraduationCap, label: 'ผลคะแนน' },
      { to: '/admin/worksheets', icon: FileText, label: 'ใบงาน' },
      { to: '/admin/documents', icon: FileText, label: 'เอกสารประกอบ' }
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
