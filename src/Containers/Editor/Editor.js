import React, { Component } from 'react';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';
import FroalaEditor from 'react-froala-wysiwyg';
import {
    Button,
    Paper,
    TextField,
    MenuItem,
    Input,
    InputLabel,
    FormHelperText,
    FormControl,
    InputAdornment
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Thumbnail from '../../Components/ImageUploadPreviev/ImageUploadPreview';
import { connect } from 'react-redux';
import * as actionTypes from '../../Store/Actions/actionTypes';
import { withRouter } from 'react-router';
import styles from './EditorStyle'
import categories from './PostCategory';
import config from './EditorConfig';
import EditorService from '../../Services/EditorService';
import Validation from '../../Utility/validation';

class Editor extends Component {
    state = {
        model: '',
        Category: '',
    }
    handleModelChange = (model) => {
        this.setState({
            model: model
        });
    }

    handleCategoryChange = name => event => {
        this.setState({
            Category: event.target.value,
        });
    };

    handlePost = async () => {
        const postTitle = document.getElementById('postTitle').value;
        const image = document.getElementById('profilepic').files[0];
        const validation = Validation.createPostValidation(postTitle,this.state.Category,image,this.state.model);
        if (validation === true) {
            const formData = new FormData();
            formData.append('file', document.getElementById('profilepic').files[0]);
            formData.append('title', document.getElementById('postTitle').value);
            formData.append('postContent', this.state.model);
            formData.append('category', this.state.Category);
            formData.append('authToken', this.props.authToken);
            formData.append('userId', this.props.userId);
            formData.append('isDraft', 0);
            let postBlogResponse = await EditorService.postBlog(formData);
            console.log(postBlogResponse);
            if (postBlogResponse.success) {
                this.props.handleOpenSnackBar('Post Created Successfully!!');
                this.props.history.push('/post/' + postBlogResponse.id);
            }
        }
        else {
            this.props.handleOpenSnackBar(validation);
        }
    }

    handleDiscardPost = async () => {
        const formData = new FormData();
        formData.append('file', document.getElementById('profilepic').files[0]);
        formData.append('title', document.getElementById('postTitle').value);
        formData.append('postContent', this.state.model);
        formData.append('category', this.state.Category);
        formData.append('authToken', this.props.authToken);
        formData.append('userId', this.props.userId);
        formData.append('isDraft', 1);
        let postBlogResponse = await EditorService.postBlog(formData);
        if (postBlogResponse.success) {
            this.props.handleOpenSnackBar('Post Saved as Draft');
            this.props.history.push('/');
        }
    }

    render() {

        const { classes } = this.props;
        return (
            <div style={{ marginTop: '10%' }}>
                <Paper className={classes.EditorContainer} >
                    <div className={classes.TitleContainer}>
                        <FormControl className={classes.formControl} aria-describedby="PostTitle" fullWidth>
                            <InputLabel htmlFor="postTitle">Post Title</InputLabel>
                            <Input id="postTitle" onChange={this.handleChange} />
                            <FormHelperText id="postTitle"> Your Post Title Goes Here</FormHelperText>
                        </FormControl>
                    </div>
                    <div className={classes.CategoryContainer}>
                        <TextField
                            select
                            fullWidth
                            variant="outlined"
                            label="With Select"
                            value={this.state.Category}
                            onChange={this.handleCategoryChange('Catergory')}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Category</InputAdornment>,
                            }}
                        >
                            {categories.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className={classes.ThumbnailContainer}>
                        <InputLabel>Upload Your Thumbnail</InputLabel>
                        <Thumbnail />
                    </div>
                    <div className={classes.EditorContainer}>
                        <FroalaEditor tag='textarea'
                            model={this.state.model}
                            onModelChange={this.handleModelChange}
                            config={config}
                        />
                    </div>
                    <div className={classes.PostButtonContainer} >
                        <Button variant="contained" color="primary" onClick={this.handlePost} style={{ marginRight: 30 }} >Post</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleDiscardPost}  > DISCARD </Button>
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
        authToken: state.authReducer.authToken
    }
}
const mapDispatchToProps = dispatch => {
    return {
        handleOpenSnackBar: (message) => dispatch({
            type: actionTypes.SNACKBAR_OPEN,
            snackBarMessage: message
        })
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Editor)));