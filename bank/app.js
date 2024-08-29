const express = require('express');
const signup = require('./routes/signup');
const login = require('./routes/login');
const logout = require('./routes/logout');
const dashboard = require('./routes/dashboard');
const transaction = require('./routes/transaction');
const connectDB = require('./db_connection');

const app = express();
const SERVER_PORT = 3000;
const DB_PORT = 27017;
const MONGO_URI = "mongodb://localhost:" + DB_PORT + "/bank";

const baseURL = "/api/v1";

app.use(express.json());

app.use(baseURL + "/signup", signup);
app.use(baseURL + "/login", login);
app.use(baseURL + "/logout", logout);
app.use(baseURL + "/dashboard", dashboard);
app.use(baseURL + "/transaction", transaction);

const start = async () => {
    try {
        await connectDB(MONGO_URI);
        console.log("MongoDB is now running");

        app.listen(SERVER_PORT, () => {
            console.log(`The server is listening on port ${SERVER_PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();
