const User = require('../models/User');
const Errors = require('../constants/errors');
const logger = require('../utils/logger');

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({users});
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: Errors.SERVER_ERROR });
    }
}

module.exports = {
    getUsers
}