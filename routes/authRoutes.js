const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authenticationMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const isTokenBlacklisted = require('../middlewares/blacklistToken');
const {
    register,
    login,
    logout,
    getAuthenticatedUser,
    forgotPassword,
    resetPassword } = require('../controllers/authController');

router.post('/register', [guestMiddleware, register]);
router.post('/login', [guestMiddleware, login]);
router.get('/me', [authMiddleware, isTokenBlacklisted, getAuthenticatedUser])
router.post('/logout', [authMiddleware, isTokenBlacklisted, logout]);
router.post('/forgot-password', [guestMiddleware, forgotPassword]);
router.post('/reset-password/:token', [guestMiddleware, resetPassword]);

module.exports = router;


