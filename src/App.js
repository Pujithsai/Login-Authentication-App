import './App.css';
import {BrowserRouter,Link,Route,Routes} from "react-router-dom";
import Register from './Register';
import UserContext from './UserContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './Login';



function App() {
  const [email,setEmail] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/user', {withCredentials:true})
    .then(response => {
      setEmail(response.data.email);
    });
  },[]);  

  function logout(){
    axios.post('http://localhost:4000/logout' , {} , {withCredentials:true})
    .then(() => {
      setEmail('');
    });
  }


  return (
    <UserContext.Provider value={{email,setEmail}}>
        <BrowserRouter>
        <div>
          {!! email && (
            <div>
              logged in as {email}
              <button onClick = {() => logout()}>Log Out</button>
            </div>
          )}
          {!email && (
            <div>
              Not logged in
            </div>
          )}
        </div>
        <div>
          <Link to = {'/'}>Home</Link> |
          <Link to={'/login'}>Login</Link> | 
          <Link to={'/register'}>Register</Link>
        </div>
        <hr/>
        <Routes>
          <Route path={'/login'} element = {<Login/>}/>
          <Route path={'/register'} element={<Register/>}/>
        </Routes>
        
      </BrowserRouter>
    </UserContext.Provider>
    
  );
}

export default App;
