import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Authorize from './Authorize'; // Adjust the import path

const Card = ({ product }) => {
    const navigate = useNavigate();
    const { isAuthenticated } = Authorize(); // Check authentication

    const handleAddToCart = async () => {
        try {
            const payload = {
                product_id: product.id,
                quantity: 1,  // Default quantity
            };

            if (!isAuthenticated) {
                alert("Please log in to add items to your cart.");
                return;
            }

            // Get the user ID from local storage or a global state if needed
            const userId = localStorage.getItem('user_id'); // Assuming you store user ID

            // Make POST request to add the product to the user's cart
            const response = await axios.post(`http://127.0.0.1:8000/cart/${userId}/`, payload);

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

    return (
        <div className="product">
            <Link to={`/detail/${product.id}`}>
                <img src={`http://127.0.0.1:8000${product.img}`} alt={product.name} />
            </Link>
            <div className="info">
                <Link to={`/detail/${product.id}`}>
                    <p className="name">{product.name}</p>
                </Link>
                <p className="price">
                    <span className="original">Price Rs.{product.price}</span>
                </p>
            </div>
            <div className="buttons">
                <button className="add-to-cart" onClick={handleAddToCart}>
                    Add to cart
                </button>
            </div>
        </div>
    );
};

export default Card;
