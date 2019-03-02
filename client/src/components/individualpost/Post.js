// individualpost/Post.js -- Display an individual post when someone clicks on a post to comment on
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../shared/Spinner";
import PostItem from "../posts/PostItem";
import { getPost } from "../../actions/postActions";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";

class Post extends React.Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }
  render() {
    const { post, loading } = this.props.post;
    let postContent;
    if (post === null || Object.keys(post).length === 0 || loading) {
      postContent = <Spinner />;
    } else {
      console.log("this is postcomments", post.comments);
      postContent = (
        <div>
          <PostItem post={post} displayButtons={false} />
          <CommentForm postID={post._id} />
          <CommentFeed postID={post._id} comments={post.comments} />
        </div>
      );
    }
    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/postfeed" className="btn btn-light mb-3">
                Back
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPost }
)(Post);
