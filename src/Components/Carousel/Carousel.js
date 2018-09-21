import React from 'react';
import Slider from "react-slick";
import axios from 'axios';
import {  NavLink } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import ReactHtmlParser from 'react-html-parser';
import { Grid , Paper } from '@material-ui/core';

const style = {
    Links :{
        textDecoration : 'none',
        color:"black"
    },
    CarouselContainer : {
        height:'500px'
    },
    ThumbnailContainer : {
        backgroundColor:'black',
        height:'500px',
        width:'40%',
        float:'right'
    },
    PostText : {
        float : 'left'
    },
    Container : {
        marginTop:'10%'
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
        let firstPostContent =  this.state.popularPosts[0].postContent.substr(0,1000) + "...";
          let secondPostContent =  this.state.popularPosts[1].postContent.substr(0,1000) + "...";
          let thirdPostContent =  this.state.popularPosts[2].postContent.substr(0,1000) + "...";
          let fourthPostContent =  this.state.popularPosts[3].postContent.substr(0,1000) + "...";
          let fifthPostContent =  this.state.popularPosts[4].postContent.substr(0,1000) + "..."; 
        return [firstPostContent,secondPostContent,thirdPostContent,fourthPostContent,fifthPostContent]
        } 
          

    render() {
        const {classes} = this.props;   
  
        const options = {
            decodeEntities: true,
            transform 
          };
          
          function transform(node, index) {
          
            // return null to block certain elements
            // don't allow <span> elements
            if (node.type === 'tag' && node.name === 'img') {
              return null;
            }
            if (node.type === 'tag' && node.name === 'video') {
              return null;
            }
          
            // Transform <ul> into <ol>
            // A node can be modified and passed to the convertNodeToElement function which will continue to render it and it's children
            // if (node.type === 'tag' && node.name === 'ul') {
            //   node.name = 'ol';
            //   return convertNodeToElement(node, index, transform);
            // }
          
            // return an <i> element for every <b>
            // a key must be included for all elements
            // if (node.type === 'tag' && node.name === 'b') {
            //   return <i key={index}>I am now in italics, not bold</i>;
            // }
          
            // all links must open in a new window
            // if (node.type === 'tag' && node.name === 'a') {
            //   node.attribs.target = '_blank';
            //   return convertNodeToElement(node, index, transform);
            
          
          }
        

        const settings = {
            className: "center",
            centerMode: false,
            infinite: true,
            centerPadding: "60px",
            slidesToShow: 1 ,
            speed: 6000,
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
            
            <div className={classes.Container}>
            
                <Slider {...settings} className={classes.CarouselContainer} >

                    <NavLink to={firstUrl} className={classes.Links} >
                    <Grid 
                    container
                    direction="row"
                    className={classes.Carousel} 
                    >
                        
                            <Grid item  sm={7} className={classes.PostText} style={{display:'inline'}}>
                            <h1 style={{display:'inline'}}>{this.state.popularPosts[0].title}</h1>
                            <p style={{display:'inline'}}>{ReactHtmlParser(smallContentArray[0],options)}</p>
                            <p>Views:{this.state.popularPosts[0].views}</p>
                            </Grid>
                            
                            <Grid item className={classes.ThumbnailContainer}>
                                <Paper>
                                    <div>
                                        
                                    </div>
                                </Paper>
                            </Grid>
                        
                    </Grid>
                    </NavLink>
                    <NavLink to={secondUrl} className={classes.Links} >
                    <Grid 
                    container
                    direction="row"
                    className={classes.Carousel} 
                    >
                        
                            <Grid item  sm={7} className={classes.PostText} style={{display:'inline'}}>
                            <h1 style={{display:'inline'}}>{this.state.popularPosts[1].title}</h1>
                            <p style={{display:'inline'}}>{ReactHtmlParser(smallContentArray[1],options)}</p>
                            <p>Views:{this.state.popularPosts[1].views}</p>
                            </Grid>
                            
                            <Grid item className={classes.ThumbnailContainer}>
                                <Paper>
                                    <div>
                                        
                                    </div>
                                </Paper>
                            </Grid>
                        
                    </Grid>
                    </NavLink>
                    <NavLink to={thirdUrl} className={classes.Links} >
                    <Grid 
                    container
                    direction="row"
                    className={classes.Carousel} 
                    >
                        
                            <Grid item  sm={7} className={classes.PostText} style={{display:'inline'}}>
                            <h1 style={{display:'inline'}}>{this.state.popularPosts[2].title}</h1>
                            <p style={{display:'inline'}}>{ReactHtmlParser(smallContentArray[2],options)}</p>
                            <p>Views:{this.state.popularPosts[2].views}</p>
                            </Grid>
                            
                            <Grid item className={classes.ThumbnailContainer}>
                                <Paper>
                                    <div>
                                        
                                    </div>
                                </Paper>
                            </Grid>
                        
                    </Grid>
                    </NavLink>
                    <NavLink to={fourthUrl} className={classes.Links} >
                    <Grid 
                    container
                    direction="row"
                    className={classes.Carousel} 
                    >
                        
                            <Grid item  sm={7} className={classes.PostText} style={{display:'inline'}}>
                            <h1 style={{display:'inline'}}>{this.state.popularPosts[3].title}</h1>
                            <p style={{display:'inline'}}>{ReactHtmlParser(smallContentArray[3],options)}</p>
                            <p>Views:{this.state.popularPosts[3].views}</p>
                            </Grid>
                            
                            <Grid item className={classes.ThumbnailContainer}>
                                <Paper>
                                    <div>
                                        
                                    </div>
                                </Paper>
                            </Grid>
                        
                    </Grid>
                    </NavLink>
                    <NavLink to={fifthUrl} className={classes.Links} >
                    <Grid 
                    container
                    direction="row"
                    className={classes.Carousel} 
                    >
                        
                            <Grid item  sm={7} className={classes.PostText} style={{display:'inline'}}>
                            <h1 style={{display:'inline'}}>{this.state.popularPosts[4].title}</h1>
                            <p style={{display:'inline'}}>{ReactHtmlParser(smallContentArray[4],options)}</p>
                            <p>Views:{this.state.popularPosts[4].views}</p>
                            </Grid>
                            
                            <Grid item className={classes.ThumbnailContainer}>
                                <Paper>
                                    <div>
                                        
                                    </div>
                                </Paper>
                            </Grid>
                        
                    </Grid>
                    </NavLink>

                
            </Slider>
            
                
            </div>
            
            )   
    
    }
   

}

export default withStyles(style)(Carousel);