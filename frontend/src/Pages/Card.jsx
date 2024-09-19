import React from "react";
import { Link } from 'react-router-dom';
const Card = ({product})=>{
    return(
        <div className="product">
        <Link to={`/detail/${product.id}`}><img src={`http://127.0.0.1:8000${product.img}`} alt={product.name} /></Link>
        <div className="info">
          <Link to={`/detail/${product.id}`}><p className="name">{product.name}</p></Link>
          <p className="price">
          <span className="original">Price Rs.{product.price}</span>
          </p>
        </div>
        <div className="buttons">
               <Link to={`/cart/${product.id}`}> <button className="add-to-cart">Add to cart</button></Link>
            </div>
      </div>
    
    )
}

export default Card