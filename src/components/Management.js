import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Management = () => {

  const [records, setRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({ title: '', description: '' });
  const [isEditingRecord, setIsEditingRecord] = useState(false);
  const [editingRecordId, setEditingRecordId] = useState(null);


  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ description: '', status: '' });
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);


  const [auditTrail, setAuditTrail] = useState([]);


  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchRecords();
    fetchTasks();
    fetchAuditTrail();
    fetchNotifications();
  }, []);

  
  const fetchRecords = () => {
    axios.get('http://localhost:3001/records')
      .then(res => {
        setRecords(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  
  const fetchTasks = () => {
    axios.get('http://localhost:3001/tasks')
      .then(res => {
        setTasks(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  
  const fetchAuditTrail = () => {
    axios.get('http://localhost:3001/audit-trail')
      .then(res => {
        setAuditTrail(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

 
  const fetchNotifications = () => {
    axios.get('http://localhost:3001/notifications')
      .then(res => {
        setNotifications(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleRecordInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecord(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCreateRecord = () => {
    axios.post('http://localhost:3001/records', newRecord)
      .then(res => {
        setRecords([...records, res.data]);
        setNewRecord({ title: '', description: '' });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleDeleteRecord = (id) => {
    axios.delete(`http://localhost:3001/records/${id}`)
      .then(res => {
        setRecords(records.filter(record => record.id !== id));
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleEditRecord = (record) => {
    setIsEditingRecord(true);
    setEditingRecordId(record.id);
    setNewRecord(record);
  };

  const handleUpdateRecord = () => {
    axios.put(`http://localhost:3001/records/${editingRecordId}`, newRecord)
      .then(res => {
        setRecords(records.map(record => {
          if (record.id === editingRecordId) {
            return { ...res.data };
          }
          return record;
        }));
        setIsEditingRecord(false);
        setEditingRecordId(null);
        setNewRecord({ title: '', description: '' });
      })
      .catch(err => {
        console.log(err);
      });
  };


  const handleTaskInputChange = (e) => {
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
    setIsEditingTask(true);
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
        setIsEditingTask(false);
        setEditingTaskId(null);
        setNewTask({ description: '', status: '' });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2>Record Management</h2>
      <form onSubmit={isEditingRecord ? handleUpdateRecord : handleCreateRecord}>
        <input
          type="text"
          name="title"
          value={newRecord.title}
          onChange={handleRecordInputChange}
          placeholder="Title"
          required
        />
        <textarea
          name="description"
          value={newRecord.description}
          onChange={handleRecordInputChange}
          placeholder="Description"
          required
        />
        <button type="submit">{isEditingRecord ? 'Update' : 'Create'}</button>
      </form>
      <ul>
        {records.map(record => (
          <li key={record.id}>
            <div>
              <h3>{record.title}</h3>
              <p>{record.description}</p>
            </div>
            <div>
              <button onClick={() => handleEditRecord(record)}>Edit</button>
              <button onClick={() => handleDeleteRecord(record.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <h2>Task Management</h2>
      <form onSubmit={isEditingTask ? handleUpdateTask : handleCreateTask}>
        <input
          type="text"
          name="description"
          value={newTask.description}
          onChange={handleTaskInputChange}
          placeholder="Description"
          required
        />
        <input
          type="text"
          name="status"
          value={newTask.status}
          onChange={handleTaskInputChange}
          placeholder="Status"
          required
        />
        <button type="submit">{isEditingTask ? 'Update' : 'Create'}</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <div>
              <p>Description: {task.description}</p>
              <p>Status: {task.status}</p>
            </div>
            <div>
              <button onClick={() => handleEditTask(task)}>Edit</button>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <h2>Audit Trail</h2>
      {/* Display audit trail */}

      <h2>Notifications</h2>
      {/* Display notifications */}
    </div>
  );
};
