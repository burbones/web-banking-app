const { users } = require('../data.js');

const getDashboard = (req, res) => {
    res.status(200).json({
        balance: users.get(req.email).balance,
        transactions: []
    });
}

module.exports = {
    getDashboard
};