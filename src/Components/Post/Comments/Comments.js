import React from 'react';
import { Typography, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Comment from '../Comments/Comment/Comment';
import { connect } from 'react-redux';
import postService from '../../../Services/PostService';
import * as actionTypes from '../../../Store/Actions/actionTypes'

const style = theme => ({
    AllCommentsContainer: {
        paddingTop: '3%',
        paddingBottom: '3%',
    },
})

class Comments extends React.Component {
    
    handleDeleteComment = async (commentId) => {
        const deleteComment = await postService.deleteComment(commentId)
        if (deleteComment.success) {
            this.props.allcomments.map((commentData, id) => {
                if (commentData.commentId === commentId) {
                    this.props.deleteCommentToReducer(id);
                    this.props.handleOpenSnackBar("Comment Deleted Succesfully");
                }
            });
        }
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
                    <div >
                        <Comment
                            key={index}
                            commentId={comment.commentId}
                            commentContent={comment.commentContent}
                            firstName={comment.firstName}
                            lastName={comment.lastName}
                            deleteButton={(comment.userId === this.props.userId) || (this.props.isAdmin === 1) ? true : false}
                            click={() => this.handleDeleteComment(comment.commentId)}
                        >
                        </Comment>

                    </div>
                );
            });
        }
        return (
            <Paper>
                <div className={classes.AllCommentsContainer}>
                    {comments}
                </div>
            </Paper>
        );
    }
}

const mapStateToProps =  state => {
    return {
        isAdmin: state.authReducer.isAdmin,
        userId: state.authReducer.userId,
        allcomments : state.postReducer.allcomments
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteCommentToReducer: (index) => dispatch({
            type: actionTypes.DELETE_COMMENT,
            index: index
        }),
        handleOpenSnackBar: (snackBarMessage) => dispatch({
            type: actionTypes.SNACKBAR_OPEN,
            snackBarMessage: snackBarMessage
        }),
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withStyles(style)((Comments)));