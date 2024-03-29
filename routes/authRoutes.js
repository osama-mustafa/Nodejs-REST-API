const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authenticationMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const isTokenBlacklisted = require('../middlewares/blacklistToken');
const { createUserValidator } = require('../utils/validators/userValidator');
const {
    register,
    login,
    logout,
    getAuthenticatedUser,
    forgotPassword,
    resetPassword,
    updatePassword } = require('../controllers/authController');

router.post('/register', [
    guestMiddleware,
    createUserValidator,
    register]);

router.post('/login', [guestMiddleware, login]);
router.get('/me', [authMiddleware, isTokenBlacklisted, getAuthenticatedUser])
router.post('/logout', [authMiddleware, isTokenBlacklisted, logout]);
router.post('/forgot-password', [guestMiddleware, forgotPassword]);
router.post('/reset-password/:token', [guestMiddleware, resetPassword]);
router.post('/update-password', [authMiddleware, updatePassword]);

module.exports = router;


