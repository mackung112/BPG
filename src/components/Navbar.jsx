import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar glass-panel">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">👩‍🏫</span>
          <span className="logo-text text-gradient">ห้องเรียนครูแม็ค</span>
        </Link>
        <div className="navbar-links">
          <Link to="/" className="nav-link">หน้าแรก</Link>
        </div>
      </div>
    </nav>
  );
}
