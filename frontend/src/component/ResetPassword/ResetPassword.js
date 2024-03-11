import React from 'react';
import './resetpassword.scss';
import { RiLockPasswordFill } from "react-icons/ri";


const ResetPassword = () => {
  return (
    <div className="ResetPasswordContainer">
        <div className="ResetPasswordDiv">
            <h1>Reset Password</h1>
            <form>
                <div>
                    <RiLockPasswordFill />
                    <input type="password" placeholder='Enter New Password'/>
                </div>
                <div>
                    <RiLockPasswordFill />
                    <input type="password" placeholder='Confirm New Password'/>
                </div>
                <input type="submit" value={'submit'}/>
            </form>            
        </div>
    </div>
  )
}

export default ResetPassword