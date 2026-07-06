import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import curriculumData from '../data/curriculum.json';
import './LessonViewer.css';

export default function LessonViewer() {
  const { categoryId, subjectId, lessonId } = useParams();
  const navigate = useNavigate();
  
  const [subject, setSubject] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  useEffect(() => {
    // Find the subject
    const category = curriculumData.categories.find(c => c.id === categoryId);
    if (!category) return navigate('/not-found');
    
    const sub = category.subjects.find(s => s.id === subjectId);
    if (!sub) return navigate('/not-found');
    
    setSubject(sub);

    // Find the lesson, if not specified, default to first lesson of first chapter
    let targetLesson = null;
    
    if (lessonId) {
      for (const chapter of sub.chapters) {
        const lesson = chapter.lessons.find(l => l.id === lessonId);
        if (lesson) {
          targetLesson = lesson;
          break;
        }
      }
    } else if (sub.chapters.length > 0 && sub.chapters[0].lessons.length > 0) {
      // Default to first lesson
      targetLesson = sub.chapters[0].lessons[0];
      // Update URL without reloading
      navigate(`/subject/${categoryId}/${subjectId}/lesson/${targetLesson.id}`, { replace: true });
    }

    setCurrentLesson(targetLesson);
    
    // Auto-close sidebar on small screens when a lesson is selected
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, [categoryId, subjectId, lessonId, navigate]);

  if (!subject) return <div className="loading">กำลังโหลด...</div>;

  return (
    <div className="viewer-layout fade-in">
      {/* Sidebar for navigation */}
      <aside className={`viewer-sidebar glass-panel ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <Link to="/" className="back-link">
            <span className="icon">←</span> กลับหน้าแรก
          </Link>
          <button className="btn-icon close-sidebar-btn" onClick={() => setIsSidebarOpen(false)}>
            ✕
          </button>
        </div>
        
        <div className="sidebar-content">
          <h2 className="subject-title text-gradient">{subject.name}</h2>
          
          <div className="chapters-list">
            {subject.chapters.map((chapter) => (
              <div key={chapter.id} className="chapter-group">
                <h3 className="chapter-title">{chapter.name}</h3>
                <ul className="lessons-list">
                  {chapter.lessons.map((lesson) => (
                    <li key={lesson.id}>
                      <Link 
                        to={`/subject/${categoryId}/${subjectId}/lesson/${lesson.id}`}
                        className={`lesson-item ${currentLesson?.id === lesson.id ? 'active' : ''}`}
                      >
                        <span className="lesson-icon">
                          {lesson.type === 'simulator' ? '🎮' : '📄'}
                        </span>
                        {lesson.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            
            {subject.chapters.length === 0 && (
              <p className="no-content">ยังไม่มีบทเรียนในวิชานี้</p>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`viewer-main ${isSidebarOpen ? 'with-sidebar' : 'full'}`}>
        {!isSidebarOpen && (
          <button className="toggle-sidebar-btn glass-panel" onClick={() => setIsSidebarOpen(true)}>
            ☰ เมนูบทเรียน
          </button>
        )}

        {currentLesson ? (
          <div className="simulator-container">
            <iframe 
              src={currentLesson.contentUrl} 
              title={currentLesson.name}
              className="simulator-iframe"
              allowFullScreen
            ></iframe>
            
            {/* Info Button Overlay */}
            <button 
              className="info-toggle-btn glass-panel"
              onClick={() => setIsInfoOpen(!isInfoOpen)}
            >
              <span className="icon">ℹ️</span>
              <span className="text">คำอธิบาย</span>
            </button>

            {/* Info Drawer/Modal */}
            {isInfoOpen && (
              <div className="info-drawer glass-panel slide-up">
                <div className="info-header">
                  <h3>{currentLesson.name}</h3>
                  <button className="btn-icon" onClick={() => setIsInfoOpen(false)}>✕</button>
                </div>
                <div className="info-body">
                  <p>{currentLesson.description || 'ไม่มีคำอธิบายเพิ่มเติมสำหรับบทเรียนนี้'}</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="empty-lesson">
            <div className="glass-panel p-8 text-center">
              <h2>กรุณาเลือกบทเรียนจากเมนูด้านซ้าย</h2>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
