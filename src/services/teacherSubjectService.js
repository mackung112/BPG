import { supabase } from '../lib/supabase';

/**
 * ดึงรายวิชาทั้งหมดของครูคนปัจจุบัน
 */
export async function getTeacherSubjects() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('ผู้ใช้ยังไม่ได้เข้าสู่ระบบ');

  const { data, error } = await supabase
    .from('teacher_subjects')
    .select('*')
    .eq('teacher_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * เพิ่มรายวิชาใหม่ของครู
 */
export async function addTeacherSubject(subjectData) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('ผู้ใช้ยังไม่ได้เข้าสู่ระบบ');

  const { data, error } = await supabase
    .from('teacher_subjects')
    .insert([
      {
        ...subjectData,
        teacher_id: user.id
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * ลบรายวิชา
 */
export async function deleteTeacherSubject(subjectId) {
  const { error } = await supabase
    .from('teacher_subjects')
    .delete()
    .eq('id', subjectId);

  if (error) throw error;
  return true;
}

/**
 * อัปเดตรายวิชา (เช่น แก้ไขตารางสอน)
 */
export async function updateTeacherSubject(subjectId, updates) {
  const { data, error } = await supabase
    .from('teacher_subjects')
    .update(updates)
    .eq('id', subjectId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
