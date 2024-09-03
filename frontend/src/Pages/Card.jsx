import React from "react";
import { Link } from 'react-router-dom';
// import diamond_shape from "../images/HT/dimond_shape.png";

const Card = (prop)=>{
    return(
        <div className="product">
        <Link to="#"><img src={prop.product.img} alt={prop.product.name} /></Link>
        <div className="info">
          <Link to="#"><p className="name">{prop.product.name}</p></Link>
          <p className="price">
            <span className="original">Rs. 2,300.00</span>
            <span className="discounted">Rs. 1,950.00</span>
          </p>
          <p className="savings">Save {prop.product.price}</p>
        </div>
        <div class="buttons">
               <Link to="/cart"> <button class="add-to-cart">ADD TO CART</button></Link>
            </div>
      </div>
    )
}

export default Card