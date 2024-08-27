const express = require('express')
const router = express.Router()

const {
    createUser,
    verifyCode
} = require('../controllers/signup.js');

router.post('/', createUser);

router.post('/verifyCode', verifyCode);

module.exports = router