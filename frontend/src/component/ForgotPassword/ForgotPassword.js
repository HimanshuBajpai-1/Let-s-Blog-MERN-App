import React, { useState } from 'react'
import './forgotpassword.scss';
import { MdEmail } from "react-icons/md"; 
import axios from 'axios';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [loading , setLoading] = useState(false);
  const [email , setEmail ] = useState('');

  const handleForgetPassword = async (e) =>{
      e.preventDefault();
      if(!email){
          toast.error('Please Enter Email');
          return;
      }
      try {
          setLoading(true);
          const response = await axios.put(`/api/v1/password/forget`,{email});
          toast.success(response.data.message); 
          setEmail('')         
          setLoading(false);
      } catch (error) {
          setLoading(false);
          toast.error(error?.response?.data?.message || error.message);
      }
  }

  return (
    <div className="forgetPasswordContainer">
        <div className="forgotPasswordDiv">
            <h1>Forget Password</h1>
            <form onSubmit={handleForgetPassword}>
                <div>
                    <MdEmail />
                    <input type="email" placeholder='Enter Your Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                {
                    loading ? <button disabled className='submit'>Processing...</button> : <input type="submit" value={'submit'}/>
                }
            </form>            
        </div>
    </div>
  )
}

export default ForgotPassword