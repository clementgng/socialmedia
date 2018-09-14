import { ERROR_HANDLER, CLEAR_PC_ERRORS } from "../actions/constants";

const initialState = {};

export const errorReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ERROR_HANDLER:
      return action.payload;
    case CLEAR_PC_ERRORS:
      return {};
    default:
      return state;
  }
};
