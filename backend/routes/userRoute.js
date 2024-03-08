const express = require('express');
const { registerController, loginController, profileDetailController, profileUpdate, passwordUpdate, getAllUserController, getUserController, updateRoleController, deleteUser, forgetPasswordController, resetPasswordController, logoutController } = require('../controller/userController');
const {isAuthenticated, isAdmin} = require('../middleware/auth')
const route = express.Router();

route.post('/register',registerController);
route.post('/login',loginController); 
route.get('/logout',logoutController);
route.get('/me',isAuthenticated,profileDetailController);  
route.put('/profile/update',isAuthenticated,profileUpdate);         
route.put('/password/update',isAuthenticated,passwordUpdate);
route.put('/password/forget',forgetPasswordController);
route.put('/password/reset/:token',resetPasswordController);



// admin routes
route.get('/admin/users',isAuthenticated,isAdmin,getAllUserController);  
route.get('/admin/user/:id',isAuthenticated,isAdmin,getUserController);
route.put('/admin/user/:id',isAuthenticated,isAdmin,updateRoleController);   
route.delete('/admin/user/:id',isAuthenticated,isAdmin,deleteUser);

module.exports = route;


