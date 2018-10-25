import axios from 'axios';

class AuthorProfileService {

    getAuthorInformation = (userId) => {
        return new Promise((resolve, reject) => {
            axios.get('/userprofile/' + userId)
                .then((response) => {
                    resolve(response.data[0]);
                })
                .catch((error) => {
                    console.log(error);
                })
        });
    }

    getAuthorPosts = (authorId) => {
        return new Promise((resolve, reject) => {
            axios.get('/posts/?userId =' + authorId)
            .then((response) => {
                if (response.data.success) {
                    resolve(response.data.result);
                }
            })
            .catch((error) => {
                console.log(error);
            })
        });
    }
}
export default new AuthorProfileService();