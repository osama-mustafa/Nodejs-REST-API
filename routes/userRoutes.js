const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/auth');
const adminMiddleware = require('../middlewares/adminMiddleware');
const isTokenBlacklisted = require('../middlewares/blacklistToken');
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');

router.get('/', authenticateUser, isTokenBlacklisted, adminMiddleware, getUsers);
router.post('/', authenticateUser, isTokenBlacklisted, adminMiddleware, createUser);
router.get('/:id', authenticateUser, isTokenBlacklisted, adminMiddleware, getUser);
router.put('/:id', authenticateUser, isTokenBlacklisted, adminMiddleware, updateUser);
router.delete('/:id', authenticateUser, isTokenBlacklisted, adminMiddleware, deleteUser);

module.exports = router;
