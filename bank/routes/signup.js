const express = require('express')
const router = express.Router()

/*  Storage substitution   */
const emails = new Set();

router.post('/', (req, res) => {

    const userData = {
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
    };

    const emailExists = emails.has(userData.email);

    try {
        if (emailExists) {
            return res.status(409).json({error: "User with this email already exists"});
        }

        emails.add(userData.email);

        /*  To add: email verification  */

        res.status(201).json({message: "User registered successfully"})

    } catch (error) {
        res.status(500).json({ error: "Internal server error"})
    }
});

router.post('/verifyCode', (req, res) => {
    res.send("It's a verify code stub");
});

module.exports = router