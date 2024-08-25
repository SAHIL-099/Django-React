import React from 'react';
import { Link } from 'react-router-dom';
import '../Css/contact.css'; 
import { logo, search, cart, facebook, insta, youtube, user } from './images.js';

function Contact() {
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
              <li><Link to="/">ACCESSORIES</Link></li>
            </ul>
          </nav>
          <div className="nav-icons">
            <Link to="#"><img src={search} alt="Search" /></Link>
            <Link to="/login"><img src={user} alt="User" /></Link>
            <Link to="/cart"><img src={cart} alt="Cart" /></Link>
          </div>
        </div>
        <div className="customer-support">
          <p>CUSTOMER SUPPORT - 1234567890 - 2244668899</p>
        </div>
      </header>

      <main>
        <div className="login-form">
          <form>
            <h2>Contact Us</h2>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Enter your name" />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" />
            <label htmlFor="mobile">Mobile No</label>
            <input type="tel" id="mobile" name="mobile" placeholder="Enter your mobile no" />
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="10" cols="20" placeholder="Write your query"></textarea>
            <button type="submit" className="send">Send</button>
          </form>
        </div>
      </main>

      <footer>
        <ul>
          <li><Link to="#">Track Order</Link></li>
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
        <p>&copy; 2024 Kwesports</p>
      </footer>
    </div>
  );
}

export default Contact;
