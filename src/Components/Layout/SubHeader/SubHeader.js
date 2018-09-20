import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';

import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import * as actionTypes from '../../../Store/Actions/actionTypes';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Paper } from '@material-ui/core';



const style = theme => ({
    SubHeaderContainer : {
       
    },
    SubHeader:{
        marginTop:'60px',
        zIndex:1000,
          position:'fixed'    
    }
    
});

class Header extends React.Component {
    

    render() {
        
   
        const { classes } = this.props;
    return (
        <div className={classes.SubHeaderContainer} >
        <Grid container 
              direction="row"
              justify="center"
                
            >
         
        <Paper className = {classes.SubHeader} position="static">
        <Button variant="text" color="primary"> Technology</Button>
        <Button variant="text" color="primary"> Travel </Button>
        <Button variant="text" color="primary"> Style </Button>
        <Button variant="text" color="primary"> Business </Button>
        <Button variant="text" color="primary"> Politics </Button>
        <Button variant="text" color="primary"> Science </Button>
            
        </Paper>
            
        </Grid>
        </div>
    );
}
}

const mapStateToProps = state => {
    return {
        auth: state.authReducer.auth
    }
};

const mapDispatchToProps = dispatch =>{
    return {
        logout : () => dispatch({type: actionTypes.LOGOUT }),
        resetPostReducer : () => dispatch({type:actionTypes.RESET_POST_CONTENT})
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withStyles(style)(Header));