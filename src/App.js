import React, { Component } from 'react';
import Editor from './Components/Editor/Editor';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import SummaryGrid from './Components/Grids/Summary Grid/Summary Grid';
import Blog from './Components/Blog/Blog';
import Layout from './Components/Layout/Layout';
import BlogBuilder from './Containers/BlogBuilder/BlogBuilder'; 




class App extends Component {


  render() {


    return (
      <div className="App">
         <Layout />
          <BlogBuilder />
        
      </div>  
    );
  }
}

export default App;
