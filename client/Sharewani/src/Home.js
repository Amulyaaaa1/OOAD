import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  
  const features = [
    {
      title: "Find Traditional Attire",
      description: "Discover authentic cultural clothing for any occasion",
      icon: "👗"
    },
    {
      title: "Rent with Confidence",
      description: "Verified sellers and secure payment options",
      icon: "🔒"
    },
    {
      title: "Affordable Pricing",
      description: "Special discounts and flexible rental periods",
      icon: "💰"
    }
  ];

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`home-container ${isLoaded ? 'loaded' : ''}`}>
      <div className="hero-section">
        <h1 className="home-title">Sharewani</h1>
        <p className="home-tagline">A Unified Portal for Cultural Attire Rentals</p>
        
        <div className="cta-buttons">
          <Link to="/explore" className="cta-button primary">Explore Collection</Link>
          <Link to="/how-it-works" className="cta-button secondary">How It Works</Link>
        </div>
      </div>
      
      <div className="features-section">
        <h2 className="section-title">Why Choose Sharewani?</h2>
        <div className="features-container">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`feature-card ${activeFeature === index ? 'active' : ''}`}
              onClick={() => setActiveFeature(index)}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="testimonials-section">
        <h2 className="section-title">What Our Users Say</h2>
        <div className="testimonial">
          <p>"Found the perfect traditional outfit for my cousin's wedding. Saved me so much money!"</p>
          <span>— Priya S.</span>
        </div>
      </div>
      
      <div className="auth-section">
        <div className="auth-card">
          <h3>Join Our Community</h3>
          <p>New to Sharewani? <Link to="/signup" className="signup-link">Sign up</Link></p>
          <p>Already have an account? <Link to="/login" className="login-link">Login</Link></p>
        </div>
      </div>

      {/* Add this inside the main container */}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Link to="/" className="back-to-welcome">← Back to Welcome</Link>
      </div>
    </div>
  );
};

export default Home;
