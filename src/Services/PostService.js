
import axios from 'axios';
import { connect } from 'react-redux';



class PostService {

    fetchAllPostData = (postId) => {
        return new Promise((resolve, reject) => {
            axios.get('/post/getpost/' + postId)
                .then((response) => {
                    console.log(response.data)
                    if (response.data.success) {

                        resolve(response.data.result[0])
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }

    fetchAllComments = (postId) => {
        return new Promise((resolve, reject) => {

            axios.get('/post/comment/' + postId)
                .then((response) => {

                    if (response.data.success) {
                        resolve(response.data.result);
                        // this.props.handleFetchPost(postId, userId, postTitle, postContent, allcomments.data.result, category)
                    }
                    else {
                        let array = []
                        resolve(array);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        });
    }

    fetchTotalLikesToPost = (postId) => {
        return new Promise((resolve, reject) => {
            axios.get('/post/like/totallikes/' + postId)
                .then((res) => {
                    if (res.data.success) {
                        resolve(res.data.count);
                        // this.props.totalLikesToPostReducer(res.data.count)
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }

    fetchTotalViewsToPost = (postId) => {
        return new Promise((resolve, reject) => {
            axios.get('/post/view/totalviews/' + postId)
                .then((response) => {
                    if (response.data.success) {
                        resolve(response.data.count)
                        //this.props.totalViewsToPostReducer(response.data.count);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        });
    }

    fetchAuthorInformation = (userId) => {
        return new Promise((resolve, reject) => {
            axios.get('/userprofile/' + userId)
                .then((response) => {
                    console.log(response.data);
                    resolve(response.data[0])
                })
                .catch((error) => {
                    console.log(error);
                })
        })
    }
    getPostRating = (postId) => {
        return new Promise((resolve, reject) => {
            axios.get('/post/ratings/' + postId)
                .then((response) => {
                    resolve(response.data.Ratings)

                })
                .catch((error) => {
                    console.log(error);
                })
        });
    }

    postComment = (comment, postId) => {
        return new Promise((resolve, reject) => {
            axios.put('/post/comment/', {
                authToken: localStorage.getItem('authToken'),
                postId: postId,
                commentContent: comment
            })
                .then((response) => {
                    if (response.data.success) {
                        resolve(response.data)
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        });
    }

    deleteComment = (commentId) => {
        return new Promise ((resolve, reject)=>{
            axios.put('/post/comment/delete', {
                commentIdtoDelete: commentId,
                authToken: localStorage.getItem('authToken')
    
            })
                .then((response) => {
                    if (response.data.success) {
                       resolve(response.data);   
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        });
    }

    followAllowedCheck = (userId) => {
      
      return new Promise ((resolve, reject)=>{
        axios.post('/follower/allowed', {
            authToken: localStorage.getItem('authToken'),
            userIdToFollow: userId
        })
            .then((response) => {
                    resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
      });
       
    }

}
export default new PostService();