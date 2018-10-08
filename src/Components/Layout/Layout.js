import React from 'react';
import Header from './Header/Header';

const layout = (props) => {
    return(       
            <div>
              <Header auth={props.auth} logout={props.logout} />
            </div>
             
  );
}
export default layout;