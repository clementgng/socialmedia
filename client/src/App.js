import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Homepage from "./components/layout/Homepage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

import "./App.css";

// Use router to encapsulate
// Use Route to assign a component to a specific route
// <Route exact path =[/path/goes/here] component={[component name goes here]}

// Create the store, apply thunk middleware, create rootReducer to take the sub reducers

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Homepage} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
