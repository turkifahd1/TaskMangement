import React from 'react';
import { Link } from 'react-router-dom';

const Headerr = () => {
  return (
    <header className="bg-gray-800 text-white p-4 mb-4">
      <nav className="container mx-auto flex justify-between">
        <h1 className="text-2xl font-bold">Task Management</h1>
        <div className="space-x-4">
          <Link to="/create-task" className="hover:text-gray-300">إنشاء مهمة</Link>
          <Link to="/tasks" className="hover:text-gray-300">قائمة المهام</Link>
          <Link to="/user-dashboard" className="text-white">الرئيسية</Link>
          <Link to="/" className="text-white">تسجيل الخروج</Link>
        </div>
      </nav>
    </header>
  );
};

export default Headerr;
