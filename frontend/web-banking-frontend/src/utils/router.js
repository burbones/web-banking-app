import { createBrowserRouter } from "react-router-dom";

import { LOGIN, SIGN_UP, DASHBOARD, TRANSACTION, ADMIN_USERS, ADMIN_TRANSACTIONS }
   from "./constants";

import App from "../App";
import Welcome from "../components/Welcome";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
import Transaction from "../components/Transaction";
import ErrorPage from "../components/ErrorPage";
import Users from "../components/admin_components/Users";
import Transanctions from "../components/admin_components/Transactions";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <Welcome />
            },
            {
                path: LOGIN,
                element: <Login />
            },
            {
                path: SIGN_UP,
                element: <Signup />
            },
            {
                path: DASHBOARD,
                element: <Dashboard />
            },
            {
                path: TRANSACTION,
                element: <Transaction />
            },
            {
                path: ADMIN_USERS,
                element: <Users />
            },
            {
                path: ADMIN_TRANSACTIONS,
                element: <Transanctions />
            }
        ]
    }
])