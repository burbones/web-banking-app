const Transaction = require('../models/Transaction.js');
const User = require('../models/User.js');

const getDashboard = async (req, res) => {
    const curUser = await User.findOne({ email: req.email });
    const transactions = await Transaction.find( {$or: [{ issuer: req.email},
         {acquirer: req.email}]},
         { _id: 0, type: 1, amount: 1, issuer: 1, acquirer: 1, timestamp: 1});

    res.status(200).json({
        balance: parseFloat(curUser.balance) / 100,
        transactions: transactions
    });
}

module.exports = {
    getDashboard
};