import React from 'react';
import Slider from "react-slick";
import classes from './Carousel.css'
import Paper from '@material-ui/core/Paper';


const carousel = (props) => {
    
    const settings = {
        className: "center",
        centerMode: false,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 1 ,
        speed: 500,
        dots: true,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        adaptiveHeight: true,
        
      };

    return(

        <div className={classes.Container} style={{textAlign:'center' , marginTop:'50px'}}>
        
            <Slider {...settings}>
            <Paper>
                <div className={classes.Carousel}>
                    <h1>Blog 1</h1>
                    <div>
                        <img src="burger-logo.png"></img>
                    </div>
                    <p>Blog content</p>
                </div>
            </Paper>
            <Paper>
                <div className={classes.Carousel}>
                    <h1>Blog 1</h1>
                    <div>
                        <img src="burger-logo.png"></img>
                    </div>
                    <p>Blog content</p>
                </div>
            </Paper>
            <Paper>
                <div className={classes.Carousel}>
                    <h1>Blog 1</h1>
                    <div>
                        <img src="burger-logo.png"></img>
                    </div>
                    <p>Blog content</p>
                </div>
            </Paper>
            <Paper>
                <div className={classes.Carousel}>
                    <h1>Blog 1</h1>
                    <div>
                        <img src="burger-logo.png"></img>
                    </div>
                    <p>Blog content</p>
                </div>
            </Paper>
            <Paper>
                <div className={classes.Carousel}>
                    <h1>Blog 1</h1>
                    <div>
                        <img src="burger-logo.png"></img>
                    </div>
                    <p>Blog content</p>
                </div>
            </Paper>
            
        </Slider>
        
            
        </div>
        
        )   


}

export default carousel;