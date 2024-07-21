// Headerr.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/h/Headerr.css'; // استيراد ملف CSS

const Headerr = () => {
  return (
    <header className="header">
      <nav className="container">
        <h1 className="logo">Task Management</h1>
        <div className="nav-links">
          <Link to="/create-task" className="nav-link">إنشاء مهمة</Link>
          <Link to="/tasks" className="nav-link">قائمة المهام</Link>
          <Link to="/user-dashboard" className="nav-link">الرئيسية</Link>
          <Link to="/" className="nav-link">تسجيل الخروج</Link>
        </div>
      </nav>
    </header>
  );
};

export default Headerr;
