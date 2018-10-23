import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography, Button } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import * as actionTypes from '../../Store/Actions/actionTypes';
import { connect } from 'react-redux';
import Style from './PasswordRecoverStyle';
import UserService from '../../Services/UserService';
import Validation from '../../Utility/validation';

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            authToken: this.props.match.params.authToken,
            isValidToken: false,
            firstName: '',
            lastName: '',
            userId: null,
            password: '',
            repeatPassword: ''
        }
    }
    componentDidMount = async () => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.password) {
                return false;
            }
            return true;
        });
        ValidatorForm.addValidationRule('isEmpty', (value) => {
            if (value.length === 0) {
                return false;
            }
            return true;
        });
        const forgetTokenCheckResponse = await UserService.checkForgetToken(this.state.authToken);
        if (forgetTokenCheckResponse.success) {
            this.setState({
                isValidToken: true,
                firstName: forgetTokenCheckResponse.result[0].firstName,
                lastName: forgetTokenCheckResponse.result[0].lastName,
                userId: forgetTokenCheckResponse.result[0].userId
            });
            this.props.handleOpenSnackBar("User authenticated");
        }
    }
   
    handleUpdatePassword = async () => {
        const password = document.getElementById('password').value;
        const confirmpassword = document.getElementById('confirmpassword').value;
        const validation = Validation.passwordRecovery(password,confirmpassword);
        if (validation === true) {
            const updatePasswordResponse = await UserService.changeUserPassword(this.state.userId, this.state.password);
            if (updatePasswordResponse.success) {
                this.props.handleOpenSnackBar("Password Changed Succesfully");
                this.props.history.push('/signin');
            }
            else {
                this.props.handleOpenSnackBar(updatePasswordResponse.message);
            }
        }
        else {
            this.props.handleOpenSnackBar(validation);
        }
    }
    handleChangePassword = (event) => {
        this.setState({
            password: event.target.value
        });
    }
    handleChangeRepeatPassword = (event) => {
        this.setState({
            repeatPassword: event.target.value
        });

    }
    render() {
        const { classes } = this.props;
        const Name = this.state.firstName + " " + this.state.lastName;
        let content = <Typography> USER NOT RECOGNIZED </Typography>
        if (this.state.isValidToken) {
            content = (
                <div>
                    <Grid
                        container
                        justify="center"

                    >
                        <Paper>
                            <Typography variant="title" style={{ marginTop: '4%' }} >{Name}</Typography>
                            <Grid item className={classes.FormContainer} >
                                <TextValidator
                                    fullWidth
                                    id="password"
                                    type="password"
                                    label="Enter New Password"
                                    name="password"
                                    onChange={this.handleChangePassword}
                                    style={{ marginBottom: '4%' }}
                                    value={this.state.password}
                                    validators={['required', 'isEmpty']}
                                    errorMessages={['this field is required', 'field cannot be empty']}
                                />
                                <TextValidator
                                    fullWidth
                                    type="password"
                                    id="confirmpassword"
                                    name="repeatPassword"
                                    label="Confirm Password"
                                    onChange={this.handleChangeRepeatPassword}
                                    value={this.state.repeatPassword}
                                    validators={['isPasswordMatch', 'required', 'isEmpty']}
                                    errorMessages={['password mismatch', 'this field is required', 'field cannot be empty']}
                                />
                                <Button variant="contained" color="primary" style={{ marginTop: '4%' }} onClick={this.handleUpdatePassword} >Change Password</Button>
                            </Grid>
                        </Paper>
                    </Grid>
                </div>
            )
        }
        return (
            <div className={classes.Container} >
                <Typography variant="display1">PASSWORD RECOVERY</Typography>
                <ValidatorForm>
                    {content}
                </ValidatorForm>
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        handleOpenSnackBar: (message) => dispatch({
            type: actionTypes.SNACKBAR_OPEN,
            snackBarMessage: message
        })
    }
}
export default connect(null, mapDispatchToProps)(withStyles(Style)(ForgotPassword));