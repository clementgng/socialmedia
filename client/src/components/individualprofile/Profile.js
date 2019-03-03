// individualprofile/Profile.js -- Contains a individual user's profile when selected
// Don't show empty boxes on frontend client if profile attributes are empty
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ProfileAbout from "./ProfileAbout";
import ProfileExpEdu from "./ProfileExpEdu";
import ProfileHeader from "./ProfileHeader";
import Spinner from "../shared/Spinner";
import { getProfileByHandle } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

class Profile extends React.Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.profile.profile === null && nextProps.profile.loading) {
      //this.props.profile.loading) {
      nextProps.history.push("/notfound");
    }
  }
  /*static getDerivedStateFromProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }*/
  /*componentDidUpdate(prevProps, prevState) {
    if (this.props.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/notfound");
    }
  }*/

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile} />
          {isEmpty(profile.bio) && isEmpty(profile.skills) ? null : (
            <ProfileAbout profile={profile} />
          )}

          <ProfileExpEdu
            experience={profile.experience}
            education={profile.education}
          />
        </div>
      );
    }
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
