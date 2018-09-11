/*
profileAction.js has all the profile actions. 
Getting, setting, creating, deleting current profiles, along with some other profile action stuf
*/

import axios from "axios";
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  ERROR_HANDLER,
  SET_CURRENT_USER
} from "./constants";

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data })) // return the profile object
    .catch(err => dispatch({ type: GET_PROFILE, payload: {} })); // return an empty object as users can register, but not create a profile
};

// Get profile by the handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data })) // return the profile object
    .catch(err => dispatch({ type: GET_PROFILE, payload: null })); // return an empty object as users can register, but not create a profile
};

// Get all the profiles in the network
export const getListOfProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/users")
    .then(res => dispatch({ type: GET_PROFILES, payload: res.data }))
    .catch(err => dispatch({ type: ERROR_HANDLER, payload: null }));
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

// Add experience to a user profile
export const addExperience = (expData, history) => dispatch => {
  axios
    .post("/api/profile/experience", expData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({ type: ERROR_HANDLER, payload: err.response.data })
    );
};

// Add education to a user profile
export const addEducation = (eduData, history) => dispatch => {
  axios
    .post("/api/profile/education", eduData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({ type: ERROR_HANDLER, payload: err.response.data })
    );
};

// Delete Experience from a user profile
export const deleteExperience = exp_id => dispatch => {
  axios
    .delete(`/api/profile/experience/${exp_id}`)
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(err =>
      dispatch({ type: ERROR_HANDLER, payload: err.response.data })
    );
};

// Delete Education from a user profile
export const deleteEducation = edu_id => dispatch => {
  axios
    .delete(`/api/profile/education/${edu_id}`)
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(err =>
      dispatch({ type: ERROR_HANDLER, payload: err.response.data })
    );
};

// Delete a user's account-- profile, everything, from the DB
export const deleteAccount = () => dispatch => {
  if (
    window.confirm(
      "Are you sure you want to delete this account? There is no going back."
    )
  ) {
    axios
      .delete("/api/profile")
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: ERROR_HANDLER,
          payload: err.response.data
        })
      );
  }
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
