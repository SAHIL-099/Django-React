import React from 'react';
import './burnedition.css'; // Import the CSS file

function BurnEdition() {
    return (
        <div>
            <header>
                <div className="main-nav">
                    <div className="logo">
                        <a href="index.html"><img src={require('./images/logo.jpg')} alt="Logo" /></a>
                    </div>
                    <nav>
                        <ul>
                            <li><a href="index.html">CRICKET BATS</a></li>
                            <li><a href="index.html">ACCESSORIES</a></li>
                        </ul>
                    </nav>
                    <div className="nav-icons">
                        <a href="#"><img src={require('./images/search.jpg')} alt="Search" /></a>
                        <a href="login.html"><img src={require('./images/user.jpg')} alt="User" /></a>
                        <a href="#"><img src={require('./images/cart.jpg')} alt="Cart" /></a>
                    </div>
                </div>
                <div className="customer-support">
                    <p>CUSTOMER SUPPORT - 1234567890 - 2244668899</p>
                </div>
            </header>

            <main>
                <div className="product-container">
                    <h2>KWESPORTS Bandook Bat Upper Blade Players Edition - Diamond Cut Burn Edition</h2>

                    <img src={require('./images/HT/upperbalde.png')} alt="Upper Blade" />
                    <div className="info">
                        <a href="#"><p className="name">KWESPORTS Bandook Bat Upper Blade Players Edition - Diamond Cut Burn Edition</p></a>
                        <p className="price">
                            <span className="original">Rs. 2,300.00</span>
                            <span className="discounted">Rs. 1,950.00</span>
                        </p>
                        <p className="savings">Save Rs. 350.00</p>
                    </div>
                    <div className="select-options">
                        <label htmlFor="bat-size">SELECT YOUR BAT SIZE</label>
                        <select id="bat-size">
                            <option value="34 inches">34 inches</option>
                            <option value="35.5 inches">35.5 inches</option>
                        </select>
                        <label htmlFor="bat-weight">SELECT YOUR BAT WEIGHT</label>
                        <select id="bat-weight">
                            <option value="1000-1050 grams">1000-1050 grams</option>
                            <option value="1050-1100 grams">1050-1100 grams</option>
                            <option value="1100-1150 grams">1100-1150 grams</option>
                        </select>
                    </div>
                    <p>FREE SHIPPING WITHIN INDIA ONLY</p>
                    <p>In stock, ready to ship</p>
                    <div className="buttons">
                        <a href="cart.html"><button className="add-to-cart">ADD TO CART</button></a>
                        <a href="buy.html"><button className="buy-now">BUY IT NOW</button></a>
                    </div>
                    <div className="specifications">
                        <h2>Specifications:</h2>
                        <ul>
                            <li>Recommended for 145 gram & 135 gram Heavy Hard Tennis balls</li>
                            <li>Warranty: 6 months on the complete bat (Blade & Handle)</li>
                            <li>Width: 4.3 inches under</li>
                            <li>Edge Size: 2 inches (50-55MM) - Delivering Optimum Power and Performance</li>
                            <li>Spine: 3 inches (67-70MM) - Ensuring Exceptional Balance and Sweet Spot</li>
                            <li>Toe Thickness: 1.5 inches (25-30MM) - Enhancing Pick-up and Bat Speed</li>
                            <li>Weight: 1050-1090 Grams - Striking the Perfect Balance between Power and Maneuverability</li>
                            <li>Bat Height/Sizes: Available in lengths of 34 and 35 inches</li>
                        </ul>
                    </div>
                </div>
            </main>

            <footer>
                <ul>
                    <li><a href="#">Track Order</a></li>
                    <li><a href="about.html">About Us</a></li>
                    <li><a href="privacy.html">Privacy Policy</a></li>
                    <li><a href="return_refund.html">Return & Refund Policy</a></li>
                    <li><a href="shipping.html">Shipping Policy</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
                <div className="social-media">
                    <a href="https://www.instagram.com"><img src={require('./images/insta.jpg')} alt="Instagram" /></a>
                    <a href="https://www.facebook.com"><img src={require('./images/facebook.jpg')} alt="Facebook" /></a>
                    <a href="https://www.youtube.com"><img src={require('./images/youtube.jpg')} alt="YouTube" /></a>
                </div>
                <p>&copy; 2024 Kwesports</p>
            </footer>
        </div>
    );
}

export default BurnEdition;
