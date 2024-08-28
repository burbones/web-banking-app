const express = require('express');
const { doTransaction } = require('../controllers/transaction');
const { verifyToken } = require('../middlewares/jwt');
const router = express.Router()

router.post('/', verifyToken, doTransaction);

module.exports = router