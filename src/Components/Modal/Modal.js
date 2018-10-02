import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import StarRatingComponent from 'react-star-rating-component';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actionTypes from '../../Store/Actions/actionTypes';

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
    fontSize:35,
    textAlign:'center'
  },
});

class SimpleModal extends React.Component {

    constructor(props) {
        super(props);
        console.log("in constructor",this.props.postId)
        axios.get('/post/ratings/'+props.postId)
        .then((response) => {
            console.log("Ratings ===>",response.data.Ratings);
            this.setState({
                rating:response.data.Ratings
            })
        } )
        .catch((error) =>{
            console.log(error);
        })
    }


    state = {
    open: false,
    rating:0
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
    
}

handleRatePost = () =>{
console.log(this.state.rating);
    axios.put('/post/ratings',{
        authToken : this.props.authToken,
        postId : this.props.postId,
        rating: this.state.rating
    })
    .then((response) =>{
        if(response.data.success) {
            this.props.handleOpenSnackBar("Succesfully Rated!!");
            this.handleClose();
        }
    })
    .catch((error) =>{
        console.log(error);
    })
}

render() {
    const { classes } = this.props;

    return (
      <div style={{display:'inline', marginLeft:15}}  >
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
                    <Button  variant="contained" color="primary" onClick={this.handleRatePost} > Rate </Button>
          </div>
          
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

const mapStateToProps = state => {
    return {
        userId : state.authReducer.userId,
        authToken:state.authReducer.authToken
    }
}

const mapDispatchToProps =  dispatch => {
    return {
        handleOpenSnackBar: (snackBarMessage) => dispatch({
            type: actionTypes.SNACKBAR_OPEN,
            snackBarMessage: snackBarMessage
        })
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SimpleModalWrapped);
