import React, { useEffect } from 'react';
import axios from 'axios';
import {BrowserRouter ,Routes ,Route} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import {useDispatch } from 'react-redux'
import {setUserDetail ,notFound} from './Reducers/UserReducer/getUserDetailsReducer'
import toast from 'react-hot-toast';
import Header from './component/Layout/Header/Header';
import Footer from './component/Layout/Footer/Footer';
import Home from './component/Home/Home';
import Contact from './component/Contact/Contact';
import About from './component/About/About';
import LoginSignup from './component/LoginSignup/LoginSignup';
import ForgotPassword from './component/ForgotPassword/ForgotPassword';
import ResetPassword from './component/ResetPassword/ResetPassword';
import CreateBlog from './component/CreateBlog/CreateBlog';
import MyBlogs from './component/MyBlogs/MyBlogs';
import AllBlogs from './component/AllBlogs/AllBlogs';
import BlogDetail from './component/BlogDetail.js/BlogDetail';
import EditBlog from './component/EditBlog/EditBlog';
import Account from './component/Account/Account';
import UpdatePassword from './component/UpdatePassword/UpdatePassword';
import UpdateProfile from './component/UpdateProfile/UpdateProfile';
import Dashboard from './component/Dashboard/Dashboard';
import NotFound from './component/Layout/NotFound/NotFound';


const App = () => {

  const dispatch = useDispatch();
  useEffect(()=>{
    const getDetails = async () => {
      try {
        const response = await axios.get('/api/v1/me');
        dispatch(setUserDetail(response.data.user));
      } catch (error) {
        dispatch(notFound());
        toast.error(error?.response?.data?.message || error.message);
      }
    }
    getDetails();
  },[dispatch])

  return (
    <BrowserRouter>
      <Toaster />
      <Header />  
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/login' element={<LoginSignup />}/>
        <Route path='/password/forgot' element={<ForgotPassword />}/>
        <Route path='/password/reset/:token' element={<ResetPassword />}/>
        <Route path='/blog/new' element={<CreateBlog />}/>        
        <Route path='/blogs/me' element={<MyBlogs />}/>
        <Route path='/blogs' element={<AllBlogs />}/>
        <Route path='/get/blog/:id' element={<BlogDetail />}/>  
        <Route path='/edit/blog/:id' element={<EditBlog />}/>
        <Route path='/account' element={<Account />}/>  
        <Route path='/password/update' element={<UpdatePassword />}/>        
        <Route path='/profile/update' element={<UpdateProfile />}/>  
        <Route path='/dashboard' element={<Dashboard />}/>  
        <Route path='*' element={<NotFound />}/>        
      </Routes>
      <Footer />
    </BrowserRouter>
  ) 
}

export default App;