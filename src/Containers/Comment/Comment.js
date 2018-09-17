import React from 'react';
import { Typography, Paper, Button, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


const style = {
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
        float: 'right'
    }
}

class Comment extends React.Component {

    handleDeleteButton = () =>{
        alert(this.props.commentId)
    }

    render() {
        const { classes } =this.props;
        let deleteButton = null;
        if (this.props.deleteButton) {
            deleteButton = <Button variant="outlined" color="primary" className={classes.DeleteButton} onClick={this.handleDeleteButton} >DELETE</Button>
        }
        return (
            <Paper>
                <div className={classes.CommentContainer}>
                    <Paper className={classes.Comments}>
                        <Typography variant="caption" className={classes.UserName}>{this.props.firstName + " " + this.props.lastName}</Typography>
                        <Typography variant="body2" gutterBottom style={{ wordWrap: 'break-word' }} > {this.props.commentContent} </Typography>
                        {deleteButton}
                        {this.props.commentId}
                    </Paper>
                </div>
            </Paper>
        )
    }

}
export default withStyles(style)(Comment);