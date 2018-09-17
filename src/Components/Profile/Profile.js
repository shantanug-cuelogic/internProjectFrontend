import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography, Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import {connect } from 'react-redux';

import axios from 'axios';

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

    state = {
        userdata : {}
    }

    componentDidMount() {
        axios.get('/userprofile/'+this.props.userId)
        .then((response)=>{
            console.log(response.data[0])
            this.setState({userdata : response.data[0]})
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    
    render() {
        const {classes} = this.props;
        return(
            <div className={classes.ProfileContainer }>
                <Grid 
                container
                justify="center"
                >
                    <Grid item style = {{marginBottom:20}}>
                        <Paper className={classes.paper}>
                            <Avatar src="burger-logo.png" className={classes.ProfileAvatar} />
                        </Paper>
                    </Grid>
                </Grid>
                <Divider className={classes.Divider} />
                <Typography variant="display2" > {this.state.userdata.firstName +" "+this.state.userdata.lastName}</Typography>
                <Divider className={classes.Divider} />
                <Typography variant="display1" >No of Post: 99 </Typography>
                <Divider className={classes.Divider} />
                <Typography variant="title" > {this.state.userdata.email}</Typography>
                <Divider className={classes.Divider} />
                { this.props.auth ? <Button color="primary" variant="contained"> Edit</Button> :null}
                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    auth: state.auth,
    userId: state.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Profile));