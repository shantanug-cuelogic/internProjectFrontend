import  *  as actionTypes from '../Actions/actionTypes';


const initialState = {
    auth : true,
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
                    userId : action.userId
                }
               
            }

            default : return state;
        } ;

    
}

export default reducer;