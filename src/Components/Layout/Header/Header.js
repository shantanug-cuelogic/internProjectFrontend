import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
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
        this.props.logout;
    }

    render() {
        
   
        const { classes } = this.props;
    return (
        <AppBar position="fixed" color="primary" >
            <Toolbar>
                <Typography variant="title" color="inherit">
                    Header
                 </Typography>
                    <Grid container justify="flex-end" 
                    
                    >
                    {this.props.auth ?

                  <nav className={classes.ButtonContainer}>
                      <Grid container 
                      direction="row"
                    
                      >
                      <Grid item>
                      <Button color="inherit" size="small"  className={classes.button} component={Link} to="/"> Home</Button>
                      
                      </Grid>
                      <Grid item>
                      <Button color="inherit" size="small"  className={classes.button} component={Link} to="/createpost"> Create Blog</Button>
                      
                      </Grid>
                      <Grid item>
                      <Avatar
                        sizes='small'
                        alt="Burger logo" 
                        src="burger-logo.png" 
                        className={classes.button} 
                        aria-owns={this.state.anchorEl ? 'simple-menu' : null}
                        aria-haspopup="true"
                        onClick={this.handleClick}>
                        </Avatar>
                      </Grid>
                      </Grid>
                      
                      
                        
                   
                  </nav>
                  
                   
                    :<nav className={classes.ButtonContainer}>
                    <Button color="inherit" size="small"  className={classes.button} component={Link} to="/signin"> SignIn</Button>
                    <Button color="inherit" size="small"  className={classes.button} component={Link} to="/signup"> SIGNUP</Button>
                    <Button color="inherit" size="small"  className={classes.button} component={Link} to="/"> Home</Button>
                </nav> 
                    }
                    
                    <Menu
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleClose}
                        >
          <MenuItem onClick={this.handleClose}><Link to="/" >Home</Link></MenuItem>
          <MenuItem onClick={this.handleClose}><Link to="/dashnoard">Dashboard</Link></MenuItem>
          <MenuItem onClick={this.handleClose}><Link to="/profile" >Profile</Link></MenuItem>
          <MenuItem onClick={this.props.logout}><Link to="/">Logout</Link></MenuItem>
        </Menu>       
                         
                    </Grid>
                    
            </Toolbar>
        </AppBar>
    );
}
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
};

const mapDispatchToProps = dispatch =>{
    return {
        logout : () => dispatch({type: actionTypes.LOGOUT })
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withStyles(style)(Header));