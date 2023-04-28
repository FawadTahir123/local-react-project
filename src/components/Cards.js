import React from 'react';
import './Cards.css';
import { Card } from 'antd';

function Cards() {
  return (
    <div className='cards'>
      <h1>Key Features</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <Card
            style={{margin: "5%"}}
              title='Spread the Word to Save Lives'
              label='Spread the Word'
            />
            <Card
                        style={{margin: "5%"}}

              title='Help us in saving lives by adopting a thalassemic patient'
            />
          </ul>
          <ul className='cards__items'>
            <Card
                        style={{margin: "5%"}}

              title='Ready to donate blood to save lives'
            />
            <Card
                        style={{margin: "5%"}}

              title='Need blood or need a sponsor'  
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
