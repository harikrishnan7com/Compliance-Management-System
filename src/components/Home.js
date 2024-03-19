import React from 'react'
import '../styles/home.css'


import images1 from './images1.jpg'
import images2 from './images2.jpg'


export const Home = () => {
  return (
    <div className='container'><h2>welcome Message:</h2>
    <p>welcome to ComplianceMaster Tech's Compliance Management System.Our platform helps organizations efficiently manage and track rgulatory compliance requirements.</p>
    <img className='images1.jpg' alt='images1' src={images1}></img>
    <div className='feature'>
      <h2>Key Feature:</h2>
      <ol>
        <li>Compliance Dashboard:Monitor your organization's compliance status at a glance.</li>
        <li>Document Management: Easily upload, store, and access compliance documents.</li>
        <li>Task Management: Assign tasks, set deadlines, and track progress.</li>
        <li>Reporting: Generate customizable reports for audits and internal reviews.</li>
        <li>Notifications: Receive alerts for upcoming deadlines and compliance changes.</li>
        </ol>
        <img className='images2.jpg' alt='images2' src={images2}></img></div>
        <div className='why-choose-us'>
          <h2>Why Choose Us:</h2>
          <ul>
            <li>Industry-leading expertise in regulatory compliance.</li>
            <li>User-friendly interface designed for ease of use.</li>
                <li>Customizable solutions tailored to your organization's needs.</li>
                <li>Dedicated customer support to assist you every step of the way.</li>
                </ul>
                </div>
                <div className='get-started'>
                  <h2>Get Started:</h2>
                  <p>Sign up for a free trial or schedule a demo to see how our compliance management system can benefit your organization.</p>
                  </div>

                  </div>

              
  )
}
