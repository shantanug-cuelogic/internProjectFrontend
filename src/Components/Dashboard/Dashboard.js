import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Paper, Drawer, Divider, Typography, Button } from '@material-ui/core';
import Profile from '../Profile/Profile';
import axios from 'axios';
import { connect } from 'react-redux';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { element } from 'prop-types';
import moment from 'moment';
import ViewPieChart from '../ViewPieChart/ViewPieChart';
import { Scrollbars } from 'react-custom-scrollbars';
import AdminDashboard from './AdminDashboard/AdminDashBoard';

const drawerWidth = 340;
const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: '2%'
    },
    paper: {
        height: 150,
        width: 200,
        backgroundColor: fade(theme.palette.primary.light, 0.25)
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
    HeaderContainer: {
        marginTop: '7%',
        marginLeft: '30%'
    },
    drawerPaper: {
        zIndex: 1,
        width: drawerWidth,
        overflow: 'hidden'
    },
    ProfileContainer: {
        marginTop: '15%',
        overflowY: 'scroll'

    },
    Icons: {
        padding: '0%'
    },
    RecentActivityContainer: {
        height: 300,
        marginTop: 20,
        marginLeft: 333
    },
    RecentActivity: {
        height: 230,
        marginLeft: 20,
        marginRight: 20,
        padding: 10,
        overflow: 'scroll'
    },
    RecentActivities: {
        fontSize: 20,
        color: '#262626'
    },
    PieChartContainer: {
        marginLeft: 333,
        marginTop: 20
    }
});

class DashBoard extends React.Component {

