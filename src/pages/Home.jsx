import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import curriculumData from '../data/curriculum.json';
import './Home.css';

export default function Home() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // In a real app this might be an API call
    setCategories(curriculumData.categories);
  }, []);

  return (
    <div className="home-page fade-in">
      <header className="home-header">
        <h1 className="title">
          ยินดีต้อนรับสู่ <span className="text-gradient">ห้องเรียนครูแม็ค</span>
        </h1>
        <p className="subtitle">เลือกหมวดหมู่และรายวิชาที่คุณต้องการเรียนรู้ได้เลยครับ</p>
      </header>

      <div className="categories-container">
        {categories.map((category) => (
          <section key={category.id} className="category-section">
            <div className="category-header">
              <h2>{category.name}</h2>
              <span className="badge">{category.description}</span>
            </div>
            
            <div className="subjects-grid">
              {category.subjects.map((subject) => (
                <div key={subject.id} className="subject-card glass-panel">
                  <div className="subject-icon">📚</div>
                  <h3>{subject.name}</h3>
                  <p>{subject.description}</p>
                  
                  {subject.chapters && subject.chapters.length > 0 ? (
                    <Link 
                      to={`/subject/${category.id}/${subject.id}`} 
                      className="btn-primary block-btn"
                    >
                      เข้าเรียน
                    </Link>
                  ) : (
                    <button className="btn-primary block-btn disabled" disabled>
                      ยังไม่มีเนื้อหา
                    </button>
                  )}
                </div>
              ))}
              
              {category.subjects.length === 0 && (
                <div className="empty-state">
                  <p>อยู่ระหว่างการเพิ่มรายวิชาในหมวดหมู่นี้...</p>
                </div>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
