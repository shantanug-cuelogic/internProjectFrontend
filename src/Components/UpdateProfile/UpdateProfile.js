import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography, Button, TextField, MenuItem } from '@material-ui/core';
import axios from 'axios';
import { Divider } from '@material-ui/core';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProfilePic from '../ImageUploadPreviev/ImageUploadPreview';
import EditIcon from '@material-ui/icons/Create';
import * as actionTypes from '../../Store/Actions/actionTypes';

const styles = themes => ({


    ProfileContainer: {
        margin: '7%',
        textAlign: 'center'
    },
    ProfileImageContainer: {
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingBottom: '2%'
    },
    Email: {
        paddingBottom: '2%'
    },
    UpdateButton: {

        marginBottom: '3%'
    },
    InputContainer: {
        marginBottom: '2%'
    }



});

const gender = [
    {
        value: 'male',
        label: 'Male',
    },
    {
        value: 'female',
        label: 'Female',
    },
    {
        value: 'other',
        label: 'Others',
    },

];

class Profile extends React.Component {

    state = {
        changeFirstName: false,
        firstName: this.props.firstName,
        changeLastName: false,
        lastName: this.props.lastName,
        changeGender: false,
        gender: this.props.gender
    }

    handleFirstNameChange = () => {
        this.setState({
            changeFirstName: true
        });
    }
    handleLastNameChange = () => {
        this.setState({
            changeLastName: true
        })
    }
    handleGenderChange = () => {
        this.setState({
            changeGender: true
        })
    }

    handleOnChangeFirstname = (event) => {
        this.setState({
            firstName: event.target.value
        })
    }
    handleOnChangeLastname = (event) => {
        this.setState({
            lastName: event.target.value
        })

    }
    handleOnChangeGender = (event) => {
        this.setState({
            gender: event.target.value
        })

    }
    handleUpdateProfile = () => {


        const formData = new FormData();
        formData.append('file', document.getElementById('profilepic').files[0]);
        formData.append('firstName', this.state.firstName);
        formData.append('lastName', this.state.lastName);
        formData.append('gender', this.state.gender);
        formData.append('userIdtoUpdate', this.props.userId);
        formData.append('profileImage', this.props.profileImage);

        axios.put('/updateuserprofile', formData, {
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data;`,
            }
        })
            .then((response) => {
                if (response.data.success) {

                    this.props.updateUserToReducer(this.state.firstName, this.state.lastName, this.state.gender, response.data.profileImagePath);
                    this.props.handleOpenSnackBar("Userprofile Updated Succesfully");
                    this.props.history.push('/profile');
                }
                else {
                    this.props.handleOpenSnackBar("Something Went Wrong Please Try Again Later");
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }




    render() {
        const { classes } = this.props;

        return (

            <div className={classes.ProfileContainer}>
                <Paper>
                    <Grid
                        container
                        justify="center"
                    >
                        <div className={classes.ProfileImageContainer}>
                            <Grid item >

                                <ProfilePic src={this.props.profileImage} />
                                <Typography variant="caption" style={{ marginTop: '5%' }} > Click Choose File to Upload New Image </Typography>

                            </Grid>
                        </div>
                    </Grid>

                    <Grid
                        container
                        justify="center"
                    >
                        <Typography variant="title" className={classes.Email} > {this.props.email}</Typography>
                        <Divider />
                        <Grid container
                            direction="row"
                            justify="center"
                            className={classes.InputContainer}
                        >
                            <Grid item sm={6}>
                                {this.state.changeFirstName ?
                                    <TextField
                                        id="firstnameInput"
                                        label="First Name"
                                        className={classes.textField}
                                        value={this.state.firstName}
                                        onChange={this.handleOnChangeFirstname}
                                        margin="normal"
                                    />
                                    :

                                    <div>
                                        <Typography variant="display2" id="firstName" > {this.props.firstName}</Typography>
                                        <Typography variant="caption" > First Name</Typography>
                                    </div>
                                }

                            </Grid>
                            <Grid item>
                                <Button onClick={this.handleFirstNameChange}>
                                    <EditIcon />
                                </Button>

                            </Grid>
                        </Grid>


                        <Grid container
                            direction="row"
                            justify="center"
                            className={classes.InputContainer}
                        >
                            <Grid item sm={6}>

                                {
                                    this.state.changeLastName ?
                                        <TextField
                                            id="lastNameInput"
                                            label="Last Name"
                                            className={classes.textField}
                                            value={this.state.lastName}
                                            onChange={this.handleOnChangeLastname}
                                            margin="normal"
                                        />
                                        :
                                        <div>
                                            <Typography variant="display2" > {this.props.lastName}</Typography>
                                            <Typography variant="caption" > Last Name</Typography>
                                        </div>

                                }


                            </Grid>
                            <Grid item>
                                <Button onClick={this.handleLastNameChange} >
                                    <EditIcon />
                                </Button>
                            </Grid>
                        </Grid>

                        <Grid container
                            direction="row"
                            justify="center"
                            className={classes.InputContainer}
                        >
                            <Grid item sm={6}>
                                {
                                    this.state.changeGender ?
                                        <TextField
                                            id="genderInput"
                                            select
                                            label="Select"

                                            value={this.state.gender}
                                            onChange={this.handleOnChangeGender}
                                            SelectProps={{
                                                MenuProps: {
                                                    className: classes.menu,
                                                },
                                            }}
                                            helperText="Select Your Gender"
                                            margin="normal"
                                        >
                                            {gender.map(option => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        :
                                        <div>
                                            <Typography variant="subheading" >{this.props.gender} </Typography>
                                            <Typography variant="caption" > Gender</Typography>

                                        </div>
                                }
                            </Grid>
                            <Grid item>
                                <Button onClick={this.handleGenderChange}>
                                    <EditIcon />
                                </Button>
                            </Grid>
                        </Grid>

                        <Button variant="contained" color="primary" onClick={this.handleUpdateProfile} className={classes.UpdateButton} >
                            Update
                    </Button>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.authReducer.auth,
        userId: state.authReducer.userId,
        firstName: state.authReducer.firstName,
        lastName: state.authReducer.lastName,
        email: state.authReducer.email,
        profileImage: state.authReducer.profileImage,
        isAdmin: state.authReducer.isAdmin,
        gender: state.authReducer.gender
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateUserToReducer: (firstName, lastName, gender, profileImage) => dispatch({
            type: actionTypes.UPDATE_USER,
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            profileImage: profileImage
        }),
        handleOpenSnackBar: (message) => dispatch({
            type: actionTypes.SNACKBAR_OPEN,
            snackBarMessage: message
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile));