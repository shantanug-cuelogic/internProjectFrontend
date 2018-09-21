import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Paper, TextField, Input, Grid , Avatar, Divider } from '@material-ui/core';
import axios from 'axios';
import ProfileUpload  from '../ImageUploadPreviev/ImageUploadPreview';

const styles = theme => ({
  root: {
    width:'80%',
    marginTop:'8%',
    marginLeft:'10%'
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  FormContainer : {
    padding:'5%'
  },
  paper :{
    height:200,
    width:200
},

ProfileContainer : {
    margin:'10%'
},

ProfileAvatar : {
    marginTop:'',
    marginLeft:25,
    height:150,
    width:150
},
});

function getSteps() {
  return ['Personal Details', 'Security Question ', 'Profile Photo'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Enter Your Personal Deatails';
    case 1:
      return 'Choose Your Security Question';
    case 2:
      return 'Choose your Profile Picture';
    default:
      return 'Uknown stepIndex';
  }
}

class SignUpProcess extends React.Component {
  state = {
    activeStep: 0,
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    question : "",
    answer:"",
    image:""

  };

  handleAnswer = (event) => {
    this.setState({
      answer : event.target.value
    })
  }

  handleNext = () => {
    const { activeStep } = this.state;
    if(activeStep === 0) {
      this.setState({
        firstName:document.getElementById('firstName').value,
        lastName:document.getElementById('lastName').value,
        email:document.getElementById('email').value,
        password:document.getElementById('password').value

      })
    }

    if(activeStep === 1) {
      this.setState({
        question:document.getElementById('question').value,
        answer:document.getElementById('answer').value
      })
    }
    if(activeStep === 2) {
      this.setState({
        image:document.getElementById('profilepic').files[0],
        
      })
    }
    
    
    this.setState({
      activeStep: activeStep + 1,
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  handleSignin = () => {

    const formData = new FormData();
    formData.append('file',formData,this.state.image)


    axios.post('/register',{
      firstName:this.state.firstName,
      lastName:this.state.lastName,
      password: this.state.password,
      isAdmin:false,
      email:this.state.email,
      securityQuestion:this.state.question,
      securityAnswer:this.state.answer,
      headers: {
        'content-type': 'multipart/form-data'
              }
    })
    .then((response)=>{
      console.log(response.data)
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    let forms=null;
   if(activeStep ===0) {
     forms=<div>
                      <TextField
            fullWidth
            id="firstName"
            type="text"
            label="Firstname"
            helperText="Enter Your First Name"
            
          >
          </TextField>
          
          <TextField
            fullWidth
            id="lastName"
            type="text"
            label="Lastname"
            helperText="Enter Your Last Name"
          >
          </TextField>
          <TextField
            fullWidth
            id="email"
            type="email"
            label="Email"
            helperText="Enter Your Email"
          >
          </TextField>
          <TextField
            fullWidth
            id="password"
            type="password"
            label="Password"
            helperText="Enter Your Password"
          >
          </TextField>
          <TextField
            fullWidth
            id="confirmPassword"
            type="password"
            label=" Confirm Password"
            helperText="Enter Your Password Again"
          >
          </TextField>     
     </div>
   }

   else if(activeStep ===1 ){
     forms = <div>
       <TextField
            fullWidth
            id="question"
            type="text"
            label="Question"
            helperText="Enter question"
            
          >
          </TextField>
          <TextField
            fullWidth
            id="answer"
            type="password"
            label="Answer"
            helperText="Enter Your Answer"
            onChange={this.handleAnswer}
            value={this.state.answer}
          >
          </TextField>
     </div>
   }
   else if(activeStep === 2) {
    //  forms = <div>
       
    //    <Grid 
    //             container
    //             justify="center"
    //             >
    //                 <Grid item style = {{marginBottom:20}}>
    //                     <Paper className={classes.paper}>
    //                         <Avatar src="/images/default-user.png" className={classes.ProfileAvatar} />
    //                     </Paper>
    //                 </Grid>
    //             </Grid>
    //             <Divider /> 
    //  <form  action="/profilePicUpload" method="POST" enctype="multipart/form-data">
    //    <Input
    //         fullWidth
    //         id="profilepic"
    //         type="file"
    //         label=" Profile Picture"
    //         helperText="Upload Yoour Profile Picture"
    //         name="profilePicture"
    //       >
    //       </Input>
    //       <Divider />
    //       <Button color="primary" variant="contained" > Upload</Button>
    //       </form>
    //  </div>
    forms = <ProfileUpload />
     
   }
    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Paper>
          <div className={classes.FormContainer}>
          {forms}
          </div>
          
        </Paper>
        <div>
          {this.state.activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>All steps completed</Typography>
              <Button onClick={this.handleReset}>Reset</Button>
              <Button onClick={this.handleSignin}>Signin</Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button variant="contained" color="primary" onClick={this.handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      
      </div>
    );
  }
}

SignUpProcess.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(SignUpProcess);
