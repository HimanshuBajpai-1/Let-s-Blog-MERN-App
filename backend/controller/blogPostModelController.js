const Blog = require('../model/blogPostModel');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});


// creating new blog
exports.createBlogPost = async (req,res,next) => {
    try {
        req.body.createdBY = req.user._id
        const blog = await Blog.create(req.body)
        res.status(201).json({success:true,message:'Blog Created Successfully',blog});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

// getting all my blogs
exports.getMyBlogs = async (req,res,next) => {
    try {
        const blogsPerPage = 6;
        const page = req.query.page || 1;
        const keyword = req.query.keyword || ""; 
        const dummy = await Blog.find({createdBY:req.user._id , title:{$regex:keyword,$options:'i'}});       
        const blogsCount = dummy.length;    
        const blogs = await Blog.find({createdBY:req.user._id , title:{$regex:keyword,$options:'i'}}).sort({createdOn:-1}).skip(blogsPerPage*(page-1)).limit(blogsPerPage).populate('createdBY');
        res.status(201).json({success:true,blogs,blogsCount,blogsPerPage});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}


// updating blog
exports.updateMyBlog = async (req,res,next) => {
    try {
        const {id} = req.params;
        if(req.body.blogImage){
            const b = await Blog.findById(id);
            await cloudinary.uploader.destroy(b.blogImage.public_id);
        } 
        req.body.updatedOn = Date.now()
        const blog = await Blog.findByIdAndUpdate(id,req.body,{runValidators:true,new:true});            
        res.status(200).json({success:true,blog,message:'Blog Updated Successfully'});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

// get blog by Id

exports.getBlog = async (req,res,next) => {
    try {
        const {id} = req.params;
        const blog = await Blog.findById(id).populate('createdBY');            
        res.status(200).json({success:true,blog});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

// deleting my blog
exports.deleteBlog = async (req,res,next) => {
    try {
        const {id} = req.params;
        const blog = await Blog.findById(id);
        await cloudinary.uploader.destroy(blog.blogImage.public_id);
        await Blog.findByIdAndDelete(id);            
        res.status(200).json({success:true,message:'Blog Deleted Successfully'});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

// getting featured Blogs

exports.getFeaturedBlogs = async (req,res,next) => {
    try {
        const blogs = await Blog.find().sort({likes:-1}).limit(6);            
        res.status(200).json({success:true,blogs});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

// update likes

exports.updateLike = async (req,res,next) =>{
    try {
        const {id} = req.params;
        const blog = await Blog.findById(id).populate('createdBY');
        const likeCount = blog.likes
        const likeArr = blog.likedBy
        if(likeArr.length){
            const userIndex = likeArr.findIndex(i=>i.user.equals(req.user._id));
            if(userIndex!==-1){
                likeArr.splice(userIndex,1);
                blog.likes -= 1;
                blog.likedBy = likeArr;
                blog.save();
            }else{
                blog.likes += 1
                blog.likedBy.push({user : req.user._id});
                blog.save();
            } 
        }else{
            blog.likes += 1
            blog.likedBy.push({user : req.user._id});
            blog.save();
        }                       
        res.status(200).json({success:true,message:'like updated Successfully',blog});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

// getting all blogs --admin
exports.getAllBlogs = async (req,res,next) => {
    try {
        const blogsCount = await Blog.countDocuments();
        const blogs = await Blog.find().populate('createdBY');
        res.status(201).json({success:true,blogs,blogsCount});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

// getting all blogs according to user id --admin
exports.getBlogsById = async (req,res,next) => {
    try {
        const {id} = req.params      
        const blogs = await Blog.find({createdBY:id}).populate('createdBY');
        res.status(201).json({success:true,blogs});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

// deleting blog --admin
exports.deleteBlogById = async (req,res,next) => {
    try {
        const {id} = req.params      
        const blogs = await Blog.findByIdAndDelete(id);
        res.status(201).json({success:true,message:'Blog Deleted Successfully'});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}