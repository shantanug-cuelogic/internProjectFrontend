import React from 'react'; 
import {  NavLink } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { Grid , Typography, Divider } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';


const style = theme =>({
    Links :{
        textDecoration : 'none',
        color:"black",
    },
    PostText : {
        float : 'left',
        padding:10,
    },
    ThumbnailContainer : {
        backgroundColor:'white',
        height:'350px',
        width:'40%',
        float:'right',
        textAlign:'center',
        
    },
    Thumbnail : {
        height:'350px',
        padding:'10px'
    }
});


const popularPost = (props) => {
const { classes } = props;
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

return(
        
            <NavLink to={props.url} className={classes.Links} >
                    <Grid 
                    container
                    direction="row"
                    className={classes.Carousel} 
                   >
                            <Grid item  sm={7} className={classes.PostText} style={{display:'inline'}}>
                            <Typography variant="display2" color="textPrimary" >{props.postTitle}</Typography>
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
                            {ReactHtmlParser(props.postContent,options)}
                            </Typography>
                          <div>
                          <Typography variant="caption">Views:{props.views}</Typography>
                          </div>
                            </Grid>
                            <Grid item className={classes.ThumbnailContainer}>
                                <img src={props.thumbnail } alt="thumbnail" className={classes.Thumbnail}></img>
                            </Grid>
                    </Grid>
                    </NavLink>
        
    );
}

export default withStyles(style)(popularPost);