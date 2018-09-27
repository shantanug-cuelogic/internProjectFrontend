import  *  as actionTypes from '../Actions/actionTypes';

const initialState = {
   open:false,
   snackBarMessage:"asas"
}

const reducer = (state = initialState , action) => {
    
        switch(action.type) {

          case actionTypes.SNACKBAR_OPEN : {
        
            return {
                
                open:true,
                snackBarMessage:action.snackBarMessage
            }
          }
          
          case actionTypes.SNACKBAR_CLOSE : {
              return {
                  ...state,
                  open:false,
                  snackBarMessage:""
              }
          }
          default : return state;
        } 
}

export default reducer;