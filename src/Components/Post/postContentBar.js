import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { Paper, Button } from '@material-ui/core';
import StarRatingComponent from 'react-star-rating-component';
import RateModal from '../RatingModal/RatingModal';
import { NavLink } from "react-router-dom";
import LikeIcon from '@material-ui/icons/ThumbUp';
import UnlikeIcon from '@material-ui/icons/ThumbDown';
import axios from 'axios';
import * as actionTypes from '../../Store/Actions/actionTypes';
import { withRouter } from 'react-router';


const style = theme => ({

    root : {
        marginTop:'10%'
    },

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

    HeaderContainer: {

        height: '70px',
        paddingTop: '3%'
    },

    PostContainer: {

        padding: '3%'
    },
    EditButtonContainer: {
        marginTop: '2%',
        position: 'sticky',
        top: '63px',
        zIndex: 1000,
        paddingLeft: '3%',
        paddingRight: '3%'

    },
    EditButton: {
        padding: '2%',
        display: 'inline'
    },
    CommentContainer: {
        marginBottom: '5%',
        padding: '3%',
        marginTop: '5%'

    },
    Comments: {
        paddingLeft: '3%',
        paddingRight: '3%'
    },
    UserName: {
        float: 'left',
        marginTop: 40,
        color: 'black',
        marginLeft: 30
    },
    PostCommentButton: {
        marginBottom: '3%'
    },
    AllCommentsContainer: {
        paddingTop: '3%',
        paddingBottom: '3%',
    },
    TitleContainer: {
        marginTop: '10%',
        padding: '5%'
    },
    myDynamicContent: {
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingTop: '5%',
        paddingBottom: '3%'
    },
    LikeButton: {

    },
    DeleteButton: {

        marginLeft: "20px"
    },
    SigninLinkContainer: {
        padding: 20
    },
    RatingContainer : {
        display:'inline',
        fontSize:24
    }
});


class PostContentBar extends React.Component {
    handleDeletePost = () => {
        axios.post('/post/delete', {
            authToken: localStorage.getItem('authToken'),
            postIdtoDelete: this.props.postId
        })
            .then((response) => {
                if (response.data.success) {

                    this.props.handleOpenSnackBar("Post Deleted Succesfully")
                    this.props.deletePostToReducer();
                    this.props.history.push('/');

                }
            })
            .catch((error) => {

            })
    }

    handleLike = () => {

        if (this.props.allowedToLike) {
            axios.post('/post/like/add', {
                postIdToLike: this.props.postId,
                authToken: localStorage.getItem('authToken')
            })
                .then((response) => {
                    if (response.data.success) {

                        axios.get('/post/like/totallikes/' + this.props.postId)
                            .then((response) => {
                                if (response.data.success) {
                                    this.props.totalLikesToPostReducer(response.data.count)
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                            });

                        this.props.allowToLikePostReducer(false);

                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }

        else if (!this.props.allowedToLike) {
            axios.put('/post/like/remove', {
                postIdToUnlike: this.props.postId,
                authToken: localStorage.getItem('authToken')
            })
                .then((response) => {
                    if (response.data.success) {

                        axios.get('/post/like/totallikes/' + this.props.postId)
                            .then((response) => {
                                if (response.data.success) {
                                    this.props.totalLikesToPostReducer(response.data.count)
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                        this.props.allowToLikePostReducer(true);

                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        this.props.allowToLikePostReducer(!this.props.allowedToLike);
    }



    render () {

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
                        <div style={{display:'inline', marginRight: 10}} >
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
                         <RateModal ButtonName="Rate this post" postId={parseInt(this.props.postId)} style={{display:'inline'}} />
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
        isAdmin : state.authReducer.isAdmin,
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

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(withStyles(style)(PostContentBar)));