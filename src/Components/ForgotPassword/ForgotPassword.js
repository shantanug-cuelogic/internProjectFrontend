import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Paper,
    TextField,
    Grid,
    Typography,
    Button,
    CircularProgress
} from '@material-ui/core';
import { connect } from 'react-redux';
import * as actionTypes from '../../Store/Actions/actionTypes';
import validator from 'validator';
import Style from './ForgotPasswordStyle';
import UserService from '../../Services/UserService';

class ForgotPassword extends React.Component {
    state = {
        succesful: null
    }
    validation = () => {
        let username = document.getElementById('username').value;
        if (validator.isEmpty(username)) {
            this.props.handleOpenSnackBar("Username Cannot be Empty");
            return false;
        }
        else {
            if (!validator.isEmail(username)) {
                this.props.handleOpenSnackBar("Enter Valid Email");
                return false;
            }
            else {
                return true;
            }
        }
    }
    handleSubmit = async () => {
        let validation = this.validation();
        if (validation) {
            this.setState({
                succesful: false
            });
            let forgotPasswordResponse = await UserService.forgotPassword(document.getElementById('username').value);
            if (forgotPasswordResponse.success) {
                this.props.handleOpenSnackBar('Recovery Link Sent To Registered Email')
                this.setState({
                    succesful: true
                });
            }
            else {
                this.props.handleOpenSnackBar(forgotPasswordResponse.data.message)

            }
        }
    }
    render() {
        const { classes } = this.props;
        let waitTime = null;
        if (this.state.succesful === null) {
            waitTime = null;
        }
        else if (this.state.succesful === false) {
            waitTime = <CircularProgress
                className={classes.progress}
                variant="indeterminate"
            />
        }
        else if (this.state.succesful === true) {
            waitTime = <Typography variant="subheading" style={{ color: 'green' }} > Check Your Registered Email!! </Typography>
        }
        return (
            <div className={classes.Container} >
                <Typography variant="display1">FORGOT PASSWORD</Typography>
                <Grid
                    container
                    justify="center"
                >
                    <Paper>
                        <Grid item className={classes.FormContainer} >
                            <TextField
                                fullWidth
                                id="username"
                                label="Enter Registerd Email"
                            />
                            <Button variant="contained" color="primary" style={{ marginTop: '4%' }} onClick={this.handleSubmit} >Submit</Button>
                        </Grid>
                        {waitTime}
                    </Paper>
                </Grid>
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