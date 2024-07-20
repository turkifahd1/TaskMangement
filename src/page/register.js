import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css'; 

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // قيمة افتراضية للدور
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // حالة لعرض رسالة "جاري التحميل"
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true); // تعيين isLoading إلى true عند بدء عملية التسجيل
    try {
      const response = await axios.post('https://backendtaskmangement-2.onrender.com/auth/register', {
        name,
        email,
        password,
        role,
      });

      if (response.status === 201) {
        setMessage('تم إنشاء الحساب بنجاح! سيتم تحويلك إلى صفحة تسجيل الدخول بعد لحظات...');
        setTimeout(() => {
          navigate('/', { state: { successMessage: 'ادخل الحساب الذي أنشأته للتو' } });
        }, 3000); // إعادة التوجيه بعد 3 ثوانٍ
      } else {
        setMessage('خطأ في إنشاء الحساب، يرجى المحاولة مرة أخرى.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setMessage('خطأ في إنشاء الحساب، يرجى المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false); // تعيين isLoading إلى false عند انتهاء عملية التسجيل
    }
  };

  return (
    <div>
      <div className='lo'>
        مرحبا بككم في موقع لتسجيل المهم اليوميه
      </div>
      <div className="register-page">
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center">
          <div className="containerr bg-white p-8 shadow-lg rounded-lg">
            <h2 className="title text-center">إنشاء حساب جديد</h2>
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label htmlFor="name">الاسم</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">البريد الإلكتروني</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">كلمة المرور</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">الدور</label>
                <select
                  id="role"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="input"
                >
                  <option value="user">مستخدم</option>
                  <option value="admin">مسؤول</option>
                </select>
              </div>
              <button type="submit" className="button">
                {isLoading ? 'جاري التحميل...' : 'إنشاء حساب'}
              </button>
            </form>
            {message && <p className="message">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
