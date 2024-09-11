const Transaction = require('../models/Transaction.js');
const User = require('../models/User.js');

const getDashboard = async (req, res) => {
    /*const { page, limit } = req.query;*/
    const page = 1;
    const limit = 2;

    const curUser = await User.findOne({ email: req.email });
    
    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        projection: { _id: 0, type: 1, amount: 1, issuer: 1, acquirer: 1, timestamp: 1 },
        sort: { timestamp: -1 },
    };
    
    const transactions = await Transaction.paginate( {$or: [{ issuer: req.email},{acquirer: req.email}]}, options );

    console.log(transactions.docs);

    res.status(200).json({
        balance: parseFloat(curUser.balance) / 100,
        transactions: transactions.docs
    });
}

module.exports = {
    getDashboard
};