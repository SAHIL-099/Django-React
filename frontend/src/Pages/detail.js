import React from 'react';
import "../Css/detail.css";
import Authorize from './Authorize.jsx';
import { Link, useParams,useNavigate } from 'react-router-dom';
import { logo, cart, facebook, insta, youtube, user } from './images.js';
import axios from 'axios';
import { useEffect, useState } from 'react';



function Detail() {
    const { isAuthenticated,userData} = Authorize();
    const navigate = useNavigate();
    const { id } = useParams(); // Correctly get the product ID from URL
    const [product, setProduct] = useState(null);

    const handleAddToCart = async () => {
        try {
            const payload = {
                product_id: product.id,
                quantity: 1, 
            };
            if (!userData) {
                alert("User ID is not defined.");
                return;
            }

            // Make POST request to add the product to the user's cart
            const response = await axios.post(`http://127.0.0.1:8000/cart/${userData.id}/`, payload, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` },
            });

            if (response.status === 200) {
                alert("Item added to cart successfully!");
                navigate('/cart');
            } else {
                alert("Failed to add item to cart.");
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("Error adding item to cart.");
        }
    };


    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/product/${id}`)
            .then((response) => {
                setProduct(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
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
                            <li><Link to="/accessories">ACCESSORIES</Link></li>
                        </ul>
                    </nav>
                    <div className="nav-icons">
                      
                        {isAuthenticated ? (
                            <Link to="/profile"><img src={user} alt="User" /></Link>
                        ) : (
                            <Link to="/login"><img src={user} alt="User" /></Link>
                        )}
                        <Link to="/cart"><img src={cart} alt="Cart" /></Link>
                    </div>
                </div>
                <div className="customer-support">
                <p>Gujarat Sports</p>
                </div>
            </header>
            <main>
                <div className="product-container">
                    <img src={`http://127.0.0.1:8000${product.img}`} alt="batname" />
                    <div className="info">
                        <p className="name">{product.name}</p>
                        <br />
                        <p className="price">
                            <span className="original">Price Rs.{product.price}</span>
                        </p>
                        <br />
                        <div className="specifications">
                            <h2>Specifications:</h2>
                            {product.category === 'AC' ? (
                                <ul>
                                    <li>Description: {product.description}</li>
                                </ul>
                            ) : (
                                <ul>
                                    <li>Size: {product.size}</li>
                                    <li>Weight: {product.weight}</li>
                                    <li>Width: {product.width}</li>
                                    <li>Description: {product.description}</li>
                                </ul>
                            )}
                        </div>
                      <button className='addtocart' onClick={handleAddToCart}>Add to cart</button>
                        
                    </div>

                </div>
            </main>
            <footer>
                <ul>
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

export default Detail;
