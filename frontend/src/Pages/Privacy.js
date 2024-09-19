import React from 'react';
import { Link } from 'react-router-dom';
import "../Css/privacy.css"; 
import Authorize from './Authorize.jsx';
import { logo, search, cart, facebook, insta, youtube, user } from './images.js';

function PrivacyPolicy() {
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
              <li><Link to="/">ACCESSORIES</Link></li>
            </ul>
          </nav>
          <div className="nav-icons">
            <Link to="#"><img src={search} alt="Search" /></Link>
            {isAuthenticated ? (
                            <Link to="/profile"><img src={user} alt="User" /></Link>
                        ) : (
                            <Link to="/login"><img src={user} alt="User" /></Link>
                        )}
            <Link to="/cart"><img src={cart} alt="Cart" /></Link>
          </div>
        </div>
        <div className="customer-support">
          <p>CUSTOMER SUPPORT - 1234567890 - 2244668899</p>
        </div>
      </header>

      <main>
        <div className="test">
          <h1>Privacy Policy</h1>
          <div className="inner">
            <h2>How We Collect and Use Your Personal Information</h2>
            <p>
              To provide the Services, we collect and have collected over the past 12 months personal information about you from a variety of sources, as set out below. The information that we collect and use varies depending on how you interact with us.
              In addition to the specific uses set out below, we may use information we collect about you to communicate with you, provide the Services, comply with any applicable legal obligations, enforce any applicable terms of service, and to protect or defend the Services, our rights, and the rights of our users or others.
            </p>
            
            <h2>Information We Collect Directly from You</h2>
            <ul>
              <li><b>Basic contact details</b> including your name, address, phone number, email.</li>
              <li><b>Order information</b> including your name, billing address, shipping address, payment confirmation, email address, phone number.</li>
            </ul>

            <h2>How We Use Your Personal Information</h2>
            <ul>
              <li><b>Providing Products and Services</b> We use your personal information to provide you with the Services in order to perform our contract with you, including to process your payments, fulfill your orders, to send notifications to you related to your account, purchases, returns, exchanges or other transactions, to create, maintain and otherwise manage your account, to arrange for shipping, facilitate any returns and exchanges and to enable you to post reviews.</li>
              <li><b>Marketing and Advertising</b> We use your personal information for marketing and promotional purposes, such as to send marketing, advertising and promotional communications by email, text message or postal mail, and to show you advertisements for products or services. This may include using your personal information to better tailor the Services and advertising on our Site and other websites.</li>
              <li><b>Security and Fraud Prevention</b> We use your personal information to detect, investigate or take action regarding possible fraudulent, illegal or malicious activity. If you choose to use the Services and register an account, you are responsible for keeping your account credentials safe. We highly recommend that you do not share your username, password, or other access details with anyone else. If you believe your account has been compromised, please contact us immediately.</li>
              <li><b>Communicating with you</b> We use your personal information to provide you with customer support and improve our Services. This is in our legitimate interests in order to be responsive to you, to provide effective services to you, and to maintain our business relationship with you.</li>
            </ul>
          </div>
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
        <p>&copy; 2024 GujaratSports</p>
      </footer>
    </div>
  );
}

export default PrivacyPolicy;
