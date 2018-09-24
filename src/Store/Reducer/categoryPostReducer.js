import *  as actionTypes from '../Actions/actionTypes';



const initialState = {

    categoryPosts : [
    {postContent: ' ',
    postTitle: '',
    postId: '',
    userId: '',
    likes : 0,
    views: 0
    }]
    
}

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.FETCH_POST_CATEGORY : {
                       
            return {
                
                categoryPosts : [...action.categoryPosts]
            }
        } 
        

        default: return state;
    }


}

export default reducer;