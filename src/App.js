import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { withRouter } from 'react-router'
import SignIn from './Components/SIgn In/Sign In';
import SignUp from './Components/Sign Up/Sign Up';
import BlogBuilder from './Containers/BlogBuilder/BlogBuilder';
import Post from './Containers/Post/Post';
import Profile from './Components/Profile/Profile';
import Editor from './Components/Editor/Editor';
import Layout from './Components/Layout/Layout';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actionTypes from './Store/Actions/actionTypes';
import EditPost from './Containers/Post/EditPost';
import Dashboard from './Components/Dashboard/Dashboard';




class App extends Component {

  componentDidMount(){
    axios.post('/authenticate',{authToken:localStorage.getItem('authToken')})
    .then((response) =>{

      if(response.data.success) {
        this.props.authenticate(true,localStorage.getItem('authToken'),localStorage.getItem('userId'));
      }
      else if(!response.data.success) {
        this.props.authenticate(false);
      }
    })
    .catch((error)=>{

    });
  }
  
  
  render() {

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
})


    return (
      <MuiThemeProvider theme={theme}>
      <div className="App">
        
          
          <Layout  logout={this.logout}/>
         <div style={{ textAlign: 'center', width: '90%', marginLeft: '5%', marginRight: '5%' }}>
            <Switch>
                <Route path='/signin' component={SignIn}></Route>
                <Route path='/editor' component={Editor}></Route>
                <Route path='/signup' component={SignUp}></Route>
                <Route path='/profile' component={Profile}></Route>
                <Route path='/post/:id' component={Post} ></Route>
                <Route path = '/editpost/:id' component={EditPost}></Route>
                <Route path='/createpost' component={Editor} ></Route>
                <Route path = '/dashboard' component = {Dashboard} ></Route>
                <Route path='/' exact component={BlogBuilder}></Route>
            </Switch>
          </div>
          
        
      </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state =>{
  return {
    auth : state.authReducer.auth,
    userId : state.authReducer.userId
  }
}

const mapDispatchToProps = dispatch => {
  return{
    authenticate : (userStatus,token,id)=> dispatch({type:actionTypes.AUTHENTICATE_ON_RELOAD , status:userStatus , authToken:token, userId:id })
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
