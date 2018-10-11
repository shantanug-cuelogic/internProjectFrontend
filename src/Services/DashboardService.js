import axios from 'axios';

class DashboardService {

    getUserRecentActivity = (userId) => {
        return new Promise((resolve, reject) => {

            axios.get('/recentactivity/' + userId)
                .then((response) => {
                    if (response.data.success) {

                        resolve(response.data.result)
                    }
                })
                .catch((error) => {
                    console.log(error);
                })

        });
    }
    getLikeCount = (likeUrl) => {

        return new Promise((resolve, reject) => {
            axios.get(likeUrl)
                .then((response) => {

                    if (response.data.success) {
                        resolve(response.data.likeCount)
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }

    getViewCount = (viewUrl) => {

        return new Promise((resolve, reject) => {
            axios.get(viewUrl)
                .then((response) => {

                    if (response.data.success) {
                        resolve(response.data.viewCount)
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }

    getPostCount = (postUrl) => {

        return new Promise((resolve, reject) => {
            axios.get(postUrl)
                .then((response) => {
                    console.log(response.data);
                    if (response.data.success) {
                        resolve(response.data.postCount)
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }

    getCommentCount = (commentUrl) => {

        return new Promise((resolve, reject) => {
            axios.get(commentUrl)
                .then((response) => {

                    if (response.data.success) {
                        resolve(response.data.commentCount)
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }

    getFollowerInformation = (userId) => {
        return new Promise((resolve, reject) => {
            axios.get('followersinfo/' + userId)
                .then((response) => {
                    if (response.data.success) {
                        resolve(response.data.result);
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
        });
    }

    getFeedbacks = (userId) => {
        return new Promise((resolve, reject) => {
            axios.get('/feedback/' + userId)
                .then((response) => {
                    if (response.data.success) {
                        resolve(response.data.result);
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
        });
    }

    getMessages = (userId) => {
        return new Promise((resolve, reject) => {
            axios.get('/message/' + userId)
                .then((response) => {

                    if (response.data.success) {
                        resolve(response.data.result);
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
        });
    }

    getViewsPerPost = (userId) => {
        return new Promise((resolve, reject) => {

            axios.get('viewsperpost/' + userId)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    }
}

export default new DashboardService();

