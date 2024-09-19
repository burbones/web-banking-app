const User = require('../models/User.js');
const Transaction = require('../models/Transaction.js');
const Errors = require('../constants/errors.js');
const logger = require('../utils/logger.js');

const doTransaction = async (req, res) => {
    try {
        const issuer = await User.findOne({ email: req.email });

        if (req.body.type == "send") {
            const curBalance = issuer.balance;
            if (req.body.amount > curBalance) {
                return res.status(400).json( { error: Errors.NOT_ENOUGH_MONEY });
            }

            const acquirerEmail = req.body.user;
            const acquirer = await User.findOne({ email: acquirerEmail });

            if (!acquirer || !acquirer.isActive) {
                return res.status(404).json( { error: Errors.NO_USER });
            }

            await execute(issuer, acquirer, req.body);

            logger.info({issuer, acquirer}, "New transaction");
            res.status(200).json( { message: "Successful transaction" });

        } else {
            return res.status(400).json( { error: Errors.INCORRECT_DATA });
        }

    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: Errors.SERVER_ERROR });
    }
}

const execute = async (issuer, acquirer, data) => {
    issuer.balance -= data.amount;
    acquirer.balance += data.amount;

    const transaction = new Transaction({
        type: data.type,
        amount: data.amount,
        issuer: issuer.email,
        acquirer: acquirer.email,
    });

        await issuer.save();
        await acquirer.save();
        await transaction.save();
}

module.exports = {
    doTransaction
};