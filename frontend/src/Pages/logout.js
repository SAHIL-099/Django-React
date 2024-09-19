import React from 'react';
import axios from 'axios';
import "../Css/logout.css";  
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const refreshToken = localStorage.getItem('refresh_token');

            await axios.post('http://127.0.0.1:8000/logout/', { refresh: refreshToken });

            // Remove tokens from local storage
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');

            // Redirect to login page
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <>
        <div className='logout'>
        <h2>are you sure you want  to logout</h2>
          <button  className='btn'onClick={handleLogout}>
            Logout
        </button>
        </div>
        
        </>
       
      
    );
}

export default Logout;
