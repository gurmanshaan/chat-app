import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import firebase from 'firebase/app';
import 'firebase/firestore'
import { Route, BrowserRouter as Router } from 'react-router-dom';
import LoginComponent from './login/login';
import SignupComponent from './signup/signup';
import DashboardComponent from './dashboard/dashboard';

firebase.initializeApp({
  apiKey: "AIzaSyDdY7luSzdTjmaxk32cSSQm4jeQXOeELDo",
  authDomain: "gurmanshaan-chat-app.firebaseapp.com",
  projectId: "gurmanshaan-chat-app",
  storageBucket: "gurmanshaan-chat-app.appspot.com",
  messagingSenderId: "234381087256",
  appId: "1:234381087256:web:2cd5d789da4dccd501696d"
})

const routing = (
  <Router>
    <div id="routing-container">
      <Route path="/login" component={LoginComponent}></Route>
      <Route path="/signup" component={SignupComponent}></Route>
      <Route path="/dashboard" component={DashboardComponent}></Route>
    </div>
  </Router>
)

ReactDOM.render(<React.StrictMode>{routing}</React.StrictMode>, document.getElementById('root'));


