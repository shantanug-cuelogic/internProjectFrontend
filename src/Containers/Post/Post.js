import React, { Component } from 'react';
import { Typography, Paper, Button, TextField, Divider, Avatar, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actionTypes from '../../Store/Actions/actionTypes';
import LinearProgress from '@material-ui/core/LinearProgress';
import Comment from '../Comment/Comment'
import { withRouter } from 'react-router';
import { NavLink } from "react-router-dom";
import LikeIcon from '@material-ui/icons/ThumbUp';
import UnlikeIcon from '@material-ui/icons/ThumbDown';
import Visibility from '@material-ui/icons/Visibility';
import ReactHtmlParser, { convertNodeToElement } from 'react-html-parser';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import StarRatingComponent from 'react-star-rating-component';


const style = theme => ({

    AuthorContainer: {
        marginTop: '0%',
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
    }
});

class Post extends Component {
    state = {
        firstName: '',
        lastName: '',
        likeAllowed: true,
        authorFirstName: "",
        authorLastName: "",
        authorProfileImage: "",
        authorEmail: "",
        authorId: '',
        allowedToFollow: null,
        rating:1
    }

    componentDidMount() {

        let requiredUrl = this.props.match.params.id;

        axios.get('/post/getpost/' + requiredUrl)
            .then((response) => {

                if (response.data.success) {
                    let postContent = response.data.result[0].postContent;
                    let postTitle = response.data.result[0].title;
                    let postId = parseInt(response.data.result[0].postId);
                    let userId = response.data.result[0].userId;
                    let category = response.data.result[0].category;

                    axios.get('/post/comment/' + response.data.result[0].postId)
                        .then((allcomments) => {

                            if (allcomments.data.success) {

                                this.props.handleFetchPost(postId, userId, postTitle, postContent, allcomments.data.result, category)
                            }
                            else {
                                let array = []
                                this.props.handleFetchPost(postId, userId, postTitle, postContent, array, category)
                            }

                            axios.get('/post/like/totallikes/' + response.data.result[0].postId)
                                .then((res) => {
                                    if (res.data.success) {
                                        this.props.totalLikesToPostReducer(res.data.count)
                                    }
                                })
                                .catch((error) => {
                                    console.log(error);
                                });

                            axios.post('/post/like/allowed', {
                                authToken: this.props.authToken,
                                postIdToLike: response.data.result[0].postId
                            })
                                .then((response) => {
                                    if (response.data.success) {
                                        this.props.allowToLikePostReducer(true);

                                    }
                                    else {
                                        this.props.allowToLikePostReducer(false);
                                    }
                                })
                                .catch((error) => {
                                    console.log(error)
                                });

                            axios.post('/post/view/add', {
                                authToken: this.props.authToken,
                                postIdToView: requiredUrl
                            })
                                .then((response) => {
                                    if (response.data.success) {

                                    }

                                })
                                .catch((error) => {
                                    console.log(error)
                                });

                            axios.get('/post/view/totalviews/' + requiredUrl)
                                .then((response) => {
                                    if (response.data.success) {
                                        this.props.totalViewsToPostReducer(response.data.count);
                                    }
                                })
                                .catch((error) => {
                                    console.log(error);
                                })
                        })
                        .catch((error) => {
                            console.log(error)
                        })

                    axios.get('/userprofile/' + response.data.result[0].userId)
                        .then((response) => {

                            this.setState({
                                authorFirstName: response.data[0].firstName,
                                authorLastName: response.data[0].lastName,
                                authorProfileImage: response.data[0].profileImage,
                                authorEmail: response.data[0].email,
                                authorId: response.data[0].userId,
                            });

                            if (this.props.auth) {
                                axios.post('/follower/allowed', {
                                    authToken: this.props.authToken,
                                    userIdToFollow: response.data[0].userId
                                })
                                    .then((response) => {
                                        if (response.data.success) {
                                            this.setState({
                                                allowedToFollow: true
                                            });
                                        }
                                        else {
                                            this.setState({
                                                allowedToFollow: false
                                            })
                                        }
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    })
                            }

                        })
                        .catch((error) => {
                            console.log(error)
                        });
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }

    TransitionUp = (props) => {
        return <Slide {...props} direction="up" />;
    }



    handlePostComment = () => {
        let comment = document.getElementById('comment').value;
        axios.put('/post/comment/', {
            authToken: localStorage.getItem('authToken'),
            postId: this.props.postId,
            commentContent: comment
        })
            .then((response) => {
                console.log(response.data);
                if (response.data.success) {
                    let updatedCommentData = {
                        firstName: this.props.firstName,
                        lastName: this.props.lastName,
                        userId: parseInt(this.props.userId),
                        commentId: response.data.message.insertId,
                        commentContent: comment
                    }
                    document.getElementById('comment').value = "";

                    this.props.handleOpenSnackBar("Comment Posted !!");
                    this.props.postCommentToReducer(updatedCommentData);
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
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
    handleDeleteClick = (commentId) => {

        axios.put('/post/comment/delete', {
            commentIdtoDelete: commentId,
            authToken: localStorage.getItem('authToken')

        })
            .then((response) => {
                if (response.data.success) {
                    this.props.allcomments.map((commentData, id) => {
                        if (commentData.commentId === commentId) {
                            this.props.deleteCommentToReducer(id);
                            this.props.handleOpenSnackBar("Comment Deleted Succesfully");
                        }
                    });

                }
            })
            .catch((error) => {
                console.log(error)
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

    handleFollow = () => {
        axios.post('/follower/add', {
            authToken: this.props.authToken,
            userIdToFollow: this.state.authorId
        })
            .then((response) => {
                if (response.data.success) {
                    this.props.handleOpenSnackBar(response.data.message);
                    this.setState({
                        allowedToFollow: false
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }

    handleUnfollow = () => {
        axios.put('/follower/unfollow', {
            authToken: this.props.authToken,
            userIdToUnfollow: this.state.authorId
        })
            .then((response) => {
                if (response.data.success) {
                    this.setState({
                        allowedToFollow: true
                    });
                    this.props.handleOpenSnackBar(response.data.message);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }

    render() {
        let authorProfileUrl = "/authorprofile/" + this.props.postUserId;
        const { classes } = this.props;

        let editPostUrl = '/editpost/' + this.props.postId
        let editDeleteButton = null;

        if (this.props.postUserId === this.props.userId) {
            editDeleteButton = <div className={classes.EditButton}>
                <Button color="primary" variant="contained" component={NavLink} to={editPostUrl}>Edit Post</Button>
                <Button variant="outlined" className={classes.DeleteButton} onClick={this.handleDeletePost} >Delete Post</Button>
            </div>
        }


        let comments = null;
        if (this.props.allcomments.length === 0) {
            comments = <Typography variant="body2" > NO COMMENTS ON THIS POST YET</Typography>
        }

        else {
            comments = this.props.allcomments.map((comment, index) => {

                return (
                    <div className={classes.AllComments}>
                        <Comment
                            key={index}
                            commentId={comment.commentId}
                            commentContent={comment.commentContent}
                            firstName={comment.firstName}
                            lastName={comment.lastName}
                            deleteButton={comment.userId == this.props.userId ? true : false}
                            click={() => this.handleDeleteClick(comment.commentId)}
                        >
                        </Comment>

                    </div>
                )
            })
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

        let followButton = null;
        if (this.state.authorId !== this.props.userId) {

            if (this.state.allowedToFollow === true) {
                followButton = <div>
                    <Button variant="outlined" color="primary" size="small" onClick={this.handleFollow} > Follow</Button>
                </div>
            }
            else if (this.state.allowedToFollow === false) {
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
                 <div id="google_translate_element" style={{display:'inline', marginTop:'6%', float:'right'}} ></div>

                <Grid
                    container
                    justify="center"

                >
                    <div className={classes.AuthorContainer} style={{ marginBottom: '3%' }} >
                        <NavLink to={authorProfileUrl} >
                            <Avatar src={this.state.authorProfileImage} className={classes.AuthorAvatar} style={{ float: 'left' }} ></Avatar>
                        </NavLink>
                        <div className={classes.AuthorInfo} style={{ float: 'left', marginLeft: 20 }}>
                            <Typography variant="subheading">{this.state.authorFirstName + " " + this.state.authorLastName}</Typography>
                            {followButton}
                            <Typography variant="caption" >{this.state.authorEmail}</Typography>
                        </div>
                    </div>
                   
                </Grid>
              
                <Paper>
                    <div className={classes.HeaderContainer}>
                        <Typography variant="display2" color="textPrimary"> {this.props.postTitle} </Typography>
                    </div>
                    <Divider />
                    <div className={classes.PostContainer}>
                        <Typography variant="body2" >
                            <style jsx="true">
                                {`
                                    img {
                                    max-width : 100%
                                         }
                                `}
                            </style>
                            {ReactHtmlParser(this.props.postContent)}
                        </Typography>
                    </div>
                </Paper>
                <div className={classes.EditButtonContainer}>
                    <Paper >
                        {editDeleteButton}
                        {likeButton}
                        <div style={{ display: 'inline', marginRight: '10px' }}>
                            <p style={{ display: 'inline', marginRight: '10px' }}>Likes : {this.props.likes}</p>
                            <p style={{ display: 'inline' }}>Views : {this.props.views} </p>
                        </div>
                        <Button variant="outlined" component={NavLink} to={authorProfileUrl}>
                            View Authors Profile
                    </Button>
                        <div>
                        <StarRatingComponent
                            name="rate1"
                            starCount={5}
                            value={this.state.rating}
                             onStarClick={this.onStarClick.bind(this)}
                        />
                        </div>
                        
                    </Paper>
                </div>

                {this.props.auth ?
                    <div className={classes.CommentContainer}>
                        <Typography variant="body2" className={classes.UserName}>{this.props.firstName + " " + this.props.lastName}</Typography>
                        <Paper className={classes.Comments}>
                            <TextField
                                id="comment"
                                label="Comment"
                                fullWidth
                                helperText="Enter Your Comment"
                                margin="normal"
                            >
                            </TextField>
                            <Button variant="contained" color="primary" onClick={this.handlePostComment} className={classes.PostCommentButton}>POST COMMENT</Button>
                        </Paper>
                    </div>

                    : <div className={classes.SigninLinkContainer}><NavLink style={{ color: 'red', textDecoration: 'none' }} to='/signin' >YOU NEED TO SIGNIN TO COMMENT</NavLink></div>
                }
                <Paper>
                    <div className={classes.AllCommentsContainer}>
                        {comments}
                    </div>
                </Paper>

            </div>


        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.authReducer.auth,
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
        handleFetchPost: (postId, userId, postTitle, postContent, allcomments, category) => dispatch(
            {
                type: actionTypes.FETCH_POST,
                postId: postId,
                userId: userId,
                postTitle: postTitle,
                postContent: postContent,
                allcomments: allcomments,
                category: category,

            }),

        postCommentToReducer: (updateCommentData) => dispatch({
            type: actionTypes.POST_COMMENT,
            updateCommentData: updateCommentData
        }),

        deleteCommentToReducer: (index) => dispatch({
            type: actionTypes.DELETE_COMMENT,
            index: index
        }),

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

        totalViewsToPostReducer: (views) => dispatch({
            type: actionTypes.TOTAL_VIEWS_TO_POST,
            views: views
        }),
        handleOpenSnackBar: (snackBarMessage) => dispatch({
            type: actionTypes.SNACKBAR_OPEN,
            snackBarMessage: snackBarMessage
        })



    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Post)));