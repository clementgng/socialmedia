// CommentForm.js -- Input form to comment on a post

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextField from "../shared/TextField";
import { addComment } from "../../actions/postActions";

class CommentForm extends React.Component {
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
    const { postID } = this.props;
    const { user } = this.props.auth;
    console.log(postID, user);
    const newComment = {
      postContents: this.state.postContents,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePicture: user.profilePicture
    };
    console.log(newComment);
    this.props.addComment(postID, newComment);
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
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextField
                  placeholder=""
                  name="postContents"
                  value={this.state.postContents}
                  onChange={this.onChange}
                  error={errors.postContents}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  postID: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addComment }
)(CommentForm);
