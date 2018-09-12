import React from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";

class ProfileAbout extends React.Component {
  render() {
    const { profile } = this.props;
    // Get the profile skills
    const skills = profile.skills.map((skill, index) => (
      <div key={index} className="p-3">
        {skill}
      </div>
    ));
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            {isEmpty(profile.bio) ? null : (
              <span>
                <h3 className="text-center text-info">
                  {profile.user.firstName}
                  's Profile Summary
                </h3>
                <p className="lead">
                  <span>{profile.bio}</span>
                </p>
                <hr />
              </span>
            )}
            {isEmpty(profile.skills) ? null : (
              <span>
                <h3 className="text-center text-info">Skills & Endorsements</h3>
                <div className="row">
                  <div className="d-flex flex-wrap justify-content-center align-items-center">
                    {skills}
                  </div>
                </div>
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
