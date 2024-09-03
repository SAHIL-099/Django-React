import React from 'react';
import { Link } from 'react-router-dom';
import "../Css/hard_tennis.css";
import { logo, search, user, cart, facebook, insta, youtube } from './images.js';
import rs from "../images/SB/rs.png";
import vk from "../images/SB/vk.png";
import gill from "../images/SB/gill.png";
import msd from "../images/SB/msd.png";

function SeasonBat() {
  const [products, setProducts] = useState([])
  useEffect(()=>{
    axios.get("http://127.0.0.1:8000/product/").then((data)=>{
        setProducts(data.data)
    })
    .catch((e)=>{console.log(e)})
},[])
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
            <Link to="/login"><img src={user} alt="User" /></Link>
            <Link to="/cart"><img src={cart} alt="Cart" /></Link>
          </div>
        </div>
        <div className="customer-support">
          <p>CUSTOMER SUPPORT - 1234567890 - 2244668899</p>
        </div>
      </header>

      <main>
        <div className="test">
          {/* <div className="product">
            <Link to="#"><img src={rs} alt="Kwesports Training Edition - Season Cricket Bat" /></Link>
            <div className="info">
              <p className="name">Kwesports Training Edition - Season Cricket Bat</p>
              <p className="price">
                <span className="original">Rs. 2,300.00</span>
                <span className="discounted">Rs. 2,000.00</span>
              </p>
              <p className="savings">Save Rs. 300.00</p>
            </div>
            <div class="buttons">
                   <Link to="/cart"> <button class="add-to-cart">ADD TO CART</button></Link>
                </div>
          </div>

          <div className="product">
            <Link to="#"><img src={vk} alt="HYBRID VK18 EDITION" /></Link>
            <div className="info">
              <p className="name">HYBRID VK18 EDITION</p>
              <p className="price">
                <span className="original">Rs. 3,300.00</span>
                <span className="discounted">Rs. 3,000.00</span>
              </p>
              <p className="savings">Save Rs. 300.00</p>
            </div>
            <div class="buttons">
                   <Link to="/cart"> <button class="add-to-cart">ADD TO CART</button></Link>
                </div>
          </div>

          <div className="product">
            <Link to="#"><img src={gill} alt="Gill77 - Player's Edition Season Cricket Bat" /></Link>
            <div className="info">
              <p className="name">Gill77 - Player's Edition Season Cricket Bat</p>
              <p className="price">
                <span className="original">Rs. 4,500.00</span>
                <span className="discounted">Rs. 4,000.00</span>
              </p>
              <p className="savings">Save Rs. 500.00</p>
            </div>
            <div class="buttons">
                   <Link to="/cart"> <button class="add-to-cart">ADD TO CART</button></Link>
                </div>
          </div>

          <div className="product">
            <Link to="#"><img src={msd} alt="Kwesports Bandook bat 4 Scoop 2 Hole Kashmir Willow Hard Tennis Bat" /></Link>
            <div className="info">
              <p className="name">Kwesports Bandook bat 4 Scoop 2 Hole Kashmir Willow Hard Tennis Bat</p>
              <p className="price">
                <span className="original">Rs. 5,100.00</span>
                <span className="discounted">Rs. 4,500.00</span>
              </p>
              <p className="savings">Save Rs. 600.00</p>
            </div>
            <div class="buttons">
                   <Link to="/cart"> <button class="add-to-cart">ADD TO CART</button></Link>
                </div>
          </div> */}

          {
          products.map((val,i)=>{
            return(
              <Card product={val} key={i}/>
            )
          })
        }
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
        <p>&copy; 2024 Kwesports</p>
      </footer>
    </div>
  );
}

export default SeasonBat;
