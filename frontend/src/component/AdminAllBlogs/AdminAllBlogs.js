import React , { useState } from 'react';
import './adminallblogs.scss';
import Loader from '../Layout/Loader/Loader';
import { useSelector ,useDispatch} from 'react-redux';
import { MdDelete } from "react-icons/md";
import toast from 'react-hot-toast';
import axios from 'axios';
import {getAllBlogsAdmin} from '../../Reducers/AdminReducer/getAllBlogsAdmin';
import {FaArrowCircleLeft} from 'react-icons/fa'

const AdminAllBlogs = ({setTotalBlogs}) => {
    const dispatch = useDispatch();
    const [deleting , setDeleting ] = useState(false);
    const {loading:blogListLoading , blogs} = useSelector((state) => state.blogsListAdmin);
    const [filterSet , setFilterSet] = useState(false);
    const [userVal ,setUSerVal] = useState('');

    const deleteHandler = async (id) =>{
      setDeleting(true);
      await axios.delete(`/api/v1/admin/blog/${id}`);
      toast.success('blog Deleted Successfully');
      const response = await axios.get(`/api/v1/admin/blogs`);
      dispatch(getAllBlogsAdmin(response.data.blogs));
      setTotalBlogs(response.data.blogsCount);
      setDeleting(false);
    }

    const searchHandler = async () =>{
      if(userVal===''){
        toast.error('Enter User ID');
        return;
      }
      try {
          setFilterSet(true);
          const response = await axios.get(`/api/v1/admin/blog/${userVal}`);
          dispatch(getAllBlogsAdmin(response.data.blogs));
          setUSerVal('')
      } catch (error) {
          toast.error(error?.response?.data?.message || error.message);
      }
    }

    const removeFilterHandler = async () => {
      try {
          setFilterSet(false);
          const response = await axios.get(`/api/v1/admin/blogs`);
          dispatch(getAllBlogsAdmin(response.data.blogs));
          setUSerVal('')
      } catch (error) {
          toast.error(error?.response?.data?.message || error.message);
      }
    }

  return (
    blogListLoading ? blogs && blogs.length ? <>
      <div className="searchBar">
        {filterSet && <FaArrowCircleLeft onClick={removeFilterHandler} />}
        <input type="text" placeholder='Enter User ID' value={userVal} onChange={(e)=>setUSerVal(e.target.value)}/>
        <button onClick={searchHandler}>Search</button>
      </div>
      <div className='adminBlogsList'>
        <table>
          <thead>
            <tr>
              <th>Blog ID</th>
              <th>Title</th>
              <th>Likes</th>
              <th>Created By</th>
              <th>Created on</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              blogs.map(i=><tr key={i._id}>
                <td>{i._id}</td>
                <td>{i.title}</td>
                <td>{i.likes}</td>  
                <td>{i.createdBY.name}</td>
                <td>{new Date(i.createdOn).toLocaleString()}</td>
                <td>{deleting ? <MdDelete onClick={()=>toast.error('Processing... Please Wait!!!')}/> : <MdDelete onClick={()=>deleteHandler(i._id)}/>}</td>
              </tr>)
            }
          </tbody>
        </table>
      </div>
    </> : <div className='NoBlogs'>No Blogs Found</div> : <Loader />
  )
}

export default AdminAllBlogs


