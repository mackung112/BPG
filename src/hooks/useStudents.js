import { useState, useEffect, useCallback } from 'react';
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  importStudentsFromCSV,
  exportStudentsToCSV,
  downloadCSVTemplate,
} from '../services/studentService';

export function useStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ─── LOAD ─────────────────────────────────────────────────────
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  // ─── CREATE ───────────────────────────────────────────────────
  const addStudent = async (formData) => {
    const data = await createStudent(formData);
    setStudents(prev => [...prev, data].sort((a, b) =>
      a.classroom.localeCompare(b.classroom) || a.student_id.localeCompare(b.student_id)
    ));
    return data;
  };

  // ─── UPDATE ───────────────────────────────────────────────────
  const editStudent = async (student_id, updates) => {
    const data = await updateStudent(student_id, updates);
    setStudents(prev => prev.map(s => s.student_id === student_id ? data : s));
    return data;
  };

  // ─── DELETE ───────────────────────────────────────────────────
  const removeStudent = async (student_id) => {
    await deleteStudent(student_id);
    setStudents(prev => prev.filter(s => s.student_id !== student_id));
  };

  // ─── BULK IMPORT ──────────────────────────────────────────────
  const importCSV = async (csvText) => {
    const count = await importStudentsFromCSV(csvText);
    await load(); // reload ทั้งหมดหลัง upsert
    return count;
  };

  // ─── COMPUTED ─────────────────────────────────────────────────
  const classrooms = ['all', ...Array.from(new Set(students.map(s => s.classroom).filter(Boolean))).sort()];

  const filterStudents = (search, classroomFilter) => {
    const q = search.toLowerCase();
    return students.filter(s => {
      const matchSearch =
        (s.student_id || '').includes(q) ||
        (s.first_name || '').toLowerCase().includes(q) ||
        (s.last_name || '').toLowerCase().includes(q) ||
        (s.nickname || '').toLowerCase().includes(q) ||
        (s.classroom || '').toLowerCase().includes(q);
      const matchClass = classroomFilter === 'all' || s.classroom === classroomFilter;
      return matchSearch && matchClass;
    });
  };

  return {
    students,
    loading,
    error,
    reload: load,
    classrooms,
    filterStudents,
    addStudent,
    editStudent,
    removeStudent,
    importCSV,
    exportCSV: () => exportStudentsToCSV(students),
    downloadTemplate: downloadCSVTemplate,
  };
}
