const { Ajv } = require("ajv");
const ajv = new Ajv();

const transactionSchema = {
    type: "object",
    properties: {
        user: {type: "string"},
        type: {type: "string"},
        amount: {type: "number"}
    },
    required: ["user", "type", "amount"]
};

const checkTransactionBody = (req, res, next) => {
    if (!ajv.validate(transactionSchema, req.body)) {
        return res.status(400).json({ error: "Incorrect request data" });
    }
    next();
}

module.exports = {
    checkTransactionBody
}