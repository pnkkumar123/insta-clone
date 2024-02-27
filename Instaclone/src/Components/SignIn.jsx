import React from 'react';
import "./SignIn.css";
import logo from '../img/logo.png'
import { Link } from 'react-router-dom';


function SignIn() {
  return (
    <div className='signIn'>
      <div className="loginForm">
        <img src={logo} className='signInLogo' alt="" />
         <div>
          <input type="email" name="email" id="email" placeholder='Email'/>
         </div>
         <div>
          <input type="password" name="password" id='password' placeholder='Password' />
         </div>
         <input type="submit" value="Sign In" id='login-btn' />
      </div>
      <div className="loginForm2">
        Dont,t have an account ?
       <Link to="/signup"> <span style={{color:"blue",cursor:"pointer"}}>Sign Up</span></Link>
      </div>

    </div>
  )
}

export default SignIn