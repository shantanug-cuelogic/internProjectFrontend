import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: '100%',
    padding: theme.spacing.unit * 2,
    margin:'3%',
    
    
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
  link:{
    position: 'relative',
    bottom: '',
    right: '16px',
    fontSize: '18px',
    textDecoration :'none'
  }
});

function ComplexGrid(props) {
  const { classes } = props;
  let url="/post/"+props.postId;
  let content = props.summary.substr(0,250);  
  return ( 
    <div>
      <Paper className={classes.root}>
      <Grid container spacing={16}>
        
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={16}>
            <Grid item xs>
              <Typography gutterBottom variant="subheading">
                {props.title}
              </Typography>
              <Typography gutterBottom>{props.date}</Typography>
              <Typography color="textSecondary"></Typography>
          <div>{content}</div>
              
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
            <Link to={url} >Continue Reading</Link>
            </li>
          </ul> 
          </div>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
    </div>
    
  );
}

ComplexGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComplexGrid);
