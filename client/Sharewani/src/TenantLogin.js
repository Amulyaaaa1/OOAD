import React, { useState } from 'react';
import axios from 'axios';

const TenantLogin = () => {
  const [contact, setContact] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/tenant-login', {
        contact,
        name,
      });

      if (response.data.success) {
        setMessage('✅ Login successful!');
        // Redirect or proceed...
      } else {
        setMessage('❌ ' + response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('⚠️ Server error. Try again later.');
    }
  };

  return (
    <div className="page-container">
      <div className="auth-form-container">
        <h2>Tenant Login</h2>
        <form className="auth-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Contact Number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button type="submit" className="auth-button">Login</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default TenantLogin;
