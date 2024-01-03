const express = require('express');
const router = express.Router();
const { register, login, logout, getAuthenticatedUser } = require('../controllers/authController');
const authenticateUser = require('../middlewares/auth');
const guestMiddleware = require('../middlewares/guest');
const isTokenBlacklisted = require('../middlewares/blacklistToken');

router.post('/register', guestMiddleware, register);
router.post('/login', guestMiddleware, login);
router.get('/me', authenticateUser, isTokenBlacklisted, getAuthenticatedUser)
router.post('/logout', authenticateUser, isTokenBlacklisted, logout);

module.exports = router;


