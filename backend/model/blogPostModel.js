const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    blogBody:{
        type:String,
        required:true
    },
    createdBY:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    createdOn:{
        type:Date,
        default:Date.now
    },
    updatedOn:{
        type:Date,
        default:Date.now
    }
})

const blogPost = mongoose.model('blogPost',blogPostSchema);

module.exports = blogPost;