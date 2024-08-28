/*  Storage substitution   */
const { users } = require('../data.js');

const doTransaction = (req, res) => {
    try {
        if (req.body.type == "send") {
            const curBalance = users.get(req.email).balance;
            if (req.body.amount > curBalance) {
                return res.status(400).json( { error: "Not enough money" });
            }

            const userToSend = req.body.user;
            if (!users.has(userToSend) || !users.get(userToSend).isActive) {
                return res.status(404).json( { error: "No such user" });
            }

            /*  Execute transaction */
            const newStateSender = {...users.get(req.email), balance: curBalance - req.body.amount};
            users.set(req.email, newStateSender);

            const newStateReceiver = {...users.get(userToSend), 
                balance: users.get(userToSend).balance + req.body.amount};
            users.set(userToSend, newStateReceiver);

            res.status(200).json( { message: "Successful transaction" });

        } else {
            return res.status(400).json( { error: "Incorrect data" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error"});
    }
}

module.exports = {
    doTransaction
};