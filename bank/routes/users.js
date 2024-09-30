const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middlewares/jwt.js');
const checkPermissions = require('../middlewares/authorization.js');
const { getUsers } = require('../controllers/users.js');

router.get('/', [verifyToken, checkPermissions("view_users")], getUsers);

module.exports = router;