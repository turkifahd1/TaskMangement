import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './page/LoginPage';
import AdminDashboard from './page/AdminDashboard';
import UserDashboard from './page/UserDashboard';
import UserList from '../src/page/UserList';
import EditUser from '../src/page/EditUser';
import CreateTask from '../src/page/CreateTask';
import Home from './page/home';
import Register from '../src/page/register'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/user-dashboard" element={<Home />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/user-list" element={<UserList />} />
        <Route path="/edit/:userId" element={<EditUser />} />
        <Route path="/create-task" element={<CreateTask />} />
          <Route path="/tasks" element={<UserDashboard />} />
          <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
