import  *  as actionTypes from '../Actions/actionTypes';


const initialState = {
    auth : false,
    authToken : "",
    userId: ""
}

const reducer = (state = initialState , action) => {
    
        switch(action.type) {

            case actionTypes.LOGOUT :{
               localStorage.removeItem('authToken');
               localStorage.removeItem('userId');

                return {
                    ...state,
                    auth : false
                }
            } 

            case actionTypes.AUTHENTICATE : {
                return {
                    ...state,
                    auth : true,
                    authToken : action.authToken,
                    userId : parseInt(action.userId)
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