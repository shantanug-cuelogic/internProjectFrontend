import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch,withRouter } from "react-router-dom";
import SignIn from './Components/SIgn In/Sign In';
import SignUp from './Components/Sign Up/Sign Up';
import BlogBuilder from './Containers/BlogBuilder/BlogBuilder';
import Post from './Containers/Post/Post';
import { StickyContainer, Sticky } from 'react-sticky';
import Profile from './Components/Profile/Profile';

import Editor from './Components/Editor/Editor';
import ReactDOM from 'react-dom';
import Paper from '@material-ui/core/Paper';


import Button from '@material-ui/core/Button';
import SummaryGrid from './Components/Grids/Summary Grid/Summary Grid';
import Blog from './Components/Blog/Blog';
import Layout from './Components/Layout/Layout';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';




const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#004D40',

    },
    secondary: {
      main: '#f44336',
    },
    mycolor: {
      main: '#263238'
    },
  },
});



class App extends Component {

  state = {
    auth:true
  }

  logout = () =>{
    this.setState({
      auth:false
    })
  }

  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          
          <Layout auth={this.state.auth} logout={this.logout}/>
         <div style={{ textAlign: 'center', width: '70%', marginLeft: '15%', marginRight: '15%' }}>
            <Switch>
                <Route path='/signin' component={SignIn}></Route>
                <Route path='/editor' component={Editor}></Route>
                <Route path='/signup' component={SignUp}></Route>
                <Route path='/profile' render={(props) => <Profile {...props} auth={this.state.auth} />}></Route>
                <Route path='/post/:id' component={Post} ></Route>
                <Route path='/' exact component={BlogBuilder}></Route>
            </Switch>
          </div>
          
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
