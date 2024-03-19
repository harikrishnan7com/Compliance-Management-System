// AuditTrail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const AuditTrail = () => {
  const [auditTrail, setAuditTrail] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAuditTrail, setFilteredAuditTrail] = useState([]);

  useEffect(() => {
    fetchAuditTrail();
  }, []);

  const fetchAuditTrail = () => {
    axios.get('http://localhost:3001/audit-trail')
      .then(res => {
        setAuditTrail(res.data);
        setFilteredAuditTrail(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleSearch = () => {
    const filtered = auditTrail.filter(entry =>
      entry.action.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAuditTrail(filtered);
  };

  return (
    <div>
      <h2>Audit Trail</h2>
      <div>
        <input
          type="text"
          placeholder="Search by action..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>User</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredAuditTrail.map(entry => (
            <tr key={entry.id}>
              <td>{entry.action}</td>
              <td>{entry.user}</td>
              <td>{entry.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
