const express = require('express');
const {isAuthenticated, isAdmin} = require('../middleware/auth')
const {createBlogPost, getMyBlogs, getBlog, deleteBlog, updateMyBlog, getAllBlogs, getBlogsById, deleteBlogById, getFeaturedBlogs} = require('../controller/blogPostModelController');

const route = express.Router();

route.post('/blogpost/new',isAuthenticated,createBlogPost);
route.get('/blogs/me',isAuthenticated,getMyBlogs);
route.put('/blog/update/:id',isAuthenticated,updateMyBlog);
route.get('/blog/:id',isAuthenticated,getBlog);
route.delete('/blog/:id',isAuthenticated,deleteBlog);
route.get('/blogs',getAllBlogs);
route.get('/featuredblog',getFeaturedBlogs);

// admin route

route.get('/admin/blogs',isAuthenticated,isAdmin,getAllBlogs)
route.get('/admin/blog/:id',isAuthenticated,isAdmin,getBlogsById)
route.delete('/admin/blog/:id',isAuthenticated,isAdmin,deleteBlogById)

module.exports = route;