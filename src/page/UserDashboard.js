import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Headerr from '../compunet/Headerr';
import '../styles/aa.css'; // استيراد ملف CSS

const UserDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchTasks = async () => {
    try {
      const response = await fetch('https://backendtaskmangement-2.onrender.com/tasks/getTask', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleEdit = (task) => {
    setEditTaskId(task.id);
    setTitle(task.title);
    setDescription(task.description);
    setDayOfWeek(task.dayOfWeek);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const response = await fetch(`https://backendtaskmangement-2.onrender.com/tasks/putTask/${editTaskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ title, description, dayOfWeek }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedTask = await response.json();
      setTasks(tasks.map(task => (task.id === editTaskId ? updatedTask : task)));
      setEditTaskId(null);
      setTitle('');
      setDescription('');
      setDayOfWeek('');
      toast.success('تم تحديث المهمة بنجاح!');
    } catch (error) {
      console.error(`Error updating task ${editTaskId}:`, error);
      toast.error('حدث خطأ أثناء تحديث المهمة.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (taskId) => {
    setIsUpdating(true);
    try {
      const response = await fetch(`https://backendtaskmangement-2.onrender.com/tasks/deleteTask/${taskId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setTasks(tasks.filter(task => task.id !== taskId));
      toast.success('تم حذف المهمة بنجاح!');
    } catch (error) {
      console.error(`Error deleting task ${taskId}:`, error);
      toast.error('حدث خطأ أثناء حذف المهمة.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div>
      <Headerr />
      <div className="containerrr">
        <h2 className="text-2xl font-bold mb-4 text-center">قائمة المهام</h2>

        {loading ? (
          <div className="loading">جارٍ التحميل...</div>
        ) : (
          <div className="main-content">
            {/* نموذج تعديل المهمة */}
            {editTaskId && (
              <div className="task-form">
                <h3 className="text-lg font-semibold mb-2">تعديل المهمة</h3>
                <form onSubmit={handleUpdate}>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="العنوان"
                    required
                  />
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="الوصف"
                    required
                  />
                  <input
                    type="text"
                    value={dayOfWeek}
                    onChange={(e) => setDayOfWeek(e.target.value)}
                    placeholder="اليوم"
                    required
                  />
                  <button type="submit">
                    {isUpdating ? 'جارٍ التحديث...' : 'تحديث'}
                  </button>
                </form>
              </div>
            )}

            {/* قائمة المهام */}
            <div className="tasks-container">
              {tasks.length === 0 ? (
                <p className="text-center">لم يتم العثور على مهام.</p>
              ) : (
                tasks.map(task => (
                  <div key={task.id} className="task-card">
                    <div>
                      <h3>{task.title}</h3>
                      <p>{task.description}</p>
                      <p>اليوم: {task.dayOfWeek}</p>
                    </div>
                    <div className="actions">
                      <button onClick={() => handleEdit(task)}>
                        تعديل
                      </button>
                      <button onClick={() => handleDelete(task.id)} className="delete">
                        {isUpdating ? 'جارٍ الحذف...' : 'حذف'}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      <ToastContainer className="toast-container" />
    </div>
  );
};

export default UserDashboard;
