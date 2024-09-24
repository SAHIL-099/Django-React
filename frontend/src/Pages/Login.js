import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import "../Css/login.css"; 
import { logo,  cart, facebook, insta, youtube, user } from './images.js';

function Login() {
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    try {
      const response = await axios.post('http://127.0.0.1:8000/login/', formData); 
      const {access,refresh } = response.data; 
      console.log('access_token:',access)
      console.log('refresh_token',refresh)

      localStorage.setItem('access_token',access);
      localStorage.setItem('refresh_token',refresh);


      alert('Login successful!');
      navigate('/'); 
    } catch (error) {
      console.error('Error logging in:', error.response?.data || error.message);
      setError(error.response?.data?.detail || 'Invalid credentials. Please try again.');
    }
  };

  return (
    <div>
      <header>
        <div className="main-nav">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </div>
          <nav>
            <ul>
              <li><Link to="/">CRICKET BATS</Link></li>
              <li><Link to="/accessories">ACCESSORIES</Link></li>
            </ul>
          </nav>
          <div className="nav-icons">
             <Link to="/login"><img src={user} alt="User" /></Link>
                        
            <Link to="/cart"><img src={cart} alt="Cart" /></Link>
          </div>
        </div>
        <div className="customer-support">
        <p>Gujarat Sports</p>
        </div>
      </header>

      <main>
        <div className="login-form">
          <form onSubmit={handleSubmit} method='POST'>
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Link to="/forgot" className="forgot-password">Forgot password?</Link>
            <button type="submit" className="sign-in">SIGN IN</button>
            <Link to="/register" className="create-account">Create account</Link>
          </form>
        </div>
      </main>

      <footer>
        <ul>
        
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/privacy">Privacy Policy</Link></li>
          <li><Link to="/return-refund">Return & Refund Policy</Link></li>
          <li><Link to="/shipping">Shipping Policy</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <div className="social-media">
          <a href="https://www.instagram.com"><img src={insta} alt="Instagram" /></a>
          <a href="https://www.facebook.com"><img src={facebook} alt="Facebook" /></a>
          <a href="https://www.youtube.com"><img src={youtube} alt="YouTube" /></a>
        </div>
        <p>&copy; 2024 GujaratSports</p>
      </footer>
    </div>
  );
}

export default Login;
