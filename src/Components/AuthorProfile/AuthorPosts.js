import React from 'react';
import { Grid } from '@material-ui/core';
import AuthorPost from '../Grids/PostGrid/PostGrid';

class authorPosts extends React.Component {
    render() {
        let authorPost = null;
        if (this.props.authorPosts.length === 0) {
            authorPost = <p>Author DONT HAVE ANY POST YET</p>
        } else {
            authorPost = this.props.authorPosts.map((post, index) => {

                let link = `/post/${post.postId}`

                return (
                    <Grid item>
                        <AuthorPost
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
                {authorPost}
            </Grid>



        );
    }
}
export default authorPosts;