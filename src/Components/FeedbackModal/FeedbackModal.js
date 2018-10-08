import React from 'react';
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

  handleFeedbackSubmit = () => {
    let feedbackText = document.getElementById('feedback').value;
    if (feedbackText.length === 0 || feedbackText === ' ') {
      this.props.handleOpenSnackBar("Feedback is empty");
    }
    else {
      axios.post('/feedback', {
        authToken: this.props.authToken,
        authorId: this.props.authorId,
        feedback: feedbackText
      })
        .then((response) => {
          if (response.data.success) {
            this.props.handleOpenSnackBar(`Feedback sent to ${this.props.name}`);
            this.handleClose();
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button onClick={this.handleOpen} variant="outlined" color="primary" >GIVE FEEDBACK TO {this.props.name}</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="title" > FEEDBACK </Typography>
            <TextField
              id="feedback"
              label="Feedback"
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={this.handleFeedbackSubmit} > SEND  </Button>
            <Button variant="outlined" color="primary" onClick={this.handleClose} style={{ marginLeft: 20 }} >CANCEL</Button>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authToken: state.authReducer.authToken
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FeedbackModal));
