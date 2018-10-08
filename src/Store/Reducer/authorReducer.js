import  *  as actionTypes from '../Actions/actionTypes';


const initialState = {
    authorFirstName: "",
    authorLastName: "",
    authorProfileImage: "",
    authorEmail: "",
    authorId: '',
    allowedToFollow:null
}

const reducer = (state = initialState , action) => {
    
        switch(action.type) {

            case  actionTypes.FETCH_AUTHOR_INFO : {
                return {
                    ...state,
                    authorFirstName:action.authorFirstName,
            authorLastName:action.authorLastName,
            authorProfileImage:action.authorProfileImage,
            authorEmail:action.authorEmail,
            authorId:action.authorId    
                }
            }
            case actionTypes.AUTHOR_FOLLOWED_ALLOWED : {
                return {
                    ...state,
                    allowedToFollow : action.allowedToFollow
                }
            }

            default : return state;
        } 

    
}

export default reducer;