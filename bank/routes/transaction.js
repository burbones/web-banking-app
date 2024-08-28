const express = require('express');
const { doTransaction } = require('../controllers/transaction');
const { verifyToken } = require('../middlewares/jwt');
const { checkTransactionBody } = require('../middlewares/transaction');

const router = express.Router()

router.post('/', [verifyToken, checkTransactionBody], doTransaction);

module.exports = router