import React from 'react';
import '../App.css';
import { Button } from 'antd';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      
      <p>Want to give the gift of life?</p>
      <p>Help an anemic person right now</p>
      <div className='hero-btns'>
        <Button
          className='btns'
        >
          GET STARTED
        </Button>
        <Button
          className='btns'
         
        >
          Donate Now 
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
