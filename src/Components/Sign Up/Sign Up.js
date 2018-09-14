import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '90%',
    marginTop:'10%'
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  FormContainer : {
      marginBottom:'7%',
      marginTop:'3%'
  }
});

function getSteps() {
  return ['Enter Your Personal Details', 'Choose Your Email and Password', 'Finish'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Step 1: Enter Your Personal Details...';
    case 1:
      return 'Step 2: Choose Your Email and Password';
    case 2:
      return 'Step 3: Finish';
    default:
      return 'Unknown step';
  }
}

class SignUpProcess extends React.Component {
  state = {
    activeStep: 0,
    completed: {},
  };

  totalSteps = () => {
    return getSteps().length;
  };

  handleNext = () => {
    let activeStep;

    if (this.isLastStep() && !this.allStepsCompleted()) {
      // It's the last step, but not all steps have been completed,
      // find the first step that has been completed
      const steps = getSteps();
      activeStep = steps.findIndex((step, i) => !(i in this.state.completed));
    } else {
      activeStep = this.state.activeStep + 1;
    }
    this.setState({
      activeStep,
    });
    
    
    
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  handleStep = step => () => {
    this.setState({
      activeStep: step,
    });
    console.log(step);
  };

  handleComplete = () => {
    const { completed } = this.state;
    completed[this.state.activeStep] = true;
    this.setState({
      completed,
    });
    this.handleNext();
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
      completed: {},
    });
  };

  completedSteps() {
    return Object.keys(this.state.completed).length;
  }

  isLastStep() {
    return this.state.activeStep === this.totalSteps() - 1;
  }

  allStepsCompleted() {
    return this.completedSteps() === this.totalSteps();
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;


    var formContains=null;

    if(this.state.activeStep === 0) {
         formContains = (
        <div>
            <Grid >
            <FormControl>
                <InputLabel  >First Name</InputLabel>
                <Input type='text'/>
                <FormHelperText>Enter your First Name</FormHelperText>
            </FormControl>

        </Grid>
        <Grid >
            <FormControl>
                <InputLabel>Last Name</InputLabel>
                <Input />
                <FormHelperText>Enter your Last Name</FormHelperText>
            </FormControl>
        </Grid>
        </div>
        
        );
    }
    else if(this.state.activeStep === 1) {
        formContains =(
            <div >
                  <Grid item>
                            <FormControl>
                                <InputLabel>Email</InputLabel>
                                <Input type='email'/>
                                <FormHelperText>Enter your Email</FormHelperText>
                            </FormControl>
                        </Grid>
    
                        <Grid item>
                            <FormControl>
                                <InputLabel>Password</InputLabel>
                                <Input type='password'/>
                                <FormHelperText>Enter your Password</FormHelperText>
                            </FormControl>
                        </Grid>
            </div>
        )
    }

    else if(this.state.activeStep === 2) {
        formContains =(
            <div >
                  <Grid item>
                            <FormControl>
                                <InputLabel>Profile Photo</InputLabel>
                                <Input type='file'/>
                                <FormHelperText>Upload Your Photo To how off</FormHelperText>
                            </FormControl>
                        </Grid>
    
            </div>
        )
    }



    return (
      <div className={classes.root}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepButton
                  onClick={this.handleStep(index)}
                  completed={this.state.completed[index]}
                >
                  {label}
                </StepButton>
              </Step>
            );
          })}
        </Stepper>
        <Paper>
        <div className={classes.FormContainer}>
                {formContains}
          </div>
         
        </Paper>
          
        <div>
          {this.allStepsCompleted() ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&quot;re finished
              </Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext}
                  className={classes.button}
                >
                  Next
                </Button>
                {activeStep !== steps.length &&
                  (this.state.completed[this.state.activeStep] ? (
                    <Typography variant="caption" className={classes.completed}>
                      Step {activeStep + 1} already completed
                    </Typography>
                  ) : (
                    <Button variant="contained" color="primary" onClick={this.handleComplete}>
                      {this.completedSteps() === this.totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                    </Button>
                  ))}
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