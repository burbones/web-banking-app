const express = require('express');
require('dotenv').config();
const signup = require('./routes/signup');
const login = require('./routes/login');
const logout = require('./routes/logout');
const dashboard = require('./routes/dashboard');
const transaction = require('./routes/transaction');
const transactions = require('./routes/transactions');
const users = require('./routes/users');
const connectDB = require('./db_connection');
const initAuthorizationSchema = require('./create-schema');
const addAdmin = require('./add-admin');

const app = express();
const serverPort = process.env.SERVER_PORT || 3001;
const mongoURI = process.env.MONGO_URI;

const cors = require('cors');
const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'DELETE'],
};
app.use(cors(corsOptions));

// app.use(express.static('public'));

const logger = require('./utils/logger');

const baseURL = "/api/v1";

app.use(express.json());

app.use(baseURL + "/signup", signup);
app.use(baseURL + "/login", login);
app.use(baseURL + "/logout", logout);
app.use(baseURL + "/dashboard", dashboard);
app.use(baseURL + "/transaction", transaction);
app.use(baseURL + "/users", users);
app.use(baseURL + "/transactions", transactions);

const start = async () => {
    try {
        await connectDB(mongoURI);
        logger.info("MongoDB is now running");

        await initAuthorizationSchema();
        try {
            await addAdmin();
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
        
        logger.info("Authorization system is on");

        app.listen(serverPort, () => {
            logger.info(`The server is listening on port ${serverPort}`);
        });
    } catch (error) {
        logger.fatal(error);
    }
}

start();