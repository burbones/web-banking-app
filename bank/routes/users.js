const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middlewares/jwt.js');
const checkPermissions = require('../middlewares/authorization.js');
const { getUsers, deleteUser } = require('../controllers/users.js');

router.get('/', [verifyToken, checkPermissions("view_users")], getUsers);

router.delete('/', [verifyToken, checkPermissions("delete_user")], deleteUser);

module.exports = router;