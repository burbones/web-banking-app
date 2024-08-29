const { Ajv } = require("ajv");
const ajv = new Ajv();

const transactionRequestSchema = {
    type: "object",
    properties: {
        user: {type: "string"},
        type: {type: "string"},
        amount: {type: "number"}
    },
    required: ["user", "type", "amount"]
};

const checkTransactionBody = (req, res, next) => {
    if (!ajv.validate(transactionRequestSchema, req.body)) {
        return res.status(400).json({ error: "Incorrect request data" });
    }
    next();
}

module.exports = {
    checkTransactionBody
}