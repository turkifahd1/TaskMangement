









import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../compunet/Header';

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
      <div className=" ss">
        <h2 className="text-2xl font-bold mb-4">تعديل بيانات المستخدم</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-4">
            <label htmlFor="name" className="text-lg font-semibold">الاسم:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-64"
              required
            />
          </div>
          <div className="flex items-center space-x-4">
            <label htmlFor="email" className="text-lg font-semibold">البريد الإلكتروني:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-64"
              required
            />
          </div>
          <div className="flex items-center space-x-4">
            <label htmlFor="password" className="text-lg font-semibold">كلمة السر:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-64"
              required
            />
          </div>
          <div className="flex items-center space-x-4">
            <label htmlFor="role" className="text-lg font-semibold">الدور:</label>
            <select
              id="role"
              name="role"
              value={userData.role}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-64"
              required
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none">
            {isUpdating ? 'جارٍ التحديث...' : 'حفظ التغييرات'}
          </button>
        </form>
        {updateMessage && <p className="text-red-500 mt-4">{updateMessage}</p>}
      </div>
    </div>
  );
};

export default EditUser;

