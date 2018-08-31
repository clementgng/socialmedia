import React from "react";
import { Link } from "react-router-dom";

// use Link <Link></Link>to replace <a></a> tag
// <a href="[link goes here]" changes to <Link to="[link goes here]"

class Homepage extends React.Component {
  render() {
    return (
      <div className="homepage">
        <div className="dark-overlay homepage-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Linkedin TestApp</h1>
                <p className="lead">
                  {" "}
                  Create a profile, share posts and get help from other users
                </p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
