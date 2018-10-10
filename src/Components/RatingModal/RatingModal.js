import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Modal, Button }from '@material-ui/core';
import StarRatingComponent from 'react-star-rating-component';
import { connect } from 'react-redux';
import * as actionTypes from '../../Store/Actions/actionTypes';
import PostService from '../../Services/PostService';

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
    fontSize: 35,
    textAlign: 'center'
  },
});

class SimpleModal extends React.Component {



  state = {
    open: false,
    rating: 0
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });

  }

  handleRatePost = async () => {

    const postRatingResponse = await PostService.ratePost(this.props.postId, this.state.rating);
    if (postRatingResponse.success) {
      this.props.handleOpenSnackBar("Succesfully Rated!!");
      this.handleClose();
    }

  }

  render() {
    const { classes } = this.props;

    return (
      <div style={{ display: 'inline', marginLeft: 15 }}  >
        <Button onClick={this.handleOpen} variant="outlined" >{this.props.ButtonName}</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>

            <StarRatingComponent
              name="rate3"
              starCount={5}
              value={this.state.rating}
              onStarClick={this.onStarClick.bind(this)}

            />

            <Typography variant="caption"  >Rate this post:</Typography>
            <Button variant="contained" color="primary" onClick={this.handleRatePost} > Rate </Button>
          </div>

        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

const SimpleModalWrapped = withStyles(styles)(SimpleModal);

const mapStateToProps = state => {
  return {
    userId: state.authReducer.userId,
    authToken: state.authReducer.authToken,
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

export default connect(mapStateToProps, mapDispatchToProps)(SimpleModalWrapped);
