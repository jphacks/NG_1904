import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './DemoCarousel.css';
 
export default function DemoCarousel() {
  return (
    <Carousel showThumbs={false} showStatus={false}  className="carousel-main">
        <div>
            <img src="assets/1.png" alt="pic1"/>
        </div>
        <div>
            <img src="assets/2.png" alt="pic2"/>
        </div>
        <div>
            <img src="assets/3.png" alt="pic3"/>
        </div>
    </Carousel>
  );
};
