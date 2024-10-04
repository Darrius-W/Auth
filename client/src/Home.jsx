import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function Home(){

    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post('/newUser', { userName }, { withCredentials: true });
            
            if (response.status === 201){
                alert('Sign up Successful');
            }
            else{
                alert('Sign up Unsuccessful');
            }

        } catch(error){
            alert("ERROR: User already exists");
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post('/loginUser', { userName }, { withCredentials: true });
            if (response.status === 200){
                const data = { name: userName }
                alert('Login Successful');
                navigate("/Profile", { state: data });
            }
            else{
                alert('Login Unsuccessful');
            }

        } catch(error){
            alert("ERROR: User doesn't exists");
        }
    };


    return (
        <>
            <form onSubmit={ handleSignUp }>
                <h1>Sign Up:</h1><br></br>
                <input
                    id="userName"
                    type="text"
                    placeholder="Name..."
                    value={userName}
                    autoComplete="off"
                    required
                    onChange={(e) => setUserName(e.target.value)}
                />
                <button type="submit">Enter</button>
            </form>
            <form onSubmit={ handleLogin }>
                <h1>Login:</h1><br></br>
                <input
                    id="userName"
                    type="text"
                    placeholder="Name..."
                    value={userName}
                    autoComplete="off"
                    required
                    onChange={(e) => setUserName(e.target.value)}
                />
                <button type="submit">Enter</button>
            </form>
        </>
    );
}