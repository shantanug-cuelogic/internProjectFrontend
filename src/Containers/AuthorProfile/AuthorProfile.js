import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Paper,
    Grid,
    Typography,
    Avatar,
    Divider,

} from '@material-ui/core';
import { connect } from 'react-redux';
import FeedbackModal from '../../Components/FeedbackModal/FeedbackModal';
import MessageModal from '../../Components/MessageModal/MessageModal';
import AuthorProfileServices from '../../Services/AuthorProfileService';
import AuthorPosts from '../../Components/AuthorProfile/AuthorPosts';
import styles from './AuthorProfileStyle';

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
        const authorInformaton = await AuthorProfileServices.getAuthorInformation(this.props.match.params.id);
        const { firstName, lastName, email, profileImage, followers } = authorInformaton;
        this.setState({
            firstName: firstName,
            lastName: lastName,
            email: email,
            profileImage: profileImage,
            followers: followers
        });
        const allAuthorPosts = await AuthorProfileServices.getAuthorPosts(this.props.match.params.id)
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
                    <FeedbackModal name={this.state.firstName} authorId={this.props.match.params.id} />
                    <MessageModal name={this.state.firstName} authorId={this.props.match.params.id} />
                </div>
            }
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
                <AuthorPosts authorPosts={this.state.authorPosts} />
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
export default connect(mapStateToProps)(withStyles(styles)(Profile));