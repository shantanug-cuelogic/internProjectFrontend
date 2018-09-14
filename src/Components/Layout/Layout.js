import React from 'react';
import Header from './Header/Header';

const layout = (props) => {
    return(       
             <Header auth={props.auth} logout={props.logout} />
  );
}
export default layout;