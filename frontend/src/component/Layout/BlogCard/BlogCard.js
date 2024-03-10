import React from 'react'
import './blogcard.scss'
import {Link} from 'react-router-dom'

const BlogCard = () => {
  return (
    <Link className='blogCard'>
        <div className='title'>Dummy Title</div>
        <div className='content'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam unde autem architecto qui dignissimos voluptas! Necessitatibus impedit officia laborum similique corrupti vitae minus sequi facere, earum consectetur eveniet, culpa dicta.</div>
        <div>Created By : <span>Author Name</span></div>
        <div>Created on : <span>{new Date().toLocaleString()}</span></div>
    </Link>
  )
}

export default BlogCard