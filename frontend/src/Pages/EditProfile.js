import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../Css/profile.css"; 
import Authorize from './Authorize.jsx';
import { logo, cart, facebook, insta, youtube, user } from './images.js';

function EditProfile() {
    const { isAuthenticated } = Authorize();
  const genderChoices = {
    'M': 'Male',
    'F': 'Female',
    'O': 'Other'
  };
  
  const [userData, setUserData] = useState({
    fullname: '',
    email: '',
    address: '',
    gender: 'M',
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        throw new Error('No access token found');
      }

      const response = await axios.put('http://127.0.0.1:8000/profile/', userData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.status === 200) {
        alert('Profile updated successfully!');
        navigate('/profile'); // Navigate back to the profile page
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Error updating profile');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
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
          <h1>Edit Profile</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullname"
                value={userData.fullname}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Mobile</label>
              <input
                type="tel"
                name="mobile"
                value={userData.mobile}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={userData.address}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select
                name="gender"
                value={userData.gender}
                onChange={handleInputChange}
              >
                {Object.entries(genderChoices).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit">Save Changes</button>
          </form>
          <Link to="/profile">
            <button>Cancel</button>
          </Link>
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
                    <Link to="https://www.instagram.com"><img src={insta} alt="Instagram" /></Link>
                    <Link to="https://www.facebook.com"><img src={facebook} alt="Facebook" /></Link>
                    <Link to="https://www.youtube.com"><img src={youtube} alt="YouTube" /></Link>
                </div>
                <p>&copy; 2024 GujaratSports</p>
            </footer>
    </div>
  );
}

export default EditProfile;
