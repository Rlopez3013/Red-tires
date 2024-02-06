import React from 'react';
import '../App.css';
import home_img from '../images/home_img.jpg';

function Home() {
  return (
     <div className='background'>
      <h1>This is home</h1>

     <img src={home_img} height={150} width={150} />
    </div>
  );
}

export default Home;
