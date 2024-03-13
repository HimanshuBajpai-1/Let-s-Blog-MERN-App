import React, { useEffect, useState } from 'react'
import './home.scss';
import { BsMouse2Fill } from "react-icons/bs";
import {HashLink} from 'react-router-hash-link'
import {Link} from 'react-router-dom'
import BlogCard from '../Layout/BlogCard/BlogCard';
import { TfiWrite } from "react-icons/tfi";
import { FaBookOpenReader } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {setBlogList} from '../../Reducers/BlogReducer/getBlogsList'
import Loader from '../Layout/Loader/Loader';


const Home = () => {
    const dispatch = useDispatch();
    const [loading , setLoading] = useState(false);
    const {loading:userLoading } = useSelector((state)=>state.userDetails);
    const {loading:blogsLoading , blogs} = useSelector((state)=>state.blogList);

    useEffect(()=>{
        if(userLoading){
            const fetchData = async () => {
                const response = await axios.get(`/api/v1/featuredblog`);
                dispatch(setBlogList(response.data.blogs));
            }
            fetchData();
            setLoading(true);
        }
    },[userLoading,dispatch])



  return (
    <>
        <div className="home1">
            <div>Welcome to</div>
            <div>Let's Blog</div>
            <div>Find Amazing Blogs Here</div>
            <HashLink to={'/#featured'}>scroll<BsMouse2Fill /></HashLink>
        </div>
        <div id='featured' className="home2">
            <h1>Featured Blogs</h1>
            <div className="featuredBlogContainer">
                {
                    loading && blogsLoading ? blogs.map(i=><BlogCard id={i._id} title={i.title} blogBody={i.blogBody} author={i.createdBY.name} createdOn={i.createdOn} likes={i.likes}/>)  : <Loader />
                }
            </div>
        </div>
        <div className="home3">  
            <h1>Features</h1>          
            <div className="features">
                <div className='featureCard'>
                    <TfiWrite />
                    <div>Create Your Own Blogs</div>
                    <Link to={'/login'}>Try Now</Link>
                </div>
                <div className='featureCard'>  
                    <FaBookOpenReader />                  
                    <div>Read Blogs</div>
                    <Link to={'/blogs'}>Try Now</Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default Home