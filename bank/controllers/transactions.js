const Transaction = require('../models/Transaction');
const Errors = require('../constants/errors');

const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json({transactions});
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: Errors.SERVER_ERROR });
    }
};

module.exports = {
    getTransactions
}