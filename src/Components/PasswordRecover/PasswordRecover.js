import React from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { Paper, TextField, Grid, Typography, Button, Snackbar } from '@material-ui/core';
import validator from 'validator';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import * as actionTypes from '../../Store/Actions/actionTypes';
import { connect } from 'react-redux';

const Style = {
    Container: {
        marginTop: '10%',

    },
    FormContainer: {

        width: '500px',
        padding: '10%'

    },


}



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

    componentDidMount() {

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

        axios.post('/checkforgettoken', {
            forgetToken: this.state.authToken
        })
            .then((response) => {
                if (response.data.success) {
                    this.setState({
                        isValidToken: true,
                        firstName: response.data.result[0].firstName,
                        lastName: response.data.result[0].lastName,
                        userId: response.data.result[0].userId
                    });
                    this.props.handleOpenSnackBar("User authenticated");
                    
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    validation = () => {
        let password = document.getElementById('password').value;
        let confirmpassword = document.getElementById('confirmpassword').value;
        if (validator.isEmpty(password)) {
            this.props.handleOpenSnackBar("Password Cannot Be Empty");
            return false;
        }

        else {
            if (validator.isEmpty(confirmpassword)) {
                this.props.handleOpenSnackBar("Password Cannot Be Empty");
                return false;
            }
            else {
                if (password !== confirmpassword) {
                    this.props.handleOpenSnackBar("Password does not match");
                    return false
                }
                else {
                    return true
                }
            }
        }
    }

    handleUpdatePassword = () => {
        let validation = this.validation()

        if (validation) {
            axios.put('/changepassword', {
                userId: this.state.userId,
                password: this.state.password
            })
                .then((response) => {
                    if (response.data.success) {
                        this.props.handleOpenSnackBar("Password Changed Succesfully");
                        this.props.history.push('/signin');
                    }
                    else {
                        this.props.handleOpenSnackBar(response.data.message);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }

    }


    handleChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })

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
        handleOpenSnackBar : (message) => dispatch({
            type: actionTypes.SNACKBAR_OPEN,
            snackBarMessage : message
        })
    }
}


export default connect(null,mapDispatchToProps)(withStyles(Style)(ForgotPassword));