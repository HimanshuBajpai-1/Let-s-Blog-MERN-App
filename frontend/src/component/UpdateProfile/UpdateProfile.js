import React, { useEffect, useState } from 'react';
import './updatprofile.scss';
import { MdEmail } from "react-icons/md";   
import { FaUser } from "react-icons/fa";
import {toast} from 'react-hot-toast';
import axios from 'axios';
import validator from 'validator';
import {useNavigate} from 'react-router-dom';
import {useDispatch ,useSelector } from 'react-redux';
import {setUserDetail} from '../../Reducers/UserReducer/getUserDetailsReducer'
import Loader from '../Layout/Loader/Loader'

const UpdateProfile = () => {
    const [loading , setLoading] = useState(false);    
    const [submitting , setSubmitting] = useState(false);
    const [name , setName ] = useState('');
    const [email , setEmail ] = useState('');
    const [imgPreview , setImgPreview] = useState('');
    const [avatarImg , setAvatar] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    
    const {loading:userLoading , isAuthenticated,user} = useSelector((state)=>state.userDetails); 
    useEffect(()=>{
        if(userLoading && !isAuthenticated){
            navigate('/login');
        }
        if(userLoading && isAuthenticated){
            setLoading(true);
            setName(user.name);
            setEmail(user.email);
            setImgPreview(user.avatar && user.avatar.url);
        }
    },[userLoading,isAuthenticated,navigate,user.name,user.avatar,user.email,user?.avatar?.url])

    const imageHandler = (e) => {
        const img = e.target.files[0];
        setImgPreview(URL.createObjectURL(img));
        setAvatar(img);
    }

    const handleUpdateProfile = async (e) => {
        e.preventDefault(); 
        if(!name || !email ){
            toast.error('Please Fill Details');
            return;
        }
        if(name.length<4){
            toast.error('name cannot be less then 4 characters');
            return
        }
        if(!validator.isEmail(email)){
            toast.error('Invalid Email');
            return;
        }
        try {
            setSubmitting(true);
            let formData = {};
            if(avatarImg!==''){
                let public_id = '';
                let url = '';
                const image = new FormData()
                image.append("file",avatarImg);
                image.append("cloud_name",process.env.REACT_APP_CLOUDINARY_NAME)
                image.append("upload_preset",process.env.REACT_APP_UPLOAD_PRESET)
                image.append('folder', 'mernBlogApp/users');
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
                formData.avatar =  {public_id , url};
            }    
            formData.name = name;
            formData.email = email
            const response = await axios.put(`/api/v1/profile/update`,formData);
            toast.success('Profile Update Successfull');
            dispatch(setUserDetail(response.data.user))
            navigate('/account');
            setSubmitting(false);
        } catch (error) {
            setSubmitting(false);
            toast.error(error?.response?.data?.message || error.message);
        }
    }

  return (
    <>
        {
            loading ? <div className='updateProfileContainer'>
            <div className="UpdateProfileDiv" onSubmit={handleUpdateProfile}>
                <h1>Update Profile</h1>
                <form>
                    <div>
                        <FaUser />
                        <input type="text" placeholder='Enter Your Name' value={name} onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div>
                        <MdEmail />
                        <input type="email" placeholder='Enter Your Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <img src={imgPreview} alt="avatar" />
                        <input type="file" accept='image/*' onChange={imageHandler}/>
                    </div>
                    {
                        submitting ? <button disabled className='submit'>Processing...</button> : <input type="submit" value={'submit'}/>
                    }
                </form>            
            </div>
            </div> : <Loader />
        }
    </>
  )
}

export default UpdateProfile


