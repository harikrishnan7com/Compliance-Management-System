// RecordManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const RecordManagement = () => {
  const [records, setRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({ title: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingRecordId, setEditingRecordId] = useState(null);

  useEffect(() => {
    fetchRecords();
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

  const handleInputChange = (e) => {
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
    setIsEditing(true);
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
        setIsEditing(false);
        setEditingRecordId(null);
        setNewRecord({ title: '', description: '' });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2>Record Management</h2>
      <form onSubmit={isEditing ? handleUpdateRecord : handleCreateRecord}>
        <input
          type="text"
          name="title"
          value={newRecord.title}
          onChange={handleInputChange}
          placeholder="Title"
          required
        />
        <textarea
          name="description"
          value={newRecord.description}
          onChange={handleInputChange}
          placeholder="Description"
          required
        />
        <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
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
    </div>
  );
};
