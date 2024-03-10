import React from 'react';
import {BrowserRouter ,Routes ,Route} from 'react-router-dom';
import Header from './component/Layout/Header/Header';
import Footer from './component/Layout/Footer/Footer';
import Home from './component/Home/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Header />  
      <Routes>
        <Route path='/' element={<Home />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
