import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../Css/order.css'; 
import axios from 'axios';
import Authorize from './Authorize.jsx';
import { logo, search, cart, facebook, insta, youtube, user } from './images.js';

function Order() {
  const {isAuthenticated} = Authorize();
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const { cartItems, totalAmount } = location.state || { cartItems: [], totalAmount: 0 };

  async function handleOrder() {
    const orderData = {
      items: cartItems.map(item => ({
        product: item.product.id,
        name:item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      })),
      total_amount: totalAmount,

      // Add other necessary fields like customer info, shipping address, etc.
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/orders/create/', orderData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
    });
    if (response.status === 201) {
      // Clear the cart after placing the order
      await axios.delete('http://127.0.0.1:8000/cart/clear/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      navigate(`/orders/${response.data.id}`);
    } else {
        alert('Failed to place order');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
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
        <div className="order-summary">
          <h2>Order Summary</h2>
          {cartItems.length === 0 ? (
            <p>No items in the order.</p>
          ) : (
            <div className="order-details">
              <ul>
                {cartItems.map((item, index) => (
                  <li key={index} className="order-item">
                    <img src={`http://127.0.0.1:8000${item.product.img}`} alt={item.product.name} />
                    <div className="item-details">
                      <h3>{item.product.name}</h3>
                      <p>Price: Rs.{item.product.price}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Total: Rs.{item.quantity * item.product.price}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <h3 className='total'>Total Amount: Rs.{totalAmount}</h3>
              <div className="order-actions">
                <button onClick={handleOrder}>Place Order</button>
              </div>
            </div>
          )}
          <Link to="/" className="btn-continue-shopping">Continue Shopping</Link>
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

export default Order;
