import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import './loginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await apiService.post('/auth/login', {
        userName,
        password,
      });

      localStorage.setItem('token', response.data.token);
      navigate('/admin/dashboard');

    } catch (err) {
      console.log('Login error:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* ✅ ADDED: Container div for proper styling */}
      <div className="login-container">
        <h2>Admin Login</h2>
        {/* ✅ FIXED: Changed login-Form to login-form */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging In...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;