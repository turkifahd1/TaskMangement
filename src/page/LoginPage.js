// // LoginPage.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, useLocation, Link } from 'react-router-dom';
// import '../styles/styles.css'; // تأكد من استيراد ملف CSS

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [tokenMessage, setTokenMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false); // حالة لعرض رسالة "جاري التحميل"
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     if (location.state && location.state.successMessage) {
//       setMessage(location.state.successMessage);
//     }
//   }, [location.state]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setIsLoading(true); // تعيين isLoading إلى true عند بدء عملية الدخول
//     try {
//       const response = await axios.post('https://backendtaskmangement-2.onrender.com/auth/login', {
//         email,
//         password,
//       });

//       if (response.status === 200) {
//         const { token, role } = response.data;
//         localStorage.setItem('token', token);
//         setTokenMessage(`تم تسجيل الدخول بنجاح، الـ token هو: ${token}`);

//         if (role === 'admin') {
//           navigate('/admin-dashboard');
//         } else if (role === 'user') {
//           navigate('/user-dashboard');
//         }
//       } else {
//         setMessage('خطأ في تسجيل الدخول، يرجى المحاولة مرة أخرى.');
//       }
//     } catch (error) {
//       console.error('Error during login:', error.response ? error.response.data : error.message);
//       setMessage('خطأ في تسجيل الدخول، يرجى المحاولة مرة أخرى.');
//     } finally {
//       setIsLoading(false); // تعيين isLoading إلى false عند انتهاء عملية الدخول
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="welcome-message">
//         مرحبا بك في موقع لتسجيل المهام اليومية
//       </div>
//       <div className="login-container">
//         <div className="login-form">
//           <h2 className="login-title">تسجيل الدخول</h2>
//           <form onSubmit={handleLogin}>
//             <div className="form-group">
//               <label htmlFor="email">البريد الإلكتروني</label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="form-input"
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="password">كلمة المرور</label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="form-input"
//               />
//             </div>
//             <div className="button-group">
//               <button type="submit" className="submit-button">
//                 {isLoading ? 'جاري التحميل...' : 'تسجيل الدخول'}
//               </button>
//             </div>
//             <div className="register-link">
//               <Link to="/register">إنشاء حساب جديد</Link>
//             </div>
//           </form>
//           {message && <p className="message error">{message}</p>}
//           {tokenMessage && <p className="message success">{tokenMessage}</p>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;





// LoginPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import '../styles/styles.css'; // تأكد من استيراد ملف CSS

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [tokenMessage, setTokenMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // حالة لعرض رسالة "جاري التحميل"
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.successMessage) {
      setMessage(location.state.successMessage);
    }
  }, [location.state]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // تعيين isLoading إلى true عند بدء عملية الدخول
    try {
      const response = await axios.post('https://backendtaskmangement-2.onrender.com/auth/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, role } = response.data;
        localStorage.setItem('token', token);
        setTokenMessage(`تم تسجيل الدخول بنجاح، الـ token هو: ${token}`);

        if (role === 'admin') {
          navigate('/admin-dashboard');
        } else if (role === 'user') {
          navigate('/user-dashboard');
        }
      } else {
        setMessage('خطأ في تسجيل الدخول، يرجى المحاولة مرة أخرى.');
      }
    } catch (error) {
      console.error('Error during login:', error.response ? error.response.data : error.message);
      setMessage('خطأ في تسجيل الدخول، يرجى المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false); // تعيين isLoading إلى false عند انتهاء عملية الدخول
    }
  };

  return (
    <div className="login-page">
      <div className="welcome-message">
        مرحبا بك في موقع لتسجيل المهام اليومية
      </div>
      <div className="login-container">
        <div className="login-form">
          <h2 className="login-title">تسجيل الدخول</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">البريد الإلكتروني</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
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
                className="form-input"
              />
            </div>
            <div className="button-group">
              <button type="submit" className="submit-button">
                {isLoading ? 'جاري التحميل...' : 'تسجيل الدخول'}
              </button>
            </div>
            <div className="register-link">
              <Link to="/register">إنشاء حساب جديد</Link>
            </div>
          </form>
          {message && <p className="message error">{message}</p>}
          {tokenMessage && <p className="message success">{tokenMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
