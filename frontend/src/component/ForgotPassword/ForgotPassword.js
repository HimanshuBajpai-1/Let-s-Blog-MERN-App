import React from 'react'
import './forgotpassword.scss';
import { MdEmail } from "react-icons/md"; 

const ForgotPassword = () => {
  return (
    <div className="forgetPasswordContainer">
        <div className="forgotPasswordDiv">
            <h1>Forget Password</h1>
            <form>
                <div>
                    <MdEmail />
                    <input type="email" placeholder='Enter Your Email'/>
                </div>
                <input type="submit" value={'submit'}/>
            </form>            
        </div>
    </div>
  )
}

export default ForgotPassword