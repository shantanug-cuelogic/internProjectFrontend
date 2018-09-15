import React, { Component } from 'react';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';
import FroalaEditor from 'react-froala-wysiwyg';
import { Button, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';


const styles ={
    button:{
        marginTop:'3%',
        marginBotttom : '3%'
    },
    TitleContainer:{
        padding:'5%'
    }
}

class Editor extends Component {
    state = {
        model: '' 
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

    handlePost = () => {
        axios.post('post/create',{
            title:document.getElementById('postTitle').value,
            postContent:this.state.model,
            category:'someCategory',
            authToken:localStorage.getItem('authToken')
        })
        .then((response)=>{
            console.log(response)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    render() {
       
        const { classes } = this.props;
        return (
            <div style={{marginTop:'10%'}}>
            <Paper>
                <div className={classes.TitleContainer}>
                <FormControl className={classes.formControl} aria-describedby="PostTitle" fullWidth>
                    <InputLabel htmlFor="postTitle">Post Title</InputLabel>
                    <Input id="postTitle" value={this.state.name} onChange={this.handleChange} />
                    <FormHelperText id="postTitle"> Your Post Title Goes Here</FormHelperText>
                </FormControl>
                </div>
                     
            <FroalaEditor tag='textarea'
                    model={this.state.model}
                    onModelChange={this.handleModelChange}
                    config={this.config}

                />
                <Button variant="contained" color="primary" className={classes.button} onClick={this.handlePost}>Post</Button>
            </Paper>
                

            </div>

        )
    }

}

export default withStyles(styles)(Editor);