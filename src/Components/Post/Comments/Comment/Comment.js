import React from 'react';
import { Typography, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import style from './CommentStyle';


class Comment extends React.Component {

    render() {
        const { classes } =this.props;
        let deleteButton = null;
        if (this.props.deleteButton) {
            deleteButton = <Typography variant="caption" className={classes.DeleteButton} onClick={this.props.click} >DELETE COMMENT</Typography>
        }
        return (
            <Paper className={classes.AllComments}>
                <Typography variant="body2" className={classes.UserName}>{this.props.firstName + " " + this.props.lastName}</Typography>
                <div className={classes.CommentContainer}>
                    <Paper className={classes.Comments}>
                        
                        <Typography variant="body1" gutterBottom style={{ wordWrap: 'break-word' }} > {this.props.commentContent} </Typography>
                        {deleteButton}
                
                    </Paper>
                </div>
            </Paper>
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
    }
}

export default connect(mapStateToProps)(withStyles(style)(Comment));