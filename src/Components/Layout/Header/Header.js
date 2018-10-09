import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    Divider,
    Typography,
    Avatar,
    Button,
    Input,
    Grid,
    Menu,
    MenuItem,
    Switch
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import * as actionTypes from '../../../Store/Actions/actionTypes';
import axios from 'axios';
import { withRouter } from 'react-router'
import style from './HeaderStyle';
import PostService from '../../../Services/PostService';

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
    logOut = () => {
        this.setState({ anchorEl: null });
        this.props.logout();
        this.props.resetPostReducer();
        this.props.handleOpenSnackBar("Successfully Logged Out");
    }

    handleSearch = async (e) => {
        if (e.keyCode === 13) {
            let search = e.target.value;
            let url = '/post/search/?search=' + search;
            const searchPostResponse = await PostService.searchPost(url);
            if (searchPostResponse.success) {
                this.props.history.push('/signin');
                this.props.history.push({
                    pathname: '/search',
                    search: '?search=' + search,
                    state: { searchResult: searchPostResponse.result }
                });
            }
        }
    }

    handleChangeTheme = () => {
        this.props.changeThemeReducer(!this.props.isDark);
    }


    render() {
        const { classes } = this.props;
        return (
            <AppBar position="fixed" color="primary" className={classes.HeaderContainer} >
                <Toolbar>
                    <NavLink to='/' style={{ textDecoration: 'none' }}>
                        <Typography variant="title" style={{ color: "white" }}>
                            BlogIt
                        </Typography>
                    </NavLink>
                    <Grid container justify="flex-end"

                    >
                        <div className={classes.grow} />
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <Input
                                placeholder="Search…"
                                disableUnderline
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                class="search"
                                id="searchString"
                                onKeyDown={this.handleSearch}
                            />

                        </div>

                        <Switch
                            checked={this.state.checkedB}
                            onChange={this.handleChangeTheme}
                            checked={!this.props.isDark}
                            color="primary"
                        />
                        {this.props.auth ?
                            <nav className={classes.ButtonContainer}>
                                <Grid container
                                    direction="row">
                                    <Grid item>
                                        <Button color="inherit" size="small" className={classes.button} component={NavLink} to="/">
                                            <HomeIcon className={classes.IconLeft} />
                                            Home
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button color="inherit" size="small" className={classes.button} component={NavLink} to="/createpost"> Create Blog</Button>
                                    </Grid>
                                    <Grid item>
                                        <Avatar
                                            sizes='small'
                                            alt="Profile Picture"
                                            src={this.props.profileImage}
                                            className={classes.button}
                                            aria-owns={this.state.anchorEl ? 'simple-menu' : null}
                                            aria-haspopup="true"
                                            onClick={this.handleClick}>

                                        </Avatar>
                                    </Grid>
                                </Grid>
                            </nav>
                            : <nav className={classes.ButtonContainer}>
                                <Button color="inherit" size="small" className={classes.button} component={NavLink} to="/signin"> SignIn</Button>
                                <Button color="inherit" size="small" className={classes.button} component={NavLink} to="/signup"> SIGNUP</Button>
                                <Button color="inherit" size="small" className={classes.button} component={NavLink} to="/">
                                    <HomeIcon className={classes.IconLeft} />
                                    Home
                    </Button>
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
                            <NavLink to="/dashboard" className={classes.Links}><MenuItem onClick={this.handleClose}>Dashboard</MenuItem></NavLink>
                            <Divider />
                            <NavLink to="/profile" className={classes.Links} ><MenuItem onClick={this.handleClose}>Profile</MenuItem></NavLink>
                            <Divider />
                            <NavLink to="/drafts" className={classes.Links}><MenuItem onClick={this.handleClose}>Drafts</MenuItem></NavLink>
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
        auth: state.authReducer.auth,
        profileImage: state.authReducer.profileImage,
        isDark: state.themeReducer.isDark
    }
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch({ type: actionTypes.LOGOUT }),
        resetPostReducer: () => dispatch({ type: actionTypes.RESET_POST_CONTENT }),
        changeThemeReducer: (status) => dispatch({ type: actionTypes.THEME_HANDLER, ChangeTheme: status }),
        handleOpenSnackBar: (message) => dispatch({
            type: actionTypes.SNACKBAR_OPEN,
            snackBarMessage: message
        })
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Header)));