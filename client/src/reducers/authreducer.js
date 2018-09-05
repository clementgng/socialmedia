import { REGISTER_USER_SUCCESS } from "../actions/constants";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export const authReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    default:
      return state;
  }
};
