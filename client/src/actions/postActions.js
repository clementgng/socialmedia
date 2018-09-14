import {
  ERROR_HANDLER,
  ADD_POST,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  CLEAR_PC_ERRORS,
  DELETE_POST
} from "./constants";
import axios from "axios";

// Add a post
export const addPost = postData => dispatch => {
  dispatch(clearPostCommentErrors());
  axios
    .post("/api/posts", postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: ERROR_HANDLER,
        payload: err.response.data
      })
    );
};

// Delete a post
//Send the id as we want to delete post locally by the id
export const deletePost = postID => dispatch => {
  axios
    .delete(`/api/posts/${postID}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: postID
      })
    )
    .catch(err =>
      dispatch({
        type: ERROR_HANDLER,
        payload: err.response.data
      })
    );
};

// Get all the posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get("/api/posts")
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

// Get a single post
export const getPost = postID => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/${postID}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    );
};

// Set loading state for posts
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

// Like a post
export const likePost = postID => dispatch => {
  axios
    .post(`/api/posts/like/${postID}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: ERROR_HANDLER,
        payload: err.response.data
      })
    );
};

// Unlike a post -- discontinued at the moment, keep just incase
export const unlikePost = postID => dispatch => {
  axios
    .post(`/api/posts/unlike/${postID}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: ERROR_HANDLER,
        payload: err.response.data
      })
    );
};

// Add a comment onto a post
export const addComment = (postID, comment) => dispatch => {
  dispatch(clearPostCommentErrors());
  axios
    .post(`/api/posts/comment/${postID}`, comment)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: ERROR_HANDLER,
        payload: err.response.data
      })
    );
};

// Delete a comment from a post
export const deleteComment = (commentID, postID) => dispatch => {
  axios
    .delete(`/api/posts/comment/${postID}/${commentID}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: ERROR_HANDLER,
        payload: err.response.data
      })
    );
};

/*User can submit blank post/comment and get an error, 
submit a valid post/comment and the error will remain
This will send action to error reducer and 
clear the comment/post error
*/
export const clearPostCommentErrors = () => {
  return {
    type: CLEAR_PC_ERRORS
  };
};
