const User = require('../models/User');
const Errors = require('../constants/errors');
const logger = require('../utils/logger');

const getUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ email: 'ascending' });
        res.status(200).json({users});
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: Errors.SERVER_ERROR });
    }
}

const deleteUser = async (req, res) => {
    let { email } = req.query;

    try {
        const usersDeleted = (await User.deleteOne({ email })).deletedCount;
        res.status(200).json({message: "Successful operation, users deleted: " + usersDeleted});
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: Errors.SERVER_ERROR });
    }
}

module.exports = {
    getUsers,
    deleteUser,
}