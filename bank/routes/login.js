const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
    res.send("It's a login stub");
});

module.exports = router