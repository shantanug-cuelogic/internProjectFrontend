import React from 'react';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography, Button } from '@material-ui/core';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actionTypes from '../../Store/Actions/actionTypes';
import { Link } from "react-router-dom";


const styles = theme => ({
    FormContainer: {
        margin: '10%'
    },
    InputContainer: {
        width: '100%'
    }
});


class SignIn extends React.Component {


    
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
                localStorage.setItem("authToken",response.data.authToken);
                localStorage.setItem('userId',response.data.userId);
                this.props.handleSignInState(response.data.authToken,response.data.userId);
                
            }
            else {
                alert("failed");
            }



        })
        .catch((error)=>{
            console.log(error)
        })    
    
    }




    render() {

        
    
        const { classes } = this.props;
    return (
      
      
      <div className={classes.FormContainer} style={{padding:'20px'}}>
        <Paper>
            <Typography variant="title"> Sign in form </Typography>
            <Grid container
                    direction="column"
                    spacing={24}            
                >
                    <Grid item xs={8}>
                        <FormControl fullWidth>
                            <InputLabel>Email</InputLabel>
                            <Input type='email' id="email"/>
                            <FormHelperText>Enter your Email</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={8}>
                        <FormControl fullWidth>
                            <InputLabel>Password</InputLabel>
                            <Input type='password' id="password"/>
                            <FormHelperText>Enter your Password</FormHelperText>
                        </FormControl>
                    </Grid>
                </Grid>
                <Button variant="contained" color="primary" onClick={this.handleSignIn}>Signin</Button>
                <Button variant="outlined" color="primary" onClick={this.handleReset} >reset</Button>
                </Paper>
        </div>
    )
    }
    
}

const mapStateToProps = state => {
    return {
        auth : state.auth,
        authToken : state.authToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleSignInState : (token,id) => dispatch({type:actionTypes.AUTHENTICATE , authToken:token, userId : id})
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(SignIn));