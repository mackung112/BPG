import React, { createContext, useContext, useState, useEffect } from 'react';
import { getTeacherSubjects } from '../services/teacherSubjectService';

const TeacherSubjectsContext = createContext(null);

export const TeacherSubjectsProvider = ({ children }) => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const data = await getTeacherSubjects();
      setSubjects(data || []);
    } catch (err) {
      console.error('Error fetching teacher subjects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <TeacherSubjectsContext.Provider value={{ subjects, loading, refreshSubjects: fetchSubjects }}>
      {children}
    </TeacherSubjectsContext.Provider>
  );
};

export const useTeacherSubjects = () => useContext(TeacherSubjectsContext);
