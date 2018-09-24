import  *  as actionTypes from '../Actions/actionTypes';


const initialState = {
    isDark:false
}

const reducer = (state = initialState , action) => {
    
        switch(action.type) {
            case actionTypes.THEME_HANDLER : {
               console.log(action)
                return{ isDark : action.ChangeTheme
               }
            }

            default : return state;
        } ;

    
}

export default reducer;