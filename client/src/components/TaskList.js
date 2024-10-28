import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../api/taskAPI';

const TaskList = ({ onEdit, fetchTasks, tasks }) => {


  const noTaskMessages = [
    "Looks like there's nothing to do. Enjoy the calm!",
    "No tasks yet. How about adding something to your to-do list?",
    "You're all caught up! Perfect time to relax.",
    "Nothing here yet. Time to create a new task!",
    "All tasks are done. Great job staying on top of things!",
  ];



  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  const getRandomNoTaskMessage = () => {
    const randomIndex = Math.floor(Math.random() * noTaskMessages.length);
    return noTaskMessages[randomIndex];
  };

  return (
    <div style={{
      flex: 1,
      backgroundColor: '#ebd3f8',
      borderRadius: '10px',
      height: '500px',
    }}>
      <h1 style={{
        textDecoration: 'underline',
      }}>All Tasks</h1>
      {tasks.length === 0 ? (
        <p style={{
          fontStyle: 'italic',
          color: '#555',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '1.5rem',
        }}>{getRandomNoTaskMessage()}</p>
      ) : (
        <ul className="task-list">
          {tasks.map(task => (
            <li className="task-item" key={task._id}>
              <div className="task-title">{task.title}</div>
              <p>{task.description}</p>
              <div>Status: {task.status}</div>
              <div>Due Date: {new Date(task.dueDate).toLocaleDateString()}</div>
              <div className="task-actions">
                <button className="edit" onClick={() => onEdit(task)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(task._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
