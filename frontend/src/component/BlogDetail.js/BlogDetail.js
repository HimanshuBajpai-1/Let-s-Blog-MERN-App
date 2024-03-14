import React, { useEffect, useState } from 'react';
import './blogdetail.scss';
import Loader from '../Layout/Loader/Loader';
import { useNavigate , useParams } from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import axios from 'axios';
import {setBlogDetails , setError} from '../../Reducers/BlogReducer/getBlogDetails'
import { FaThumbsUp } from "react-icons/fa";

const BlogDetail = () => {
    const navigate  = useNavigate(); 
    const dispatch = useDispatch();
    const {id} = useParams();
    const [loading , setLoading] = useState(false);

    const {loading:userLoading , isAuthenticated ,user} = useSelector((state)=>state.userDetails);
    const {loading:blogDetailLoading , dataFound , blog} = useSelector((state)=>state.blogDetails);

    
    useEffect(()=>{
        if(userLoading && !isAuthenticated){
            navigate('/login');
        }
        if(userLoading && isAuthenticated){
            const fetchData = async () =>{
                try {
                    const response = await axios.get(`/api/v1/blog/${id}`);
                    dispatch(setBlogDetails(response.data.blog));                    
                    setLoading(true)
                } catch (error) {
                    setLoading(true)
                    dispatch(setError());
                    toast.error(error?.response?.data?.message || error.message);
                }
            }
            fetchData();
        }        
    },[userLoading,isAuthenticated,navigate,dispatch,id])

    
    const likedHandler = () =>{
        const found = blog.likedBy.find(i=>i.user===user._id);
        if(found){
            return true;
        }
        return false;
    }
    
    
    const doLikeHandler = async () => {
        const response = await axios.put(`/api/v1/like/${id}`); 
        dispatch(setBlogDetails(response.data.blog));
    }
    
    
    

  return (
    <>
        {
            loading ?  blogDetailLoading && dataFound ? <div className='blogDetailContaner'>
                <div className='blogDiv'>
                    <div className="blogPage">
                        <img className='blogImg' src={blog.blogImage.url} alt="blog" />
                        <h1 className='blogTitle'>{blog.title}</h1>
                        <div className='blogBody' dangerouslySetInnerHTML={{__html: blog.blogBody}}></div>
                        <div className='likeDiv'><FaThumbsUp onClick={doLikeHandler} className={likedHandler() ? 'pink' : 'grey'}/> {blog.likes}</div>
                    </div>                    
                </div>
                <div className='infoDiv'>
                    <img className='blogImg' src={blog.createdBY.avatar.url} alt="blog" />
                    <div className="name">Author:<span>{blog.createdBY.name}</span></div>
                    <div className="creartedOn">Created On:<span>{new Date(blog.createdOn).toLocaleString()}</span></div>
                    <div className="updatedOn">Updated On:<span>{new Date(blog.updatedOn).toLocaleString()}</span></div>
                </div>
            </div> : <div className='errorOccured'>Some Error Occured!!!</div> : <Loader />
        }
    </>
  )
}

export default BlogDetail