import config from "../setup";
import publicIp from "public-ip";
import { launchAnalytics } from "./analytics";

/** -----------------------------------------
 ** Custom color logs
 * ------------------------------------------
 * @param string text data to show
 * @param string color value
 */
export const clg = (text, color) => {
  console.log("%c" + text, "color:" + color);
};

/** -----------------------------------------
 ** Generate user token
 * ------------------------------------------
 * Check / create token for user validation
 */
export const generateUserToken = () => {
  try {
    if (config.event.userToken) {
      const tokenExists =
        window.sessionStorage.getItem(config.tokenName) || false;
      !tokenExists &&
        window.sessionStorage.setItem(
          config.tokenName,
          Math.random().toString(36).substr(2) +
            "-" +
            Math.random().toString(36).substr(2)
        );
    }
  } catch (e) {
    clg(config.desc + " user token: " + e, "red");
  }
};

/** -----------------------------------------
 ** Check for Dashboard hit
 * ------------------------------------------
 * Prevent launch if 1st time on dashboard
 */
export const dashLimit = () => {
  try {
    var dash = false,
      run = true; // Get url

    window.location.pathname === config.hitOn2nd && (dash = true);

    if (dash) {
      try {
        // Check if session var exist
        var exist = window.sessionStorage.getItem("dashLimit") || null;

        if (exist === null) {
          window.sessionStorage.setItem("dashLimit", true);
          run = false;
        }
      } catch (e) {
        clg(config.desc + " dashLimit: " + e, "red");
      }
    }
    return run;
  } catch (e) {
    clg(config.desc + " dashboard: " + e, "red");
  }
};

/** -----------------------------------------
 ** Destroy instance
 * ------------------------------------------
 * Remove wheelock instance
 */
config.destroy = () => {
  try {
    document.getElementById(config.elementID).remove();
    delete window.wheelock[config.title];
    clg("Wheelock Survey has been removed");
  } catch (e) {
    clg(config.desc + " dashboard: " + e, "red");
  }
};

/** -----------------------------------------
 ** Check for ES Page
 * ------------------------------------------
 * Verify on ES page
 * @return bool
 */
export const isES = () => {
  try {
    if (config.event.useES) {
      if (window.location.pathname.startsWith("/es/")) return true;
      if (window.location.pathname.startsWith("/es_US/")) return true;

      const es = document.getElementById("flyout-localLnk") || null;
      if (es.innerHTML === config.spanishID) return true;
      else return false;
    } else return false;
  } catch (e) {
    clg(config.desc, "is ES: " + e, "red");
    return false;
  }
};

/** -----------------------------------------
 ** Check for 404
 * ------------------------------------------
 * Initiate launch code
 * Check if on valid urls
 * @return bool
 */
export const check404 = () => {
  try {
    if (config.event.missingPageResponse) {
      return (
        window.dataLayerInternal &&
        window.dataLayerInternal.unknownErrorCode === "404"
      );
    } else return false;
  } catch (e) {
    clg(config.desc, " 404 check: " + e, "red");
    return false;
  }
};

/** -----------------------------------------
 ** Run Survey
 * ------------------------------------------
 * Initiate launch code
 * Check if on valid urls
 * @return bool
 */
export const runSurvey = () => {
  try {
    if (config.urlsToAvoid.includes(window.location.pathname)) {
      clg(config.desc + " run: " + false, "orange");
      return false;
    } else {
      config.event.dashLimit ? (config.run = dashLimit()) : (config.run = true);
      clg(config.desc + " run: " + config.run, "green");
      return config.run;
    }
  } catch (e) {
    clg(config.desc, " run survey: " + e, "red");
    return false;
  }
};

/** -----------------------------------------
 ** Stop In Moment Popup
 * ------------------------------------------
 * Remove element if on page
 */
export const stopInMoment = () => {
  try {
    if (config.event.stopInMoment) {
      setTimeout(() => {
        clg(config.desc + " Removing inMoment object", "red");
        if (window.McxSiteInterceptOnExit) delete window.McxSiteInterceptOnExit;
      }, 2500);
    }
  } catch (e) {
    clg(config.desc + " stop InMoment: " + e, "red");
  }
};

/** -----------------------------------------
 ** Get Page Value
 * ------------------------------------------
 * Determine if deep enough to run
 * Determine if percentage needs to be upgraded
 * @return bool
 */
