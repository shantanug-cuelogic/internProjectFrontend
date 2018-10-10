import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import DraftGrid from '../Grids/PostGrid/PostGrid';
import PostService from '../../Services/PostService';

const styles = {
    PostContainer: {
        marginTop: '10%'
    },
}

class Drafts extends React.Component {

    state = {
        draftPosts: []
    }

    componentDidMount = async() => {
        const draftPostsResponse = await PostService.fetchDraftPosts(this.props.userId);
        this.setState({
            draftPosts: [...draftPostsResponse.result]
        })
    }   

    render() {
        const { classes } = this.props;

        let posts = null;
        if (this.state.draftPosts.length === 0) {
            posts = <p>NO POST SAVED AS DRAFTS</p>
        }
        else {
            posts = this.state.draftPosts.map((post, index) => {
                let link = `/drafteditor/${post.postId}`
                return (
                    <Grid item>
                        <DraftGrid
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
                );
            });
        }
        return (
            <div className={classes.Container}>
                <div className={classes.PostContainer}>
                    <Typography variant="display2" > DRAFTS </Typography>
                    <Grid container
                        direction="row"
                        spacing={24}
                        justify="center" >
                        {posts}
                    </Grid>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userId: state.authReducer.userId
    }
}

export default connect(mapStateToProps)(withStyles(styles)(Drafts));