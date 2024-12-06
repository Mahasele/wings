// components/Banner.js
import React from 'react';
import './Banner.css';
import bannerImage from './food.jpg'; // Update path to reflect location in `src


function Banner() {
  return (
    <section className="banner" style={{ backgroundImage: `url(${bannerImage})` }}>
      <div className="banner-content">
        <h1>Order Your Favourite Food Here</h1>
        <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise.</p>
        <button className="view-menu">View Menu</button>
      </div>
    </section>
  );
}

export default Banner;
