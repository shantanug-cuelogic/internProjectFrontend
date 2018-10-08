import React, { Component } from 'react';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';
import FroalaEditor from 'react-froala-wysiwyg';
import { Button, Paper, TextField, MenuItem, Snackbar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Thumbnail from '../ImageUploadPreviev/ImageUploadPreview';
import InputAdornment from '@material-ui/core/InputAdornment';
import validator from 'validator';
import { connect } from 'react-redux';
import * as actionTypes from '../../Store/Actions/actionTypes';
import { withRouter } from 'react-router';


const styles = {
    
    TitleContainer: {
        padding: '5%'
    },
    ThumbnailContainer: {
        paddingLeft: '5%',
        paddingRight: '5%',

    },
  
    CategoryContainer: {
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingBottom: '5%'
    },
    PostButtonContainer :{
        paddingBotttom:'5%'
    },
    EditorContainer : {
        padding:'5%'
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

class Editor extends Component {
    state = {
        model: '',
        Category: '',


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
            model: model
        });

    }

    handleCategoryChange = name => event => {
        this.setState({
            Category: event.target.value,
        });
    };


    validation = () => {
        let postTitle = document.getElementById('postTitle').value;
        let image = document.getElementById('profilepic').files[0];
        if (validator.isEmpty(postTitle)) {
            this.props.handleOpenSnackBar('Post Title Cannot Be Empty');
            return false;
        }
        else {

            if (validator.isEmpty(this.state.Category)) {
                this.props.handleOpenSnackBar('Please Select Category ');
                return false;
            }
            else {
                if (image === undefined) {
                    this.props.handleOpenSnackBar('Thumbnail Cannot Be Empty')
                    return false;
                }

                else {
                    if (validator.isEmpty(this.state.model)) {
                        this.props.handleOpenSnackBar('Post Content Cannot Be Empty');
                        return false;
                    }
                    else {
                        return true;
                    }
                }
            }
        }
    }


    handlePost = () => {

        let validation = this.validation();
        if (validation) {

             console.log(typeof(userId));   
            const formData = new FormData();
            formData.append('file', document.getElementById('profilepic').files[0]);
            formData.append('title', document.getElementById('postTitle').value);
            formData.append('postContent', this.state.model);
            formData.append('category', this.state.Category);
            formData.append('authToken', this.props.authToken);
            formData.append('userId', this.props.userId);
            formData.append('isDraft',0);


            axios.post('post/create', formData, {
                headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data;`,
                }
            })
                .then((response) => {
                    console.log(response.data);
                    if (response.data.success) {
                    
                        this.props.handleOpenSnackBar('Post Created Successfully!!');
                        this.props.history.push('/post/' + response.data.id);
                    }

                })
                .catch((error) => {
                    console.log(error)
                })
        }

    }

    handleDiscardPost = () => {
        
            const formData = new FormData();
            formData.append('file', document.getElementById('profilepic').files[0]);
            formData.append('title', document.getElementById('postTitle').value);
            formData.append('postContent', this.state.model);
            formData.append('category', this.state.Category);
            formData.append('authToken', this.props.authToken);
            formData.append('userId', this.props.userId);
            formData.append('isDraft',1);
            

            axios.post('post/create', formData, {
                headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data;`,
                }
            })
                .then((response) => {
                    console.log(response.data);
                    if (response.data.success) {
                    
                        this.props.handleOpenSnackBar('Post Saved as Draft');
                        this.props.history.push('/');
                    }

                })
                .catch((error) => {
                    console.log(error)
                })
        
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


                    <div className={classes.ThumbnailContainer}>
                        <InputLabel>Upload Your Thumbnail</InputLabel>
                        <Thumbnail />
                    </div>



                    <div className={classes.EditorContainer}>
                        <FroalaEditor tag='textarea'
                            model={this.state.model}
                            onModelChange={this.handleModelChange}
                            config={this.config}

                        />
                    </div>

                     <div className={classes.PostButtonContainer} > 
                     <Button variant="contained" color="primary" onClick={this.handlePost} style={{marginRight:30}} >Post</Button>
                     <Button variant="outlined" color="primary" onClick={this.handleDiscardPost}  > DISCARD </Button>           
                     </div>

                </Paper>
            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        auth: state.authReducer.auth,
        userId : state.authReducer.userId,
        authToken : state.authReducer.authToken
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