import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService'; // ✅ Changed to apiService
import './loginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    // a. Prevent the default form submission behavior (which causes a page reload).
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      // ✅ Changed to apiService with relative path
      const response = await apiService.post('/auth/login', {
        userName,
        password,
      });

      // We use localStorage.setItem() to store the received token.
      // We give it a key, 'token', so we can easily retrieve it later.
      localStorage.setItem('token', response.data.token);
      navigate('/admin/dashboard');

    } catch (err) {
      console.log('Login error:', err);
      if (err.response && err.response.data && err.response.data.message) {
        // Use the specific error message from our backend
        setError(err.response.data.message);
      } else {
        setError('Login failed. Please try again.'); // for network errors
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h2>Admin login</h2>
      <form onSubmit={handleSubmit} className="login-Form">
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
        <div className="form-group"> {/* Fixed typo: was "foem-group" */}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            // The input's value is controlled by the 'password' state variable.
            value={password}
            // The 'onChange' handler updates the state.
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <button type="submit" className="login-button" disabled={loading}>
          {/* 10. Show different text on the button when loading */}
          {loading ? 'Logging In...' : 'Log In'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;