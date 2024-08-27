const express = require('express');
const signup = require('./routes/signup');
const login = require('./routes/login');
const logout = require('./routes/logout');
const dashboard = require('./routes/dashboard');
const transaction = require('./routes/transaction');

const app = express();
const port = 3000;

const baseURL = "/api/v1";

app.listen(port, () => {
    console.log(`The server is listening on port ${port}`);
});

app.use(express.json());

app.use(baseURL + "/signup", signup);
app.use(baseURL + "/login", login);
app.use(baseURL + "/logout", logout);
app.use(baseURL + "/dashboard", dashboard);
app.use(baseURL + "/transaction", transaction);
