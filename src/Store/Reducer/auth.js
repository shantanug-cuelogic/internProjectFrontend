import  *  as actionTypes from '../Actions/actionTypes';


const initialState = {
    auth : false,
    authToken : "",
    userId: "",
    firstName:"",
    lastName:"",
    profileImage:"",
    isAdmin:false,
    email:""
}

const reducer = (state = initialState , action) => {
    
        switch(action.type) {

            case actionTypes.LOGOUT :{
               localStorage.removeItem('authToken');
               localStorage.removeItem('userId');

                return {
                    userId:null,
                    auth : false,
                   

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
                    email:action.email
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

            default : return state;
        } ;

    
}

export default reducer;