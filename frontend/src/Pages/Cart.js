import React, { useState, useEffect } from 'react';
import { Link,useParams } from 'react-router-dom';
import axios from 'axios'; 
import '../Css/cart.css'; 
import Authorize from './Authorize.jsx';
import { logo, search, cart, facebook, insta, youtube, user } from './images.js';
function Cart() {
  const {isAuthenticated } = Authorize();

  const { id } = useParams(); // Correctly get the product ID from URL
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/cart/${id}`) 
            .then((response) => {
                setProduct(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [id]); 

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
            <Link to="#"><img src={cart} alt="Cart" /></Link>
          </div>
        </div>
        <div className="customer-support">
          <p>CUSTOMER SUPPORT - 1234567890 - 2244668899</p>
        </div>
      </header>

      <main>
        {!product ? (
          <div className="loading">
            <p>Loading your cart...</p>
          </div>
        ) : product.length === 0 ? (
          <div className="empty-cart">
            <h2>Your Cart is Empty</h2>
            <p>It looks like you haven't added any items to your cart yet. Start shopping to add items to your cart.</p>
            <Link to="/" className="btn-shop">Shop Now</Link>
          </div>
        ) : (
          <div className="cart-items">
            <h2>Your Cart</h2>
            <ul>
              {product.map((item, index) => (
                <li key={index} className="cart-item">
                  <img src={`http://127.0.0.1:8000${product.img}`} alt={item.name} />
                  <div className="item-details">
                    <h3>{item.product_name}</h3>
                    <p>{item.description}</p>
                    <p>Size: {item.size}</p>
                    <p>Weight: {item.weight}</p>
                    {/* <p>Quantity: {product.quantity}</p>
                    <p>Total Price: ${product.total_price}</p> */}
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-actions">
              <button className="btn-checkout">Proceed to Checkout</button>
              <Link to="/" className="btn-continue-shopping">Continue Shopping</Link>
            </div>
          </div>
        )}
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

export default Cart;
