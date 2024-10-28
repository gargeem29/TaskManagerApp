import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { createTask, getTasks, updateTask } from '../api/taskAPI';

const TaskForm = ({ taskToEdit, onSave, fetchTasks }) => {
  const [task, setTask] = useState({ title: '', description: '', status: 'pending', dueDate: '' });

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In-Progress' },
    { value: 'completed', label: 'Completed' }
  ];

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit);
    }
  }, [taskToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (selectedOption) => {
    setTask(prev => ({ ...prev, status: selectedOption.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task._id) {
      await updateTask(task._id, task);
    } else {
      await createTask(task);
    }
    onSave();
    setTask({ title: '', description: '', status: 'pending', dueDate: '' });
    fetchTasks();
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input name="title" value={task.title} onChange={handleChange} placeholder="Title" required />
      <textarea name="description" value={task.description} onChange={handleChange} placeholder="Description" required />

      <Select
        options={statusOptions}
        value={statusOptions.find(option => option.value === task.status)}
        onChange={handleStatusChange}
        className="select-status"
        placeholder="Select status"
      />

      <input name="dueDate" type="date" value={task.dueDate} onChange={handleChange} required />
      <button className="submit" style={{
        marginTop: '10px',
      }} type="submit">{task._id ? 'Update' : 'Create'} Task</button>
    </form>
  );
};

export default TaskForm;
