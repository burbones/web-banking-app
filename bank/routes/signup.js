const express = require('express');
const router = express.Router();

const { checkRegistrationBody } = require('../middlewares/registration.js');

const {
    createUser,
    verifyCode
} = require('../controllers/signup.js');

router.post('/', checkRegistrationBody, createUser);

router.post('/verifyCode', verifyCode);

module.exports = router