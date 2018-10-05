import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import { Button, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import * as actionTypes from '../../Store/Actions/actionTypes';  
import axios from 'axios';

function getModalStyle() {
  const top = 50 
  const left = 50 

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class FeedbackModal extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleMessageSubmit = () => {
      let messageText = document.getElementById('message').value;
      if(messageText.length === 0 || messageText === ' ' ) {
        this.props.handleOpenSnackBar("Message is empty");
      }
      else {
        axios.post('/message',{
            authToken:this.props.authToken,
            authorId : this.props.authorId,
            message : messageText
        })
        .then((response)=>{
            console.log(response.data);
            if(response.data.success) {
                this.props.handleOpenSnackBar(`Message sent to ${this.props.name}`);
                this.handleClose();
            }
        })
        .catch((error)=>{
            console.log(error);
        })
      }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
       
        <Button onClick={this.handleOpen} variant="outlined" color="primary" >SEND MESSAGE TO {this.props.name}</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="title" > MESSAGE </Typography>

          <TextField
          type="text"
          id="message"
          label="Message"
            fullWidth
          margin="normal"
        />

            <Button variant="contained" color="primary" onClick={this.handleMessageSubmit} > SEND  </Button>
            <Button variant="outlined" color="primary" onClick={this.handleClose} style={{marginLeft:20}} >CANCEL</Button>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps =  state => {
    return {
        authToken : state.authReducer.authToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleOpenSnackBar: (snackBarMessage) => dispatch({
            type: actionTypes.SNACKBAR_OPEN,
            snackBarMessage: snackBarMessage
        })
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(FeedbackModal));
