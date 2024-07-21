// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/h/Header.css'; // استيراد ملف CSS

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <Link to="/admin-dashboard" className="logo">Task Management</Link>
        <div className="welcome-text">مرحبا، Admin!</div>
        <nav className="nav">
          <Link to="/admin-dashboard" className="nav-link">الرئيسية</Link>
          <Link to="/user-list" className="nav-link">لوحة التحكم</Link>
          <Link to="/" className="nav-link">تسجيل الخروج</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
