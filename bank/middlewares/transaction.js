const { Ajv } = require("ajv");
const Errors = require("../constants/errors");
const ajv = new Ajv();

const transactionRequestSchema = {
    type: "object",
    properties: {
        user: {type: "string"},
        type: {type: "string"},
        amount: {type: "number"},
        description: {type: "string"},
    },
    required: ["user", "type", "amount"]
};

const checkTransactionBody = (req, res, next) => {
    if (!ajv.validate(transactionRequestSchema, req.body)) {
        return res.status(400).json({ error: Errors.INCORRECT_DATA });
    }
    next();
}

module.exports = {
    checkTransactionBody
}