import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  UPLOAD_IMAGE
} from "../actions/constants";

const initialState = {
  profile: null,
  profiles: null,
  imgFile: null,
  loading: false
};

export const profileReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    case UPLOAD_IMAGE:
      return {
        image: action.payload
      };
    default:
      return state;
  }
};
