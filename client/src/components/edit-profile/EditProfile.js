// EditProfile.js -- Get the current user and edit changes the user makes, else grab the current profile data

import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import InputTextField from "../shared/InputTextField";
import TextField from "../shared/TextField";
import SelectList from "../shared/SelectList";
import InputField from "../shared/InputField";
import industryOptions from "../shared/industryOptions";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

class CreateProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      industry: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      instagram: "",
      errors: {}
    };
  }

  // Grab the current profile after rendering
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // Convert skills array to CSV
      const skills = profile.skills.join(",");

      //Convert null profile fields into an empty string or the edit
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.socialmedialinks = !isEmpty(profile.socialmedialinks)
        ? profile.socialmedialinks
        : {};
      profile.facebook = !isEmpty(profile.socialmedialinks.facebook)
        ? profile.socialmedialinks.facebook
        : "";
      profile.linkedin = !isEmpty(profile.socialmedialinks.linkedin)
        ? profile.socialmedialinks.linkedin
        : "";
      profile.githubusername = !isEmpty(profile.socialmedialinks.githubusername)
        ? profile.socialmedialinks.githubusername
        : "";
      profile.instagram = !isEmpty(profile.socialmedialinks.instagram)
        ? profile.socialmedialinks.instagram
        : "";
      profile.twitter = !isEmpty(profile.socialmedialinks.twitter)
        ? profile.socialmedialinks.twitter
        : "";
      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        industry: profile.industry,
        skills: skills,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        instagram: profile.instagram
      });
    }
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      industry: this.state.industry,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      instagram: this.state.instagram
    };
    this.props.createProfile(profileData, this.props.history);
  };

  onDisplay = () => {
    this.setState(state => ({
      displaySocialInputs: !state.displaySocialInputs
    }));
  };
  //icon="fab fa-twitter"
  render() {
    const { errors, displaySocialInputs } = this.state;
    let socialMediaInputs;
    if (displaySocialInputs) {
      socialMediaInputs = (
        <div>
          <InputField
            placeholder="Twitter Profile URL"
            name="twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputField
            placeholder="Facebook Profile URL"
            name="facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputField
            placeholder="LinkedIn Profile URL"
            name="linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />
          <InputField
            placeholder="Instagram Profile URL"
            name="instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
          <InputField
            placeholder="Github Username"
            name="githubusername"
            value={this.state.githubusername}
            onChange={this.onChange}
            error={errors.githubusername}
          />
        </div>
      );
    }
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit your profile</h1>
              <form onSubmit={this.onSubmit}>
                <InputTextField
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL."
                />
                <InputTextField
                  placeholder="* Job Title"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  error={errors.status}
                  info="Specify your job title"
                />
                <SelectList
                  placeholder="Industry"
                  name="industry"
                  value={this.state.industry}
                  onChange={this.onChange}
                  selectOptionsArray={industryOptions}
                  error={errors.industry}
                  info="What industry do you work in?"
                />
                <InputTextField
                  placeholder="Company Name"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Specify your company name"
                />
                <InputTextField
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Specify your website"
                />
                <InputTextField
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="Specify your location"
                />
                <InputTextField
                  placeholder="Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma seperated values (ex. Cooking,Eating,Cleaning)"
                />
                <TextField
                  placeholder="Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />
                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={this.onDisplay}
                  >
                    Add social network links
                  </button>
                  <span className="text-muted">(This is optional)</span>
                  {socialMediaInputs}
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </div>
              </form>
              <small className="d-block pb-3"> * = required fields</small>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(CreateProfile));
