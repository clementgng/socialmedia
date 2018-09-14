// Comment.js -- Display an individual comment on a post with ability to delete
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/postActions";

class Comment extends React.Component {
  onDeleteClick(commentID, postID) {
    this.props.deleteComment(commentID, postID);
  }

  render() {
    const { comment, postID, auth } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={comment.profilePicture}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">
              {comment.firstName} {comment.lastName}
            </p>
          </div>
          <div className="col-md-10">
            <p className="lead">
              {comment.postContents}
              {comment.user === auth.user.id ? (
                <button
                  onClick={this.onDeleteClick.bind(this, comment._id, postID)}
                  type="button"
                  className="btn btn-danger mr-1"
                >
                  X
                </button>
              ) : null}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  postID: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(Comment);
