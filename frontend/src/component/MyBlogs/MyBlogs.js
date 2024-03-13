import React, { useEffect, useState } from 'react';
import './myblogs.scss';
import Loader from '../Layout/Loader/Loader';
import { useNavigate , Link } from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';
import axios from 'axios';
import {setBlogList} from '../../Reducers/BlogReducer/getBlogsList'
import BlogCard from '../Layout/BlogCard/BlogCard'
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

const MyBlogs = () => {
    const navigate  = useNavigate();
    const dispatch = useDispatch();
    const [loading , setLoading] = useState(false); 
    const [keyword , setKeyword] = useState('');
    const [finalKeyword , setFinalKeyword] = useState('');
    const [totalBlogs , setTotalBlogs] = useState(0);
    const [currPage , setCurrPage] = useState(1);
    const [blogsPerPage , setBlogsPerPage] = useState(0);

    const {loading:userLoading , isAuthenticated} = useSelector((state)=>state.userDetails);
    const {loading:blogsLoading , blogs} = useSelector((state)=>state.blogList);

    useEffect(()=>{
        if(userLoading && !isAuthenticated){
            navigate('/login');
        }
        if(userLoading && isAuthenticated){
            const fetchData = async () => {
                const response = await axios.get(`/api/v1/blogs/me?keyword=${finalKeyword}&&page=${currPage}`);
                dispatch(setBlogList(response.data.blogs));
                setTotalBlogs(response.data.blogsCount);
                setBlogsPerPage(response.data.blogsPerPage);
            }
            fetchData();
            setLoading(true);
        }
    },[userLoading,isAuthenticated,navigate,dispatch,finalKeyword,currPage])


  return (
    <>
        {
            loading && blogsLoading ? <>
            {
                blogs && blogs.length ? <>
                <div className='myBlogsContainerSearch'>
                    <input type="text" placeholder='Search Blog' value={keyword} onChange={(e)=>setKeyword(e.target.value)}/>
                    <button onClick={()=>setFinalKeyword(keyword)}>Search</button>
                </div>
                <div className='myBlogsContainer'>
                    {
                        blogs.map(i=><BlogCard id={i._id} title={i.title} blogBody={i.blogBody} author={i.createdBY.name} createdOn={i.createdOn} likes={i.likes}/>)
                    }
                </div>
                <div className="paginationDiv">
                <ResponsivePagination
                    current={currPage}
                    total={Math.ceil(totalBlogs/blogsPerPage)}
                    onPageChange={setCurrPage}
                    />
                </div>
                </> : <div className='noBlogWarning'>
                    <div>No Blogs Found</div>
                    <Link to={'/blog/new'}>Create Now</Link>
                </div>
            }
            </> : <Loader />
        }
    </>
  )
}

export default MyBlogs