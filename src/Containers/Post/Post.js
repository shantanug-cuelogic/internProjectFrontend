import React, { Component } from 'react';
import { Typography, Paper, Button, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';
import FroalaEditor from 'react-froala-wysiwyg';
import axios from 'axios';
import { connect } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import Comment from '../Comment/Comment'

const style = theme => ({

    HeaderContainer: {
        marginTop: '10%',
        height: '70px'
    },

    PostContainer: {
        marginTop: '5%',
    },
    EditButtonContainer : {
        marginTop:'2%'
    },
    CommentContainer : {
        marginBottom:'5%',
        padding:'3%'

    },
    Comments : {
        paddingLeft:'3%',
        paddingRight : '3%'
    },
    UserName : {
      float:'left',
      marginTop:10,
      color:'black'  
    },
    PostCommentButton : {
        marginBottom:'3%'
    },
    AllCommentsContainer:{
        marginBottom:'3%'

    }

})



class Post extends Component {
    state = {
        model:' ',
        postTitle : '',
        postId: '',
        userId: '',
        name : '',
        allcomments:[]
    }

    componentDidMount(){

        let url = window.location.href;
        let requiredUrl = url.substr(27);
        
        axios.get('/post/getpost/'+requiredUrl)
        .then((response) => {
            
            this.setState({
                model : response.data[0].postContent,
                postTitle : response.data[0].title,
                postId :response.data[0].postId,
                userId: response.data[0].userId
            });

            axios.get('/post/comment/'+response.data[0].postId)
            .then((allcomments)=>{

                this.setState({
                    allcomments: [...allcomments.data.result]

                })
            
            })
            .catch((error)=>{
                console.log(error)
            })

        })
        .catch((error) => {
            console.log(error)
        });

        axios.get('/userprofile/'+ localStorage.getItem('userId'))
        .then((response)=>{
            this.setState({
                name:response.data[0].firstName + " "+ response.data[0].lastName
            })
        })
        .catch((error)=>{
            console.log(error)
        });

      
        
    }

    handlePostComment = ()=>{
        let comment =document.getElementById('comment').value;
        axios.put('/post/comment/',{
            authToken:localStorage.getItem('authToken'),
            postId:this.state.postId,
            commentContent:comment
        })
        .then((response)=>{
            document.getElementById('comment').value="";
            window.location.href='/post/'+this.state.postId
        })
        .catch((error)=>{
            console.log(error)
        })

    }

    render() {
        const { classes } = this.props;
        const config = {
            contenteditable : false,
            toolbarButtons :[],
          
        }
            let button =null;
        if(localStorage.getItem('userId') === this.state.userId.toString()) {
            button =  <Button color="primary" variant="contained">Edit</Button>
        
        }
        
        let comments =  <LinearProgress />
        
         if(this.state.allcomments.length > 0) {
            comments = this.state.allcomments.map((comment,index) => {
                console.log("props userid==>",this.props.userId);
                console.log("comment user id ==>",comment.userId)
               return(
                <Comment 
                key={index}
                commentId={comment.commentId}
                commentContent={comment.commentContent}
                firstName ={comment.firstName}
                lastName = {comment.lastName}
                deleteButton ={comment.userId == this.props.userId ? true : false }
                
               >
                </Comment>
               ) 
            })
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
                    <div>
                    <FroalaEditor
                      model = {this.state.model}
                      config ={config}
                      />
                    </div>
                    
                    </Typography>
                    </div>
                </Paper>
                <div className={classes.EditButtonContainer}>
                           {button}
                </div>
                
                {this.props.auth ?  <Paper>
                <div className={classes.CommentContainer}>
                    <Paper className={classes.Comments}>
                    <Typography variant="caption" className={classes.UserName}>{this.state.name}</Typography>
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
                </Paper>
                : <p style={{color:'red'}}>YOU NEED TO SIGNIN TO COMMENT</p>
                }
               
               
                <Paper>
                    <div className={classes.AllCommentsContainer}>
                        {comments}
                    </div>
                </Paper>
                
            </div>



        );
    }
}

const mapStateToProps = state =>{
    return {
        auth:state.auth,
        userId:state.userId
    }
}

export default connect(mapStateToProps)(withStyles(style)(Post));