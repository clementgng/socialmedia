import { REGISTER_USER_FAILED } from "./constants";
import axios from "axios";

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({ type: REGISTER_USER_FAILED, payload: err.response.data })
    );
};
