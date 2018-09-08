import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  ERROR_HANDLER
} from "./constants";

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data })) // return the profile object
    .catch(err => dispatch({ type: GET_PROFILE, payload: {} })); // return an empty object as users can register, but not create a profile
};

// Create a new profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({ type: ERROR_HANDLER, payload: err.response.data })
    );
};

// Set profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear the current profile when user logs out
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
