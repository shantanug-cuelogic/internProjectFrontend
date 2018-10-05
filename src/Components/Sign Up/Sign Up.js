import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Paper, TextField, Input, Grid, Avatar, Divider, Snackbar } from '@material-ui/core';
import axios from 'axios';
import ProfileUpload from '../ImageUploadPreviev/ImageUploadPreview';
import validator from 'validator';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { connect } from 'react-redux';
import * as actionTypes from '../../Store/Actions/actionTypes';
const styles = theme => ({
  root: {
    width: '80%',
    marginTop: '8%',
    marginLeft: '10%'
  },

  Inputs: {
    width: 600,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30
  },
  SignUpButton: {

    marginBottom: 10
  },

  backButton: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  FormContainer: {
    padding: '5%'
  },
  paper: {
    height: 200,
    width: 200
  },

  ProfileContainer: {
    margin: '10%'
  },

  ProfileAvatar: {
    marginTop: '',
    marginLeft: 25,
    height: 150,
    width: 150
  },
});



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
            if(!validator.isEmail(this.state.formData.email)) {
              this.props.handleOpenSnackBar('Enter Valid Email Id');
              return false;
            }
            else {
              if(this.state.formData.password === this.state.formData.repeatPassword) {
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


  handleSubmit = () => {

    let validation = this.validation();
    if(validation) {
      axios.post('/register', {
        firstName: this.state.formData.firstName,
        lastName: this.state.formData.lastName,
        isAdmin: false,
        email: this.state.formData.email,
        password: this.state.formData.password
      })
        .then((response) => {
          console.log(response.data);

          if (response.data.success) {
            axios.post('/login', {
              "email":  this.state.formData.email,
              "password": this.state.formData.password
          })
              .then((response) => {
                if (response.data.success) {
                    this.props.handleOpenSnackBar(`WELCOME ${this.state.formData.firstName} `)
                   
                      this.props.handleSignInState(response.data.authToken,
                          parseInt(response.data.userDetails.userId),
                          response.data.userDetails.firstName,
                          response.data.userDetails.lastName,
                          response.data.userDetails.profileImage,
                          response.data.userDetails.email,
                          response.data.userDetails.isAdmin,
                          response.data.userDetails.gender,
                          response.data.userDetails.followers,
                      );
                      this.props.history.push('/');
                  }
                  else {
                      this.props.handleOpenSnackBar("Username or Password is Wrong")
                  }

              })
              .catch((error) => {
                  console.log(error)
              })

          }
          else if(response.data.message.errno === 1062) {
            this.props.handleOpenSnackBar("Username already exists");

          }
         
        })
        .catch((error) => {
          console.log(error);
        })
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
      handleSignInState: (token, id, firstName, lastName, profileImage, email, isAdmin , gender,followers) => dispatch({
          type: actionTypes.AUTHENTICATE,
          authToken: token, userId: id,
          firstName: firstName,
          lastName: lastName,
          profileImage: profileImage,
          email: email,
          isAdmin: isAdmin,
          gender:gender,
          followers:followers
     }),
     handleOpenSnackBar : (message) => dispatch ({
       type:actionTypes.SNACKBAR_OPEN,
       snackBarMessage: message
     })
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(SignUpProcess));
