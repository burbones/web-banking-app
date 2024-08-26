const express = require('express')
const router = express.Router()

router.delete('/', (req, res) => {
    res.send("It's a logout stub");
});

module.exports = router