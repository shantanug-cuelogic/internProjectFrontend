import React from 'react';
import Slider from "react-slick";
import classes from './Carousel.css'
import axios from 'axios';
import { Typography } from '@material-ui/core';

class Carousel extends React.Component {
    
    state = {
        popularPosts : []
    }

    componentDidMount(){
        axios.get('/post/popular')
        .then((response)=>{
            
            this.setState({
                popularPosts:response.data.result
            })
            console.log(this.state.popularPosts[0].title)
        })
        .catch((error)=>{
            console.log(error)
        })
    }


    render() {
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
{/*                  
                    <div className={classes.Carousel}>
                        <h1>{this.state.popularPosts[0].title}</h1>
                        <p>Blog content</p>
                        <p>Likes:{this.state.popularPosts[0].likes}</p>
                        <p>Views:{this.state.popularPosts[0].views}</p>
                        <p>Date:{this.state.popularPosts[0].postDate}</p>
                    </div>  */}
                    <div className={classes.Carousel}>
                        <h1>Blog 1</h1>
                        <div>
                            <img src="burger-logo.png"></img>
                        </div>
                        <p>Blog content</p>
                    </div>
                    <div className={classes.Carousel}>
                        <h1>Blog 1</h1>
                        <div>
                            <img src="burger-logo.png"></img>
                        </div>
                        <p>Blog content</p>
                    </div>
                    <div className={classes.Carousel}>
                        <h1>Blog 1</h1>
                        <div>
                            <img src="burger-logo.png"></img>
                        </div>
                        <p>Blog content</p>
                    </div>
                    <div className={classes.Carousel}>
                        <h1>Blog 1</h1>
                        <div>
                            <img src="burger-logo.png"></img>
                        </div>
                        <p>Blog content</p>
                    </div>
                
            </Slider>
            
                
            </div>
            
            )   
    
    }
   

}

export default Carousel;