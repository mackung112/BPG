import { supabase } from '../lib/supabase';

// ─── READ ────────────────────────────────────────────────────────
export const getStudents = async () => {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .order('classroom', { ascending: true })
    .order('student_id', { ascending: true });
  if (error) throw error;
  return data;
};

// ─── CREATE ──────────────────────────────────────────────────────
export const createStudent = async ({ student_id, first_name, last_name, nickname, classroom }) => {
  const { data, error } = await supabase
    .from('students')
    .insert([{ student_id, first_name, last_name, nickname, classroom }])
    .select()
    .single();
  if (error) {
    if (error.message.includes('unique') || error.code === '23505') {
      throw new Error('รหัสนักเรียนนี้มีอยู่ในระบบแล้ว');
    }
    throw error;
  }
  return data;
};

// ─── UPDATE ──────────────────────────────────────────────────────
export const updateStudent = async (student_id, updates) => {
  const { data, error } = await supabase
    .from('students')
    .update(updates)
    .eq('student_id', student_id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

// ─── DELETE ──────────────────────────────────────────────────────
export const deleteStudent = async (student_id) => {
  const { error } = await supabase
    .from('students')
    .delete()
    .eq('student_id', student_id);
  if (error) throw error;
};

// ─── BULK IMPORT (CSV) ───────────────────────────────────────────
export const importStudentsFromCSV = async (csvText) => {
  const lines = csvText.split('\n');
  const students = [];

  for (const line of lines) {
    const parts = line.split(/[,\t]/).map(s => s.trim());
    const isHeader = parts[0] === 'รหัสนักเรียน' || parts[0] === 'student_id';
    if (parts.length >= 5 && parts[0] && !isHeader) {
      students.push({
        student_id: parts[0],
        first_name: parts[1],
        last_name: parts[2],
        nickname: parts[3],
        classroom: parts[4],
      });
    }
  }

  if (students.length === 0) {
    throw new Error('รูปแบบข้อมูลไม่ถูกต้อง กรุณาใช้รูปแบบ: รหัส,ชื่อ,สกุล,ชื่อเล่น,ห้อง');
  }

  const { error } = await supabase
    .from('students')
    .upsert(students, { onConflict: 'student_id' });
  if (error) throw error;

  return students.length;
};

// ─── EXPORT CSV ──────────────────────────────────────────────────
export const exportStudentsToCSV = (students) => {
  const header = 'รหัสนักเรียน,ชื่อ,นามสกุล,ชื่อเล่น,ห้องเรียน\n';
  const rows = students.map(s =>
    `${s.student_id},${s.first_name},${s.last_name},${s.nickname || ''},${s.classroom}`
  ).join('\n');
  const csvContent = header + rows;
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `students_export_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const downloadCSVTemplate = () => {
  const csvContent = 'รหัสนักเรียน,ชื่อ,นามสกุล,ชื่อเล่น,ห้องเรียน\n1001,สมชาย,ใจดี,ชาย,ม.6/1\n1002,สมหญิง,รักเรียน,หญิง,ม.6/1\n';
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'student_template.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
