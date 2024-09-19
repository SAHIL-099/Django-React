import React from 'react';
import { useState,useEffect } from 'react';
import axios  from 'axios';
import Card from './Card.jsx';
import { Link } from 'react-router-dom';
import "../Css/hard_tennis.css";
import Authorize from './Authorize.jsx';
import { logo, search, user, cart, facebook, insta, youtube } from './images.js';


function Accessories() {
  const {isAuthenticated } = Authorize();
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
          {/* <div className="product">
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
          </div> */}

          {
          products.map((val,i)=>{
            return(
              <Card product={val} key={i}/>
            )
          })
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

export default Accessories;
