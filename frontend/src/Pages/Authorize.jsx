import { useState, useEffect } from "react";
import axios from "axios";

function Authorize() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('access_token');
            console.log("Token:", token);
            if (!token) {
                console.log("No token found, user is not authenticated.");
                setIsAuthenticated(false);
                return;
            }

            try {
                 const response=await axios.get('http://127.0.0.1:8000/check-auth/', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'

                    }
                
                });
                setIsAuthenticated(response.status === 200);
                // setIsAuthenticated(true)
            } catch (error) {
               
                console.error("Authorization failed:", error.response?.data || error.message);
                setIsAuthenticated(false);
            }   
        };
        checkAuth();
    }, []);

    return { isAuthenticated };
}

export default Authorize;
