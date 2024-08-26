const express = require('express');
const signup = require('./routes/signup');
const login = require('./routes/login');
const logout = require('./routes/logout');
const dashboard = require('./routes/dashboard');
const transaction = require('./routes/transaction');

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`The server is listening on port ${port}`);
});

app.use('/signup', signup);
app.use('/login', login);
app.use('/logout', logout);
app.use('/dashboard', dashboard);
app.use('/transaction', transaction);
