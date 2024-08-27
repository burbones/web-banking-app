/*  Storage substitution   */
const { users } = require('../data.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secretKey = require('crypto').randomBytes(32).toString('hex');
const timeToExpireJWT = "1h";

const login = async (req, res) => {
    try {
        const curUser = users.get(req.body.email);

        if (!curUser || !curUser.isActive) {
            return res.status(401).json({error: "Invalid credentials"});
        }

        const hashesMatch = await bcrypt.compare(req.body.password, curUser.hashedPassword);
        if (!hashesMatch) {
            res.status(401).json({error: "Invalid credentials"});
        } else {
            const token = jwt.sign({email: curUser.email}, secretKey, { expiresIn: timeToExpireJWT});
            res.status(200).json(token);
        }

    } catch (error) {
        res.status(500).json({ error: "Internal server error"});
    }
}

module.exports = {
    login
};