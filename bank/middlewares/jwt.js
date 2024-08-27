const jwt = require('jsonwebtoken');
const { secretKey } = require('../constants/constants.js');

const verifyToken = (req, res, next) => {
    let token = req.header('Authorization');
    
    if (!token) {
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