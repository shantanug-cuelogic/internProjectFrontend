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
        firstName : '',
        lastName : '',
        email:'',
        profileImage:'',
        noofposts:'',
        nooflikes:'',
        noofviews:''
    }
    
    componentDidMount(){
      
        axios.get('/userprofile/'+this.props.match.params.userId)
        .then((response) => {
            
            this.setState({
                firstName:response.data[0].firstName,
                lastName: response.data[0].lastName,
                email:response.data[0].email,
                profileImage:response.data[0].profileImage

            });
            axios.get('/totalviews/'+this.props.match.params.userId)
            .then((response) =>{
                if(response.data.success) {
                    this.setState({
                        noofviews: response.data.viewCount
                    })
                }
            })
            .catch((error)=>{
                console.log(error)
            })
            axios.get('/totallikes/'+this.props.match.params.userId)
            .then((response) =>{
                if(response.data.success) {
                    this.setState({
                        nooflikes: response.data.likeCount
                    })
                }
            })
            .catch((error)=>{
                console.log(error)  
            })
            axios.get('/totalposts/'+this.props.match.params.userId)
            .then((response) =>{
                if(response.data.success) {
                    this.setState({
                        noofposts: response.data.postCount
                    })
                }
            })
            .catch((error)=>{
                console.log(error)
            })
            
                    
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
                            <Avatar src={this.state.profileImage} className={classes.ProfileAvatar} />
                        </Paper>
                    </Grid>
                </Grid>
                <Divider className={classes.Divider} />
                <Typography variant="display2" > {this.state.firstName +" "+this.state.lastName}</Typography>
                <Divider className={classes.Divider} />
                <Typography variant="display1" >No of Post: {this.state.noofposts} </Typography>
                <Divider className={classes.Divider} />
                <Typography variant="display1" >No of Views: {this.state.noofviews} </Typography>
                <Divider className={classes.Divider} />
                <Typography variant="display1" >No of Likes: {this.state.nooflikes} </Typography>
                <Divider className={classes.Divider} />
                <Typography variant="title" > {this.state.email}</Typography>
                <Divider className={classes.Divider} />
                {/* { this.props.auth ? <Button color="primary" variant="contained"> Edit</Button> :null} */}
                
            </div>
        );
    }
}

// const mapStateToProps = state => {
//     return {
//     auth: state.authReducer.auth,
//     userId: state.authReducer.userId.email,
//     firstName:state.authReducer.firstName,
//     lastName:state.authReducer.lastName,
//     email:state.authReducer.email,
//     profileImage:state.authReducer.profileImage,
//     isAdmin: state.authReducer.isAdmin
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {

//     }
// }

export default withStyles(styles)(Profile);