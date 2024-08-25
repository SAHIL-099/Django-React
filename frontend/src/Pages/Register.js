import React from 'react';
import { Link } from 'react-router-dom';
import "../Css/register.css"; 

import { logo, search, cart, facebook, insta, youtube, user } from './images.js';

function Register() {
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
        <div className="container">
          <h1>Create Account</h1>
          <form method='POST'>
            <label For="fname">First Name:</label><br />
            <input type="text" id="fname" name="fname" placeholder="First Name" /><br />
            
            <label For="lname">Last Name:</label><br />
            <input type="text" id="lname" name="lname" placeholder="Last Name" /><br />

            <label For="gender">Gender:</label><br/>
    
          <input type="radio" id="male" name="gender" value="male" />
                Male
          <input type="radio" id="female" name="gender" value="female" />
              Female
            <br />
            <br/>

            <label For="email">Email:</label><br />
            <input type="email" id="email" name="email" placeholder="Email" /><br />
            
            <label htmlFor="password">Password:</label><br />
            <input type="password" id="password" name="password" placeholder="Password" /><br /><br />
            
            <label htmlFor="address">Address:</label><br />
            <input type="text" id="address" name="address" placeholder="Address" /><br />
            <button type="submit">CREATE</button>
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

export default Register;
