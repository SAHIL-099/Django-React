import React, { useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import axios from 'axios';
import Authorize from './Authorize';
import '../Css/order_detail.css'; // Create a CSS file for styles if needed
import { logo, search, cart, facebook, insta, youtube, user } from './images.js';
function OrderDetail() {
 const{isAuthenticated}=Authorize()
  const {orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
        console.log("order id :",orderId)
      try {
        const response = await axios.get(`http://127.0.0.1:8000/orders/${orderId}/`, { // Update with your endpoint
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Adjust for your auth method
          },
        });

        if (response.status === 200) {
        console.log('Fetched order data:', response.data); 
          setOrder(response.data);
        } else {
          alert('Failed to fetch order details');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [orderId]);

  if (loading) return <p>Loading...</p>;
  if (!order) return <p>No order found.</p>;

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
  <div className="order-item-detail">
    <h2>Order Detail</h2>
    <h3 className='oid'>Order ID: {order.id}</h3>
    <ul className="order-items-list">
      {order.items.map((item, index) => (
        <li key={index} className="order-item">
          <h3>{item.product.name}</h3>
          <div className="product-details">
            <p><strong>Price:</strong> Rs.{item.product.price}</p>
            <p><strong>Quantity:</strong> {item.quantity}</p>
            <p><strong>Total:</strong> Rs.{item.quantity * item.product.price}</p>
          </div>
        </li>
      ))}
    </ul>
    <h3 className="order-total">Total Amount: Rs.{order.total_amount}</h3>
    <h4 className="delivery-status">Delivery Status: {order.status}</h4>
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

export default OrderDetail;
