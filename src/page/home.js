// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import Headerr from '../compunet/Headerr'; // تأكد من صحة المسار
import '../styles/q.css'; // تأكد من استيراد ملف CSS

const Home = () => {
  return (
    <div>
      <Headerr />
      <div className="home-container">
        <h2 className="welcome-text">مرحبًا بك في نظام إدارة المهام</h2>
        <p className="intro-text">يمكنك إنشاء مهام جديدة أو عرض المهام الحالية وتعديلها أو حذفها.</p>
        <div className="button-group">
          <Link to="/create-task" className="btn-create">
            إنشاء مهمة جديدة
          </Link>
          <Link to="/tasks" className="btn-view">
            عرض المهام
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
