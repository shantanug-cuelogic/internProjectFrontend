import React from 'react';
import { Paper, TextField, Input, Grid, Avatar, Divider, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import * as actionTypes from '../../Store/Actions/actionTypes';
const styles = theme => ({
    root: {
        width: '90%',
        marginTop: '10%'
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
    Input: {

    }
});


class Upload extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            file: null
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        let file = URL.createObjectURL(event.target.files[0]);
        this.setState({
            file: file
        })
        this.props.imageStoreToReducer(event.target.files[0]);
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Grid
                    container
                    justify="center"
                >
                    <Grid item style={{ marginBottom: 20 }}>
                        <Paper className={classes.paper}>
                            <Avatar src={this.state.file} className={classes.ProfileAvatar} />
                        </Paper>
                    </Grid>
                </Grid>
                <Divider />

                <Input
                    fullWidth
                    id="profilepic"
                    type="file"
                    value=""
                    label=" Profile Picture"
                    helperText="Upload Yoour Profile Picture"
                    name="profilePicture"
                    onChange={this.handleChange}
                    className={classes.Input}
                >
                </Input>


            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        imageFile: state.signUpReducer.profileImageData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        imageStoreToReducer: (file) => dispatch({
            type: actionTypes.IMAGE_FILE,
            imageData: file
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Upload));