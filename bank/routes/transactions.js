const express = require('express');
const { verifyToken } = require('../middlewares/jwt');
const checkPermissions = require('../middlewares/authorization');
const { getTransactions } = require('../controllers/transactions');

const router = express.Router()

router.get('/', [verifyToken, checkPermissions("view_all_transactions")], getTransactions);

module.exports = router;