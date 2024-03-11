import React from 'react';
import {BrowserRouter ,Routes ,Route} from 'react-router-dom';
import Header from './component/Layout/Header/Header';
import Footer from './component/Layout/Footer/Footer';
import Home from './component/Home/Home';
import LoginSignup from './component/LoginSignup/LoginSignup';
import ForgotPassword from './component/ForgotPassword/ForgotPassword';
import ResetPassword from './component/ResetPassword/ResetPassword';

const App = () => {
  return (
    <BrowserRouter>
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
