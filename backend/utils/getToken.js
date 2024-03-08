exports.getToken = (user,status,res) => {
    const token = user.generateToken();
    const option = {
        expires: new Date(Date.now() + Number(process.env.COOKIE_EXPIRE)*60*60*1000),
        httpOnly: true
    }
    return res.status(status).cookie('token',token,option).json({success:true, user, token});
}