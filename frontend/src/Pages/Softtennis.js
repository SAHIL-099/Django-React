import React from 'react';
import { Link } from 'react-router-dom';
import "../Css/hard_tennis.css";
import { logo, search, cart, facebook, insta, youtube } from './images.js';
import burn_4_scoop from "../images/ST/burn_4_scoop.png";
import diamond from "../images/ST/dimond.png";
import _4scoop from "../images/ST/4_scoop.png";
import _4scoop_2hole from "../images/ST/4_scoop_2hole.png";
import black_mamba from "../images/ST/black_mamba.png";
import smasher from "../images/ST/smasher.png";

function SoftTennis() {
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
            <Link to="/login"><img src={logo} alt="User" /></Link>
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
            <Link to="#"><img src={burn_4_scoop} alt="Bandook Bat Upper Blade Players Edition - Diamond Cut Burn Edition" /></Link>
            <div className="info">
              <p className="name">Kwesports Bandook Burn Edition Soft - Players Edition 4 scoop</p>
              <p className="price">
                <span className="original">Rs. 2,700.00</span>
                <span className="discounted">Rs. 2,300.00</span>
              </p>
              <p className="savings">Save Rs. 400.00</p>
            </div>
            <div class="buttons">
                   <Link to="/cart"> <button class="add-to-cart">ADD TO CART</button></Link>
                </div>
          </div>

          <div className="product">
            <Link to="#"><img src={diamond} alt="Bandook Bat Player Edition - light weight Soft Tennis Edition - Diamond Cut" /></Link>
            <div className="info">
              <p className="name">Bandook Bat Player Edition - light weight Soft Tennis Edition - Diamond Cut</p>
              <p className="price">
                <span className="original">Rs. 2,000.00</span>
                <span className="discounted">Rs. 1,700.00</span>
              </p>
              <p className="savings">Save Rs. 300.00</p>
            </div>
            <div class="buttons">
                   <Link to="/cart"> <button class="add-to-cart">ADD TO CART</button></Link>
                </div>
          </div>

          <div className="product">
            <Link to="#"><img src={_4scoop} alt="Bandook Bat Player Edition - light weight Soft Tennis Edition - 4 scoop" /></Link>
            <div className="info">
              <p className="name">Bandook Bat Player Edition - light weight Soft Tennis Edition - 4 scoop</p>
              <p className="price">
                <span className="original">Rs. 2,000.00</span>
                <span className="discounted">Rs. 1,700.00</span>
              </p>
              <p className="savings">Save Rs. 300.00</p>
            </div>
            <div class="buttons">
                   <Link to="/cart"> <button class="add-to-cart">ADD TO CART</button></Link>
                </div>
          </div>

          <div className="product">
            <Link to="#"><img src={_4scoop_2hole} alt="Bandook Bat Player Edition - light weight Soft Tennis Edition - 4 scoop 2 hole" /></Link>
            <div className="info">
              <p className="name">Bandook Bat Player Edition - light weight Soft Tennis Edition - 4 scoop 2 hole</p>
              <p className="price">
                <span className="original">Rs. 2,000.00</span>
                <span className="discounted">Rs. 1,700.00</span>
              </p>
              <p className="savings">Save Rs. 300.00</p>
            </div>
            <div class="buttons">
                   <Link to="/cart"> <button class="add-to-cart">ADD TO CART</button></Link>
                </div>
          </div>

          <div className="product">
            <Link to="#"><img src={black_mamba} alt="Black Mamba Light Weight Soft Tennis Edition - yellow color - Orange" /></Link>
            <div className="info">
              <p className="name">Black Mamba Light Weight Soft Tennis Edition - yellow color - Orange</p>
              <p className="price">
                <span className="original">Rs. 2,000.00</span>
                <span className="discounted">Rs. 1,800.00</span>
              </p>
              <p className="savings">Save Rs. 200.00</p>
            </div>
            <div class="buttons">
                   <Link to="/cart"> <button class="add-to-cart">ADD TO CART</button></Link>
                </div>
          </div>

          <div className="product">
            <Link to="#"><img src={smasher} alt="Kwesports Smasher Pro 2.0 Soft Tennis Bat" /></Link>
            <div className="info">
              <p className="name">Kwesports Smasher Pro 2.0 Soft Tennis Bat</p>
              <p className="price">
                <span className="original">Rs. 2,200.00</span>
                <span className="discounted">Rs. 1,900.00</span>
              </p>
              <p className="savings">Save Rs. 300.00</p>
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

export default SoftTennis;
