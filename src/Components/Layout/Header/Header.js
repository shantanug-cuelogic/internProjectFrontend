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
import { fade } from '@material-ui/core/styles/colorManipulator';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import * as actionTypes from '../../../Store/Actions/actionTypes';
import axios from 'axios';
import { withRouter } from 'react-router'


const style = theme => ({

    button: {

        marginLeft: 10,
        marginRight: 10,

    },
    ButtonContainer: {
        float: '',
        display: 'inline'
    },
    NavigationUl: {
        listStyle: 'none'
    },
    NavigationLi: {
        display: 'inline'
    },
    Links: {
        textDecoration: 'none',
        color: 'black'
    },
    IconLeft: {

    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        height: 30,
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 400,

            },
        },
    },
    HeaderContainer: {
        zIndex: 1000
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
    logOut = () => {
        this.setState({ anchorEl: null });
        this.props.logout();
        this.props.resetPostReducer();
        this.props.handleOpenSnackBar("Successfully Logged Out");
    }

    handleSearch = (e) => {
        if (e.keyCode === 13) {
            let search = e.target.value;
            let url = '/post/search/?search=' + search;
            axios.get(url)
                .then((response) => {
                    this.props.history.push('/signin');
                    this.props.history.push({
                        pathname: '/search',
                        search: '?search=' + search,
                        state: { searchResult: response.data }
                    });
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    handleChangeTheme = () => {
        console.log(this.props.isDark);
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