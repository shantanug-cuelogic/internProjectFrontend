import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  Grid,
  Button,
  Typography,
} from '@material-ui/core';
import validator from 'validator';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { connect } from 'react-redux';
import * as actionTypes from '../../Store/Actions/actionTypes';
import GoogleLogin from 'react-google-login';
import styles from './SignupStyle';
import UserService from '../../Services/UserService';

class SignUpProcess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        email: '',
        password: '',
        firstName: '',
        repeatPassword: '',
        lastName: ''
      },
      submitted: false,
      signUpButton: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== this.state.formData.password) {

        this.setState({
          signUpButton: false
        })
        return false;
      }
      this.setState({
        signUpButton: true
      })
      return true;
    });

    ValidatorForm.addValidationRule('isEmpty', (value) => {
      if (value.length === 0) {

        this.setState({
          signUpButton: false
        })

        return false;
      }

      return true;
    });
  }

  validation = () => {
    if (this.state.formData.firstName.length === 0) {
      this.props.handleOpenSnackBar('First Name is Empty');
      return false;
    }
    else {
      if (this.state.formData.lastName.length === 0) {
        this.props.handleOpenSnackBar('Last Name is Empty');
        return false;
      }
      else {
        if (this.state.formData.email.length === 0) {
          this.props.handleOpenSnackBar("Email cannot be Empty");
          return false;
        }
        else {
          if (this.state.formData.password.length === 0) {
            this.props.handleOpenSnackBar('Password cannot be empty');
            return false;
          }
          else {
            if (!validator.isEmail(this.state.formData.email)) {
              this.props.handleOpenSnackBar('Enter Valid Email Id');
              return false;
            }
            else {
              if (this.state.formData.password === this.state.formData.repeatPassword) {
                return true;
              }
              else {
                this.props.handleOpenSnackBar('Password doest not Match')
                return false;
              }
            }
          }
        }
      }
    }
  }
  responseGoogleSuccess = async (GoogleResponse) => {
    const userRegisterResponse = await UserService.userSignUp(
      GoogleResponse.w3.ofa,
      GoogleResponse.w3.wea,
      GoogleResponse.w3.U3,
      "google",
      GoogleResponse.w3.Paa
    );
    if (userRegisterResponse.success) {
      const userSigninResponse = await UserService.userSignIn(GoogleResponse.w3.U3, "google");
      if (userSigninResponse.success) {
        this.props.handleOpenSnackBar(`Welcome ${GoogleResponse.w3.ofa} `);

        this.props.handleSignInState(userSigninResponse.authToken,
          userSigninResponse.userDetails.userId,
          userSigninResponse.userDetails.firstName,
          userSigninResponse.userDetails.lastName,
          userSigninResponse.userDetails.profileImage,
          userSigninResponse.userDetails.email,
          userSigninResponse.userDetails.isAdmin,
          userSigninResponse.userDetails.gender,
          userSigninResponse.userDetails.followers,
        );
        this.props.history.push('/');
      }
      else {
        this.props.handleOpenSnackBar("Username or Password is Wrong")
      }
    }
    else if (userRegisterResponse.message.errno === 1062) {
      this.props.handleOpenSnackBar("Username already exists");
    }
  }
  responseGoogleFailure = (response) => {
    console.log(response)
  }

  handleSubmit = async () => {

    let validation = this.validation();
    if (validation) {
      const userRegisterResponse = await UserService.userSignUp(
        this.state.formData.firstName,
        this.state.formData.lastName,
        this.state.formData.email,
        this.state.formData.password,
        '/require/userimage.jpg'
      );
      if (userRegisterResponse.success) {
        const userSigninResponse = await UserService.userSignIn(this.state.formData.email, this.state.formData.password);
        if (userSigninResponse.success) {
          this.props.handleOpenSnackBar(`WELCOME ${this.state.formData.firstName} `)
          this.props.handleSignInState(userSigninResponse.authToken,
            userSigninResponse.userDetails.userId,
            userSigninResponse.userDetails.firstName,
            userSigninResponse.userDetails.lastName,
            userSigninResponse.userDetails.profileImage,
            userSigninResponse.userDetails.email,
            userSigninResponse.userDetails.isAdmin,
            userSigninResponse.userDetails.gender,
            userSigninResponse.userDetails.followers,
          );
          this.props.history.push('/');
        }
        else {
          this.props.handleOpenSnackBar("Username or Password is Wrong");
        }
      }
      else if (userRegisterResponse.message.errno === 1062) {
        this.props.handleOpenSnackBar("Username already exists");
      }
    }
  }
  handleChange(event) {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="display2" className={classes.Title} > SIGN UP </Typography>
        <Grid container
          direction="row"
          justify="center"
        >
          <Paper>
            <ValidatorForm
              ref="form"
              onSubmit={this.handleSubmit}
            >
              <Grid item>
                <TextValidator
                  className={classes.Inputs}
                  label="First Name"
                  onChange={this.handleChange}
                  name="firstName"
                  value={this.state.formData.firstName}
                  validators={['required', 'isEmpty']}
                  errorMessages={['this field is required', 'field cannot be empty']}
                />
              </Grid>
              <Grid item>
                <TextValidator
                  className={classes.Inputs}
                  label="Last Name"
                  onChange={this.handleChange}
                  name="lastName"
                  value={this.state.formData.lastName}
                  validators={['required', 'isEmpty']}
                  errorMessages={['this field is required', 'field cannot be empty']}
                />
              </Grid>
              <TextValidator
                className={classes.Inputs}
                label="Email"
                onChange={this.handleChange}
                name="email"
                value={this.state.formData.email}
                validators={['required', 'isEmail', 'isEmpty']}
                errorMessages={['this field is required', 'email is not valid', 'field cannot be empty']}
              />
              <Grid item>
                <TextValidator
                  className={classes.Inputs}
                  label="Password"
                  onChange={this.handleChange}
                  type="password"
                  name="password"
                  value={this.state.formData.password}
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
              </Grid>
              <Grid item>
                <TextValidator
                  className={classes.Inputs} style={{ marginBottom: 60 }}
                  label="Repeat password"
                  onChange={this.handleChange}
                  name="repeatPassword"
                  type="password"
                  validators={['isPasswordMatch', 'required']}
                  errorMessages={['password mismatch', 'this field is required']}
                  value={this.state.formData.repeatPassword}
                />
              </Grid>
            </ValidatorForm>
            <Grid item>
              <Button className={classes.SignUpButton} variant="contained" color="primary" onClick={this.handleSubmit}  > SIGN UP</Button>
            </Grid>
            <Grid item>
              <GoogleLogin
                clientId="520363330227-oa4794e458pmqq4v13stdpe2pucecfi5.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={this.responseGoogleSuccess}
                onFailure={this.responseGoogleFailure}
              >
                <span> Sign up with Google</span>
              </GoogleLogin>
            </Grid>
          </Paper>
        </Grid>
      </div>
    );
  }
}

SignUpProcess.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    auth: state.authReducer.auth,
    authToken: state.authReducer.authToken,
    firstName: state.authReducer.firstName
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
    handleOpenSnackBar: (message) => dispatch({
      type: actionTypes.SNACKBAR_OPEN,
      snackBarMessage: message
    })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignUpProcess));
