import React, { useState, useEffect } from 'react';
import '../styles/MainSlider.css';
import slider1 from '../assets/banner.jpg';
import slider2 from '../assets/banner.avif';

const MainSlider = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [slider1, slider2];
  const titles = ['Sale Off 20%', 'Winter Arrivals'];
  const subtitles = ['Summer Offer 2020 Collection', 'Winter Collection 2020'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000); // Automatically change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider">
      <div
        className="slide"
        onMouseEnter={() => setCurrentImage(1)} // Hover switches image
        onMouseLeave={() => setCurrentImage(0)} // Reset on hover out
        style={{
          backgroundImage: `url(${images[currentImage]})`,
          transition: 'background-image 1s ease-in-out', // Smooth transition
        }}
      >
        <div className="slide-content">
          <h2>{titles[currentImage]}</h2>
          <p>{subtitles[currentImage]}</p>
          <button className="shop-btn">Shop Now</button>
        </div>
      </div>
    </div>
  );
};

export default MainSlider;
