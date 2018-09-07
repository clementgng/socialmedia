import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import PropTypes from "prop-types";
import Spinner from "../shared/Spinner";

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    // Check if the user has created a profile before we render the dashboard ofr the user
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (Object.keys(profile).length === 0) {
        // User is logged in, but has not created a profile yet
        dashboardContent = (
          <div>
            <p className="lead text-muted">Hello, {user.firstName}!</p>
            <p>Please setup your user profile</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create your user profile
            </Link>
          </div>
        );
      } else {
        //TODO: display user profile here
        dashboardContent = <h1>Hello, {user.firstName}!</h1>;
      }
    }
    // col-md-12 this is a full column div
    return (
      <div classname="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
