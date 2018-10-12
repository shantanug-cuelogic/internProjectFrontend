import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { Paper, Button } from '@material-ui/core';
import StarRatingComponent from 'react-star-rating-component';
import RateModal from '../RatingModal/RatingModal';
import { NavLink } from "react-router-dom";
import LikeIcon from '@material-ui/icons/ThumbUp';
import UnlikeIcon from '@material-ui/icons/ThumbDown';
import * as actionTypes from '../../Store/Actions/actionTypes';
import { withRouter } from 'react-router';
import style from './PostContentBarStyle';
import PostService from '../../Services/PostService';

class PostContentBar extends React.Component {
    handleDeletePost = async () => {
        const postDeleteResponse = await PostService.deletePost(this.props.postId);
        if (postDeleteResponse.success) {
            this.props.handleOpenSnackBar("Post Deleted Succesfully")
            this.props.deletePostToReducer();
            this.props.history.push('/');
        }
    }
    handleLike = async () => {
        if (this.props.allowedToLike) {
            const addLikeResponse = await PostService.addLike(this.props.postId)
            if (addLikeResponse.success) {
                const totalLikes = await PostService.fetchTotalLikesToPost(this.props.postId);
                this.props.totalLikesToPostReducer(totalLikes);
                this.props.allowToLikePostReducer(false);
            }
        }
        else if (!this.props.allowedToLike) {
            const removeLikeResponse = await PostService.removeLike(this.props.postId);
            if (removeLikeResponse.success) {
                const totalLikes = await PostService.fetchTotalLikesToPost(this.props.postId);
                this.props.totalLikesToPostReducer(totalLikes);
                this.props.allowToLikePostReducer(true);
            }
        }
    }
    render() {
        const { classes } = this.props;
        let authorProfileUrl = "/authorprofile/" + this.props.postUserId;
        let editDeleteButton = null;
        let editPostUrl = '/editpost/' + this.props.postId

        if (this.props.postUserId === this.props.userId) {
            editDeleteButton = <div className={classes.EditButton}>
                <Button color="primary" variant="contained" component={NavLink} to={editPostUrl}>Edit Post</Button>
                <Button variant="outlined" className={classes.DeleteButton} onClick={this.handleDeletePost} >Delete Post</Button>
            </div>
        }

        let likeButton = null;

        if (this.props.auth) {
            if (this.props.allowedToLike) {
                likeButton = <Button onClick={this.handleLike}>
                    <LikeIcon className={classes.LikeButton} color="primary" />
                </Button>
            }
            else {
                likeButton = <Button onClick={this.handleLike}>
                    <UnlikeIcon className={classes.LikeButton} color="primary" />
                </Button>
            }
        }

        return (
            <div className={classes.EditButtonContainer}>
                <Paper >
                    {editDeleteButton}
                    {likeButton}
                    <div style={{ display: 'inline', marginRight: '10px' }}>
                        <p style={{ display: 'inline', marginRight: '10px' }}>Likes : {this.props.likes}</p>
                        <p style={{ display: 'inline' }}>Views : {this.props.views} </p>
                    </div>
                    <div style={{ display: 'inline', marginRight: 10 }} >
                        <StarRatingComponent
                            editing={false}
                            starCount={5}
                            value={this.props.rating}
                        />
                    </div>

                    <Button variant="outlined" component={NavLink} to={authorProfileUrl}>
                        View Authors Profile
                    </Button>
                    {this.props.auth ?
                        <div className={classes.RatingContainer}>
                            <RateModal ButtonName="Rate this post" postId={this.props.postId} style={{ display: 'inline' }} />
                        </div>
                        : null}


                </Paper>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        auth: state.authReducer.auth,
        isAdmin: state.authReducer.isAdmin,
        authToken: state.authReducer.authToken,
        userId: state.authReducer.userId,
        postContent: state.postReducer.postContent,
        postTitle: state.postReducer.postTitle,
        postId: state.postReducer.postId,
        postUserId: state.postReducer.userId,
        allcomments: state.postReducer.allcomments,
        allowedToLike: state.postReducer.allowedToLike,
        likes: state.postReducer.likes,
        views: state.postReducer.views,
        firstName: state.authReducer.firstName,
        lastName: state.authReducer.lastName
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deletePostToReducer: () => dispatch({
            type: actionTypes.DELETE_POST
        }),
        allowToLikePostReducer: (status) => dispatch({
            type: actionTypes.ALLOWED_TO_LIKE_POST,
            allowToLike: status
        }),

        totalLikesToPostReducer: (likes) => dispatch({
            type: actionTypes.TOTAL_LIKE_TO_POST,
            totalLikes: likes
        }),
        handleOpenSnackBar: (snackBarMessage) => dispatch({
            type: actionTypes.SNACKBAR_OPEN,
            snackBarMessage: snackBarMessage
        }),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(PostContentBar)));