import { ERROR_HANDLER, ADD_POST } from "./constants";
import axios from "axios";

export const addPost = postData => dispatch => {
  axios
    .post("/api/posts", postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: ERROR_HANDLER,
        payload: err.response.data
      })
    );
};
