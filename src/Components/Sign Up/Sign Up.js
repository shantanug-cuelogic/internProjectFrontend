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
      open: false,
      snackbarmsg: ''

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
  handleCloseSnackBar = () => {
    this.setState({
      open: false,
      snackbarmsg: ""
    })
  }

  validation = () => {
    if (this.state.formData.firstName.length === 0) {
      this.setState({
        open: true,
        snackbarmsg: 'First Name is Empty'
      });
      return false;
    }
    else {
      if (this.state.formData.lastName.length === 0) {
        this.setState({
          open: true,
          snackbarmsg: 'Last Name is Empty'
        });
        return false;
      }
      else {
        if (this.state.formData.email.length === 0) {
          this.setState({
            open: true,
            snackbarmsg: 'Email cannot be empty'
          });
          return false;
        }
        else {
          if (this.state.formData.password.length === 0) {
            this.setState({
              open: true,
              snackbarmsg: 'Password cannot be empty'
            });
            return false;
          }
          else {
            if(!validator.isEmail(this.state.formData.email)) {
              this.setState({
                open: true,
                snackbarmsg: 'Enter Valid Email Id'
              });
              return false;
            }
            else {
              if(this.state.formData.password === this.state.formData.repeatPassword) {
                return true;
              }
              else {
                this.setState({
                  open:true,
                  snackbarmsg : 'Confirm password does not match'
                });
                return false;
              }
            }
          }
        }
      }
    }
  }


  handleSubmit = () => {

    // const formData = new FormData();
    // // formData.append('file', this.state.image);
    // formData.append('firstName', this.state.formData.firstName);
    // formData.append('lastName', this.state.formData.lastName);
    // formData.append('isAdmin', false);
    // formData.append('email', this.state.formData.email);
    // // formData.append('securityQuestion', this.state.question);
    // // formData.append('securityAnswer', this.state.answer);
    // formData.append('password', this.state.formData.password);

    // axios.post('/register', formData,

    //   {
    //     headers: {
    //       'accept': 'application/json',
    //       'Accept-Language': 'en-US,en;q=0.8',
    //       'Content-Type': `multipart/form-data;`,
    //     }
    //   })

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
  
          if (response.data.success) {
            this.props.history.push('/signin');
          }
          else {
            if (response.data.message.errno === 1062) {
              this.setState({
                open: true,
                snackbarmsg: "Email Already Present"
              })
            }
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
          onClick={this.handleCloseSnackBar}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.snackbarmsg}</span>}

        />


      </div>
    );
  }
}

SignUpProcess.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(SignUpProcess);
