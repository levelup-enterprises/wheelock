/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { toast } from "react-toastify";
import { logout } from "./auth";
// Root url
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// setAuth();

// Handle 400 & 500 errors
axios.interceptors.response.use(null, (errors) => {
  const expectedError =
    errors.response &&
    errors.response.status >= 400 &&
    errors.response.status < 500;

  // If error
  if (expectedError) {
    if (errors.response.data) {
      const { error } = errors.response.data;
      console.error(error.message);
      error.message && toast.error(error.message);
      // Bad token
      errors.response.status === 403 &&
        setTimeout(() => {
          logout();
        }, 3000);
    }
  }
  return Promise.reject(errors);
});

// Set X Auth in outbound headers
function setJwt(jwt) {
  axios.defaults.headers.common["X-Auth-Token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
  // setAuth,
};
