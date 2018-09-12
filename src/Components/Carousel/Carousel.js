import React from 'react';
import Slider from "react-slick";
import classes from './Carousel.css'

const carousel = (props) => {
    
    const settings = {
        className: "center",
        centerMode: false,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 1,
        speed: 500,
        dots: true,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        adaptiveHeight: true,
        
      };

    return(
        <div className={classes.Container}>
            <Slider {...settings}>
            <div className={classes.Carousel}>
                <h1>Blog 1</h1>
                <div>
                    <img src="burger-logo.png"></img>
                </div>
                <p>Blog content</p>
            </div>
            <div className={classes.Carousel}>
                <h1>Blog 2</h1>
                <div>
                    <img src="burger-logo.png"></img>
                </div>
                <p>Blog content</p>
            </div>
            <div className={classes.Carousel}>
                <h1>Blog 3</h1>
                <div>
                    <img src="burger-logo.png"></img>
                </div>
                <p>Blog content</p>
            </div>
            <div className={classes.Carousel}>
                <h1>Blog 4</h1>
                <div>
                    <img src="burger-logo.png"></img>
                </div>
                <p>Blog content</p>
            </div>
            <div className={classes.Carousel}>
                <h1>Blog 5</h1>
                <div>
                    <img src="burger-logo.png"></img>
                </div>
                <p>Blog content</p>
            </div>
            
        </Slider>
        </div>
        
        )   


}

export default carousel;