import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import HardTennis from './Hardtennis'; 
import SoftTennis from './Softtennis';
import SeasonBat from './Sessionbat';
import Accessories from './Accessories';
import Login from './Login';
import Register from './Register';
import PrivacyPolicy from './Privacy';
import ShippingPolicy from './Shipping';
import Contact from './Contact';
import About from './about';
import ReturnRefund from './Returnrefund';
import Cart from './Cart';
import Profile from './Profile';
import Detail from './detail';
import Logout from './logout';
import Authorize from './Authorize';
import Order from './Order';
import EditProfile from './EditProfile';
import OrderDetail from './OrderDetail';
import OrderList from './OrderList';


function Main() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/hard-tennis" element={<HardTennis/>} />
                <Route path='/soft-tennis' element={<SoftTennis/>} />
                <Route path="/season-bats" element={<SeasonBat/>} />
                <Route path='/accessories' element={<Accessories/>} />
                <Route path='/about' element={<About/>} />
                <Route path='/shipping' element={<ShippingPolicy/>} />
                <Route path='/privacy' element={<PrivacyPolicy/>} />
                <Route path='/return-refund' element={<ReturnRefund/>} />
                <Route path='/contact' element={<Contact/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
                <Route path='/cart' element={<Cart/>} />
                <Route path='/profile' element={<Profile/>} />
                <Route path='/logout' element={<Logout/>} />
                <Route path='/detail/:id' element={<Detail/>} />
                <Route path='/authorize' element={<Authorize/>} />
                <Route path='/order' element={<Order/>} />
                <Route path="/edit-profile" element={<EditProfile />} />
                <Route path="/orders/:orderId" element={<OrderDetail />} />
                <Route path="/orderlist" element={<OrderList />} />
                {/* Add other routes here */}
            </Routes>
        </Router>
    );
}

export default Main;
