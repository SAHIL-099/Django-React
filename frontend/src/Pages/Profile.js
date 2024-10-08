import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Authorize from './Authorize.jsx';
import "../Css/profile.css"; 
import { logo,  cart, facebook, insta, youtube, user } from './images.js';

function Profile() {
  const{isAuthenticated}=Authorize()
  const navigate = useNavigate();
  const genderChoices = {
    'M': 'Male',
    'F': 'Female',
    'O': 'Other'
};
  const [users, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  const handleLogout = async () => {
        try {
            // Remove tokens from local storage
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');

            // Redirect to login page
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          throw new Error('No access token found');
        }

        const response = await axios.get('http://127.0.0.1:8000/profile/', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>No user data available.</p>;
  }

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
        <div className="container">
          <h1>User Profile</h1>
          <div className="profile-info">
            <p><strong>Name:</strong> {users.fullname}</p>
            <p><strong>Email:</strong> {users.email}</p>
            <p><strong>Mobile No:</strong> {users.mobile}</p>
            <p><strong>Address:</strong> {users.address}</p>
            <p><strong>Gender:</strong> {genderChoices[users.gender]}</p>
          </div>
          <div className="profile-actions">
            <Link to="/edit-profile">
              <button>Edit Profile</button>
            </Link>
            <Link to="/orderlist">
              <button>View Order</button>
            </Link>
          </div>
              <p className='logout' onClick={handleLogout}>Logout</p>
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

export default Profile;
