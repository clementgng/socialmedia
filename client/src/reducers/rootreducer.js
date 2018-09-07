import { combineReducers } from "redux";
import { authReducer } from "./authreducer";
import { errorReducer } from "./errorReducer";
import { profileReducer } from "./profileReducer";

const reducers = {
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer
};
const rootReducer = combineReducers(reducers);

export default rootReducer;
