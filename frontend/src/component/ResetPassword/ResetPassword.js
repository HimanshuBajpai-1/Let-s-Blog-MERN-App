import React, { useState } from 'react';
import './resetpassword.scss';
import { RiLockPasswordFill } from "react-icons/ri";
import {useNavigate, useParams} from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const ResetPassword = () => {
    const [loading , setLoading] = useState(false);
    const [password , setPassword ] = useState('');
    const [confirmPassword , setConfirmPassword ] = useState('');
    const navigate = useNavigate();
    const {token} = useParams();

    const handleResetPassword = async (e) =>{
        e.preventDefault();
        try {
            setLoading(true);            
            const response = await axios.put(`/api/v1/password/reset/${token}`,{password,confirmPassword});
            toast.success(response.data.message); 
            setPassword('');
            setConfirmPassword('');
            navigate('/login')
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error(error?.response?.data?.message || error.message);
        }
    }

  return (
    <div className="ResetPasswordContainer">
        <div className="ResetPasswordDiv">
            <h1>Reset Password</h1>
            <form onSubmit={handleResetPassword}>
                <div>
                    <RiLockPasswordFill />
                    <input type="password" placeholder='Enter New Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div>
                    <RiLockPasswordFill />
                    <input type="password" placeholder='Confirm New Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                </div>
                {
                    loading ? <button disabled className='submit'>Processing...</button> : <input type="submit" value={'submit'}/>
                }
            </form>            
        </div>
    </div>
  )
}

export default ResetPassword