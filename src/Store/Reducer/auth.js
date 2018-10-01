import  *  as actionTypes from '../Actions/actionTypes';


const initialState = {
    auth : false,
    authToken : "",
    userId: "",
    firstName:"Shantanu",
    lastName:"Gade",
    profileImage:"/require/userimage.jpg",
    isAdmin:false,
    email:"shan@gmail.com",
    gender:'Male'
}

const reducer = (state = initialState , action) => {
    
        switch(action.type) {

            case actionTypes.LOGOUT :{
               localStorage.removeItem('authToken');
               localStorage.removeItem('userId');

                return {
                 
                    auth : false,
                    authToken : "",
                    userId: "",
                    firstName:"",
                    lastName:"",
                    profileImage:"",
                    isAdmin:false,
                    email:"",
                    followers: 0
                }
            } 

            case actionTypes.AUTHENTICATE : {
             
                return {
                    ...state,
                    auth : true,
                    authToken : action.authToken,
                    userId : parseInt(action.userId),
                    firstName:action.firstName,
                    lastName:action.lastName,
                    profileImage:action.profileImage,
                    isAdmin:action.isAdmin,
                    email:action.email,
                    gender: action.gender,
                    followers:action.followers
                }
               
            }
            case actionTypes.AUTHENTICATE_ON_RELOAD : {
                return {
                    ...state,
                    auth:action.status,
                    authToken : action.authToken,
                    userId : parseInt(action.userId)

                }
            }

            case actionTypes.UPDATE_USER : {
                return {
                    ...state,
                    firstName:action.firstName,
                    lastName:action.lastName,
                    gender:action.gender,
                    profileImage:action.profileImage
                }
            }

            default : return state;
        } ;

    
}

export default reducer;