import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch,withRouter } from "react-router-dom";
import SignIn from './Components/SIgn In/Sign In';
import SignUp from './Components/Sign Up/Sign Up';
import BlogBuilder from './Containers/BlogBuilder/BlogBuilder';

const routes = () => {
    return (
        <React.Fragment>
        <Router>
            <Switch>
                <Route path='/signin' component={SignIn}></Route>
                <Route path='/signup' component={SignUp}></Route>
                <Route path='/' component={BlogBuilder}></Route>

            </Switch>

        </Router>
    </React.Fragment>
        );
    
}

export default withRouter(routes);