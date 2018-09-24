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
        marginTop: '10%'
    },
    paper: {
        height: 240,
        width: 200,
        backgroundColor :fade(theme.palette.primary.light, 0.25)
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
    drawerPaper: {
        zIndex: 1,
        width: drawerWidth,
    },
    ProfileContainer: {
        marginTop: '10%'
    }
});

class DashBoard extends React.Component {
    state = {
        spacing: '16',
        views:0,
        likes:0,
        posts:0
    };

    componentDidMount() {
        let likeUrl ='/totallikes/'+this.props.userId;
        let viewUrl ='/totalviews/'+this.props.userId;
        let postUrl ='/totalposts/'+this.props.userId;
        console.log(this.props.userId);
        axios.get(likeUrl)
        .then((response)=>{
            if(response.data.success) {
                console.log("TotalLike============>",response.data.likeCount)
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
            if(response.data.success) {
                console.log("TotalViews============>",response.data.viewCount)
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
                console.log("TotalPosts============>",response.data.postCount)
             this.setState({
                posts:response.data.postCount
             })
                
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
        const { spacing } = this.state;

        return (
            <div>
                <div style={{ display: 'block' }}>
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
                <Grid container className={classes.root} spacing={16}>
                    <Grid item xs={12}>
                        <Grid container className={classes.demo}
                            justify="flex-end"
                            spacing={16}
                        >

                            <Grid item >
                                <Paper className={classes.paper} >
                                    <Typography>
                                        Total No Of Likes : {this.state.likes}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item >
                                <Paper className={classes.paper} >
                                <Typography>
                                        Total No Of Views : {this.state.views}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item >
                                <Paper className={classes.paper} >
                                <Typography>
                                        Total No Of Posts : {this.state.posts}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item >
                                <Paper className={classes.paper} >

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