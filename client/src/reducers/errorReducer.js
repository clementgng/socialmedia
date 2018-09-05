import { ERROR_HANDLER } from "../actions/constants";

const initialState = {};

export const errorReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ERROR_HANDLER:
      return action.payload;
    default:
      return state;
  }
};
