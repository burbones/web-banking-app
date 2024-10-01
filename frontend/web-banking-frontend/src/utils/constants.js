import {
    FiHome,
    FiLogOut,
  } from 'react-icons/fi';

import { FaMoneyBillTransfer } from 'react-icons/fa6';
import { setUser } from '../authSlice.js';
import axios from 'axios';

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

const SERVER_PREFIX = "api/v1";

export const SERVER_LOGIN_URL = getBaseServerURL() + SERVER_PREFIX + LOGIN_URL;
export const SERVER_SIGN_UP_URL = getBaseServerURL() + SERVER_PREFIX + SIGNUP_URL;
export const SERVER_CODE_CHECK_URL = SERVER_SIGN_UP_URL + "/verifyCode";
export const SERVER_DASHBOARD_URL = getBaseServerURL() + SERVER_PREFIX + DASHBOARD_URL;
export const SERVER_TRANSACTION_URL = getBaseServerURL() + SERVER_PREFIX + TRANSFERS_URL;
export const SERVER_LOGOUT_URL = getBaseServerURL() + SERVER_PREFIX + "/logout";

function logout(dispatch, token) {
    axios.delete(SERVER_LOGOUT_URL, {
      headers: {
        'Authorization': 'Bearer ' + token
      },
    });
  
    dispatch(setUser({user: "", token: ""}));
}

export const userSidebarItems = [
    { name: 'Dashboard', icon: FiHome, to: DASHBOARD_URL },
    { name: 'Transfer money', icon: FaMoneyBillTransfer, to: TRANSFERS_URL },
    { name: 'Log out', icon: FiLogOut, to: LOGIN_URL, handleClick: logout },
];

export const adminSidebarItems = [
    
];