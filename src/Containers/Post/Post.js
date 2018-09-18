import React, { Component } from 'react';
import { Typography, Paper, Button, TextField, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actionTypes from '../../Store/Actions/actionTypes';
import LinearProgress from '@material-ui/core/LinearProgress';
import Comment from '../Comment/Comment'
import renderHTML from 'react-render-html';
import { withRouter } from 'react-router'



const style = theme => ({

    HeaderContainer: {
        marginTop: '10%',
        height: '70px'
    },

    PostContainer: {
        marginTop: '5%',
    },
    EditButtonContainer: {
        marginTop: '2%'
    },
    CommentContainer: {
        marginBottom: '5%',
        padding: '3%'

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
        img: {
            maxWidth: '100%'
        }
    }
});

class Post extends Component {
    state = {
        firstName : '',
        lastName : ''
    }

    componentDidMount() {
        console.log("incomponentdidmount")
        let url = window.location.href;
        let requiredUrl = url.substr(27);

        axios.get('/post/getpost/' + requiredUrl)
            .then((response) => {
        
                let postContent= response.data[0].postContent;
                let postTitle= response.data[0].title;
                let postId= response.data[0].postId;
                let userId =response.data[0].userId;
             
                 axios.get('/post/comment/' + response.data[0].postId)
                    .then((allcomments) => {
                        if(allcomments.data.success) {
                            this.props.handleFetchPost(postId,userId,postTitle,postContent,allcomments.data.result)
                        }
                        else {
                            let array = []
                            this.props.handleFetchPost(postId,userId,postTitle,postContent,array)
                        }
                        
                
                        axios.get('/userprofile/' + localStorage.getItem('userId'))
                        .then((response) => {
                            this.setState({
                                firstName: response.data[0].firstName ,
                                lastName : response.data[0].lastName
                            })
                        })
                        .catch((error) => {
                            console.log(error)
                        });

                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
            .catch((error) => {
                console.log(error)
            });

        
    }

    handlePostComment = () => {
        let comment = document.getElementById('comment').value;
        axios.put('/post/comment/', {
            authToken: localStorage.getItem('authToken'),
            postId: this.props.postId,
            commentContent: comment
        })
            .then((response) => {
                if(response.data.success) {
                    let updatedCommentData = {
                        firstName : this.state.firstName,
                        lastName : this.state.lastName,
                        userId : this.props.userId,
                        commentId : response.data.message.ininsertId,
                        commentContent : comment 
                        
                    }

                    let updatedAllComments = [...this.props.allcomments];
                    updatedAllComments.push(updatedCommentData);
                    document.getElementById('comment').value = "";
                //    this.props.postCommentToReducer(updatedCommentData);
                }
                
               
            })
            .catch((error) => {
                console.log(error)
            })
   
        
    }

    handleEditPost = () => {
        // this.setState({
        //     editable: true
        // })
        // this.config.toolbarButtons = null;
    }

    handleDeleteClick = (cid) =>{
      //  alert(cid);
    }

    render() {
        const { classes } = this.props;

        let button = null;
        if (localStorage.getItem('userId') === this.props.userId) {
            button = <Button color="primary" variant="contained" onClick={this.handleEditPost}>Edit</Button>

        }

        let comments = <LinearProgress />
      

        console.log("checker==> ",this.props.allcomments.length);

        if (this.props.allcomments.length > 0) {
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
                        >
                        </Comment>
                        <Divider />
                    </div>
                )
            })
        }


        return (
            <div>
                <Paper>
                    <div className={classes.HeaderContainer}>
                        <Typography variant="title"> {this.state.postTitle} </Typography>
                    </div>
                       
                </Paper>
                <Paper>

                    <div className={classes.PostContainer}>
                        <Typography>
                            <div className={classes.myDynamicContent}>
                                <style jsx>
                                {`
                                    img {
                                    max-width : 100%
                                         }
                                `}
                                </style>
                                {renderHTML(this.props.postContent)}
                            </div>

                        </Typography>
                    </div>
                </Paper>
                <div className={classes.EditButtonContainer}>
                    {button}
                </div>

                {this.props.auth ? <Paper>
                    <div className={classes.CommentContainer}>
                        <Paper className={classes.Comments}>
                            <Typography variant="caption" className={classes.UserName}>{this.state.firstName+ " " + this.state.lastName}</Typography>
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
        postContent:state.postReducer.postContent,
        postTitle: state.postReducer.postTitle,
        postId: state.postReducer.postId,
        postUserId: state.postReducer.userId,
        allcomments: state.postReducer.allcomments,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleFetchPost : (postId,userId,postTitle,postContent,allcomments)=>dispatch(
            {
            type:actionTypes.FETCH_POST,
            postId:postId,
            userId:userId,
            postTitle:postTitle,
            postContent:postContent,
          
            allcomments:allcomments
         }),
    
    postCommentToReducer : (updatedAllComments) => dispatch({
        type:actionTypes.FETCH_POST,
        updatedAllComments : updatedAllComments
    })
}
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(withStyles(style)(Post)));