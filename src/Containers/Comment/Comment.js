import React from 'react';
import { Typography, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';


const style = theme =>({
    CommentContainer: {
        marginBottom: '5%',
        padding: '3%'

    },
    Comments: {
        paddingLeft: '3%',
        paddingRight: '3%',
        height: 'auto'
    },
    UserName: {
        float: 'left',
        marginTop: 10,
        color: 'black'
    },
    DeleteButton: {
        float: 'right',
        ...theme.typography.button,
        color:'red',
        cursor: 'pointer',
        paddingTop:'2px',
        paddingBottom:'2px',
        // backgroundColor:'#e82e2e'
       
    },

})

class Comment extends React.Component {

    handleDeleteButton = () =>{
       console.log(localStorage.getItem('authToken'))
        axios.put('/post/comment/delete',{
            commentIdtoDelete: this.props.commentId,
            authToken:localStorage.getItem('authToken')
            
        })
        .then((response)=>{
            if(response.data.success) {
                
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    render() {
        const { classes } =this.props;
        let deleteButton = null;
        if (this.props.deleteButton) {
            deleteButton = <Typography variant="caption" className={classes.DeleteButton} onClick={this.handleDeleteButton} >DELETE COMMENT</Typography>
        }
        return (
            <Paper>
                <Typography variant="caption" className={classes.UserName}>{this.props.firstName + " " + this.props.lastName}</Typography>
                <div className={classes.CommentContainer}>
                    <Paper className={classes.Comments}>
                        
                        <Typography variant="body2" gutterBottom style={{ wordWrap: 'break-word' }} > {this.props.commentContent} </Typography>
                        {deleteButton}
                
                    </Paper>
                </div>
            </Paper>
        );
    }

}
export default withStyles(style)(Comment);