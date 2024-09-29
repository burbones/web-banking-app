const Transaction = require('../models/Transaction.js');
const User = require('../models/User.js');
const logger = require('../utils/logger.js');

const getDashboard = async (req, res) => {
    let { page, limit, periodStart } = req.query;

    console.log(page);
    
    page = page ? page : 1;
    limit = 10;
    periodStart = periodStart ? periodStart : 0;

    const curUser = await User.findOne({ email: req.email });
    
    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        projection: { _id: 0, type: 1, amount: 1, issuer: 1, acquirer: 1, timestamp: 1 },
        sort: { timestamp: -1 },
    };

    try {
        const transactions = await Transaction.paginate( {$or: [{issuer: req.email},{acquirer: req.email}], timestamp: {$gte: Date.parse(periodStart)}}, options );

        res.status(200).json({
            balance: parseFloat(curUser.balance) / 100,
            transactions: transactions.docs
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: Errors.SERVER_ERROR });
    }
}

module.exports = {
    getDashboard
};