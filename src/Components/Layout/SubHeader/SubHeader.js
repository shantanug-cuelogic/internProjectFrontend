import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router'
import { Button, Paper, Grid } from '@material-ui/core';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import * as actionTypes from '../../../Store/Actions/actionTypes';

const style = theme => ({
    SubHeaderContainer: {
        marginTop: '1%'
    },
    SubHeader: {
        marginTop: '60px',
        zIndex: 1000,
        position: 'fixed'
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
                    <Paper className={classes.SubHeader} position="static">
                        <Button variant="text" color="primary" component={NavLink} to='/category/technology'> Technology</Button>
                        <Button variant="text" color="primary" component={NavLink} to='/category/travel'> Travel </Button>
                        <Button variant="text" color="primary" component={NavLink} to='/category/style'> Style </Button>
                        <Button variant="text" color="primary" component={NavLink} to='/category/business'> Business </Button>
                        <Button variant="text" color="primary" component={NavLink} to='/category/politics'> Politics </Button>
                        <Button variant="text" color="primary" component={NavLink} to='/category/science'> Science </Button>

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

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch({ type: actionTypes.LOGOUT }),
        resetPostReducer: () => dispatch({ type: actionTypes.RESET_POST_CONTENT })
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Header)));