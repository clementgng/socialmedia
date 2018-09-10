// Navigation UI at the top of the page with links to do stuff
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";
import PropTypes from "prop-types";

// use Link <Link></Link>to replace <a></a> tag
// <a href="[link goes here]" changes to <Link to="[link goes here]"

class Navbar extends React.Component {
  /*constructor() {
    super();
  }*/
  onLogoutClick = event => {
    event.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const loggedIn = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
          <a href="" className="nav-link" onClick={this.onLogoutClick}>
            <img
              className="rounded-circle"
              src={user.profilePicture}
              alt={user.firstName}
              title="Test title"
              style={{ width: "25px", marginRight: "5px" }}
            />{" "}
            Logout
          </a>
        </li>
      </ul>
    );
    const loggedOut = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            TestApp
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  {" "}
                  TestApp Users
                </Link>
              </li>
            </ul>

            {isAuthenticated ? loggedIn : loggedOut}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { clearCurrentProfile, logoutUser }
)(Navbar);
