import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Admin = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phone,setPhone]=useState('')
  const [documentUrl, setDocumentUrl] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch users from the server
    axios.get('http://localhost:3001/users1')
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    // Fetch tasks from the server
    axios.get('http://localhost:3001/tasks')
      .then(res => {
        setTasks(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add new user to the server
    axios.post('http://localhost:3001/users1', { name: name, age: age,phone: phone, documentUrl: documentUrl })
      .then(res => {
        console.log(res);
        // Refresh user list
        setUsers([...users, res.data]);
        // Clear form fields
        setName('');
        setAge('');
        setPhone('');
        setDocumentUrl('');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    // Delete user from the server
    axios.delete(`http://localhost:3001/users1/${id}`)
      .then(res => {
        console.log(res);
        // Refresh user list
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleUpdate = (id, updatedData) => {
    // Update user on the server
    axios.put(`http://localhost:3001/users1/${id}`, updatedData)
      .then(res => {
        console.log(res);
        // Refresh user list
        const updatedUsers = users.map(user => {
          if (user.id === id) {
            return { ...user, ...updatedData };
          }
          return user;
        });
        setUsers(updatedUsers);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleTaskCreate = (userId) => {
    // Create task for the user
    axios.post('http://localhost:3001/tasks', { userId: userId, description: 'New Task Description', status: 'Pending' })
      .then(res => {
        console.log(res);
        // Refresh tasks list
        setTasks([...tasks, res.data]);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleTaskDelete = (id) => {
    // Delete task from the server
    axios.delete(`http://localhost:3001/tasks/${id}`)
      .then(res => {
        console.log(res);
        // Refresh tasks list
        setTasks(tasks.filter(task => task.id !== id));
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleTaskUpdate = (id, updatedData) => {
    // Update task on the server
    axios.put(`http://localhost:3001/tasks/${id}`, updatedData)
      .then(res => {
        console.log(res);
        // Refresh tasks list
        const updatedTasks = tasks.map(task => {
          if (task.id === id) {
            return { ...task, ...updatedData };
          }
          return task;
        });
        setTasks(updatedTasks);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleTaskAssignment = (taskId, userId) => {
    // Assign task to user
    axios.put(`http://localhost:3001/tasks/${taskId}`, { userId: userId })
      .then(res => {
        console.log(res);
        // Update task's user assignment
        const updatedTasks = tasks.map(task => {
          if (task.id === taskId) {
            return { ...task, userId: userId };
          }
          return task;
        });
        setTasks(updatedTasks);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2>User Management</h2>
      <form onSubmit={handleSubmit}>
        <label>User Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} /><br />
        <label>User Age</label>
        <input type="text" value={age} onChange={(e) => setAge(e.target.value)} /><br />
        <label>Document URL</label>
        <input type="text" value={documentUrl} onChange={(e) => setDocumentUrl(e.target.value)} /><br />
        <button type='submit'>Add</button>
      </form>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <span>{user.name} - {user.age}</span>
            <a href={user.documentUrl} target="_blank" rel="noopener noreferrer">View Document</a>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
            <button onClick={() => handleUpdate(user.id, { name: 'New Name', age: 'New Age', documentUrl: 'New Document URL' })}>Update</button>
            <button onClick={() => handleTaskCreate(user.id)}>Create Task</button>
          </li>
        ))}
      </ul>
      <h2>Task Management</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span>{task.description} - {task.status}</span>
            {task.userId ? (
              <span>Assigned to: {users.find(user => user.id === task.userId)?.name}</span>
            ) : (
              <span>Not Assigned</span>
            )}
            <button onClick={() => handleTaskDelete(task.id)}>Delete Task</button>
            <button onClick={() => handleTaskUpdate(task.id, { description: 'Updated Task Description', status: 'Completed' })}>Update Task</button>
            <select onChange={(e) => handleTaskAssignment(task.id, e.target.value)}>
              <option value="">Assign to</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};
