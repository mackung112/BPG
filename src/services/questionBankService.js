import { supabase } from '../lib/supabase';

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
  const { error } = await supabase
    .from('question_banks')
    .update({ title })
    .eq('id', id);
  if (error) throw error;
};

export const deleteBank = async (id) => {
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
    .select('id, bank_id, question_text');
  if (error) throw error;
  return data;
};

export const createQuestion = async (questionData) => {
  const { error } = await supabase
    .from('questions')
    .insert([questionData]);
  if (error) throw error;
};

export const updateQuestion = async (id, questionData) => {
  const { error } = await supabase
    .from('questions')
    .update(questionData)
    .eq('id', id);
  if (error) throw error;
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
