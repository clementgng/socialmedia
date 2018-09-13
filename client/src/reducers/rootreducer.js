import { combineReducers } from "redux";
import { authReducer } from "./authreducer";
import { errorReducer } from "./errorReducer";
import { profileReducer } from "./profileReducer";
import { postReducer } from "./postReducer";

const reducers = {
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  post: postReducer
};
const rootReducer = combineReducers(reducers);

export default rootReducer;
