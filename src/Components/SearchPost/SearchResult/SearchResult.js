import React from 'react';
import {
    Grid,
} from '@material-ui/core';
import PostGrid from '../../Grids/PostGrid/PostGrid';

class SearchResult extends React.Component {
    render() {
        let posts = null;
        if (this.props.searchResult.length === 0) {
            posts = <p>NO POST AVAILABLE FOR CURRENT SEARCH</p>
        }
        else {
            posts = this.props.searchResult.map((post, index) => {
                let link = `/post/${post.postId}`
                return (
                    <Grid item>
                        <PostGrid
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
     
        return(
            <Grid container
                        direction="row"
                        spacing={24}
                        justify="center" >
                        {posts}

                    </Grid>
        );
    }
}
export default SearchResult;