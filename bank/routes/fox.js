const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middlewares/jwt.js');
const checkPermissions = require('../middlewares/authorization.js');

router.get('/', [verifyToken, checkPermissions("view_fox")], (req, res) => {
    res.status(200).json({ message: "You see a beautiful foxie" });
});

module.exports = router;