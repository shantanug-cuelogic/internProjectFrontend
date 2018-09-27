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
import Slide from '@material-ui/core/Slide';
import validator from 'validator';
import { NavLink } from 'react-router-dom';


const styles = theme => ({
    FormContainer: {
        margin: '10%',

    },
    InputContainer: {
        paddingLeft: '20%',
        paddingRight: '20%'
    },
    ButtonContainer: {
        marginTop: '5%',
        marginBottom: '5%'
    },
    Button: {
        margin: '3%'
    },
    Title: {
        marginBottom: '3%'
    }
});


class SignIn extends React.Component {

  
    TransitionUp = (props) => {
        return <Slide {...props} direction="up" />;
    }

    handleReset = () => {
        document.getElementById('email').value = "";
        document.getElementById('password').value = ""
    }
   
    validation = () => {
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        
            if(validator.isEmpty(email)) {
                this.props.handleOpenSnackBar("Username Cannot be Empty");
                return false;
        }
        else {
            if(!validator.isEmail(email)) {
                this.props.handleOpenSnackBar("Enter Valid Email");
                return false;
            }
            else {
                if(validator.isEmpty(password)) {
                   
                    this.props.handleOpenSnackBar("Password cannot be empty");
                    return false;
                }
                else {
                    return true;
                }
            }
        }
    }


    handleSignIn = () => {

        let validation = this.validation();

        if (validation) {
            axios.post('/login', {
                "email": document.getElementById('email').value,
                "password": document.getElementById('password').value
            })
                .then((response) => {
                    if (response.data.success) {
                        
                        
                        this.props.handleOpenSnackBar("Succesfully Signed In");
                        

                        localStorage.setItem("authToken", response.data.authToken);
                        localStorage.setItem('userId', response.data.userId);
                        axios.get('/userprofile/' + response.data.userId)

                            .then((userDetails) => {
                                console.log(userDetails)

                                this.props.handleSignInState(response.data.authToken,
                                    parseInt(response.data.userId),
                                    userDetails.data[0].firstName,
                                    userDetails.data[0].lastName,
                                    userDetails.data[0].profileImage,
                                    userDetails.data[0].email,
                                    userDetails.data[0].isAdmin,
                                    userDetails.data[0].gender
                                );
                                this.props.history.push('/');

                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    }

                    else {
                      
                            this.props.handleOpenSnackBar("Username or Password is Wrong")
                        
                    }

                })
                .catch((error) => {
                    console.log(error)
                })
        }



    }
    
    render() {
        const { classes } = this.props;
        return (


            <div className={classes.FormContainer} style={{ padding: '20px' }}>
                <Typography variant="display2" className={classes.Title} > SIGN IN </Typography>
                <Paper>

                    <Grid container
                        direction="column"
                        spacing={24}
                    >
                        <Grid item >
                            <div className={classes.InputContainer}>
                                <FormControl fullWidth>
                                    <InputLabel>Email</InputLabel>
                                    <Input type='email' id="email" />
                                    <FormHelperText>Enter your Email</FormHelperText>
                                </FormControl>
                            </div>
                        </Grid>

                        <Grid item xs={18}>
                            <div className={classes.InputContainer}>
                                <FormControl fullWidth>
                                    <InputLabel>Password</InputLabel>
                                    <Input type='password' id="password" />
                                    <FormHelperText>Enter your Password</FormHelperText>
                                </FormControl>
                            </div>
                        </Grid>
                    </Grid>
                    <div className={classes.ButtonContainer}>
                        <Button variant="contained" color="primary" onClick={this.handleSignIn} className={classes.Button} >Signin</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleReset} className={classes.Button}>reset</Button>
                        <Button variant="outlined" color="primary"  className={classes.Button} component={NavLink} to="/forgotpassword" >forgot password</Button>

                    </div>
                </Paper>
                
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        auth: state.authReducer.auth,
        authToken: state.authReducer.authToken,
        firstName: state.authReducer.firstName,
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleSignInState: (token, id, firstName, lastName, profileImage, email, isAdmin, gender) => dispatch({
            type: actionTypes.AUTHENTICATE,
            authToken: token, userId: id,
            firstName: firstName,
            lastName: lastName,
            profileImage: profileImage,
            email: email,
            isAdmin: isAdmin,
            gender:gender
       }),

       handleOpenSnackBar : (snackBarMessage) => dispatch ({
           type: actionTypes.SNACKBAR_OPEN,
           snackBarMessage:snackBarMessage
       })
       
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignIn));