import React from 'react';
import Header from './Header/Header';
import { withRouter } from 'react-router-dom';

const layout = (props) => {
  return (
    <div>
      <Header auth={props.auth} logout={props.logout} />
      <div id="google_translate_element" style={{ display: 'inline', height: 27, float: 'right' }} ></div>

    </div>

  );
}
export default withRouter(layout);