export const getPages = () => {
  try {
    if (config.event.pages) {
      const page = window.history.length;
      clg(config.desc + " Page: " + page, "orange");
      // Run with standard chance
      if (page >= config.startPage && page < config.increasedChance) {
        return true;
      }
      // Run with higher chance
      if (page >= config.increasedChance) {
        config.percentage = config.increasedPercentage;
        clg(config.desc + " chance increased");
        return true;
      }
      return false;
    }
    return true;
  } catch (e) {
    clg(config.desc + " pages: " + e, "red");
  }
};

/** -----------------------------------------
 ** Session check
 * ------------------------------------------
 * Determine if survey has launched
 *  this session
 * @param {string} item default historyValue
 * @return bool
 */
export const getSession = (item = config.historyValue) => {
  try {
    return window.sessionStorage.getItem(item) || null;
  } catch (e) {
    clg(config.desc + " Session error: " + e, "red");
  }
};

/** -----------------------------------------
 ** Local check
 * ------------------------------------------
 * Determine if survey has launched
 *  within daysExpired
 * @param {number} now
 * @return bool
 */
export const getLocal = (now) => {
  try {
    const local = window.localStorage.getItem(config.historyValue);
    if (local > now) return local;
    window.localStorage.removeItem(config.historyValue);
  } catch (e) {
    clg(config.desc + " storage error: " + e, "red");
    return;
  }
  return null;
};

/** -----------------------------------------
 ** Set local and session storages
 * ------------------------------------------
 * Prevents additional firing on
 *  device/browser
 * @param {number} time current time
 * @param {number} expiring expiring *
 */
export const setHistory = (time, expiring, override) => {
  try {
    if (override || window.wheelock[config.title].event.setHistory) {
      window.sessionStorage.setItem(config.historyValue, time);
      window.localStorage.setItem(config.historyValue, expiring);
    } else {
      window.wheelock[config.title].history.time = time;
      window.wheelock[config.title].history.expiring = expiring;
    }
  } catch (e) {
    clg(config.desc + " error: " + e, "red");
  }
};

/** -----------------------------------------
 ** Start launch process
 * -------------------------------------------
 * Determines if run = true & pages = true
 * before attempting to launch survey
 * @param {boolean} run
 */
export const launchPopup = async (override) => {
  try {
    // If dice is disabled set % to 100
    !window.wheelock[config.title].event.dice &&
      (window.wheelock[config.title].percentage = 100);
    if (override || getPages(window.wheelock[config.title].startPage)) {
      let now = new Date();
      let expire = new Date();

      expire.setDate(now.getDate() + window.wheelock[config.title].daysExpire);
      now = now.getTime();
      expire = expire.getTime();

      const session = getSession();
      const local = getLocal(now);
      const random = Math.floor(100 * Math.random() + 1);

      clg(
        config.desc +
          " status: Session: " +
          (session ? true : false) +
          " | Local: " +
          (local ? true : false) +
          " | Dice: " +
          random,
        "green"
      );
      if (
        override ||
        (!session &&
          !local &&
          random <= window.wheelock[config.title].percentage)
      ) {
        if (!override) {
          window.wheelock[config.title].triggeredState !== "forced" &&
            (window.wheelock[config.title].triggeredState = "auto");
        }
        return await popupTimer(now, expire, override);
      }
    }
  } catch (e) {
    clg(config.desc, " Error: " + e, "red");
  }
};

/** -----------------------------------------
 ** Display survey / start timer
 * ------------------------------------------
 * @param {number} time current time
 * @param {number} expiring expiring
 */
export const popupTimer = async (time, expiring, override) => {
  try {
    // If timer is on run it first
    if (!override && window.wheelock[config.title].event.timer) {
      clg(config.desc + " timer started", "green");
      return await new Promise((resolve) =>
        setTimeout(() => {
          setHistory(time, expiring);
          launchAnalytics();
          getIP();
          clg(config.desc + " popup launched!");
          resolve(true);
          return true;
        }, config.timer)
      );
    } else {
      window.wheelock[config.title].triggeredState === "" &&
        (window.wheelock[config.title].triggeredState = "manual");
      setHistory(time, expiring);
      launchAnalytics();
      getIP();
      clg(config.desc + " popup launched!");
      return true;
    }
  } catch (e) {
    clg(config.desc + " Error: " + e, "red");
    return true;
  }
};

