import React from 'react';
import Slider from "react-slick";
import axios from 'axios';
import {  NavLink } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import ReactHtmlParser from 'react-html-parser';
import { Grid , Paper, Typography, Hidden, Divider } from '@material-ui/core';

const style = {
    Links :{
        textDecoration : 'none',
        color:"black",
        
    },
    CarouselContainer : {
        height:'370px',
        backgroundColor:'white'
    
    },
    ThumbnailContainer : {
        backgroundColor:'white',
        height:'350px',
        width:'40%',
        float:'right',
        textAlign:'center',
        
    },
    PostText : {
        float : 'left',
        padding:10,
    },
    Container : {
        marginTop:'10%',
        padding:20  
    },
    Thumbnail : {
        height:'350px',
        padding:'10px'
    }

}


class Carousel extends React.Component {
    
    state = {
        popularPosts : [
            {
                title:"",
                postId:"",
                postContent:'',
                thumbnail:''
                
            },
            {
                title:"",
                postId:"",
                postContent:'' ,
                thumbnail:''               
            },
            {
                title:"",
                postId:"",
                postContent:'',
                thumbnail:''
                
            },
            {
                title:"",
                postId:"",
                postContent:'',
                thumbnail:''
                
            },
            {
                title:"",
                postId:"",
                postContent:'',
                thumbnail:''
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
 render() {
        const {classes} = this.props;   
  
        const options = {
            decodeEntities: true,
            transform 
            };
          
          function transform(node, index) {
       
            if (node.type === 'tag' && node.name === 'img') {
              return null;
            }
            if (node.type === 'tag' && node.name === 'video') {
              return null;
            }           
          }
        

        const settings = {
            className: "center",
            centerMode: false,
            infinite: true,
            centerPadding: "60px",
            slidesToShow: 1 ,
            speed: 2000,
            dots: true,
            autoplay: true,
            autoplaySpeed: 6000,
            pauseOnHover: true,
            adaptiveHeight: true,
            
          };

          let firstUrl = "/post/"+this.state.popularPosts[0].postId;
          let secondUrl = "/post/"+this.state.popularPosts[1].postId;
          let thirdUrl = "/post/"+this.state.popularPosts[2].postId;
          let fourthUrl = "/post/"+this.state.popularPosts[3].postId;
          let fifthUrl = "/post/"+this.state.popularPosts[4].postId;

        return(
            
            <div className={classes.Container}  >
                <Typography variant="display1"  > Most Popular ... </Typography>
                <Paper>
                <div style={{overflow:'hidden'}}>
                <Slider {...settings} className={classes.CarouselContainer}  >
                        
                    <NavLink to={firstUrl} className={classes.Links} >
                    <Grid 
                    container
                    direction="row"
                    className={classes.Carousel} 
                    
            
                   >
                        
                            <Grid item  sm={7} className={classes.PostText} style={{display:'inline'}}>
                            <Typography variant="display2" color="textPrimary" >{this.state.popularPosts[0].title}</Typography>
                           <Divider />
                            <Typography variant="body2">
                            <style jsx="true">
                                {`
                                    p {
                                    margin-top :0px;
                                    margin-bottom:0px;
                                         }
                                `}
                            </style>
                            {ReactHtmlParser(this.state.popularPosts[0].postContent,options)}
                            </Typography>
                          <div>
                          <Typography variant="caption">Views:{this.state.popularPosts[0].views}</Typography>
                           
                          </div>
                            </Grid>
                            
                            <Grid item className={classes.ThumbnailContainer}>
                                <img src={this.state.popularPosts[0].thumbnail } alt="thumbnail" className={classes.Thumbnail}></img>
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
                            <Typography variant="display2" color="textPrimary" >{this.state.popularPosts[1].title}</Typography>
                            <Typography variant="body2">
                            <style jsx="true">
                                {`
                                    p {
                                    margin-top : 0px;
                                    margin-bottom:0px;
                                         }
                                `}
                            </style>
                            {ReactHtmlParser(this.state.popularPosts[1].postContent,options)}
                            </Typography>
                          <div>
                          <Typography variant="caption">Views:{this.state.popularPosts[1].views}</Typography>
                           
                          </div>
                            </Grid>
                            
                            <Grid item className={classes.ThumbnailContainer}>
                                <img src={this.state.popularPosts[1].thumbnail } alt="thumbnail" className={classes.Thumbnail}></img>
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
                            <Typography variant="display2" color="textPrimary" >{this.state.popularPosts[2].title}</Typography>
                            <Typography variant="body2">
                            <style jsx="true">
                                {`
                                    p {
                                    margin-top : 0px;
                                    margin-bottom:0px;
                                         }
                                `}
                            </style>
                            {ReactHtmlParser(this.state.popularPosts[2].postContent,options)}
                            </Typography>
                          <div>
                          <Typography variant="caption">Views:{this.state.popularPosts[2].views}</Typography>
                           
                          </div>
                            </Grid>
                            
                            <Grid item className={classes.ThumbnailContainer}>
                                <img src={this.state.popularPosts[2].thumbnail } alt="thumbnail" className={classes.Thumbnail}></img>
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
                            <Typography variant="display2" color="textPrimary" >{this.state.popularPosts[3].title}</Typography>
                            <Typography variant="body2">
                            <style jsx="true">
                                {`
                                    p {
                                    margin-top : 0px;
                                    margin-bottom:0px;
                                         }
                                `}
                            </style>
                            {ReactHtmlParser(this.state.popularPosts[3].postContent,options)}
                            </Typography>
                          <div>
                          <Typography variant="caption">Views:{this.state.popularPosts[3].views}</Typography>
                           
                          </div>
                            </Grid>
                            
                            <Grid item className={classes.ThumbnailContainer}>
                                <img src={this.state.popularPosts[3].thumbnail } alt="thumbnail" className={classes.Thumbnail}></img>
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
                            <Typography variant="display2" color="textPrimary" >{this.state.popularPosts[4].title}</Typography>
                            <Typography variant="body2">
                            <style jsx="true">
                                {`
                                    p {
                                    margin-top : 0px;
                                    margin-bottom:0px;
                                         }
                                `}
                            </style>
                            {ReactHtmlParser(this.state.popularPosts[4].postContent,options)}
                            </Typography>
                          <div>
                          <Typography variant="caption">Views:{this.state.popularPosts[4].views}</Typography>
                           
                          </div>
                            </Grid>
                            
                            <Grid item className={classes.ThumbnailContainer}>
                                <img src={this.state.popularPosts[4].thumbnail } alt="thumbnail" className={classes.Thumbnail}></img>
                            </Grid>
                        
                    </Grid>
                    </NavLink>
                     
            </Slider>
            </div> 
            </Paper>
                
            </div>
            
            )   
    
    }
   

}

export default withStyles(style)(Carousel);