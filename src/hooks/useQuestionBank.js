import { useState, useCallback } from 'react';
import * as questionBankService from '../services/questionBankService';
import { parseQuestions } from '../utils/giftParser';

export function useQuestionBank() {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);
  const [questions, setQuestions] = useState([]);

  const loadBanks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await questionBankService.getBanks();
      setBanks(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const loadQuestions = useCallback(async (bankId) => {
    try {
      const data = await questionBankService.getQuestionsByBankId(bankId);
      setQuestions(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const createBank = async (title, userId) => {
    try {
      const data = await questionBankService.createBank(title, userId);
      await loadBanks();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateBank = async (id, title) => {
    try {
      await questionBankService.updateBank(id, title);
      await loadBanks();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteBank = async (id) => {
    try {
      await questionBankService.deleteBank(id);
      await loadBanks();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const createQuestion = async (bankId, questionData) => {
    try {
      await questionBankService.createQuestion({ ...questionData, bank_id: bankId });
      await loadQuestions(bankId);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateQuestion = async (bankId, questionId, questionData) => {
    try {
      await questionBankService.updateQuestion(questionId, questionData);
      await loadQuestions(bankId);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteQuestion = async (bankId, questionId) => {
    try {
      await questionBankService.deleteQuestion(questionId);
      await loadQuestions(bankId);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const importGiftQuestions = async (bankId, txtContent) => {
    try {
      const parsedQuestions = parseQuestions(txtContent);
      if (parsedQuestions.length === 0) {
        throw new Error('ไม่พบข้อสอบในรูปแบบที่ถูกต้อง กรุณาตรวจทานรูปแบบ GIFT');
      }

      const toInsert = parsedQuestions.map(q => ({
        bank_id: bankId,
        question_text: q.question_text,
        choices: q.choices,
        correct_answer_index: q.correct_answer_index
      }));

      await questionBankService.importQuestions(toInsert);
      await loadQuestions(bankId);
      return toInsert.length;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const fetchAllQuestions = useCallback(async () => {
    try {
      setLoading(true);
      const data = await questionBankService.getAllQuestions();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    banks,
    loading,
    error,
    selectedBank,
    setSelectedBank,
    questions,
    loadBanks,
    loadQuestions,
    createBank,
    updateBank,
    deleteBank,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    importGiftQuestions,
    fetchAllQuestions
  };
}
