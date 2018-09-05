import { REGISTER_USER_FAILED } from "../actions/constants";

const initialState = {};

export const errorReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case REGISTER_USER_FAILED:
      return action.payload;
    default:
      return state;
  }
};
