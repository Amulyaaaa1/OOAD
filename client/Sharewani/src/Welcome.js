import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1 className="main-title">Welcome to <span className="highlight">Sharewani</span></h1>
        <p className="tagline">A Unified Rental Portal for Every Possession You Cherish</p>

        <p className="description">
          <strong>Sharewani</strong> is a next-gen rental marketplace that connects owners and tenants with 
          ease. From ethnic clothing and vehicles to tools and spaces, our platform empowers users 
          to rent or list any item effortlessly. With a unique bidding and scheduling system, 
          maximize usage and build direct connections in a vibrant rental community.
        </p>

        <ul className="features-list">
          <li>📅 Dynamic scheduling & calendar views</li>
          <li>📍 Location-based listings</li>
          <li>🤝 Fair bidding system & transparent access</li>
          <li>♻️ Empowering sustainable, shared living</li>
        </ul>

        <Link to="/home" className="cta-button">Enter the Portal</Link>
      </div>
    </div>
  );
};

export default Welcome;
