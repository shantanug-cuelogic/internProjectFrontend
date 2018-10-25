import axios from 'axios';

class AuthorProfileService {

    getAuthorInformation = (userId) => {
        return new Promise((resolve, reject) => {
            axios.get('/user/profile/' + userId)
                .then((response) => {
                    resolve(response.data[0]);
                })
                .catch((error) => {
                    console.log(error);
                })
        });
    }

    getAuthorPosts = (authorId) => {
        console.log(authorId);
        return new Promise((resolve, reject) => {
            axios.get(`/user/${authorId}/posts`)
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