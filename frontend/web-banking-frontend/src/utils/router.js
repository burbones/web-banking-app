import { createBrowserRouter } from "react-router-dom";

import { LOGIN, SIGN_UP, DASHBOARD, TRANSACTION }
   from "./constants";

import App from "../App";
import Welcome from "../components/Welcome";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
import Transaction from "../components/Transaction";
import ErrorPage from "../components/ErrorPage";

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
            }
        ]
    }
])