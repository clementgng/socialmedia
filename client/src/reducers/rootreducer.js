import { combineReducers } from "redux";
import { authReducer } from "./authreducer";
import { errorReducer } from "./errorReducer";

const reducers = {
  auth: authReducer,
  errors: errorReducer
};
const rootReducer = combineReducers(reducers);

export default rootReducer;
