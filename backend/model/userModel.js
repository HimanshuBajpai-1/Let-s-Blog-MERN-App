const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please Enter Name'],
        minlength:[4,'Name Cannot be less then 4 characters'],
        maxlength:[30,'Name Cannot be more then 30 characters']
    },
    email:{
        type:String,
        required:[true,'Please Enter Email'],
        unique:[true,'Email already Registered'],
        validate:[validator.isEmail,'Invalid Email']
    },
    password:{
        type:String,
        required:[true,'Please Enter Password'],
        minlength:[8,'Password Cannot be less then 8 characters'],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:'User'
    }, 
    resetPasswordToken:String,
    resetPasswordExpire:Date
})

userSchema.pre('save', function(next){
    if(!this.isModified('password')) {
        next();
    }
    const newPassword = bcrypt.hashSync(this.password,10);
    this.password = newPassword;
    next();
});

userSchema.method('generateToken',function(){
    return jwt.sign({id : this._id},process.env.JWT_SECRET_KEY,{ expiresIn: process.env.TOKEN_EXPIRE });
})

userSchema.method('comparePassword',function(password){
    return bcrypt.compareSync(password,this.password);
})

userSchema.method('generateResetPasswordToken',function(){
    // generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");
    // Hashing and addind resetPasswordToken to User Schema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;    
})


const User = mongoose.model('user',userSchema);

module.exports = User