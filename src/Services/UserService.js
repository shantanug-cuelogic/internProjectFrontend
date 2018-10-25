import axios from 'axios';

class UserService {
    forgotPassword = (email) => {
        return new Promise((resolve, reject) => {
            axios.post('/user/forgotPassword', {
                email: document.getElementById('username').value
            })
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }
    checkForgetToken = (token) => {
        return new Promise((resolve, reject) => {
            axios.post('/user/token', {
                forgetToken: token
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    console.log(error)
                });
        });
    }
    changeUserPassword = (userId, password) => {
        return new Promise((resolve, reject) => {
            axios.put('/user/changepassword', {
                userId: userId,
                password: password
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        });
    }
    userSignIn = (email, password) => {
        return new Promise((resolve, reject) => {
            axios.post('/login', {
                "email": email,
                "password": password
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        });
    }
    userSignUp = (firstName, lastName, email, password, profileImage) => {
        return new Promise((resolve, reject) => {
            axios.post('/register', {
                firstName: firstName,
                lastName: lastName,
                isAdmin: false,
                email: email,
                password: password,
                profileImage: profileImage
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }
    deleteUser = (userId) => {
        return new Promise((resolve, reject) => {
            axios.put('/user/delete', {
                authToken: localStorage.getItem('authToken'),
                userIdtoDelete: userId
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        });

    }

    getAllUser = () => {
        return new Promise((resolve, reject) => {
            axios.get('/users')
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }
    authorFollow = (authorId) => {
        return new Promise ((resolve,reject)=>{
            axios.post('/followers/add', {
                authToken: localStorage.getItem('authToken'),
                userIdToFollow: authorId
            })
            .then((response)=>{
                resolve(response.data);
            })
            .catch((error)=>{
                console.log(error);
            })
        });
    }
    authorUnfollow = (authorId) => {
        return new Promise ((resolve,reject)=>{
            axios.put('/followers/unfollow', {
                authToken: localStorage.getItem('authToken'),
                userIdToUnfollow: authorId
            })
            .then((response)=>{
                resolve(response.data);
            })
            .catch((error)=>{
                console.log(error);
            });
        });
    }
    authenticateUser = () =>{
        return new Promise ((resolve,reject)=>{
            axios.post('/user/authenticate',{
                authToken:localStorage.getItem('authToken'),
                email:localStorage.getItem('email')
              })
              .then((response)=>{
                  resolve(response.data);
              })
              .catch((error)=>{
                reject(error);
            })
        });
    }

    updateUserProfile = (formData) => {
        return new Promise ((resolve,reject)=>{
            axios.put('/user/update', formData, {
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
                    reject(error);
                });
        });
    }

}
export default new UserService();