/** -----------------------------------------
 ** Force survey to launch without a timer
 * ------------------------------------------
 * @param {string} trigger
 */
export const forcePopup = (trigger) => {
  try {
    const launched = window.sessionStorage.getItem(config.historyValue);
    if (!launched) {
      window.sessionStorage.removeItem(config.historyValue);
      window.localStorage.removeItem(config.historyValue);
      window.wheelock[config.title].triggeredState = trigger;
      return true;
    } else return false;
  } catch (e) {
    clg(config.desc + " Error: " + e, "red");
    return false;
  }
};

/** -----------------------------------------
 ** Auto hide form on submit
 * ------------------------------------------
 * Hide survey after timer expires
 *  on submission
 */
export const autoHide = async (timer) => {
  if (window.wheelock[config.title].event.autoHide) {
    return await new Promise((resolve) =>
      setTimeout(() => resolve(true), timer ? timer : config.closeTimer)
    );
  }
  return false;
};

/** -----------------------------------------
 ** Hide Feedback button
 * ------------------------------------------
 * Hide on resize if below maxScreen
 * @return {bool}
 */
export const onresize = () => {
  try {
    var w = config.screen.width;
    if (w >= config.maxScreen) {
      return;
    }
    if (w < config.maxScreen) {
      return false;
    }
  } catch (e) {
    clg(config.desc + " Error: " + e, "red");
  }
};

/** -----------------------------------------
 ** Get user ip address from
 * ------------------------------------------
 * https://ifconfig.co/ip
 *
 * PHP grabs ip behind load balancer rendering incorrect ip
 * This method gets more accurate ip
 */
export const getIP = async () => {
  try {
    const ip = await publicIp.v4({
      fallbackUrls: ["https://ifconfig.co/ip"],
    });
    window.wheelock[config.title].ipAddress = ip;
    return ip;
  } catch (e) {
    clg(config.desc + " IP Error: " + e, "red");
  }
};

/** -----------------------------------------
 ** Get token
 * ------------------------------------------
 * @return {string} tokenName
 */
export const getToken = () => {
  try {
    return window.sessionStorage.getItem(config.tokenName);
  } catch (e) {
    clg(config.desc + " get token error: " + e, "red");
  }
};

/** -----------------------------------------
 ** Get device
 * ------------------------------------------
 * @return {string} desktop | tablet | mobile
 */
export const getDevice = () => {
  try {
    const width = window.screen.width;
    window.wheelock[config.title].device =
      width > 768 ? "desktop" : width > 425 ? "tablet" : "mobile"; // Current screen size
    return window.wheelock[config.title].device; // Current screen size
  } catch (e) {
    clg(config.desc + " Device error: " + e, "red");
  }
};

/** -----------------------------------------
 ** Get CA #
 * ------------------------------------------
 * @return {string} caNumber
 */
export const getCaNumber = () => {
  try {
    if (window.dataLayerInternal) {
      window.dataLayerInternal.caNumber &&
        (config.caNumber = window.dataLayerInternal.caNumber);
    }

    if (window.dataLayer) {
      window.dataLayer.ca_number &&
        config.caNumber === null &&
        (config.caNumber = window.dataLayer.ca_number);
    }
    return config.caNumber;
  } catch (e) {
    clg(config.desc + " CA error: " + e, "red");
  }
};

/** -----------------------------------------
 ** Get Adobe Id
 * ------------------------------------------
 * @return {string} analyticsId
 */
export const getAnalyticsId = () => {
  try {
    config.analyticsId = localStorage.getItem("analyticsVisitorId") || null;
    !config.analyticsId && window.s && (config.analyticsId = window.s.eVar5);
    return config.analyticsId;
  } catch (e) {
    clg(config.desc + " CA error: " + e, "red");
  }
};

/** -----------------------------------------
 ** Get cookie
 * ------------------------------------------
 * Find cookie by name and return value
 * @param {string} name
 * @return {string} match
 */
const getCookie = (name) => {
  try {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );

    if (match) {
      return match[2];
    } else {
      return null;
    }
  } catch (e) {
    clg(config.desc + " cookie: " + e, "red");
  }
};

/** -----------------------------------------
 ** Get Content Square ID
 * -------------------------------------------
 * @return {string} caNumber
 */
