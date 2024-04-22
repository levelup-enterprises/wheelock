//* Create instance
const config = {
  // -----------------------------------------------------------
  //# Project Descriptions
  // -----------------------------------------------------------
  title: "primary", // Name of nested object inside wheelock global object
  elementID: "wheelock-inject", // Name of div to inject into
  desc: "Wheelock Survey", // Description for console messages
  jwt: "wheelock-jwt", // JWT session token name
  historyValue: "wheelock-launched", // Local & session name
  tokenName: "wheelock-token", // Token name
  // -----------------------------------------------------------
  //# Assets & APIs
  // -----------------------------------------------------------
  logoImg: process.env.REACT_APP_DOMAIN + "app/assets/images/reliant-logo.png",
  hugoImg: process.env.REACT_APP_DOMAIN + "app/assets/images/reliant-hugo.png",
  closeImg:
    process.env.REACT_APP_DOMAIN + "app/assets/images/reliant-close.png",
  postApi: process.env.REACT_APP_DOMAIN + "api/v3/",
  endpoint: "post/reliant/web/en",
  altEndpoint: "post/reliant/web/es",
  // -----------------------------------------------------------
  //# Triggers
  // -----------------------------------------------------------
  // Enable functions
  event: {
    rageClicks: true, // Detect rage click events
    rageScrolls: true, // Detect rage scroll events
    pages: true, // Fire after # of pages deep
    timer: true, // Start timer on run initiation
    dice: true, // Run dice to determine form run
    autoHide: true, // Auto hide form after submission
    setHistory: true, // Auto set history sessions
    responses: false, // Change form elements based on answers
    dashLimit: false, // Fire on dashboard after 2nd visit
    userToken: true, // Token created per session to identify user
    useES: true, // Use Spanish form on ES pages
    stopInMoment: false, // Prevent InMoment popup
    missingPageResponse: true, // Alter survey on 404 pages
  },
  capture: {
    adobeAnalytics: true,
    contentSquare: true,
    caNumber: true,
  },
  // -----------------------------------------------------------
  //# Global Variables
  // -----------------------------------------------------------
  timer: 30000, // Show popup after run initiated
  closeTimer: 5000, // Close survey after submit
  startPage: 5, // Pages deep before running popup
  increasedChance: 10, // Pages deep before updating chance
  percentage: 30, // % that popup will launch
  increasedPercentage: 50, // % updated for launch
  daysExpire: 45, // Expire session var for relaunch
  maxScreen: 800, // Max width to display feedback button
  spanishID: "In English", // Verify not Spanish
  hitOn2nd: "/protected/myAccount.htm", // Do not launch on 1st visit to this page
  urlsToAvoid: [
    "/bmfSSApp/protected/am/mfselectaddress.htm",
    "/bmfSSApp/protected/am/prelogin.htm",
    "emailusFormSubmitAction.htm",
    "/en/residential/electricity/electricity-plans/electricity-plans-logged-in/renew-or-change-plans.jsp",
    "/en/public/kiosk.jsp",
    "/en/residential/electricity/index.jsp",
    "/en/residential/electricity/electricity-plans/index.jsp",
    "/en/residential/electricity/electricity-plans/electricity-plans.jsp",
    "/en/public/reliant-local-solar-plan.jsp",
    "/en/public/reliant-pick-your-free.jsp",
    "/en/residential/electricity/pick-your-free.jsp",
    "/en/public/reliant-truly-free-nights-plan.jsp",
    "/en/private/deeplink/existing-customer-referral.jsp",
    "/en/residential/customer-care/experience-life-switched-on.jsp",
    "/en/public/truly-free-weekends-google-home-hub.jsp",
    "/en/public/truly-free-nights-google-home-hub.jsp",
    "/en/public/reliant-cowboys-secure-advantage-plan.jsp",
    "/en/residential/ac-and-heat/services-contact-form.jsp",
    "/en/public/choose-reliant-search-and-display-generic-v2.jsp",
    "/en/private/landingpages/reliant-blend-and-extend-generic-ret.jsp",
    "/en/residential/shop/electricity-plans/electricity-plans-logged-in/renew-or-change-plans.jsp",
    "/en/residential/shop/electricity-plans/electricity-plans-logged-in/renew-or-change-plans.jsp",
    "/en/residential/security/current-customers/account-log-in.jsp",
    "/es/residential/electricity/electricity-plans/electricity-plans-logged-in/renew-or-change-plans.jsp",
    "/es/public/kiosk.jsp",
    "/es/residential/electricity/index.jsp",
    "/es/residential/electricity/electricity-plans/index.jsp",
    "/es/residential/electricity/electricity-plans/electricity-plans.jsp",
    "/es/public/reliant-local-solar-plan.jsp",
    "/es/public/reliant-pick-your-free.jsp",
    "/es/residential/electricity/pick-your-free.jsp",
    "/es/public/reliant-truly-free-nights-plan.jsp",
    "/es/private/deeplink/existing-customer-referral.jsp",
    "/es/residential/customer-care/experience-life-switched-on.jsp",
    "/es/public/truly-free-weekends-google-home-hub.jsp",
    "/es/public/truly-free-nights-google-home-hub.jsp",
    "/es/public/reliant-cowboys-secure-advantage-plan.jsp",
    "/es/residential/ac-and-heat/services-contact-form.jsp",
    "/es/public/choose-reliant-search-and-display-generic-v2.jsp",
    "/es/private/landingpages/reliant-blend-and-extend-generic-ret.jsp",
    "/es/residential/shop/electricity-plans/electricity-plans-logged-in/renew-or-change-plans.jsp",
    "/es/residential/shop/electricity-plans/electricity-plans-logged-in/renew-or-change-plans.jsp",
    "/es/residential/security/current-customers/account-log-in.jsp",
    "/fps/Forgot",
    "/protected/crisisOptions/dashboardLanding.htm",
    "/protected/requestpayextension.htm",
    "/protected/electricAccounts.htm",
    "/protected/chooseAutoPay.htm",
    "/protected/addSecurityQuestion.htm",
    "/protected/confirmAutoPay.htm",
    "/protected/confirmpayment.htm",
    "/protected/tosLanding.htm",
    "/protected/choosePaybill.htm",
    "/protected/verifyPay.htm",
    "/protected/confirmPay.htm",
    "/protected/mybill.htm",
    "/protected/paybill.htm",
    "/protected/paybillStore.htm",
    "/protected/myAccount.htm",
    "/protected/primaryCallHandler.htm",
    "/protected/initiateswapfrommulticacopage.htm",
    "/protected/ssswapsubmit.htm",
    "/protected/swapplandetails.htm",
    "/protected/swapsubmit.htm",
    "/protected/swapverify.htm",
    "/protected/tosproductselection.htm",
    "/protected/tosstarttos.htm",
    "/protected/tossubmitnewaddress.htm",
    "/protected/tossubmitotherservices.htm",
    "/protected/validateAddCA.htm",
    "/protected/importantMessages.htm",
    "/protected/tos.newaddress",
    "/protected/tos.no.service",
    "/protected/tosproductchart.htm",
    "/protected/swapproductchart.htm",
    "/protected/myplan.htm",
    "/protected/myplanFlyout.htm",
    "/protected/swapproductchart.htm",
    "/protected/initiateSwapFromMultiCaCoPage.htm",
    "/protected/primaryCallHandler.htm",
    "/protected/lp.htm",
    "/protected/swapplandetails.htm",
    "/protected/swapverify.htm",
    "/protected/swapeplan.htm",
    "/protected/swapSubmit.htm",
    "/protected/ssSwapSubmit.htm",
    "/protected/swapproductchart.htm",
    "/protected/initiateSwapFromMultiCaCoPage.htm",
    "/protected/primaryCallHandler.htm",
    "/protected/eplan_swap.htm ",
    "/protected/swapeplan.htm",
    "/protected/swapSubmit.htm",
    "/protected/billing/viewPreviousBills.htm",
    "/protected/pay_bill_interim.htm",
    "/protected/makeBillPayment.htm",
    "/protected/myProfile.htm",
    "/protected/myProfileFlyout.htm",
    "/public/dl.htm",
    "/public/holds-summary.htm",
    "/public/holds-lookup.htm",
    "/public/securityQuestions.htm",
    "/public/signUp.htm",
    "/public/fps/lock.htm",
    "/public/forgotUserName.htm",
    "/public/processSignUpDetails.htm",
    "/public/serviceaddresscheck.htm",
    "/public/checkDeposit.htm",
    "/public/submitEnrollment.htm",
    "/public/search.htm",
    "/public/verify.htm",
    "/public/processSignUpDetails.htm",
    "/public/oamRegtCancelAcctSettings.htm",
    "/public/quickpaybillTkn.htm",
    "/public/altLogon.htm",
    "/public/moveBillEstimator.htm",
    "/public/invalidLogin.htm",
    "/public/makePayment.htm",
    "/public/getOffers.htm",
    "/public/quickPay.htm",
    "/public/fps/identify.htm",
    "/public/oamregistration.htm",
    "/public/signUp.htm",
    "/public/fps/verify.htm",
    "/public/loadNewEnroll.htm",
    "/public/quickpay_bill_interim.htm",
    "/public/processSignUpDetails.htm",
    "/public/verifyAccountDetails.htm",
    "/public/fps/confirmResetPassword.htm",
    "/public/checkDeposit.htm",
    "/public/startOEProcess.htm",
    "/public/forgotUserName.htm",
    "/public/verifyPersonalIdentificationDetails.htm",
    "/public/fps/passwordbyMail.htm",
    "/public/checkUsernameEmail.htm",
    "/public/oamAccountRegistration.htm",
    "/public/quickPay/validateAccount.htm",
    "/public/validateAccountDetails.htm",
    "/public/loadVerifyPayment.htm",
    "/public/fps/change.htm",
    "/public/mustUpdateSecretQuestions.htm",
    "/public/verify.htm",
    "/public/fps/confirm.htm",
    "/public/updateSecretQuestions.htm",
    "/public/unlockAccount_step1.htm",
    "/public/oneClickAMBSignUp.htm",
    "/public/oeoamAccountRegistration.htm",
    "/public/moveBillValidateAddress.htm",
    "/public/startOneClickSwap.htm",
    "/public/serviceaddresscheck.htm",
    "/public/enterPID.htm",
    "/public/processPosidRecheck.htm",
    "/public/startOneClickAMB.htm",
    "/public/changePWD.htm",
    "/public/fps/changePassword.htm",
    "/public/unlockStep4.htm",
    "/public/processSignUpDetails.htm",
    "/public/submitIdentityVerificationKba.htm",
    "/public/depositSmartStart.htm",
    "/public/getOffers.htm",
    "/public/getOCSwapOffer.htm",
    "/public/submitOCSwap.htm",
    "/public/getOCSwapOffer.htm",
    "/public/startM2Swap.htm",
    "/public/startM2Swap.htm",
    "/public/startOneClickSwap.htm",
    "/public/getOCSWAPoffer.htm",
    "/public/submitOCSwap.htm",
    "/public/getOffers.htm",
    "/public/comparePlans.htm",
    "/public/processPosidRecheck.htm",
    "/public/processIDOptions.htm",
    "/public/checkDeposit.htm",
    "/public/depositSmartStart.htm",
    "/public/ssPayment.htm",
    "/public/verifyIdentityPosidKba.htm",
    "/public/fps/resetPassword.htm",
    "/public/verifyAccountDetails.htm",
    "/oam.tos.products.chart",
    "/oam.tos.tosbillingoptions",
    "/oam.tos.transferdates",
    "/oam.tos.verify",
    "oe.productchart",
    "oe.signupservice",
    "oe.movestartdate",
    "oe.switchstartdate",
    "oe.creditcheckdeposit-singlepage",
    "oe.verification",
    "oe.whattodo",
    "oe.resProductChartTransaction",
    "oe.multitdsp",
    "oe.compareplans",
    "oe.smartstartinitialpayment",
    "oe.verifyccpayment",
    "oe.addresslander",
    "oe.productdetails",
    "oe.billingaddresscheck",
    "oe.autopaypayment",
    "swap.multi.account.selection",
    "swap.verification",
    "swap.leadoffer",
    "swap.productchart",
    "scheduleServices.htm",
    "/welcome.jsp",
    "verifyAccountDetails.htm",
  ],
  // -----------------------------------------------------------
  //# Default Declarations
  // -----------------------------------------------------------
  clicks: {
    // Rage click vars
    total: 0,
    last: null,
    limit: 1000,
    max: 6,
  },
  scrolls: {
    // Rage scrolls vars
    max: 4,
    top: 1,
    bottom: 0,
  },
  history: {
    time: "", // Default
    expiring: "", // Default
  },
  triggeredState: "", // Default
  sessionID: null, // Default
  caNumber: null, // Default
  clientIP: null, // Default
};
export default config;
