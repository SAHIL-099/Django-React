import React from 'react';
import { Link } from 'react-router-dom';
import "../Css/hard_tennis.css";
import { logo, search, user, cart, facebook, insta, youtube } from './images.js';
import img1 from "../images/AC/1.png";
import img2 from "../images/AC/2.png";
import img3 from "../images/AC/3.png";
import img4 from "../images/AC/4.png";

function Accessories() {
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
        <div className="test">
          <div className="product">
            <Link to="#"><img src={img1} alt="BANDOOK TRACTION CRICKET BAT GRIP 1 PIECE" /></Link>
            <div className="info">
              <p className="name">BANDOOK TRACTION CRICKET BAT GRIP 1 PIECE</p>
              <p className="savings">Rs. 99.00</p>
            </div>
            <div class="buttons">
                   <Link to="/cart"> <button class="add-to-cart">ADD TO CART</button></Link>
                </div>
          </div>

          <div className="product">
            <Link to="#"><img src={img2} alt="BANDOOK TRACTION CRICKET BAT GRIP 1 Piece" /></Link>
            <div className="info">
              <p className="name">BANDOOK TRACTION CRICKET BAT GRIP 1 Piece</p>
              <p className="savings">Rs. 99.00</p>
            </div>
            <div class="buttons">
                   <Link to="/cart"> <button class="add-to-cart">ADD TO CART</button></Link>
                </div>
          </div>

          <div className="product">
            <Link to="#"><img src={img3} alt="BANDOOK TRACTION CRICKET BAT GRIP - (RED-BLACK COLOR PACK OF 12)" /></Link>
            <div className="info">
              <p className="name">BANDOOK TRACTION CRICKET BAT GRIP - (RED-BLACK COLOR PACK OF 12)</p>
              <p className="savings">Save Rs. 899.00</p>
            </div>
            <div class="buttons">
                   <Link to="/cart"> <button class="add-to-cart">ADD TO CART</button></Link>
                </div>
          </div>

          <div className="product">
            <Link to="#"><img src={img4} alt="Chevron Cricket Bat Grip white - (pack of 10)" /></Link>
            <div className="info">
              <p className="name">Chevron Cricket Bat Grip white - (pack of 10)</p>
              <p className="savings">Rs. 999.00</p>
            </div>
            <div class="buttons">
                   <Link to="/cart"> <button class="add-to-cart">ADD TO CART</button></Link>
                </div>
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

export default Accessories;
