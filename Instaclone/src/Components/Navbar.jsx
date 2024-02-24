import React from 'react';
import logo from '../img/logo.png'
import { Link } from 'react-router-dom';
import './NavBar.css'

const Navbar = () => {
  return (
    <div className='navbar '>
       <img className='w-1/10 object-contain ' src={logo} alt="" />
       <ul className='ul'>
        <Link to="signup"><li className='list-none py-1 px-15' >SignUp</li></Link>
        <Link to="/signin"><li className='list-none py-1 px-15'>SignIn</li></Link>
        <Link to="/profile"><li className='list-none py-1 px-15'>Profile</li></Link>
        
       </ul>
    </div>
  )
}

export default Navbar