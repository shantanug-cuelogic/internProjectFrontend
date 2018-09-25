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
  },
  CardContent:{
    height: 140,
    width:345,
    paddingLeft:0
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

class CategoryGrid extends React.PureComponent  {
   
  render() {
    const url = "/post/"+this.props.postId
    const { classes } = this.props;
    return (
      <div>
      <NavLink to={url} className={classes.Links} >
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={this.props.thumbnail}
            title={this.props.postTitle}
          />
          <CardContent className={classes.CardContent}>
            <Typography gutterBottom variant="headline" component="h2">
              {this.props.postTitle}
            </Typography>
            <Typography component="p" className={classes.CardPostContent}>
             
             {ReactHtmlParser(this.props.postContent.substr(0,150),options)}
  
            </Typography>
          </CardContent>
        </CardActionArea>
        <div className={classes.Divider}>
        Likes : {this.props.likes} Views : {this.props.views}
        </div>
        
        
      </Card>
      </NavLink>
      </div>
    );
  
  
}
}



export default withRouter(withStyles(styles)(CategoryGrid));
