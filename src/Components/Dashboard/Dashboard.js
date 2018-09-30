import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Paper,  Drawer, Divider, Typography  } from '@material-ui/core';
import Profile from '../Profile/Profile';
import axios from 'axios';
import { connect } from 'react-redux';
import { fade } from '@material-ui/core/styles/colorManipulator';

const drawerWidth = 340;
const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: '2%'
    },
    paper: {
        height: 200,
        width: 200,
        backgroundColor :fade(theme.palette.primary.light, 0.25)
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
    HeaderContainer: {
        marginTop:'7%',
        marginLeft:'30%'
    },
    drawerPaper: {
        zIndex: 1,
        width: drawerWidth,
        overflow:'hidden'
    },
    ProfileContainer: {
        marginTop: '15%',
        
    },
    Icons:{
        padding:'0%'
    }
});

class DashBoard extends React.Component {
    state = {
        spacing: '16',
        views:0,
        likes:0,
        posts:0,
        comments:0
    };

    componentDidMount() {
        let likeUrl ='/totallikes/'+this.props.userId;
        let viewUrl ='/totalviews/'+this.props.userId;
        let postUrl ='/totalposts/'+this.props.userId;
        let commentUrl = '/totalcomments/'+this.props.userId;
        axios.get(likeUrl)
        .then((response)=>{
            console.log(response.data);
            if(response.data.success) {
              
                this.setState({
                    likes:response.data.likeCount
                })
            }
            
        })
        .catch((error)=>{
            console.log(error);
        });
        axios.get(viewUrl)
        .then((response)=>{
            console.log(response.data);
            if(response.data.success) {
                this.setState({
                    views:response.data.viewCount
                })
            }
            
        })
        .catch((error)=>{
            console.log(error);
        });
        axios.get(postUrl)
        .then((response)=>{
            if(response.data.success) {
             this.setState({
                posts:response.data.postCount
             })
                
            }
            
        })
        .catch((error)=>{
            console.log(error);
        });

        axios.get(commentUrl)
        .then((response)=>{
            
            console.log(response.data)
            if(response.data.success) {
                this.setState({
                    comments:response.data.commentCount
                });
            }
            
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    handleChange = key => (event, value) => {
        this.setState({
            [key]: value,
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <div>
                    <Drawer
                        variant="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <div className={classes.ProfileContainer}>
                            <Profile />
                        </div>
                        <Divider />

                    </Drawer>
                </div>
               <div className={classes.HeaderContainer}>
                    <Typography variant="display2" > DASHBOARD </Typography>
                </div>
                <Grid container className={classes.root} spacing={16}>
               
                    <Grid item xs={12}>
                        <Grid container className={classes.demo}
                            justify="flex-end"
                            spacing={16}
                        >

                            <Grid item >
                                <Paper className={classes.paper} >
                                    <img src="/require/likeicon.jpg" alt="Like Icon" height="150px" className={classes.Icons}></img>
                                    <Typography variant="body2">
                                        Total No Of Likes : {this.state.likes}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item >
                                <Paper className={classes.paper} >
                                <img src="/require/viewicon.jpg" alt="View Icon" height="150px" className={classes.Icons}></img>
                                <Typography variant="body2">
                                        Total No Of Views : {this.state.views}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item >
                                <Paper className={classes.paper} >
                                <img src="/require/posticon.jpg" alt="Post Icon" height="150px" className={classes.Icons}></img>
                                <Typography variant="body2" >
                                        Total No Of Posts : {this.state.posts}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item >
                                <Paper className={classes.paper} >
                                <img src="/require/commenticon.jpg" alt="Post Icon" height="150px" className={classes.Icons}></img>
                                <Typography variant="body2" >
                                        Total No Of Comments : {this.state.comments}
                                    </Typography>
                                </Paper>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>


            </div >

        )
    }
}

const mapStateToProps = state => {
    return {
        userId : state.authReducer.userId
    }
}

export default connect(mapStateToProps)(withStyles(styles)(DashBoard));