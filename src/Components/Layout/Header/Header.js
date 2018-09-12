import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const header = (props) => {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="title" color="inherit">
                    Header
                 </Typography>
            </Toolbar>
                   
        </AppBar>
    );
}

export default header;