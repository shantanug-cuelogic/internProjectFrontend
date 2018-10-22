import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { withRouter } from 'react-router'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import * as actionTypes from './Store/Actions/actionTypes';
import asyncImports from './Utility/asyncImports';
import Layout from './Components/Layout/Layout';
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
    let authenticatedRoutes = null;
    if (this.props.auth) {
      authenticatedRoutes =
        <Switch>
          <Route path='/signin' component={asyncImports.asyncSignIn}></Route>
          <Route path='/signup' component={asyncImports.asyncSignUp}></Route>
          <Route path='/post/:id' component={asyncImports.asyncPost} ></Route>
          <Route path='/editor' component={asyncImports.asyncEditor}></Route>
          <Route path='/profile' component={asyncImports.asyncProfile}></Route>
          <Route path='/createpost' component={asyncImports.asyncEditor} ></Route>
          <Route path='/dashboard' component={asyncImports.asyncDashboard} ></Route>
          <Route path="/updateprofile" component={asyncImports.asyncUpdateProfile}> </Route>
          <Route path="/drafts" component={asyncImports.asyncDrafts}> </Route>
          <Route path="/drafteditor/:id" component={asyncImports.asyncDraftEditor}> </Route>
          <Route path='/category/:id' component={asyncImports.asyncCategory} ></Route>
          <Route path='/search' component={asyncImports.asyncSearchPost} ></Route>
          <Route path='/authorprofile/:userId' component={asyncImports.asyncAuthorProfile} ></Route>
          <Route path='/forgotpassword' component={asyncImports.asyncForgotPassword}></Route>
          <Route path='/recoverpassword/:authToken' component={asyncImports.asyncPasswordRecover}></Route>
          <Route path='/' exact component={asyncImports.asyncBlogBuilder}></Route>
        </Switch>
    }
    else {
      authenticatedRoutes =
        <Switch>
          <Route path='/signin' component={asyncImports.asyncSignIn}></Route>
          <Route path='/signup' component={asyncImports.asyncSignUp}></Route>
          <Route path='/post/:id' component={asyncImports.asyncPost} ></Route>
          <Route path='/category/:id' component={asyncImports.asyncCategory} ></Route>
          <Route path='/search' component={asyncImports.asyncSearchPost} ></Route>
          <Route path='/authorprofile/:userId' component={asyncImports.asyncAuthorProfile} ></Route>
          <Route path='/forgotpassword' component={asyncImports.asyncForgotPassword}></Route>
          <Route path='/recoverpassword/:authToken' component={asyncImports.asyncPasswordRecover}></Route>
          <Route path='/' exact component={asyncImports.asyncBlogBuilder}></Route>
        </Switch>
    }

    let updateRoute = null;

    if (this.props.postUserId === this.props.userId) {
      updateRoute = <Route path='/editpost/:id' component={asyncImports.asyncEditPost}></Route>
    }
    const theme = this.props.isDark ? createMuiTheme(DarkTheme) : createMuiTheme(DefaultTheme);
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Layout logout={this.logout} />
          <div style={{ textAlign: 'center', width: '90%', marginLeft: '5%', marginRight: '5%' }}>
            {/* <div id="google_translate_element" style={{ display: 'inline', height: 27, float: 'right' , marginTop:'10%' }} ></div> */}

              {updateRoute}
              {authenticatedRoutes}
             
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
