// AdminDashboard.js
import React from 'react';
import Header from '../compunet/Header'; // تأكد من صحة المسار
import '../styles/a.css'; // تأكد من صحة المسار

const AdminDashboard = () => {
  return (
    <div>
      <Header />
      <div className="dashboard-container">
        <h2 className="title">مرحبًا بك في نظام إدارة المهام</h2>
        <p className="description">يمكنك التحكم في الحسابات الجديدة أو عرض الحسابات الحالية وتعديلها أو حذفها.</p>
        <div className="actions">
          {/* أضف أي عناصر أو روابط إضافية هنا */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
