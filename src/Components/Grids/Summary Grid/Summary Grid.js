import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import classess from './Summary Grid';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Editor from '../../Editor/Editor';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: '100%',
    padding: theme.spacing.unit * 2,
    margin:'3%'
    
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
  
  return ( 
    <div className = {classess.Container} >
      <Paper className={classes.root}>
      <Grid container spacing={16}>
        <Grid item>
          <ButtonBase className={classes.image}>
            <img className={classes.img} alt="complex" src="burger-logo.png" />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={16}>
            <Grid item xs>
              <Typography gutterBottom variant="subheading">
                {props.title}
              </Typography>
              <Typography gutterBottom>{props.name}</Typography>
              <Typography color="textSecondary">{props.summary}</Typography>
            </Grid>
            
          </Grid>
          <Grid item>
            <Typography variant="subheading">{props.views}</Typography>
          </Grid>
          <Grid item>
         <Router> 
         <div>
          <ul>
            <li>
            <Link to='/editor'>Continue Reading</Link>
            </li>
          </ul> 
          
          </div>
          </Router>
             
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
