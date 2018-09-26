import React from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { Paper, TextField, Grid, Typography, Button, Snackbar } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

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
        open:false,
        snackbarMessage:'',
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
            this.setState({
                succesful:true,    
                open:true,
                snackbarMessage:'Recovery Link Sent To Registered Email'
            });
        }
        else {
            this.setState({
                succesful:null,    
                open:true,
                snackbarMessage:response.data.message
            })
        }
      })
      .catch((error)=>{
          console.log(error);
      })
    } 

    handleCloseSnackBar = () => {
        this.setState({
            open: false,
            snackbarMessage: " "
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
            <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.open}
                    TransitionComponent={this.TransitionUp}
                    variant="error"
                    autoHideDuration={1000}
                    onClose={this.handleCloseSnackBar}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.snackbarMessage}  </span>}

                />
   </div>
);
    }
    


}

export default withStyles(Style)(ForgotPassword);