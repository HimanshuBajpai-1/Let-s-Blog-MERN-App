import React, { useEffect, useState } from 'react';
import './updatepassword.scss';
import Loader from '../Layout/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FaLockOpen } from "react-icons/fa6";
import { MdLockClock } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import toast from 'react-hot-toast';

const UpdatePassword = () => {
    const navigate  = useNavigate();
    const [loading , setLoading] = useState(false);    
    const [submitting , setSubmitting] = useState(false);
    const [oldPassword , setOldPassword] = useState('');
    const [password , setPassword] = useState('');
    const [confirmPassword , setConfirmPassword] = useState('');
    const {loading:userLoading , isAuthenticated} = useSelector((state)=>state.userDetails);
     

    useEffect(()=>{
        if(userLoading && !isAuthenticated){
            navigate('/login');
        }
        if(userLoading && isAuthenticated){
            setLoading(true);            
        }
    },[userLoading,isAuthenticated,navigate])

    const updatePasswordHandler = async (e) => {
        e.preventDefault();
        if(!oldPassword || !password || !confirmPassword){
            toast.error('Please Fill Details');
            return;
        }
        if(password !== confirmPassword){
            toast.error('Password Does not Match');
            return;
        }
        try {
            setSubmitting(true);
            await axios.put(`/api/v1/password/update`,{oldPassword,password,confirmPassword});
            toast.success('Password Updated Successfull');
            setOldPassword('');
            setPassword('');
            setConfirmPassword('');
            setSubmitting(false);
        } catch (error) {
            setSubmitting(false);
            toast.error(error?.response?.data?.message || error.message);
        }
    }

  return (
    <>
        {
            loading ? <div className='updatePasswordContainer'>
                <div className="updatePasswordDiv">
                    <h1>Update Password</h1>
                    <form onSubmit={updatePasswordHandler}>
                        <div>
                            <FaLockOpen />
                            <input type="password" placeholder='Enter Old Password' value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)}/>
                        </div>
                        <div>
                            <MdLockClock />
                            <input type="password" placeholder='Enter New Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        </div>
                        <div>
                            <FaLock />
                            <input type="password" placeholder='Confirm New Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                        </div>
                        {
                            !submitting ? <button className='passwordUpdate' type='submit'>Update Password</button> : <button className='passwordUpdate disabled' disabled>Processing...</button>
                        }
                    </form>
                </div>
            </div> : <Loader />
        }
    </>
  )
}

export default UpdatePassword