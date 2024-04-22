import { toast } from "react-toastify";

/** ------------------------------------
 ** Convert object to POSTable values
 * ------------------------------------
 * @param object values
 * @return URLSearchParams POST format
 */
export function postify(values) {
  try {
    if (values === undefined) {
      return {};
    }
    let params = new URLSearchParams();
    Object.entries(values).forEach((entry) => {
      const [key, value] = entry;
      params.append(key, value);
    });
    return params;
  } catch (error) {
    console.log(error);
  }
}

/** ------------------------------------
 ** Format phone number
 * ------------------------------------
 * @param n phone number
 * @return formatted number
 */
export function formatPhoneNum(n) {
  try {
    if (!n) return n;

    // only allows 0-9 inputs
    n = n.replace(/[^\d]/g, "");

    if (n.length < 4) return n;

    if (n.length < 7) return `${n.slice(0, 3)}-${n.slice(3)}`;

    return `${n.slice(0, 3)}-${n.slice(3, 6)}-${n.slice(6, 10)}`;
  } catch (error) {
    console.log(error);
  }
}

/** -------------------------------
 ** Mask and format zip code value
 * --------------------------------
 * @param {string} n value to be converted
 * @param {integer} max limit the length - default 5
 */
export function formatZipCode(n, max = null) {
  try {
    if (!n) return n;
    // Max limiter
    !max && (max = 5);
    // only allows 0-9 inputs
    n = n.replace(/[^\d]/g, "");
    // Prevent more than 8
    n = n.substring(0, max);
    if (n.length <= 5) return n;
    return n.slice(0, 5) + "-" + n.slice(5);
  } catch (error) {
    console.log(error);
  }
}

/** ---------------------------
 ** Update page title
 * ----------------------------
 * Gets location pathname
 *  cleans & formats it.
 * Appends site title to it.
 */
export function updateTitle(title = false) {
  try {
    if (!title) {
      const site = process.env.REACT_APP_TITLE;
      let page = window.location.pathname;
      page = page.split("/");
      page = page[page.length - 1];
      page = page.replace("/", "").replace("-", " ");
      document.title = capitalize(page) + " | " + site;
    } else {
      document.title = title;
    }
  } catch (error) {
    console.log(error);
  }
}

/** ------------------------------------
 ** Capitalize 1st letter of each word
 * ------------------------------------
 * @param string word or phrase
 * @return string formatted word or phrase
 */
export function capitalize(string) {
  try {
    const transform = (string) => {
      return string
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };
    return transform(string);
  } catch (error) {
    console.log(error);
  }
}

/** ------------------------------------
 ** Smooth scroll to top of page
 * ------------------------------------
 *
 * @param {boolean} immediate Return to top without animation
 */
export function scrollToTop(immediate = null) {
  immediate
    ? window.scroll({
        top: 0,
        left: 0,
      })
    : window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
}

/** ------------------------------------
 ** Copy value to clipboard
 * ------------------------------------
 * @param string word or phrase
 * @return toast alert
 */
export function copyReceipt(value) {
  navigator.clipboard.writeText(value).then(
    () => {
      console.log(value);
      toast.info("Added to clipboard!");
    },
    () => {
      console.log("failed");
    }
  );
}

/** ------------------------------------
 ** Decode html entities
 * ------------------------------------
 * @param string
 * @return string
 */
export function decodeEntities(value) {
  return value.replace("&amp;([#a-zA-Z0-9]+;)", function (match, dec) {
    console.log(dec);
    return String.fromCharCode(dec);
  });
}
