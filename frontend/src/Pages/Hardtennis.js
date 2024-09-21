import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../Css/hard_tennis.css";
import Authorize from './Authorize.jsx';
import { logo, search, cart, facebook, insta, youtube, user } from './images.js';
import axios from 'axios';
import { useEffect } from 'react';
import Card from './Card.jsx'
function Hardtennis() {
  const {isAuthenticated } = Authorize();
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/product/").then((data) => {
      setProducts(data.data)
    })
      .catch((e) => {console.log(e) })
  }, [])

  
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
      </header>

      <main>
      <div className="test">
      {
          products
          .filter((product) => product.category ==="HT")
            .map((val,i) => (
              <Card product={val} key={i} />
            ))

        }
        
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

export default Hardtennis;
