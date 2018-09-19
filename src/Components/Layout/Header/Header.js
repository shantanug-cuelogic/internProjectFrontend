import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import * as actionTypes from '../../../Store/Actions/actionTypes';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';



const style = theme => ({

    button: {

        marginLeft: 10,
        marginRight: 10,
    
    },
    ButtonContainer: {
        float: '',
        display:'inline'
    },
    NavigationUl: {
        listStyle: 'none'
    },
    NavigationLi: {
        display: 'inline'
    },
    Links : {
        textDecoration:'none',
        color:'black'
    }
});

class Header extends React.Component {
    state = {
        anchorEl: null,
      };
    
      handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleClose = () => {
        this.setState({ anchorEl: null });
      };
    logOut = () =>{
        this.setState({ anchorEl: null });
        this.props.logout();
        this.props.resetPostReducer();
    }

    render() {
        
   
        const { classes } = this.props;
    return (
        <AppBar position="fixed" color="primary" >
            <Toolbar>
                <Typography variant="title" color="inherit">
                    HEADER
                 </Typography>
                    <Grid container justify="flex-end" 
                    
                    >
                    {this.props.auth ?

                  <nav className={classes.ButtonContainer}>
                    
                      <Grid container 
                      direction="row">
                      <Grid item>
                      <Button color="inherit" size="small"  className={classes.button} component={NavLink} to="/"> Home</Button>
                      </Grid>
                      <Grid item>
                      <Button color="inherit" size="small"  className={classes.button} component={NavLink} to="/createpost"> Create Blog</Button>
                      </Grid>
                      <Grid item>
                      <Avatar
                        sizes='small'
                        alt="Burger logo" 
                        src="/images/user-img.jpg" 
                        className={classes.button} 
                        aria-owns={this.state.anchorEl ? 'simple-menu' : null}
                        aria-haspopup="true"
                        onClick={this.handleClick}>
                        </Avatar>
                      </Grid>
                      </Grid>
                      
                      
                        
                   
                  </nav>
                  
                   
                    :<nav className={classes.ButtonContainer}>
                    <Button color="inherit" size="small"  className={classes.button} component={NavLink} to="/signin"> SignIn</Button>
                    <Button color="inherit" size="small"  className={classes.button} component={NavLink} to="/signup"> SIGNUP</Button>
                    <Button color="inherit" size="small"  className={classes.button} component={NavLink} to="/"> Home</Button>
                </nav> 
                    }
                    
                    <Menu
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleClose}
                        >
          <NavLink to="/" className={classes.Links} ><MenuItem onClick={this.handleClose}>Home</MenuItem></NavLink>
          <Divider />
          <NavLink to="/dashnoard" className={classes.Links}><MenuItem onClick={this.handleClose}>Dashboard</MenuItem></NavLink>
          <Divider />
          <NavLink to="/profile" className={classes.Links} ><MenuItem onClick={this.handleClose}>Profile</MenuItem></NavLink>
          <Divider />
          <NavLink to="/" className={classes.Links}><MenuItem onClick={this.logOut}>Logout</MenuItem></NavLink>
        </Menu>       
                         
                    </Grid>
                    
            </Toolbar>
        </AppBar>
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