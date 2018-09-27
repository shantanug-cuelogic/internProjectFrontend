import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography, Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import {connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const styles =  themes => ({
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

ProfileInformation:{
    height:30,
    borderRadius:30,
    
},
Divider : {
    margin:10
}

});

class Profile extends React.Component{

   
    
    render() {
        const {classes} = this.props;
       let url = '/updateprofile' ;
        return(
            <div className={classes.ProfileContainer }>
                <Grid 
                container
                justify="center"
                >
                    <Grid item style = {{marginBottom:20}}>
                        <Paper className={classes.paper}>
                            <Avatar src={this.props.profileImage} className={classes.ProfileAvatar} />
                            <Typography variant="caption" > Update Your Profile To add Image </Typography>
                        </Paper>
                    </Grid>
                </Grid>
                <Divider className={classes.Divider} />
                <Typography variant="display2" > {this.props.firstName +" "+this.props.lastName}</Typography>
                <Divider className={classes.Divider} />
                <Typography variant="title" > {this.props.email}</Typography>
                <Divider className={classes.Divider} />
                <Typography variant="subheading" >{this.props.gender} </Typography>
                <Typography variant="caption" > Gender</Typography>
                
                <Divider className={classes.Divider} />
                <Button color="primary" variant="contained" component={NavLink} to={url} > Update Profile</Button>
                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    auth: state.authReducer.auth,
    userId: state.authReducer.userId,
    firstName:state.authReducer.firstName,
    lastName:state.authReducer.lastName,
    email:state.authReducer.email,
    profileImage:state.authReducer.profileImage,
    isAdmin: state.authReducer.isAdmin,
    gender:state.authReducer.gender
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Profile));