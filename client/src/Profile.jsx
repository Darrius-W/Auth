import { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

export default function Profile(){

    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;
    const [userName, setUserName] = useState(data.name);

    const handleLogout = async () => {
        try{
            const response = await axios.post('https://auth-vxls.onrender.com/Logout', {}, { withCredentials: true });

            if (response.status === 200){
                // Redirect to login page
                navigate("/");
            }
            else{
                alert('Error logging out');
            }
        } catch(error){
            alert('Error logging out');
        }
    };

    return (
        <>
            <h1>Current user: {userName}</h1><br></br>
            <button onClick={handleLogout}>Logout</button>
        </>
    );
}