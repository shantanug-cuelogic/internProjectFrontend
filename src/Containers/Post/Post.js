import React, { Component } from 'react';
import { Typography, Paper, Button, TextField, Divider } from '@material-ui/core';
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
import ReactHtmlParser , {convertNodeToElement} from 'react-html-parser';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';


const style = theme => ({

    HeaderContainer: {
        marginTop: '10%',
        height: '70px'
    },

    PostContainer: {
        marginTop: '5%',
    },
    EditButtonContainer: {
        marginTop: '2%',
        position: 'sticky',
        top: '63px',
        zIndex: 1000
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
        marginTop: 10,
        color: 'black'
    },
    PostCommentButton: {
        marginBottom: '3%'
    },
    AllCommentsContainer: {
        marginBottom: '3%'
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
    }
});


  

class Post extends Component {
    state = {
        firstName: '',
        lastName: '',
        likeAllowed: true,
        open: false,
    }

    componentDidMount() {

        let requiredUrl = this.props.match.params.id;

        axios.get('/post/getpost/' + requiredUrl)
            .then((response) => {

                let postContent = response.data[0].postContent;
                let postTitle = response.data[0].title;
                let postId = parseInt(response.data[0].postId);
                let userId = response.data[0].userId;

                axios.get('/post/comment/' + response.data[0].postId)
                    .then((allcomments) => {
                       
                        if (allcomments.data.success) {

                            this.props.handleFetchPost(postId, userId, postTitle, postContent, allcomments.data.result)
                        }
                        else {
                            let array = []
                            this.props.handleFetchPost(postId, userId, postTitle, postContent, array)
                        }


                        axios.get('/userprofile/' + localStorage.getItem('userId'))
                            .then((response) => {

                                console.log(response.data[0].firstName);
                                if (response.data.success) {
                                    this.setState({
                                        firstName: response.data[0].firstName,
                                        lastName: response.data[0].lastName
                                    })
                                }
                            })
                            .catch((error) => {
                                console.log(error)
                            });

                        axios.get('/post/like/totallikes/' + response.data[0].postId)
                            .then((response) => {
                                if (response.data.success) {
                                    this.props.totalLikesToPostReducer(response.data.count)
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                            });

                        axios.post('/post/like/allowed', {
                            authToken: localStorage.getItem('authToken'),
                            postIdToLike: response.data[0].postId
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
                            authToken: localStorage.getItem("authToken"),
                            postIdToView: requiredUrl
                        })
                            .then((response) => {
                                console.log(response.data);
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
                            
                        axios.get()    

                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
            .catch((error) => {
                console.log(error)
            });
    }

    TransitionUp =(props)=> {
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
                if (response.data.success) {
                    let updatedCommentData = {
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        userId: parseInt(this.props.userId),
                        commentId: response.data.message.insertId,
                        commentContent: comment
                    }
                    document.getElementById('comment').value = "";
                    this.props.postCommentToReducer(updatedCommentData);
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    handleEditPost = () => {

    }

    handleDeletePost = () => {
        axios.post('/post/delete', {
            authToken: localStorage.getItem('authToken'),
            postIdtoDelete: this.props.postId
        })
            .then((response) => {
                if (response.data.success) {
                    this.props.deletePostToReducer();
                    this.props.history.push('/');

                }
            })
            .catch((error) => {

            })
    }

    handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({ open: false });
      };

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
                            this.setState ({
                                open:true
                            })
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


        console.log(this.props.allowedToLike);
        this.props.allowToLikePostReducer(!this.props.allowedToLike);
    }

    render() {
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
            comments = <LinearProgress />
        }

        else {
            comments = this.props.allcomments.map((comment, index) => {

                return (
                    <div>
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
                        <Divider />
                    </div>
                )
            })
        }

        let authorProfileUrl = "/authorprofile/"+this.props.postUserId;
        return (
            <div>
                <Paper>
                    <div className={classes.HeaderContainer}>
                        <Typography variant="display2"> {this.props.postTitle} </Typography>
                        <Typography variant="caption">  </Typography>
                    </div>

                </Paper>
                <Paper className={classes.EditButtonContainer}>
                    {editDeleteButton}
                    {this.props.allowedToLike ? <Button onClick={this.handleLike}>
                        <LikeIcon className={classes.LikeButton} color="primary" />
                        Likes: {this.props.likes}
                    </Button>
                        :
                        <Button onClick={this.handleLike}>
                            <UnlikeIcon className={classes.LikeButton} color="primary" />
                            Likes: {this.props.likes}
                        </Button>}
                    <Button >
                        <Visibility className={classes.LikeButton} color="primary" disabled />
                        {this.props.views}
                    </Button>
                    <Button variant="outlined" component={NavLink} to={authorProfileUrl}>
                        View Authors Profile
                    </Button>

                </Paper>

                <Paper>
                    <div className={classes.PostContainer}>
                        <div className={classes.myDynamicContent}>
                            <Typography>

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
                    <Divider />
                    </div>
                </Paper>

                {this.props.auth ? <Paper>
                    <div className={classes.CommentContainer}>
                        <Paper className={classes.Comments}>
                            <Typography variant="caption" className={classes.UserName}>{this.state.firstName + " " + this.state.lastName}</Typography>
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
                </Paper>
                    : <p style={{ color: 'red' }}>YOU NEED TO SIGNIN TO COMMENT</p>
                }
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.open}
                    TransitionComponent={this.TransitionUp}
                    variant="error"
                    autoHideDuration={6000}
                    onClose={this.handleCloseSnackBar}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Comment Deleted</span>}
                    
                 />

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
        userId: state.authReducer.userId,
        postContent: state.postReducer.postContent,
        postTitle: state.postReducer.postTitle,
        postId: state.postReducer.postId,
        postUserId: state.postReducer.userId,
        allcomments: state.postReducer.allcomments,
        allowedToLike: state.postReducer.allowedToLike,
        likes: state.postReducer.likes,
        views: state.postReducer.views
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleFetchPost: (postId, userId, postTitle, postContent, allcomments) => dispatch(
            {
                type: actionTypes.FETCH_POST,
                postId: postId,
                userId: userId,
                postTitle: postTitle,
                postContent: postContent,
                allcomments: allcomments
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
        })



    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Post)));