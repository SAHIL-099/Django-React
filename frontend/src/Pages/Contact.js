import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Css/contact.css'; 
import Authorize from './Authorize.jsx';
import { logo, cart, facebook, insta, youtube, user } from './images.js';
import axios from 'axios';

function Contact() {
  const { isAuthenticated } = Authorize();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile_no: '',
    query: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);  // Reset error state

    try {
      await axios.post('http://127.0.0.1:8000/contact/', formData);
      alert('We received your query. We will respond to you soon.');
      setFormData({ name: '', email: '', mobile_no: '', query: '' }); // Reset form
    } catch (error) {
      console.error('Error submitting query:', error.response.data);
      setError('There was an error sending your message. Please try again later.');
    } finally {
      setLoading(false);
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
         
            {isAuthenticated ? (
              <Link to="/profile"><img src={user} alt="User" /></Link>
            ) : (
              <Link to="/login"><img src={user} alt="User" /></Link>
            )}
            <Link to="/cart"><img src={cart} alt="Cart" /></Link>
          </div>
        </div>
        <div className="customer-support">
        <p>Gujarat Sports</p>
        </div>
      </header>

      <main>
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <h2>Contact Us</h2>
            {error && <p className="error-message">{error}</p>}
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              placeholder="Enter your name" 
              value={formData.name} 
              onChange={handleChange} 
              required
            />
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
            <label htmlFor="mobile">Mobile No</label>
            <input 
              type="tel" 
              id="mobile_no" 
              name="mobile_no" 
              maxLength={10} 
              placeholder="Enter your mobile no" 
              value={formData.mobile_no} 
              onChange={handleChange} 
            />
            <label htmlFor="message">Message</label>
            <textarea 
              id="message" 
              name="query" 
              rows="10" 
              cols="20" 
              placeholder="Write your query" 
              value={formData.query} 
              onChange={handleChange} 
              required
            ></textarea>
            <button type="submit" className="send" disabled={loading}>
              {loading ? 'Sending...' : 'Send'}
            </button>
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

export default Contact;
