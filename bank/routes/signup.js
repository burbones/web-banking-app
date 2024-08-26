const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
    res.send("It's a signup stub");
});

router.post('/verifyCode', (req, res) => {
    res.send("It's a verify code stub");
});

module.exports = router