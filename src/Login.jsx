import React from "react";

import { useState, useContext } from "react";
import axios from 'axios';
import UserContext from "./UserContext";

const Login = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);
    const context = useContext(UserContext);

    const LoginUser = async (ev) => {
        ev.preventDefault();
        const data = { email, password };
    
        axios.post('http://localhost:4000/login', data, { withCredentials: true })
        .then(response => {
            console.log(response);
            context.setEmail(response.data.email);
            setEmail('');
            setPassword('');
            setLoginError(true);
        })
        .catch(() => {
            setLoginError(true);
        });
       
            
        } 

    
    
    
    
    return(
        <form onSubmit={ev => LoginUser(ev)}>
            {loginError && (
                <div>
                    Login Error: Check Credentials
                </div>
            )}
            <input type="email" placeholder="email" value={email} onChange={ev => setEmail(ev.target.value)}/> <br/>
            <input type="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)}/> <br/>
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;