import React, { useState } from 'react';
import './header.scss';
import logo from '../../../assets/logo.png'
import {Link, useNavigate} from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { useSelector ,useDispatch } from 'react-redux';
import { RiAccountCircleFill } from "react-icons/ri";
import { IoIosCreate } from "react-icons/io";
import { RiListCheck } from "react-icons/ri";
import { IoLogOutSharp } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import toast from 'react-hot-toast';
import axios from 'axios';
import {logOutUser} from '../../../Reducers/UserReducer/getUserDetailsReducer'

const Header = () => {
    const { loading:userLoading , isAuthenticated , isAdmin ,user }  = useSelector((state)=>state.userDetails);
    const [ navOpen , setNavOpen ] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logOutHandler = async () => {
        try {
            await axios.get(`/api/v1/logout`);
            toast.success('Logout Successfully');            
            setNavOpen(false);
            dispatch(logOutUser());
            navigate('/login');
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        }
    }

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
            {
                userLoading && isAuthenticated ? <div className="profileNav">
                    <img onClick={()=>setNavOpen(!navOpen)} className='userProfile' src={user.avatar.url} alt="profile" />
                    <div className={navOpen ? "navlinks" : 'hidden'}>
                        {
                            userLoading && isAuthenticated && isAdmin && <Link to={'/dashboard'} onClick={()=>setNavOpen(false)}><MdDashboard /> Dashboard</Link>
                        }
                        <Link to={'/account'} onClick={()=>setNavOpen(false)}><RiAccountCircleFill /> Account</Link>
                        <Link to={'/blog/new'} onClick={()=>setNavOpen(false)}><IoIosCreate /> Create Blog</Link>
                        <Link to={'/blogs/me'} onClick={()=>setNavOpen(false)}><RiListCheck /> My Blogs</Link>
                        <Link onClick={logOutHandler}><IoLogOutSharp /> Log Out</Link>
                    </div>
                </div> : <Link to={'/login'} className='login'><FaUser /></Link>
            }            
        </nav>
        <nav className="sheader">
            <div>
                <img className='logo' src={logo} alt="logo" />
                {
                    userLoading && isAuthenticated ? <div className="profileNav">
                    <img  onClick={()=>setNavOpen(!navOpen)} className='userProfile' src={user.avatar.url} alt="profile" />
                    <div className={navOpen ? "navlinks" : 'hidden'}>
                        {
                            userLoading && isAuthenticated && isAdmin && <Link to={'/dashboard'} onClick={()=>setNavOpen(false)}><MdDashboard /> Dashboard</Link>
                        }
                        <Link to={'/account'} onClick={()=>setNavOpen(false)}><RiAccountCircleFill /> Account</Link>
                        <Link to={'/blog/new'} onClick={()=>setNavOpen(false)}><IoIosCreate /> Create Blog</Link>
                        <Link to={'/blogs/me'} onClick={()=>setNavOpen(false)}><RiListCheck /> My Blogs</Link>
                        <Link onClick={logOutHandler}><IoLogOutSharp /> Log Out</Link>
                    </div>
                </div>:<Link to={'/login'} className='login'><FaUser /></Link>
                } 
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