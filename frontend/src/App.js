import React, { useEffect } from 'react';
import axios from 'axios';
import {BrowserRouter ,Routes ,Route} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import {useDispatch } from 'react-redux'
import {setUserDetail} from './Reducers/UserReducer/getUserDetailsReducer'
import toast from 'react-hot-toast';
import Header from './component/Layout/Header/Header';
import Footer from './component/Layout/Footer/Footer';
import Home from './component/Home/Home';
import LoginSignup from './component/LoginSignup/LoginSignup';
import ForgotPassword from './component/ForgotPassword/ForgotPassword';
import ResetPassword from './component/ResetPassword/ResetPassword';


const App = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    const getDetails = async () => {
      try {
        const response = await axios.get('/api/v1/me');
        dispatch(setUserDetail(response.data.user));
      } catch (error) {
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
        <Route path='/login' element={<LoginSignup />}/>
        <Route path='/password/forgot' element={<ForgotPassword />}/>
        <Route path='/password/reset/:token' element={<ResetPassword />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
