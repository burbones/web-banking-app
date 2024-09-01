const jwt = require('jsonwebtoken');
const { secretKey } = require('../constants/constants.js');

const Blacklist = require('../models/Blacklist.js');

const verifyToken = async (req, res, next) => {
    let token = req.header('Authorization');
    
    const isBlacklisted = await Blacklist.findOne({token: token});

    if (!token || isBlacklisted) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    token = token.replace("Bearer ", "");

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        req.email = decoded.email;
        next();
    });
};

module.exports = {
    verifyToken
};