import React, { Component } from 'react';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';
import FroalaEditor from 'react-froala-wysiwyg';
import { Button, Paper,TextField, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { connect } from 'react-redux';
import * as actionTypes from '../../Store/Actions/actionTypes';
import { NavLink } from "react-router-dom";
import InputAdornment from '@material-ui/core/InputAdornment';


const styles = {
    button: {
        marginTop: '3%',
        marginBotttom: '3%'
    },
    TitleContainer: {
        padding: '5%'
    },
    CategoryContainer: {
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingBottom: '5%'
    }
}

const categories = [
    {
        value: 'TECHNOLOGY',
        label: 'TECHNOLOGY'
    },
    {
        value: 'TRAVEL',
        label: 'TRAVEL'
    },
    {
        value: 'STYLE',
        label: 'STYLE'
    },
    {
        value: 'BUSINESS',
        label: 'BUSINESS'
    },
    {
        value: 'POLITICS',
        label: 'POLITICS'
    },
    {
        value: 'SCIENCE',
        label: 'SCIENCE'
    },

];

class EditPost extends React.Component {

    state = {
        model :this.props.postContent,
        postTitle:this.props.postTitle
    }
    
    config = {
        codeMirrorOptions: {
            tabSize: 4
        },

        videoDefaultDisplay: 'inline',
        videoAllowedTypes: ['mp4'],
        videoUpload: true,
        videoUploadMethod: 'POST',
        videoUploadParam: 'file_name',
        videoUploadURL: 'http://localhost:3000/editor/videoupload',

        imageUpload: true,
        imageUploadMethod: 'POST',
        imageUploadParam: 'file_name',
        imageUploadRemoteUrls: true,
        imageUploadURL: 'http://localhost:3000/editor/imageupload',

        fileUpload: true,
        fileUploadURL: 'http://localhost:3000/editor/fileupload',
        fileUploadMethod: 'POST',
        fileUploadParam: 'file_name',
        colorsDefaultTab: 'background',
        disableRightClick: true,
        codeMirror: false
    }

    handleModelChange = (model) => {
        this.setState({
            model: model,
            Category: 'Technology'
        });
    }

    handleCategoryChange = name => event => {
        this.setState({
        Category: event.target.value,
        });
    };
    
    handleUpdatePost = () => {
        axios.put('/post/update',{
        postIdtoUpdate :this.props.postId,
	    title : this.state.postTitle,
	    postContent : this.state.model,
	    category: this.state.Category,
	     authToken: localStorage.getItem('authToken')
        })
        .then((response) => {
            if(response.data.success) {
                this.props.handleUpdatePostToStore(this.state.model,this.state.postTitle);
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    handlePostTitleChange = () =>{
        this.setState ({
            postTitle:document.getElementById('postTitle').value
        })
    }
    
    
    render() {
     
        const {classes} = this.props;
        let url = '/post/'+this.props.postId;

        return (
            <div style={{ marginTop: '10%' }}>
            <Paper>
                <div className={classes.TitleContainer}>
                    <FormControl className={classes.formControl} aria-describedby="PostTitle" fullWidth>
                        <InputLabel htmlFor="postTitle">Post Title</InputLabel>
                        <Input id="postTitle" value ={this.state.postTitle} onChange={this.handlePostTitleChange}  />
                        <FormHelperText id="postTitle"> Update Your Post Title Here</FormHelperText>
                    </FormControl>
                </div>
                <div className={classes.CategoryContainer}>
                        <TextField
                            select
                            fullWidth
                            // className={classNames(classes.margin, classes.textField)}
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
                <FroalaEditor tag='textarea'
                    model={this.state.model}
                    onModelChange={this.handleModelChange}
                    config={this.config}
               />
                <Button variant="contained" color="primary" className={classes.button} onClick={this.handleUpdatePost} component={NavLink} to={url}  >Update Post</Button>
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleUpdatePostToStore : (postContent,postTitle)=> dispatch ({
            type: actionTypes.UPDATE_POST,
            postTitle:postTitle,
            postContent:postContent
        })
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(EditPost));