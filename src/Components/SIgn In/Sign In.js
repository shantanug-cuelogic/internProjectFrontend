import React from 'react';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

const styles = theme => ({
    FormContainer: {
        margin: '10%'
    },
    InputContainer: {
        width: '100%'
    }


});

const signIn = (props) => {
    const { classes } = props;
    return (
        <div className={classes.FormContainer} style={{padding:'20px'}}>
        <Paper>
            <Typography variant="title"> Sign in form </Typography>
            <Grid container
                    direction="column"
                    spacing={24}
                    
                    
                >
                    <Grid item xs={8}>
                    
                        <FormControl fullWidth>
                            <InputLabel  >First Name</InputLabel>
                            <Input type='text'/>
                            <FormHelperText>Enter your First Name</FormHelperText>
                        </FormControl>

                    </Grid>
                    <Grid item xs={8}>
                        <FormControl fullWidth>
                            <InputLabel>Last Name</InputLabel>
                            <Input />
                            <FormHelperText>Enter your Last Name</FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={8}>
                        <FormControl fullWidth>
                            <InputLabel>Email</InputLabel>
                            <Input type='email'/>
                            <FormHelperText>Enter your Email</FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={8}>
                        <FormControl fullWidth>
                            <InputLabel>Password</InputLabel>
                            <Input type='password'/>
                            <FormHelperText>Enter your Password</FormHelperText>
                        </FormControl>
                    </Grid>

                </Grid>
                </Paper>

            {/* <Grid container spacing={} >
                <Grid item xs={12}>
                    <Paper>
                        <FormControl>
                            <InputLabel  >First Name</InputLabel>
                            <Input type='text' />
                            <FormHelperText>Enter your First Name</FormHelperText>
                        </FormControl>
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <Paper>
                        <FormControl>
                            <InputLabel>Last Name</InputLabel>
                            <Input />
                            <FormHelperText>Enter your Last Name</FormHelperText>
                        </FormControl>
                    </Paper>

                </Grid>

            </Grid> */}

        </div>
    )
}

export default withStyles(styles)(signIn);