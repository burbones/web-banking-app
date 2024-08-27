const express = require('express');
const router = express.Router();

const { getDashboard } = require('../controllers/dashboard.js');
const { verifyToken } = require('../middlewares/jwt.js');

router.get('/', verifyToken, getDashboard);

module.exports = router;