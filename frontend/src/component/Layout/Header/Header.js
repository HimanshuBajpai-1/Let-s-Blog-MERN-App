import React from 'react';
import './header.scss';
import logo from '../../../assets/logo.png'
import {Link} from 'react-router-dom';
import { FaUser } from "react-icons/fa";


const Header = () => {
  return (
    <>
        <nav className="lheader">
            <img className='logo' src={logo} alt="logo" />
            <div className='links'>
                <Link to={'/'}>Home</Link>
                <Link to={'/blogs'}>Blogs</Link>
                <Link to={'/about'}>About</Link>
                <Link to={'/contact'}>Contact</Link>
            </div>
            <Link to={'/login'} className='login'><FaUser /></Link>
        </nav>
        <nav className="sheader">
            <div>
                <img className='logo' src={logo} alt="logo" />
                <Link to={'/login'} className='login'><FaUser /></Link>
            </div>            
            <div className='links'>
                <Link to={'/'}>Home</Link>
                <Link to={'/blogs'}>Blogs</Link>
                <Link to={'/about'}>About</Link>
                <Link to={'/contact'}>Contact</Link>
            </div>            
        </nav>
    </>
  )
}

export default Header