/*
postReducer.js -- 
*/
import { ERROR_HANDLER, ADD_POST } from "../actions/constants";

const initialState = {
  posts: [],
  post: {},
  loading: false
};

export const postReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    default:
      return state;
  }
};
