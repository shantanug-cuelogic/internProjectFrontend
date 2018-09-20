import React from 'react';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography, Button} from '@material-ui/core';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actionTypes from '../../Store/Actions/actionTypes';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';



const styles = theme => ({
    FormContainer: {
        margin: '10%',
        
    },
    InputContainer: {
        paddingLeft:'20%',
        paddingRight:'20%'
    },
    ButtonContainer : {
        marginTop:'5%',
        marginBottom:'5%'
    },
    Button:{
        margin:'3%'
    },
    Title : {
        marginBottom:'3%'
    }
});


class SignIn extends React.Component {

state = {
    open:false
}
TransitionUp =(props)=> {
    return <Slide {...props} direction="up" />;
  }

     handleReset = () =>{
        document.getElementById('email').value="";
        document.getElementById('password').value = ""
    }
    
     handleSignIn = () => {
    
        axios.post('/login',{
            "email":document.getElementById('email').value,
            "password": document.getElementById('password').value
    })
        .then((response)=>{
            if(response.data.success) {
                this.setState({
                    open:true
                });
                
                localStorage.setItem("authToken",response.data.authToken);
                localStorage.setItem('userId',response.data.userId);
                this.props.handleSignInState(response.data.authToken,parseInt(response.data.userId));
                
                this.props.history.push('/');   
                            
            }
            else {
                alert("failed");
            }

        })
        .catch((error)=>{
            console.log(error)
        })    
    
    }
    handleCloseSnackBar =(event,reason)=>{
        if (reason === 'clickaway') {
            return;
          }
      
          this.setState({ open: false });   
    }
    render() {
        const { classes } = this.props;
    return (
      
      
      <div className={classes.FormContainer} style={{padding:'20px'}}>
                <Typography variant="display2" className={classes.Title} > SIGN IN </Typography>
        <Paper>
            
            <Grid container
                    direction="column"
                    spacing={24}            
                >
                    <Grid item >
                    <div  className={classes.InputContainer}>
                        <FormControl fullWidth>
                            <InputLabel>Email</InputLabel>
                            <Input type='email' id="email"/>
                            <FormHelperText>Enter your Email</FormHelperText>
                        </FormControl>
                        </div>
                    </Grid>
                    
                    <Grid item xs={18}>
                    <div  className={classes.InputContainer}>
                        <FormControl fullWidth>
                            <InputLabel>Password</InputLabel>
                            <Input type='password' id="password"/>
                            <FormHelperText>Enter your Password</FormHelperText>
                        </FormControl>
                        </div>
                    </Grid>
                </Grid>
                <div className={classes.ButtonContainer}>
                <Button variant="contained" color="primary" onClick={this.handleSignIn} className={classes.Button} >Signin</Button>
                <Button variant="outlined" color="primary" onClick={this.handleReset} className={classes.Button}>reset</Button>
                </div>
                </Paper>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.open}
                    TransitionComponent={this.TransitionUp}
                    variant="error"
                    autoHideDuration={6000}
                    onClose={this.handleCloseSnackBar}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Comment Deleted</span>}
                    
                 />
        </div>
    )
    }
    
}

const mapStateToProps = state => {
    return {
        auth : state.authReducer.auth,
        authToken : state.authReducer.authToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleSignInState : (token,id) => dispatch({type:actionTypes.AUTHENTICATE , authToken:token, userId : id})
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(SignIn));