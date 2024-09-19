
import {Link} from 'react-router-dom';
import "../Css/styles.css";
import Authorize from './Authorize.jsx';
import { logo, search, cart, facebook, insta, youtube, user, hard_tennis_bat, soft_tennis_bat, session_bat, grip } from './images.js';

function Home() {
    
    const {isAuthenticated} = Authorize();
    console.log(isAuthenticated)
    
    return (
        <div>
            <header>
                <div className="main-nav">
                    <div className="logo">
                        <Link to="/"><img src={logo} alt="Logo" /></Link>
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
                <section className="product-categories">
                    <div className="category">
                        <Link to="/hard-tennis"><img src={hard_tennis_bat} alt="Hard Tennis Bats" /></Link>
                        <Link to="/hard-tennis"><h2>Hard Tennis Bats</h2></Link>
                        <Link to="/hard-tennis"><button>Catalog</button></Link>
                    </div>
                    <div className="category">
                        <Link to="/soft-tennis"><img src={soft_tennis_bat} alt="Soft Tennis Bats" /></Link>
                        <Link to="/soft-tennis"><h2>Soft Tennis Bats</h2></Link>
                        <Link to="/soft-tennis"><button>Catalog</button></Link>
                    </div>
                    <div className="category">
                        <Link to="/season-bats"><img src={session_bat} alt="Season Bats" /></Link>
                        <Link to="/season-bats"><h2>Season Bats</h2></Link>
                        <Link to="/season-bats"><button>Catalog</button></Link>
                    </div>
                    <div className="category">
                        <Link to="/accessories"><img src={grip} alt="Accessories" /></Link>
                        <Link to="/accessories"><h2>Accessories</h2></Link>
                        <Link to="/accessories"><button>Catalog</button></Link>
                    </div>
                </section>

                <section className="contact-info">
                    <h2>Our Retail Store</h2>
                    <p>Address: Kwesports, Laam Agricultural Rd, Srinagar, Jammu and Kashmir, 191121 India</p>
                    <p>Phone: 9149774400, 9055612325</p>
                    <p>Email: kashmirwillows@gmail.com</p>
                    <p>Mon-Sat: 9:00am - 5:30pm, Sunday: Closed</p>
                    <button>Get Directions</button>
                </section>
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
                    <Link to="https://www.instagram.com"><img src={insta} alt="Instagram" /></Link>
                    <Link to="https://www.facebook.com"><img src={facebook} alt="Facebook" /></Link>
                    <Link to="https://www.youtube.com"><img src={youtube} alt="YouTube" /></Link>
                </div>
                <p>&copy; 2024 GujaratSports</p>
            </footer>
        </div>
    );
}

export default Home;
