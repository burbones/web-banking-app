const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

/*  Storage substitution   */
const { users } = require('../data.js');

const { getRandomStartBalance } = require('../constants/constants.js');

const createUser = async (req, res) => {
    const balance = getRandomStartBalance();

    const userData = {
        email: req.body.email,
        hashedPassword: await encrypt(req.body.password),
        phone: req.body.phone,
        balance: +balance,
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

        sendEmail(userData.email, userData.code);

        res.status(201).json({message: "User registered successfully"})

    } catch (error) {
        res.status(500).json({ error: "Internal server error"})
    }
};

const myEmail = "fs154notify@gmail.com";
const myPassword = "lbbpwvrlvkczfdzd";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: myEmail,
        pass: myPassword
    }
})

const sendEmail = (email, content) => {
    const mailOptions = {
        from: myEmail,
        to: email,
        subject: "Verification code from test project",
        text: content
    };
    
    transporter.sendMail(mailOptions);
}

const verifyCode = (req, res) => {

    const email = req.body.email;
    const code = req.body.code;

    try {
        const curUser = users.get(email);
        const isCorrectCode = curUser && (curUser.code === code);
        if (isCorrectCode) {
            curUser.isActive = true;
            users.set(email, curUser);

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

const encrypt = async (str) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    return await bcrypt.hash(str, salt);
}

module.exports = {
    createUser,
    verifyCode
};