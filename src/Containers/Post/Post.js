import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import * as actionTypes from '../../Store/Actions/actionTypes';
import { withRouter } from 'react-router';
import Slide from '@material-ui/core/Slide';
import postService from '../../Services/PostService';
import Author from '../../Components/Post/Author';
import PostContent from '../../Components/Post/PostContent';
import PostContentBar from '../../Components/Post/postContentBar';
import PostComment from '../../Components/Post/PostComment/PostComment';
import Comments from '../../Components/Post/Comments/Comments';
import style from './PostStyle';

class Post extends Component {
    state = {
        firstName: '',
        lastName: '',
        likeAllowed: true,
        rating: 0,
    }

    async componentDidMount() {
        let requiredUrl = this.props.match.params.id;
        let postData = await postService.fetchAllPostData(requiredUrl);
        const { postContent, title, postId, userId, category, postTimestamp } = postData;
        let viewStatus = await postService.addViews(postId);
        let allcomments = await postService.fetchAllComments(postId);
        this.props.handleFetchPost(postId, userId, title, postContent, allcomments, category, postTimestamp);
        let totalLikes = await postService.fetchTotalLikesToPost(postId);
        this.props.totalLikesToPostReducer(totalLikes);
        let totalViews = await postService.fetchTotalViewsToPost(postId);
        this.props.totalViewsToPostReducer(totalViews);
        let authorInformation = await postService.fetchAuthorInformation(userId);
        let authorFirstName = authorInformation.firstName;
        let authorLastName = authorInformation.lastName;
        let authorProfileImage = authorInformation.profileImage;
        let authorEmail = authorInformation.email;
        let authorId = authorInformation.userId;
        this.props.handleAuthorInfo(authorFirstName, authorLastName, authorProfileImage, authorEmail, authorId);
        let postRatings = await postService.getPostRating(postId);
        this.setState({
            rating: postRatings
        })
        if (this.props.auth) {
            let allowedFollow = await postService.followAllowedCheck(authorId);
            if (allowedFollow.success) {
                this.props.handleAuthorFollowAllowed(true);
            }
            else {
                this.props.handleAuthorFollowAllowed(false);
            }
        }
        const checkLike = await postService.checkAlreadyLiked(postId);
        if (checkLike.success) {
            this.props.allowToLikePostReducer(true);
        }
        else if (!checkLike.success) {
            this.props.allowToLikePostReducer(false);
        }
    }
    TransitionUp = (props) => {
        return <Slide {...props} direction="up" />;
    }

    render() {
        const { classes } = this.props;
        
        return (
            <div className={classes.root}>
                <Author
                    userId={this.props.userId}
                    postUserId={this.props.postUserId}
                />
                <PostContent />
                <PostContentBar
                    postUserId={this.props.postUserId}
                    postId={this.props.match.params.id}
                    rating={this.state.rating} />
                <PostComment />
                <Comments />
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
        handleFetchPost: (postId, userId, postTitle, postContent, allcomments, category, postTimestamp) => dispatch(
            {
                type: actionTypes.FETCH_POST,
                postId: postId,
                userId: userId,
                postTitle: postTitle,
                postContent: postContent,
                allcomments: allcomments,
                category: category,
                postTimestamp: postTimestamp
            }),
        totalLikesToPostReducer: (likes) => dispatch({
            type: actionTypes.TOTAL_LIKE_TO_POST,
            totalLikes: likes
        }),
        totalViewsToPostReducer: (views) => dispatch({
            type: actionTypes.TOTAL_VIEWS_TO_POST,
            views: views
        }),
        handleOpenSnackBar: (snackBarMessage) => dispatch({
            type: actionTypes.SNACKBAR_OPEN,
            snackBarMessage: snackBarMessage
        }),
        handleAuthorInfo: (authorFirstName, authorLastName, authorProfileImage, authorEmail, authorId) => dispatch({
            type: actionTypes.FETCH_AUTHOR_INFO,
            authorFirstName: authorFirstName,
            authorLastName: authorLastName,
            authorProfileImage: authorProfileImage,
            authorEmail: authorEmail,
            authorId: authorId
        }),
        handleAuthorFollowAllowed: (allowedToFollow) => dispatch({
            type: actionTypes.AUTHOR_FOLLOWED_ALLOWED,
            allowedToFollow: allowedToFollow
        }),
        allowToLikePostReducer: (status) => dispatch({
            type: actionTypes.ALLOWED_TO_LIKE_POST,
            allowToLike: status
        }),
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Post)));