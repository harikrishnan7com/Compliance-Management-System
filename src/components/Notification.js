// Notification.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications from the server
    axios.get('http://localhost:3001/notifications')
      .then(res => {
        setNotifications(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      {/* Display notifications */}
    </div>
  );
};
