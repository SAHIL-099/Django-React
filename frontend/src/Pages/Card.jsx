import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Authorize from './Authorize'; 

const Card = ({ product }) => {
    const navigate = useNavigate();
    const { userData } = Authorize(); 

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
