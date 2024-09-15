function getBaseServerURL() {
    return `${document.location.protocol}//${document.location.hostname}:3001/`;
}

export const baseURL = getBaseServerURL();

export const LOGIN = "login";
export const SIGN_UP = "signup";
export const DASHBOARD = "dashboard";
export const TRANSACTION = "transaction";

export const SIGNUP_URL = "/signup";
export const LOGIN_URL = "/login";
export const DASHBOARD_URL = "/dashboard";
export const TRANSFERS_URL = "/transaction";

export const SERVER_LOGIN_URL = getBaseServerURL() + "api/v1" + LOGIN_URL;
export const SERVER_SIGN_UP_URL = getBaseServerURL() + "api/v1" + SIGNUP_URL;
export const SERVER_CODE_CHECK_URL = SERVER_SIGN_UP_URL + "/verifyCode";
export const SERVER_DASHBOARD_URL = getBaseServerURL() + "api/v1" + DASHBOARD_URL;
export const SERVER_TRANSACTION_URL = getBaseServerURL() + "api/v1" + TRANSFERS_URL;