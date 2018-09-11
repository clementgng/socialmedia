// Listofprofiles.js -- This is the list of all the profiles to be displayed at the /profiles route

import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../shared/Spinner";
import { getListOfProfiles } from "../../actions/profileActions";
import ProfileItem from "./Profileitem";

class Listofprofiles extends React.Component {
  componentDidMount() {
    this.props.getListOfProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h4>No profiles were found</h4>;
      }
    }
    return (
      <div className="listofprofiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">User profiles</h1>
              <p className="lead text-center">
                Browse and connect with other users
              </p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Listofprofiles.propTypes = {
  getListOfProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getListOfProfiles }
)(Listofprofiles);
