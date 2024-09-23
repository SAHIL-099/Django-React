import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Css/order_list.css'; 
import Authorize from './Authorize.jsx';
import { logo, search, cart, facebook, insta, youtube, user } from './images.js';

function OrderList() {
  const{isAuthenticated}=Authorize()
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/orders/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load orders');
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div>{error}</div>;
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
    <div className="order-list-page">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        <ul className="order-list">
          {orders.map((order) => (
            <li key={order.id} className="order-item">
              <h3>Order:{order.id}</h3>
              {/* <p>Total Amount: Rs.{order.total_amount}</p> */}
              <p>Items:</p>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index} className="order-product">
                    <p>Product Id: {item.product}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: Rs.{item.price}</p>
                  </li>

                ))}
              </ul>
              <Link to={`/orders/${order.id}`} className="order-details-link">View Order Details</Link>
            </li>
          ))}
        </ul>
      )}
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

export default OrderList;
