// src/App.js
import React, { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { getTasks } from './api/taskAPI';
import Loader from './components/Loader';
import Login from './components/Login';
import Register from './components/Register';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App = () => {
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleEdit = (task) => setTaskToEdit(task);
  const handleSave = () => setTaskToEdit(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { data } = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleRegisterSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
  }, [token]);

  return (
    <Router>
      <div className="app-container">
        <header>
          Task Manager
          {isAuthenticated && <button onClick={handleLogout} className="logout-button">Logout</button>}
        </header>
        <div className="container">
          <Routes>
            <Route
              path="/login"
              element={!isAuthenticated ? <Login onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!isAuthenticated ? <Register onRegisterSuccess={handleRegisterSuccess} /> : <Navigate to="/" />}
            />
            <Route
              path="/"
              element={
                !isAuthenticated ? (
                  <Navigate to="/login" />
                ) : loading ? (
                  <Loader />
                ) : (
                  <>
                    <TaskForm taskToEdit={taskToEdit} onSave={handleSave} fetchTasks={fetchTasks} />
                    <TaskList onEdit={handleEdit} tasks={tasks} />
                  </>
                )
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
