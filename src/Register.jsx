import React, { useState, useContext } from "react";
import axios from 'axios';
import UserContext from "./UserContext";

const Register = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const context = useContext(UserContext);

    const registerUser = async (ev) => {
        ev.preventDefault();
        const data = { email, password };
    
        axios.post('http://localhost:4000/register', data, { withCredentials: true })
        .then(response => {
            console.log(response);
            context.setEmail(response.data.email);
            setEmail('');
            setPassword('');
        });
       
            
        } 

    
    
    
    
    return(
        <form onSubmit={ev => registerUser(ev)}>
            <input type="email" placeholder="email" value={email} onChange={ev => setEmail(ev.target.value)}/> <br/>
            <input type="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)}/> <br/>
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;