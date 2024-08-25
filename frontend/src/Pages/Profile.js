import React from 'react';
import { Link } from 'react-router-dom';
import "../Css/profile.css"; 
import { logo, search, cart, facebook, insta, youtube, user } from './images.js';
// Example user data. Replace this with your actual data source.
// const user = {
//   firstName: 'John',
//   lastName: 'Doe',
//   email: 'john.doe@example.com',
//   address: '123 Main St, Anytown, USA',
//   gender: 'Male'
// };

function Profile() {
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
          <h1>User Profile</h1>
          <div className="profile-info">
            <p><strong>First Name:</strong> {user.firstName}</p>
            <p><strong>Last Name:</strong> {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
          </div>
          <div className="profile-actions">
            <Link to="/edit-profile">
              <button>Edit Profile</button>
            </Link>
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
        <p>&copy; 2024 Kwesports</p>
      </footer>
    </div>
  );
}

export default Profile;
