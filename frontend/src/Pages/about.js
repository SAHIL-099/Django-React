import React from 'react';
import { Link } from 'react-router-dom';
import "../Css/about.css";
import Authorize from './Authorize.jsx';
import { logo, user, cart, facebook, insta, youtube } from './images.js';

function About() {
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
        <h1>About Us</h1>
        <div className="about">
          <p>
            We manufacture high-quality cricket bats made of pure Kashmir willow grade 1 and Kashmir willow grade 1+.
            <br /><br />
            If you would like to make a customized bat or you want your type of bat, please contact us on WhatsApp +919149774400 or directly call us on +919149774400. We have dedicated customer support for your assessment which will get in touch with you.
            <br /><br />
            Our Core Services are custom-made cricket bats, full customized Scoop Bats & Season Bats made of pure Kashmir Willow Grade 1 with high-quality wood premium finish, with toe protection, fully knocked under professional guidance. We also deliver throughout India and other countries as well. To know more or order your customized bat please directly WhatsApp or call us on +919149774400.
            <br /><br />
            If you would like to open up your own Kwesports franchise or you want your choice of customized bats, please contact our Sales Team - 8899080389.
          </p>
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

export default About;
