import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { NavLink } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: '100%',
    padding: theme.spacing.unit * 2,
    margin: '3%',
    // height:'200px'

  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  Links: {
    color: 'black',
    textDecoration: 'none'
  },

});


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





function ComplexGrid(props) {
  const { classes } = props;
  let url = "/post/" + props.postId;
  let content = props.summary.substr(0, 500) + "...";
  return (
    <div>
      <Paper className={classes.root}>
        {/* <Grid container spacing={16}>
        
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={16}>
            <Grid item xs>
              <Typography gutterBottom variant="subheading">
                {props.title}
              </Typography>
              <Typography gutterBottom>{props.date}</Typography>
              <Typography color="textSecondary"></Typography>
          <div>{ReactHtmlParser(content,options)}</div>
              
            </Grid>
            
          </Grid>
          <Grid item>
            <Typography variant="subheading">{props.views}</Typography>
            <Typography variant="subheading">{props.likes}</Typography>
          </Grid>
          <Grid item>
         <div>
          <ul>
            <li>
            <NavLink to={url} className={classes.Links} >Continue Reading</NavLink>
            </li>
          </ul> 
          </div>
          </Grid>
        </Grid>
      </Grid> */}
        <div className={classes.PostContainer}>
          <Grid container
            direction="row"

            alignItems="stretch" >
            <style jsx="true">
              {`
                     img {
                     max-width : 100%
                         }
                                `}
            </style>
            <Grid item sm={6}>
              <div className={classes.PostTextContainer} style={{ display: "inline" }}>
                <Typography gutterBottom variant="headline" style={{ display: "inline" }}>
                  {props.title}
                </Typography>
                <Paper style={{ display: 'inline' }}>
                  {ReactHtmlParser(content, options)}
                </Paper>
              </div>
              <Grid item>
                <div>
                  <ul>
                    <li>
                      <NavLink to={url} className={classes.Links} >Continue Reading</NavLink>
                    </li>
                  </ul>
                </div>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className={classes.ThumbnailContainer}>
                <img src={props.thumbnail}></img>
              </div>
            </Grid>

          </Grid>

        </div>

      </Paper>
    </div>

  );
}

ComplexGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComplexGrid);
