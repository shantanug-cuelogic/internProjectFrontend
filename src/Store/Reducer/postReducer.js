import *  as actionTypes from '../Actions/actionTypes';



const initialState = {
    postContent: ' ',
    postTitle: '',
    postId: '',
    userId: '',
    toggle: false,
    allcomments: [],
    allowedToLike : false,
    likes : 0,
    views: 0
}

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.FETCH_POST: {

            return {
                ...state,
                postId: action.postId,
                postTitle: action.postTitle,
                postContent: action.postContent,
                userId: action.userId,
                allcomments: action.allcomments
            }

        }
        case actionTypes.TOGGLE: {
            return {
                ...state,
                toggle: !state.toggle
            }
        }

        case actionTypes.RESET_POST_CONTENT: {

            return {
                
                postContent: ' ',
                postTitle: '',
                postId: '',
                userId: null,
                toggle: false,
                allcomments: [],
            }
        }
        case actionTypes.POST_COMMENT:
            {
                let updatedComments = [...state.allcomments];
                updatedComments.push(action.updateCommentData);
                return {
                    ...state,
                    allcomments: [...updatedComments]
                }

            }
        case actionTypes.DELETE_COMMENT:
            {
                let updatedComments = [...state.allcomments];
                updatedComments.splice(action.index, 1);
                return {
                    ...state,
                    allcomments: [...updatedComments]
                }
            }
        case actionTypes.UPDATE_POST: {
            return {
                ...state,
                postContent: action.postContent,
                postTitle: action.postTitle
            }
        }

        case actionTypes.DELETE_POST : {
        
            return {
                ...initialState
            }
        }

        case actionTypes.ALLOWED_TO_LIKE_POST : {
            return {
                ...state,
                allowedToLike : action.allowToLike
            }
        }

        case actionTypes.TOTAL_LIKE_TO_POST : {
            return {
                ...state,
                likes: action.totalLikes
            }
        }

        case actionTypes.TOTAL_VIEWS_TO_POST : {
            return {
                ...state,
                views : action.views
            }
        }

        default: return state;
    }


}

export default reducer;