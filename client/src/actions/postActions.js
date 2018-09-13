import {
  ERROR_HANDLER,
  ADD_POST,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST
} from "./constants";
import axios from "axios";

// Add a post
export const addPost = postData => dispatch => {
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
