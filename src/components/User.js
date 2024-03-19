import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the server
    axios.get('http://localhost:3001/users1')
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleSeeMarks = (userId) => {
    // Add logic to navigate to a page showing the marks of the user with the provided userId
    console.log(`Marks of user with ID ${userId}`);
  };

  const handleUploadDocument = (userId, documentUrl) => {
    // Add logic to upload a document for the user with the provided userId
    console.log(`Document uploaded for user with ID ${userId}: ${documentUrl}`);
  };

  const handleCreateTask = (userId) => {
    // Add logic to create a task for the user with the provided userId
    console.log(`Task created for user with ID ${userId}`);
  };

  const handleViewAuditTrail = (userId) => {
    // Add logic to view the audit trail for the user with the provided userId
    console.log(`Audit trail for user with ID ${userId}`);
  };

  const handleSendNotification = (userId) => {
    // Add logic to send a notification to the user with the provided userId
    console.log(`Notification sent to user with ID ${userId}`);
  };

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          <img src={user.image} alt={user.name} width={150} height={150} />
          <h1>{user.name}</h1>
          <p>{user.age}</p>
          <button onClick={() => handleSeeMarks(user.id)}>See Marks</button>
          <button onClick={() => handleUploadDocument(user.id, 'example-document-url')}>Upload Document</button>
          <button onClick={() => handleCreateTask(user.id)}>Create Task</button>
          <button onClick={() => handleViewAuditTrail(user.id)}>View Audit Trail</button>
          <button onClick={() => handleSendNotification(user.id)}>Send Notification</button>
          
        </div>
      ))}
    </div>
  );
};
