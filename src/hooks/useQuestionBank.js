import { useState, useCallback, useMemo } from 'react';
import * as questionBankService from '../services/questionBankService';
import * as teacherSubjectService from '../services/teacherSubjectService';
import * as semesterService from '../services/semesterService';
import { parseQuestions } from '../utils/giftParser';
import defaultSubjectsData from '../data/subjects.json';

export function useQuestionBank() {
  const [banks, setBanks] = useState([]);
  const [teacherSubjects, setTeacherSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedSubjectCode, setSelectedSubjectCode] = useState(null);
  const [questions, setQuestions] = useState([]);

  // --- Semester & Stash State ---
  const [semesters, setSemesters] = useState(() => semesterService.getSemesters());
  const [subjectSemesterMap, setSubjectSemesterMap] = useState(() => semesterService.getSubjectSemesterMap());
  const [selectedSemesterFilter, setSelectedSemesterFilter] = useState('ALL');

  // 1. โหลดข้อมูล Banks ทั้งหมด
  const loadBanks = useCallback(async () => {
    try {
      const data = await questionBankService.getBanks();
      setBanks(data || []);
      return data;
    } catch (err) {
      console.error('Error loading banks:', err);
      setError(err.message);
      throw err;
    }
  }, []);

  // 2. โหลดข้อมูล Teacher Subjects
  const loadTeacherSubjects = useCallback(async () => {
    try {
      const data = await teacherSubjectService.getTeacherSubjects();
      setTeacherSubjects(data || []);
      return data;
    } catch (err) {
      console.warn('Teacher subjects not available or unauthenticated:', err.message);
      setTeacherSubjects([]);
      return [];
    }
  }, []);

  // 2.1 โหลดข้อมูลภาคเรียนและแผนผังวิชา
  const loadSemestersData = useCallback(() => {
    const semList = semesterService.getSemesters();
    const map = semesterService.getSubjectSemesterMap();
    setSemesters(semList);
    setSubjectSemesterMap(map);
    return { semList, map };
  }, []);

  // 3. โหลดข้อสอบของ Bank ที่เลือก
  const loadQuestions = useCallback(async (bankId) => {
    if (!bankId) {
      setQuestions([]);
      return [];
    }
    try {
      const data = await questionBankService.getQuestionsByBankId(bankId);
      setQuestions(data || []);
      return data;
    } catch (err) {
      console.error('Error loading questions:', err);
      setError(err.message);
      throw err;
    }
  }, []);

  // 4. โหลดข้อมูลเริ่มต้นทั้งหมด
  const refreshAll = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      loadSemestersData();
      await Promise.allSettled([loadBanks(), loadTeacherSubjects()]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [loadBanks, loadTeacherSubjects, loadSemestersData]);

  // 4.1 ภาคเรียนปัจจุบัน (Active Term)
  const currentSemester = useMemo(() => {
    return semesters.find(s => s.is_current) || semesters[0] || null;
  }, [semesters]);

  // 5. ผสานและจัดกลุ่ม Subjects พร้อม Banks และ Semester/Stash status
  const subjects = useMemo(() => {
    const map = new Map();

    // 5.1 นำ Teacher Subjects ใส่ลงใน Map
    teacherSubjects.forEach(ts => {
      const code = (ts.subject_code || '').trim();
      map.set(code, {
        id: ts.id,
        subject_code: code,
        subject_name: ts.subject_name || 'ไม่ระบุชื่อวิชา',
        isTeacherSubject: true,
        rawTeacherSubject: ts,
        banks: []
      });
    });

    // 5.2 นำ Banks มา parse แล้วจัดเข้ากลุ่ม subject
    banks.forEach(bank => {
      const { subjectCode, examTitle } = questionBankService.parseBankTitle(bank.title);
      const enrichedBank = {
        ...bank,
        parsedSubjectCode: subjectCode,
        parsedExamTitle: examTitle
      };

      const key = subjectCode || '__GENERAL__';

      if (!map.has(key)) {
        if (key === '__GENERAL__') {
          map.set('__GENERAL__', {
            id: '__GENERAL__',
            subject_code: '',
            subject_name: 'คลังทั่วไป / ยังไม่ระบุวิชา',
            isTeacherSubject: false,
            banks: []
          });
        } else {
          // ลองค้นหาชื่อวิชาจาก subjects.json
          const matchedInJson = defaultSubjectsData.find(s => s.subject_code === subjectCode);
          map.set(key, {
            id: `temp-${subjectCode}`,
            subject_code: subjectCode,
            subject_name: matchedInJson ? matchedInJson.subject_name : `วิชารหัส ${subjectCode}`,
            isTeacherSubject: false,
            banks: []
          });
        }
      }

      map.get(key).banks.push(enrichedBank);
    });

    // 5.3 เติมข้อมูล Semester / Stashed ให้แต่ละ Subject
    const list = Array.from(map.values()).map(subj => {
      if (subj.id === '__GENERAL__') {
        return {
          ...subj,
          semesterId: null,
          semesterName: 'คลังทั่วไป',
          isStashed: false
        };
      }

      const code = subj.subject_code;
      const mappedSemId = subjectSemesterMap[code];

      if (mappedSemId === semesterService.STASH_SEMESTER_ID) {
        return {
          ...subj,
          semesterId: null,
          semesterName: 'พักไว้ก่อน (ไม่ได้สอนเทอมนี้)',
          isStashed: true
        };
      }

      if (mappedSemId) {
        const matched = semesters.find(s => s.id === mappedSemId);
        return {
          ...subj,
          semesterId: mappedSemId,
          semesterName: matched?.name || 'ภาคเรียนที่ระบุ',
          isStashed: false
        };
      }

      // หากยังไม่ได้ map ใน storage: ลองดู academic_year ของครู หรือกำหนด default
      const teacherAcademicYear = subj.rawTeacherSubject?.academic_year;
      if (teacherAcademicYear) {
        const matchedByYear = semesters.find(s => 
          s.name === teacherAcademicYear || 
          s.academic_year === teacherAcademicYear ||
          s.name.includes(teacherAcademicYear)
        );
        if (matchedByYear) {
          return {
            ...subj,
            semesterId: matchedByYear.id,
            semesterName: matchedByYear.name,
            isStashed: false
          };
        }
      }

      // ค่าเริ่มต้น: หากมี currentSemester ให้จัดเข้า currentSemester เพื่อให้ใช้งานได้ทันที
      return {
        ...subj,
        semesterId: currentSemester?.id || null,
        semesterName: currentSemester?.name || 'ภาคเรียนปัจจุบัน',
        isStashed: false
      };
    });

    // เรียงลำดับ: มีรหัสวิชาขึ้นก่อน, '__GENERAL__' ไว้ท้ายสุด
    list.sort((a, b) => {
      if (a.id === '__GENERAL__') return 1;
      if (b.id === '__GENERAL__') return -1;
      return a.subject_code.localeCompare(b.subject_code);
    });

    return list;
  }, [teacherSubjects, banks, subjectSemesterMap, semesters, currentSemester]);

  // 6. CRUD สำหรับรายวิชา (Subjects)
  const createSubject = async (subjectData, targetSemesterId = null) => {
    try {
      const created = await teacherSubjectService.addTeacherSubject({
        subject_code: subjectData.subject_code.trim(),
        subject_name: subjectData.subject_name.trim(),
        subject_name_en: subjectData.subject_name_en || '',
        theory_hours: Number(subjectData.theory_hours || 0),
        practical_hours: Number(subjectData.practical_hours || 0),
        credits: String(subjectData.credits || '0'),
        curriculum: subjectData.curriculum || 'ทั่วไป'
      });

      // หากมี targetSemesterId ให้กำหนดภาคเรียนทันที
      const finalSemesterId = targetSemesterId || currentSemester?.id;
      if (finalSemesterId) {
        const sem = semesters.find(s => s.id === finalSemesterId);
        await semesterService.assignSubjectToSemester(
          subjectData.subject_code.trim(), 
          finalSemesterId, 
          sem?.name || ''
        );
        loadSemestersData();
      }

      await loadTeacherSubjects();
      setSelectedSubjectCode(subjectData.subject_code.trim());
      return created;
    } catch (err) {
      console.error('Error creating subject:', err);
      throw err;
    }
  };

  const updateSubject = async (subjectId, updates, oldSubjectCode) => {
    try {
      const trimmedNewCode = updates.subject_code.trim();
      let updated;
      
      if (subjectId && !subjectId.startsWith('temp-')) {
        updated = await teacherSubjectService.updateTeacherSubject(subjectId, {
          subject_code: trimmedNewCode,
          subject_name: updates.subject_name.trim(),
          subject_name_en: updates.subject_name_en || '',
          theory_hours: Number(updates.theory_hours || 0),
          practical_hours: Number(updates.practical_hours || 0),
          credits: String(updates.credits || '0'),
          curriculum: updates.curriculum || 'ทั่วไป'
        });
      }

      // หากมีการเปลี่ยนรหัสวิชา: ให้เปลี่ยน key ใน subjectSemesterMap และ title ใน question_banks
      if (oldSubjectCode && oldSubjectCode !== trimmedNewCode) {
        const oldMap = semesterService.getSubjectSemesterMap();
        if (oldMap[oldSubjectCode]) {
          oldMap[trimmedNewCode] = oldMap[oldSubjectCode];
          delete oldMap[oldSubjectCode];
          semesterService.saveSubjectSemesterMap(oldMap);
          loadSemestersData();
        }

        const relatedBanks = banks.filter(b => {
          const { subjectCode } = questionBankService.parseBankTitle(b.title);
          return subjectCode === oldSubjectCode;
        });

        for (const b of relatedBanks) {
          const { examTitle } = questionBankService.parseBankTitle(b.title);
          const newTitle = questionBankService.formatBankTitle(trimmedNewCode, examTitle);
          await questionBankService.updateBank(b.id, newTitle);
        }
        await loadBanks();
      }

      await loadTeacherSubjects();
      setSelectedSubjectCode(trimmedNewCode);
      return updated;
    } catch (err) {
      console.error('Error updating subject:', err);
      throw err;
    }
  };

  const deleteSubject = async (subjectId, subjectCode) => {
    try {
      if (subjectId && !subjectId.startsWith('temp-')) {
        await teacherSubjectService.deleteTeacherSubject(subjectId);
      }

      // ย้าย banks ในวิชานี้ไปที่ทั่วไป (ตัด prefix รหัสวิชาออก)
      if (subjectCode) {
        const relatedBanks = banks.filter(b => {
          const { subjectCode: code } = questionBankService.parseBankTitle(b.title);
          return code === subjectCode;
        });

        for (const b of relatedBanks) {
          const { examTitle } = questionBankService.parseBankTitle(b.title);
          await questionBankService.updateBank(b.id, examTitle);
        }

        // ลบออกจาก map
        const map = semesterService.getSubjectSemesterMap();
        delete map[subjectCode];
        semesterService.saveSubjectSemesterMap(map);
        loadSemestersData();
      }

      await Promise.all([loadBanks(), loadTeacherSubjects()]);
      if (selectedSubjectCode === subjectCode) {
        setSelectedSubjectCode(null);
      }
    } catch (err) {
      console.error('Error deleting subject:', err);
      throw err;
    }
  };

  // --- Semester Operations ---
  const handleCreateSemester = async (data) => {
    try {
      const created = await semesterService.createSemester(data);
      loadSemestersData();
      return created;
    } catch (err) {
      console.error('Error creating semester:', err);
      throw err;
    }
  };

  const handleUpdateSemester = async (id, data) => {
    try {
      const updated = await semesterService.updateSemester(id, data);
      loadSemestersData();
      return updated;
    } catch (err) {
      console.error('Error updating semester:', err);
      throw err;
    }
  };

  const handleDeleteSemester = async (id) => {
    try {
      const list = await semesterService.deleteSemester(id);
      loadSemestersData();
      return list;
    } catch (err) {
      console.error('Error deleting semester:', err);
      throw err;
    }
  };

  const handleSetCurrentSemester = async (id) => {
    try {
      const list = await semesterService.setCurrentSemester(id);
      loadSemestersData();
      return list;
    } catch (err) {
      console.error('Error setting current semester:', err);
      throw err;
    }
  };

  /**
   * กำหนดวิชาเข้าสู่ภาคเรียน
   */
  const assignSubjectToSemester = async (subjectCode, semesterId, teacherId = null) => {
    try {
      const sem = semesters.find(s => s.id === semesterId);
      await semesterService.assignSubjectToSemester(
        subjectCode, 
        semesterId, 
        sem?.name || '', 
        teacherId
      );
      loadSemestersData();
    } catch (err) {
      console.error('Error assigning subject to semester:', err);
      throw err;
    }
  };

  /**
   * ย้ายวิชาไปเก็บไว้ก่อน (พักไว้ก่อน / ไม่ได้สอนเทอมนี้)
   */
  const stashSubject = async (subjectCode, teacherId = null) => {
    try {
      await semesterService.stashSubject(subjectCode, teacherId);
      loadSemestersData();
    } catch (err) {
      console.error('Error stashing subject:', err);
      throw err;
    }
  };

  // 7. CRUD สำหรับชุดข้อสอบ (Exam Sets / Banks)
  const createExamSet = async (subjectCode, examTitle, userId) => {
    try {
      const fullTitle = questionBankService.formatBankTitle(subjectCode, examTitle);
      const newBank = await questionBankService.createBank(fullTitle, userId);
      await loadBanks();
      setSelectedBank(newBank);
      return newBank;
    } catch (err) {
      console.error('Error creating exam set:', err);
      throw err;
    }
  };

  const updateExamSet = async (bankId, subjectCode, examTitle) => {
    try {
      const fullTitle = questionBankService.formatBankTitle(subjectCode, examTitle);
      const updated = await questionBankService.updateBank(bankId, fullTitle);
      await loadBanks();
      if (selectedBank?.id === bankId) {
        setSelectedBank(updated);
      }
      return updated;
    } catch (err) {
      console.error('Error updating exam set:', err);
      throw err;
    }
  };

  const deleteExamSet = async (bankId) => {
    try {
      await questionBankService.deleteBank(bankId);
      await loadBanks();
      if (selectedBank?.id === bankId) {
        setSelectedBank(null);
      }
    } catch (err) {
      console.error('Error deleting exam set:', err);
      throw err;
    }
  };

  // 8. CRUD สำหรับข้อสอบเดี่ยว (Questions)
  const createQuestion = async (bankId, questionData) => {
    try {
      const payload = {
        bank_id: bankId,
        question_text: questionData.question_text.trim(),
        choices: questionData.choices,
        correct_answer_index: Number(questionData.correct_answer_index)
      };
      const created = await questionBankService.createQuestion(payload);
      await loadQuestions(bankId);
      return created;
    } catch (err) {
      console.error('Error creating question:', err);
      throw err;
    }
  };

  const updateQuestion = async (bankId, questionId, questionData) => {
    try {
      const payload = {
        question_text: questionData.question_text.trim(),
        choices: questionData.choices,
        correct_answer_index: Number(questionData.correct_answer_index)
      };
      const updated = await questionBankService.updateQuestion(questionId, payload);
      await loadQuestions(bankId);
      return updated;
    } catch (err) {
      console.error('Error updating question:', err);
      throw err;
    }
  };

  const deleteQuestion = async (bankId, questionId) => {
    try {
      await questionBankService.deleteQuestion(questionId);
      await loadQuestions(bankId);
    } catch (err) {
      console.error('Error deleting question:', err);
      throw err;
    }
  };

  // 9. GIFT Import
  const importGiftQuestions = async (bankId, giftContent) => {
    try {
      const parsed = parseQuestions(giftContent);
      if (!parsed || parsed.length === 0) {
        throw new Error('ไม่พบข้อสอบที่ตรงตามรูปแบบ GIFT');
      }

      const rowsToInsert = parsed.map(q => ({
        bank_id: bankId,
        question_text: q.question_text,
        choices: q.choices,
        correct_answer_index: q.correct_answer_index,
        image_url: q.image_url || null
      }));

      await questionBankService.importQuestions(rowsToInsert);
      await loadQuestions(bankId);
      return rowsToInsert.length;
    } catch (err) {
      console.error('Error importing GIFT questions:', err);
      throw err;
    }
  };

  // 10. Drag & Drop Operations
  const moveExamSetToSubject = async (bankId, targetSubjectCode) => {
    try {
      const bank = banks.find(b => b.id === bankId);
      if (!bank) throw new Error('ไม่พบชุดข้อสอบ');

      const { examTitle } = questionBankService.parseBankTitle(bank.title);
      const newFullTitle = questionBankService.formatBankTitle(targetSubjectCode, examTitle);

      const updated = await questionBankService.updateBank(bankId, newFullTitle);
      await loadBanks();
      if (selectedBank?.id === bankId) {
        setSelectedBank(updated);
      }
      return updated;
    } catch (err) {
      console.error('Error moving exam set to subject:', err);
      throw err;
    }
  };

  const moveQuestionToBank = async (questionId, currentBankId, targetBankId) => {
    try {
      if (currentBankId === targetBankId) return;
      await questionBankService.moveQuestion(questionId, targetBankId);
      if (currentBankId) {
        await loadQuestions(currentBankId);
      }
    } catch (err) {
      console.error('Error moving question to bank:', err);
      throw err;
    }
  };

  const copyQuestionToBank = async (questionId, targetBankId) => {
    try {
      await questionBankService.copyQuestion(questionId, targetBankId);
    } catch (err) {
      console.error('Error copying question to bank:', err);
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
    subjects,
    teacherSubjects,
    loading,
    error,
    selectedBank,
    setSelectedBank,
    selectedSubjectCode,
    setSelectedSubjectCode,
    questions,
    // Semester features
    semesters,
    currentSemester,
    selectedSemesterFilter,
    setSelectedSemesterFilter,
    createSemester: handleCreateSemester,
    updateSemester: handleUpdateSemester,
    deleteSemester: handleDeleteSemester,
    setCurrentSemester: handleSetCurrentSemester,
    assignSubjectToSemester,
    stashSubject,
    reloadSemesters: loadSemestersData,
    // Base operations
    loadBanks,
    loadTeacherSubjects,
    loadQuestions,
    refreshAll,
    createSubject,
    updateSubject,
    deleteSubject,
    createExamSet,
    updateExamSet,
    deleteExamSet,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    importGiftQuestions,
    moveExamSetToSubject,
    moveQuestionToBank,
    copyQuestionToBank,
    fetchAllQuestions
  };
}
