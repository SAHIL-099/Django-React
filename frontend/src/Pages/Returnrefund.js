import React from 'react';
import { Link } from 'react-router-dom';
import "../Css/return_refund.css"; 
import Authorize from './Authorize.jsx';

import { logo, cart, facebook, insta, youtube, user } from './images.js';

function ReturnRefund() {
  const {isAuthenticated } = Authorize();
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
        <div className="rr">
          <h1>Return & Refund Policy</h1>
          <ol type="1">
            <li>Araldite application is a prerequisite for warranty claim on the bat.</li>
            <li>Damaged bats must be returned to Gujarat Sports office for warranty claim; failure to do so forfeits the claim.</li>
            <li>Customer bears shipping charges for returning damaged bat.</li>
            <li>Video and photo evidence of non-physical damage required for warranty claim.</li>
            <li>Confirmation from the damage and return team is necessary before sending back the bat; failure to confirm may result in forfeiture unless shipping charges are paid.</li>
            <li>Bat must break due to a ball after providing videos and photos for a warranty claim.</li>
            <li>No refund for broken bats; replacement is the only option.</li>
            <li>One replacement per customer; no second-time replacement allowed.</li>
            <li>Replacement bat will match the original order; no changes allowed by paying extra.</li>
            <li>No refund policy; refund only available within 24 hours of payment with valid and transparent reasons.</li>
            <li>Exchange policy available for receiving a different product; share images and videos of the received bat.</li>
          </ol>
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

export default ReturnRefund;
