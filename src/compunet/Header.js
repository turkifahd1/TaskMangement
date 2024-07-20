// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const Header = () => {
  return (
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/admin-dashboard" className="text-white text-xl font-bold">Task Management</Link>
        <div className="text-white">مرحبا، Admin!</div>
        <nav className="space-x-4">
          <Link to="/admin-dashboard" className="text-white">الرئيسية</Link>
          <Link to="/user-list" className="text-white">لوحة التحكم</Link>
          <Link to="/" className="text-white">تسجيل الخروج</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
