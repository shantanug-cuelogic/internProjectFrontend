import axios from 'axios';

class RestApi {

    getRequest = (url) => {
        return new Promise((resolve, reject) => {
            axios.get(url)
                .then((response) => {
                    if (response.data.success) {
                      
                        resolve(response.data.result)
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }


}

export default new RestApi();