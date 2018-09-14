import React, { Component } from "react";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import Homepage from "./components/layout/Homepage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";
import PrivateRoute from "./components/shared/PrivateRoute";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-exp-edu/AddExperience";
import AddEducation from "./components/add-exp-edu/AddEducation";
import Listofprofiles from "./components/listofprofiles/Listofprofiles";
import Profile from "./components/individualprofile/Profile";
import NotFound from "./components/notfound/NotFound";
import Posts from "./components/posts/Posts";
import Post from "./components/individualpost/Post";

import "./App.css";

// Check for the token
if (localStorage.jwtToken) {
  // Set the jwtToken to Authorization Header
  setAuthToken(localStorage.jwtToken);
  // Decode the token we passed
  const decoded_token = jwt_decode(localStorage.jwtToken);
  // Dispatch the action from the store and set the current user to have their token
  store.dispatch(setCurrentUser(decoded_token));

  // Check if token is expired
  const currentTime = Date.now() / 1000;
  if (decoded_token.exp < currentTime) {
    //Logout the user
    store.dispatch(logoutUser());
    // TODO: Clear current profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login page
    window.location.href = "/login";
  }
}

// Use router to encapsulate
// Use Route to assign a component to a specific route
// <Route exact path =[/path/goes/here] component={[component name goes here]}

// Used switch for redirection for protected routes we don't want public accessing

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navigation />
            <Route exact path="/" component={Homepage} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Listofprofiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/postfeed" component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
              <Route exact path="/notfound" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
