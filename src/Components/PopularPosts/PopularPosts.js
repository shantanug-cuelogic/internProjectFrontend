import React from 'react';
import PopularPost from './PopularPost/PopularPost';
import Slider from "react-slick";
import PostService from '../../Services/PostService';

const settings = {
    className: "center",
    centerMode: false,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 1,
    speed: 2000,
    dots: true,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
    adaptiveHeight: false,
    height: 370
};

class PopularPosts extends React.Component {
    state = {
        popularPosts: []
    }
    componentDidMount = async () => {
        const popularPostResponse = await PostService.fetchPopularPost();
        this.setState({
            popularPosts: [...popularPostResponse.result]
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
            <div style={{ height: 370 }}>
                <Slider {...settings} >
                    {popularPosts}
                </Slider>
            </div>


        );
    }
}

export default PopularPosts;