export const getContentSquare = () => {
  try {
    try {
      var isRecording = window._uxa.push(["isRecording"]);
      if (isRecording) {
        var uxaGet = window._uxa.push(["getSessionData"]);

        if (uxaGet && uxaGet.projectId) {
          var pid = uxaGet.projectId;
          var uu = uxaGet.userId;
          var sn = uxaGet.sessionNumber;
          var pvid = uxaGet.pageNumber;

          if (pid && uu && sn && pvid) {
            config.sessionID =
              "https://app.contentsquare.com/quick-playback/index.html?pid=" +
              pid +
              "&uu=" +
              uu +
              "&sn=" +
              sn +
              "&pvid=" +
              pvid +
              "&recordingType=cs&vd=fs";
          }
        }
        return config.sessionID;
      }
    } catch (e) {
      let cs = getCookie("_cs_id") || null;
      if (cs) {
        cs = cs.split(".");
        config.sessionID = cs[0].substring(1);
      }
      return config.sessionID;
    }
  } catch (e) {
    console.log("Cookie Error: " + e);
  }
};

/** -----------------------------------------
 ** Get Session variables
 * -------------------------------------------
 */
export const getSessions = async () => {
  try {
    const session = {};
    session.triggered = window.wheelock[config.title].triggeredState;
    session.performanceId = window.sessionStorage.getItem("rxVisitor") || null;
    session.sessionIP = await getIP();
    session.currentUrl = window.location.href || null;
    session.previousUrl = document.referrer || null;
    session.token = getToken();
    session.device = getDevice();
    config.capture.caNumber && (session.caNumber = getCaNumber());
    config.capture.analyticsId && (session.analyticsId = getAnalyticsId());
    config.capture.contentSquare && (session.sessionId = getContentSquare());
    return session;
  } catch (e) {
    clg(config.desc + " session error: " + e, "red");
  }
};

/** -----------------------------------------
 ** Detect rage clicks
 * ------------------------------------------
 * Detect if user has clicked more than
 *  specified time within a second
 * - Place inside event listener to run
 */
export const rageClicks = () => {
  try {
    if (config.event.rageClicks && window.wheelock) {
      //@ Don't launch if session already launched
      if (getSession()) return false;
      let now = new Date();
      let previous = new Date();
      now = now.getTime();
      previous.setMilliseconds(-config.clicks.limit);
      previous = previous.getTime();

      let total = window.wheelock[config.title].clicks.total;
      let lastClick = window.wheelock[config.title].clicks.last;

      //# Launch popup if clicks hit max
      if (total >= config.clicks.max) {
        window.wheelock[config.title].clicks.total = 0;
        window.wheelock[config.title].clicks.last = null;
        clg(config.desc + " rage clicks launch!", "orange");
        return true;
      }

      if (lastClick) {
        if (lastClick > previous) {
          window.wheelock[config.title].clicks.total = ++total;
        } else {
          window.wheelock[config.title].clicks.total = 0;
          window.wheelock[config.title].clicks.last = null;
        }
      } else {
        window.wheelock[config.title].clicks.last = now;
      }
    }
    return false;
  } catch (e) {
    clg(config.desc + " rage clicks error: " + e, "red");
  }
};

/** -----------------------------------------
 ** Detect rage scrolls
 * ------------------------------------------
 * Detect if user has scrolled from top to
 *  bottom of page a certain amount of times.
 * - Place inside event listener to run
 */
export const rageScrolls = () => {
  try {
    if (config.event.rageScrolls && window.wheelock) {
      //@ Don't launch if session already launched
      if (getSession()) return false;
      const { scrolls } = window.wheelock[config.title];
      let pageTop = scrolls.top;
      let pageBottom = scrolls.bottom;

      // Get page top
      if (pageBottom === pageTop && window.pageYOffset === 0) {
        scrolls.top = ++pageTop;
      }

      // Get page bottom
      if (
        window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight
      ) {
        pageTop > pageBottom && (scrolls.bottom = ++pageBottom);
      }

      if (pageBottom >= scrolls.max) {
        scrolls.top = 0;
        scrolls.bottom = 0;
        clg(config.desc + " rage scrolls launch!", "orange");
        return true;
      }
      return false;
    }
    return false;
  } catch (e) {
    clg(config.desc + " rage scrolls error: " + e, "red");
  }
};

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
