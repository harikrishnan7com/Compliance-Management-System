
import React from 'react';
import '../styles/About.css';

function About() {
  return (
    <div className="about-container">
      <section>
        <h2>About Us</h2>
        <p>Welcome to our ComplianceMaster Tech's application. This is where you can learn more about us.</p>
      </section>
      <section>
        <h2>Our Team</h2>
        <div className="team-member">
          <img src="images3.jpg" alt="Team Member 1" />
          <div>
            <h3>John Doe</h3>
            <p>Co-founder & CEO</p>
            <p>John is passionate about...</p>
          </div>
        </div>
        <div className="team-member">
          <img src="images3.jpg" alt="Team Member 2" />
          <div>
            <h3>Jane Smith</h3>
            <p>Co-founder & CTO</p>
            <p>Jane specializes in...</p>
          </div>
        </div>
      </section>
      <section>
        <h2>Our Services</h2>
        <ul>
          <li>Service 1</li>
          <li>Service 2</li>
          <li>Service 3</li>
        </ul>
      </section>
    </div>
  );
}

export default About;
