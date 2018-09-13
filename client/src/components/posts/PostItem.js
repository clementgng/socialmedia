// PostItem.js -- Display an individual post component
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";

class PostItem extends React.Component {
  onDeleteClick(id) {
    console.log(id);
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
    console.log(key);
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
            <button type="button" className="btn btn-light mr-1">
              <i className="text-info fas fa-thumbs-up" />
              <span className="badge badge-light">{likes.length}</span>
            </button>
            <button type="button" className="btn btn-light mr-1">
              <i className="text-secondary fas fa-thumbs-down" />
            </button>
            <Link to={`/post/${id}`} className="btn btn-info mr-1">
              Comments
            </Link>
            {user === auth.user.id ? (
              <button
                onClick={this.onDeleteClick.bind(this, id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PostItem);
