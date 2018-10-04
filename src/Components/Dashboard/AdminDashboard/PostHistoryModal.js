import React from 'react';
import PropTypes, { element } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import PostHistoryIcon from '@material-ui/icons/ListAlt'
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import moment from 'moment';
import { Divider } from '@material-ui/core';

function getModalStyle() {
  const top = 50;
  const left = 60 ;

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

class SimpleModal extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
      open: false,
      postHistory:[]
    }
    

  }


  


  handleOpen = () => {

    axios.get('/post/history/'+this.props.postId)
    .then((response) => {
    if(response.data.success) {
      this.setState({ 
        open: true ,
        postHistory :[...response.data.result]
      });
    }
    else {
      this.setState({
        open:true,
        postHistory:[]
      })
    }
    })
    .catch((error)=>{
      console.log(error);
    })

   
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    console.log(this.state.postHistory);
    let modalContent = <p>NO POST HISTORY TO SHOW</p>;
    if(this.state.postHistory.length === 0) {
      modalContent = <p>NO POST HISTORY TO SHOW</p>
    }
    else if(this.state.postHistory.length !==0) {
      modalContent = this.state.postHistory.map((element,index)=>{
        return(
          <div key={index}>
            <p>{element.firstName}  {element.activityType} <b> {element.title}</b> on <i> {moment.unix(element.activityTimeStamp).format('dddd, MMMM Do, YYYY h:mm:ss A')}</i></p>
            <Divider />
          </div>
        )
      })
    }

    return (
      <div>
      
        <IconButton aria-label="Posthistory" onClick={this.handleOpen}  >
          <PostHistoryIcon />
        </IconButton>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
          {modalContent}
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

export default SimpleModalWrapped;
