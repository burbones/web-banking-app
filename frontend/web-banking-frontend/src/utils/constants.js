function getBaseURL() {
    return `${document.location.protocol}//${document.location.hostname}:8080/`;
}

export const baseURL = getBaseURL();

export const LOGIN = "login";
export const SIGN_UP = "signup";
export const DASHBOARD = "dashboard";
export const TRANSACTION = "transaction";

export const SIGNUP_URL = "/signup";