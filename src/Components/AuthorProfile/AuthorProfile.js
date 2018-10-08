import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Paper,
    Grid,
    Typography,
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import FeedbackModal from '../FeedbackModal/FeedbackModal';
import CategoryGrid from '../Grids/Category Grid/CategoryGrid';
import MessageModal from '../MessageModal/MessageModal';
import AuthorProfileServices from '../../Services/AuthorProfileService';

const styles = themes => ({
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

    ProfileInformation: {
        height: 30,
        borderRadius: 30,

    },
    Divider: {
        margin: 10
    }

});

class Profile extends React.Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        profileImage: '',
        
        followers: '',
        authorPosts: []
    }

    async componentDidMount() {
        
        const authorInformaton = await AuthorProfileServices.getAuthorInformation(this.props.match.params.userId);
        const {firstName,lastName,email,profileImage,followers} = authorInformaton;
        this.setState({
            firstName: firstName,
            lastName: lastName,
            email: email,
            profileImage: profileImage,
            followers: followers
        });
       const allAuthorPosts = await AuthorProfileServices.getAuthorPosts(this.props.match.params.userId) 
       this.setState({
        authorPosts: [...allAuthorPosts],

    });
       
    }

    render() {
        const { classes } = this.props;

        let feedbackButton = null;

        if (this.props.auth) {
            if (this.props.match.params.userId == this.props.userId) {
                feedbackButton = null;
            }
            else {
                feedbackButton = <div>
                    <FeedbackModal name={this.state.firstName} authorId={this.props.match.params.userId} />
                    <MessageModal name={this.state.firstName} authorId={this.props.match.params.userId} />
                </div>
            }
        }

        let authorPost = null;
        if (this.state.authorPosts.length === 0) {
            authorPost = <p>Author DONT HAVE ANY POST YET</p>
        } else {
            authorPost = this.state.authorPosts.map((post, index) => {

                let link = `/post/${post.postId}`

                return (
                    <Grid item>
                        <CategoryGrid
                            key={index}
                            postTitle={post.title}
                            postContent={post.postContent}
                            postId={post.postId}
                            likes={post.likes}
                            views={post.views}
                            thumbnail={post.thumbnail}
                            link={link}
                        />
                    </Grid>
                )

            })
        }


        return (
            <div className={classes.ProfileContainer}>
                <Grid
                    container
                    justify="center"
                >
                    <Grid item style={{ marginBottom: 20 }}>
                        <Paper className={classes.paper}>
                            <Avatar src={this.state.profileImage} className={classes.ProfileAvatar} />
                        </Paper>
                    </Grid>
                </Grid>
                <Divider className={classes.Divider} />
                <Typography variant="display2" > {this.state.firstName + " " + this.state.lastName}</Typography>
                <Divider className={classes.Divider} />
                <Typography variant="display1" >No of Post: {this.state.authorPosts.length} </Typography>
                <Divider className={classes.Divider} />
                <Typography variant="display1" >No of Followers: {this.state.followers} </Typography>
                <Divider className={classes.Divider} />
                <Typography variant="title" > {this.state.email}</Typography>
                <Divider className={classes.Divider} />
                {feedbackButton}
                <Divider className={classes.Divider} />
                <Typography variant="display1" style={{ marginTop: 30 }} >All {this.state.firstName}'s Posts</Typography>
                <Divider style={{ marginBottom: 30 }} />
                <Grid container
                    direction="row"
                    spacing={24}
                    justify="center" >
                    {authorPost}

                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.authReducer.auth,
        userId: state.authReducer.userId.email,

    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile));