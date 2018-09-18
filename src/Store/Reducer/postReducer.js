import  *  as actionTypes from '../Actions/actionTypes';


const initialState = {
    postContent: ' ',
    postTitle: '',
    postId: '',
    userId: '',
   toggle : false,
    allcomments: [],
}

const reducer = (state = initialState , action) => {
    
    switch(action.type) {
        
        case actionTypes.FETCH_POST : {
            
            return {
                ...this.state,
                postId:action.postId,
                postTitle:action.postTitle,
                postContent:action.postContent,
                userId:action.userId,
            
                allcomments:action.allcomments
            }
            
        }
        case actionTypes.TOGGLE : {
            return {
                ...this.state,
                toggle : !state.toggle
            }
        }
        case actionTypes.POST_COMMENT : 
        {
            
        }

        default : return state;
    } 


}

export default reducer;