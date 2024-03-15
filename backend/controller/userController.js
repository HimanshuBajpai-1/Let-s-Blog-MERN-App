const User = require('../model/userModel');
const {getToken} = require('../utils/getToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});

// Register User
exports.registerController = async (req,res,next) =>{
    try {
        const user = await User.create(req.body); 
        getToken(user,200,res);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

// Login User
exports.loginController = async (req,res,next) =>{
    try {
        const {email , password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:'Fill Login Credientials'});
        }
        const user = await User.findOne({email}).select('+password');
        if(!user){
            return res.status(404).json({message:'User Not Found'});
        }
        const comparison = user.comparePassword(password);
        
        if(!comparison){
            return res.status(400).json({message:'Invalid Password'});
        }

        getToken(user,200,res);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

// logout user
exports.logoutController = async(req,res,next) => {
    res.cookie('token',null,{expires:new Date(Date.now()),http:true})
    res.status(200).json({success:true,message:'Logout Successfull'});
} 

// Getting Personal Detail
exports.profileDetailController = async (req,res,next) => {
    try {
        const user = await User.findById(req.user._id);
        if(!user){
            return res.status(404).json({message:'User Not Found'});
        }
        res.status(200).json({success:true,user})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

// Update Profile
exports.profileUpdate = async (req,res,next) => {
    try {
        if(req.body.avatar){
            const b = await User.findById(req.user._id);
            await cloudinary.uploader.destroy(b.avatar.public_id);
        } 
        const user = await User.findByIdAndUpdate(req.user._id,req.body,{runValidators: true,new:true});
        getToken(user,200,res);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

// Update Password
exports.passwordUpdate = async (req,res,next) => {
    try {
        const {oldPassword , password , confirmPassword} = req.body;
        if(!oldPassword || !password || !confirmPassword){
            return res.status(406).json({message:'Please Fill Details'});
        }
        if(password !== confirmPassword){
            return res.status(409).json({message:'Password Does not Match'});
        }
        const user = await User.findById(req.user._id).select('+password');
        const comparison = user.comparePassword(oldPassword);
        if(!comparison){
            return res.status(409).json({message:'Password Does not Match with Old Password'});
        }           
        user.password = password
        user.save();
        getToken(user,200,res);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

// Forget Password
exports.forgetPasswordController = async (req,res,next) => {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(404).json({message:'User Not Found'});
    }
    try {        
        const resetToken = user.generateResetPasswordToken();
        
        await user.save({validateBeforeSave:false});

        // generating url for reset password
        // const resetPasswordURL = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;
        const resetPasswordURL = `http://localhost:3000/password/reset/${resetToken}`;


        const message = `your reset Password Token is: \n\n ${resetPasswordURL} \n\n if you have not requested for this email, then please ignore it.`
    
        await sendEmail({
            email : user.email,
            subject : 'Blog-App Password Reset',
            message
        });
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave:false});
        return res.status(500).json({message:error.message});
    }
}

// Reset Password
exports.resetPasswordController = async (req,res,next) => {
    try {
        const {token} = req.params;
        const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");
        const user = await User.findOne({resetPasswordToken,resetPasswordExpire:{$gt:Date.now()}});
        if(!user){
            return res.status(400).json({message:'reset Password Token is invalid or has been Expired'});
        }
        if(req.body.password!==req.body.confirmPassword){
            return res.status(500).json({message:'Password Does not Match'});
        }
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;         

        await user.save();
    
        res.status(200).json({message:'Password Changed Successfully'});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

// get all users --admin

exports.getAllUserController = async (req,res,next) => {
    try {
        const users = await User.find();
        const totalUser = await User.countDocuments();
        res.status(200).json({success:true,users,totalUser});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

// Get user details --admin

exports.getUserController = async (req,res,next) => {
    try {
        const {id}  = req.params;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({message:"User Not Found"})
        }
        res.status(200).json({success:true,user});
    } catch (error) {
        if(error.name==='CastError'){
            return res.status(400).json({message:'Invalid ID Format'});
        }
        return res.status(500).json({message:error.message});
    }
}

// Update User Role --admin
exports.updateRoleController = async (req,res,next) => {
    try {
        const {id}  = req.params;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({message:"User Not Found"})
        }
        user.role = req.body;
        user.save();
        res.status(200).json({success:true,user});
    } catch (error) {
        if(error.name==='CastError'){
            return res.status(400).json({message:'Invalid ID Format'});
        }
        return res.status(500).json({message:error.message});
    }
}

// Delete User  --admin
exports.deleteUser = async (req,res,next) => {
    try {
        const {id}  = req.params;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({message:"User Not Found"})
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"User Deleted Succesfully"});
    } catch (error) {
        if(error.name==='CastError'){
            return res.status(400).json({message:'Invalid ID Format'});
        }
        return res.status(500).json({message:error.message});
    }
}