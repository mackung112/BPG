import { supabase } from '../lib/supabase';

/**
 * แยก subjectCode และ examTitle ออกจากชื่อ title ของ bank
 * เช่น "21910-2004 ปลายภาค" => { subjectCode: "21910-2004", examTitle: "ปลายภาค" }
 */
export const parseBankTitle = (fullTitle) => {
  if (!fullTitle) return { subjectCode: '', examTitle: 'ชุดข้อสอบ' };
  const trimmed = fullTitle.trim();
  
  // รองรับรูปแบบ [CODE] Title
  const bracketMatch = trimmed.match(/^\[(.*?)\]\s*(.*)$/);
  if (bracketMatch) {
    return { 
      subjectCode: bracketMatch[1].trim(), 
      examTitle: bracketMatch[2].trim() || 'ชุดข้อสอบ' 
    };
  }
  
  // รองรับรูปแบบ CODE Title (คั่นด้วยช่องว่างแรก)
  const spaceIdx = trimmed.indexOf(' ');
  if (spaceIdx > 0) {
    const firstPart = trimmed.substring(0, spaceIdx).trim();
    const rest = trimmed.substring(spaceIdx + 1).trim();
    return { subjectCode: firstPart, examTitle: rest || 'ชุดข้อสอบ' };
  }
  
  return { subjectCode: '', examTitle: trimmed };
};

/**
 * รวม subjectCode และ examTitle เป็นชื่อเดียวสำหรับ question_banks.title
 */
export const formatBankTitle = (subjectCode, examTitle) => {
  const code = (subjectCode || '').trim();
  const title = (examTitle || '').trim() || 'ชุดข้อสอบ';
  if (!code) return title;
  return `${code} ${title}`;
};

export const getBanks = async () => {
  const { data, error } = await supabase
    .from('question_banks')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const createBank = async (title, userId) => {
  const { data, error } = await supabase
    .from('question_banks')
    .insert([{ title, created_by: userId }])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateBank = async (id, title) => {
  const { data, error } = await supabase
    .from('question_banks')
    .update({ title })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteBank = async (id) => {
  // ลบข้อสอบทั้งหมดใน bank ก่อน เพื่อความสะอาดและป้องกัน foreign key issue
  const { error: qError } = await supabase
    .from('questions')
    .delete()
    .eq('bank_id', id);
  if (qError) throw qError;

  const { error } = await supabase
    .from('question_banks')
    .delete()
    .eq('id', id);
  if (error) throw error;
};

export const getQuestionsByBankId = async (bankId) => {
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .eq('bank_id', bankId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data;
};

export const getAllQuestions = async () => {
  const { data, error } = await supabase
    .from('questions')
    .select('id, bank_id, question_text, choices, correct_answer_index, created_at');
  if (error) throw error;
  return data;
};

export const createQuestion = async (questionData) => {
  const { data, error } = await supabase
    .from('questions')
    .insert([questionData])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateQuestion = async (id, questionData) => {
  const { data, error } = await supabase
    .from('questions')
    .update(questionData)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteQuestion = async (id) => {
  const { error } = await supabase
    .from('questions')
    .delete()
    .eq('id', id);
  if (error) throw error;
};

export const importQuestions = async (questions) => {
  const { error } = await supabase
    .from('questions')
    .insert(questions);
  if (error) throw error;
};

/**
 * ย้ายข้อสอบไปยังคลัง/ชุดข้อสอบปลายทาง
 */
export const moveQuestion = async (questionId, targetBankId) => {
  const { data, error } = await supabase
    .from('questions')
    .update({ bank_id: targetBankId })
    .eq('id', questionId)
    .select()
    .single();
  if (error) throw error;
  return data;
};

/**
 * คัดลอกข้อสอบไปยังคลัง/ชุดข้อสอบปลายทาง
 */
export const copyQuestion = async (questionId, targetBankId) => {
  // ดึงข้อสอบเดิม
  const { data: original, error: getErr } = await supabase
    .from('questions')
    .select('*')
    .eq('id', questionId)
    .single();
  if (getErr) throw getErr;

  // สร้างแถวใหม่ใน targetBankId
  const { data, error } = await supabase
    .from('questions')
    .insert([{
      bank_id: targetBankId,
      question_text: original.question_text,
      choices: original.choices,
      correct_answer_index: original.correct_answer_index
    }])
    .select()
    .single();
  if (error) throw error;
  return data;
};
