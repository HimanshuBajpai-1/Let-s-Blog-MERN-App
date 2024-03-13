import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom'
import './createblog.scss';
import Loader from '../Layout/Loader/Loader';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import toast from 'react-hot-toast';
import axios from 'axios';

const CreateBlog = () => {
    const navigate  = useNavigate();
    const [loading , setLoading] = useState(false); 
    const [submitting , setSubmitting] = useState(false);
    const [title , setTitle] = useState('');
    const [blogBody, setBlogBody] = useState('');
    const [blogImgPreview , setBlogImgPreview] = useState('');
    const [blogImg , setblogImg] = useState('');

    const {loading:userLoading , isAuthenticated} = useSelector((state)=>state.userDetails);

    useEffect(()=>{
        if(userLoading && !isAuthenticated){
            navigate('/login');
        }
        if(userLoading && isAuthenticated){
            setLoading(true);
        }
    },[userLoading,isAuthenticated,navigate])

    const blogImgPreviewHandler = (e) => {
        let img = e.target.files[0];
        setBlogImgPreview(URL.createObjectURL(img));
        setblogImg(img);
    }

    const postBlogHandler = async (e) => {
        e.preventDefault();
        if(!blogImg || !title || !blogBody){
            toast.error('Fill All Fields');
            return;
        }
        try {
            setSubmitting(true);
            let public_id = '';
            let url = '';
            if(blogImg!==''){
                const image = new FormData()
                image.append("file",blogImg);
                image.append("cloud_name",process.env.REACT_APP_CLOUDINARY_NAME)
                image.append("upload_preset",process.env.REACT_APP_UPLOAD_PRESET)
                image.append('folder', 'mernBlogApp/blogPostImg');
                const response = await fetch(
                    `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
                    {
                        method : "POST",
                        body : image
                    }
                )   
                const imgData= await response.json();
                public_id = imgData.public_id;
                url = imgData.url;
            }    
            const blogImage = {public_id , url};
            await axios.post(`/api/v1/blogpost/new`,{title,blogBody,blogImage});
            toast.success('Post Created Successfull');
            setTitle('');
            setBlogBody('');
            setBlogImgPreview('');
            setblogImg('')
            setSubmitting(false);
        } catch (error) {
            setSubmitting(false);
            toast.error(error?.response?.data?.message || error.message);
        }
    }

  return (
    <>
    {
        loading ? <div className='createNewBlogContainer'>
            <div className='mainblogcontainer'>
                <h1>Create New Blog</h1>
                <form onSubmit={postBlogHandler}>  
                    <input type="text" placeholder='Enter Blog Title...' value={title} onChange={(e)=>setTitle(e.target.value)}/>
                    <input type="file" accept='image/*' onChange={blogImgPreviewHandler}/>
                    {blogImgPreview && <img src={blogImgPreview} alt="Preview" className='blogImgPreview'/>}
                    <div className="textarea">
                        <ReactQuill theme="snow" value={blogBody} onChange={setBlogBody} />
                    </div>
                    {
                        !submitting ? <button className='blogSubmit' type='submit'>Submit</button> : <button className='blogSubmit disabled' disabled>Processing...</button>
                    }
                </form>   
            </div>         
        </div> : <Loader />
    }
    </>
  )
}

export default CreateBlog