const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    const balance = (Math.random() * 100).toFixed(2);

    res.send(`Your balance is: ${balance}`);
});

module.exports = router