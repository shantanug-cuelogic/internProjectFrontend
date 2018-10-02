import axios from 'axios';
import { connect } from 'react-redux';

class PostService {

    fetchAllPostData = (postId) => {
        axios.get('/post/getpost/'+postId)
        .then((response) => {
            if(response.data.success) {
                console.log(response.data.result)
            } else {

            }

        })
        .catch((error) => {
            console.log(error);
        })
    }

}

export default new PostService();