    constructor(props) {
        super(props)
        axios.get('/recentactivity/' + this.props.userId)
            .then((response) => {
                if (response.data.success) {

                    this.setState({
                        recentactivity: response.data.result
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }


    state = {
        spacing: '16',
        views: 0,
        likes: 0,
        posts: 0,
        comments: 0,
        recentactivity: [],
        followers: [],
        adminFeatures: false
    };

    componentDidMount() {
        let likeUrl = '/totallikes/' + this.props.userId;
        let viewUrl = '/totalviews/' + this.props.userId;
        let postUrl = '/totalposts/' + this.props.userId;
        let commentUrl = '/totalcomments/' + this.props.userId;
        axios.get(likeUrl)
            .then((response) => {

                if (response.data.success) {

                    this.setState({
                        likes: response.data.likeCount
                    })
                }

            })
            .catch((error) => {
                console.log(error);
            });
        axios.get(viewUrl)
            .then((response) => {

                if (response.data.success) {
                    this.setState({
                        views: response.data.viewCount
                    })
                }

            })
            .catch((error) => {
                console.log(error);
            });
        axios.get(postUrl)
            .then((response) => {
                if (response.data.success) {
                    this.setState({
                        posts: response.data.postCount
                    })

                }

            })
            .catch((error) => {
                console.log(error);
            });

        axios.get(commentUrl)
            .then((response) => {


                if (response.data.success) {
                    this.setState({
                        comments: response.data.commentCount
                    });
                }

            })
            .catch((error) => {
                console.log(error);
            });
        axios.get('followersinfo/' + this.props.userId)
            .then((response) => {
                if (response.data.success) {
                    this.setState({
                        followers: response.data.result
                    })
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    handleChange = key => (event, value) => {
        this.setState({
            [key]: value,
        });
    };

    handleAdminFeatureToggle = () => {
      let currentState = this.state.adminFeatures;
        this.setState({
            adminFeatures: !currentState
        })
    }

    render() {
        const { classes } = this.props;

        let recentactivity = null;

        if (this.state.recentactivity.length === 0) {
            recentactivity = <p>NO RECENT ACTIVITY TO SHOW</p>
        }
        else {
            recentactivity = this.state.recentactivity.map((element, index) => {
                return (
                    <div key={index}>
                        <p className={classes.RecentActivities} >You  {element.activityType} <b> {element.title}</b> on <i> {moment.unix(element.activityTimeStamp).format('dddd, MMMM Do, YYYY h:mm:ss A')}</i></p>
                        <Divider />
                    </div>
                );
            });
        }

        let viewStatistics = null;

        if(this.state.posts === 0) {
            viewStatistics = <p>YOU DONT HAVE ANY POSTS</p>
        }
        else if(this.state.views === 0) {
            viewStatistics = <p>YOUR POST DONT HAVE ANY VIEWS YET</p>
        } 
        else {
            viewStatistics = <Paper>
            <ViewPieChart userId={this.props.userId} />
            <Typography variant="caption" > Views per post </Typography>
        </Paper>
        }

        let followers = null;

        if (this.state.followers.length === 0) {
            followers = <p>NO FOLLOWERS TO SHOW</p>
        }
        else {
            followers = this.state.followers.map((element, index) => {
                return (
                    <div key={index}>
                        <p className={classes.RecentActivities} > <b>{element.firstName}</b> followed you  on <i> {moment.unix(element.followTimeStamp).format('dddd, MMMM Do, YYYY h:mm:ss A')}</i></p>
                        <Divider />
                    </div>
                );
            });
        }

        let adminButton = null;
        if(this.props.isAdmin) {
        adminButton = <Button variant="contained" color="secondary" style={{ marginTop: 20 }} onClick={this.handleAdminFeatureToggle} > ADMIN</Button>
        }


        return (
            <div>
                <div>
                    <Drawer
                        variant="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <Scrollbars className={classes.ProfileContainer}>

                            {adminButton}
                            <Profile />

                        </Scrollbars>
                        <Divider />

                    </Drawer>
                </div>
                <div className={classes.HeaderContainer}>
                            <Typography variant="display2" > DASHBOARD </Typography>
                </div>
                {this.state.adminFeatures ?
                    <AdminDashboard />
                    :
                    <div>

                        
                        <Grid container className={classes.root} spacing={16}>

                            <Grid item xs={12}>
                                <Grid container className={classes.demo}
                                    justify="flex-end"
                                    spacing={16}
                                >

                                    <Grid item >
                                        <Paper className={classes.paper} >
                                            <img src="/require/likeicon.jpg" alt="Like Icon" height="100px" className={classes.Icons}></img>
                                            <Typography variant="body2">
                                                Total No Of Likes : {this.state.likes}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item >
                                        <Paper className={classes.paper} >
                                            <img src="/require/viewicon.jpg" alt="View Icon" height="100px" className={classes.Icons}></img>
                                            <Typography variant="body2">
                                                Total No Of Views : {this.state.views}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item >
                                        <Paper className={classes.paper} >
                                            <img src="/require/posticon.jpg" alt="Post Icon" height="100px" className={classes.Icons}></img>
                                            <Typography variant="body2" >
                                                Total No Of Posts : {this.state.posts}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item >
                                        <Paper className={classes.paper} >
                                            <img src="/require/commenticon.jpg" alt="Post Icon" height="100px" className={classes.Icons}></img>
                                            <Typography variant="body2" >
                                                Total No Of Comments : {this.state.comments}
                                            </Typography>
                                        </Paper>
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Grid>


                        <div className={classes.PieChartContainer} >
                            <Paper  >
                                <Typography variant="display1" > Views Statistics </Typography>
                                {viewStatistics}

                            </Paper>
                        </div>

                        <Paper className={classes.RecentActivityContainer} >
                            <Typography variant="display1" >
                                Followers
                    </Typography>
                            <Paper className={classes.RecentActivity} >
                                <Scrollbars>
                                    {followers}
                                </Scrollbars>


                            </Paper>
                        </Paper>


                        <Paper className={classes.RecentActivityContainer} >
                            <Typography variant="display1" >
                                Recent Activity
                    </Typography>
                            <Scrollbars >
                                <Paper className={classes.RecentActivity} >

                                    {recentactivity}



                                </Paper>
                            </Scrollbars>
                        </Paper>

                    </div >


                }
            </div>



        )
    }
}

const mapStateToProps = state => {
    return {
        userId: state.authReducer.userId,
        isAdmin: state.authReducer.isAdmin
    }
}

export default connect(mapStateToProps)(withStyles(styles)(DashBoard));