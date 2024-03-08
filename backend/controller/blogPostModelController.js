const Blog = require('../model/blogPostModel');

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
        const blogsPerPage = 4;
        const page = req.query.page || 1;
        const keyword = req.query.keyword || "";
        const blogsCount = await Blog.countDocuments();        
        const blogs = await Blog.find({createdBY:req.user._id , title:{$regex:keyword,$options:'i'}}).skip(blogsPerPage*(page-1)).limit(blogsPerPage).populate('createdBY');
        res.status(201).json({success:true,blogs,blogsCount});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}


// updating blog
exports.updateMyBlog = async (req,res,next) => {
    try {
        const {id} = req.params;
        req.body.updatedOn = Date.now()
        const blog = await Blog.findByIdAndUpdate(id,req.body,{runValidators:true,new:true});            
        res.status(200).json({success:true,blog,message:'Blog Updated Successfully'});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}


// deleting my blog
exports.deleteBlog = async (req,res,next) => {
    try {
        const {id} = req.params;
        await Blog.findByIdAndDelete(id)            
        res.status(200).json({success:true,message:'Blog Deleted Successfully'});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}


// getting all blogs --admin
exports.getAllBlogs = async (req,res,next) => {
    try {
        const blogsCount = await Blog.countDocuments();
        const blogs = await Blog.find();
        res.status(200).json({success:true,blogs,blogsCount})
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