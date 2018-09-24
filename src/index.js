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
import signUpReducer from './Store/Reducer/signUp';
import categoryPostReducer from './Store/Reducer/categoryPostReducer';

const store = createStore(combineReducers(
    { authReducer: authReducer,
         postReducer: postReducer, 
         signUpReducer: signUpReducer ,
         categoryPostReducer:categoryPostReducer   
        }));

const app = (
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
