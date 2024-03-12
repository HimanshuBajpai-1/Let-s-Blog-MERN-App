import React, { useEffect, useState } from 'react';
import './loginsignup.scss';
import {Link} from 'react-router-dom';
import { MdEmail } from "react-icons/md";   
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import userPNG from '../../assets/user.png';
import {toast} from 'react-hot-toast';
import axios from 'axios';
import validator from 'validator';
import {useNavigate} from 'react-router-dom';
import {useDispatch ,useSelector } from 'react-redux';
import {setUserDetail} from '../../Reducers/UserReducer/getUserDetailsReducer'

const LoginSignup = () => {
    const [loading , setLoading] = useState(false);
    const [login,setLogin] = useState(true);
    const [name , setName ] = useState('');
    const [email , setEmail ] = useState('');
    const [password , setPassword ] = useState('');
    const [imgPreview , setImgPreview] = useState('');
    const [avatarImg , setAvatar] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {loading:userLoading , isAuthenticated} = useSelector((state)=>state.userDetails); 
    useEffect(()=>{
        if(userLoading && isAuthenticated){
            navigate('/account');
        }
    })

    const handleLogin = async (e) =>{
        e.preventDefault();
        if(!email || !password){
            toast.error('Please Fill Details');
            return;
        }
        try {
            setLoading(true);
            const response = await axios.post(`/api/v1/login`,{email,password});
            toast.success('Login Successfull');
            dispatch(setUserDetail(response.data.user))
            navigate('/account');            
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error(error?.response?.data?.message || error.message);
        }
    }

    const imageHandler = (e) => {
        const img = e.target.files[0];
        setImgPreview(URL.createObjectURL(img));
        setAvatar(img);
    }

    const handleRegister = async (e) => {
        e.preventDefault(); 
        if(!name || !email || !password || !avatarImg){
            toast.error('Please Fill Details');
            return;
        }
        if(name.length<4){
            toast.error('name cannot be less then 4 characters');
            return
        }
        if(password.length<8){
            toast.error('password cannot be less then 8 characters');
            return;
        }
        if(!validator.isEmail(email)){
            toast.error('Invalid Email');
            return;
        }
        try {
            setLoading(true);
            let public_id = '';
            let url = '';
            if(avatarImg!==''){
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
            }    
            const avatar = {public_id , url};
            const response = await axios.post(`/api/v1/register`,{name,email,password,avatar});
            toast.success('Registration Successfull');
            dispatch(setUserDetail(response.data.user))
            navigate('/account');
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error(error?.response?.data?.message || error.message);
        }
    }

  return (
    <div className='loginSignupContainer'>
        <div className={login ? "loginDiv" : 'hidden'} onSubmit={handleLogin}>
            <h1>Welcome Back</h1>
            <form>
                <div>
                    <MdEmail />
                    <input type="email" placeholder='Enter Your Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div>
                    <RiLockPasswordFill />
                    <input type="password" placeholder='Enter Your Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <Link to={'/password/forgot'}>forgot Password?</Link>
                {
                    loading ? <button disabled className='submit'>Processing...</button> : <input type="submit" value={'submit'}/>
                }
                <span onClick={()=>setLogin(false)}>Don't have an account?</span>
            </form>            
        </div>
        <div className={login ? 'hidden' : "RegisterDiv"} onSubmit={handleRegister}>
            <h1>Welcome</h1>
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
                    <RiLockPasswordFill />
                    <input type="password" placeholder='Enter Your Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div>
                    <img src={imgPreview ? imgPreview : userPNG} alt="avatar" />
                    <input type="file" accept='image/*' onChange={imageHandler}/>
                </div>
                {
                    loading ? <button disabled className='submit'>Processing...</button> : <input type="submit" value={'submit'}/>
                }
                <span onClick={()=>setLogin(true)}>Already have an account?</span>
            </form>            
        </div>
    </div>
  )
}

export default LoginSignup