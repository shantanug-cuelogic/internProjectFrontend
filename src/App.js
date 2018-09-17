import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import SignIn from './Components/SIgn In/Sign In';
import SignUp from './Components/Sign Up/Sign Up';
import BlogBuilder from './Containers/BlogBuilder/BlogBuilder';
import Post from './Containers/Post/Post';
import Profile from './Components/Profile/Profile';
import Editor from './Components/Editor/Editor';
import Layout from './Components/Layout/Layout';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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


  logout = () =>{
    this.setState({
      auth:false
    })
  }

  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          
          <Layout  logout={this.logout}/>
         <div style={{ textAlign: 'center', width: '70%', marginLeft: '15%', marginRight: '15%' }}>
            <Switch>
                <Route path='/signin' component={SignIn}></Route>
                <Route path='/editor' component={Editor}></Route>
                <Route path='/signup' component={SignUp}></Route>
                <Route path='/profile' component={Profile}></Route>
                <Route path='/post/:id' component={Post} ></Route>
                <Route path='/createpost' component={Editor} ></Route>
                <Route path='/' exact component={BlogBuilder}></Route>
            </Switch>
          </div>
          
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
