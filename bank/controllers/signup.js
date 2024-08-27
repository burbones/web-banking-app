/*  Storage substitution   */
const { users } = require('../data.js');

const createUser = (req, res) => {

    const userData = {
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        isActive: false,
    };

    const emailExists = users.has(userData.email);

    try {
        if (emailExists) {
            return res.status(409).json({error: "User with this email already exists"});
        }

        userData.code = generateCode();
        console.log(userData.code);
        users.set(userData.email, userData);

        res.status(201).json({message: "User registered successfully"})

    } catch (error) {
        res.status(500).json({ error: "Internal server error"})
    }
};

const verifyCode = (req, res) => {

    const email = req.body.email;
    const code = req.body.code;

    try {
        const isCorrectCode = users.has(email) && (users.get(email).code === code);
        if (isCorrectCode) {
            res.status(200).json({message: "Correct code"});
        } else {
            res.status(401).json({ error: "Incorrect code"});
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error"});
    }
};

const generateCode = () => {
    return ("" + Math.random()).substring(2, 8);
}

module.exports = {
    createUser,
    verifyCode
};