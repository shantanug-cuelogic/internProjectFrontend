import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import * as actionTypes from '../../Store/Actions/actionTypes';
import { Typography, Button, Avatar, Grid } from '@material-ui/core';
import UserService from '../../Services/UserService';

const style = theme => ({
    AuthorContainer: {
        height: 70
    },
    AuthorAvatar: {
        height: 70,
        width: 70,
    },
    AuthorInfo: {
        height: 70,
        display: 'inline'
    },
});


class Author extends React.Component {
    handleFollow = async () => {

        const authorFollowResponse = await UserService.authorFollow(this.props.authorId);
        if (authorFollowResponse.success) {
            this.props.handleOpenSnackBar(authorFollowResponse.message);
            this.props.handleAuthorFollowAllowed(false);
        }
    }
    handleUnfollow = async () => {
        const authorUnfolloewResponse = await UserService.authorUnfollow(this.props.authorId);
        if (authorUnfolloewResponse.success) {
            this.props.handleAuthorFollowAllowed(true);
            this.props.handleOpenSnackBar(authorUnfolloewResponse.message);
        }
    }
    render() {
        const { classes } = this.props;
        let authorProfileUrl = "/authorprofile/" + this.props.postUserId;
        let followButton = null;
        if (this.props.authorId !== this.props.userId) {
            if (this.props.allowedToFollow === true) {
                followButton = <div>
                    <Button variant="outlined" color="primary" size="small" onClick={this.handleFollow} > Follow</Button>
                </div>
            }
            else if (this.props.allowedToFollow === false) {
                followButton = <div>
                    <Button variant="outlined" color="primary" size="small" onClick={this.handleUnfollow} > Unfollow</Button>
                </div>
            }
            else {
                followButton = null
            }
        }
        return (
            <div>
                <Grid
                    container
                    justify="center"
                >
                    <div className={classes.AuthorContainer} >
                        <NavLink to={authorProfileUrl} >
                            <Avatar src={this.props.authorProfileImage} className={classes.AuthorAvatar} style={{ float: 'left' }} ></Avatar>
                        </NavLink>
                        <div className={classes.AuthorInfo} style={{ float: 'left', marginLeft: 20 }}>
                            <Typography variant="subheading">{this.props.authorFirstName + " " + this.props.authorLastName}</Typography>
                            {followButton}
                            <Typography variant="caption" >{this.props.authorEmail}</Typography>
                        </div>
                    </div>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.authReducer.auth,
        userId: state.authReducer.userId,
        authToken: state.authReducer.authToken,
        authorFirstName: state.authorReducer.authorFirstName,
        authorLastName: state.authorReducer.authorLastName,
        authorProfileImage: state.authorReducer.authorProfileImage,
        authorEmail: state.authorReducer.authorEmail,
        authorId: state.authorReducer.authorId,
        allowedToFollow: state.authorReducer.allowedToFollow
    }
}


const mapDispatchToProps = dispatch => {
    return {
        handleOpenSnackBar: (snackBarMessage) => dispatch({
            type: actionTypes.SNACKBAR_OPEN,
            snackBarMessage: snackBarMessage
        }),
        handleAuthorFollowAllowed: (allowedToFollow) => dispatch({
            type: actionTypes.AUTHOR_FOLLOWED_ALLOWED,
            allowedToFollow: allowedToFollow
        })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Author));