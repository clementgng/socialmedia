/*
authActions.js has all the authentication actions to be sent to the reducer
*/

import { ERROR_HANDLER, SET_CURRENT_USER } from "./constants";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

//Register a user success/error handling
// history is used to redirect to a new URI
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({ type: ERROR_HANDLER, payload: err.response.data })
    );
};

// Login a user success/error handling
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Grab the token from the promise and save it
      const { token } = res.data;
      // localstorage only stores strings, set token to localstorage
      localStorage.setItem("jwtToken", token);
      // set token to Authorization header
      setAuthToken(token);
      // Decode token to get user data
      const decodedToken = jwt_decode(token);
      // set the current user who will get this token
      dispatch(setCurrentUser(decodedToken));
    })
    .catch(err =>
      dispatch({ type: ERROR_HANDLER, payload: err.response.data })
    );
};

// Set the authroization jwt token for the logged in user
export const setCurrentUser = decodedToken => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedToken
  };
};

// Logout a user
export const logoutUser = history => dispatch => {
  // Delete token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove authorization header for future requests
  setAuthToken(false);
  // Set the current user to an empty object {}
  // this will set isAuthenticated in the authReducer to false
  dispatch(setCurrentUser({}));
  history.push("/");
};
