// PostItem.js -- Display an individual post component
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { deletePost, likePost } from "../../actions/postActions";

class PostItem extends React.Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  //Toggle like button when clicking
  onClick(id) {
    this.props.likePost(id);
  }

  userLiked(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const {
      key,
      id,
      comments,
      date,
      firstName,
      lastName,
      likes,
      postContents,
      profilePicture,
      user,
      auth
    } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={profilePicture}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">
              {firstName} {lastName}
            </p>
          </div>
          <div className="col-md-10">
            <p className="lead">{postContents}</p>
            <button
              onClick={this.onClick.bind(this, id)}
              type="button"
              className="btn btn-light mr-1"
            >
              {this.userLiked(likes) ? (
                <img
                  src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/facebook/11/thumbs-up-sign_1f44d.png"
                  style={{ width: "25px", height: "25px" }}
                />
              ) : (
                <img
                  src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/129/thumbs-up-sign_1f44d.png"
                  style={{ width: "25px", height: "25px" }}
                />
              )}

              <span className="badge badge-light">{likes.length}</span>
            </button>
            {/*<button type="button" className="btn btn-light mr-1">
              <i className="text-secondary fas fa-thumbs-down" />
    </button>*/}
            <Link to={`/post/${id}`} className="btn btn-info mr-1">
              Comments
            </Link>
            {user === auth.user.id ? (
              <button
                onClick={this.onDeleteClick.bind(this, id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                X
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost, likePost }
)(PostItem);
