import React from 'react';
import PopularPost from './PopularPost/PopularPost';
import axios from 'axios';

class PopularPosts extends React.Component {
    state = {
        popularPosts: []
    }
    componentDidMount() {
        axios.get('/post/popular')
            .then((response) => {
                this.setState({
                    popularPosts: [...response.data.result]
                });
            })
            .catch((error) => {
                console.log(error)
            });
    }

    render() {
        let popularPosts = null;
        if (this.state.popularPosts.length !== 0) {
            popularPosts = this.state.popularPosts.map((post, index) => {
                let url = "/post/" + post.postId;

                return (
                    <PopularPost
                        key={index}   
                        url={url}
                        postTitle={post.title}
                        postContent={post.postContent}
                        views={post.views}
                        thumbnail={post.thumbnail}
                    />

                );
            })
        }
        return (
            <div>
                {popularPosts}
            </div>

        );
    }
}

export default PopularPosts;