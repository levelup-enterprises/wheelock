import axios from "axios";
import config from "../setup";
import { postify } from "./utilities";

//# Set connection defaults
axios.defaults.baseURL = config.postApi;

//# Handle 400 & 500 errors
axios.interceptors.response.use(null, (errors) => {
  const expectedError =
    errors.response &&
    errors.response.status >= 400 &&
    errors.response.status < 500;

  // If error
  if (expectedError) {
    console.log(errors.response.data);
  }
  return { data: Promise.reject(errors) };
});

/**--------------------------------
 ** Get Token
 * --------------------------------
 * Gets token from localStorage
 *  if exists.
 * - Sets token from jwt.js if not
 * @returns {string}
 */
const getJwt = async (clear = null) => {
  try {
    const { data } = await axios.get("auth/token", {
      auth: {
        username: process.env.REACT_APP_USERNAME,
        password: process.env.REACT_APP_PASSWORD,
      },
    });
    if (data.token) {
      // setJwt(data.success.token);
      return data.token;
    } else return console.error("No token available!");
  } catch (error) {
    console.error(error);
  }
};

/**--------------------------------
 ** Submit survey data
 * --------------------------------
 * Primary post call
 */
const post2Survey = async (data, endpoint = config.endpoint) => {
  return getJwt()
    .then((token) => {
      return axios.post(endpoint, postify(data), {
        headers: { "X-Auth-Token": token },
      });
    })
    .catch((e) => {
      console.error(e);
    });
};

export default post2Survey;
