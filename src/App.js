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
      main: '#37474f',

    },
    secondary: {
      main: '#f44336',
    },
   
  },
})


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
                <Route path = '/editpost/:id' component={EditPost}></Route>
                <Route path='/createpost' component={Editor} ></Route>
                <Route path='/' exact component={BlogBuilder}></Route>
            </Switch>
          </div>
          
        </MuiThemeProvider>
      </div>
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
