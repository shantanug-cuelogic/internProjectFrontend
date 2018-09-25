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

const styles = {
    button: {
        marginTop: '3%',
        marginBotttom: '3%'
    },
    TitleContainer: {
        padding: '5%'
    },
    ThumbnailContainer: {
        paddingLeft: '5%',
        paddingRight: '5%',

    },
    EditorContainer: {
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

class Editor extends Component {
    state = {
        model: '',
        Category: '',
        snackbarMessage:'',
        open:false

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

    handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };

    validation = () => {
        let postTitle = document.getElementById('postTitle').value;
       let image = document.getElementById('profilepic').files[0];
        if(validator.isEmpty(postTitle)) {
            this.setState({
                open:true,
                snackbarMessage:'Post Title Cannot Be Empty'
            });

            return false;
        }
        else {
            
            if(validator.isEmpty(this.state.Category)) {
                this.setState({
                    open:true,
                    snackbarMessage:'Please Select Category '
                });
                return false;
            }
            else {
                if(image === undefined) {
                    this.setState({
                        open:true,
                        snackbarMessage:'Thumbnail Cannot Be Empty'
                    }); 
                    return false;
                }
                
                else {
                    if(validator.isEmpty(this.state.model)) {
                        this.setState({
                            open:true,
                            snackbarMessage:'Post Content Cannot Be Empty'
                        });
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

        console.log(this.state.Category.length);
        let validation = this.validation();


 if(validation) {
            
        const formData = new FormData();
        formData.append('file',  document.getElementById('profilepic').files[0]);
        formData.append('title', document.getElementById('postTitle').value);
        formData.append('postContent', this.state.model);
        formData.append('category', this.state.Category);
        formData.append('authToken', localStorage.getItem('authToken'));
        formData.append('userId',localStorage.getItem('userId'));
   
        
        axios.post('post/create', formData,{
          headers: {
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data;`,
          }
        })
            .then((response) => {
            if (response.data.success) {
                
                   this.setState({
                       open:true,
                       snackbarMessage:'Post Created Successfully!!'
                   }) 

                 this.props.history.push('/post/'+response.data.id);
            }
          
            })
            .catch((error) => {
                console.log(error)
            })
        }

    }

    render() {

        const { classes } = this.props;
        return (
            <div style={{ marginTop: '10%' }}>
                <Paper>
                    <div className={classes.TitleContainer}>
                        <FormControl className={classes.formControl} aria-describedby="PostTitle" fullWidth>
                            <InputLabel htmlFor="postTitle">Post Title</InputLabel>
                            <Input id="postTitle"  onChange={this.handleChange} />
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


                    <Button variant="contained" color="primary" className={classes.button} onClick={this.handlePost}>Post</Button>
                </Paper>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.open}
                    TransitionComponent={this.TransitionUp}
                    variant="error"
                    autoHideDuration={2000}
                    onClose={this.handleCloseSnackBar}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.snackbarMessage}</span>}

                />


            </div>

        )
    }

}

export default withStyles(styles)(Editor);