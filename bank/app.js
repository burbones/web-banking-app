const express = require('express');
require('dotenv').config();
const signup = require('./routes/signup');
const login = require('./routes/login');
const logout = require('./routes/logout');
const dashboard = require('./routes/dashboard');
const transaction = require('./routes/transaction');
const connectDB = require('./db_connection');

const app = express();
const serverPort = process.env.SERVER_PORT || 3000;
const mongoURI = process.env.MONGO_URI;

const baseURL = "/api/v1";

app.use(express.json());

app.use(baseURL + "/signup", signup);
app.use(baseURL + "/login", login);
app.use(baseURL + "/logout", logout);
app.use(baseURL + "/dashboard", dashboard);
app.use(baseURL + "/transaction", transaction);

const start = async () => {
    try {
        await connectDB(mongoURI);
        console.log("MongoDB is now running");

        app.listen(serverPort, () => {
            console.log(`The server is listening on port ${serverPort}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();