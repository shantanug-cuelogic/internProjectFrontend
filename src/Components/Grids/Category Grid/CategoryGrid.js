import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card , Divider } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ReactHtmlParser from 'react-html-parser';
import { NavLink } from "react-router-dom";
import { withRouter } from 'react-router'

const styles = {
  card: {
    width: 345,
    height:330  
    
  },
  media: {
    height: 140,
    width:345
  },
  Links:{
      textDecoration:'none',
      color:'black'
  },
  Divider : {
    margin:'0'
  }
};

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

const categoryGrid =(props) => {
    const url = "/post/"+props.postId
  const { classes } = props;
  return (
    <NavLink to={url} className={classes.Links} >
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.thumbnail}
          title={props.postTitle}
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {props.postTitle}
          </Typography>
          <Typography component="p">
           
           {ReactHtmlParser(props.postContent.substr(0,150),options)}

          </Typography>
        </CardContent>
      </CardActionArea>
      <div className={classes.Divider}>
      Likes : {props.likes} Views : {props.views}
      </div>
      
      
    </Card>
    </NavLink>
  );
}

categoryGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(categoryGrid));
