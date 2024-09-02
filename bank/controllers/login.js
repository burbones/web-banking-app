const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User.js');

const { secretKey } = require('../constants/constants.js');
const Errors = require('../constants/errors.js');
const timeToExpireJWT = "1h";

const login = async (req, res) => {
    try {
        const curUser = await User.findOne({ email: req.body.email });

        if (!curUser || !curUser.isActive) {
            return res.status(401).json({error: Errors.INVALID_CREDENTIALS});
        }

        const hashesMatch = await bcrypt.compare(req.body.password, curUser.hashedPassword);
        if (!hashesMatch) {
            res.status(401).json({error: Errors.INVALID_CREDENTIALS});
        } else {
            const token = jwt.sign({email: curUser.email}, secretKey, { expiresIn: timeToExpireJWT});
            res.status(200).json(token);
        }

    } catch (error) {
        res.status(500).json({ error: Errors.SERVER_ERROR });
    }
}

module.exports = {
    login
};