const { users } = require('../data.js');

const login = (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ error: "Internal server error"})
    }
}

module.exports = {
    login
};