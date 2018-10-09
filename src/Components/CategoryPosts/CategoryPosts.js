import React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import CategoryPost from '../Grids/PostGrid/PostGrid';

class CategoryPosts extends React.Component {
    render() {

        let posts = null;
        if (this.props.categoryPosts.length === 0) {
            posts = <p>NO POST AVAILABLE FOR CURRENT CATEGORY</p>
        }
        else {
            posts = this.props.categoryPosts.map((post, index) => {
                let link = `/post/${post.postId}`
                return (
                    <Grid item>
                        <CategoryPost
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
            <Grid container
                direction="row"
                spacing={24}
                justify="center" >
                {posts}
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        categoryPosts: state.categoryPostReducer.categoryPosts
    }
}

export default connect(mapStateToProps)(CategoryPosts);