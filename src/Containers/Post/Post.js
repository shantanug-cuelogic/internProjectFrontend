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

import Visibility from '@material-ui/icons/Visibility';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import postService from '../../Services/PostService';
import RateModal from '../../Components/Modal/Modal';
import StarRatingComponent from 'react-star-rating-component';
import Author from '../../Components/Post/Author';
import PostContent from '../../Components/Post/PostContent';
import PostContentBar from '../../Components/Post/postContentBar';

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

class Post extends Component {
    state = {
        firstName: '',
        lastName: '',
        likeAllowed: true,
        rating:0,

    }

    componentDidMount() {

        let requiredUrl = this.props.match.params.id;
      //  postService.fetchAllPostData(requiredUrl);
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

                            let    authorFirstName= response.data[0].firstName;
                            let    authorLastName= response.data[0].lastName;
                              let  authorProfileImage= response.data[0].profileImage;
                               let authorEmail= response.data[0].email;
                                let authorId= response.data[0].userId;

                            this.props.handleAuthorInfo(
                                authorFirstName,
                                authorLastName,
                                authorProfileImage,
                                authorEmail,
                                authorId
                            );

                            if (this.props.auth) {
                                axios.post('/follower/allowed', {
                                    authToken: this.props.authToken,
                                    userIdToFollow: response.data[0].userId
                                })
                                    .then((response) => {
                                        if (response.data.success) {
                                            // this.setState({
                                            //     allowedToFollow: true
                                            // });
                                            this.props.handleAuthorFollowAllowed(true);
                                        }
                                        else {
                                            // this.setState({
                                            //     allowedToFollow: false
                                            // })
                                            this.props.handleAuthorFollowAllowed(false);
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

            axios.get('/post/ratings/'+this.props.match.params.id)
            .then((response) => {
            
                this.setState({
                    rating:response.data.Ratings
                })
            } )
            .catch((error) =>{
                console.log(error);
            })

    }

    TransitionUp = (props) => {
        return <Slide {...props} direction="up" />;
    }



    handlePostComment = () => {
        let comment = document.getElementById('comment').value;
    
    if(comment.length === 0) {
        this.props.handleOpenSnackBar("Comment cannot be empty");
    }
    else {
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


    

    render() {
       
        const { classes } = this.props;      
        
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
                            deleteButton={(comment.userId == this.props.userId) || (this.props.isAdmin === 1) ? true : false}
                            click={() => this.handleDeleteClick(comment.commentId)}
                        >
                        </Comment>

                    </div>
                )
            })
        }

        

      

        return (
            <div className={classes.root}>
                                     <div id="google_translate_element" style={{display:'inline', height:27 , float:'right'}} ></div>

                
              <Author
                userId={this.props.userId} 
                postUserId = {this.props.postUserId}
                />
               <PostContent /> 
               <PostContentBar
               postUserId = {this.props.postUserId}
               postId={this.props.match.params.id}
               rating ={this.state.rating} /> 
                

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

        

        

        totalViewsToPostReducer: (views) => dispatch({
            type: actionTypes.TOTAL_VIEWS_TO_POST,
            views: views
        }),
        handleOpenSnackBar: (snackBarMessage) => dispatch({
            type: actionTypes.SNACKBAR_OPEN,
            snackBarMessage: snackBarMessage
        }),
        handleAuthorInfo : (authorFirstName,authorLastName,authorProfileImage,authorEmail,authorId) => dispatch({
            type:actionTypes.FETCH_AUTHOR_INFO,
            authorFirstName:authorFirstName,
            authorLastName:authorLastName,
            authorProfileImage:authorProfileImage,
            authorEmail:authorEmail,
            authorId:authorId            

        }),

        handleAuthorFollowAllowed : (allowedToFollow) => dispatch({
            type:actionTypes.AUTHOR_FOLLOWED_ALLOWED,
            allowedToFollow:allowedToFollow
        })
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Post)));