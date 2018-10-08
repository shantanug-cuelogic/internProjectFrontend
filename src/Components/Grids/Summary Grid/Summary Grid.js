import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid,Paper,Typography } from '@material-ui/core';
import { NavLink } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: '100%',
    padding: theme.spacing.unit * 2,
    margin: '3%',
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
  ThumbnailContainer: {
    height: 230,
    width: 400
  },
  Thumbnail: {
    height: '23'
  }
});


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
function ComplexGrid(props) {
  const { classes } = props;
  let url = "/post/" + props.postId;
  let content = props.summary.substr(0, 500) + "...";
  return (
    <div>
      <Paper className={classes.root}>
        <NavLink to={url} className={classes.Links} >
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
                  <div style={{ display: 'inline' }}>
                    {ReactHtmlParser(content, options)}
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className={classes.ThumbnailContainer}>
                  <img src={props.thumbnail} style={{ height: 230 }} alt="Thumbnail"></img>
                </div>
              </Grid>

            </Grid>

          </div>
        </NavLink>
      </Paper>
    </div>

  );
}

ComplexGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComplexGrid);
