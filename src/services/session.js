/**-----------------------------------------------------
 *# Set Session values
 * -----------------------------------------------------
 * @param {string} name Name of session var
 * @param {mixed} session Objects are converted to json
 * @param {boolean} local Set for localStorage
 */
export function set(name, session, local = false) {
  try {
    if (typeof session === "object") {
      session = JSON.stringify(session);
    }
    return local
      ? localStorage.setItem(name, session)
      : sessionStorage.setItem(name, session);
  } catch (error) {
    console.log(error);
  }
}
/**-----------------------------------------------------
 *# Get Session values
 * -----------------------------------------------------
 * Gets and returns values and json objects
 *
 * @param {string} name Name of session var
 * @param {boolean} local Set for localStorage
 */
export function get(name, local = false, raw = null) {
  try {
    let session = local
      ? localStorage.getItem(name) || null
      : sessionStorage.getItem(name) || null;

    if (session !== null) {
      try {
        return raw ? session : JSON.parse(session);
      } catch (error) {
        return session;
      }
    }
    return session;
  } catch (error) {
    console.log(error);
  }
}

/**-----------------------------------------------------
 *# Remove Session values
 * -----------------------------------------------------
 * @param {string} name Name of session var
 * @param {boolean} local Set for localStorage
 */
export function remove(name, local = false) {
  try {
    return local
      ? localStorage.removeItem(name) || false
      : sessionStorage.removeItem(name) || false;
  } catch (error) {
    console.log(error);
  }
}

/**-----------------------------------------------------
 *# Remove All Session values
 * -----------------------------------------------------
 * @param {boolean} local Set for localStorage
 */
export function clear(local = false) {
  try {
    return local
      ? localStorage.clear() || false
      : sessionStorage.clear() || false;
  } catch (error) {
    console.log(error);
  }
}

export default {
  set,
  get,
  remove,
  clear,
};
