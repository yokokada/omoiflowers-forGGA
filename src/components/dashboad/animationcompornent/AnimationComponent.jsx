import React, { useState, useEffect } from 'react';
import './AnimationCompornent.css'
import { Button } from '@chatscope/chat-ui-kit-react';
import Png from './OmoiflowersPng'
import OmoiflowersData from './OmoiflowersData'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const AnimationComponent = () => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
       
      };
    return (
        <div>
            <Slider {...settings}>
             <Png/>
            <OmoiflowersData/>
            </Slider>
        </div>    
    );
};

export default AnimationComponent;
