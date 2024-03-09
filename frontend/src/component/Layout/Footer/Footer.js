import React from 'react'
import './footer.scss';
import {FaInstagram , FaFacebookF ,FaLinkedin ,FaTwitter} from 'react-icons/fa'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <div className="footer">  
        <div className='first'>
            <div>Follow Us On:</div>
            <div>
                <Link><FaFacebookF /></Link>
                <Link><FaInstagram /></Link>
                <Link><FaLinkedin /></Link>
                <Link><FaTwitter /></Link>
            </div>                
        </div>
        <div className='second'><span>@</span>all Right Reserved</div>
    </div>
  )
}

export default Footer