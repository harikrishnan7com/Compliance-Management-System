// DocumentUpload.js
import React, { useState } from 'react';
import axios from 'axios';

export const DocumentUpload = () => {
  const [document, setDocument] = useState(null);

  const handleFileChange = (e) => {
    setDocument(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', document);

    // Send document to the server for upload
    axios.post('http://localhost:3001/upload', formData)
      .then(res => {
        console.log(res);
        // Handle success
      })
      .catch(err => {
        console.log(err);
        // Handle error
      });
  };

  return (
    <div>
      <h2>Document Upload</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};
