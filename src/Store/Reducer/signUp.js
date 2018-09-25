import  *  as actionTypes from '../Actions/actionTypes';


const initialState = {
    profileImageData : null
}

const reducer = (state = initialState , action) => {
    
        switch(action.type) {

            case actionTypes.IMAGE_FILE : {
               
                return {
                    ...state,
                    profileImageData : action.imageData
                }
            }


            default : return state;
        } 

    
}

export default reducer;