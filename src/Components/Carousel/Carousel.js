import React from 'react';
import Slider from "react-slick";
import axios from 'axios';
import {  NavLink } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import ReactHtmlParser from 'react-html-parser';

const style = {
    Links :{
        textDecoration : 'none',
        color:"black"
    }
}


class Carousel extends React.Component {
    
    state = {
        popularPosts : [
            {
                title:"",
                postId:"",
                postContent:''
                
            },
            {
                title:"",
                postId:"",
                postContent:''                
            },
            {
                title:"",
                postId:"",
                postContent:''
                
            },
            {
                title:"",
                postId:"",
                postContent:''
                
            },
            {
                title:"",
                postId:"",
                postContent:''
            }
        ]
    }

    componentDidMount(){
        axios.get('/post/popular')
        .then((response)=>{
            
            this.setState({
                popularPosts:response.data.result
            })
            
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    getSmallContent = () =>{
        let firstPostContent =  this.state.popularPosts[0].postContent.substr(0,500) + "...";
          let secondPostContent =  this.state.popularPosts[1].postContent.substr(0,500) + "...";
          let thirdPostContent =  this.state.popularPosts[2].postContent.substr(0,500) + "...";
          let fourthPostContent =  this.state.popularPosts[3].postContent.substr(0,500) + "...";
          let fifthPostContent =  this.state.popularPosts[4].postContent.substr(0,500) + "..."; 
        return [firstPostContent,secondPostContent,thirdPostContent,fourthPostContent,fifthPostContent]
        }   

    render() {

        const {classes} = this.props;   

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
            adaptiveHeight: false,
            
          };

          let firstUrl = "/post/"+this.state.popularPosts[0].postId;
          let secondUrl = "/post/"+this.state.popularPosts[1].postId;
          let thirdUrl = "/post/"+this.state.popularPosts[2].postId;
          let fourthUrl = "/post/"+this.state.popularPosts[3].postId;
          let fifthUrl = "/post/"+this.state.popularPosts[4].postId;

           

           let smallContentArray = this.getSmallContent();

        return(
            
            <div className={classes.Container} style={{textAlign:'center' , marginTop:'50px'}}>
            
                <Slider {...settings}>

                    <NavLink to={firstUrl} className={classes.Links} >
                    <div className={classes.Carousel} >
                    
                    <h1>{this.state.popularPosts[0].title}</h1>
                        <p>{ReactHtmlParser(smallContentArray[0])}</p>
                        <p>Likes:{this.state.popularPosts[0].likes}</p>
                        <p>Views:{this.state.popularPosts[0].views}</p>
                        <p>Date:{this.state.popularPosts[0].postDate}</p>
                        
                    </div>
                    </NavLink>
                   <NavLink to={secondUrl} className={classes.Links} >  
                    <div className={classes.Carousel}>
                        <h1>{this.state.popularPosts[1].title}</h1>
                        <p>{ReactHtmlParser(smallContentArray[1])}</p>
                        <p>Likes:{this.state.popularPosts[1].likes}</p>
                        <p>Views:{this.state.popularPosts[1].views}</p>
                        <p>Date:{this.state.popularPosts[1].postDate}</p>
                    </div>  
                    </NavLink>
                    <NavLink to={thirdUrl} className={classes.Links}>
                    <div className={classes.Carousel}>
                        <h1>{this.state.popularPosts[2].title}</h1>
                        <p>{ReactHtmlParser(smallContentArray[2])}</p>
                        <p>Likes:{this.state.popularPosts[2].likes}</p>
                        <p>Views:{this.state.popularPosts[2].views}</p>
                        <p>Date:{this.state.popularPosts[2].postDate}</p>
                    </div>  
                    </NavLink>
                   
                    <NavLink to={fourthUrl} className={classes.Links}>
                    <div className={classes.Carousel}>
                        <h1>{this.state.popularPosts[3].title}</h1>
                        <p>{ReactHtmlParser(smallContentArray[3])}</p>
                        <p>Likes:{this.state.popularPosts[3].likes}</p>
                        <p>Views:{this.state.popularPosts[3].views}</p>
                        <p>Date:{this.state.popularPosts[3].postDate}</p>
                    </div> 
                    </NavLink >
                    <NavLink to={fifthUrl} className={classes.Links}> 
                    <div className={classes.Carousel}>
                        <h1>{this.state.popularPosts[4].title}</h1>
                        <p>{ReactHtmlParser(smallContentArray[4])}</p>
                        <p>Likes:{this.state.popularPosts[4].likes}</p>
                        <p>Views:{this.state.popularPosts[4].views}</p>
                        <p>Date:{this.state.popularPosts[4].postDate}</p>
                    </div>
                    </NavLink>  
                
            </Slider>
            
                
            </div>
            
            )   
    
    }
   

}

export default withStyles(style)(Carousel);