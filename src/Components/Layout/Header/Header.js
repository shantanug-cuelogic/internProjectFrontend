import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Link, Switch,withRouter } from "react-router-dom";
import Routes from '../../../Routes';
import SignIn from '../../SIgn In/Sign In';
import SignUp from '../../Sign Up/Sign Up';
import BlogBuilder from '../../../Containers/BlogBuilder/BlogBuilder';


const style = theme => ({

    button: {

        marginLeft: 10,
        marginRight: 10,
    },
    ButtonContainer: {
        float: 'right'
    },
    NavigationUl: {
        listStyle: 'none'
    },
    NavigationLi: {
        display: 'inline'
    }


});




const header = (props) => {
    const { classes } = props;

  

    return (
        <AppBar position="fixed" color="primary" >
            <Toolbar >
                <Typography variant="title" color="inherit">
                    Header
                 </Typography>
                    <div className={classes.ButtonContainer}>
                        <Button color="secondary" size="small" variant="raised" className={classes.button} component={Link} to="/signin"> SignIn</Button>
                        <Button color="secondary" size="small" variant="raised" className={classes.button} component={Link} to="/signup"> SIGNUP</Button>
                    </div>
            </Toolbar>
        </AppBar>
    );
}

export default withStyles(style)(header);