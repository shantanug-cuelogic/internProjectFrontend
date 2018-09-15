import React, { Component } from 'react';
import { Typography, Paper, withStyles } from '@material-ui/core';
import renderHTML from 'react-render-html';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';
import FroalaEditor from 'react-froala-wysiwyg';
import axios from 'axios';
const style = theme => ({

    HeaderContainer: {
        marginTop: '10%',
        height: '70px'
    },

    PostContainer: {
        marginTop: '5%',
    }

})



class Post extends Component {
    state = {
        model:' ',
        postTitle : ''
    }

    componentDidMount(){

        let url = window.location.href;
        let requiredUrl = url.substr(27);
        
        axios.get('/post/getpost/'+requiredUrl)
        .then((response) => {
            console.log(response.data[0])
            this.setState({
                model : response.data[0].postContent,
                postTitle : response.data[0].title,
            })
        })
        .catch((error) => {
            console.log(error)
        })
        
    }

    render() {
        const { classes } = this.props;
        const config = {
            toolbarButtons :[],
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
                    <FroalaEditor
                      model = {this.state.model}
                      config ={config}
                      />
                    </Typography>
</div>
                </Paper>
            </div>



        );
    }
}

export default withStyles(style)(Post);