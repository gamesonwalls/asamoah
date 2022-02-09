import axios from "axios";

const setAuthTokenAdmin = async (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token-admin"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token-admin"];
  }
};

export default setAuthTokenAdmin;
