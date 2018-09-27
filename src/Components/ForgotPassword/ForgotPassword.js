import React from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { Paper, TextField, Grid, Typography, Button, Snackbar } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import * as actionTypes from '../../Store/Actions/actionTypes';

const Style = {
    Container: {
        marginTop: '10%',

    },
    FormContainer: {
        
      width:'500px',
      paddingLeft:'10%',
      paddingRight:'10%',
      paddingTop:'7%',
      paddingBottom:'3%',
        
    },


}



class ForgotPassword extends React.Component {


    state ={
        succesful:null
    }


    handleSubmit = () => {

        this.setState({
            succesful:false
        })

      axios.post('/forgotPassword',{
          email:document.getElementById('username').value
      })
      .then((response)=>{
        if(response.data.success) {
            this.props.handleOpenSnackBar('Recovery Link Sent To Registered Email')
        }
        else {
            this.props.handleOpenSnackBar(response.data.message)
        }
      })
      .catch((error)=>{
          console.log(error);
      })
    } 

    render() {
        const { classes } = this.props;
        let waitTime = null;
        if(this.state.succesful === null) {
            waitTime = null;
        }
        else if(this.state.succesful === false) {
            waitTime=  <CircularProgress
        className={classes.progress}
        variant="indeterminate"
        
      />
        }
        else if(this.state.succesful === true) {
            waitTime = <Typography variant="subheading" style={{color:'green'}} > Check Your Registered Email!! </Typography>
        }
    
    return (
        <div className={classes.Container} >
        <Typography variant="display1">FORGOT PASSWORD</Typography>
           
             <Grid
                container
                justify="center"
               
            >
             <Paper>
                <Grid item className={classes.FormContainer} >
                <TextField
                        fullWidth
                        id="username"
                        label="Enter Registerd Email"
                        
                />
               
                <Button variant="contained" color="primary" style={{marginTop:'4%'}} onClick={this.handleSubmit} >Submit</Button>
                
                </Grid>
                {waitTime}
                </Paper>                    
            </Grid>
            
   </div>
);
    }
    


}

const mapDispatchToProps = dispatch => {
    return {
        handleOpenSnackBar : (message) => dispatch({
            type: actionTypes.SNACKBAR_OPEN,
            snackBarMessage : message
        })
    }
}

export default connect(null,mapDispatchToProps)(withStyles(Style)(ForgotPassword));