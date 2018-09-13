import React, { Component } from 'react';
import Editor from './Components/Editor/Editor';
import ReactDOM from 'react-dom';

import Button from '@material-ui/core/Button';
import SummaryGrid from './Components/Grids/Summary Grid/Summary Grid';
import Blog from './Components/Blog/Blog';
import Layout from './Components/Layout/Layout';
import BlogBuilder from './Containers/BlogBuilder/BlogBuilder'; 
import { MuiThemeProvider,createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import { StickyContainer, Sticky } from 'react-sticky';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



const theme = createMuiTheme({
  palette: {
    primary: {
      main:'#004D40',
      
    },
    secondary: {
      main: '#f44336',
    },
    mycolor:{
      main:'#263238'
    },
  },
});



class App extends Component {


  render() {


    return (
      <div className="App">
       
       <MuiThemeProvider theme={theme}>
          <div style={{textAlign:'center',width:'70%', marginLeft:'15%' , marginRight:'15%' }}>
          <Layout /> 
          <BlogBuilder />
          <Editor/>
          </div>
          </MuiThemeProvider>
       
     </div>  
    );
  }
}

export default App;
