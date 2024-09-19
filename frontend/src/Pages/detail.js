    import React from 'react';
    import "../Css/detail.css"; 
    import Authorize from './Authorize.jsx';
    import { Link,useParams } from 'react-router-dom';
    import { logo, search, cart, facebook, insta, youtube, user } from './images.js';
    import axios from 'axios';
    import { useEffect,useState} from 'react';



    function Detail() {
        const {isAuthenticated } = Authorize();
        const { id } = useParams(); // Correctly get the product ID from URL
    const [product, setProduct] = useState(null);

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
                    <div className="product-container">
                        <img src={`http://127.0.0.1:8000${product.img}`} alt="batname" />
                        <div className="info">
                            <a href="#"><p className="name">{product.name}</p></a>
                            <br/>
                            <p className="price">
                                <span className="original">Rs. 2,300.00</span>
                            </p>
                            <br/>
                            <div className="specifications">
                            <h2>Specifications:</h2>
                            <ul>
                                <li>Size:{product.size}</li>
                                <li>Weight:{product.weight}</li>
                                <li>width:{product.width}</li>
                                <li>Description:    {product.description}</li>
                            </ul>
                        </div>
                        <Link to={`/cart/${product.id}`}><button className='addtocart'>Add to cart</button> </Link>
                    <br/>
                    <Link to={`/buy/${product.id}`}><button className='buynow'> Buy Now</button></Link>
                        </div>
                        
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

    export default Detail;
