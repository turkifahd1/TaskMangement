// EditUser.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../compunet/Header'; // تأكد من صحة المسار

const EditUser = () => {
  const { userId } = useParams(); // استخدام useParams للحصول على معرف المستخدم من عنوان الURL
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });
  const [isUpdating, setIsUpdating] = useState(false); // حالة التحديث
  const [updateMessage, setUpdateMessage] = useState(''); // حالة الرسالة

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://backendtaskmangement-2.onrender.com/users/getUser/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error(`Error fetching user ${userId}:`, error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true); // تعيين حالة التحديث إلى true
    setUpdateMessage('جارٍ التحديث...'); // تعيين رسالة التحديث
    try {
      const response = await fetch(`https://backendtaskmangement-2.onrender.com/users/updateUser/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setUpdateMessage('تم تحديث بيانات المستخدم بنجاح.');
      // تفريغ الحقول بعد التحديث بنجاح
      setUserData({
        name: '',
        email: '',
        password: '',
        role: '',
      });
    } catch (error) {
      console.error(`Error updating user ${userId}:`, error);
      setUpdateMessage('حدث خطأ أثناء تحديث البيانات. تأكد من عنوان الـ API والصلاحيات.');
    } finally {
      setIsUpdating(false); // تعيين حالة التحديث إلى false
    }
  };

  return (
    <div>
      <Header />
      <div className="edit-user-container">
        <h2 className="text-2xl font-bold mb-4">تعديل بيانات المستخدم</h2>
        <form onSubmit={handleSubmit} className="edit-user-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">الاسم:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">البريد الإلكتروني:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">كلمة السر:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role" className="form-label">الدور:</label>
            <select
              id="role"
              name="role"
              value={userData.role}
              onChange={handleInputChange}
              className="form-select"
              required
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <button type="submit" className="form-button">
            {isUpdating ? 'جارٍ التحديث...' : 'حفظ التغييرات'}
          </button>
        </form>
        {updateMessage && <p className="update-message">{updateMessage}</p>}
      </div>
    </div>
  );
};

export default EditUser;
