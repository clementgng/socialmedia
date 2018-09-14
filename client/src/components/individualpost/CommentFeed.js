// Show all the comments on a post
// Comments shown in chronological order
import React from "react";
import PropTypes from "prop-types";
import Comment from "./Comment";

class CommentFeed extends React.Component {
  render() {
    const { comments, postID } = this.props;
    return comments.map(comment => (
      <React.Fragment>
        <Comment key={comment._id} comment={comment} postID={postID} />
      </React.Fragment>
    ));
  }
}

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  postID: PropTypes.string.isRequired
};

export default CommentFeed;
