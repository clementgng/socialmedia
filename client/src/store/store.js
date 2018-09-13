/* store/store.js -- 
Create the store, apply thunk middleware, 
create rootReducer to take the sub reducer
*/
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/rootreducer";
import thunk from "redux-thunk";
const middleware = [thunk];
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware)
  // other store enhancers if any
);

const store = createStore(rootReducer, enhancer);

export default store;
