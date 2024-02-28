import React from 'react';
import logo from '../img/logo.png'
import { Link } from 'react-router-dom';
import './NavBar.css'
import { CgProfile } from "react-icons/cg";
import { MdCreateNewFolder } from "react-icons/md";

const Navbar = () => {
  return (
    <div className='navbar '>
       <img className='w-1/10 object-contain ' src={logo} alt="" />
       <ul className='ul'>
        <Link to="signup"><li className='list-none py-1 px-15' >SignUp</li></Link>
        <Link to="/signin"><li className='list-none py-1 px-15'>SignIn</li></Link>
        <Link to="/profile"><li className='list-none py-1 px-15'><CgProfile /></li></Link>
        <Link to="/createpost"><li className='list-none py-1 px-15'><MdCreateNewFolder /></li></Link>
        
       </ul>
    </div>
  )
}

export default Navbar