/* utls/setAuthToken.js -- apply or delete the Authorization request when we call
axios so backend knows if a user is authorized*/

import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete the auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
