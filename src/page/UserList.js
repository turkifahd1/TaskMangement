// import React, { useEffect, useState } from 'react';
// import Header from '../compunet/Header';
// import { Link } from 'react-router-dom';
// import '../styles/a.css'; // استيراد ملف CSS

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isDeleting, setIsDeleting] = useState(false); // حالة لتتبع الحذف

//   const fetchUsers = async () => {
//     try {
//       const response = await fetch('https://backendtaskmangement-2.onrender.com/users/getAllUsers', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       setUsers(data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleDelete = async (userId) => {
//     if (window.confirm('هل أنت متأكد أنك تريد حذف هذا المستخدم؟')) {
//       setIsDeleting(true); // تعيين حالة الحذف

//       try {
//         const response = await fetch(`https://backendtaskmangement-2.onrender.com/users/deleteUser/${userId}`, {
//           method: 'DELETE',
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         fetchUsers(); // تحديث قائمة المستخدمين بعد الحذف
//       } catch (error) {
//         console.error(`Error deleting user ${userId}:`, error);
//       } finally {
//         setIsDeleting(false); // إيقاف حالة الحذف بعد الانتهاء
//       }
//     }
//   };

//   return (
//     <div>
//       <Header />
//       <div className="user-list-container">
//         <div className="user-list-content">
//           {loading ? (
//             <div className="loading-message">
//               <p>جارٍ تحميل البيانات...</p>
//             </div>
//           ) : isDeleting ? (
//             <div className="loading-message">
//               <p>جارٍ الحذف...</p>
//             </div>
//           ) : users.length === 0 ? (
//             <p className="no-users">لم يتم العثور على مستخدمين.</p>
//           ) : (
//             <div className="user-list">
//               {users.map(user => (
//                 <div key={user.id} className="user-card">
//                   <div className="user-info">
//                     <h3 className="user-name">{user.name}</h3>
//                     <p className="user-email">{user.email}</p>
//                     <p className="user-role">الدور: {user.role}</p>
//                   </div>
//                   <div className="user-actions">
//                     <Link to={`/edit/${user.id}`} className="edit-button">تعديل</Link>
//                     <button onClick={() => handleDelete(user.id)} className="delete-button">حذف</button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserList;





import React, { useEffect, useState } from 'react';
import Header from '../compunet/Header';
import { Link } from 'react-router-dom';
import '../styles/a.css'; // استيراد ملف CSS

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://backendtaskmangement-2.onrender.com/users/getAllUsers', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذا المستخدم؟')) {
      setIsDeleting(true);

      try {
        const response = await fetch(`https://backendtaskmangement-2.onrender.com/users/deleteUser/${userId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        fetchUsers();
      } catch (error) {
        console.error(`Error deleting user ${userId}:`, error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="user-list-container">
        <div className="user-list-content">
          {loading ? (
            <div className="loading-message">
              <p>جارٍ تحميل البيانات...</p>
            </div>
          ) : isDeleting ? (
            <div className="loading-message">
              <p>جارٍ الحذف...</p>
            </div>
          ) : users.length === 0 ? (
            <p className="no-users">لم يتم العثور على مستخدمين.</p>
          ) : (
            <div className="user-list">
              {users.map(user => (
                <div key={user.id} className="user-card">
                  <div className="user-info">
                    <h3 className="user-name">{user.name}</h3>
                    <p className="user-email">{user.email}</p>
                    <p className="user-role">الدور: {user.role}</p>
                    <div className="user-tasks">
                      {user.tasks && user.tasks.length > 0 ? (
                        <>
                          <p>عدد المهام: {user.tasks.length}</p>
                          {user.tasks.map(task => (
                            <div key={task.id} className="task">
                              <p>المهمة: {task.title}</p>
                              <p>الوصف: {task.description}</p>
                            </div>
                          ))}
                        </>
                      ) : (
                        null /* إزالة عنصر "لا توجد مهام" */
                      )}
                    </div>
                  </div>
                  <div className="user-actions">
                    <Link to={`/edit/${user.id}`} className="edit-button">تعديل</Link>
                    <Link to={`/addTask/${user.id}`} className="add-task-button">إضافة مهمة</Link>
                    <button onClick={() => handleDelete(user.id)} className="delete-button">حذف</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
