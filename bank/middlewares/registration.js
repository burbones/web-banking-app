const { Ajv } = require("ajv");
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
        return res.status(400).json({ error: "Incorrect request data" });
    }
    next();
}

module.exports = {
    checkRegistrationBody
};