import axios from 'axios';

class PostService {
    fetchAllPostData = (postId) => {
        return new Promise((resolve, reject) => {
            axios.get('/posts/?postId=' + postId)
                .then((response) => {
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

            axios.get(`/posts/${postId}/comments`)
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
            axios.get(`/posts/${postId}/likes`)
                .then((res) => {
                    if (res.data.success) {
                        resolve(res.data.count);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }

    fetchTotalViewsToPost = (postId) => {
        return new Promise((resolve, reject) => {
            axios.get(`/posts/${postId}/views/` )
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
            axios.get('/user/profile/' + userId)
                .then((response) => {
                    resolve(response.data[0])
                })
                .catch((error) => {
                    console.log(error);
                })
        })
    }
    getPostRating = (postId) => {
        return new Promise((resolve, reject) => {
            axios.get(`/posts/${postId}/ratings`)
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
            axios.put('/posts/comments/', {
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
        return new Promise((resolve, reject) => {
            axios.put('/posts/comments/delete', {
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

        return new Promise((resolve, reject) => {
            axios.post('/followers/allowed', {
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
        return new Promise((resolve, reject) => {
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
        return new Promise((resolve, reject) => {
            axios.get('/posts/')
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    console.log(error)
                });
        });
    }

    getPostsByFilter = (filterName, filterValue) => {
        return new Promise((resolve, reject) => {
            axios.get(`/posts/${filterName}/${filterValue}`)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    console.log(error)
                });
        });
    }

    deletePost = (postId) => {
        return new Promise((resolve, reject) => {
            axios.post('/posts/delete', {
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

    addViews = (postId) => {
        return new Promise((resolve,reject)=>{
            axios.post('/posts/views/add',{
                postIdToView:postId,
                authToken: localStorage.getItem('authToken')
            })
            .then((response)=>{
                resolve(response.data);
            })
            .catch((error)=>{
                console.log(error)
            })

        });
    }
    checkAlreadyLiked = (postId) =>{
        return new Promise((resolve,reject)=>{
            axios.post('/posts/likes/allowed',{
                postIdToLike:postId,
                authToken : localStorage.getItem('authToken')
            })
            .then((response)=>{
                resolve(response.data);
            })
            .catch((error)=>{
                console.log(error);
            })
        })
    }
    addLike = (postId) => {
        return new Promise((resolve, reject) => {
            axios.post('/posts/likes/add', {
                postIdToLike: postId,
                authToken: localStorage.getItem('authToken')
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }
    removeLike = (postId) => {
        return new Promise((resolve, reject) => {
            axios.put('/posts/likes/remove', {
                postIdToUnlike: postId,
                authToken: localStorage.getItem('authToken')
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }
    updatePost = (postId, postTitle, postContent, postCategory) => {
        return new Promise((resolve, reject) => {
            axios.put('/posts/update', {
                postIdtoUpdate: postId,
                title: postTitle,
                postContent: postContent,
                category: postCategory,
                authToken: localStorage.getItem('authToken')
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        });
    }
    fetchPostHistory = (postId) => {
        return new Promise((resolve, reject) => {
            axios.get(`/posts/${postId}/history`)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error)
                });
        });
    }

    fetchPopularPost = () => {
        return new Promise((resolve, reject) => {
            axios.get('/posts/popular')
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    fetchDraftPosts = (userId) => {
        return new Promise((resolve, reject) => {
            axios.get(`/user/${userId}/posts/drafts`)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    sendFeedback = (authorId, feedback) => {
        return new Promise((resolve, reject) => {
            axios.post('/user/feedbacks', {
                authToken: localStorage.getItem('authToken'),
                authorId: authorId,
                feedback: feedback
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    fetchCategoryPost = (category) => {
        return new Promise((resolve, reject) => {
            axios.get(`/posts/${category}`)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error)
                });
        });
    }
    sendMeesage = (authorId,message) => {
        return new Promise ((resolve,reject)=>{
            axios.post('/user/messages',{
                authToken: localStorage.getItem('authToken'),
                authorId : authorId,
                message : message
            })
            .then((response)=>{
               resolve(response.data);
            })
            .catch((error)=>{
                reject(error);
            });
        });
    }
    ratePost = (postId,ratings) => {
        return new Promise((resolve,reject)=>{
            axios.put('/posts/ratings',{
                authToken :localStorage.getItem('authToken'),
                postId : postId,
                rating: ratings
            })
            .then((response) =>{
              resolve(response.data);
            })
            .catch((error) =>{
                reject(error);
            })
        });
    }

}

export default new PostService();