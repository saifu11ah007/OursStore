import React from 'react';
import Navbar from './components/WebNav';
import MainSlider from './components/MainSlider';
import Products from './components/Products';
import { Outlet } from 'react-router-dom'; // Import Outlet for nested routes


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
