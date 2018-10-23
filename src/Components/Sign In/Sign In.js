import React from 'react';
import {
    Paper,
    Input,
    InputLabel,
    FormHelperText,
    FormControl,
    Grid,
    Typography,
    Button,
    Slide,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import * as actionTypes from '../../Store/Actions/actionTypes';
import { NavLink } from 'react-router-dom';
import styles from './SignInStyle';
import UserService from '../../Services/UserService';
import Validation from '../../Utility/validation';

class SignIn extends React.Component {
    TransitionUp = (props) => {
        return <Slide {...props} direction="up" />;
    }

    handleReset = () => {
        document.getElementById('email').value = "";
        document.getElementById('password').value = ""
    }

    handleSignIn = async () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const validation = Validation.signInValidation(email, password);
        if (validation === true) {
            const signinResponse = await UserService.userSignIn(document.getElementById('email').value, document.getElementById('password').value);
            if (signinResponse.success) {
                this.props.handleOpenSnackBar("Succesfully Signed In");

                this.props.handleSignInState(signinResponse.authToken,
                    signinResponse.userDetails.userId,
                    signinResponse.userDetails.firstName,
                    signinResponse.userDetails.lastName,
                    signinResponse.userDetails.profileImage,
                    signinResponse.userDetails.email,
                    signinResponse.userDetails.isAdmin,
                    signinResponse.userDetails.gender,
                    signinResponse.userDetails.followers,
                );
                this.props.history.push('/');
            }
            else {
                this.props.handleOpenSnackBar("Username or Password is Wrong")
            }

        }
        else {
            this.props.handleOpenSnackBar(validation);
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
                        <Button variant="outlined" color="primary" className={classes.Button} component={NavLink} to="/forgotpassword" >forgot password</Button>

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
        handleSignInState: (token, id, firstName, lastName, profileImage, email, isAdmin, gender, followers) => dispatch({
            type: actionTypes.AUTHENTICATE,
            authToken: token, userId: id,
            firstName: firstName,
            lastName: lastName,
            profileImage: profileImage,
            email: email,
            isAdmin: isAdmin,
            gender: gender,
            followers: followers
        }),

        handleOpenSnackBar: (snackBarMessage) => dispatch({
            type: actionTypes.SNACKBAR_OPEN,
            snackBarMessage: snackBarMessage
        })

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignIn));