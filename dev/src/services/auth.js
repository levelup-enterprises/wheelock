/* eslint-disable import/no-anonymous-default-export */
import http from "./http";
import session from "./session";
import { toast } from "react-toastify";
import { postAPI } from "./post";

const tokenKey = "token";

// Set headers and token
getJwt();

/**--------------------------------
 ** POST to Login
 * --------------------------------
 * Attempts to login with
 *  credentials
 *
 * @param {string} values
 * @returns {json} data
 */
export const login = async (values) => {
  try {
    const { data } = await postAPI("users/login", values);
    !data.success && !data.error && console.error(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

/**--------------------------------
 ** Continue previous session
 * --------------------------------
 * Check for previous session &
 *  return user to that page
 */
export const check4previous = () => {
  try {
    // Set persistent token
    let continueSession = session.get("continue");

    if (continueSession) {
      let exp = new Date(continueSession.exp);
      const now = new Date();
      exp = exp.setHours(exp.getHours() + 3);
      // If not expired use previous link
      if (exp < now) session.remove("continue");
      else {
        continueSession.dateRange &&
          session.set("dateRange", continueSession.dateRange);
        window.location = continueSession.url;
      }
    } else if (
      window.location.pathname !== "/" &&
      window.location.pathname !== "/login"
    ) {
      // Continue following link
      window.location.href = window.location.pathname;
    } else window.location.href = "/summary";
  } catch (error) {
    console.error(error);
  }
};

/**--------------------------------
 ** Logout
 * --------------------------------
 * Removes token, affiliates and
 *  user data from storage and
 *  redirects to root.
 */
export function logout(inactive = null) {
  try {
    if (inactive) {
      // Set continue values
      const date = session.get("dateRange");
      const continueSession = {
        exp: new Date(),
        url: window.location.pathname,
        dateRange: date,
      };

      session.clear();
      session.set("inactive", "You have been logged out due to inactivity");
      session.set("continue", continueSession);
    } else session.clear();

    window.location.replace("/login");
  } catch (error) {
    console.log(error);
  }
}

/**--------------------------------
 ** Check for Expired Token
 * --------------------------------
 * Checks object for errors and
 *  if starts with Expires logout
 *
 * @param {object} data
 * @returns {string}
 */
export function isExpired(data) {
  try {
    if (typeof data.errors !== "undefined") {
      data.errors.startsWith("Expired") && logout();
    }
  } catch (error) {
    console.log(error);
  }
}

/**--------------------------------
 ** Remove Token
 * --------------------------------
 */
export async function reset() {
  try {
    const update = async () => {
      getJwt(true);
      toast.success("Session restored! Try again!");
    };
    toast.info("Session expired! Click here to restore session.", {
      onClick: update,
      autoClose: false,
    });
  } catch (error) {
    console.log(error);
  }
}

/**--------------------------------
 ** Get Token
 * --------------------------------
 * Gets token from localStorage
 *  if exists.
 * - Sets token from jwt.js if not
 * @returns {string}
 */
export async function getJwt(clear = null) {
  try {
    let token = session.get(tokenKey) || false;
    if (clear || !token) {
      // Generate Auth
      // await http.setAuth();
      const { data } = await http.get("get/token.php");
      if (data) {
        session.set(tokenKey, data);
        token = data;
      } else return console.error("No token available!");
    }
    http.setJwt(token);
  } catch (error) {
    console.error(error);
  }
}

export default {
  login,
  logout,
  reset,
  isExpired,
  getJwt,
};
