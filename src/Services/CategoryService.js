import axios from 'axios';

class CategoryService {

    getCategoryPosts = (category) => {
        return new Promise((resolve, reject) => {
            axios.get('/post/category/' + category)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        })
    }

}
export default new CategoryService();
