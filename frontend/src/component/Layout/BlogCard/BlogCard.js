import React from 'react'
import './blogcard.scss'
import {Link} from 'react-router-dom'
import { FaThumbsUp } from "react-icons/fa";

const BlogCard = ({id , title ,blogBody,author , createdOn , likes}) => {
  return (
    <Link to={`/get/blog/${id}`} className='blogCard'>
        <div className='title'>{title}</div>
        <div className='content' dangerouslySetInnerHTML={{__html: blogBody}}></div>
        <div>Created By : <span>{author}</span></div>
        <div>Created on : <span>{new Date(createdOn).toLocaleString()}</span></div>
        <div><FaThumbsUp /> : <span>{likes}</span></div>
    </Link>
  )
}

export default BlogCard