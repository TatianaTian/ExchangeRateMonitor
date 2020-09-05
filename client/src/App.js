import React, { Component, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import ReactGA from 'react-ga';
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

//import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Landing_ch from "./components/layout/Landing_ch";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Register_ch from "./components/auth/Register_ch";
import Login_ch from "./components/auth/Login_ch";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Dashboard_ch from "./components/dashboard/Dashboard_ch";

import "./App.css";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

/*
function initializeReactGA() {
  ReactGa.initialize('UA-164922631-1');
  ReactGa.pageview('/');
}*/

class App extends Component {
  render() {
    //initializeReactGA()
    ReactGA.initialize('UA-164922631-1', { debug: true });

    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            
            <Route exact path="/" component={Landing} />
            <Route exact path="/ch" component={Landing_ch} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/register_ch" component={Register_ch} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/login_ch" component={Login_ch} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/dashboard_ch" component={Dashboard_ch} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
