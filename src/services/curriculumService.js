import { supabase } from '../lib/supabase';

export const getCurriculumSubjects = async () => {
  const { data, error } = await supabase
    .from('curriculum_subjects')
    .select(`
      id, subject_code, subject_name, subject_name_en, curriculum, 
      theory_hours, practical_hours, credits, objectives, competencies, description,
      reference_standard, learning_outcomes, syllabus_markdown
    `)
    .order('subject_code', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const updateCurriculumSubjectByCode = async (subjectCode, updates) => {
  const { data, error } = await supabase
    .from('curriculum_subjects')
    .update(updates)
    .eq('subject_code', subjectCode)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};
