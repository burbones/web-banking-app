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

export const SERVER_LOGIN_URL = getBaseServerURL() + "api/v1" + LOGIN_URL;