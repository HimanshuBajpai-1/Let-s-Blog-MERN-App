const express = require('express');
const {isAuthenticated, isAdmin} = require('../middleware/auth')
const {createBlogPost, getMyBlogs, deleteBlog, updateMyBlog, getAllBlogs, getBlogsById, deleteBlogById} = require('../controller/blogPostModelController');

const route = express.Router();

route.post('/blogpost/new',isAuthenticated,createBlogPost);
route.get('/blogs/me',isAuthenticated,getMyBlogs);
route.put('/blog/update/:id',isAuthenticated,updateMyBlog);
route.delete('/blog/:id',isAuthenticated,deleteBlog);

// admin route

route.get('/admin/blogs',isAuthenticated,isAdmin,getAllBlogs)
route.get('/admin/blog/:id',isAuthenticated,isAdmin,getBlogsById)
route.delete('/admin/blog/:id',isAuthenticated,isAdmin,deleteBlogById)

module.exports = route;