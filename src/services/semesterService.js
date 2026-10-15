import { supabase } from '../lib/supabase';

const STORAGE_KEY_SEMESTERS = 'lms_teaching_semesters';
const STORAGE_KEY_SUBJECT_MAP = 'lms_subject_semester_map';

export const STASH_SEMESTER_ID = '__STASH__';

const DEFAULT_SEMESTERS = [
  {
    id: 'term-2-2569',
    name: 'ภาคเรียนที่ 2/2569',
    academic_year: '2569',
    term_number: '2',
    is_current: true,
    created_at: new Date('2026-10-01').toISOString()
  },
  {
    id: 'term-1-2567',
    name: 'ภาคเรียนที่ 1/2567',
    academic_year: '2567',
    term_number: '1',
    is_current: false,
    created_at: new Date('2026-05-15').toISOString()
  },
  {
    id: 'term-2-2567',
    name: 'ภาคเรียนที่ 2/2567',
    academic_year: '2567',
    term_number: '2',
    is_current: false,
    created_at: new Date('2026-10-01').toISOString()
  }
];

/**
 * ดึงรายการภาคเรียนทั้งหมด
 */
export const getSemesters = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SEMESTERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_SEMESTERS, JSON.stringify(DEFAULT_SEMESTERS));
      return DEFAULT_SEMESTERS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY_SEMESTERS, JSON.stringify(DEFAULT_SEMESTERS));
      return DEFAULT_SEMESTERS;
    }
    // ตรวจสอบว่ามี ภาคเรียนที่ 2/2569 หรือไม่ ถ้ายังไม่มีให้เพิ่มเข้าไปเป็นภาคเรียนปัจจุบัน
    if (!parsed.some(s => s.name?.includes('2/2569') || (s.academic_year === '2569' && s.term_number === '2'))) {
      const term2569 = DEFAULT_SEMESTERS[0];
      const updated = [term2569, ...parsed.map(s => ({ ...s, is_current: false }))];
      localStorage.setItem(STORAGE_KEY_SEMESTERS, JSON.stringify(updated));
      return updated;
    }
    return parsed;
  } catch (err) {
    console.error('Error getting semesters from storage:', err);
    return DEFAULT_SEMESTERS;
  }
};

/**
 * บันทึกรายการภาคเรียนทั้งหมด
 */
export const saveSemesters = (semesters) => {
  try {
    localStorage.setItem(STORAGE_KEY_SEMESTERS, JSON.stringify(semesters));
  } catch (err) {
    console.error('Error saving semesters to storage:', err);
  }
};

/**
 * สร้างภาคเรียนใหม่
 */
export const createSemester = async ({ name, academicYear, termNumber, isCurrent = false }) => {
  const currentList = getSemesters();
  const id = `term-${Date.now()}`;
  const trimmedName = (name || '').trim() || `ภาคเรียนที่ ${termNumber || '1'}/${academicYear || '2567'}`;

  let updatedList = currentList;
  if (isCurrent) {
    updatedList = updatedList.map(s => ({ ...s, is_current: false }));
  }

  const newSemester = {
    id,
    name: trimmedName,
    academic_year: (academicYear || '').trim() || '2567',
    term_number: (termNumber || '').trim() || '1',
    is_current: isCurrent || updatedList.length === 0,
    created_at: new Date().toISOString()
  };

  updatedList = [newSemester, ...updatedList];
  saveSemesters(updatedList);
  return newSemester;
};

/**
 * อัปเดตข้อมูลภาคเรียน
 */
export const updateSemester = async (id, { name, academicYear, termNumber, isCurrent }) => {
  let list = getSemesters();
  const index = list.findIndex(s => s.id === id);
  if (index === -1) throw new Error('ไม่พบภาคเรียนที่ต้องการแก้ไข');

  if (isCurrent) {
    list = list.map(s => ({ ...s, is_current: false }));
  }

  const existing = list[index];
  list[index] = {
    ...existing,
    name: (name || '').trim() || existing.name,
    academic_year: (academicYear !== undefined ? academicYear : existing.academic_year) || '',
    term_number: (termNumber !== undefined ? termNumber : existing.term_number) || '',
    is_current: isCurrent !== undefined ? isCurrent : existing.is_current
  };

  saveSemesters(list);
  return list[index];
};

