import  *  as actionTypes from '../Actions/actionTypes';


const initialState = {
 
    recentActivity: [],
    followers: [],
    feedbacks : [],
    messages : [],
    views:0,
    likes:0,
    posts:0,
    comments:0,
    
}

const reducer = (state = initialState , action) => {
    
        switch(action.type) {

            case actionTypes.USER_RECENT_ACTIVITY : {
            console.log(action);
                return {
                    ...state,
                    recentActivity : [ ...action.recentActivity]
                }
            }
            case actionTypes.FOLLOWER_INFO : {
                console.log(action)
                return {
                    ...state,
                    followers : [ ...action.followers]
                }
            }

            case actionTypes.LIKES : {
             
                return {
                    ...state,
                    likes: action.likes
                }
            }

            case actionTypes.COMMENTS : {
                console.log(action)
                return {
                    ...state,
                    comments: action.comments
                }
            }

            case actionTypes.POSTS : {
                console.log(action)
                return {
                    ...state,
                    posts: action.posts
                }
            }

            case actionTypes.VIEWS : {
                console.log(action)
                return {
                    ...state,
                    views: action.views
                }
            }

            case actionTypes.FEEDBACKS : {
                return {
                    ...state,
                    feedbacks : [...action.feedbacks]
                }
            }

            case actionTypes.MESSAGES : {
                return {
                    ...state,
                    messages : [...action.messages]
                }
            }


            default : return state;
        } 

    
}

export default reducer;