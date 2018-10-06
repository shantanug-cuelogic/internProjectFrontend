import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {
    Paper,
    Drawer,
    Divider,
    Typography,
    Button,

} from '@material-ui/core';

import Profile from '../../Components/Profile/Profile';
import axios from 'axios';
import { connect } from 'react-redux';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { Scrollbars } from 'react-custom-scrollbars';
import AdminDashboard from './AdminDashboard/AdminDashBoard';
import * as actionTypes from '../../Store/Actions/actionTypes';

import UserDashboard from './UserDashboard/UserDashboard';

const drawerWidth = 340;
const styles = theme => ({
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
    }

});

class DashBoard extends React.Component {

    constructor(props) {
        super(props)
        axios.get('/recentactivity/' + this.props.userId)
            .then((response) => {
                if (response.data.success) {
                    this.props.handleRecentUserActivity(response.data.result)
                    
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
        adminFeatures: false,
        feedbacks: [],
        messages:[],
        expanded: null,
    };

    componentDidMount() {
        let likeUrl = '/totallikes/' + this.props.userId;
        let viewUrl = '/totalviews/' + this.props.userId;
        let postUrl = '/totalposts/' + this.props.userId;
        let commentUrl = '/totalcomments/' + this.props.userId;
        axios.get(likeUrl)
            .then((response) => {

                if (response.data.success) {
                    this.props.handleLikes(response.data.likeCount);
                    // this.setState({
                    //     likes: response.data.likeCount
                    // })
                }

            })
            .catch((error) => {
                console.log(error);
            });
        axios.get(viewUrl)
            .then((response) => {

                if (response.data.success) {
                    this.props.handleViews(response.data.viewCount)
                    // this.setState({
                    //     views: response.data.viewCount
                    // })
                }

            })
            .catch((error) => {
                console.log(error);
            });
        axios.get(postUrl)
            .then((response) => {
                if (response.data.success) {
                 this.props.handlePosts(response.data.postCount);
                    // this.setState({
                    //     posts: response.data.postCount
                    // })

                }

            })
            .catch((error) => {
                console.log(error);
            });

        axios.get(commentUrl)
            .then((response) => {


                if (response.data.success) {
                  this.props.handleComments(response.data.commentCount)
                    // this.setState({
                    //     comments: response.data.commentCount
                    // });
                }

            })
            .catch((error) => {
                console.log(error);
            });
        axios.get('followersinfo/' + this.props.userId)
            .then((response) => {
                if (response.data.success) {
                    this.props.handleFollowers(response.data.result)
                    // this.setState({
                    //     followers: response.data.result
                    // })
                }
            })
            .catch((error) => {
                console.log(error)
            });
        axios.get('/feedback/' + this.props.userId)
            .then((response) => {
                if (response.data.success) {
                    this.props.handleFeedbacks(response.data.result);
                    // this.setState({
                    //     feedbacks: [...response.data.result]
                    // })
                }
            })
            .catch((error) => {
                console.log(error)
            });
        axios.get('/message/'+this.props.userId)
            .then((response)=>{
              console.log(response.data);
                if(response.data.success) {
                    this.props.handleMessages(response.data.result);
                    // this.setState({
                    //     messages:[...response.data.result]
                    // })
                }
            })
            .catch((error)=>{
                console.log(error)
            })
            
    }

    handleChange = key => (event, value) => {
        this.setState({
            [key]: value,
        });
    };

    handleChangePanel = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
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

        let adminButton = null;
        if (this.props.isAdmin) {
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
                        <UserDashboard />
                    </div >
                }
            </div>



        )
    }
}

const mapStateToProps = state => {
    return {
        userId:  state.authReducer.userId,
        isAdmin: state.authReducer.isAdmin,
     
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleRecentUserActivity : (recentActivity) => dispatch ({
            type :actionTypes.USER_RECENT_ACTIVITY,
            recentActivity : recentActivity
        }),
        handleLikes : (likes) =>dispatch( {
            type : actionTypes.LIKES ,
            likes : likes
        }),
        handleViews : (posts) =>dispatch( {
            type : actionTypes.POSTS ,
            posts : posts
        }),
        handlePosts : (views) =>dispatch( {
            type : actionTypes.VIEWS ,
            views : views
        }),
        handleComments : (comments) =>dispatch( {
            type : actionTypes.COMMENTS ,
            comments : comments
        }),
        handleFollowers  : (followers) => dispatch({
            type: actionTypes.FOLLOWER_INFO,
            followers : followers
        }),
        handleFeedbacks : (feedbacks) =>  dispatch ({
            type : actionTypes.FEEDBACKS,
            feedbacks : feedbacks
        }),
        handleMessages : (messages) => dispatch({
            type: actionTypes.MESSAGES,
            messages : messages
        })
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(DashBoard));