import React from 'react';
import { Typography, Paper, Button, TextField, } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import * as actionTypes from '../../../Store/Actions/actionTypes';
import { NavLink } from 'react-router-dom';
import postService from '../../../Services/PostService';

const style = theme => ({
    UserName: {
        float: 'left',
        marginTop: 40,
        color: 'black',
        marginLeft: 30
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


    PostCommentButton: {
        marginBottom: '3%'
    },
    SigninLinkContainer: {
        padding: 20
    },

})


class PostComment extends React.Component {
    handlePostComment = async () => {
        let comment = document.getElementById('comment').value;
        if (comment.length === 0) {
            this.props.handleOpenSnackBar("Comment cannot be empty");
        }
        else {
            let commentStatus = await postService.postComment(comment, this.props.postId);
            if (commentStatus.success) {
                let updatedCommentData = {
                    firstName: this.props.firstName,
                    lastName: this.props.lastName,
                    userId: this.props.userId,
                    commentId: commentStatus.message.insertId,
                    commentContent: comment
                }
                document.getElementById('comment').value = "";
                this.props.handleOpenSnackBar("Comment Posted !!");
                this.props.postCommentToReducer(updatedCommentData);
            }
        }
    }



    render() {
        const { classes } = this.props;
        return (
            <div>
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
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.authReducer.auth,
        firstName: state.authReducer.firstName,
        lastName: state.authReducer.lastName,
        postId: state.postReducer.postId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        postCommentToReducer: (updateCommentData) => dispatch({
            type: actionTypes.POST_COMMENT,
            updateCommentData: updateCommentData
        }),
        handleOpenSnackBar: (snackBarMessage) => dispatch({
            type: actionTypes.SNACKBAR_OPEN,
            snackBarMessage: snackBarMessage
        }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(PostComment));