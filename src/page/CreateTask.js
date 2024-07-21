// CreateTask.js
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Headerr from '../compunet/Headerr'; // تأكد من صحة المسار
import '../styles/h/CreateTask.css'
const CreateTask = () => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskDayOfWeek, setNewTaskDayOfWeek] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('https://backendtaskmangement-2.onrender.com/tasks/postTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          title: newTaskTitle,
          description: newTaskDescription,
          dayOfWeek: newTaskDayOfWeek
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const newTask = await response.json();
      setNewTaskTitle('');
      setNewTaskDescription('');
      setNewTaskDayOfWeek('');
      toast.success('تم إنشاء المهمة بنجاح!');
    } catch (error) {
      console.error('Error creating new task:', error);
      toast.error('حدث خطأ أثناء إنشاء المهمة.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Headerr />
      <div className="create-task-container">
        <div className="create-task-form">
          <h3 className="form-title">إنشاء مهمة جديدة</h3>
          <form onSubmit={handleCreate}>
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="العنوان"
              className="form-input"
              required
            />
            <input
              type="text"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              placeholder="الوصف"
              className="form-input"
              required
            />
            <input
              type="text"
              value={newTaskDayOfWeek}
              onChange={(e) => setNewTaskDayOfWeek(e.target.value)}
              placeholder="اليوم"
              className="form-input"
              required
            />
            <button type="submit" className="form-button">
              {loading ? 'جارٍ الإنشاء...' : 'إنشاء'}
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default CreateTask;
