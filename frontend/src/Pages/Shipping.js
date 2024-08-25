import React from 'react';
import { Link } from 'react-router-dom';
import "../Css/shipping.css";

import { logo, search, cart, facebook, insta, youtube, user } from './images.js';

function ShippingPolicy() {
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
        <div className="ship">
          <h1>Shipping Policy</h1>
          <p>Within India we offer free shipping and for international orders we charge as per the volumetric weight and rates will be confirmed by us from our courier partner.</p>
          <ul type="circle">
            <li>Within India – Orders are sent through local couriers like dtdc, trackon & India post – allow 4-6 business days for the delivery.</li>
            <li>Rest of World - Orders are sent through DHL Express or DTDC. Allow 6 to 9 business days for delivery.</li>
          </ul>
        </div>

        <div className="test">
          <h2>WHAT HAPPENS TO MY SHIPPING CHARGES IF I RETURN AN ITEM?</h2>
          <p>&rarr; Worry not we will reship the product for you and will not charge you anything.</p>
          <h2>WHAT HAPPENS IF MY PARCEL GOES MISSING?</h2>
          <p>&rarr; All tracked parcels are insured to the value of your order. A new order will be sent out to you upon a lost parcel confirmation from the respective courier confirmation.</p>
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

export default ShippingPolicy;
