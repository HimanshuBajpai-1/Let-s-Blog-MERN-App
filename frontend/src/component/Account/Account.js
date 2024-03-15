import React, { useEffect, useState } from 'react';
import './account.scss';
import Loader from '../Layout/Loader/Loader';
import { useNavigate ,Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {setBlogList} from '../../Reducers/BlogReducer/getBlogsList';
import { TbExternalLink } from "react-icons/tb";


const Account = () => {    
    const navigate  = useNavigate();
    const dispatch  =useDispatch();
    const [loading , setLoading] = useState(false);
    const [totalBLogs , setTotalBlogs ] = useState(0);
    const {loading:userLoading , isAuthenticated, user} = useSelector((state)=>state.userDetails);
    const {loading:blogLoading } = useSelector((state)=>state.blogList); 

    useEffect(()=>{
        if(userLoading && !isAuthenticated){
            navigate('/login');
        }
        if(userLoading && isAuthenticated){
            setLoading(true);
            const fetchBlogs = async () =>{
                const response = await axios.get(`/api/v1/blogs/me`);
                dispatch(setBlogList(response.data.blogs));
                setTotalBlogs(response.data.blogsCount);
            }
            fetchBlogs();
        }
    },[userLoading,isAuthenticated,navigate,dispatch])

  return (
    <>
        {
            loading ? <div className='userProfileContainer'>
            <div className="userProfile">
                <img className='userProfileImg' src={user.avatar.url} alt="profile" />
                <div>Name: <span>{user.name}</span></div>
                <div>Email: <span>{user.email}</span></div>
                {
                    blogLoading && <div>Blogs Created: <span>{totalBLogs}</span> <Link to={'/blogs/me'}><TbExternalLink /></Link></div>
                }
                <Link to={'/profile/update'}>Update Profile</Link>
                <Link to={'/password/update'}>Change Password</Link>
            </div>            
            </div> : <Loader />
        }
    </>
  )
}

export default Account