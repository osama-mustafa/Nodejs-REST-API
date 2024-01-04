const express = require('express');
const router = express.Router();
const {
    register,
    login,
    logout,
    getAuthenticatedUser,
    forgotPassword } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const isTokenBlacklisted = require('../middlewares/blacklistToken');

router.post('/register', guestMiddleware, register);
router.post('/login', guestMiddleware, login);
router.get('/me', authMiddleware, isTokenBlacklisted, getAuthenticatedUser)
router.post('/logout', authMiddleware, isTokenBlacklisted, logout);
router.post('/forgot-password', guestMiddleware, forgotPassword);

module.exports = router;


