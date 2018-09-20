import  *  as actionTypes from '../Actions/actionTypes';


const initialState = {
    profileImageData : null
}

const reducer = (state = initialState , action) => {
    
        switch(action.type) {

            case actionTypes.IMAGE_FILE : {
                console.log("in reducer=================================================>");
                return {
                    ...state,
                    profileImageData : action.imageData
                }
            }


            default : return state;
        } 

    
}

export default reducer;