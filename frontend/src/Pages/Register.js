  import React from 'react';
  import { Link,  useNavigate } from 'react-router-dom';
  import "../Css/register.css"; 
  import axios from 'axios'; 
  import { useState } from 'react';
  import { logo, search, cart, facebook, insta, youtube, user } from './images.js';

  function Register() {
    
    const [formData, setFormData] = useState({
      fullname: '',
      gender: '',
      email: '',
      password: '',
      address: '',
      mobile: '',
      img:null,
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
      const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value, // Handle file input
    });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = new FormData();
    data.append('fullname', formData.fullname);
    data.append('gender', formData.gender);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('address', formData.address);
    data.append('mobile', formData.mobile);
    if (formData.img) {
      data.append('img', formData.img); // Append image file if available
    }


      try {
        const response = await axios.post('http://127.0.0.1:8000/register/', data, {
          headers: { 'Content-Type': 'multipart/form-data' }, // Set header for file upload
        });  // Replace with your backend URL
        console.log(response.data);
        alert("User registered successfully!");
        navigate('/login');
      } catch (error) {
        console.error("Error registering user:",error.response.data);
        alert("Error registering user!");
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
            <form method='POST' onSubmit={handleSubmit} encType='multipart/form-data'>
            <label htmlFor="img">Profile Image:</label>
            <input type="file" id="img" name="img" onChange={handleChange} />
            <br/>
            <br/>
              <label htmlFor="fullname">Full Name:</label><br />

              <input type="text" id="fullname" name="fullname" placeholder="Full Name" value={formData.fullname} onChange={handleChange}  required/><br />

              <label htmlFor="gender">Gender:</label>
              <input type="radio" id="male" name="gender" value="M" onChange={handleChange} /> Male
              <input type="radio" id="female" name="gender" value="F" onChange={handleChange} /> Female
              <input type="radio" id="other" name="gender" value="O" onChange={handleChange} /> Other
              <br/>
              <br/>
              <label htmlFor="mobile">Mobile:</label>
              <input type="tel" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} required />

              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required/>

              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />

              <label htmlFor="address">Address:</label>
              <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required/>
           
              <button className='txt' type="submit">Create</button>
  
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
          <p>&copy; 2024 GujaratSports</p>
        </footer>
      </div>
    );
  }

  export default Register;
