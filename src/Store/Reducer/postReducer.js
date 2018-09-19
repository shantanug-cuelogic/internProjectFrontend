import *  as actionTypes from '../Actions/actionTypes';
import { stat } from 'fs';


const initialState = {
    postContent: ' ',
    postTitle: '',
    postId: '',
    userId: '',
    toggle: false,
    allcomments: [],
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
         // console.log("in resucer");
            return {
                ...initialState
            }
        }

        default: return state;
    }


}

export default reducer;