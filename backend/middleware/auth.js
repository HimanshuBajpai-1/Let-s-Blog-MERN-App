const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

exports.isAuthenticated = async (req,res,next) => {
    const {token} = req.cookies
    if(!token){
        return res.status(404).json({message:'Login or Signup to access this Resource'});
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    const {id} = decoded
    const user = await User.findById(id);
    if(!user){
        return res.status(404).json({message:'User Not Found'});
    }
    req.user = user;
    next();
}

exports.isAdmin = async (req,res,next) => {
    if(req.user.role!=='Admin'){
        return res.status(401).json({message:'Not Allowed to access this Resource'});
    }
    next();
}