import React, { useState } from 'react';
import './loginsignup.scss';
import {Link} from 'react-router-dom';
import { MdEmail } from "react-icons/md";   
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";

const LoginSignup = () => {
    const [login,setLogin] = useState(true);

  return (
    <div className='loginSignupContainer'>
        <div className={login ? "loginDiv" : 'hidden'}>
            <h1>Welcome Back</h1>
            <form>
                <div>
                    <MdEmail />
                    <input type="email" placeholder='Enter Your Email'/>
                </div>
                <div>
                    <RiLockPasswordFill />
                    <input type="password" placeholder='Enter Your Password'/>
                </div>
                <Link to={'/password/forgot'}>forgot Password?</Link>
                <input type="submit" value={'submit'}/>
                <span onClick={()=>setLogin(false)}>Don't have an account?</span>
            </form>            
        </div>
        <div className={login ? 'hidden' : "RegisterDiv"}>
            <h1>Welcome</h1>
            <form>
                <div>
                    <FaUser />
                    <input type="text" placeholder='Enter Your Name'/>
                </div>
                <div>
                    <MdEmail />
                    <input type="email" placeholder='Enter Your Email'/>
                </div>
                <div>
                    <RiLockPasswordFill />
                    <input type="password" placeholder='Enter Your Password'/>
                </div>
                <div>
                    <img src="user.png" alt="avatar" />
                    <input type="file"/>
                </div>
                <input type="submit" value={'submit'}/>
                <span onClick={()=>setLogin(true)}>Already have an account?</span>
            </form>            
        </div>
    </div>
  )
}

export default LoginSignup