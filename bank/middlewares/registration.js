const { Ajv } = require("ajv");
const Errors = require("../constants/errors");
const ajv = new Ajv();

const registrationRequestSchema = {
    type: "object",
    properties: {
        email: {type: "string"},
        password: {type: "string"},
        phone: {type: "string"}
    },
    required: ["email", "password", "phone"]
};

const checkRegistrationBody = (req, res, next) => {
    if (!ajv.validate(registrationRequestSchema, req.body)) {
        return res.status(400).json({ error: Errors.INCORRECT_DATA });
    }
    next();
}

module.exports = {
    checkRegistrationBody
};