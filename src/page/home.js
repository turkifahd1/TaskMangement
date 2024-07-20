import React from 'react';
import { Link } from 'react-router-dom';
import Headerr from '../compunet/Headerr';
import '../styles/q.css'; // تأكد من استيراد ملف CSS

const Home = () => {
  return (
    <div>
      <Headerr />
      <div className="bb">
        <h2 className="text-2xl font-bold mb-4">مرحبًا بك في نظام إدارة المهام</h2>
        <p className="mb-4">يمكنك إنشاء مهام جديدة أو عرض المهام الحالية وتعديلها أو حذفها.</p>
        <div className="space-x-4">
          <Link to="/create-task" className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 focus:outline-none">
            إنشاء مهمة جديدة
          </Link>
          <Link to="/tasks" className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none">
            عرض المهام
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
