import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

const style = theme =>({

    button:{
        float:'left',
        marginLeft:10,
        marginRight:10,
    }

});




const header = (props) => {
        const {classes} = props;
    return (
        <AppBar position="fixed" color="primary" >
            <Toolbar >
                
                <Typography variant="title" color="inherit">
                    Header
                 </Typography>
                 <Button color="secondary" size="small" variant="raised" className={classes.button}> SignIn</Button>
                 <Button color="secondary" size="small" variant="raised"> SIGNUP</Button>
            </Toolbar>
                   
        </AppBar>
    );
}

export default withStyles(style)(header);