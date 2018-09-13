import { ERROR_HANDLER, ADD_POST, GET_POSTS, POST_LOADING } from "./constants";
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
