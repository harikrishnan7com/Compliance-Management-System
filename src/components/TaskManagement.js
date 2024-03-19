// TaskManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ description: '', status: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get('http://localhost:3001/tasks')
      .then(res => {
        setTasks(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCreateTask = () => {
    axios.post('http://localhost:3001/tasks', newTask)
      .then(res => {
        setTasks([...tasks, res.data]);
        setNewTask({ description: '', status: '' });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleDeleteTask = (id) => {
    axios.delete(`http://localhost:3001/tasks/${id}`)
      .then(res => {
        setTasks(tasks.filter(task => task.id !== id));
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleEditTask = (task) => {
    setIsEditing(true);
    setEditingTaskId(task.id);
    setNewTask(task);
  };

  const handleUpdateTask = () => {
    axios.put(`http://localhost:3001/tasks/${editingTaskId}`, newTask)
      .then(res => {
        setTasks(tasks.map(task => {
          if (task.id === editingTaskId) {
            return { ...res.data };
          }
          return task;
        }));
        setIsEditing(false);
        setEditingTaskId(null);
        setNewTask({ description: '', status: '' });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2>Task Management</h2>
      <form onSubmit={isEditing ? handleUpdateTask : handleCreateTask}>
        <input
          type="text"
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
          placeholder="Description"
          required
        />
        <select
          name="status"
          value={newTask.status}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="InProgress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <div>
              <h3>{task.description}</h3>
              <p>Status: {task.status}</p>
            </div>
            <div>
              <button onClick={() => handleEditTask(task)}>Edit</button>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
