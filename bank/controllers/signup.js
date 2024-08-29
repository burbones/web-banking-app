const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const User = require('../models/User.js');

const createUser = async (req, res) => {
    const newUser = new User({
        email: req.body.email,
        hashedPassword: await encrypt(req.body.password),
        phone: req.body.phone,
    });

    try {
        const newUserFull = await newUser.save();
        console.log(newUserFull);

        sendEmail(userData.email, userData.code);

        res.status(201).json({message: "User registered successfully"})

    } catch (error) {
        if (error.code == 11000) {
            return res.status(409).json({error: "User with this email already exists"});
        }
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

const verifyCode = async (req, res) => {

    const email = req.body.email;
    const code = req.body.code;

    try {
        const curUser = await User.findOne({ email: email });

        const isCorrectCode = curUser && (curUser.code === code);
        if (isCorrectCode) {
            curUser.isActive = true;
            await curUser.save();

            res.status(200).json({message: "Correct code"});
        } else {
            await User.deleteOne({ _id: curUser._id});
            res.status(401).json({ error: "Incorrect code"});
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error"});
    }
};

const encrypt = async (str) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    return await bcrypt.hash(str, salt);
}

module.exports = {
    createUser,
    verifyCode
};