/**
 * ลบภาคเรียน (วิชาที่อยู่ในภาคเรียนนี้จะถูกย้ายไปที่คลังพักไว้ก่อนโดยอัตโนมัติ)
 */
export const deleteSemester = async (id) => {
  let list = getSemesters();
  list = list.filter(s => s.id !== id);

  // ถ้าภาคเรียนที่ลบเป็นภาคเรียนปัจจุบัน ให้ตั้งตัวแรกที่เหลือเป็นปัจจุบัน
  if (list.length > 0 && !list.some(s => s.is_current)) {
    list[0].is_current = true;
  }
  saveSemesters(list);

  // ปลดวิชาที่ผูกกับ id นี้ไปที่คลังพักไว้ก่อน (__STASH__)
  const map = getSubjectSemesterMap();
  let mapModified = false;
  Object.keys(map).forEach(code => {
    if (map[code] === id) {
      map[code] = STASH_SEMESTER_ID;
      mapModified = true;
    }
  });

  if (mapModified) {
    saveSubjectSemesterMap(map);
  }

  return list;
};

/**
 * ตั้งภาคเรียนเป็นภาคเรียนปัจจุบัน (Active Term)
 */
export const setCurrentSemester = async (id) => {
  let list = getSemesters();
  list = list.map(s => ({
    ...s,
    is_current: s.id === id
  }));
  saveSemesters(list);
  return list;
};

/**
 * ดึงแผนผังการจับคู่วิชากับภาคเรียน: { [subjectCode]: semesterId | '__STASH__' }
 */
export const getSubjectSemesterMap = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SUBJECT_MAP);
    if (!raw) return {};
    return JSON.parse(raw) || {};
  } catch (err) {
    console.error('Error getting subject semester map:', err);
    return {};
  }
};

/**
 * บันทึกแผนผังการจับคู่วิชากับภาคเรียน
 */
export const saveSubjectSemesterMap = (map) => {
  try {
    localStorage.setItem(STORAGE_KEY_SUBJECT_MAP, JSON.stringify(map));
  } catch (err) {
    console.error('Error saving subject semester map:', err);
  }
};

/**
 * กำหนดวิชาเข้าสู่ภาคเรียน
 * @param {string} subjectCode รหัสวิชา เช่น '21910-2004'
 * @param {string} semesterId รหัสภาคเรียน หรือ '__STASH__'
 * @param {string} semesterName ชื่อภาคเรียน (สำหรับ sync ลง teacher_subjects)
 * @param {string} [teacherId] ID ของครูผู้ใช้ (ถ้ามี)
 */
export const assignSubjectToSemester = async (subjectCode, semesterId, semesterName = '', teacherId = null) => {
  if (!subjectCode) return;
  const map = getSubjectSemesterMap();
  map[subjectCode] = semesterId || STASH_SEMESTER_ID;
  saveSubjectSemesterMap(map);

  // พยายามซิงค์ลง Supabase teacher_subjects ถ้ามีแถวอยู่
  try {
    const academicYearVal = (semesterId && semesterId !== STASH_SEMESTER_ID) ? semesterName : null;
    let query = supabase
      .from('teacher_subjects')
      .update({ academic_year: academicYearVal })
      .eq('subject_code', subjectCode);

    if (teacherId) {
      query = query.eq('teacher_id', teacherId);
    }

    await query;
  } catch (syncErr) {
    console.warn('Could not sync semester assignment to Supabase (offline or unauthenticated):', syncErr.message);
  }

  return map;
};

/**
 * ย้ายวิชาไปเก็บไว้ก่อน (พักไว้ก่อน / ไม่ได้สอนในเทอมนี้)
 */
export const stashSubject = async (subjectCode, teacherId = null) => {
  return assignSubjectToSemester(subjectCode, STASH_SEMESTER_ID, '', teacherId);
};
