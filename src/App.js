import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { withRouter } from 'react-router'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import * as actionTypes from './Store/Actions/actionTypes';

import SignIn from './Components/Sign In/Sign In';
import SignUp from './Components/Sign Up/Sign Up';
import BlogBuilder from './Containers/BlogBuilder/BlogBuilder';
import Post from './Containers/Post/Post';
import Profile from './Components/Profile/Profile';
import Editor from './Containers/Editor/Editor';
import Layout from './Components/Layout/Layout';
import Drafts from './Components/Drafts/Drafts';
import DraftEditor from './Containers/Editor/DraftEditor';
import EditPost from './Containers/Post/EditPost';
import Dashboard from './Containers/Dashboard/Dashboard';
import Category from './Containers/Category/Category';
import SearchPost from './Components/SearchPost/SearchPost';
import AuthorProfile from './Containers/AuthorProfile/AuthorProfile';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import PasswordRecover from './Components/PasswordRecover/PasswordRecover';
import UpdateProfile from './Components/UpdateProfile/UpdateProfile';
import HigherOrderComponent from './HigherOrderComponent/HigherOrderComponent';
import Snackbar from '@material-ui/core/Snackbar';
import UserService from './Services/UserService';

import DarkTheme from './Themes/DarkTheme';
import DefaultTheme from './Themes/DefaultTheme';

class App extends Component {
  componentDidMount = async () => {
    const authenticateResponse = await UserService.authenticateUser();
    if (authenticateResponse.success) {
      this.props.handleOpenSnackBar(`Welcome ${authenticateResponse.result.firstName}`);
      this.props.handleSignInState(localStorage.getItem('authToken'),
        authenticateResponse.result.userId,
        authenticateResponse.result.firstName,
        authenticateResponse.result.lastName,
        authenticateResponse.result.profileImage,
        authenticateResponse.result.email,
        authenticateResponse.result.isAdmin,
        authenticateResponse.result.gender,
        authenticateResponse.result.followers,
      );
    }
  }
  handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.props.closeSnackBar();

  };
  render() {
    // let authenticatedRoutes = null;
    // if (this.props.auth) {
    //   authenticatedRoutes =
    //     <Switch>
    //       <Route path='/editor' component={Editor}></Route>
    //       <Route path='/profile' component={Profile}></Route>
    //       <Route path='/createpost' component={Editor} ></Route>
    //       <Route path='/dashboard' component={Dashboard} ></Route>
    //       <Route path="/updateprofile" component={UpdateProfile}> </Route>
    //       <Route path="/drafts" component={Drafts}> </Route>
    //       <Route path="/drafteditor/:id" component={DraftEditor}> </Route>
    //     </Switch>


    // }
    // let updateRoute = null;

    // if (this.props.postUserId === this.props.userId) {
    //   updateRoute = <Route path='/editpost/:id' component={EditPost}></Route>
    // }
    const theme = this.props.isDark ? createMuiTheme(DarkTheme) : createMuiTheme(DefaultTheme);
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Layout logout={this.logout} />
          <div style={{ textAlign: 'center', width: '90%', marginLeft: '5%', marginRight: '5%' }}>
        {/* <div id="google_translate_element" style={{ display: 'inline', height: 27, float: 'right' , marginTop:'10%' }} ></div> */}

            <Switch>
              <Route path='/signin' component={SignIn}></Route>
              <Route path='/signup' component={SignUp}></Route>
              <Route path='/post/:id' component={Post} ></Route>
              <Route path='/editpost/:id' component={EditPost}></Route>
              <Route path='/editor' component={Editor}></Route>
              <Route path='/profile' component={Profile}></Route>
              <Route path='/createpost' component={Editor} ></Route>
              <Route path='/dashboard' component={Dashboard} ></Route>
              <Route path="/updateprofile" component={UpdateProfile}> </Route>
              <Route path="/drafts" component={Drafts}> </Route>
              <Route path="/drafteditor/:id" component={DraftEditor}> </Route>
              {/* {updateRoute}
             {authenticatedRoutes} */}
              <Route path='/category/:id' component={Category} ></Route>
              <Route path='/search' component={SearchPost} ></Route>
              <Route path='/authorprofile/:userId' component={AuthorProfile} ></Route>
              <Route path='/forgotpassword' component={ForgotPassword}></Route>
              <Route path='/recoverpassword/:authToken' component={PasswordRecover}></Route>
              <Route path='/' exact component={BlogBuilder}></Route>
            </Switch>
          </div>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            open={this.props.open}
            TransitionComponent={this.TransitionUp}
            variant="error"
            autoHideDuration={1000}
            onClose={this.handleCloseSnackBar}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{this.props.snackBarMessage}  </span>}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.authReducer.auth,
    userId: state.authReducer.userId,
    isDark: state.themeReducer.isDark,
    open: state.snackBarReducer.open,
    snackBarMessage: state.snackBarReducer.snackBarMessage,
    postUserId: state.postReducer.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authenticate: (userStatus, token, id) => dispatch({ type: actionTypes.AUTHENTICATE_ON_RELOAD, status: userStatus, authToken: token, userId: id }),
    closeSnackBar: () => dispatch({
      type: actionTypes.SNACKBAR_CLOSE
    }),
    handleSignInState: (token, id, firstName, lastName, profileImage, email, isAdmin, gender, followers) => dispatch({
      type: actionTypes.AUTHENTICATE,
      authToken: token, userId: id,
      firstName: firstName,
      lastName: lastName,
      profileImage: profileImage,
      email: email,
      isAdmin: isAdmin,
      gender: gender,
      followers: followers
    }),
    handleOpenSnackBar: (snackBarMessage) => dispatch({
      type: actionTypes.SNACKBAR_OPEN,
      snackBarMessage: snackBarMessage
    })
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
