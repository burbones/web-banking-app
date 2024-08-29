const User = require('../models/User.js');
const Transaction = require('../models/Transaction.js');

const doTransaction = async (req, res) => {
    try {
        const issuer = await User.findOne({ email: req.email });

        if (req.body.type == "send") {
            const curBalance = issuer.balance;
            if (req.body.amount > curBalance) {
                return res.status(400).json( { error: "Not enough money" });
            }

            const acquirerEmail = req.body.user;
            const acquirer = await User.findOne({ email: acquirerEmail });

            if (!acquirer || !acquirer.isActive) {
                return res.status(404).json( { error: "No such user" });
            }

            await execute(issuer, acquirer, req.body);

            res.status(200).json( { message: "Successful transaction" });

        } else {
            return res.status(400).json( { error: "Incorrect data" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error"});
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