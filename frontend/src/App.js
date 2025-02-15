import React from 'react';
import Navbar from './components/WebNav';
import MainSlider from './components/MainSlider';
import Products from './components/Products';
import { Outlet } from 'react-router-dom'; // Import Outlet for nested routes
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div>
      <Navbar />
      <MainSlider />
      <Products/>
      <Outlet /> {/* This is where child routes like ProductScreen will render */}
    </div>
  );
};

export default App;
