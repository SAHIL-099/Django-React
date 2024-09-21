import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import '../Css/cart.css'; 
import Authorize from './Authorize.jsx';
import { logo, search, cart, facebook, insta, youtube, user } from './images.js';

function Cart() {
  const { isAuthenticated, userData } = Authorize(); // Get user data and authentication status
  const [cartItems, setCartItems] = useState([]); 
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!isAuthenticated || !userData) return; // Exit if not authenticated or user data is unavailable

      try {
        const response = await axios.get(`http://127.0.0.1:8000/cart/${userData.id}/`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Use access token for authentication
          },
        });

        if (response.data && Array.isArray(response.data.items)) {
          setCartItems(response.data.items);
        } else {
          console.error("Expected items array but got:", response.data);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartItems();
  }, [isAuthenticated, userData]);

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
    setTotalAmount(total);
  }, [cartItems]);

  const increaseQuantity = (item) => {
    const updatedItems = cartItems.map(cartItem =>
      cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
    setCartItems(updatedItems);
  };

  const decreaseQuantity = (item) => {
    const updatedItems = cartItems.map(cartItem =>
      cartItem.id === item.id && cartItem.quantity > 1
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
    setCartItems(updatedItems);
  };

  const removeItem = async (cartItemId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/cart/remove-item/${cartItemId}/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      // Update the cartItems state to remove the item
      setCartItems(cartItems.filter(item => item.id !== cartItemId));
    } catch (error) {
      console.error("Error removing item:", error);
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
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h2>Your Cart is Empty</h2>
            <p>It looks like you haven't added any items to your cart yet. Start shopping to add items to your cart.</p>
            <Link to="/" className="btn-shop">Shop Now</Link>
          </div>
        ) : (
          <div className="cart-items">
            <h2>Your Cart</h2>
            <ul>  
              {cartItems.map((item, index) => (
                <li key={index} className="cart-item">
                  <img src={`http://127.0.0.1:8000${item.product.img}`} alt={item.product.name} />
                  <div className="item-details">
                    <h3>{item.product.name}</h3>
                    <p>{item.product.description}</p>
                    <p>Size: {item.product.size}</p>
                    <p>Weight: {item.product.weight}</p>
                    <div className="quantity-controls">
                     quantity: <button onClick={() => decreaseQuantity(item)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item)}>+</button>
                    </div>
                    <p>Total Price: Rs.{item.quantity * item.product.price}</p>
                    <button className ="rm" onClick={()=>removeItem(item.id)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-actions">
              <h3 className='total'>Total Amount: Rs.{totalAmount}</h3>
              <button className="btn-checkout">Order</button>
              <br />
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
