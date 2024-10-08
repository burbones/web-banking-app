const Transaction = require('../models/Transaction');
const Errors = require('../constants/errors');
const { getDashboard } = require('./dashboard');

const getTransactions = async (req, res) => {
    let { user } = req.query;

    if (!user) {
        try {
            const transactions = await Transaction.find().sort({timestamp: 'desc', issuer: 'asc'});
            res.status(200).json({transactions});
        } catch (error) {
            logger.error(error);
            res.status(500).json({ error: Errors.SERVER_ERROR });
        }
    }

    else {
        req.email = user;
        await getDashboard(req, res);
    }
};

module.exports = {
    getTransactions
}