import React, { useState, useEffect } from 'react';
import './MobileWarning.css';

export default function MobileWarning() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the screen width is less than 768px (typical mobile/tablet portrait threshold)
    const checkScreenSize = () => {
      if (window.innerWidth < 768) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="mobile-warning glass-panel slide-up">
      <div className="warning-content">
        <span className="warning-icon">📱 ➡️ 💻</span>
        <p><strong>แนะนำ:</strong> เพื่อให้แสดงผล Simulator ได้อย่างสมบูรณ์ แนะนำให้ใช้งานบนแท็บเล็ตหรือคอมพิวเตอร์ครับ</p>
      </div>
      <button className="warning-close" onClick={() => setIsVisible(false)}>เข้าใจแล้ว</button>
    </div>
  );
}
