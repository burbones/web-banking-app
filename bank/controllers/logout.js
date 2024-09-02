const Errors = require("../constants/errors.js");
const Blacklist = require("../models/Blacklist.js");

const logout = async (req, res) => {
    try {
        let token = req.header('Authorization');
        const isBlacklisted = await Blacklist.findOne({token: token});
        if (isBlacklisted) {
            return res.sendStatus(204);
        }
    
        const newBlacklist = new Blacklist({
            token: token
        });
    
        await newBlacklist.save();
    
        res.status(200).json({ message: "You are logged out!" });
    } catch (error) {
        res.status(500).json({ error: Errors.SERVER_ERROR});
    }

};

module.exports = {
    logout,
};