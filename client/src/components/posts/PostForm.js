// PostForm.js -- Input form to write a post

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextField from "../shared/TextField";
import { addPost } from "../../actions/postActions";

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postContents: "",
      errors: {}
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.errors) {
      return {
        errors: nextProps.errors
      };
    }
    return null;
  }
  /*componentDidUpdate(prevProps, prevState) {
    if (this.props.errors !== prevProps.errors) {
      this.setState({ errors: this.props.errors });
    }
  }*/

  onSubmit = event => {
    event.preventDefault();
    const { user } = this.props.auth;
    const newPost = {
      postContents: this.state.postContents,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePicture: user.profilePicture
    };
    this.props.addPost(newPost);
    this.setState({ postContents: "" });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Post Anything!</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextField
                  placeholder="Create a Post"
                  name="postContents"
                  value={this.state.postContents}
                  onChange={this.onChange}
                  error={errors.postContents}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
