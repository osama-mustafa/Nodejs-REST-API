const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const isTokenBlacklisted = require('../middlewares/blacklistToken');
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');

router.get('/', authMiddleware, isTokenBlacklisted, adminMiddleware, getUsers);
router.post('/', authMiddleware, isTokenBlacklisted, adminMiddleware, createUser);
router.get('/:id', authMiddleware, isTokenBlacklisted, adminMiddleware, getUser);
router.put('/:id', authMiddleware, isTokenBlacklisted, adminMiddleware, updateUser);
router.delete('/:id', authMiddleware, isTokenBlacklisted, adminMiddleware, deleteUser);

module.exports = router;
