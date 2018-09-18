import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import authReducer from './Store/Reducer/auth';
import postReducer from './Store/Reducer/postReducer';

const store = createStore(combineReducers({authReducer:authReducer,postReducer:postReducer}));

const app = (
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);

ReactDOM.render( app, document.getElementById('root'));
registerServiceWorker();
