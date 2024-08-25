import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../Css/hard_tennis.css";
import { logo, search, cart, facebook, insta, youtube, user } from './images.js';
import _4scoop_2hole from "../images/HT/4_scoop_2hole.png";
import _4scoop from "../images/HT/4_scoop.png";
// import diamond_shape from "../images/HT/dimond_shape.png";
// import upperblade from "../images/HT/upperbalde.png";
import axios from 'axios';
import { useEffect } from 'react';
import  Card from './Card.jsx'

function Hardtennis() {

  const [products, setProducts] = useState([])
  useEffect(()=>{
    axios.get("http://127.0.0.1:8000/product/").then((data)=>{
        setProducts(data.data)
    })
    .catch((e)=>{console.log(e)})
},[])
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
        {/* <div className="test">
          <div className="product">
            <Link to="burnedition.html">
              <img src={upperblade} alt="Bandook Bat Upper Blade Players Edition - Diamond Cut Burn Edition" />
            </Link>
            <div className="info">
              <Link to="burnedition.html">
                <p className="name">BANDOOK BAT UPPER BLADE PLAYERS EDITION - DIAMOND CUT BURN EDITION</p>
              </Link>
              <p className="price">
                <span className="original">Rs. 3,500.00</span>
                <span className="discounted">Rs. 3,000.00</span>
              </p>
              <p className="savings">Save Rs. 500.00</p>
            </div>
            <div class="buttons">
                   <Link to="/cart"> <button class="add-to-cart">ADD TO CART</button></Link>
                </div>
          </div>

          <div className="product">
            <Link to="#"><img src={diamond_shape} alt="Kwesports Bandook bat Diamond Cut Kashmir Willow Hard Tennis Bat" /></Link>
            <div className="info">
              <Link to="#"><p className="name">Kwesports Bandook bat Diamond Cut Kashmir Willow Hard Tennis Bat</p></Link>
              <p className="price">
                <span className="original">Rs. 2,300.00</span>
                <span className="discounted">Rs. 1,950.00</span>
              </p>
              <p className="savings">Save Rs. 350.00</p>
            </div>
            <div class="buttons">
                   <Link to="/cart"> <button class="add-to-cart">ADD TO CART</button></Link>
                </div>
          </div>

          <div className="product">
            <Link to="#"><img src={_4scoop} alt="Kwesports Bandook bat 4 Scoop Cut Kashmir Willow Hard Tennis Bat" /></Link>
            <div className="info">
              <Link to="#"><p className="name">Kwesports Bandook bat 4 Scoop Cut Kashmir Willow Hard Tennis Bat</p></Link>
              <p className="price">
                <span className="original">Rs. 2,300.00</span>
                <span className="discounted">Rs. 1,950.00</span>
              </p>
              <p className="savings">Save Rs. 350.00</p>
            </div>
            <div class="buttons">
                   <Link to="/cart"> <button class="add-to-cart">ADD TO CART</button></Link>
                </div>
          </div>

          <div className="product">
            <Link to="#"><img src={_4scoop_2hole} alt="Kwesports Bandook bat 4 Scoop 2 Hole Kashmir Willow Hard Tennis Bat" /></Link>
            <div className="info">
              <Link to="#"><p className="name">Kwesports Bandook bat 4 Scoop 2 Hole Kashmir Willow Hard Tennis Bat</p></Link>
              <p className="price">
                <span className="original">Rs. 2,300.00</span>
                <span className="discounted">Rs. 1,950.00</span>
              </p>
              <p className="savings">Save Rs. 350.00</p>
            </div>
            <div class="buttons">
                   <Link to="/cart"> <button class="add-to-cart">ADD TO CART</button></Link>
                </div>
          </div>
        </div> */}

        {
          products.map((val,i)=>{
            return(
              <Card product={val} key={i}/>
            )
          })
        }
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

export default Hardtennis;
