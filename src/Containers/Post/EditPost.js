import React from 'react';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';
import FroalaEditor from 'react-froala-wysiwyg';
import { Button, Paper, Input, InputLabel, FormHelperText, FormControl } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import * as actionTypes from '../../Store/Actions/actionTypes';
import config from '../Editor/EditorConfig';
import styles from './EditPostStyle';
import PostService from '../../Services/PostService';

class EditPost extends React.Component {
    state = {
        model: this.props.postContent,
        postTitle: this.props.postTitle,
    }
    handleModelChange = (model) => {
        this.setState({
            model: model,
        });
    }

    handleUpdatePost = async () => {
        const updatePostResponse = await PostService.updatePost(this.props.postId, this.state.postTitle, this.state.model, this.props.category);
        if (updatePostResponse.success) {
            this.props.handleOpenSnackBar("Post Updated Succesfully");
            this.props.handleUpdatePostToStore(this.state.model, this.state.postTitle);
            this.props.history.push('/post/' + this.props.postId);
        }
    }


    handlePostTitleChange = () => {
        this.setState({
            postTitle: document.getElementById('postTitle').value
        });
    }


    render() {
        const { classes } = this.props;
        return (
            <div style={{ marginTop: '10%' }}>
                <Paper>
                    <div className={classes.TitleContainer}>
                        <FormControl className={classes.formControl} aria-describedby="PostTitle" fullWidth>
                            <InputLabel htmlFor="postTitle">Post Title</InputLabel>
                            <Input id="postTitle" value={this.state.postTitle} onChange={this.handlePostTitleChange} />
                            <FormHelperText id="postTitle"> Update Your Post Title Here</FormHelperText>
                        </FormControl>
                    </div>
                    <FroalaEditor tag='textarea'
                        model={this.state.model}
                        onModelChange={this.handleModelChange}
                        config={config}
                    />
                    <Button variant="contained" color="primary" className={classes.button} onClick={this.handleUpdatePost} >Update Post</Button>
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
        category: state.postReducer.postCategory
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleUpdatePostToStore: (postContent, postTitle) => dispatch({
            type: actionTypes.UPDATE_POST,
            postTitle: postTitle,
            postContent: postContent
        }),

        handleOpenSnackBar: (message) => dispatch({
            type: actionTypes.SNACKBAR_OPEN,
            snackBarMessage: message
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditPost));