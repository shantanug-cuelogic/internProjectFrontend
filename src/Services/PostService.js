import axios from 'axios';

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

    searchPost = (searchUrl) => {
        return new Promise ((resolve,reject)=>{
            axios.get(searchUrl)
                .then((response) => {
                   resolve(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        });
    }

    getAllPosts = () => {
        return new Promise ((resolve,reject)=>{
            axios.get('/post/')
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error)
            });
        });
    }

    getPostsByFilter = (filterName,filterValue) => {
        return new Promise ((resolve,reject)=>{
            axios.get(`/post/${filterName}/${filterValue}`)
                .then((response) => {
                   resolve(response.data);
                })
                .catch((error) => {
                    console.log(error)
                });
        });
    }

    deletePost = (postId) => {
        return new Promise ((resolve,reject)=>{
            axios.post('/post/delete', {
                authToken: localStorage.getItem('authToken'),
                postIdtoDelete: postId
            })
                .then((response) => {
                   resolve(response.data);
                })
                .catch((error) => {
                    console.log(error)
                });
        });
    }
    addLike = (postId) => {
        return new Promise ((resolve,reject)=>{
            axios.post('/post/like/add', {
                postIdToLike: postId,
                authToken: localStorage.getItem('authToken')
            })
            .then((response)=>{
                resolve(response.data);
            })
            .catch((error)=>{
                console.log(error);
            });
        });
    }
    removeLike = (postId) => {
        return new Promise ((resolve,reject)=>{
            axios.put('/post/like/remove', {
                postIdToUnlike: postId,
                authToken: localStorage.getItem('authToken')
            })
            .then((response)=>{
                resolve(response.data);
            })
            .catch((error)=>{
                console.log(error);
            });
        });
    }
    updatePost = (postId,postTitle,postContent,postCategory) => {
        return new Promise((resolve,reject)=>{
            axios.put('/post/update', {
                postIdtoUpdate: postId,
                title: postTitle,
                postContent:postContent,
                category: postCategory,
                authToken: localStorage.getItem('authToken')
            })
            .then((response)=>{
                resolve(response.data);
            })
            .catch((error)=>{
                console.log(error);
            })
        });
    }
}
export default new PostService();