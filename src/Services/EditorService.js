import axios from 'axios';

class EditorService {

    postBlog = (formData) => {
        return new Promise((resolve, reject) => {
            axios.post('/post/create', formData, {
                headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data;`,
                }
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    console.log(error)
                });
        });
    }

    getDraftPost = (postId) => {
        return new Promise ((resolve,reject)=>{
            axios.get('/post/getpost/' +postId)
            .then((response) => {
               resolve(response.data);
            })
            .catch((error) => {
                console.log(error)
            })
        });
    }

    saveDraftPost = (formData)=>{
        return new Promise ((resolve,reject)=>{
            axios.put('/post/savepost', formData, {
                headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data;`,
                }
            })
                .then((response) => {
                  resolve(response.data);
                })
                .catch((error) => {
                    console.log(error)
                })
        })
    }
}
export default new EditorService();