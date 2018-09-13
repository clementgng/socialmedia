import React, { Component } from "react";
import PropTypes from "prop-types";
import PostItem from "./PostItem";

class PostFeed extends Component {
  render() {
    const { posts } = this.props;
    return posts.map(post => (
      <PostItem
        key={post._id}
        id={post._id}
        comments={post.comments}
        date={post.date}
        firstName={post.firstName}
        lastName={post.lastName}
        likes={post.likes}
        postContents={post.postContents}
        profilePicture={post.profilePicture}
        user={post.user}
      />
    ));
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostFeed;
