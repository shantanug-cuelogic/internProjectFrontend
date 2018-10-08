import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import axios from 'axios';
import DraftGrid from '../Grids/Category Grid/CategoryGrid';

const styles = {
    PostContainer: {
        marginTop: '10%'
    },
}

class Drafts extends React.Component {

    constructor(props) {
        super(props);

        axios.get('/post/draft/' + this.props.userId)
            .then((response) => {
                console.log(response.data.result[0]);
                this.setState({
                    draftPosts: [...response.data.result]
                })
            })
            .catch((error) => {
                console.log(error);
            })

    }
    state = {
        draftPosts: []
    }
    render() {
        const { classes } = this.props;
        console.log(this.state.draftPosts);

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