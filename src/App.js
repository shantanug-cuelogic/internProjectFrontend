import React, { Component } from 'react';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';
import FroalaEditor from 'react-froala-wysiwyg';

import './App.css';

class App extends Component {
  state = { users: [] ,
    model:' ' 
  }

  componentDidMount() {
    // fetch('/users')
    //   .then(res => res.json())
    //   .then(users => this.setState({ users }));
  }
  config={
   // videoUploadURL:'https://drive.google.com/drive/folders/1sVBa_EQLW3Wfvx69NNuH8DP2T8if40v3?usp=sharing',
    

   imageUpload: true,
   imageUploadMethod: 'POST',
   imageUploadParam: 'file_name',
   imageUploadParams: {
    id: 'my_editor'
  },
  imageUploadRemoteUrls: true,
  imageUploadURL: 'http://localhost:3000/imageupload',

   fileUpload: true,
   fileUploadURL: 'http://localhost:3000/fileupload',
   fileUploadMethod: 'PUT',
   fileUploadParam: 'filename',
   colorsDefaultTab: 'background',
    disableRightClick: true,
    codeMirror: false
    } 

  handleModelChange =(model) => {
    this.setState({
      model: model
    });

    //console.log(document.getElementById('fr-video-by-url-layer-text-1'));
    console.log(this.state.model);
  }

  render() {


    return (
      <div className="App">
        <h1>Users</h1>
          <ul>
            {this.state.users.map(user => 
              <li key={user.id}>{user.name}</li>
            )}
          </ul>
          <FroalaEditor tag='textarea'
            model={this.state.model}
            onModelChange={this.handleModelChange}
            config={this.config }
          />

      
      </div>
    );
  }
}

export default App;
